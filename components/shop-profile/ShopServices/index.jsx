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
import {
  Field,
  parseNativeEvent,
  SyncFormValues,
} from "@/modules/forms/Blocks";
import Select from "@/components/ui/Select";
import List from "@/modules/list";
import { Listing, Table } from "@/modules/list/Blocks";
import styled from "styled-components";
import { MaxConstraints } from "@/components/styled/layout";
import { Checkbox, Radio } from "antd";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Menu from "react-horizontal-scrolling-menu";
import { OnMobile, useScreenSize } from "@/utils/media";

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

const ReparationCell = styled.div`
  > div {
    display: flex;
  }
  .ant-checkbox-wrapper,
  .ant-radio-wrapper {
    font-size: 15px;
    color: #303030;
    font-weight: 500;
    text-transform: none;
  }
  .ant-radio,
  .ant-checkbox {
    margin-right: 36px;
  }
`;

const NextStepWrap = styled.div`
  margin: 49px 0 86px;
`;

const MobileToolbar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 110;
  left: 0;
  justify-content: flex-end;
  align-items: center;

  ${NextStepWrap} {
    text-align: right;
    margin: 0;
  }

  ${Button} {
    padding: 7px 22px;
    height: 37px;
    line-height: 23px;
    box-shadow: 0 0 8px #06c987;

    &[disabled] {
      box-shadow: 0 0 8px #a0a0a0;
    }
  }
`;


const SERVICE_COLUMNS = [
  {
    title: "Name",
    key: "reparation_name",
    render: (item) => {
      if (false) {
        return (
          <ReparationCell>
            <Field
              as={Checkbox}
              name={`services.${item.id}`}
              label={item.reparation.reparation_name}
            />
          </ReparationCell>
        );
      }

      return (
        <ReparationCell>
          <Field
            as={(props) => (
              <Radio
                {...props}
                value={props.option}
                checked={props.value === props.option}
              >
                {item.reparation.reparation_name}
              </Radio>
            )}
            name="service"
            option={item.id}
          />
        </ReparationCell>
      );
    },
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

const ServiceMobileListing = styled.div`
  background-color: #fafafa;
  margin: 0 -20px;
  padding: 0 20px;
`;

const ServiceMobileItemWrap = styled.div`
  padding: 26px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;

  .ant-radio,
  .ant-checkbox {
    margin-right: 10px;
  }

  span {
    font-size: 13px;
    letter-spacing: 0px;
    color: #0d3244;
    font-weight: 600;
  }

  &:last-child {
    border: 0;
  }
`;

ServiceMobileItemWrap.FirstColumn = styled.div`
  color: #a0a0a0;
  font-size: 11px;
  > dd {
    margin-left: 34px;
  }
`;

function MobileServiceItem({ item }) {
  const firstColumn = SERVICE_COLUMNS[0].render(item);
  return (
    <ServiceMobileItemWrap>
      <ServiceMobileItemWrap.FirstColumn>
        {firstColumn}
        <dd>
          {item.guarantee_time} months warranty <br />~ {item.reparation_time}{" "}
          reparation time
        </dd>
      </ServiceMobileItemWrap.FirstColumn>
      <price>
        <span>&euro;{item.price}</span>
      </price>
    </ServiceMobileItemWrap>
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

const MobileDeviceSelectorWrap = styled.div`
  background-color: #fff;
  margin: 5px -20px;
  padding: 5px 20px;

  .ant-radio-group {
    width: 100%;
  }

  .menu-wrapper {
    min-width: 100%;
  }

  .ant-radio-button-wrapper {
    background-color: transparent;
    color: #c0c0c0;
    border: 0;
    padding: 0 11px;
    border-radius: 7px !important;

    &.ant-radio-button-wrapper-checked {
      color: #fff;
      background-color: #06c987;
    }
  }
`;

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

function AppointmentButton() {
  const { values } = useFormContext().state;
  const formValues = filtersFormModule.state.values;
  return (
    <NextStepWrap>
      <Link
        href={`/appointment?device=${formValues.device}&brand=${formValues.brand}&model=${formValues.model}&shop=${formValues.shop}&service=${values.service}`}
      >
        <Button disabled={!values.service}>
          Proceed to booking <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
      </Link>
    </NextStepWrap>
  );
}

export default function ShopServices({ shop }) {
  useEffect(() => {
    async function main() {
      await filtersFormModule.actions.initialize(shop.id);
      shopServicesListModule.actions.initialize();
      serviceFormModule.actions.initialize();
      deviceFetcher.fetch();
      const formValues = filtersFormModule.state.values;
      if (formValues.device) {
        brandFetcher.key(formValues.device).fetch();
      }
      if (formValues.brand) {
        modelFetcher.key(formValues.brand).fetch();
      }
    }

    main();
  }, [shop.id]);

  const onDeviceChange = useCallback((ev) => {
    const value = parseNativeEvent(ev);
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

  const screenSize = useScreenSize().size;
  const apointmentButton = (
    <Form module={filtersFormModule}>
      <Form module={serviceFormModule}>
        <AppointmentButton />
      </Form>
    </Form>
  );

  return (
    <MaxConstraints>
      <Form module={filtersFormModule}>
        <OnMobile only>
          <MobileDeviceSelectorWrap>
            <MobileDeviceSelector name="device" onChange={onDeviceChange} />
          </MobileDeviceSelectorWrap>
        </OnMobile>
        <ModelFields>
          <OnMobile show={false}>
            <DeviceSelector
              name="device"
              as={Select}
              label="Device"
              onChange={onDeviceChange}
              dropdownStyle={{ minWidth: "200px" }}
            />
          </OnMobile>
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
            {...(screenSize === "mobile"
              ? {}
              : { dropdownStyle: { minWidth: "200px" } })}
          />
        </ModelFields>
        <SyncFormValues
          onChange={(data) => {
            shopServicesListModule.actions.updateQuery(data);
            if (!serviceFormModule.state) {
              return;
            }
            serviceFormModule.actions.onFieldChange({
              name: "service",
              value: null,
            });
          }}
        />
      </Form>
      <List module={shopServicesListModule}>
        <Form module={serviceFormModule}>
          <OnMobile show={false}>
            <Table columns={SERVICE_COLUMNS} />
          </OnMobile>
          <OnMobile only>
            <ServiceMobileListing>
              <Listing Item={MobileServiceItem} />
            </ServiceMobileListing>
          </OnMobile>
        </Form>
      </List>
      <OnMobile show={false}>{apointmentButton}</OnMobile>
      <OnMobile only>
        <MobileToolbar>
          {apointmentButton}
        </MobileToolbar>
      </OnMobile>
    </MaxConstraints>
  );
}
