import React, { useState, useEffect } from "react";
import { Drawer } from "@/modules/modal";
import { Row, Col, Divider, Switch, Table, Button } from "antd";
import Form from "@/modules/forms";
import Input from "@/components/ui/Input";

const columns = (onChange) => [
  {
    title: "Reparation Type",
    dataIndex: "reparation.reparation_name",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 150,
    render(price, record, index) {
      return (
        <Input
          defaultValue={price}
          onChange={() => onChange("price", price, index)}
          addonBefore="$"
          type="number"
        />
      );
    },
  },
  {
    title: "Guarantee Time",
    dataIndex: "guarantee_time",
    width: 200,
    render(guarantee_time, record, index) {
      return (
        <Input
          defaultValue={guarantee_time}
          onChange={() => onChange("guarantee_time", guarantee_time, index)}
          type="number"
          addonAfter="months"
        />
      );
    },
  },
  {
    title: "Reparation Time",
    dataIndex: "reparation_time",
    width: 200,
    render(reparation_time, record, index) {
      return (
        <Input
          defaultValue={reparation_time}
          onChange={() => onChange("reparation_time", reparation_time, index)}
          addonAfter="minutes"
          type="number"
        />
      );
    },
  },
  {
    title: "Active",
    dataIndex: "active",
    render(active, record, index) {
      return (
        <Switch
          defaultChecked={active}
          onChange={() => onChange("active", active, index)}
        />
      );
    },
  },
];

export const EditModal = ({
  data,
  editRepairModelModal,
  saveModelReparations,
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const onChange = (valueName, value, index) => {
    const newItems = [...items];
    console.log(newItems, index, valueName);
    newItems[index] = { ...newItems[index], [valueName]: value };
    setItems(newItems);
  };

  const onSave = () => {
    saveModelReparations.actions.submit(items);
  };

  return (
    <Drawer width="1000px" module={editRepairModelModal}>
      <h2>Model information</h2>
      <Divider />
      <p>Device</p>
      <h4>Samsung Galaxy ...</h4>
      <Divider />
      <Row type="flex" justify="space-between">
        <Col>
          <p>Services</p>
        </Col>
        <Col>
          <Button onClick={onSave}>Save</Button>
        </Col>
      </Row>
      <Form module={saveModelReparations}>
        <Table
          bordered
          scroll={{ y: `calc(100vh - 350px)` }}
          dataSource={items}
          columns={columns(onChange)}
          pagination={false}
        />
      </Form>
    </Drawer>
  );
};
