import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row, Tree, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { MenuWrap, RowWrapper, TransferWrapper, ModelWrapper } from "./styles";

export const ModelTransfer = ({
  targetKeys,
  onChange,
  leftTableColumns,
  rightTableColumns,
  menuItems,
  data,
  onBrandSelected,
  selectedBrand,
  onEditModelReparations,
}) => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);

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
          <Row type="flex" justify="space-between">
            <Col>
              <h2>Google</h2>
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
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => setEditing(false)}
                    >
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
          </Row>
          <Row type="flex" gutter={[16, 16]}>
            {data
              .filter((item) => item.model.includes(search))
              .map((item) => {
                console.log(item, targetKeys);
                return (
                  <Col span={8}>
                    <ModelWrapper>
                      <p>{item.model}</p>
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
