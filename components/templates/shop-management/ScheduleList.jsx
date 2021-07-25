import React, { useState, useEffect, useCallback } from "react";
import { ScheduleListWrapper, ListItemWrapper } from "./styles";
import { List, Tag, Col, Switch, TimePicker } from "antd";
import moment from "moment-timezone";

const template = [
  {
    key: "Mon",
    day: "Monday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Tue",
    day: "Tuesday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Wed",
    day: "Wednesday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Thu",
    day: "Thursday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Fri",
    day: "Friday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Sat",
    day: "Saturday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    key: "Sun",
    day: "Sunday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
];

export const ScheduleList = ({ validOpenTime, onSave }) => {
  const [editingRow, setEditingRow] = useState();
  const [workingHours, setWorkingHours] = useState();

  const onEditSave = useCallback(
    (index) => {
      if (index === editingRow) {
        console.log("SAVE");
        setEditingRow(null);
        const savingTimeObject = {};
        workingHours.forEach(
          (day) =>
            (savingTimeObject[day.key] = `${moment(day.start, "HH:mm").format(
              "HH:mm"
            )}-${moment(day.end, "HH:mm").format("HH:mm")}`)
        );
        onSave(savingTimeObject);
      } else {
        setEditingRow(index);
      }
    },
    [workingHours]
  );

  useEffect(() => {
    if (validOpenTime) {
      const parsedWeekTimes = JSON.parse(validOpenTime[0].valid_day_time);
      const newData = template.map((day) => {
        const time = parsedWeekTimes[day.key].split("-");
        return {
          ...day,
          start: time[0],
          end: time[1],
          hours: moment
            .duration(moment(time[1], "HH:mm").diff(moment(time[0], "HH:mm")))
            .asHours(),
        };
      });
      setWorkingHours(newData);
    }
  }, [validOpenTime]);

  const setNewTime = (type, index, value) => {
    const newWorkingTime = workingHours[index];
    newWorkingTime[type] = value.format("HH:mm");
    (newWorkingTime.hours = moment
      .duration(
        moment(newWorkingTime.end, "HH:mm").diff(
          moment(newWorkingTime.start, "HH:mm")
        )
      )
      .asHours()),
      console.log(newWorkingTime);

    setWorkingHours((wh) =>
      wh.map((day) => {
        if (day.key === newWorkingTime.key) {
          return newWorkingTime;
        }
        return day;
      })
    );
  };

  return (
    <ScheduleListWrapper>
      <List
        header={
          <h3 style={{ padding: "0 18px", margin: 0 }}>Regular Schedule</h3>
        }
        size="large"
        dataSource={workingHours}
        renderItem={(item, index) => (
          <List.Item>
            <ListItemWrapper>
              <Col span="6">
                <p>{item.day}</p>
              </Col>
              <Col span="6">
                {editingRow === index ? (
                  <TimePicker
                    value={moment(item.start, "HH:mm")}
                    format="HH:mm"
                    onChange={(value) => setNewTime("start", index, value)}
                  />
                ) : (
                  <p>{item.start || "..."}</p>
                )}
              </Col>
              <Col span="6">
                {editingRow === index ? (
                  <TimePicker
                    value={moment(item.end, "HH:mm")}
                    format="HH:mm"
                    onChange={(value) => setNewTime("end", index, value)}
                  />
                ) : (
                  <p>{item.end || "..."}</p>
                )}
              </Col>
              <Col span="4">
                {editingRow === index ? (
                  <Switch defaultChecked={item.hours !== 0} />
                ) : (
                  <Tag color={item.hours ? "green" : "red"}>
                    {item.hours ? `${item.hours} Hours` : "Closed"}
                  </Tag>
                )}
              </Col>
              <Col span="4" onClick={() => onEditSave(index)}>
                {editingRow === index ? <a>Save</a> : <a>Edit</a>}
              </Col>
            </ListItemWrapper>
          </List.Item>
        )}
      />
    </ScheduleListWrapper>
  );
};
