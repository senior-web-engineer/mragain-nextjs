import { Col, DatePicker, Icon, Row, TimePicker } from "antd";
import get from "lodash/get";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
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
import { OnMobile } from "@/utils/media";
//

const PageTitle = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
`;

const PanelsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 10px;

  > div:nth-child(2) {
    margin-top: -50px;
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

const columns = [
  {
    width: "120px",
    title: "Datum",
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Tijd",
    render(data) {
      return data?.appointment?.time;
    },
  },
  {
    title: "Klant informatie",
    render(data) {
      return `${data?.appointment?.client_name} / ${data?.appointment?.client_phone}`;
    },
  },
  {
    title: "Model gegevens",
    render(data) {
      return `${data?.device?.device_name} /  ${data?.brand?.brand_name} / ${data?.model?.model_name}`;
    },
  },
  {
    title: "Reparatie",
    render(data) {
      return `${data?.reparation?.reparation_name}`;
    },
  },
  {
    title: "Prijs",
    render(data) {
      return `${data?.price}`;
    },
  },
  {
    title: "Status",
    render(data) {
      return <div>status</div>;
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

export default function DashboardPage({ auth_user }) {
  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      recentActivity.fetch();
      appointmentStats.fetch();
      reparationsList.actions.initialize();
    }

    loadData();
  }, []);

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
      <PageTitle>Welcome Back!</PageTitle>
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
        Create appointment
      </CreateButton>
      <List module={reparationsList}>
        <OnMobile show={false}>
          <Table columns={columns} pagination />
        </OnMobile>
        <OnMobile only>
          <Listing
            columns={columns}
            Item={({ item }) => (
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
                          <div>{item.appointment.time}</div>
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
                          Date & Time
                        </Text.Body>
                        <Text.Body lineHeight="16">
                          {moment(item.appointment.date).format("DD-MM-YY")}
                          <div>{item.appointment.time}</div>
                        </Text.Body>
                      </Col>
                      <Col span={12}>
                        <Text.Body lineHeight="16" upperCase>
                          Price
                        </Text.Body>
                        <Text.Body lineHeight="16">
                          &euro; {item.price}
                        </Text.Body>
                      </Col>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col span={12}>
                        <Text.Body lineHeight="16" upperCase>
                          Device details
                        </Text.Body>
                        <Text.Body lineHeight="16">
                          {item.brand.brand_name} {item.model.model_name}
                        </Text.Body>
                      </Col>
                      <Col span={12}>
                        <Text.Body lineHeight="16" upperCase>
                          Reparation type
                        </Text.Body>
                        <Text.Body lineHeight="16">
                          {item.reparation.reparation_name}
                        </Text.Body>
                      </Col>
                    </Row>
                  </div>
                </BoxContent>
              </BoxElement>
            )}
          />
        </OnMobile>
      </List>
      <Drawer width="500px" module={createAppointmentFormModal}>
        <Form module={appointmentForm}>
          <SubTitle>Customer information</SubTitle>
          <Field as={Input} name="customerName" label="Customer name" />
          <Field as={Input} name="email" label="Email address" />
          <Field as={Input} name="contactNumber" label="Contact number" />
          <SubTitle>Device information</SubTitle>
          <DeviceSelector
            as={Select}
            label="Device"
            name="device"
            onChange={onDeviceChange}
          />
          <BrandSelector
            as={Select}
            label="Brand"
            name="brand"
            onChange={onBandChange}
          />
          <ModelSelector
            as={Select}
            label="Model"
            name="model"
            onChange={onModelChange}
          />
          <ServiceSelector
            as={Select}
            label="Reparation"
            name="reparation"
            onChange={onReparationChange}
          />
          <SubTitle>Appointment schedule</SubTitle>
          <Field as={DatePicker} label="Date" name="date" />
          <Field
            as={TimePicker}
            label="Time"
            name="time"
            format="HH:mm"
            minuteStep={15}
          />
          <Field
            as={Select}
            label="Duration"
            name="duration"
            options={DURATION_OPTIONS}
          />
          <Field as={Input} name="price" label="Price" />
          <Field as={Input} name="guarantee_time" label="Guarantee" />
          <Button>Create appointment</Button>
        </Form>
      </Drawer>
    </DefaultLayout>
  );
}
