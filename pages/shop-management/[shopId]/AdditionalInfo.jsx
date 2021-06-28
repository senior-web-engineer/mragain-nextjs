import { useState, useEffect } from "react";
import { Button, Row, Col, Divider, Switch } from "antd";
import { SwitchGroup } from "@/components/common/SwitchGroup";
import { MultiSelect } from "@/components/common/MultiSelect";
import { additionalInfoOptions } from "./helpers";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { shopManagementAdditionalForm } from "@/service/shop-management/modules";

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

    useEffect(() => {
        shopManagementAdditionalForm.actions.initialize();
    }, []);

    const onSave = () => {
        setEditing(false);
    };

    return (
        <>
            <Form module={shopManagementAdditionalForm}>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <HeaderSmallText>
                            Additional information
                        </HeaderSmallText>
                    </Col>
                    <Col>
                        {editing ? (
                            <>
                                <Button
                                    size="large"
                                    onClick={() => setEditing(false)}
                                >
                                    Discard Changes
                                </Button>
                                <Button
                                    size="large"
                                    type="primary"
                                    onClick={onSave}
                                >
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
                            <div>DEVICES LIST</div>
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
                            "BRANDS LIST"
                        )}
                    </Col>
                </Row>

                <Row style={rowStyle} type="flex" justify="space-between">
                    <Col span={6}>
                        <p>Payment Methods</p>
                    </Col>
                    <Col span={18}></Col>
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
                                        as={SwitchGroup}
                                        name="locationOptions.inStoreService"
                                        title="In-Store Service"
                                    />
                                </Col>
                                <Col span={24}>
                                    <Field
                                        as={SwitchGroup}
                                        name="locationOptions.homeService"
                                        title="Home Service"
                                    />
                                </Col>
                                <Col span={24}>
                                    <Field
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
                            <Field as={Switch} name="temporaryReplacement" />
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
                            <Field as={Switch} name="waitingArea" />
                        ) : (
                            "Not available"
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    );
};
