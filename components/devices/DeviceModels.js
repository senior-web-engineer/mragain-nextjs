import media from "@/utils/media";
import Link from "next/link";
import React, { useMemo } from "react";
import styled from "styled-components";

const ModelsWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 35px 30px;

  ${media.tablet`
    padding: 70px 60px;

    > a {
      max-width: 30%;
    }
  `}
`;

const ModelLink = styled.a`
  font-size: 15px;
  color: #303030;
  font-weight: 500;
  width: 240px;
  line-height: 47px;
  border-bottom: 1px solid #fafafa;
  margin: 0 20px;
`;

export default function DeviceModels({ models, brandName, searchTerm }) {
  const filteredModels = useMemo(() => {
    if (searchTerm) {
      return models.filter((model) => model.model_name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }

    return models.filter((model) => model.brand_name === brandName);
  }, [models, brandName, searchTerm]);

  function renderModel(model) {
    return (
      <Link
        href={`/devices/${model.device_name}/${model.brand_name}/${model.model_name}`}
      >
        <ModelLink>{model.model_name}</ModelLink>
      </Link>
    );
  }

  return <ModelsWrap>{filteredModels.map(renderModel)}</ModelsWrap>;
}
