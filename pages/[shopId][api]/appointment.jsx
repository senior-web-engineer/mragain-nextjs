import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import {
  appointmentForm,
  brandFetcher,
  deviceFetcher,
  modelFetcher,
  serviceFetcher,
} from "@/components/appointment/modules";
import { getShopProfileByInformationServer } from "@/service/account/operations";
import React, { useEffect } from "react";
import BookingInfo from "@/components/appointment/BookingInfo";
import styled from "styled-components";
import { SubTitle } from "@/components/styled/text";
import { Field } from "@/modules/forms/Blocks";
import LocationSelector from "@/components/appointment/LocationSelector";
import Form from "@/modules/forms";
import { Calendar } from "antd";
import moment from "moment-timezone"

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

function CalendarField({value, onChange}) {

  return <Calendar fullscreen={false} value={moment(value)} onSelect={(value) => onChange(moment(value).toString())}/>
}

export default function AppointmentPage({ shop }) {
  useEffect(() => {
    async function loadData() {
      await appointmentForm.actions.initialize(shop);
      deviceFetcher.fetch();
      brandFetcher.fetch();
      modelFetcher.fetch();
      serviceFetcher.fetch();
    }

    loadData();
  });

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
