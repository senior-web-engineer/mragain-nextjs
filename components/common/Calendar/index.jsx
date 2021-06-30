import { useState } from 'react'; 
import {
    Calendar as AntdCalendar,
    Select,
    Radio,
    Col,
    Row,
    Button,
    Badge
} from "antd";
import styled from "styled-components";

const CalendarWrapper = styled.div`
    background: white;
    padding: 26px;

    .ant-fullcalendar-value {
        font-size: 16px;
        width: 34px;
        height: 34px;
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-fullcalendar-selected-day {
        .ant-fullcalendar-value {
        }
    }
`;

function onPanelChange(value, mode) {
    console.log(value, mode);
}

function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

export const Calendar = () => {

    const dateCellRender = (value) => {
        console.log(value);
        return (<div>RED {value.day()}</div>);
      }

    return (
        <CalendarWrapper>
            <AntdCalendar
                // dateFullCellRender={dateCellRender}
                fullscreen={false}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current.month(i);
                        months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                        monthOptions.push(
                            <Select.Option
                                className="month-item"
                                key={`${index}`}
                            >
                                {months[index]}
                            </Select.Option>
                        );
                    }
                    const month = value.month();

                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option
                                key={i}
                                value={i}
                                className="year-item"
                            >
                                {i}
                            </Select.Option>
                        );
                    }
                    return (
                        <div style={{ padding: 8 }}>
                            <Row gutter={8}>
                                <Row type="flex" justify="space-between">
                                    <Col></Col>
                                    <Col>
                                        <Radio.Group
                                            size="large"
                                            onChange={(e) =>
                                                onTypeChange(e.target.value)
                                            }
                                            value={type}
                                        >
                                            <Radio.Button value="month">
                                                Month
                                            </Radio.Button>
                                            <Radio.Button value="year">
                                                Year
                                            </Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-between">
                                    <Col>
                                        <Col span={12}>
                                            <Select
                                                bordered={false}
                                                size="large"
                                                dropdownMatchSelectWidth={false}
                                                value={String(month)}
                                                onChange={(selectedMonth) => {
                                                    const newValue =
                                                        value.clone();
                                                    newValue.month(
                                                        parseInt(
                                                            selectedMonth,
                                                            10
                                                        )
                                                    );
                                                    onChange(newValue);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                bordered={false}
                                                size="large"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                onChange={(newYear) => {
                                                    const now = value
                                                        .clone()
                                                        .year(newYear);
                                                    onChange(now);
                                                }}
                                                value={String(year)}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                    </Col>
                                    <Col>
                                        <Button
                                            size="large"
                                            onClick={() => {
                                                const newValue = value.clone();
                                                newValue.month(
                                                    parseInt(
                                                        value.month() - 1,
                                                        10
                                                    )
                                                );
                                                onChange(newValue);
                                            }}
                                        >
                                            Prev
                                        </Button>
                                        <Button
                                            size="large"
                                            onClick={() => {
                                                const newValue = value.clone();
                                                newValue.month(
                                                    parseInt(
                                                        value.month() + 1,
                                                        10
                                                    )
                                                );
                                                onChange(newValue);
                                            }}
                                        >
                                            Next
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
        </CalendarWrapper>
    );
};
