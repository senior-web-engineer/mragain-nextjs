import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import {
  appointmentForm,
  brandFetcher,
  deviceFetcher,
  invalidTimeFetcher,
  modelFetcher,
  openTimeFetcher,
  serviceFetcher,
} from "@/components/appointment/modules";
import { getShopProfileByInformationServer } from "@/service/account/operations";
import React, { useEffect, useMemo, useState } from "react";
import BookingInfo from "@/components/appointment/BookingInfo";
import styled from "styled-components";
import { SubTitle } from "@/components/styled/text";
import { Field } from "@/modules/forms/Blocks";
import LocationSelector from "@/components/appointment/LocationSelector";
import Form from "@/modules/forms";
import { Calendar, Tooltip } from "antd";
import moment from "moment-timezone";
import { useFetcher, withData } from "@/modules/dataFetcher";
import { DAYS_OF_WEEK } from "@/utils/date";

const MainWrap = styled.div`
  padding-top: 1px;

  > ${MaxConstraints} {
    display: flex;
    justify-content: space-between;
  }
`;

const FormWrap = styled.div`
  width: 690px;
`;

const ShortDayWrap = styled.div`
  background-color: #a0a0a0;
  width: 6px;
  height: 6px;
  position: absolute;
  top: 3px;
  left: 50%;
  margin-left: -3px;
  z-index: 100;
  border-radius: 3px;
`;

const DatePickerWrap = styled.div`
  padding: 0 41px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;

  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -41px 20px;
    padding: 0 41px;
  }

  .ant-radio-group {
    display: none;
  }

  .ant-fullcalendar-date {
    position: relative;
  }

  .ant-fullcalendar-selected-day {
    ${ShortDayWrap} {
      background-color: #fff;
    }
  }

  .ant-fullcalendar-content {
    position: static;
  }

  .ant-fullcalendar-value {
    width: 45px;
    height: 45px;
    border-radius: 27px;
    line-height: 45px;
  }

  .ant-fullcalendar {
    border: none;

    th {
      line-height: 33px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      color: #a0a0a0;
      font-size: 13px;
    }
  }
`;

function CalendarField({ value, onChange }) {
  const invalidTimes = useFetcher({ dataFetcher: invalidTimeFetcher });
  const openedTimes = useFetcher({ dataFetcher: openTimeFetcher });

  const shortDays = useMemo(() => {
    if (!invalidTimes.data) {
      return [];
    }
    return invalidTimes.data.map((time) => ({
      date: moment(time.checkDay),
      scheduele: time.open_close_time,
      reason: time.reason,
    }));
  }, [invalidTimes.data]);

  return (
    <Calendar
      fullscreen={false}
      value={moment(value)}
      disabledDate={(date) => {
        const day = date.isoWeekday();
        const isOpened = !openedTimes?.data?.[DAYS_OF_WEEK[day - 1]];

        return isOpened;
      }}
      onSelect={(value) => onChange(moment(value).toString())}
      onPanelChange={(value) => onChange(moment(value).toString())}
      dateCellRender={(date) => {
        const short = shortDays.find((shortDay) =>
          date.isSame(shortDay.date, "day")
        );
        if (!short) {
          return null;
        }
        return (
          <Tooltip title={short.reason}>
            <ShortDayWrap />
          </Tooltip>
        );
      }}
    />
  );
}

function TimePicker({ value, onChange }) {
  const invalidTimes = useFetcher({ dataFetcher: invalidTimeFetcher });
  const openedTimes = useFetcher({ dataFetcher: openTimeFetcher });
  const selectedDate = moment(appointmentForm.state.values.date);

  const shortDays = useMemo(() => {
    if (!invalidTimes.data) {
      return [];
    }
    return invalidTimes.data.map((time) => ({
      date: moment(time.checkDay),
      scheduele: time.open_close_time,
      reason: time.reason,
    }));
  }, [invalidTimes.data]);

  const shortDayHours = useMemo(() => {
    const dayMeta = shortDays.find((shortDay) => selectedDate.isSame(shortDay.date, "day"));
    return dayMeta?.scheduele;
  }, [selectedDate]);

  const regularHours = useMemo(() => {
    const day = selectedDate.isoWeekday();
    return openedTimes?.data?.[DAYS_OF_WEEK[day - 1]];
  })
  const openedInterval = shortDayHours ? shortDayHours : regularHours;
  const [min, max] = openedInterval?.split("-") || [];



  const hours = useMemo(() => {
    if (!min || !max) {
      return [];
    }

    return Array.from({length: 24}).map((_, index) => `${index < 10 ? `0${index}` : index}:00`).filter(time => {
      let [h] = time.split(':');
      let [hMin] = min.split(':');
      let [hMax] = max.split(':');

      [h, hMin, hMax] = [h, hMin, hMax].map(hour => parseInt(hour, 10))


      return h >= hMin && h <= hMax;
    });

  }, [min, max])


  return <div>{hours.map(hour => hour)}</div>;
}

export default function AppointmentPage({ shop }) {
  useEffect(() => {
    async function loadData() {
      await appointmentForm.actions.initialize(shop);
      deviceFetcher.fetch();
      brandFetcher.fetch();
      modelFetcher.fetch();
      serviceFetcher.fetch();
      invalidTimeFetcher.fetch();
      openTimeFetcher.fetch();
    }

    loadData();
  }, []);

  return (
    <DefaultLayout>
      <MainWrap>
        <MaxConstraints>
          <FormWrap>
            <Form module={appointmentForm}>
              <SubTitle>Repair location</SubTitle>
              <Field name="location" as={LocationSelector} />
              <DatePickerWrap>
                <header>
                  <SubTitle>Scheduele an appointment</SubTitle>
                </header>
                <Field name="date" as={CalendarField} />
                <Field name="time" as={TimePicker} />
              </DatePickerWrap>
            </Form>
          </FormWrap>
          <BookingInfo shop={shop} />
        </MaxConstraints>
      </MainWrap>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);
  return {
    props: {
      shop:
        shopProfileServerInfo && shopProfileServerInfo[0]
          ? shopProfileServerInfo[0]
          : shopProfileServerInfo,
    },
  };
}
