import { DownOutlined } from "@ant-design/icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, DatePicker, Icon, Row, TimePicker } from "antd";
import { Dropdown, Menu } from "antd";
import get from "lodash/get";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import {
  appointmentForm,
  appointmentStats,
  brandFetcher,
  createAppointmentFormModal,
  currentUser,
  devicesFetcher,
  modelFetcher,
  recentActivity,
  reparationsList,
  servicesFetcher,
} from "@/components/dashboard/modules";
import Notifications from "@/components/dashboard/Notifications";
import Stats from "@/components/dashboard/Stats";
import DefaultLayout from "@/components/layouts/Dashboard";
import { FieldWrapAdmin } from "@/components/styled/Forms";
import { SubTitle } from "@/components/styled/text";
import {
  BoxContent,
  BoxElement,
  BoxHeader,
  MoreIcon,
  Separator,
} from "@/components/templates/history/MobileLists";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { createSelectComponent } from "@/modules/dataFetcher";
import Form, { useFormContext } from "@/modules/forms";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import List from "@/modules/list";
import { Listing, Table } from "@/modules/list/Blocks";
import { Drawer } from "@/modules/modal";
import media, { OnMobile, useScreenSize } from "@/utils/media";

import PicturesWall from "./PictureWall";
//

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

const FormSectionTitle = styled(SubTitle)`
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 11px;
  margin-bottom: 24px;
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
      return <div>{data.status}</div>;
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
            Edit
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger="click">
          <DownOutlined />
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

  return (
    <DefaultLayout>
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
        <FontAwesomeIcon icon={faPlus} /> Nieuwe afspraak
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
      <Drawer
        width={size === "mobile" ? "90%" : "600px"}
        module={createAppointmentFormModal}
      >
        <Form module={appointmentForm}>
          <FormSectionTitle>Klant gegevens</FormSectionTitle>
          <FieldWrapAdmin>
            <Field as={Input} name="customerName" label="Naam" />
          </FieldWrapAdmin>
          <FieldWrapAdmin>
            <Field as={Input} name="email" label="E-mailadres" />
          </FieldWrapAdmin>
          <FieldWrapAdmin>
            <Field as={Input} name="contactNumber" label="Telefoon nummer" />
          </FieldWrapAdmin>
          <FormSectionTitle>Reparatie details</FormSectionTitle>
          <InlineFields>
            <FieldWrapAdmin>
              <DeviceSelector
                as={Select}
                label="Apparaat"
                name="device"
                onChange={onDeviceChange}
              />
            </FieldWrapAdmin>
            <FieldWrapAdmin>
              <BrandSelector
                as={Select}
                label="Merk"
                name="brand"
                onChange={onBandChange}
              />
            </FieldWrapAdmin>
            <FieldWrapAdmin>
              <ModelSelector
                as={Select}
                label="Model"
                name="model"
                onChange={onModelChange}
              />
            </FieldWrapAdmin>
          </InlineFields>
          <FieldWrapAdmin>
            <ServiceSelector
              as={Select}
              label="Reparatie"
              name="reparation"
              onChange={onReparationChange}
            />
          </FieldWrapAdmin>
          <FormSectionTitle>Datum & Tijd</FormSectionTitle>
          <InlineFields>
            <FieldWrapAdmin>
              <Field as={DatePicker} label="Datum" name="date" />
            </FieldWrapAdmin>
            <FieldWrapAdmin>
              <Field
                as={TimePicker}
                label="Tijd"
                name="time"
                format="HH:mm"
                minuteStep={15}
              />
            </FieldWrapAdmin>
          </InlineFields>
          <FieldWrapAdmin>
            <Field
              as={Select}
              label="Duur"
              name="duration"
              options={DURATION_OPTIONS}
            />
          </FieldWrapAdmin>
          <FieldWrapAdmin>
            <Field as={Input} name="price" label="Prijs" />
          </FieldWrapAdmin>
          <FieldWrapAdmin>
            <Field as={Input} name="guarantee_time" label="Garantie" />
          </FieldWrapAdmin>
          {isEditMode ? (
            <>
              <FormSectionTitle>Remarks</FormSectionTitle>
              <FieldWrapAdmin>
                <Field as={Input} textarea name="comments" label="Comments" />
              </FieldWrapAdmin>

              <FieldWrapAdmin>
                <Field
                  as={PicturesWall}
                  textarea
                  name="images"
                  label="Images"
                />
              </FieldWrapAdmin>
            </>
          ) : null}
          <Button>{isEditMode ? "Update afspraak" : "Maak afspraak"}</Button>
        </Form>
      </Drawer>
    </DefaultLayout>
  );
}

export default connect(() => ({
  isEditMode: !!createAppointmentFormModal.selectors.data?.id,
}))(DashboardPage);
