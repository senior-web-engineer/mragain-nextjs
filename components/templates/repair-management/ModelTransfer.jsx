import React, { useState } from "react";
import { Transfer, Row, Col, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import HistoryImage from "@/assets/icons/history.svg";
import ShopImage from "@/assets/icons/shop.svg";
import ServicesImage from "@/assets/icons/services.svg";
import FinanceImage from "@/assets/icons/finance.svg";
import Image from "next/image";
import { MenuWrap } from "./styles";
import { DeviceTransfer } from "./DeviceTransfer";

const managementMenuItems = () => [
  {
    title: "Phones",
    key: "history",
    icon: <Image width="24" height="24" src={HistoryImage} />,
    selectable: false,
    children: [
      {
        title: "Sony",
        key: `history`,
      },
      {
        title: "Xiaomi",
        key: `history`,
      },
      {
        title: "Apple",
        key: `history`,
      },
      {
        title: "...",
        key: `history-hold`,
      },
    ],
  },
  {
    title: "Headphones",
    key: "shop-management",
    icon: <Image width="24" height="24" src={ShopImage} />,
    selectable: false,
    children: [
      {
        title: "Profile Settings",
        key: `shop-management-settings`,
      },
      {
        title: "Operational Hours",
        key: `shop-management-hours`,
      },
    ],
  },
  {
    title: "TVs",
    key: "repair-management",
    icon: <Image width="24" height="24" src={ServicesImage} />,
    selectable: false,
    children: [
      {
        title: "Device Manager",
        key: "repair-management/device-manager",
      },
      {
        title: "Rules",
        key: "repair-management/rules",
      },
    ],
  },
  {
    title: "Laptops",
    key: "finance",
    icon: <Image width="24" height="24" src={FinanceImage} />,
    selectable: false,
  },
];

export const ModelTransfer = ({
  leftTableColumns,
  rightTableColumns,
  data,
}) => {
  const [selected, setSelected] = useState([]);

  const onSelect = (selectedKeys) => {
    console.log(selectedKeys);
  };

  return (
    <Row>
      <Col span="6">
        <MenuWrap>
          <Tree
            showIcon
            showLine={false}
            switcherIcon={<DownOutlined />}
            selectedKeys={selected}
            onSelect={onSelect}
            multiple
            blockNode
            treeData={managementMenuItems()}
          />
        </MenuWrap>
      </Col>
      <Col span="18">
        {/* <TreeList /> */}
        <DeviceTransfer
          data={data}
          leftTableColumns={leftTableColumns}
          rightTableColumns={rightTableColumns}
        />
      </Col>
    </Row>
  );
};
