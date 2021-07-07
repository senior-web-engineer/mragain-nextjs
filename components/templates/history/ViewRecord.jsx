import React, { useCallback } from "react";
import { Descriptions, Badge } from "antd";

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

export const ViewRecord = ({ data, viewRecordModal }) => {
  console.log(data);
  return (
    <Drawer width="800px" module={viewRecordModal}>
      {data && (
        <div>
          <Descriptions title="Appointment Info" layout="vertical" bordered>
            <Descriptions.Item label="IMEI Number">
              {data?.price}
            </Descriptions.Item>
            <Descriptions.Item label="Reparation Type">
              {data?.reparation.reparation_name}
            </Descriptions.Item>
            <Descriptions.Item label="Reparation active">
              {data?.reparation.repair_active ? "YES" : "NO"}
            </Descriptions.Item>
            <Descriptions.Item label="Appointment date">
              {data?.appointment.date}
            </Descriptions.Item>
            <Descriptions.Item label="Client name" span={2}>
              {data?.appointment.client_name}
            </Descriptions.Item>
            <Descriptions.Item label="Guaranty" span={3}>
              <Badge status="processing" text={data?.guarantee} />
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
};
