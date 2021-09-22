import React, { useState, useEffect, useCallback } from "react";
import { Drawer } from "@/modules/modal";
import { Row, Col, Divider, Switch, Table, Button } from "antd";
import Form from "@/modules/forms";
import { RowWrapperMargin } from "./styles";
import Input from "@/components/ui/Input";
import { cloneDeep } from "lodash";

const columns = (items) => [
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
          onChange={(value) => (items[index].price = value)}
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
          onChange={(value) => (items[index].guarantee_time = value)}
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
          onChange={(value) => (items[index].reparation_time = value)}
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
          onChange={(value) => (items[index].active = value)}
        />
      );
    },
  },
];

export const EditModal = ({ model, data, editRepairModelModal, onSave }) => {
  let [items, setItems] = useState([]);
  useEffect(() => {
    setItems(cloneDeep(data));
  }, [data]);

  return (
    <Drawer width="1000px" module={editRepairModelModal}>
      <h2>Model information</h2>
      <Divider />
      <p>Device</p>
      <h4>{model}</h4>
      <Divider />
      <RowWrapperMargin type="flex" justify="space-between" align="center">
        <Col>
          <h3>Services</h3>
        </Col>
        <Col></Col>
      </RowWrapperMargin>
      <Table
        bordered
        scroll={{ y: `calc(100vh - 420px)` }}
        dataSource={items}
        columns={columns(items)}
        pagination={false}
      />
      <RowWrapperMargin type="flex" justify="space-between" align="center">
        <Col>
          <Button
            size="large"
            onClick={() => editRepairModelModal.actions.close()}
          >
            Cancel
          </Button>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={() => onSave(items)}>
            Save
          </Button>
        </Col>
      </RowWrapperMargin>
    </Drawer>
  );
};
