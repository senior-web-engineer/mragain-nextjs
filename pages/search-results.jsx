import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import styled from "styled-components";

import DefaultLayout from "@/components/layouts/Homepage";
import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  modelFetcher,
  serviceFetcher,
  shopListModule,
} from "@/components/search-results/modules";

import { Field, SyncFormValues } from "@/modules/forms/Blocks";
import { Listing } from "@/modules/list/Blocks";
import Form, { useFormContext } from "@/modules/forms";
import List from "@/modules/list";
import Select from "@/components/ui/Select";
import { createSelectComponent } from "@/modules/dataFetcher";
import { Radio, Rate, Slider } from "antd";
import { MaxConstraints } from "@/components/styled/layout";
import Image from "next/image";
import { StyledInput } from "@/components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";

//

const MainWrap = styled.div`
  margin-bottom: -127px;
  background: linear-gradient(to right, #fff 30%, #f3f3f3 30%);
  > div {
    display: flex;
  }
`;

const Sidebar = styled.div`
  flex-basis: 200px;
  padding: 30px 30px 30px 0;
  background-color: #fff;
`;

const ModelFields = styled.div`
  display: flex;
  align-items: center;
  margin: 19px -20px;
  > div {
    width: 25%;
    margin-top: 0 !important;
    margin: 0 20px;
    background-color: #fff;

    > label {
      margin: 11px 11px 2px 11px;
    }
  }
`;

const ZipFields = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  height: 118px;
  padding: 0 30px;

  > div {
    margin-top: 0 !important;
  }

  hr {
    height: 41px;
    border: 0;
    border-left: 1px solid #ddd;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }
`;

const Content = styled.div`
  background-color: #f3f3f3;
  flex-grow: 1;
  padding: 50px;
  margin-right: -50px;
`;

const ShopWrap = styled.div`
  height: 210px;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
`;

const ShopImageWrap = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 15px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;

  dd {
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-size: 10px;
    line-height: 25px;
    border-radius: 3px;
    background-color: #fff;
    padding: 0 8px;
  }
`;

const ShopDetails = styled.div`
  margin-left: 21px;
  flex-grow: 1;
`;

ShopDetails.SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: block;
  }
`;

ShopDetails.NameWrap = styled.div`
  display: flex;
  flex-direction: column;

  .svg-inline--fa {
    margin-right: 8px;
  }
`;

ShopDetails.ThirdRow = styled.div`
  margin-top: 14px;
  border-top: 2px;
  padding-top: 8px;
  border-top: 2px solid #ddd;
  display: flex;
`;

ShopDetails.Service = styled.div`
  background-color: #f1fefa;
  color: #06c987;
  padding: 0 14px;
  line-height: 30px;
  border-radius: 5px;
  margin: 0 1px;
