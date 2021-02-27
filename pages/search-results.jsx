import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import isEqual from "fast-deep-equal";
import Menu from "react-horizontal-scrolling-menu";
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
import { Radio, Rate, Slider, Switch } from "antd";
import { MaxConstraints } from "@/components/styled/layout";
import Image from "next/image";
import { StyledInput } from "@/components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import { FieldWrap } from "@/components/styled/Forms";
import Map from "@/components/search-results/Map";
import { TAG_TO_COLOR } from "@/components/home/ShopsSection";
import { SubTitle } from "@/components/styled/text";
import { TextButton } from "@/components/ui/Button";
import Link from "next/link";
import media, { OnMobile, ScreenSizeProvider } from "@/utils/media";
//

const MainWrap = styled.div`
  margin-bottom: -127px;
  background: #f3f3f3;
  > div {
    display: flex;
  }

  ${media.tablet`
    padding-bottom: 0px;
    background: linear-gradient(to right, #fff 30%, #f3f3f3 30%);
  `}
`;

const Sidebar = styled.div`
  flex-basis: 200px;
  padding: 0 30px 30px 0;
  background-color: #fff;
  display: none;
  ${media.tablet`
    display: block;
  `}
`;

const SidebarInnerWrap = styled.div`
  position: sticky;
  top: 0;
`;

const MapTriggerWrap = styled(FieldWrap)`
  > label {
    margin-top: 0;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  height: 75px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: space-between;
  margin: 0 -30px 30px 0;

  ${TextButton} {
    font-size: 11px;
    letter-spacing: 0px;
    color: #ed1c24;
    font-weight: 300;
    margin-right: 37px;
    text-transform: none;
    height: auto;
    line-height: 1em;
  }
`;

const ModelFields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 19px 0;
  overflow: hidden;
  width: 100%;

  > div {
    flex-grow: 1;
    margin-top: 0 !important;
    margin: 10px 5px;
    background-color: #fff;

    > label {
      margin: 11px 11px 2px 11px;
    }
  }

  > div:first-child {
    background-color: transparent;
  }

  .ant-radio-group {
    max-width: 100%;
  }

  .ant-radio-button-wrapper {
    background-color: transparent;
    color: #fff;
    border: 0;
    padding: 0 11px;
    border-radius: 10px !important;

    &.ant-radio-button-wrapper-checked {
      color: #000;
      background-color: #fff;
    }
  }

  > ${MapTriggerWrap} {
    display: none;
    flex-grow: 0;
    background-color: transparent;

    > label {
      margin-top: 0;
    }
  }

  ${media.tablet`
    flex-direction: row;
    align-items: center;
    margin: 19px -5px;
    > div {
      margin: 0 5px;
    }

    > div:first-child {
      background-color: #fff;
    }

    > ${MapTriggerWrap} {
      display: block;
    }
  `}
`;

const ZipFields = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  height: 55px;
  padding: 0 10px;
  justify-content: space-between;
  background-color: #06b279;

  input {
    background-color: transparent;

    ::placeholder {
      color: #fff;
    }
  }

  .ant-select-selection {
    background-color: transparent;
    color: #fff;
  }

  .ant-input-prefix {
    color: #fff;
  }

  > div {
    margin-top: 0 !important;
  }

  hr {
    display: none;
    height: 41px;
    border: 0;
    border-left: 1px solid #ddd;
    margin: 0 30px;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }

  ${FieldWrap} {
    display: flex;
    align-items: center;
    margin: 0;

    > label {
      display: none;
      margin-bottom: 0;
      margin-right: 10px;
    }
  }

  ${media.tablet`
    padding: 0 20px;
    border-radius: 27px;
    border-radius: 5px;
    background-color: #fff;
    height: 70px;
    justify-content: flex-start;

    input {
      ::placeholder {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-input-prefix {
      color: rgba(0, 0, 0, 0.65);
    }

    ${FieldWrap} {
      margin: 0 20px;

      > label {
        display: block;
      }
    }

    hr {
      display: block;
    }
  `}
`;

const Content = styled.div`
  background-color: #f3f3f3;
  flex-grow: 1;
  padding: 0;
  max-width: 100%;

  form {
    margin: 0 -20px;
    padding: 30px 20px 0;
    position: relative;
    overflow: hidden;

    > div {
      position: relative;
      z-index: 1;
    }

    &:after {
      background-color: #06c987;
      content: "";
      width: 200%;
      height: 100%;
      position: absolute;
      top: -20%;
      left: -50%;
      border-radius: 400%;
    }
  }

  ${media.tablet`
    padding: 50px;
    margin-right: -50px;

    form:after {
      display: none;
    }
  `}
`;

const ModelFieldsMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #fff;
  align-items: center;
  border-radius: 15px;
  justify-content: space-between;

  .ant-select {
    margin-left: -11px;
  }

  hr {
    height: 41px;
    border: 0;
    border-left: 1px solid #ddd;
    width: 0;
    margin: 0 10px;
  }

  > div {
    width: 100%;
  }

  > div:nth-child(1),
  > div:nth-child(3) {
    width: 40%;
  }
`;

const ShopWrap = styled.div`
  height: 125px;
  border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 10px;

  ${media.tablet`
    height: 190px;
    padding: 20px;
  `}
`;

const ShopImageWrap = styled.div`
  min-width: 105px;
  height: 105px;
  border-radius: 5px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;

  ${media.tablet`
    min-width: 150px;
    height: 150px;
    border-radius: 15px;
  `}

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

  tag {
    display: inline-block;
    font-size: 8px;
    height: 31px;
    ${(props) =>
      props.tagColor &&
      css`
        background-color: ${props.tagColor || "#ddd"};
      `}
    color: #fff;
    line-height: 31px;
    padding: 0 10px;
    border-radius: 15px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
`;

ShopDetails.SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #303030;
  font-weight: 400;

  label {
    display: block;
    font-size: 10px;
    color: #707070;
    font-weight: 300;
  }

  ${Button} {
    display: none;
    min-width: 51px;
  }

  ${media.tablet`
    ${Button} {
      display: inline-block;
    }
  `}
`;

ShopDetails.NameWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #707070;
  font-weight: 300;

  h3 {
    font-size: 15px;
    color: #0d3244;
    font-weight: 500;
    margin: 0;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }

  .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }

  ${media.tablet`
    h3 {
      font-size: 20px;
    }
  `}
`;

ShopDetails.PriceWrap = styled.div`
  display: none;

  ${media.tablet`
    display: block;
  `}
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
  font-size: 10px;
`;

function ShopItem({ item }) {
  const location = [item.shop.street || "", item.shop.city || ""]
    .filter(Boolean)
    .join(", ");

  function renderService(service) {
    return <ShopDetails.Service>{service}</ShopDetails.Service>;
  }

  const tag = item.shop.tag;
  const formState = filtersFormModule.state.values;

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
        <dd>{item.shop.distance}</dd>
      </ShopImageWrap>
      <ShopDetails tagColor={TAG_TO_COLOR[tag]}>
        <div>{tag ? <tag>{tag}</tag> : null}</div>
        <ShopDetails.SecondRow>
          <ShopDetails.NameWrap>
            <h3>{item.shop.name}</h3>
            {location ? (
              <location>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {location}
              </location>
            ) : null}
            <Rate
              disabled
              style={{ fontSize: "13px" }}
              value={item.shop.mark}
              onChange={null}
            />
          </ShopDetails.NameWrap>
          {item.nextApointment ? (
            <div>
              <label>Next available schedule</label>
              <date>{new Date(item.nextApointment).toString()}</date>
            </div>
          ) : null}
          {item.price ? (
            <ShopDetails.PriceWrap>
              <label>Starts at</label>
              <price>&euro; {item.price}</price>
            </ShopDetails.PriceWrap>
          ) : null}
          <Link
            href={`/${item.shop.name}--${item.shop.city}?device=${formState.device}&brand=${formState.brand}&model=${formState.model}`}
          >
            <Button>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </ShopDetails.SecondRow>
        {item.shop.services?.length ? (
          <ShopDetails.ThirdRow>
            {item.shop.services.map(renderService)}
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

const MobileDeviceSelector = createSelectComponent({
  dataFetcher: deviceFetcher,
  parseOptions(items = []) {
    return parseOptions(items || [], "device_name");
  },
  Component({ options, ...rest }) {
    const menuData = options.map((option) => (
      <Radio.Button value={option.value}>{option.label}</Radio.Button>
    ));

    return (
      <Field as={Radio.Group} {...rest}>
        <Menu data={menuData} hideArrows={true} />
      </Field>
    );
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

const SORT_BY = [
  {
    label: "None",
    value: "0",
  },
  {
    label: "Price",
    value: "1",
  },
  {
    label: "Warranty",
    value: "2",
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

function ClearFilters() {
  const { state, actions } = useFormContext();

  const hasDiff = !isEqual(state.initialValues, state.values);
  if (!hasDiff) {
    return null;
  }

  return (
    <TextButton
      onClick={() => actions.batchChange({ updates: state.initialValues })}
    >
      Clear
    </TextButton>
  );
}

export default function SearchResults() {
  const [showMap, updateShowMap] = useState();
  const mobileSelectorsRef = useRef(null);
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
    <ScreenSizeProvider>
      <DefaultLayout>
        <MainWrap>
          <MaxConstraints>
            <Sidebar>
              <SidebarInnerWrap>
                <SidebarHeader>
                  <SubTitle>Refine results</SubTitle>
                  <Form module={filtersFormModule}>
                    <ClearFilters />
                  </Form>
                </SidebarHeader>
                <Form module={filtersFormModule}>
                  <Field name="price" as={Slider} label="Price" />
                  {false && <Field name="rating" as={Rate} label="Rating" />}
                  {false && (
                    <Field
                      name="repairType"
                      as={Radio.Group}
                      label="Repair Type"
                    >
                      {REPAIR_TYPES.map((type) => (
                        <Radio value={type.value}>{type.label}</Radio>
                      ))}
                    </Field>
                  )}
                  <Field
                    name="guarantee"
                    as={Select}
                    options={WARRANTIES}
                    label="Warranty"
                  />
                  {false && (
                    <Field
                      name="time"
                      as={Select}
                      options={WORKING_TIME}
                      label="Working time"
                    />
                  )}
                </Form>
              </SidebarInnerWrap>
            </Sidebar>
            <Content>
              <Form module={filtersFormModule}>
                <ZipFields>
                  <Field
                    prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                    noBorder
                    as={StyledInput}
                    name="location"
                    placeholder="Postcode of stad"
                  />
                  <hr />
                  <Field as={Select} label="Distance" name="distance" options={DISTANCES} />
                  <OnMobile show={false}>
                    <Field
                      name="sort"
                      as={Select}
                      options={SORT_BY}
                      label="Sort by"
                    />
                  </OnMobile>
                </ZipFields>
                <ModelFields>
                  <OnMobile only>
                    <MobileDeviceSelector name="device" />
                    <ModelFieldsMobile ref={mobileSelectorsRef}>
                      <BrandSelector
                        name="brand"
                        as={Select}
                        label="Brand"
                        onChange={onBandChange}
                        dropdownStyle={{ minWidth: "200px" }}
                      />
                      <hr />
                      <ModelSelector
                        name="model"
                        as={Select}
                        label="Model"
                        onChange={onModelChange}
                        dropdownStyle={{ minWidth: "200px" }}
                        getPopupContainer={() => mobileSelectorsRef.current}
                      />
                      <ServiceSelector
                        name="service"
                        as={Select}
                        label="Services"
                        dropdownStyle={{ minWidth: "200px" }}
                        popupPlacement="bottomRight"
                      />
                      <Field
                        name="sort"
                        as={Select}
                        options={SORT_BY}
                        label="Sort by"
                      />
                    </ModelFieldsMobile>
                  </OnMobile>
                  <OnMobile show={false}>
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
                  </OnMobile>
                  <MapTriggerWrap>
                    <label>Map</label>
                    <Switch
                      value={showMap}
                      onChange={(val) => updateShowMap(val)}
                    />
                  </MapTriggerWrap>
                </ModelFields>
                <SyncFormValues onChange={shopListModule.actions.updateQuery} />
              </Form>
              <List module={shopListModule}>
                <Listing Item={ShopItem} />
              </List>
            </Content>
            <List module={shopListModule}>{showMap ? <Map /> : null}</List>
          </MaxConstraints>
        </MainWrap>
      </DefaultLayout>
    </ScreenSizeProvider>
  );
}
