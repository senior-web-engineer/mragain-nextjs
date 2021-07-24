import { useState, useEffect } from "react";
import styled from "styled-components";
import { DateRange } from "react-date-range";
import * as moment from "moment";
import { format } from "date-fns";

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
    setComparedDates(
      disabledDates.map((date) => moment(date).format("YYYY-MM-DD"))
    );
  }, [disabledDates]);

  const onRangeSelect = (item) => {
    onChange(item.selection);
    console.log(item);
    if (item.hasOwnProperty("selection")) {
      setState([item["selection"]]);
    }
  };

  const customDayContent = (day, dates) => {
    let extraDot = null;
    if (dates.includes(moment(day).format("YYYY-MM-DD"))) {
      extraDot = (
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "100%",
            background: "#1890ff",
            position: "absolute",
            top: 2,
            right: 2,
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
        disabledDates={disabledDates}
        dayContentRenderer={(day) => customDayContent(day, comparedDates)}
      />
    </CalendarRangeWrapper>
  );
};
