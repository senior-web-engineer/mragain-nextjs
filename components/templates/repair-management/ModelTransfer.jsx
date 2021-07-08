import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row, Tree, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  MenuWrap,
  RowWrapper,
  TransferWrapper,
  ModelWrapper,
  RowActionsWrapper,
} from "./styles";

export const ModelTransfer = ({
  targetKeys,
  onChange,
  menuItems,
  data,
  onBrandSelected,
  selectedBrand,
  onEditModelReparations,
  onModelsSaved,
}) => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [selectedBrandTitle, setSelectedBrandTitle] = useState("");
  const [selectedDevice, setSelectedDevice] = useState();

  const onSelect = (selectedKeys, event) => {
    console.log(selectedKeys, event);
    setSelectedBrandTitle(event.selectedNodes[0].props.title);
    onBrandSelected(event.selectedNodes[0].props.id);
    setSelectedDevice(selectedKeys[0].split("-")[0]);
    setSelected(selectedKeys);
  };

  const onSave = () => {
    onModelsSaved(selectedDevice);
    setEditing(false);
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
          <RowActionsWrapper type="flex" justify="space-between">
            <Col>
              <h3>{selectedBrandTitle}</h3>
            </Col>
            <Col>
              <Row type="flex" gutter={[16, 16]}>
                <Col>
                  <Input
                    size="large"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </Col>
                <Col>
                  <Button size="large">Import</Button>
                </Col>
                <Col>
                  <Button size="large">Export</Button>
                </Col>
                <Col>
                  {editing ? (
                    <Button size="large" type="primary" onClick={onSave}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </RowActionsWrapper>
          <Row type="flex" gutter={[16, 16]}>
            {data
              .filter((item) => item.model.includes(search))
              .filter((item) =>
                !editing ? targetKeys.includes(item.key) : true
              )
              .map((item) => {
                return (
                  <Col span={8}>
                    <ModelWrapper>
                      <p style={{ margin: 0 }}>{item.model}</p>
                      {editing ? (
                        <Checkbox
                          defaultChecked={targetKeys.includes(item.key)}
                          onChange={() => onChange(item.key)}
                        />
                      ) : (
                        <Button onClick={() => onEditModelReparations(item)}>
                          Edit
                        </Button>
                      )}
                    </ModelWrapper>
                  </Col>
                );
              })}
          </Row>
        </TransferWrapper>
      </Col>
    </RowWrapper>
  );
};
