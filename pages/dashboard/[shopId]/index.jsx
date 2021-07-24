import { DatePicker, notification, TimePicker } from "antd";
import get from "lodash/get";
import React, { useCallback, useEffect } from "react";

import { Popover } from "@/components/common/Popover";
import {
  appointmentForm,
  brandFetcher,
  createAppointmentFormModal,
  currentUser,
  devicesFetcher,
  modelFetcher,
  reparationsList,
  serviceFetcher,
} from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { createSelectComponent } from "@/modules/dataFetcher";
import Form, { useFormContext } from "@/modules/forms";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import List from "@/modules/list";
import { Table } from "@/modules/list/Blocks";
import { Drawer } from "@/modules/modal";

//

const columns = [
  {
    width: "120px",
    title: "Date",
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Time",
    render(data) {
      return data?.appointment?.time;
    },
  },
  {
    title: "Customer information",
    render(data) {
      return `${data?.appointment?.client_name} / ${data?.appointment?.client_phone}`;
    },
  },
  {
    title: "Device details",
    render(data) {
      return `${data?.device?.device_name} /  ${data?.brand?.brand_name} / ${data?.model?.model_name}`;
    },
  },
  {
    title: "Reparation",
    render(data) {
      return `${data?.reparation?.reparation_name}`;
    },
  },
  {
    title: "Price",
    render(data) {
      return `${data?.price}`;
    },
  },
  {
    title: "Status",
    render(data) {
      return <Popover />;
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
  return function (props) {
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
    dataFetcher: serviceFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "reparation_name");
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
      reparationsList.actions.initialize();
    }

    loadData();
  }, []);

  const onDeviceChange = useCallback((ev) => {
    const value = parseNativeEvent(ev);
    appointmentForm.actions.batchChange({
      updates: {
        device: value,
        brand: "",
        model: "",
        service: "",
      },
    });
    brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback((value) => {
    appointmentForm.actions.batchChange({
      updates: {
        brand: value,
        model: "",
        service: "",
      },
    });
    modelFetcher.key(`${value}`).fetch();
  });

  const onModelChange = useCallback((value) => {
    appointmentForm.actions.batchChange({
      updates: {
        model: value,
        service: "",
      },
    });
    serviceFetcher.key(`${value}`).fetch();
  });

  return (
    <DefaultLayout>
      <h1>Welcome Back!</h1>
      <Button
        onClick={() => {
          createAppointmentFormModal.actions.open();
          appointmentForm.actions.initialize();
          devicesFetcher.fetch();
        }}
      >
        Create appointment
      </Button>
      <List module={reparationsList}>
        <Table columns={columns} pagination />
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
          <ServiceSelector as={Select} label="Repration" name="reparation" />
          <SubTitle>Appointment scheduele</SubTitle>
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
          <Field as={Input} name="guarantee" label="Guarantee" />
          <Button>Create appointment</Button>
        </Form>
      </Drawer>
    </DefaultLayout>
  );
}
