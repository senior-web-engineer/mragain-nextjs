import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Collapse, Switch, Button, Tag } from "antd";
const { Panel } = Collapse;

export const cookieMainView = (onAcceptCookies, setManageConcent) => (
    <>
        <Row gutter={8}>
            <Col className="gutter-row cookie-banner__icon" span={4}>
                <FontAwesomeIcon icon={faCookie} />
            </Col>
            <Col className="gutter-row" span={20}>
                <p>
                    We use third-party cookies in order to personalize your site
                    experience
                </p>
            </Col>
        </Row>

        <div class="cookie-banner__buttons-wrapper">
            <Button className="mr-2" onClick={onAcceptCookies} type="primary" size="large">
                Yes, I Accept
            </Button>
            <Button onClick={() => setManageConcent(true)} type="link" size="large">
                Manage Consent Preferences
            </Button>
        </div>
    </>
);

export const renderPanel = (concent, onConcentChanged) => (
    <Row className="cookie-banner__concent py-3 px-4" onClick={event => event.stopPropagation()}>
        <Col span="20">
            <p className="m-0">{concent.text}</p>
        </Col>
        <Col span="4">
            <div class="cookie-banner__concent__switch">
                { concent.id === 'rcl_consent_given' ? <Tag>Always Active</Tag> : (
                    <Switch
                    defaultChecked={concent.active}
                    onChange={(value) => onConcentChanged({ active: value, id: concent.id })}
                />
                )}
                
            </div>
        </Col>
    </Row>
)

export const cookieManageConcentView = (concents, onSaveSettings, onRectAll, onConcentChanged) => (
    <>
        <div>
            <p><b>Manage Consent Preferences</b></p>
            <p>
                When you visit any web site, it may store or retrieve
                information on your browser, mostly in the form of cookies.
            </p>
        </div>
        <Collapse
            className="cookie-banner__accordion"
            accordion
            defaultActiveKey={[concents[0].id]}
            expandIcon={(panelProps) => (
                <FontAwesomeIcon
                    className="cookie-banner__accordion__icon"
                    icon={panelProps.isActive ? faMinus : faPlus}
                />
            )}
        >
            {concents.map((concent) => (
                <Panel
                    ghost
                    header={renderPanel(concent, onConcentChanged)}
                    key={concent.id}
                >
                    <p>{concent.description}</p>
                </Panel>
            ))}
        </Collapse>
        <div className="cookie-banner__buttons-wrapper">
            <Button className="mr-2" onClick={onSaveSettings} type="primary" size="large">
                Save Settings
            </Button>
            <Button onClick={onRectAll} type="link" size="large">
                Reject All
            </Button>
        </div>
    </>
);