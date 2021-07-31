import { Button, Col, message, Row, Upload } from "antd";
import React from "react";
import { uploadImage } from "service/account/operations.js";

import {
  CoverWrapper,
  ImageWrapper,
  ProfileButtonWrapper,
  ProfileWrapper,
} from "./styles";

export const ImageSection = ({ shopData, authUser }) => {
  const uploadPhotoProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        const formData = new FormData();
        formData.append("image", info.fileList[0].originFileObj);
        formData.append("shop_id", authUser.id);
        uploadImage(formData);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Row>
      <Col span={24}>
        <ImageWrapper>
          <CoverWrapper>
            <img width="100%" src={shopData?.bg_photo} />
            <Upload {...uploadPhotoProps}>
              <Button>Change Cover Photo</Button>
            </Upload>
          </CoverWrapper>
          <ProfileWrapper>
            <img height="100%" src={shopData?.logo_photo} />
          </ProfileWrapper>
          <ProfileButtonWrapper>
            <Upload {...uploadPhotoProps}>
              <Button type="primary">Upload Photo</Button>
            </Upload>
          </ProfileButtonWrapper>
        </ImageWrapper>
      </Col>
    </Row>
  );
};
