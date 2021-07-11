import React from "react";
import Image from "next/image";
import { Tabs, Row, Col, Button } from "antd";
import {
  ImageWrapper,
  CoverWrapper,
  ProfileWrapper,
  ProfileButtonWrapper,
} from "./styles";

import BgCover from "@/assets/images/bg-cover.jpg";

export const ImageSection = ({ shopData }) => {
  return (
    <Row>
      <Col span={24}>
        <ImageWrapper>
          <CoverWrapper>
            <img width="100%" src={shopData?.bg_photo} />
            <Button>Change Cover Photo</Button>
          </CoverWrapper>
          <ProfileWrapper>
            <img height="100%" src={shopData?.logo_photo} />
          </ProfileWrapper>
          <ProfileButtonWrapper>
            <Button type="primary">Upload Photo</Button>
          </ProfileButtonWrapper>
        </ImageWrapper>
      </Col>
    </Row>
  );
};