`

function ExampleItem({ item }) {
  const location = [item.shop.street || "", item.shop.city || ""]
    .filter(Boolean)
    .join(", ");

  function renderService(service) {
    return <ShopDetails.Service>{service}</ShopDetails.Service>;
  }

  return (
    <ShopWrap>
      <ShopImageWrap>
        {item.shop.bg_photo ? (
          <Image
            loading="lazy"
            src={item.shop.bg_photo}
            layout="fill"
            objectFit="cover"
          />
        ) : null}
        <dd>
          {item.shop.distance}
        </dd>
      </ShopImageWrap>
      <ShopDetails>
        <div>{item.shop.tag ? <tag>{item.shop.tag}</tag> : null}</div>
        <ShopDetails.SecondRow>
          <ShopDetails.NameWrap>
            {item.shop.name}
            {location ? (
              <location>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {location}
              </location>
            ) : null}
            <Rate disabled value={item.shop.mark} onChange={null} />
          </ShopDetails.NameWrap>
          <div>
            <label>Next available schedule</label>
            <date>27 Jan, 10:00AM</date>
          </div>
          {item.price ? (
            <div>
            <label>Starts at</label>
            <price>&euro; {item.price}</price>
          </div>
          ) : null}
        </ShopDetails.SecondRow>
        {item.shop.services?.length ? (
          <ShopDetails.ThirdRow>
            {(item.shop.services).map(renderService)}
          </ShopDetails.ThirdRow>
        ) : null}
      </ShopDetails>
    </ShopWrap>
  );
}

function parseOptions(arr, key) {
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

const ServiceSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: serviceFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "reparation_name");
    },
    Component: (props) => {
      const { state } = useFormContext();
      return <Field {...props} identifier={state?.values?.model} />;
    },
  }),
  name: "model",
});

const REPAIR_TYPES = [
  {
    label: "In-store",
    value: "in-store",
  },
  {
    label: "Home service",
    value: "home-service",
  },
  {
    label: "Delivery",
    value: "delivery",
  },
];

const DISTANCES = [
  {
    label: "+5 km",
    value: "5",
  },
  {
    label: "+10 km",
    value: "10",
  },
  {
    label: "+15 km",
    value: "15",
  },
  {
    label: "+30 km",
    value: "30",
  },
];

const WARRANTIES = [
  {
    label: "No warranty",
    value: "-1",
  },
  {
    label: "1 month warranty",
    value: "1",
  },
  {
    label: "6 month warranty",
    value: "6",
  },
];

const WORKING_TIME = [
  {
    label: "less than 30 minutes",
    value: "30",
  },
  {
    label: "less than 1 hour",
    value: "60",
  },
  {
    label: "less than 2 hours",
    value: "120",
  },
  {
    label: "within a day",
    value: "180",
  },
  {
    label: "in 3 days",
    value: "180",
  },
];

export default function SearchResults() {
  useEffect(() => {
    async function main() {
      await filtersFormModule.actions.initialize();
      shopListModule.actions.initialize();
      deviceFetcher.fetch();
      const formValues = filtersFormModule.state.values;
      if (formValues.device) {
        brandFetcher.key(formValues.device).fetch();
      }
      if (formValues.brand) {
        modelFetcher.key(formValues.brand).fetch();
      }

      if (formValues.model) {
        serviceFetcher.key(formValues.model).fetch();
      }
    }

    main();
  }, []);

  const onDeviceChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        device: value,
        brand: "0",
        model: "0",
        service: "0",
      },
    });
    brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        brand: value,
        model: "0",
        service: "0",
      },
    });
    modelFetcher.key(`${value}`).fetch();
  });

  const onModelChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        model: value,
        service: "0",
      },
    });
    serviceFetcher.key(`${value}`).fetch();
  });

  return (
    <DefaultLayout>
      <MainWrap>
        <MaxConstraints>
          <Sidebar>
            <Form module={filtersFormModule}>
              <Field name="price" as={Slider} label="Price" />
              {false && <Field name="rating" as={Rate} label="Rating" />}
              {false && <Field name="repairType" as={Radio.Group} label="Repair Type">
                {REPAIR_TYPES.map((type) => (
                  <Radio value={type.value}>{type.label}</Radio>
                ))}
              </Field>}
              <Field
                name="guarantee"
                as={Select}
                options={WARRANTIES}
                label="Warranty"
              />
              {false && <Field
                name="time"
                as={Select}
                options={WORKING_TIME}
                label="Working time"
              />}
            </Form>
          </Sidebar>
          <Content>
            <Form module={filtersFormModule}>
              <ZipFields>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <Field
                  as={StyledInput}
                  name="location"
                  placeholder="Postcode of stad"
                />
                <hr />
                <Field as={Select} name="distance" options={DISTANCES} />
                <Button>Search</Button>
              </ZipFields>
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
                  onChange={onModelChange}
                  dropdownStyle={{ minWidth: "200px" }}
                />
                <ServiceSelector
                  name="service"
                  as={Select}
                  label="Services"
                  dropdownStyle={{ minWidth: "200px" }}
                  popupPlacement="bottomRight"
                />
              </ModelFields>
              <SyncFormValues onChange={shopListModule.actions.updateQuery} />
            </Form>
            <List module={shopListModule}>
              <Listing Item={ExampleItem} />
            </List>
          </Content>
        </MaxConstraints>
      </MainWrap>
    </DefaultLayout>
  );
}
