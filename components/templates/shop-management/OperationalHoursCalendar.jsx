import React, { useState, useCallback } from "react";
import { Calendar } from "@/components/common/Calendar";
import { CalendarRange } from "@/components/common/Calendar/CalendarRange";
import {
  RowWrapper,
  HoursEditor,
  HoursEditorTitle,
  TableWrapper,
} from "./styles";
import { Input, Row, Col, Divider, Button, TimePicker, Tag } from "antd";
import Select from "@/components/ui/Select";
import moment from "moment";
import { repeatingList } from "./helpers";

const getColor = (repeat) => {
  return repeatingList[repeat];
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
  },
  {
    title: "Repeat",
    key: "repeat",
    dataIndex: "repeat",
    render: (repeat) => {
      const res = getColor(repeat);
      return (
        <Tag color={res.color} key={res.value}>
          {res.label}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div size="middle">
        <a>Delete</a>
      </div>
    ),
  },
];

export const OperationalHoursCalendar = ({
  nonWorkingDays,
  onNonWorkingDaysSaved,
}) => {
  const [nonRegularHours, setNonRegularHours] = useState({
    range: {
      startDate: moment(moment.now()).toDate(),
      endDate: moment(moment.now()).add(5, "days").toDate(),
    },
    name: "",
    time: {
      startTime: moment("00:00", "HH:mm"),
      endTime: moment("23:59", "HH:mm"),
    },
    repeat: 0,
  });

  const onAdd = useCallback(() => {
    onNonWorkingDaysSaved({
      data: {
        ...nonRegularHours,
        time: {
          startTime: moment(nonRegularHours.time.startTime).format("HH:mm:ss"),
          endTime: moment(nonRegularHours.time.endTime).format("HH:mm:ss"),
        },
      },
    });
  }, [nonRegularHours, onNonWorkingDaysSaved]);

  const isAddDisabled = useCallback(() => {
    console.log("OOOO", nonRegularHours);
    return (
      nonRegularHours.name === "" ||
      nonRegularHours.time.startTime === null ||
      nonRegularHours.time.endTime === null
    );
  }, [nonRegularHours]);

  const onClear = () => {
    setNonRegularHours({
      ...nonRegularHours,
      name: "",
      time: {
        startTime: moment("00:00", "HH:mm"),
        endTime: moment("23:59", "HH:mm"),
      },
      repeat: 0,
    });
  };

  return (
    <>
      <RowWrapper>
        <Col span={16}>
          {/* <Calendar /> */}
          <CalendarRange
            repeatingList={repeatingList}
            disabledDates={nonWorkingDays.map((item) =>
              moment(item.startDate, "YYYY-MM-DD").toDate()
            )}
            onChange={(value) => {
              setNonRegularHours({
                ...nonRegularHours,
                range: {
                  startDate: moment(value.startDate).format("YYYY-MM-DD"),
                  endDate: moment(value.endDate).format("YYYY-MM-DD"),
                },
              });
            }}
          />
        </Col>
        <Col span={8}>
          <HoursEditor>
            <Col>
              <HoursEditorTitle>Title</HoursEditorTitle>
              <Input
                small
                placeholder="Enter Title"
                size="large"
                allowClear
                value={nonRegularHours.name}
                onChange={(event) =>
                  setNonRegularHours({
                    ...nonRegularHours,
                    name: event.target.value,
                  })
                }
              />
            </Col>
            <Col>
              <HoursEditorTitle>Schedule</HoursEditorTitle>
              <Row>
                <Col span={12}>
                  <TimePicker
                    size="large"
                    value={nonRegularHours.time.startTime}
                    format="HH:mm"
                    onChange={(value) =>
                      setNonRegularHours({
                        ...nonRegularHours,
                        time: { ...nonRegularHours.time, startTime: value },
                      })
                    }
                  />
                </Col>
                <Col span={12}>
                  <TimePicker
                    size="large"
                    value={nonRegularHours.time.endTime}
                    format="HH:mm"
                    onChange={(value) =>
                      setNonRegularHours({
                        ...nonRegularHours,
                        time: { ...nonRegularHours.time, endTime: value },
                      })
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <HoursEditorTitle>Repeat</HoursEditorTitle>
              <Select
                small
                value={nonRegularHours.repeat}
                options={repeatingList}
                size="large"
                onChange={(value) =>
                  setNonRegularHours({
                    ...nonRegularHours,
                    repeat: value,
                  })
                }
              />
            </Col>
            <Divider />
            <Row type="flex" justify="space-between">
              <Button size="large" onClick={onClear}>
                Clear
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={onAdd}
                disabled={isAddDisabled()}
              >
                Add
              </Button>
            </Row>
          </HoursEditor>
        </Col>
      </RowWrapper>
      <RowWrapper style={{ marginTop: "40px" }}>
        <Col span={24}>
          <TableWrapper
            size="large"
            columns={columns}
            dataSource={nonWorkingDays}
          />
        </Col>
      </RowWrapper>
    </>
  );
};
