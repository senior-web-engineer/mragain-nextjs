import React, { useState } from "react";
import { Drawer } from "@/modules/modal";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Divider,
  Switch,
} from "antd";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, editingKey: "" };
    this.columns = [
      {
        title: "Repair Type",
        dataIndex: "reparation.reparation_name",
      },
      {
        title: "Price",
        dataIndex: "price",
        editable: true,
        render: (price) => `$${price}`,
      },
      {
        title: "Guarantee Time",
        dataIndex: "guarantee_time",
        editable: true,
        render: (guarantee_time) =>
          `${guarantee_time} month${guarantee_time > 1 ? "s" : ""}`,
      },
      {
        title: "Reparation Time",
        dataIndex: "reparation_time",
        editable: true,
        render: (reparation_time) => `$${reparation_time} minutes`,
      },
      {
        title: "Active",
        dataIndex: "active",
        render: (active, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <EditableContext.Consumer>
              {(form) => (
                <Switch
                  defaultChecked={active}
                  onChange={(value) => {
                    form.setFieldsValue({ active: value });
                  }}
                />
              )}
            </EditableContext.Consumer>
          ) : (
            <span>{active === true ? "Active" : "Not Active"}</span>
          );
        },
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {(form) => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.key)}
            >
              Edit
            </a>
          );
        },
      },
    ];
  }

  isEditing = (record) => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType:
            col.dataIndex === "price" ||
            col.dataIndex === "guarantee_time" ||
            col.dataIndex === "reparation_time"
              ? "number"
              : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 16,
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export const EditModal = ({
  editRepairModelModal,
  appointmentForm,
  shopReparations,
}) => {
  return (
    <Drawer width="1000px" module={editRepairModelModal}>
      <h2>Model information</h2>
      <Divider />
      <p>Device</p>
      <h4>Samsung Galaxy ...</h4>
      <Divider />
      <p>Services</p>
      <EditableFormTable data={shopReparations} />
    </Drawer>
  );
};
