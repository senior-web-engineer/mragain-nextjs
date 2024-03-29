import {
  fas,
  faCheck,
  faEdit,
  faEllipsisV,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, DatePicker, Icon, Row, TimePicker, Input,  Typography , Button as AntdButton , Form as AntdForm } from "antd";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Dropdown, Menu } from "antd";
import get from "lodash/get";
import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import {
  appointmentForm,
  appointmentStats,
  brandFetcher,
  cancelAppointment,
  cancelAppointmentModal,
  createAppointmentFormModal,
  currentUser,
  devicesFetcher,
  markAppointmentAsDone,
  markCompleteModal,
  modelFetcher,
  recentActivity,
  reparationsList,
  servicesFetcher,
} from "@/components/dashboard/modules";
import Notifications from "@/components/dashboard/Notifications";
import Stats from "@/components/dashboard/Stats";
import DefaultLayout from "@/components/layouts/Dashboard";
import {
  BoxContent,
  BoxElement,
  BoxHeader,
  MoreIcon,
  Separator,
} from "@/components/templates/history/MobileLists";
import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { createSelectComponent } from "@/modules/dataFetcher";
import Form, { useFormContext } from "@/modules/forms";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import List from "@/modules/list";
import { Listing, Table } from "@/modules/list/Blocks";
import Modal, { Drawer } from "@/modules/modal";
import media, { OnMobile, useScreenSize } from "@/utils/media";

import PicturesWall from "./PictureWall";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DrawerDivider from "../../assets/icons/ReactSVGIcons/DrawerDivider";


fontawesome.library.add(fab,fas, faCheck, faEdit, faEllipsisV, faPlus, faTimes)
const { Title } = Typography;

const DrawerStyled = styled(Drawer)`
  .ant-drawer-content-wrapper{
    max-width: 100%; 
  }
  .ant-drawer-header {
    background: #06c987;
    height: 81px;
    display: flex;
    align-items: center;
    border-radius: 0;
    span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .ant-drawer-title {
    color: #fafafa;
    display: flex;
    justify-content: center;
  }
  .ant-drawer-close {
    color: #fafafa;
  }
  .ant-upload-picture-card-wrapper {
    padding: 5px;
    background-color: #fafafa;
  }
`;
const FormItemStyled = styled(AntdForm.Item)`
  label {
    color: #909090;
    font-size: 14px;
    line-height: 16px;
  }
  .ant-calendar-picker{
    width: 100%;
  }
  .ant-time-picker{
    width: 100%;
  }
`;
const UploadPhotosWrapper = styled.div`
  border: 2px dashed #e4e4e4;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;
const PageTitle = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 10px;

  > div:nth-child(2) {
    margin-top: px;
  }
`;

const TableCellContent = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: #505050;
  em {
    display: block;
    font-style: normal;
    font-weight: normal;
    color: #909090;
  }
`;

export const CreateButton = styled(Button)`
  margin: 30px 0;
`;

const CenterText = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  flex-direction: column;

  p {
    margin: 0 !important;
  }
`;

const InlineFields = styled.div`
  ${media.desktop`
    display: flex;
    margin-right: -10px;
    > * {
      flex-grow: 1;
      margin-right: 10px;
    }
  `}
`;

const AppointmentMenuWrap = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusWrap = styled.div`
  padding: 4px 10px 5px;
  background: #e1effe;
  border-radius: 3px;
  color: #1e429f;
  font-size: 12px;
`;

const STATUS_TO_TEXT = {
  "-1": "In behandeling",
  "-2": "Gecancelled",
  1: "Afgerond",
};

