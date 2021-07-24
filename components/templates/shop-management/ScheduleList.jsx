import React, { useState } from "react";
import { ScheduleListWrapper, ListItemWrapper } from "./styles";
import { List, Tag, Col, Input, Switch } from "antd";

const mockData = [
  {
    day: "Monday",
    start: "8:00",
    end: "18:00",
    hours: 10,
  },
  {
    day: "Tuesday",
    start: "8:00",
    end: "18:00",
    hours: 10,
  },
  {
    day: "Wednesday",
    start: "8:00",
    end: "18:00",
    hours: 10,
  },
  {
    day: "Thursday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
  {
    day: "Friday",
    start: "8:00",
    end: "18:00",
    hours: 10,
  },
  {
    day: "Saturday",
    start: "8:00",
    end: "13:00",
    hours: 5,
  },
  {
    day: "Sunday",
    start: undefined,
    end: undefined,
    hours: 0,
  },
];

export const ScheduleList = () => {
  const [editingRow, setEditingRow] = useState();

  const onEditSave = (index) => {
    if (index === editingRow) {
    } else {
      setEditingRow(index);
    }
  };

  return (
    <ScheduleListWrapper>
      <List
        header={
          <h3 style={{ padding: "0 18px", margin: 0 }}>Regular Schedule</h3>
        }
        size="large"
        dataSource={mockData}
        renderItem={(item, index) => (
          <List.Item>
            <ListItemWrapper>
              <Col span="6">
                <p>{item.day}</p>
              </Col>
              <Col span="6">
                {editingRow === index ? (
                  <Input value={item.start} />
                ) : (
                  <p>{item.start || "..."}</p>
                )}
              </Col>
              <Col span="6">
                {editingRow === index ? (
                  <Input value={item.end} />
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
