import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import isEqual from "fast-deep-equal";
import Menu from "react-horizontal-scrolling-menu";
import { Waypoint } from "react-waypoint";

import DefaultLayout from "@/components/layouts/Homepage";
import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  modelFetcher,
  refineSearchModal,
  serviceFetcher,
  shopListModule,
} from "@/components/search-results/modules";

import {
  Field,
  parseNativeEvent,
  SyncFormValues,
} from "@/modules/forms/Blocks";
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
  faSortAmountDown,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import { FieldWrap } from "@/components/styled/Forms";
import Map from "@/components/search-results/Map";
import { TAG_TO_COLOR } from "@/components/home/ShopsSection";
import { SubTitle } from "@/components/styled/text";
import { TextButton } from "@/components/ui/Button";
import Link from "next/link";
import media, { OnMobile, ScreenSizeProvider } from "@/utils/media";
import Modal from "@/modules/modal";
import { useRouter } from "next/router";
import GooglePlaces from "@/components/common/GooglePlaces";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import moment from "moment";

//

const MainWrap = styled.div`
  margin-bottom: -127px;
  background: #f3f3f3;
  padding-bottom: 30px;
  position: relative;

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
  border-radius: 27px;
  background-color: #fff;
  height: 55px;
  justify-content: space-between;
  background-color: #06b279;

  input {
    border: 0;
    background-color: transparent;
  }

  .ant-select-selection__placeholder {
    color: #fff;
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
    border-radius: 5px;
    background-color: #fff;
    height: 70px;

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

const MobileSearchWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
  display: flex;
  align-items: center;
  padding: 10px 20px 20px;
  background: linear-gradient(to bottom, #f3f3f3 90%, transparent 100%);

  ${ZipFields} {
    background-color: #fff;

    input {
      border: 0;
      background-color: transparent;
    }

    .ant-select-selection__placeholder {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-input-prefix {
      color: rgba(0, 0, 0, 0.65);
    }
  }
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
    margin-right: -43px;

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
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 0 2px #06c987;
      background-color: #e6f9f3;
    `}

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
    position: absolute;
    top: 15px;
    left: 0;
    display: inline-block;
    font-size: 8px;
    height: 26px;
    ${(props) =>
      props.tagColor &&
      css`
        background-color: ${props.tagColor || "#ddd"};
      `}
    color: #fff;
    line-height: 26px;
    padding: 0 10px;
    border-radius: 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    text-transform: uppercase;
    margin-bottom: 14px;

    ${media.tablet`
      position: static;
      height: 31px;
      line-height: 31px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    `}
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

const ToolbarButtonWrap = styled.div`
  border-radius: 36px;
  padding: 8px;
  position: relative;
  top: -20px;
  background-color: #fff;
  height: 67px;
`;

