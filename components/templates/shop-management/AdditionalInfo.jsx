import React, { useState, useEffect } from "react";
import { Button, Row, Col, Divider, Switch, Tag } from "antd";
import { SwitchGroup } from "@/components/common/SwitchGroup";
import { MultiSelect } from "@/components/common/MultiSelect";
import { additionalInfoOptions } from "./helpers";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import Image from "next/image";
import {
  currentUser,
  shopManagementAdditionalForm,
  getBrands,
} from "@/service/shop-management/modules";

import { HeaderSmallText, rowStyle } from "./styles";

const renderDevicesList = (devices) => (
  <Row gutter={[16, 16]}>
    {devices.map((device, index) => (
      <Col span={12} key={`device-${index}`}>
        <SwitchGroup
          title={device.device_name}
          description={device.description}
        />
      </Col>
    ))}
  </Row>
);

export const AdditionalInfo = ({ shopInfo }) => {
  const [editing, setEditing] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(async () => {
    const user = await currentUser.fetch();
    shopManagementAdditionalForm.actions.initialize(user.account_id);
    const fetchedBrands = await getBrands.fetch();
    console.log(fetchedBrands);
    setBrands(fetchedBrands);
  }, []);

  if (!shopInfo) {
    return <div>DATA MISSING</div>;
  }
  console.log(shopInfo);

  return (
    <>
      <Form module={shopManagementAdditionalForm}>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <HeaderSmallText>Additional information</HeaderSmallText>
          </Col>
          <Col>
            {editing ? (
              <>
                <Button size="large" onClick={() => setEditing(false)}>
                  Discard Changes
                </Button>
                <Button size="large" type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                size="large"
                type="primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </Col>
        </Row>
        <Divider />
        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Devices</p>
          </Col>
          <Col span={18}>
            {editing ? (
              renderDevicesList(additionalInfoOptions.devices)
            ) : (
              <div>
                {additionalInfoOptions.devices
                  .filter((device) =>
                    shopInfo?.replacementDevices.includes(device.id)
                  )
                  .map((device) => (
                    <Image width="60px" height="60px" src={device.icon} />
                  ))}
              </div>
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Catered Brands</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                as={MultiSelect}
                name="storePurchases"
                options={additionalInfoOptions.brands}
              />
            ) : (
              <div>
                {brands
                  .filter((brand) => shopInfo?.cateredBrand.includes(brand.id))
                  .map((brand) => (
                    <Tag color="green">{brand.brand_name}</Tag>
                  ))}
              </div>
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Payment Methods</p>
          </Col>
          <Col span={18}>
            <div>{shopInfo?.paymentMethod}</div>
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Location Options</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Field
                    simple
                    as={SwitchGroup}
                    name="locationOptions.inStoreService"
                    title="In-Store Service"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    simple
                    as={SwitchGroup}
                    name="locationOptions.homeService"
                    title="Home Service"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    simple
                    as={SwitchGroup}
                    name="locationOptions.doorToDoorDelivery"
                    title="Door-to-Door Delivery"
                  />
                </Col>
              </Row>
            ) : (
              "LOCATIONS LIST"
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Store Purchases</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                as={MultiSelect}
                name="storePurchases"
                options={additionalInfoOptions.brands}
              />
            ) : (
              "STORE PURCHASE LIST"
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Temporary replacement</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field simple as={Switch} name="temporaryReplacement" />
            ) : (
              "For selected devices only"
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Waiting Area</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field simple as={Switch} name="waitingArea" />
            ) : (
              "Not available"
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
