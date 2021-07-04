import { useState } from "react";
import { Transfer, Table, Tag } from "antd";
import difference from "lodash/difference";

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

export const DeviceTransfer = ({
  targetKeys,
  onChange,
  leftTableColumns,
  rightTableColumns,
  data,
}) => (
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
);
