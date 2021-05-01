import React, { useMemo } from "react";
import styled from "styled-components";

const ModelsWrap = styled.div`
  padding: 70px 60px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > a {
    max-width: 30%;
  }
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

export default function DeviceModels({ models, brandName }) {
  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brand_name === brandName);
  }, [models, brandName]);

  function renderModel(model) {
    return <ModelLink>{model.model_name}</ModelLink>;
  }

  return <ModelsWrap>{filteredModels.map(renderModel)}</ModelsWrap>;
}
