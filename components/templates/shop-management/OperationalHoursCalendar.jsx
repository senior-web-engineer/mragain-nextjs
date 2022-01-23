import { Col, Divider, Input, Modal, Row, Switch, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";

import { CalendarRange } from "@/components/common/Calendar/CalendarRange";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

import { repeatingList } from "./helpers";
import {
  HeaderLargeText,
  HeaderSmallText,
  HoursEditor,
  HoursEditorTitle,
  RowWrapper,
} from "./styles";

export const OperationalHoursCalendar = ({
  nonWorkingDays,
  onNonWorkingDaysSaved,
  onDeleteNonWorkingDays,
}) => {
  const [nonRegularHours, setNonRegularHours] = useState({
    range: {
      startDate: moment(moment.now()).format("YYYY-MM-DD"),
      endDate: moment(moment.now()).add(5, "days").format("YYYY-MM-DD"),
    },
    name: "",
    time: {
      startTime: moment("00:00", "HH:mm"),
      endTime: moment("23:59", "HH:mm"),
    },
    repeat: 0,
    closed: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onAdd = useCallback(() => {
    onNonWorkingDaysSaved({
      data: {
        ...nonRegularHours,
        range: {
          startDate: moment(nonRegularHours.range.startDate).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(nonRegularHours.range.endDate).format("YYYY-MM-DD"),
        },
        time: {
          startTime: moment(nonRegularHours.time.startTime).format("HH:mm:ss"),
          endTime: moment(nonRegularHours.time.endTime).format("HH:mm:ss"),
        },
      },
    });
    onClear();
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
      range: {
        startDate: moment(moment.now()).format("YYYY-MM-DD"),
        endDate: moment(moment.now()).add(5, "days").format("YYYY-MM-DD"),
      },
      time: {
        startTime: moment("00:00", "HH:mm"),
        endTime: moment("23:59", "HH:mm"),
      },
      repeat: 0,
    });
  };

  const handelOnDelete = (item) => {
    onDeleteNonWorkingDays(item.id);
  };

  const closeDatePicker = () => {
    console.log("AAA");
    setIsModalVisible(false);
    setNonRegularHours({
      ...nonRegularHours,
      range: {
        startDate: moment(moment.now()).format("YYYY-MM-DD"),
        endDate: moment(moment.now()).add(5, "days").format("YYYY-MM-DD"),
      },
    });
  };

  const onConfirmDatePicker = (value) => {
    setIsModalVisible(false);
    console.log(value);
  };

  return (
    <>
      <RowWrapper>
        <Col span={24}>
          <HoursEditor>
            <Col>
              <HeaderLargeText style={{ margin: "12px 0" }}>
                Add customized schedule
              </HeaderLargeText>
              <HeaderSmallText style={{ margin: "12px 0" }}>
                Add customized time slots based on your store closure{" "}
              </HeaderSmallText>
            </Col>
            <Col>
              <HoursEditorTitle>Title</HoursEditorTitle>
              <Input
                small
                placeholder="Beschrijving"
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
              <HoursEditorTitle>Select date and time</HoursEditorTitle>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Input
                    onClick={() => setIsModalVisible(true)}
                    style={{ width: "90%" }}
                    size="large"
                    value={`From ${nonRegularHours.range.startDate} - To: ${nonRegularHours.range.endDate}`}
                  />
                </Col>
                <Col span={6}>
                  <TimePicker
                    size="large"
                    value={nonRegularHours.time.startTime}
                    format="HH:mm"
                    style={{ width: "90%" }}
                    onChange={(value) =>
                      setNonRegularHours({
                        ...nonRegularHours,
                        time: { ...nonRegularHours.time, startTime: value },
                      })
                    }
                  />
                </Col>
                <Col span={6}>
                  <TimePicker
                    size="large"
                    style={{ width: "90%" }}
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
              <Row>
                <Col span="6">
                  <HoursEditorTitle>Closed</HoursEditorTitle>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "40px",
                    }}
                  >
                    <Switch
                      name="closed"
                      onChange={(value) => {
                        console.log(value);
                        setNonRegularHours({
                          ...nonRegularHours,
                          checked: value,
                        });
                      }}
                      defaultChecked={nonRegularHours.closed}
                    />
                  </div>
                </Col>
                <Col span="18">
                  <HoursEditorTitle>Herhaling</HoursEditorTitle>
                  <Select
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
              </Row>
            </Col>
            <Divider />
            <Row type="flex" justify="space-between">
              <Button
                style={{
                  background: "transparent",
                  color: "#06c987",
                  border: "solid 1px #06c987",
                }}
                onClick={onClear}
              >
                Wis
              </Button>
              <Button onClick={onAdd} disabled={isAddDisabled()}>
                Voeg toe
              </Button>
            </Row>
          </HoursEditor>
        </Col>
      </RowWrapper>

      <Modal
        visible={isModalVisible}
        onCancel={closeDatePicker}
        onOk={onConfirmDatePicker}
        width={1000}
      >
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
      </Modal>
    </>
  );
};
