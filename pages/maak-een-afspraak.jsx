import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Button, DatePicker, Input, Select, Divider } from "antd";
import { Modal } from "react-bootstrap";
import { Label } from "semantic-ui-react";
import moment from "moment";
import "./maak-een-afspraak.less";
import { Main } from "@/styled-components/maak-een-afspraak.style.jsx";
import AboutBannerSection from "@/components/shop-appointment/AboutBannerSection/AboutBannerSection";
import { Layout } from "@/components/global";
import {
  getSearchFilterField,
  getSearchFilterFieldExt,
  getModelService,
} from "service/search/operations.js";
import { setLoadService } from "service/search/action.js";
import {
  createAppointment,
  getAppointmentTimeTable,
} from "service/appointments/operations";
import { setLoadedProfile } from "../service/account/action";

import { getAccountProfile } from "service/account/operations.js";
import { getReparationGuarantee } from "service/appointments/operations.js";

const { Option } = Select;

const ShopAppointment = (routerProps) => {
  const [appoint_time, setAppointTime] = useState();
  const [app_date, setDateTime] = useState();
  const [isLoad, setLoad] = React.useState(false);
  const [phone, setPhone] = React.useState(1);
  const [brand, setBrand] = React.useState(0);
  const [brandflg, setBrandflg] = React.useState(false);
  // const [isShowModel, setShowModel] = React.useState(false);
  const [model, setModel] = React.useState(0);
  const [isShowExFilter, setShowExFilter] = React.useState(false);
  const [reparation, setReparation] = React.useState(0);
  const [show, setShow] = useState(false);
  const [showSuccess, setSuccessShow] = useState(false);
  const [dateTimeFormat, setDateTimeFormat] = useState();
  const [phoneN, setPhoneN] = React.useState("Smartphones");
  const [brandN, setBrandN] = React.useState(0);
  const [modelN, setModelN] = React.useState(0);
  const [reparationN, setReparationN] = React.useState(0);
  const [cname, setCName] = React.useState("");
  const [cemail, setCEmail] = React.useState("");
  const [cphone, setCPhone] = React.useState("");

  const {
    match,
    getSearchFilterField,
    getSearchFilterFieldExt,
    filterlistPBM,
    filterlistRPG,
    getModelService,
    // shopReviews,
    account_valid_time,
    account_invalid_time,
    account_profile,
    isLoadService,
    isLoadedProfile,
    setLoadService,
    modelServices,
    getAppointmentTimeTable,
    getReparationGuarantee,
    getAccountProfile,
    appointmentDate,
    shopReparationList,
  } = routerProps;

  const [services, setServices] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [enabledDates, setEnabledDates] = useState([]);
  const [disabledDatesflg, setDisabledDatesflg] = useState(false);
  const [initDate, setInitDate] = useState(0);

  const router = useRouter();

  if (isLoad === false) {
    const params = router.query;
    const shop_id = parseInt(params.shop);
    setInitDate(parseInt(params.initdate));
    getReparationGuarantee(shop_id);
    getAccountProfile(shop_id, null);
  }

  useEffect(() => {
    if (isLoadService === true) {
      if (modelServices.length > 0) {
        setServices(modelServices);
        setLoadService(false);
      }
    }
    if (isLoadedProfile === true) {
      // initTimeSelect();
      setLoadedProfile(true);
      if (initDate === 1) {
        if (appointmentDate !== null) {
          onDateChange(appointmentDate);
          setInitDate(0);
        }
      }
    }
  }, [isLoadService, isLoadedProfile, modelServices, setLoadService]);

  const handleClose = () => setShow(false);
  const handleSuccessClose = () => {
    router.push("/");
    setSuccessShow(false);
  };

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function ValidatePhoneNumber(inputtxt) {
    var phoneno = /^((\+|00(\s|\s?-\s?)?)31(\s|\s?-\s?)?(\(0\)[-\s]?)?|0)[1-9]((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }

  const confirmAppointment = () => {
    let m = moment(app_date);
    let date = m.format("MM-DD-YYYY");

    if (ValidateEmail(cemail) === false) {
      alert("Klopt je emailadres?");
      return;
    }

    if (ValidatePhoneNumber(cphone) === false) {
      alert("Klopt je telefoonnummer?");
      return;
    }

    let appointmentM = {
      date: date,
      time: appoint_time,
      reparation: reparation,
      client_name: cname,
      client_email: cemail,
      client_phone: cphone,
      shop: account_profile.id,
      active: true,
    };

    let reparationM = {
      device: phone,
      brand: brand,
      model: model,
      status: -1,
      price: services[0].price,
      guarantee: services[0].guarantee,
      reparation: reparation,
    };

    let address = `${
      account_profile.address !== undefined ? account_profile.address : ""
    } ${account_profile.street !== undefined ? account_profile.street : ""} ${
      account_profile.city !== undefined ? account_profile.city : ""
    }`;

    createAppointment(
      appointmentM,
      reparationM,
      account_profile.name,
      address,
      `${dateTimeFormat} - ${appoint_time}`
    );

    handleClose();
    setSuccessShow(true);
  };
  const handleShowModal = () => {
    if (
      app_date !== undefined &&
      phone !== 0 &&
      brand !== 0 &&
      model !== 0 &&
      reparation !== 0
    ) {
      setShow(true);
    } else {
      alert("Sommige verplichte velden zijn niet ingevuld");
    }
  };

  const onChangeCName = (e) => setCName(e.target.value);
  const onChangeCEmail = (e) => setCEmail(e.target.value);
  const onChangeCPhone = (e) => setCPhone(e.target.value);

  async function createAppointmentTimes(strDate, _times, interval) {
    let tmp;
    let s_time, s_hour, s_minu;
    let e_time, e_hour, e_minu;
    let app_intervals;

    s_time = _times.substring(0, 5);
    s_hour = parseInt(s_time.substring(0, 2));
    s_minu = parseInt(s_time.substring(3, 5));
    e_time = _times.substring(6, 11);
    e_hour = parseInt(e_time.substring(0, 2));
    e_minu = parseInt(e_time.substring(3, 5));

    app_intervals = [];
    let _hr;
    let _mi;

    while (true) {
      s_hour = s_hour + Math.floor((s_minu + interval) / 60);
      s_minu = (s_minu + interval) % 60;

      if (s_hour > e_hour) {
        break;
      } else if (s_hour === e_hour) {
        if (s_minu >= e_minu) {
          break;
        }
      }
      if (s_hour < 10) {
        _hr = `0${s_hour}`;
      } else {
        _hr = `${s_hour}`;
      }

      if (s_minu < 10) {
        _mi = `0${s_minu}`;
      } else {
        _mi = `${s_minu}`;
      }
      tmp = `${_hr}:${_mi}`;

      app_intervals.push(tmp);
    }
    let formData = new FormData();
    formData.append("date", strDate);
    formData.append("time_table", app_intervals);
    formData.append("shop_id", account_profile.id);

    tmp = await getAppointmentTimeTable(formData);
    let time_table = String(tmp).match(/.{1,5}/g);
    return time_table;
  }

  const disabledDate = (date) => {
    let m = moment(date);
    let str = m.format("YYYY-MM-DD");
    let timestamp = moment(str, "YYYY-MM-DD").valueOf();

    let ret = false;

    if (Object.keys(account_valid_time).length === 0) {
      return true;
    }

    disabledDates.map((el) => {
      if (el === timestamp) {
        ret = true;
      }
      return true;
    });
    if (ret === true) {
      return true;
    }

    let flg = false;
    enabledDates.map((el) => {
      if (el === timestamp) {
        flg = true;
      }
      return true;
    });
    if (flg === true) {
      return false;
    }

    let now_day = date.day();
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let valid_times = JSON.parse(account_valid_time);
    let _times = valid_times[dayArr[now_day]];

    if (_times.length === 0 || _times === "CLOSED" || _times === "Gesloten") {
      return true;
    }
    return false;
  };

  const onDateChange = async (date) => {
    if (date === null) {
      setDateTime(null);
      return;
    }

    let m = moment(date);
    let strDate = m.format("YYYY-MM-DD");
    let strDate1 = m.format("MM-DD-YYYY");
    let timestamp = moment(strDate, "YYYY-MM-DD").valueOf();

    let current = new Date();
    let m_cur = moment(current);
    let str_cur = m_cur.format("YYYY-MM-DD");
    let timestamp_cur = moment(str_cur, "YYYY-MM-DD").valueOf();

    if (timestamp < timestamp_cur) {
      alert("Helaas, deze datum is al geweest!");
      return;
    }
    let interval = parseInt(account_profile.intervals);
    let isClose = -1;
    let app_intervals = [];

    let m1 = moment(new Date());
    let str1 = m1.format("YYYY-MM-DD");
    let timestamp1 = moment(str1, "YYYY-MM-DD").valueOf();
    if (timestamp1 <= timestamp) {
      let _times = [];
      if (account_invalid_time.length > 0) {
        let invalid_time = JSON.parse(account_invalid_time);
        for (let i = 0; i < invalid_time.length; i++) {
          if (invalid_time[i].checkDay === timestamp) {
            _times = invalid_time[i].open_close_time;
            if (_times === "-") {
              isClose = 1;
            } else {
              isClose = 0;
            }
            break;
          }
        }
      }

      if (isClose === 1) {
        app_intervals = [];
      } else if (isClose === 0) {
        app_intervals = await createAppointmentTimes(
          strDate1,
          _times,
          parseInt(interval) > 0 ? interval : 15
        );
      } else {
        let now_day = date.day();
        // if (now_day !== 0 && now_day != 6) {
        let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let valid_times = JSON.parse(account_valid_time);
        _times = valid_times[dayArr[now_day]];

        if (_times !== undefined) {
          app_intervals = await createAppointmentTimes(
            strDate1,
            _times,
            parseInt(interval) > 0 ? interval : 15
          );
        }
      }
    }
    setIntervals(app_intervals);
    setDateTimeFormat(m.format("DD/MM/YYYY"));
    setDateTime(date);
  };

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

  if (disabledDatesflg === false) {
    if (Object.keys(account_invalid_time).length !== 0) {
      let temp = JSON.parse(account_invalid_time);
      let closeDates = [];
      let openDates = [];
      temp.map((el) => {
        if (el.open_close_time === "-") {
          closeDates.push(el.checkDay);
        } else {
          openDates.push(el.checkDay);
        }
        return true;
      });
      setDisabledDates(closeDates);
      setEnabledDates(openDates);
      setDisabledDatesflg(true);
    }
  }

  function initTimeSelect() {
    return (
      intervals.length > 0 &&
      intervals.map((element) => {
        return (
          <Option value={element} key={element}>
            {element}
          </Option>
        );
      })
    );
  }

  function handleTimeChange(value, e) {
    setAppointTime(value);
  }

  function handlePhoneChange(value, e) {
    setPhone(value);
    setPhoneN(e.key);
    if (brandflg === true) {
      setBrandflg(false);
      // setShowModel(false);
      setBrand(0);
    }
  }

  function handleBrandChange(value, e) {
    setBrandN(e.key);
    setBrand(value);
    setBrandflg(true);
    // setShowModel(true);
    setModel(0);
  }

  function showReparationPrice() {
    return <span>{services[0].price}</span>;
  }

  function handleReparationChange(value, e) {
    setReparationN(e.key);
    setReparation(value);
    let services = {
      shop_id: account_profile.id,
      device: phone,
      brand: brand,
      model: model,
      reparation: value,
    };
    getModelService(services);
  }

  function handleModelChange(value, e) {
    setModelN(e.key);
    setModel(value);
    setShowExFilter(true);
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

  function initDeviceSelect() {
    let show;
    return filterlistPBM.map((element) => {
      show = false;
      for (let i = 0; i < shopReparationList.length; i++) {
        if (
          shopReparationList[i].device === element.id &&
          shopReparationList[i].active === true &&
          shopReparationList[i].is_deleted === false
        ) {
          show = true;
          break;
        }
      }
      if (show === true) {
        return (
          <Option value={element.id} key={element.device_name}>
            {element.device_name}
          </Option>
        );
      } else {
        return null;
      }
    });
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
            shopReparationList[i].active === true &&
            shopReparationList[i].is_deleted === false
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.brand_name}>
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
            shopReparationList[i].active === true &&
            shopReparationList[i].is_deleted === false
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.model_name}>
              {element.model_name}
            </Option>
          );
        } else {
          return null;
        }
      })
    );
  }

  function initReparationSelect() {
    return (
      services !== [] &&
      services.map((element) => {
        return (
          <Option value={element.key} key={element.service}>
            {element.service}
          </Option>
        );
      })
    );
  }
  return (
    <Layout>
      <Main>
        <AboutBannerSection />
        <div className="shop-appointment">
          <div className="shop-appointment-container">
            <div className="shop-appointment-container-wrap">
              <div className="shop-appointment-form">
                <div className="shop-appointment-form-title">
                  Maak een afspraak
                </div>
                <div className="shop-appointment-form-content">
                  <div className="shop-appointment-form-content-wrap">
                    <div className="  shop-appointment-form-group div-flex">
                      <div className="col-md-6 mx-0  px-0 shop-appointment-form-group-left">
                        <div className="shop-appointment-form-label">
                          <Label>Selecteer een datum</Label>
                        </div>
                        <div>
                          <DatePicker
                            className="w-100"
                            disabledDate={(date) => disabledDate(date)}
                            onChange={(date) => onDateChange(date)}
                            value={app_date}
                            defaultValue={
                              appointmentDate !== null
                                ? moment(appointmentDate)
                                : null
                            }
                            allowClear={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mx-0 pr-0 shop-appointment-form-group-right">
                        <div className="shop-appointment-form-label">
                          <Label>Selecteer een tijd</Label>
                        </div>
                        <div>
                          <Select
                            className="w-100   device-select"
                            onChange={handleTimeChange}
                          >
                            {initTimeSelect()}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="shop-appointment-form-group">
                      <div className="shop-appointment-form-label">
                        <Label>Selecteer je device</Label>
                      </div>
                      <div>
                        <Select
                          className="device-select"
                          defaultValue="Smartphones"
                          onChange={handlePhoneChange}
                        >
                          {initDeviceSelect()}
                          {/* {filterlistPBM.map((element) => {
                            return (
                              <Option
                                value={element.id}
                                key={element.device_name}
                              >
                                {element.device_name}
                              </Option>
                            );
                          })} */}
                        </Select>
                      </div>
                    </div>
                    <div className="shop-appointment-form-group">
                      <div className="shop-appointment-form-label">
                        <Label>Selecteer je merk</Label>
                      </div>
                      <div>
                        <Select
                          className="brand-select"
                          defaultValue="Merk"
                          onChange={handleBrandChange}
                          value={brand === 0 ? "Merk" : brand}
                        >
                          {initBrandSelect()}
                        </Select>
                      </div>
                    </div>
                    <div className="shop-appointment-form-group">
                      <div className="shop-appointment-form-label">
                        <Label>Selecteer je model</Label>
                      </div>
                      <div>
                        <Select
                          className="model-select"
                          defaultValue="Model"
                          onChange={handleModelChange}
                          value={model === 0 ? "Model" : model}
                        >
                          {brandflg && initModelSelect()}
                        </Select>
                      </div>
                    </div>
                    <div className="shop-appointment-form-group">
                      <div className="shop-appointment-form-label">
                        <Label>Type reparatie</Label>
                      </div>
                      <div>
                        <Select
                          className="service-select"
                          defaultValue="Alle reparaties"
                          onChange={handleReparationChange}
                        >
                          {isShowExFilter && initReparationSelect()}
                        </Select>
                      </div>
                    </div>
                    <Button
                      className="make-appointment"
                      onClick={handleShowModal}
                    >
                      Maak afspraak
                    </Button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      className="appointment-confirm-modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Bevestig je afspraak</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Label className="modal-sub-title">
                          Afspraak details
                        </Label>
                        <Label>{account_profile.name}</Label>
                        <Label>
                          {`${
                            account_profile.address !== undefined
                              ? account_profile.address
                              : ""
                          } ${
                            account_profile.street !== undefined
                              ? account_profile.street
                              : ""
                          } ${
                            account_profile.city !== undefined
                              ? account_profile.city
                              : ""
                          }`}
                        </Label>
                        <Divider />
                        <Label>{`${dateTimeFormat} - ${appoint_time}`}</Label>
                        <Divider />
                        <Label>Reparatie: {reparationN}</Label>
                        <Divider />
                        <Label>Device: {phoneN}</Label>
                        <Divider />
                        <Label>Merk: {brandN}</Label>
                        <Divider />
                        <Label>Model: {modelN}</Label>
                        <Divider />
                        <Label>
                          Prijs:
                          {services[0] !== undefined && showReparationPrice()}
                        </Label>
                        <Label className="modal-sub-title">Jouw gegevens</Label>
                        <Input
                          placeholder="Je naam"
                          value={cname}
                          onChange={onChangeCName}
                        ></Input>
                        <Input
                          placeholder="Je emailadres"
                          value={cemail}
                          onChange={onChangeCEmail}
                        ></Input>
                        <Input
                          placeholder="Je telefoonnummer"
                          value={cphone}
                          onChange={onChangeCPhone}
                        ></Input>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="confirm-appointment-btn"
                          onClick={confirmAppointment}
                        >
                          Bevestig je afspraak
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
                      show={showSuccess}
                      onHide={handleSuccessClose}
                      className="appointment-confirm-success-modal"
                    >
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <p>Je afspraak is gemaakt</p>
                        <p>
                          We hebben een bevestigings email naar je verzonden
                        </p>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  shopReviews: state.account.account_review,
  account_valid_time: state.account.account_valid_time,
  account_invalid_time: state.account.account_invalid_time,
  account_profile: state.account.account_profile,
  isLoadedProfile: state.account.isLoadedProfile,
  modelServices: state.search.modelServices,
  isLoadService: state.search.isLoadService,
  shopReparationList: state.appointment.shopReparationList,
  appointmentDate: state.appointment.appointmentDate,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAppointmentTimeTable: (data) => getAppointmentTimeTable(data, dispatch),
    getSearchFilterField: (data) => {
      getSearchFilterField(dispatch);
    },
    getSearchFilterFieldExt: (model_id) => {
      getSearchFilterFieldExt(model_id, dispatch);
    },
    getModelService: (data) => {
      getModelService(data, dispatch);
    },
    setLoadService: (data) => {
      dispatch(setLoadService(data));
    },
    createAppointment: (data1, data2, name, address, datetime) => {
      createAppointment(data1, data2, name, address, datetime, dispatch);
    },
    getAccountProfile: (id, data) => {
      getAccountProfile(id, data, dispatch);
    },
    getReparationGuarantee: (id) => {
      getReparationGuarantee(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopAppointment);
