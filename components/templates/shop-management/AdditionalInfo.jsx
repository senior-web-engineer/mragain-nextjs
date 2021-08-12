import { Button, Col, Divider, Row, Switch, Tag } from "antd";
import { find } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { MultiSelect } from "@/components/common/MultiSelect";
import { SwitchGroup } from "@/components/common/SwitchGroup";
import { Text } from "@/components/common/Text/Text";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import {
  currentUser,
  getBrands,
  getReparations,
  shopManagementAdditionalForm,
} from "@/service/shop-management/modules";

import { additionalInfoOptions } from "./helpers";
import { HeaderSmallText, rowStyle } from "./styles";

const reparationLocationOptions = [
  {
    value: 1,
    label: "Reparatie in de winkel",
  },
  {
    value: 2,
    label: "Reparatie op locatie",
  },
  {
    value: 3,
    label: "Toestel opsturen",
  },
];

const renderDevicesList = (devices, selectedDevices, onChange) => (
  <Row gutter={[16, 16]}>
    {devices.map((device, index) => (
      <Col span={12} key={`device-${index}`}>
        <SwitchGroup
          title={device.device_name}
          description={device.description}
          defaultChecked={selectedDevices.includes(device.id)}
          onChange={(value) => onChange(device.id, value)}
        />
      </Col>
    ))}
  </Row>
);

export const AdditionalInfo = ({ shopData }) => {
  const [editing, setEditing] = useState(false);
  const [brands, setBrands] = useState([]);
  const [reparations, setReparations] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await currentUser.fetch();
      shopManagementAdditionalForm.actions.initialize(user.account_id);
      const fetchedBrands = await getBrands.fetch();
      setReparations(await getReparations.fetch());
      setBrands(fetchedBrands);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (shopData) {
      setSelectedDevices(shopData.replacementDevices);
    }
  }, [shopData]);

  if (!shopData) {
    return <div>DATA MISSING</div>;
  }

  const onDeviceSelected = (id, value) => {
    let newSelectedDevices = [...selectedDevices];
    if (newSelectedDevices.includes(id) && value === false) {
      newSelectedDevices.splice(newSelectedDevices.indexOf(id), 1);
    } else if (!newSelectedDevices.includes(id)) {
      newSelectedDevices = [...newSelectedDevices, id];
    }
    shopManagementAdditionalForm.actions.batchChange({
      updates: {
        devices: newSelectedDevices,
      },
    });
    setSelectedDevices(newSelectedDevices);
  };

  return (
    <>
      <Form module={shopManagementAdditionalForm}>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <HeaderSmallText>Algemene informatie</HeaderSmallText>
          </Col>
          <Col>
            {editing ? (
              <>
                <Button
                  style={{ marginRight: "10px" }}
                  size="large"
                  onClick={() => setEditing(false)}
                >
                  Annuleren
                </Button>
                <Button size="large" type="primary" htmlType="submit">
                  Opslaan
                </Button>
              </>
            ) : (
              <Button
                size="large"
                type="primary"
                onClick={() => setEditing(true)}
              >
                Wijzigen
              </Button>
            )}
          </Col>
        </Row>
        <Divider />
        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Apparaten
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              renderDevicesList(
                additionalInfoOptions.devices,
                shopData.replacementDevices,
                onDeviceSelected
              )
            ) : (
              <div>
                {additionalInfoOptions.devices
                  .filter((device) =>
                    shopData?.replacementDevices.includes(device.id)
                  )
                  .map((device) => (
                    <Image width="40px" height="40px" src={device.icon} />
                  ))}
              </div>
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Merken
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                adminInput
                as={MultiSelect}
                name="brands"
                options={brands.map((item) => ({
                  value: item.id.toString(),
                  label: item.brand_name,
                }))}
                value={shopData?.cateredBrand.map((id) => id.toString())}
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
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Betaal methoden
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                adminInput
                as={MultiSelect}
                name="payMethod"
                options={additionalInfoOptions.paymentMethods}
                value={shopData.paymentMethod}
              />
            ) : (
              <div>
                {additionalInfoOptions.paymentMethods
                  .filter((item) => shopData.paymentMethod.includes(item.value))
                  .map((item) => (
                    <Tag color="blue">{item.label}</Tag>
                  ))}
              </div>
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Locatie opties
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              <Row gutter={[0, 16]}>
                {/* <Col span={24}>
                  <Field
                    adminInput
                    simple
                    as={SwitchGroup}
                    name="locationOptions.inStoreService"
                    title="Reparatie in de winkel"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    adminInput
                    simple
                    as={SwitchGroup}
                    name="locationOptions.homeService"
                    title="Reparatie op locatie"
                  />
                </Col>
                <Col span={24}>
                  <Field
                    adminInput
                    simple
                    as={SwitchGroup}
                    name="locationOptions.doorToDoorDelivery"
                    title="Toestel opsturen"
                  />
                </Col> */}
                <Field
                  adminInput
                  as={MultiSelect}
                  name="reparationOption"
                  options={reparationLocationOptions}
                  value={shopData?.reparationOption.map((id) => id.toString())}
                />
              </Row>
            ) : (
              shopData?.reparationOption.map((id) => (
                <div>
                  {find(reparationLocationOptions, ["value", +id])?.label}
                </div>
              ))
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Aanvullende services
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                adminInput
                as={MultiSelect}
                name="purchases"
                options={reparations.map((reparation) => ({
                  label: reparation.reparation_name,
                  value: reparation.id,
                }))}
                value={shopData.ShopPurchase.map((id) => id.toString())}
              />
            ) : (
              <div>
                {reparations
                  .filter((shopPurchase) =>
                    shopData?.ShopPurchase.includes(shopPurchase.id.toString())
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
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Vervangend toestel
            </Text.Body>
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
              "Voor specifieke toestellen"
            )}
          </Col>
        </Row>

        <Row style={rowStyle} type="flex" justify="space-between">
          <Col span={6}>
            <Text.Body size="14" weight="bold" style={{ margin: 0 }}>
              Wachtruimte
            </Text.Body>
          </Col>
          <Col span={18}>
            {editing ? (
              <Field
                adminInput
                simple
                as={Switch}
                value={shopData.waitingArea === "No" ? false : true}
                name="waitingArea"
              />
            ) : (
              shopData?.waitingArea
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