const columns = [
  {
    width: "120px",
    title: "Datum",
    render(data) {
      return moment(data?.appointment?.date).format("DD-MM-YY");
    },
  },
  {
    title: "Tijd",
    render(data) {
      const timeParts = data?.appointment?.time.split(":");
      timeParts.pop();

      return timeParts.join(":");
    },
  },
  {
    title: "Klant informatie",
    render(data) {
      return (
        <TableCellContent>
          {data?.appointment?.client_name}
          <em>{data?.appointment?.client_phone}</em>
        </TableCellContent>
      );
    },
  },
  {
    title: "Model gegevens",
    render(data) {
      return (
        <TableCellContent>
          {data?.model?.model_name}
          <em>{data?.brand?.brand_name}</em>
        </TableCellContent>
      );
    },
  },
  {
    title: "Reparatie",
    render(data) {
      return (
        <TableCellContent>{data?.reparation?.reparation_name}</TableCellContent>
      );
    },
  },
  {
    title: "Prijs",
    render(data) {
      return <TableCellContent>&euro;{data?.price}</TableCellContent>;
    },
  },
  {
    title: "Status",
    render(data) {
      if (!STATUS_TO_TEXT[data.status]) {
        return null;
      }

      return <StatusWrap>{STATUS_TO_TEXT[data.status]}</StatusWrap>;
    },
  },
  {
    title: "",
    render(data) {
      const menu = (
        <Menu>
          <Menu.Item
            onClick={async () => {
              createAppointmentFormModal.actions.open({ id: data.id });
              await appointmentForm.actions.initialize();
              devicesFetcher.fetch();
              brandFetcher
                .key(`${appointmentForm.state.values.device}`)
                .fetch();
              modelFetcher.key(`${appointmentForm.state.values.brand}`).fetch();
              servicesFetcher
                .key(`${appointmentForm.state.values.model}`)
                .fetch();
            }}
          >
            <FontAwesomeIcon icon="edit" /> Bewerk afspraak
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              markAppointmentAsDone({
                ...data,
                email: data.appointment.client_email,
              })
            }
          >
            <FontAwesomeIcon icon="check" /> Afronden
          </Menu.Item>
          <Menu.Item hidden danger onClick={() => cancelAppointment(data)}>
            <FontAwesomeIcon icon="times" /> Annuleer afspraak
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger="click">
          <AppointmentMenuWrap>
          <FontAwesomeIcon icon="ellipsis-v" />
          </AppointmentMenuWrap>
        </Dropdown>
      );
    },
  },
];

function parseOptions(arr, labelKey, idKey = "id") {
  return arr.map((item) => ({
    value: get(item, idKey),
    label: get(item, labelKey),
  }));
}

const DeviceSelector = createSelectComponent({
  dataFetcher: devicesFetcher,
  parseOptions(items = []) {
    return parseOptions(items || [], "device_name");
  },
});

function AppendIdentifier({ Component, name }) {
  return function AppendedComponent(props) {
    const { state } = useFormContext();
    return <Component identifier={`${state?.values?.[name]}`} {...props} />;
  };
}

const BrandSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: brandFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "brand_name");
    },
  }),
  name: "device",
});

const ModelSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: modelFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "model_name");
    },
  }),
  name: "brand",
});

const ServiceSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: servicesFetcher,
    parseOptions(items = []) {
      return parseOptions(
        items || [],
        "reparation.reparation_name",
        "reparation.id"
      );
    },
  }),
  name: "model",
});

const DURATION_OPTIONS = [
  {
    label: "30 minutes",
    value: "30minutes",
  },
  {
    label: "60 minutes",
    value: "60minutes",
  },
  {
    label: "90 minutes",
    value: "90minutes",
  },
  {
    label: "1 day",
    value: "1day",
  },
];

