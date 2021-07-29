import { format } from "date-fns";
import { flatten } from "lodash";
import * as moment from "moment";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import styled from "styled-components";

const CalendarRangeWrapper = styled.div`
  background: white;
  padding: 26px;

  .rdrDateDisplayWrapper {
    display: none;
  }

  .rdrCalendarWrapper {
    display: block;
  }

  .rdrDay {
    height: 5em;
  }
  .rdrDayNumber {
    font-size: 16px;
    font-weight: 600;
  }
  .rdrMonth {
    width: 100%;
  }

  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    /* background: #ed5556; */
  }
`;

export const CalendarRange = ({ onChange, disabledDates, repeatingList }) => {
  const [comparedDates, setComparedDates] = useState([]);
  const [state, setState] = useState([
    {
      startDate: moment(moment.now()).toDate(),
      endDate: moment(moment.now()).add(5, "days").toDate(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (disabledDates) {
      setComparedDates(
        disabledDates.map((date) => ({
          dates: flatten(getDates(date.startDate, date.endDate)),
          type: date.type,
        }))
      );
    }
  }, [disabledDates]);

  const onRangeSelect = (item) => {
    onChange(item.selection);
    if (item.hasOwnProperty("selection")) {
      setState([item["selection"]]);
    }
  };

  const dateType = (type) => {
    if (type === 0) return "#52c41a";
    if (type === 1) return "#1890ff";
    return "#f5222d";
  };

  const getDates = (startDate, endDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var endDate = moment(endDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).toDate());
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  };

  const customDayContent = (day, dates) => {
    let extraDot = null;
    let disabledDay = null;
    dates
      .map((item) => ({
        ...item,
        dates: item.dates.map((date) => moment(date).format("YYYY-MM-DD")),
      }))
      .forEach((item) => {
        if (item.dates.includes(moment(day).format("YYYY-MM-DD"))) {
          disabledDay = item;
        }
      });
    if (disabledDay) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "100%",
            background: dateType(disabledDay.type),
            position: "absolute",
            top: "-5px",
            left: 0,
          }}
        />
      );
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  };

  return (
    <CalendarRangeWrapper>
      <DateRange
        editableDateInputs={false}
        onChange={onRangeSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        disabledDates={flatten(
          disabledDates.map((date) =>
            flatten(getDates(date.startDate, date.endDate))
          )
        )}
        dayContentRenderer={(day) => customDayContent(day, comparedDates)}
      />
    </CalendarRangeWrapper>
  );
};
