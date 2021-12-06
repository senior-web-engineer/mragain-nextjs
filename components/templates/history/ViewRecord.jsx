import React from "React";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Typography, Button } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Drawer } from "@/modules/modal";

import DrawerDivider from "../../../assets/icons/ReactSVGIcons/DrawerDivider";

const { Title } = Typography;

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

const DrawerStyled = styled(Drawer)`
  .ant-drawer-header {
    background: #06c987;
    height: 81px;
    display: flex;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .ant-drawer-title {
    color: #fafafa;
  }
  .ant-drawer-close {
    color: #fafafa;
  }
  .ant-upload-picture-card-wrapper {
    padding: 5px;
    background-color: #fafafa;
  }
`;

const FormItemStyled = styled(Form.Item)`
  label {
    color: #909090;
    font-size: 14px;
    line-height: 22px;
  }
`;

const CustomerDetailsForm = ({ data }) => {
  // const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      // form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <FormItemStyled label="Customer Name">
        <Input
          placeholder="input placeholder"
          value={data?.appointment.client_name}
        />
      </FormItemStyled>
      <FormItemStyled label="Email Address">
        <Input
          placeholder="input placeholder"
          value={data?.appointment.client_email}
        />
      </FormItemStyled>
      <FormItemStyled label="Contact Number">
        <Input
          placeholder="input placeholder"
          value={data?.appointment.client_phone}
        />
      </FormItemStyled>
    </Form>
  );
};

const ReparationDetailsForm = ({ data }) => {
  // const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      // form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row gutter={24}>
        <Col span={8}>
          <FormItemStyled label="Device Type">
            <Input placeholder="Phone" value={data?.device.device_name} />
          </FormItemStyled>
        </Col>
        <Col span={8}>
          <FormItemStyled label="Brand">
            <Input placeholder="Samsung" value={data?.device.brand_name} />
          </FormItemStyled>
        </Col>
        <Col span={8}>
          <FormItemStyled label="Model">
            <Input
              placeholder="Galaxy S20 5G"
              value={data?.device.model_name}
            />
          </FormItemStyled>
        </Col>
      </Row>

      <FormItemStyled label="Reparation type">
        <Input
          placeholder="Battery replacement"
          value={data?.reparation.reparation_name}
        />
      </FormItemStyled>
      <FormItemStyled label="IMEI number">
        <Input
          placeholder="Type the IMEI number of the device"
          value={data?.serialnumber}
        />
      </FormItemStyled>

      <Row gutter={24}>
        <Col span={12}>
          <FormItemStyled label="Date">
            <Input type="date" placeholder="" value={data?.appointment.date} />
          </FormItemStyled>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItemStyled label="Price">
            <Input placeholder="£ 135,00" value={data?.price} />
          </FormItemStyled>
        </Col>
        <Col span={12}>
          <FormItemStyled label="Guarantee">
            <Input placeholder="3 months" value={data?.guarantee} />
          </FormItemStyled>
        </Col>
      </Row>
    </Form>
  );
};

const UploadPhotosWrapper = styled.div`
  border: 2px dashed #e4e4e4;
  padding: 20px;
`;

const RemarksForm = ({ data }) => {
  // const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      // form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <br />
      <FormItemStyled label="Complaints and remarks">
        <Input.TextArea
          placeholder="input placeholder"
          rows={4}
          value={data?.reparation.comments}
        />
      </FormItemStyled>
      <FormItemStyled label="Photos and videos of the device">
        <UploadPhotosWrapper>
          <PicturesWall />
        </UploadPhotosWrapper>
      </FormItemStyled>
    </Form>
  );
};

export const ViewRecord = ({ data, viewRecordModal }) => {
  console.log(data, viewRecordModal);


  const [visible, setVisible] = useState(false);

  const [screenSize, setScreenSize] = useState(800);

  const getGuaranteeStatus = (date, guarantee) => {
    return moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))
      ? "error"
      : "processing";
  };

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth < 450 ? "100%" : 562);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DrawerStyled
      title={
        <>
          <ArrowLeftOutlined onClick={() => {
              viewRecordModal.actions.close()
            }} />
          &nbsp;&nbsp;
          <span>Show details</span>
        </>
      }
      width={screenSize}
      module={viewRecordModal}
    >
      {data && (
        <div>
          <Title level={4}>Customer details</Title>
          <DrawerDivider />
          <CustomerDetailsForm data={data} />

          <Title level={4}>Reparation details</Title>
          <DrawerDivider />
          <ReparationDetailsForm data={data} />

          <Title level={4}>Remarks</Title>
          <DrawerDivider />
          <RemarksForm data={data} />

          <Row type="flex" justify="end">
            <Button type="primary" size="large" shape="round" onClick={() => {
              viewRecordModal.actions.close()
            }} >
              Go Back
            </Button>
          </Row>
        </div>
      )}
    </DrawerStyled>
  );
};
