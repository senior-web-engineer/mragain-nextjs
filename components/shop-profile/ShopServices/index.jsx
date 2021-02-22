import { createSelectComponent } from "@/modules/dataFetcher";
import React, { useCallback, useEffect } from "react";
import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  shopServicesListModule,
  modelFetcher,
  serviceFormModule,
} from "../modules";
import Form, { useFormContext } from "@/modules/forms";
import { Field, SyncFormValues } from "@/modules/forms/Blocks";
import Select from "@/components/ui/Select";
import List from "@/modules/list";
import { Listing, Table } from "@/modules/list/Blocks";
import styled from "styled-components";
import { MaxConstraints } from "@/components/styled/layout";
import { Radio } from "antd";

const ServiceRowWrap = styled.div`
  display: flex;
`;

const ModelFields = styled.div`
  display: flex;
  align-items: center;
  margin: 19px -5px;

  > div {
    flex-grow: 1;
    margin-top: 0 !important;
    margin: 0 5px;
    background-color: #fff;

    > label {
      margin: 11px 11px 2px 11px;
    }
  }
`;

const SERVICE_COLUMNS = [
  {
    title: "Name",
    key: "reparation_name",
    render: (item) => <div><Field as={Radio} name={item.reparation_id}/> {item.reparation.reparation_name}</div>,
  },
  {
    title: "Warranty",
    dataIndex: "guarantee_time",
    key: "guarantee_time",
  },
  {
    title: "Working time",
    dataIndex: "reparation_time",
    key: "reparation_time",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => <span>&euro;{text}</span>,
  },
];

function parseOptions(arr, key) {
  console.log(arr);
  return [
    {
      id: "0",
      [key]: "All",
    },
    ...arr,
  ].map((item) => ({
    value: `${item.id}`,
    label: item[key],
  }));
}

const DeviceSelector = createSelectComponent({
  dataFetcher: deviceFetcher,
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
    Component: (props) => {
      const { state } = useFormContext();
      return <Field {...props} identifier={state?.values?.brand} />;
    },
  }),
  name: "brand",
});

export default function ShopServices({ shop }) {
  useEffect(() => {
    async function main() {
      await filtersFormModule.actions.initialize(shop.id);
      shopServicesListModule.actions.initialize();
      serviceFormModule.actions.initialize();
      deviceFetcher.fetch();
    }

    main();
  }, [shop.id]);

  const onDeviceChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        device: value,
        brand: "0",
        model: "0",
      },
    });
    brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        brand: value,
        model: "0",
      },
    });
    modelFetcher.key(`${value}`).fetch();
  });

  return (
    <MaxConstraints>
      <Form module={filtersFormModule}>
        <ModelFields>
          <DeviceSelector
            name="device"
            as={Select}
            label="Device"
            onChange={onDeviceChange}
            dropdownStyle={{ minWidth: "200px" }}
          />
          <BrandSelector
            name="brand"
            as={Select}
            label="Brand"
            onChange={onBandChange}
            dropdownStyle={{ minWidth: "200px" }}
          />
          <ModelSelector
            name="model"
            as={Select}
            label="Model"
            dropdownStyle={{ minWidth: "200px" }}
          />
        </ModelFields>
        <SyncFormValues onChange={shopServicesListModule.actions.updateQuery} />
      </Form>
      <List module={shopServicesListModule}>
        <Form module={serviceFormModule}>
          <Table columns={SERVICE_COLUMNS} />
        </Form>
      </List>
    </MaxConstraints>
  );
}
