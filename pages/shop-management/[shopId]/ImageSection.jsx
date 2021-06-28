import Image from "next/image";
import { Tabs, Row, Col, Button } from "antd";
import { ImageWrapper, CoverWrapper, ProfileWrapper, ProfileButtonWrapper } from "./styles";

import BgCover from "@/assets/images/bg-cover.jpg";

export const ImageSection = ({ shopInfo }) => {
    return (
        <Row>
            <Col span={24}>
                <ImageWrapper>
                    <CoverWrapper>
                        <img width="100%" height="100%" src={BgCover} />
                        <Button>Change Cover Photo</Button>
                    </CoverWrapper>
                    <ProfileWrapper>
                        <img width="100%" height="100%" src={BgCover} />
                    </ProfileWrapper>
                    <ProfileButtonWrapper>
                        <Button type="primary">Upload Photo</Button>
                    </ProfileButtonWrapper>
                </ImageWrapper>
            </Col>
        </Row>
    );
};
