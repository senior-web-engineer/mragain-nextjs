import "./cookie-manage-styles.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ButtonsWrapper } from "./helpers";
import { Row, Col, Collapse, Switch, Button, Tag } from "antd";
const { Panel } = Collapse;

export const renderPanel = (concent, onConcentChanged) => (
    <Row className="cookie-banner__concent py-3 px-4">
        <Col span="20">
            <p className="m-0">{concent.text}</p>
        </Col>
        <Col span="4" onClick={(event) => event.stopPropagation()}>
            <div class="cookie-banner__concent__switch">
                {concent.id === "rcl_consent_given" ? (
                    <Tag>Always Active</Tag>
                ) : (
                    <Switch
                        checked={concent.active}
                        onChange={(value) =>
                            onConcentChanged({ active: value, id: concent.id })
                        }
                    />
                )}
            </div>
        </Col>
    </Row>
);

export const CookieManageConcentView = ({
    concents,
    onSaveSettings,
    onRectAll,
    onConcentChanged,
}) => (
    <>
        <div>
            <p>
                <b>Manage Consent Preferences</b>
            </p>
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
        <ButtonsWrapper>
            <Button
                className="mr-2"
                onClick={onSaveSettings}
                type="primary"
                size="large"
            >
                Save Settings
            </Button>
            <Button onClick={onRectAll} type="link" size="large">
                Reject All
            </Button>
        </ButtonsWrapper>
    </>
);
