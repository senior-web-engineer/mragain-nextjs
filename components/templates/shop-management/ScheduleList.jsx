import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, List, Switch, Tag, TimePicker } from "antd";
import moment from "moment-timezone";
import React, { useCallback, useEffect, useState } from "react";

import { Text } from "@/components/common/Text/Text";

import {
  ActionList,
  HeaderLargeText,
  HeaderSmallText,
  ListItemWrapper,
  ScheduleListWrapper,
  TagWrapper,
} from "./styles";

const template = [
  {
    key: "Mon",
    day: "Maandag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Tue",
    day: "Dinsdag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Wed",
    day: "Woensdag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Thu",
    day: "Donderdag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Fri",
    day: "Vrijdag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Sat",
    day: "Zaterdag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
  {
    key: "Sun",
    day: "Zondag",
    start: undefined,
    end: undefined,
    hours: 0,
    opened: false,
  },
];

export const ScheduleList = ({ validOpenTime, onSave }) => {
  const [editingRow, setEditingRow] = useState();
  const [workingHours, setWorkingHours] = useState();

  const onEditClick = (index) => {
    setEditingRow(index);
  };

  const onSaveClick = useCallback(() => {
    const savingTimeObject = {};
    workingHours.forEach((day) => {
      if (day.start && day.end) {
        savingTimeObject[day.key] =
          day.opened && day.start !== undefined
            ? `${moment(day.start, "HH:mm").format("HH:mm")}-${moment(
                day.end,
                "HH:mm"
              ).format("HH:mm")}`
            : "Gesloten";
      } else {
        savingTimeObject[day.key] = "Gesloten";
      }
    });
    onSave(JSON.stringify(savingTimeObject));
    setEditingRow(null);
  }, [workingHours]);

  useEffect(() => {
    if (validOpenTime) {
      const parsedWeekTimes = JSON.parse(validOpenTime[0].valid_day_time);
      const newData = template.map((day) => {
        const time =
          parsedWeekTimes[day.key] === "" ||
          parsedWeekTimes[day.key] === "Gesloten"
            ? undefined
            : parsedWeekTimes[day.key].split("-");

        if (time !== undefined) {
          const hours = time
            ? moment
                .duration(
                  moment(time[1], "HH:mm").diff(moment(time[0], "HH:mm"))
                )
                .asHours()
            : 0;
          return {
            ...day,
            start: time ? time[0] : undefined,
            end: time ? time[1] : undefined,
            hours,
            opened: parsedWeekTimes[day.key] === "Gesloten" || hours > 0,
          };
        } else {
          return {
            ...day,
            start: undefined,
            end: undefined,
            opened: false,
          };
        }
      });
      setWorkingHours(newData);
    }
  }, [validOpenTime]);

  const setNewTime = (type, index, value) => {
    const newWorkingTime = workingHours[index];
    newWorkingTime[type] = value ? value.format("HH:mm") : null;
    if (newWorkingTime.end && newWorkingTime.start) {
      newWorkingTime.hours = moment
        .duration(
          moment(newWorkingTime.end, "HH:mm").diff(
            moment(newWorkingTime.start, "HH:mm")
          )
        )
        .asHours();
    }

    setWorkingHours((wh) =>
      wh.map((day) => {
        if (day.key === newWorkingTime.key) {
          return newWorkingTime;
        }
        return day;
      })
    );
  };

  const onShopOpenChange = (value, index) => {
    setWorkingHours((wh) =>
      wh.map((day, dayIndex) => {
        if (index === dayIndex) {
          return {
            ...day,
            opened: value,
          };
        }
        return day;
      })
    );
  };

  return (
    <ScheduleListWrapper>
      <List
        header={
          <>
            <HeaderLargeText style={{ padding: "0 18px", margin: "12px 0" }}>
              Openingstijden
            </HeaderLargeText>
            <HeaderSmallText style={{ padding: "0 18px", margin: "12px 0" }}>
              Stel hier je standaard openingstijden in
            </HeaderSmallText>
          </>
        }
        size="large"
        dataSource={workingHours}
        renderItem={(item, index) => (
          <List.Item
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <ListItemWrapper>
              <Col span="6">
                <Text.Headline size="14" weight="regular" style={{ margin: 0 }}>
                  <b>{item.day}</b>
                </Text.Headline>
              </Col>
              <Col span="4">
                {editingRow === index ? (
                  <Switch
                    defaultChecked={item.opened}
                    onChange={(value) => onShopOpenChange(value, index)}
                  />
                ) : (
                  <TagWrapper color={item.opened ? "green" : "red"}>
                    {item.opened ? `${Math.ceil(item.hours)} uur` : "Gesloten"}
                  </TagWrapper>
                )}
              </Col>
              <Col
                span="5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {editingRow === index ? (
                  <TimePicker
                    value={item.start ? moment(item.start, "HH:mm") : null}
                    format="HH:mm"
                    onChange={(value) => setNewTime("start", index, value)}
                  />
                ) : (
                  <p>{item.start || "..."}</p>
                )}
              </Col>
              <Col
                span="2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Tot
              </Col>
              <Col
                span="5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {editingRow === index ? (
                  <TimePicker
                    value={item.end ? moment(item.end, "HH:mm") : null}
                    format="HH:mm"
                    onChange={(value) => setNewTime("end", index, value)}
                  />
                ) : (
                  <p>{item.end || "..."}</p>
                )}
              </Col>
              <Col span="4">
                {editingRow === index ? (
                  <ActionList
                    color="#52c41a"
                    onClick={() => onSaveClick(index)}
                  >
                    <SaveOutlined />
                  </ActionList>
                ) : (
                  <ActionList
                    color="#1890ff"
                    onClick={() => onEditClick(index)}
                  >
                    <EditOutlined />
                  </ActionList>
                )}
              </Col>
            </ListItemWrapper>
          </List.Item>
        )}
      />
    </ScheduleListWrapper>
  );
};
