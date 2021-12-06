import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Typography } from "antd";
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
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-xxx",
        percent: 50,
        name: "image.png",
        status: "uploading",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      },
    ],
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
`;

const CustomerDetailsForm = () => {
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
      <Form.Item label="Customer Name">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Email Address">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input placeholder="input placeholder" />
      </Form.Item>
    </Form>
  );
};

const ReparationDetailsForm = () => {
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
          <Form.Item label="Customer Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email Address">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Contact Number">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Customer Name">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Email Address">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Customer Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Customer Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Customer Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const UploadPhotosWrapper = styled.div`
  border: 1px dashed;
  padding: 20px;
`;

const RemarksForm = () => {
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
      <Form.Item label="Complaints and remarks">
        <Input.TextArea placeholder="input placeholder" rows={4} />
      </Form.Item>
      <Form.Item label="Photos and videos of the device">
        <UploadPhotosWrapper>
          <PicturesWall />
        </UploadPhotosWrapper>
      </Form.Item>
    </Form>
  );
};

export const ViewRecord = ({ data, viewRecordModal }) => {
  const [screenSize, setScreenSize] = useState(800);

  const getGuaranteeStatus = (date, guarantee) => {
    return moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))
      ? "error"
      : "processing";
  };

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth < 450 ? "100%" : 800);
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
          <ArrowLeftOutlined />
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
          <CustomerDetailsForm />

          <Title level={4}>Reparation details</Title>
          <DrawerDivider />
          <ReparationDetailsForm />

          <Title level={4}>Remarks</Title>
          <DrawerDivider />
          <RemarksForm />
        </div>
      )}
    </DrawerStyled>
  );
};
