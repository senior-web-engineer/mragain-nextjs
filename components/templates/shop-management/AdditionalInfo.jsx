import { Button, Col, Divider, Row, Switch, Tag } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { MultiSelect } from "@/components/common/MultiSelect";
import { SwitchGroup } from "@/components/common/SwitchGroup";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import {
  currentUser,
  getBrands,
  getReparations,
  shopManagementAdditionalForm,
} from "@/service/shop-management/modules";

import { additionalInfoOptions, paymentMethods } from "./helpers";
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

export const AdditionalInfo = ({ shopData }) => {
  const [editing, setEditing] = useState(false);
  const [brands, setBrands] = useState([]);
  const [reparations, setReparations] = useState([]);

  useEffect(async () => {
    const user = await currentUser.fetch();
    shopManagementAdditionalForm.actions.initialize(user.account_id);
    const fetchedBrands = await getBrands.fetch();
    setReparations(await getReparations.fetch());
    setBrands(fetchedBrands);
  }, []);

  if (!shopData) {
    return <div>DATA MISSING</div>;
  }

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
                    shopData?.replacementDevices.includes(device.id)
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
                adminInput
                as={MultiSelect}
                name="storePurchases"
                options={additionalInfoOptions.brands}
              />
            ) : (
              <div>
                {brands
                  .filter((brand) => shopData?.cateredBrand.includes(brand.id))
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
            <div>
              {shopData?.paymentMethod
                .split(",")
                .map((method) => paymentMethods(method))}
            </div>
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
                    adminInput
                    simple
                    as={SwitchGroup}
                    name="locationOptions.inStoreService"
                    title="In-Store Service"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    adminInput
                    simple
                    as={SwitchGroup}
                    name="locationOptions.homeService"
                    title="Home Service"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    adminInput
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
                adminInput
                as={MultiSelect}
                name="ShopPurchase"
                options={reparations.map((reparation) => ({
                  label: reparation.reparation_name,
                  value: reparation.id,
                }))}
              />
            ) : (
              <div>
                {reparations
                  .filter((shopPurchase) =>
                    shopData?.ShopPurchase.includes(shopPurchase.id)
                  )
                  .map((shopPurchase) => (
                    <Tag color="green">{shopPurchase.reparation_name}</Tag>
                  ))}
              </div>
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <p>Temporary replacement</p>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                adminInput
                simple
                as={Switch}
                name="temporaryReplacement"
              />
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
              <Field adminInput simple as={Switch} name="waitingArea" />
            ) : (
              "Not available"
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