const MobileToolbar = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 11;
  justify-content: space-between;
  align-items: center;

  ${TextButton} {
    min-width: 40px;
    text-transform: none;
    font-size: 13px;
    font-weight: normal;
    .svg-inline--fa {
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  ${ToolbarButtonWrap} ${Button} {
    min-width: 51px;
    border-radius: 34px;
    font-size: 17px;
    box-shadow: 0 0 8px #06c987;
  }
`;

ShopDetails.PriceWrap = styled.div`
  display: none;
  margin-left: 40px;

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

ShopDetails.AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const shopRefs = {};
const ShopBridgeContext = createContext();

function ShopItem({ item }) {
  const router = useRouter();
  const { selectedShop, updateSelectedShop, showMap } = useContext(
    ShopBridgeContext
  );
  const location = [item.shop.street || "", item.shop.city || ""]
    .filter(Boolean)
    .join(", ");

  function renderService(service) {
    return <ShopDetails.Service>{service}</ShopDetails.Service>;
  }

  const tag = item.shop.tag;
  const formState = filtersFormModule.state.values;
  // API changed does not include the city any longer?
  // const shopRoute = `/${item.shop.name}--${item.shop.city}?device=${formState.device}&brand=${formState.brand}&model=${formState.model}`;
  const shopRoute = `/${item.shop.name}?device=${formState.device}&brand=${formState.brand}&model=${formState.model}`;

  function onClick() {
    if (!showMap) {
      router.push(shopRoute);
      return;
    }
    if (item.shop.id === selectedShop) {
      router.push(shopRoute);
      return;
    }

    updateSelectedShop(item.shop.id);
  }

  return (
    <ShopWrap
      ref={(node) => (shopRefs[item.shop.id] = node)}
      isSelected={item.shop.id === selectedShop}
      onClick={onClick}
    >
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
          <OnMobile show={false}>
            <ShopDetails.AppointmentInfo>
              {moment(item.next_slot).isValid() ? (
                <div>
                  <label>Eerst mogelijke afspraak</label>
                  <date>{moment(item.next_slot).format("DD MMM, hh:mm")}</date>
                </div>
              ) : null}
              {item.price ? (
                <ShopDetails.PriceWrap>
                  <label>Vanaf</label>
                  <price>&euro; {item.price}</price>
                </ShopDetails.PriceWrap>
              ) : null}
            </ShopDetails.AppointmentInfo>
          </OnMobile>
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
      <Radio.Button key={option.value} value={option.value}>
        {option.label}
      </Radio.Button>
    ));

    return (
      <Field as={Radio.Group} {...rest}>
        <Menu
          alignCenter={false}
          data={menuData}
          selected={rest.value}
          hideArrows={true}
        />
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
    label: "Rating Hoog-Laag",
    value: "0",
  },
  {
    label: "Hoog-Laag",
    value: "1",
  },
  {
    label: "Laag-Hoog",
    value: "2",
  },
];

const WARRANTIES = [
  {
    label: "Geen garantie",
    value: "-1",
  },
  {
    label: "1 maand garantie",
    value: "1",
  },
  {
    label: "6 maanden garantie",
    value: "6",
  },
];

const WORKING_TIME = [
  {
    label: "minder dan 30 minuten",
    value: "30",
  },
  {
    label: "minder dan 1 uur",
    value: "60",
  },
  {
    label: "minder dan 2 uur",
    value: "120",
  },
  {
    label: "binnen een dag",
    value: "180",
  },
  {
    label: "binnen 3 dagen",
    value: "180",
  },
];

const RefineModalWrap = styled.div`
  ${SubTitle} {
    margin-bottom: 21px;
  }

  .ant-select {
    margin-left: -11px;
  }

  footer {
    margin-top: 11px;
    border-top: 1px solid #ddd;
    padding-top: 30px;
    text-align: center;

    ${TextButton} {
      text-transform: none;
      font-weight: normal;
      font-size: 12px;
      color: #0076a3;
      font-weight: 400;
    }
  }
`;

function ClearFilters({ label = "Clear", alwaysShow = false }) {
  const { state, actions } = useFormContext();

  const hasDiff = !isEqual(state.initialValues, state.values);
  if (!alwaysShow && !hasDiff) {
    return null;
  }

  return (
    <TextButton
      onClick={() => actions.batchChange({ updates: state.initialValues })}
    >
      {label}
    </TextButton>
  );
}

function RefineFooter() {
  return (
    <footer>
      <Button onClick={() => refineSearchModal.actions.close()}>
        See results
      </Button>
      <Form module={filtersFormModule}>
        <ClearFilters label="Reset filters" alwaysShow />
      </Form>
    </footer>
  );
}

function RefineSearchForm() {
  return (
    <Form module={filtersFormModule}>
      <Field name="price" as={Slider} label="Price" />
      {false && <Field name="rating" as={Rate} label="Rating" />}
      {false && (
        <Field name="repairType" as={Radio.Group} label="Repair Type">
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
  );
}

export default function SearchResults() {
  const [showMobileSearch, setShowMobileSearch] = useState();
  const [selectedShop, updateSelectedShop] = useState(null);
  const [showMap, updateShowMap] = useState(false);

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

  useEffect(() => {
    if (shopRefs[selectedShop]) {
      shopRefs[selectedShop].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedShop]);

  const onDeviceChange = useCallback((ev) => {
    const value = parseNativeEvent(ev);
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

  const locationField = (
    <Field
      prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      noBorder
      as={GooglePlaces}
      name="location"
    />
  );

  return (
    <ScreenSizeProvider>
      <ShopBridgeContext.Provider
        value={{ selectedShop, updateSelectedShop, showMap }}
      >
        <DefaultLayout>
          <MainWrap>
            <MaxConstraints>
              <Sidebar>
                <SidebarInnerWrap>
                  <SidebarHeader>
                    <SubTitle>Filter resultaten</SubTitle>
                    <Form module={filtersFormModule}>
                      <ClearFilters />
                    </Form>
                  </SidebarHeader>
                  <RefineSearchForm />
                </SidebarInnerWrap>
              </Sidebar>
              <Content ref={mobileSelectorsRef}>
                <Form module={filtersFormModule}>
                  <ZipFields>
                    {locationField}
                    <hr />
                    <Field
                      as={Select}
                      label="Afstand"
                      name="distance"
                      options={DISTANCES}
                    />
                    <OnMobile show={false}>
                      <Field
                        name="sort"
                        as={Select}
                        options={SORT_BY}
                        label="Sorteer op"
                        dropdownStyle={{ minWidth: "150px" }}
                      />
                    </OnMobile>
                  </ZipFields>
                  <ModelFields>
                    <OnMobile only>
                      <MobileDeviceSelector
                        name="Apparaat"
                        onChange={onDeviceChange}
                      />
                      <ModelFieldsMobile>
                        <BrandSelector
                          name="brand"
                          as={Select}
                          label="Merk"
                          onChange={onBandChange}
                          dropdownStyle={{ minWidth: "200px" }}
                        />
                        <hr />
                        <ModelSelector
                          name="model"
                          as={Select}
                          label="Model"
                          onChange={onModelChange}
                        />
                        <ServiceSelector
                          name="service"
                          as={Select}
                          label="Reparatie"
                          dropdownStyle={{ minWidth: "200px" }}
                        />
                        <Waypoint
                          onEnter={() => setShowMobileSearch(false)}
                          onLeave={() => setShowMobileSearch(true)}
                        />
                        <Field
                          name="sort"
                          as={Select}
                          options={SORT_BY}
                          label="Sorteer op"
                        />
                      </ModelFieldsMobile>
                    </OnMobile>
                    <OnMobile show={false}>
                      <DeviceSelector
                        name="device"
                        as={Select}
                        label="Apparaat"
                        onChange={onDeviceChange}
                        dropdownStyle={{ minWidth: "200px" }}
                      />
                      <BrandSelector
                        name="brand"
                        as={Select}
                        label="Merk"
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
                        label="Reparatie"
                        dropdownStyle={{ minWidth: "200px" }}
                        popupPlacement="bottomRight"
                      />
                    </OnMobile>
                    <MapTriggerWrap>
                      <label>Kaart</label>
                      <Switch
                        checked={showMap}
                        onChange={(val) => updateShowMap(val)}
                      />
                    </MapTriggerWrap>
                  </ModelFields>
                  <SyncFormValues
                    onChange={async (data) => {
                      let parsedData = { ...data, lat: 0, long: 0 };
                      try {
                        const [result] = await geocodeByAddress(data.location);
                        const { lng, lat } = await getLatLng(result);

                        parsedData = {
                          ...parsedData,
                          long: lng,
                          lat,
                          location: "",
                        };
                      } catch (err) {
                        console.log(err);
                      }
                      shopListModule.actions.updateQuery(parsedData);
                    }}
                  />
                </Form>
                <List module={shopListModule}>
                  <Listing Item={ShopItem} />
                </List>
              </Content>
              <List module={shopListModule}>
                {showMap ? (
                  <Map
                    selectedShop={selectedShop}
                    updateSelectedShop={updateSelectedShop}
                  />
                ) : null}
              </List>
            </MaxConstraints>
            <OnMobile only>
              {showMobileSearch || showMap ? (
                <MobileSearchWrap>
                  <Form module={filtersFormModule}>
                    <ZipFields>
                      {locationField}
                      <hr />
                      <Field
                        as={Select}
                        label="Afstand"
                        name="distance"
                        options={DISTANCES}
                      />
                    </ZipFields>
                  </Form>
                </MobileSearchWrap>
              ) : null}
            </OnMobile>
            <OnMobile only>
              <MobileToolbar>
                <TextButton onClick={() => refineSearchModal.actions.open()}>
                  <FontAwesomeIcon icon={faSortAmountDown} />
                  Resultaten filteren
                </TextButton>
                <ToolbarButtonWrap>
                  <Button onClick={() => updateShowMap((state) => !state)}>
                    {!showMap ? (
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    ) : (
                      <FontAwesomeIcon icon={faStore} />
                    )}
                  </Button>
                </ToolbarButtonWrap>
              </MobileToolbar>
              <Modal module={refineSearchModal} footer={null}>
                <RefineModalWrap>
                  <SubTitle>Resultaten filteren</SubTitle>
                  <RefineSearchForm />
                  <RefineFooter />
                </RefineModalWrap>
              </Modal>
            </OnMobile>
          </MainWrap>
        </DefaultLayout>
      </ShopBridgeContext.Provider>
    </ScreenSizeProvider>
  );
}