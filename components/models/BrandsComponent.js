import React from "react";
import "./modelDetails.css";
import { Select } from "antd";
import { Fragment } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { getModels } from "@/service/search/operations";
const { Option } = Select;

const BrandsComponent = (routerProps) => {
  const { deviceBrands, getModels, deviceId } = routerProps;
  const [brand, setBrand] = useState(0);

  function initBrandSelect() {
    return (
      deviceBrands !== undefined &&
      deviceBrands.map((element) => {
        return (
          <Option value={element.id} key={element.id}>
            {element.brand_name}
          </Option>
        );
      })
    );
  }

  function handleBrandChange(value) {
    setBrand(value);
    getModels(deviceId, value);
  }
  return (
    <Fragment>
      <div className="select-section">
        <h6> Select Brand</h6>
        <Select
          className="w-100"
          // defaultValue="Brand"
          onChange={handleBrandChange}
          value={brand}
        >
          <Option value={0} key={0}>
            Alle merken
          </Option>
          {initBrandSelect()}
        </Select>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  deviceBrands: state.search.deviceBrands,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // getBrands: (id) => {
    //   getBrands(id, dispatch);
    // },
    getModels: (deviceId, brandId) => {
      getModels(deviceId, brandId, dispatch);
    },
  };
};
/* eslint-enable */
export default connect(mapStateToProps, mapDispatchToProps)(BrandsComponent);
