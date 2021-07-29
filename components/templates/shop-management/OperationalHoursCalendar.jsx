import { Button, Col, Divider, Input, Row, Tag, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";

import { CalendarRange } from "@/components/common/Calendar/CalendarRange";
import Select from "@/components/ui/Select";

import { repeatingList } from "./helpers";
import {
  Action,
  HoursEditor,
  HoursEditorTitle,
  RowWrapper,
  TableWrapper,
} from "./styles";

const getColor = (repeat) => {
  return repeatingList[repeat];
};

const renderRepeat = (repeat) => {
  const res = getColor(repeat);
  return (
    <Tag color={res.color} key={res.value}>
      {res.label}
    </Tag>
  );
};

const renderAction = (item, onDelete) => (
  <div size="middle">
    <Action onClick={() => onDelete(item)}>Delete</Action>
  </div>
);

const columns = (onDelete) => [
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
    render: renderRepeat,
  },
  {
    title: "Action",
    key: "action",
    render: (value, item) => renderAction(item, onDelete),
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

  const handelOnDelete = (item) => {
    console.log("DELETE", item);
  };

  return (
    <>
      <RowWrapper>
        <Col span={16}>
          <CalendarRange
            repeatingList={repeatingList}
            disabledDates={nonWorkingDays.map((item) => ({
              startDate: moment(item.startDate, "YYYY-MM-DD").toDate(),
              endDate: moment(item.endDate, "YYYY-MM-DD").toDate(),
              type: item.repeat,
            }))}
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
            columns={columns(handelOnDelete)}
            dataSource={nonWorkingDays}
          />
        </Col>
      </RowWrapper>
    </>
  );
};
