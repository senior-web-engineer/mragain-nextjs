import { useState } from "react";
import styled from "styled-components";
import { DateRange } from "react-date-range";


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

    .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge {
        background: #ED5556;
    }
`;

export const CalendarRange = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);

    return (
        <CalendarRangeWrapper>
            <DateRange
                editableDateInputs={false}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </CalendarRangeWrapper>
    );
};
