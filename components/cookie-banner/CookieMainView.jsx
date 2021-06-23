import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import { ButtonsWrapper, CenterFull } from './helpers';

export const CookieMainView = ({ onAcceptCookies, setManageConcent }) => (
    <>
        <Row gutter={8}>
            <Col className="gutter-row" span={4}>
                <CenterFull>
                    <FontAwesomeIcon icon={faCookie} />
                </CenterFull>
            </Col>
            <Col className="gutter-row" span={20}>
                <p>
                    We use third-party cookies in order to personalize your site
                    experience
                </p>
            </Col>
        </Row>

        <ButtonsWrapper>
            <Button
                className="mr-2"
                onClick={onAcceptCookies}
                type="primary"
                size="large"
            >
                Yes, I Accept
            </Button>
            <Button
                onClick={() => setManageConcent(true)}
                type="link"
                size="large"
            >
                Manage Consent Preferences
            </Button>
        </ButtonsWrapper>
    </>
);
