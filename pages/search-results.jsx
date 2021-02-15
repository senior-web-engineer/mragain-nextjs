import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";

import DefaultLayout from "@/components/layouts/Homepage";
import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  modelFetcher,
  shopListModule,
} from "@/components/search-results/modules";

import { Field, SyncFormValues } from "@/modules/forms/Blocks";
import { Listing, LoadMore } from "@/modules/list/Blocks";
import Form, { useFormContext } from "@/modules/forms";
import List from "@/modules/list";
import Select from "@/components/ui/Select";
import { createSelectComponent } from "@/modules/dataFetcher";
import { connect } from "react-redux";

//

const debouncedUpdateQuery = debounce(shopListModule.actions.updateQuery, 2000);

function ExampleItem({ item }) {
  return <div>{item.name}</div>;
}

const DeviceSelector = createSelectComponent({
  dataFetcher: deviceFetcher,
  parseOptions(items = []) {
    return items.map((item) => ({
      value: item.id,
      label: item.device_name,
    }));
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
    parseOptions(items, identifier) {
      return (items || []).map((item) => ({
        value: item.id,
        label: item.brand_name,
      }));
    },
  }),
  name: "device",
});

const ModelSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: modelFetcher,
    parseOptions(items = []) {
      return items.map((item) => ({
        value: item.id,
        label: item.model_name,
      }));
    },
    Component: (props) => {
      const { state } = useFormContext();
      return <Field {...props} identifier={state?.values?.band} />;
    },
  }),
  name: "brand",
});

export default function SearchResults() {
  useEffect(() => {
    async function main() {
      await filtersFormModule.actions.initialize();
      shopListModule.actions.initialize();
      deviceFetcher.fetch();
    }

    main();
  }, []);

  const onDeviceChange = useCallback((value) => {
    filtersFormModule.actions.onFieldChange({ name: "device", value });
    brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback((value) => {
    filtersFormModule.actions.onFieldChange({ name: "brand", value });
    modelFetcher.key(`${value}`).fetch();
  });

  return (
    <DefaultLayout>
      <Form module={filtersFormModule}>
        <DeviceSelector
          name="device"
          as={Select}
          label="Device"
          onChange={onDeviceChange}
        />
        <BrandSelector
          name="brand"
          as={Select}
          label="Brand"
          onChange={onBandChange}
        />
        <ModelSelector name="model" as={Select} label="Model" />
        <Field name="services" as={Select} label="Services" />
        <SyncFormValues onChange={debouncedUpdateQuery} />
      </Form>
      <List module={shopListModule}>
        <Listing Item={ExampleItem} />
        <LoadMore />
      </List>
    </DefaultLayout>
  );
}
