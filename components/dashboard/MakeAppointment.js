import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { Button, DatePicker, Input, Select, Divider } from "antd";
import { Label } from "semantic-ui-react";
import { getBrands, getDevices, getModels } from "service/search/operations";
import { connect, useDispatch } from "react-redux";
import "./MakeAppointment.module.css";
const MakeAppointment = (routerProps) => {
  const {
    shop,
    onChangeStatus,
    devices,
    getBrands,
    getModels,
    deviceBrands,
    brandModels,
  } = routerProps;
  const [modal, setmodal] = useState(false);
  const [phone, setPhone] = useState(0);
  const [brand, setBrand] = useState(0);
  const [model, setModel] = useState(0);

  useEffect(() => {
    // getDevices(dispatch);
    setmodal(true);
  }, []);

  const handleModalClose = () => {
    setmodal(false);
    onChangeStatus();
  };

  const handleDeviceChange = (value) => {
    setPhone(value);
    getBrands(value);
    setBrand(0);
    setModel(0);
  };
  const handleBrandChange = (value) => {
    setBrand(value);
    getModels(phone, value);
  };
  const handleModelChange = (value) => {
    setModel(value);
    getBrands(value);
  };
  return (
    <Fragment>
      <Modal
        show={modal}
        onHide={handleModalClose}
        className="reparation-change-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Reparation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="select-device-reparation"> */}
          <div className="row ">
            <div className="col-md-12 px-5 model_main">
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je device</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={phone}
                    onChange={handleDeviceChange}
                  >
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {devices.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.device_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je merk</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={brand}
                    onChange={handleBrandChange}
                  >
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {deviceBrands.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.brand_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je model</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={model}
                    onChange={handleModelChange}
                  >
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {brandModels.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.model_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Type reparatie</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={phone}
                    onChange={handleDeviceChange}
                  >
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {brandModels.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.brand_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalClose()}>
            Annuleer
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => (
  console.log(state),
  {
    auth_user: state.account.auth_user,
    account_profile: state.account.account_profile,
    devices: state.search.devices,
    deviceBrands: state.search.deviceBrands,
    brandModels: state.search.brandModels,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    getBrands: (id) => {
      getBrands(id, dispatch);
    },
    getModels: (deviceId, brandId) => {
      getModels(deviceId, brandId, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeAppointment);
