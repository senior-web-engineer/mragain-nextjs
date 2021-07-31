import { Button, Col, Divider, Row, Switch, Table } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";

import Input from "@/components/ui/Input";
import { Drawer } from "@/modules/modal";

import { HeaderSmallText, RowWrapperMargin } from "./styles";

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

export const EditModal = ({ item, data, editRepairModelModal, onSave }) => {
  let [items, setItems] = useState([]);
  useEffect(() => {
    setItems(cloneDeep(data));
  }, [data]);

  const onClose = () => {
    console.log("onCLOSE");
    setItems([]);
  };

  return (
    <Drawer
      width="1000px"
      module={editRepairModelModal}
      destroyOnClose
      onClose={onClose}
    >
      <h2 style={{ marginBottom: "30px" }}>Model information</h2>
      <HeaderSmallText>Device</HeaderSmallText>
      <Divider />
      <Row type="flex" justify="space-between">
        <Col>
          <h3>
            <b>{item?.model}</b>
          </h3>
        </Col>
        <Col>
          <Button>View Product</Button>
        </Col>
      </Row>
      <Divider />
      <RowWrapperMargin type="flex" justify="space-between" align="center">
        <Col>
          <HeaderSmallText>Services</HeaderSmallText>
        </Col>
        <Col></Col>
      </RowWrapperMargin>
      <Divider />
      <Table
        scroll={{ y: `calc(100vh - 420px)` }}
        dataSource={cloneDeep(items)}
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
