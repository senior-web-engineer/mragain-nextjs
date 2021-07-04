import React, { useCallback } from "react";

import {
  devicesFetcher,
  modelFetcher,
  brandFetcher,
  serviceFetcher,
} from "@/components/dashboard/modules";
import { Drawer } from "@/modules/modal";
import Form, { useFormContext } from "@/modules/forms";
import { SubTitle } from "@/components/styled/text";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import Input from "@/components/ui/Input";
import { createSelectComponent } from "@/modules/dataFetcher";
import Select from "@/components/ui/Select";
import get from "lodash/get";
import { DatePicker, TimePicker, Button } from "antd";

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

export const EditRecord = ({ createAppointmentFormModal, appointmentForm }) => {
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
    <Drawer width="500px" module={createAppointmentFormModal}>
      <Form module={appointmentForm}>
        <SubTitle>Customer information</SubTitle>
        <Field
          adminInput
          as={Input}
          name="customerName"
          label="Customer name"
        />
        <Field adminInput as={Input} name="email" label="Email address" />
        <Field
          adminInput
          as={Input}
          name="contactNumber"
          label="Contact number"
        />
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
        <Field adminInput as={DatePicker} label="Date" name="date" />
        <Field
          adminInput
          as={TimePicker}
          label="Time"
          name="time"
          format="HH:mm"
          minuteStep={15}
        />
        <Field
          adminInput
          as={Select}
          label="Duration"
          name="duration"
          options={DURATION_OPTIONS}
        />
        <Field adminInput as={Input} name="price" label="Price" />
        <Field adminInput as={Input} name="guarantee" label="Guarantee" />
        <Button type="primary" htmlType="submit">
          Create appointment
        </Button>
      </Form>
    </Drawer>
  );
};
