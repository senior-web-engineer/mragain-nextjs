import React, { useState, useEffect } from "react";
import { Row, Col, Tree, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { MenuWrap, RowWrapper, TransferWrapper } from "./styles";
import { TableTransfer } from "./TableTransfer";

// const menuItems = () => [
//   {
//     title: "TVs",
//     key: "repair-management",
//     icon: <Image width="24" height="24" src={ServicesImage} />,
//     selectable: false,
//     children: [
//       {
//         title: "Device Manager",
//         key: "repair-management/device-manager",
//       },
//       {
//         title: "Rules",
//         key: "repair-management/rules",
//       },
//     ],
//   },
// ];

export const ModelTransfer = ({
  targetKeys,
  onChange,
  leftTableColumns,
  rightTableColumns,
  menuItems,
  data,
  onBrandSelected,
  selectedBrand,
}) => {
  const [selected, setSelected] = useState([]);

  const onSelect = (selectedKeys, event) => {
    onBrandSelected(event.selectedNodes[0].props.id);
    setSelected(selectedKeys);
  };

  useEffect(() => {
    if (selectedBrand) {
      setSelected(selectedBrand.key);
    }
  }, [selectedBrand]);

  return (
    <RowWrapper>
      <Col span="4">
        <MenuWrap>
          <Tree
            showIcon
            showLine={false}
            switcherIcon={<DownOutlined />}
            selectedKeys={selected}
            onSelect={onSelect}
            blockNode
            treeData={menuItems}
          />
        </MenuWrap>
      </Col>
      <Col span="20">
        <TransferWrapper>
          <TableTransfer
            dataSource={data}
            targetKeys={targetKeys}
            showSearch
            onChange={onChange}
            filterOption={(inputValue, item) =>
              item.device.indexOf(inputValue) !== -1 ||
              item.brand.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </TransferWrapper>
      </Col>
    </RowWrapper>
  );
};
