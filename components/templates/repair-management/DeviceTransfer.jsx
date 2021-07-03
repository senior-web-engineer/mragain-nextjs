import { useState } from "react";
import { Transfer, Table, Tag } from "antd";
import difference from "lodash/difference";

const mockTags = ["cat", "dog", "bird"];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    device: `content${i + 1}`,
    brand: mockTags[i % 3],
    model: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const leftTableColumns = (filteredInfo) => [
  {
    dataIndex: "device",
    title: "Device",
    render: (device) => <Tag color="green">{device}</Tag>,
    filters: [
      { text: "Content1", value: "content1" },
      { text: "Content2", value: "content2" },
    ],
    filteredValue: filteredInfo?.device || null,
    onFilter: (value, record) => {
      return record.device === value;
    },
  },
  {
    dataIndex: "brand",
    title: "Brand",
    onFilter: (value, record) => record.brand.indexOf(value) === 0,
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    dataIndex: "model",
    title: "Model",
  },
];
const rightTableColumns = [
  {
    dataIndex: "device",
    title: "Device",
    render: (device) => <Tag color="green">{device}</Tag>,
  },
  {
    dataIndex: "brand",
    title: "Brand",
  },
  {
    dataIndex: "model",
    title: "Model",
  },
];

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => {
  const [filteredInfo, setFilteredInfo] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  return (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns =
          direction === "left" ? leftColumns(filteredInfo) : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled: listDisabled || item.disabled,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
            onChange={handleChange}
          />
        );
      }}
    </Transfer>
  );
};

export const DeviceTransfer = ({ targetKeys, onChange }) => (
  <TableTransfer
    dataSource={mockData}
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
);