function DashboardPage({ isEditMode }) {
  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      recentActivity.fetch();
      appointmentStats.fetch();
      reparationsList.actions.initialize();
    }

    loadData();
  }, []);

  const { size } = useScreenSize();

  const [selectedItem, setSelectedItem] = useState(null);

  const onDeviceChange = useCallback((ev) => {
    const value = parseNativeEvent(ev);
    appointmentForm.actions.batchChange({
      updates: {
        device: value,
        brand: "",
        model: "",
        reparation: "",
      },
    });
    brandFetcher.key(`${value}`).fetch();
  }, []);

  const onBandChange = useCallback((value) => {
    appointmentForm.actions.batchChange({
      updates: {
        brand: value,
        model: "",
        reparation: "",
      },
    });
    modelFetcher.key(`${value}`).fetch();
  }, []);

  const onModelChange = useCallback((value) => {
    appointmentForm.actions.batchChange({
      updates: {
        model: value,
        reparation: "",
      },
    });
    servicesFetcher.key(`${value}`).fetch();
  }, []);

  const onReparationChange = useCallback(async (value) => {
    appointmentForm.actions.batchChange({
      updates: {
        reparation: value,
      },
    });
    const services = await servicesFetcher
      .key(`${appointmentForm.state.values.model}`)
      .fetch();
    const serviceMetaInfo = services.find(
      (service) => service.reparation.id === value
    );
    if (serviceMetaInfo) {
      appointmentForm.actions.batchChange({
        updates: {
          price: serviceMetaInfo.price,
          guarantee_time: serviceMetaInfo.guarantee_time,
        },
      });
    }
  }, []);

  const [screenSize, setScreenSize] = useState(560);
  useEffect(() => {
    setScreenSize(window.innerWidth < 600 ? "100%" : 560);
  }, []);
  return (
    <DefaultLayout>
    <Head>
      <title>Dashboard | MrAgain</title>
      <meta name="description" content="Je dashboard" />
    </Head>	  
      <PageTitle>
        <OnMobile only>
          <Notifications />
        </OnMobile>
      </PageTitle>
      <PanelsWrap>
        <Stats />
        <OnMobile show={false}>
          <Notifications />
        </OnMobile>
      </PanelsWrap>
      <CreateButton
        onClick={() => {
          createAppointmentFormModal.actions.open();
          appointmentForm.actions.initialize();
          devicesFetcher.fetch();
        }}
      >
        <FontAwesomeIcon icon="plus" /> Nieuwe afspraak
      </CreateButton>
      <List module={reparationsList}>
        <OnMobile show={false}>
          <Table columns={columns} pagination />
        </OnMobile>
        <OnMobile only>
          <Listing
            columns={columns}
            Item={({ item }) => {
              const timeParts = item?.appointment?.time.split(":");
              timeParts.pop();

              const time = timeParts.join(":");
              return (
                <BoxElement
                  style={{ height: selectedItem === item.id ? 300 : 80 }}
                >
                  <MoreIcon>
                    <Icon type="eye" />
                  </MoreIcon>
                  <BoxHeader
                    selected={selectedItem === item.id}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <Row
                      type="flex"
                      justify="space-arround"
                      style={{ height: "80px" }}
                    >
                      <Col span={10}>
                        <CenterText>
                          <Text.Body lineHeight="16" weight="bold">
                            {moment(item.appointment.date).format("DD-MM-YY")}
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            <div>{time}</div>
                          </Text.Body>
                        </CenterText>
                      </Col>
                      <Col span={2}>
                        <Separator></Separator>
                      </Col>
                      <Col span={10}>
                        <CenterText>
                          <Text.Body weight="bold">
                            <div>{item.appointment.client_name}</div>
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            <div>{item.appointment.client_phone}</div>
                          </Text.Body>
                        </CenterText>
                      </Col>
                    </Row>
                  </BoxHeader>
                  <BoxContent
                    style={{ height: selectedItem === item.id ? 200 : 0 }}
                  >
                    <div style={{ padding: "30px 20px 20px 20px" }}>
                      <Row>
                        <Col span={12}>
                          <Text.Body lineHeight="16" upperCase>
                            Datum & tijd
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            {moment(item.appointment.date).format("DD-MM-YY")}
                            <div>{time}</div>
                          </Text.Body>
                        </Col>
                        <Col span={12}>
                          <Text.Body lineHeight="16" upperCase>
                            Prijs
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            &euro; {item.price}
                          </Text.Body>
                        </Col>
                      </Row>
                      <Row type="flex" justify="center">
                        <Col span={12}>
                          <Text.Body lineHeight="16" upperCase>
                            Details
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            {item.brand.brand_name} {item.model.model_name}
                          </Text.Body>
                        </Col>
                        <Col span={12}>
                          <Text.Body lineHeight="16" upperCase>
                            Reparatie
                          </Text.Body>
                          <Text.Body lineHeight="16">
                            {item.reparation.reparation_name}
                          </Text.Body>
                        </Col>
                      </Row>
                    </div>
                  </BoxContent>
                </BoxElement>
              );
            }}
          />
        </OnMobile>
      </List>
      <DrawerStyled
        title={
          <>
            <ArrowLeftOutlined
              style={{
                fontWeight: 700,
              }}
              onClick={() => {
                createAppointmentFormModal.actions.close();
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>{isEditMode ? "Bewerking afspraak" : "Nieuwe afspraak"}</span>
          </>
        }
        width={screenSize}
        maskClosable={false}
        module={createAppointmentFormModal}
      >
        <Form module={appointmentForm}>
          <Title level={4}>Afspraak gegevens</Title>
          <DrawerDivider />
          <FormItemStyled label="Klant">
            <Field
              as={Input}
              name="customerName"
              disabled={isEditMode}
            />
          </FormItemStyled>
          <FormItemStyled label="E-mailadres">
            <Field
              as={Input}
              name="email"
              disabled={isEditMode}
            />
          </FormItemStyled>
          <FormItemStyled label="Telefoonnummer">
            <Field
              as={Input}
              name="contactNumber"
              disabled={isEditMode}
            />
          </FormItemStyled>
          <Row gutter={24}>
            <Col span={12}>
              <FormItemStyled label="Datum">
                <Field
                  as={DatePicker}
                  name="date"
                  disabled={isEditMode}
                />
              </FormItemStyled>
            </Col>
            <Col span={12}>
              <FormItemStyled label="Tijd">
                <Field
                  as={TimePicker}
                  name="time"
                  format="HH:mm"
                  disabled={isEditMode}
                  minuteStep={15}
                />
              </FormItemStyled>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col span={12}>
              <FormItemStyled label="Duur">
                <Field
                  as={TimePicker}
                  name="duration"
                  format="HH:mm"
                  disabled={isEditMode}
                  minuteStep={5}
                />
              </FormItemStyled>
            </Col>
          </Row> */}
          <Title level={4}>Reparatie gegevens</Title>
          <DrawerDivider />
          <Row gutter={24}>
            <Col span={8}>
              <FormItemStyled label="Apparaat" >
                <DeviceSelector
                  as={Select}
                  name="device"
                  onChange={onDeviceChange}
                  dropdownStyle={{ minWidth: "200px" }}
                />
              </FormItemStyled>
            </Col>
            <Col span={8}>
              <FormItemStyled label="Merk">
                <BrandSelector
                  as={Select}
                  name="brand"
                  onChange={onBandChange}
                  dropdownStyle={{ minWidth: "200px" }}
                />
              </FormItemStyled>
            </Col>
            <Col span={8}>
              <FormItemStyled label="Model">
                <ModelSelector
                  as={Select}
                  name="model"
                  onChange={onModelChange}
                  dropdownStyle={{ minWidth: "200px" }}
                />
              </FormItemStyled>
            </Col>
          </Row>
          <FormItemStyled label="Reparatie">
            <ServiceSelector
              as={Select}
              name="reparation"
              onChange={onReparationChange}
            />
          </FormItemStyled>
          <Row gutter={24}>
            <Col span={12}>
              <FormItemStyled label="Prijs (€)" >
                <Field
                  as={Input}
                  name="price"
                />
              </FormItemStyled>
            </Col>
            <Col span={12}>
              <FormItemStyled label="Garantie (maanden)" >
                <Field
                  as={Input}
                  disabled
                  name="guarantee_time"
                />
              </FormItemStyled>
            </Col>
          </Row>
          <FormItemStyled label="IMEI/referentie" >
            <Field
              as={Input}
              name="referentie"
              placeholder="IMEI of referentie" 
              disabled={isEditMode}
            />
          </FormItemStyled>
          <Title level={4}>Extra informatie</Title>
          <DrawerDivider />
          <FormItemStyled label="Opmerkingen" name="comments">
                 <Field
                  as={Input.TextArea}
                  rows={4}
                  name="comments"
               />
          </FormItemStyled>
          <FormItemStyled name="images" label="Foto's">
            <UploadPhotosWrapper>
              <Field
                  as={PicturesWall}
                  textarea
                  appointmentForm={appointmentForm}
                  name="images"
                />
            </UploadPhotosWrapper>
          </FormItemStyled>
          <ButtonContainer>
            <AntdButton
              size="large"
              shape="round"
              block
              style={{ height: '50px' }}
              onClick={() => {
                createAppointmentFormModal.actions.close();
              }}
            >
              Cancel
            </AntdButton>
            <Button style={{width: '100%'}}>{isEditMode ? "Update afspraak" : "Maak afspraak"}</Button>
          </ButtonContainer>
        </Form>
      </DrawerStyled>  
      <Modal module={markCompleteModal} okText="Bevestig">
        <Image
          src="/images/complete_repairment.png"
          width={324}
          height={103}
          alt="Afspraak afgerond logo"
        />
        <h2>Reparatie afgerond</h2>
        <p>
          We sturen een email naar de klant om een review voor je achter te
          laten. Wil je doorgaan en de reparatie afronden?
        </p>
      </Modal>
      <Modal module={cancelAppointmentModal} okText="Bevestig">
        <h2>Afspraak annuleren ?</h2>
        <p>Laat de klant weten dat je de afspraak hebt geannuleerd.</p>
      </Modal>
    </DefaultLayout>
  );
}

export default connect(() => ({
  isEditMode: !!createAppointmentFormModal.selectors.data?.id,
}))(DashboardPage);
