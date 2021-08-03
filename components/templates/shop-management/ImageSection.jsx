import { Button, Col, message, Row, Upload } from "antd";
import React, { useState } from "react";
import { uploadImage, uploadLogoImage } from "service/account/operations.js";

import {
  CoverWrapper,
  ImageWrapper,
  ProfileButtonWrapper,
  ProfileWrapper,
} from "./styles";

export const ImageSection = ({ shopData, authUser }) => {
  const [previewCover, setPreviewCover] = useState();
  const [previewLogo, setPreviewLogo] = useState();

  const uploadPhotoProps = {
    name: "cover",
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        const formData = new FormData();
        formData.append("image", info.fileList[0].originFileObj);
        formData.append("shop_id", authUser.id);
        uploadImage(formData).then(() => {
          message.success(`${info.file.name} file uploaded successfully`);
          setPreviewCover(URL.createObjectURL(info.fileList[0].originFileObj));
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadLogoPhotoProps = {
    name: "logo",
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        const formData = new FormData();
        formData.append("image", info.fileList[0].originFileObj);
        formData.append("shop_id", authUser.id);
        uploadLogoImage(formData).then(() => {
          message.success(`${info.file.name} Foto succesvol opgeslagen`);
          setPreviewLogo(URL.createObjectURL(info.fileList[0].originFileObj));
        });
        onUploadCompleted();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} foto opslaan mislukt`);
      }
    },
  };

  return (
    <Row>
      <Col span={24}>
        <ImageWrapper>
          <CoverWrapper>
            <img width="100%" src={previewCover || shopData?.bg_photo} />
            <Upload {...uploadPhotoProps}>
              <Button>Foto wijzigen</Button>
            </Upload>
          </CoverWrapper>
          <ProfileWrapper>
            <img height="100%" src={previewLogo || shopData?.logo_photo} />
          </ProfileWrapper>
          <ProfileButtonWrapper>
            <Upload {...uploadLogoPhotoProps}>
              <Button type="primary">Foto uploaden</Button>
            </Upload>
          </ProfileButtonWrapper>
        </ImageWrapper>
      </Col>
    </Row>
  );
};
