import React from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import {
  getSearchFilterField,
  getSearchFilterFieldExt,
} from "Service/search/operations.js";
import { getModelService } from "Service/search/operations.js";
import "./DeviceTypeSelect.less";

const { Option } = Select;

const DeviceTypeSelect = (routerProps) => {
  const [isLoad, setLoad] = React.useState(false);
  const [phone, setPhone] = React.useState(0);
  const [brand, setBrand] = React.useState(0);
  const [brandflg, setBrandflg] = React.useState(false);
  const [isShowModel, setShowModel] = React.useState(false);
  const [model, setModel] = React.useState(0);
  const {
    getSearchFilterField,
    getSearchFilterFieldExt,
    filterlistPBM,
    filterlistRPG,
    shopReparationList,
    getModelService,
    account_profile,
  } = routerProps;

  let repList = [];
  let isExistR = [];

  if (filterlistRPG !== []) {
    filterlistRPG.map((element) => {
      isExistR = repList.filter((rep) => rep.id === element.reparation.id);
      if (isExistR.length === 0) {
        repList.push(element.reparation);
      }
      return true;
    });
  }

  if (isLoad === false) {
    getSearchFilterField();
    setLoad(true);
  }

  function handlePhoneChange(value) {
    setPhone(value);
    // setPhoneflg(true);
    if (brandflg === true) {
      setBrandflg(false);
      setShowModel(false);
      setBrand(0);
    }
  }

  function handleBrandChange(value) {
    setBrand(value);
    setBrandflg(true);
    setShowModel(true);
    setModel(0);
  }

  function handleModelChange(value) {
    setModel(value);
    getSearchFilterFieldExt(value);
    let services = {
      shop_id: account_profile.id,
      device: phone,
      brand: brand,
      model: value,
      reparation: 0,
    };
    getModelService(services);
  }

  function initBrandSelect() {
    let show = false;
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    return (
      phoneObj[0] !== undefined &&
      phoneObj[0]["brand"].map((element) => {
        show = false;
        for (let i = 0; i < shopReparationList.length; i++) {
          if (
            shopReparationList[i].brand === element.id &&
            shopReparationList[i].active === true
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.id}>
              {element.brand_name}
            </Option>
          );
        } else {
          return null;
        }
      })
    );
  }

  function initModelSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    let modelObj = phoneObj[0]["brand"].filter((e1) => e1.id === brand);
    let show = false;
    return (
      modelObj[0] !== undefined &&
      modelObj[0]["model"].map((element) => {
        show = false;
        for (let i = 0; i < shopReparationList.length; i++) {
          if (
            shopReparationList[i].model === element.id &&
            shopReparationList[i].active === true
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.id}>
              {element.model_name}
            </Option>
          );
        } else {
          return null;
        }
      })
    );
  }

  return (
    <div className="device-type-select">
      <div className="device-type-wrap">
        <Select
          className="device-select"
          defaultValue="Alle apparaten"
          value={phone === 0 ? "Alle apparaten" : phone}
          onChange={handlePhoneChange}
        >
          {filterlistPBM.map((element) => {
            return (
              <Option value={element.id} key={element.id}>
                {element.device_name}
              </Option>
            );
          })}
        </Select>
        <Select
          className="brand-select"
          defaultValue="Alle merken"
          onChange={handleBrandChange}
          value={brand === 0 ? "Alle merken" : brand}
        >
          {initBrandSelect()}
        </Select>
        <Select
          className={isShowModel ? "model-select" : "model-select hidden"}
          defaultValue="Alle modellen"
          onChange={handleModelChange}
          value={model === 0 ? "Alle modellen" : model}
        >
          {brandflg && initModelSelect()}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  shopReparationList: state.appointment.shopReparationList,
  account_profile: state.account.account_profile,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getSearchFilterField: (data) => {
      getSearchFilterField(dispatch);
    },
    getSearchFilterFieldExt: (model_id) => {
      getSearchFilterFieldExt(model_id, dispatch);
    },
    getModelService: (data) => {
      getModelService(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypeSelect);
