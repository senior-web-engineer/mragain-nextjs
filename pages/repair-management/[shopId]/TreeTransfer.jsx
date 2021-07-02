import { Tree, Row, Col, Button } from "antd";
import { useState, useCallback } from "react";

const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff",
                }}
              >
                sss
              </span>
            ),
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
  {
    title: "parent 1",
    key: "0-2",
    children: [
      {
        title: "parent 1-0",
        key: "0-2-0",
        children: [
          {
            title: "leaf",
            key: "0-2-0-0",
          },
          {
            title: "leaf",
            key: "0-2-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-2-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff",
                }}
              >
                sss
              </span>
            ),
            key: "0-2-1-0",
          },
        ],
      },
    ],
  },
];

export const TreeTransfer = () => {
  const [available, setAvailable] = useState(treeData);
  const [selected, setSelected] = useState([]);

  const [tempSelection, setTempSelection] = useState([]);

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    setTempSelection(info.checkedNodes);
  };

  const onRemove = () => {
    console.log("REMOVE");
  };

  const onAdd = useCallback(() => {
    console.log(tempSelection);
    setSelected(tempSelection);
  }, [tempSelection]);

  return (
    <Row type="flex">
      <Col span={10}>
        <Tree checkable onCheck={onCheck} treeData={available} />{" "}
      </Col>
      <Col span={4}>
        <Button onClick={onRemove}>Left</Button>
        <Button onClick={onAdd}>Right</Button>
      </Col>
      <Col span={10}>
        <Tree checkable onCheck={onCheck} treeData={selected} />
      </Col>
    </Row>
  );
};
