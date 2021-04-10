import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Button, DatePicker, Input, Select, Divider, message } from "antd";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
  getBrands,
  getModels,
  getReparations,
  getReparationDetails,
  getDevices,
  saveReparationData,
  updateReparationData,
} from "service/search/operations.js";
import { setLoadService } from "service/search/action.js";
import {
  createAppointment,
  createManualAppointment,
  getAppointmentTimeTable,
} from "service/appointments/operations";
import { setLoadedProfile } from "../service/account/action";
import { Checkbox } from "antd";
import { getAccountProfile } from "service/account/operations.js";
import { getReparationGuarantee } from "service/appointments/operations.js";
import { Fragment } from "react";

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

  const [manualDevice, setManualDevice] = useState(0);
  const [manualBrand, setManualBrand] = useState(0);
  const [manualModel, setManualModel] = useState(0);
  const [manualPrice, setManualPrice] = useState(0);
  const [manualActualPrice, setManualActualPrice] = useState(0);
  const [manualActualGuarantee, setManualActualGuarantee] = useState(0);
  const [manualGuarantee, setManualGuarantee] = useState(0);
  const [manualReparation, setManualReparation] = useState(0);
  const [reparationId, setReparationId] = useState(0);
  const [manualMreparaties, setManualReparaties] = useState([]);
  const [manualShowSaveReparation, setManualShowSaveReparation] = useState(
    true
  );
  const [isResponse, setIsResponse] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isUpdateReparatie, setIsUpdateReparatie] = useState(false);

  const {
    match,
    getSearchFilterField,
    getSearchFilterFieldExt,
    filterlistPBM,
    filterlistRPG,
    getModelService,
    account_valid_time,
    account_invalid_time,
    shop_account_profile,
    isLoadService,
    isLoadedProfile,
    setLoadService,
    saveReparationData,
    updateReparationData,
    modelServices,
    getAppointmentTimeTable,
    getReparationGuarantee,
    getAccountProfile,
    appointmentDate,
    shopReparationList,
    // for manual entry
    getDevices,
    devices,
    getBrands,
    getModels,
    deviceBrands,
    brandModels,
    updateReparationLoading,
    saveReparationLoading,
    createManualAppointment,
    manualAppointmentLoading,
  } = routerProps;

  const [services, setServices] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [enabledDates, setEnabledDates] = useState([]);
  const [disabledDatesflg, setDisabledDatesflg] = useState(false);
  const [initDate, setInitDate] = useState(0);
  const [manual, setManual] = useState(false);
  const [shop, setShop] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(true);

  const router = useRouter();

  if (isLoad === false) {
    const params = router.query;
    const shop_id = parseInt(params.shop);
    setShop(params.shop);
    setInitDate(parseInt(params.initdate));
    if (params.manual) {
      setManual(true);
    } else {
      setManual(false);
    }

    getReparationGuarantee(shop_id);
    getAccountProfile(shop_id, true);
  }

  useEffect(() => {
    // setSuccessShow(false);
    // getDevices();
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
    if (updateReparationLoading === true) {
      setSaveSuccess(true);
      message.success("Reparation details updated successfully", [2.5]);
    }
    if (saveReparationLoading === true) {
      setSaveSuccess(true);
      message.success("Reparation details saved successfully", [2.5]);
    }
    if (manualAppointmentLoading === true) {
      setSaveSuccess(true);
      setSuccessShow(true);
    }
    if (
      updateReparationLoading === "error" ||
      saveReparationLoading === "error" ||
      manualAppointmentLoading === "error"
    ) {
      setSaveSuccess(false);
      message.error("Something went wrong", [2.5]);
    }
  }, [
    isLoadService,
    isLoadedProfile,
    modelServices,
    setLoadService,
    updateReparationLoading,
    saveReparationLoading,
    manualAppointmentLoading,
  ]);

  const handleClose = () => setShow(false);
  const handleSuccessClose = () => {
    if (manual === true) {
      const shopName = shop_account_profile.name.replaceAll(" ", "-");
      router.push(`/dashboard/${shopName}`);
    } else {
      router.push("/");
    }
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

    // if (ValidateEmail(cemail) === false) {
    //   alert("Klopt je emailadres?");
    //   return;
    // }

    // if (ValidatePhoneNumber(cphone) === false) {
    //   alert("Klopt je telefoonnummer?");
    //   return;
    // }

    if (manual === false) {
      let appointmentM = {
        date: date,
        time: appoint_time,
        reparation: reparation,
        client_name: cname,
        client_email: cemail,
        client_phone: cphone,
        shop: shop_account_profile.id,
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
        shop_account_profile.address !== undefined
          ? shop_account_profile.address
          : ""
      } ${
        shop_account_profile.street !== undefined
          ? shop_account_profile.street
          : ""
      } ${
        shop_account_profile.city !== undefined ? shop_account_profile.city : ""
      }`;

      createAppointment(
        appointmentM,
        reparationM,
        shop_account_profile.name,
        address,
        `${dateTimeFormat} - ${appoint_time}`
      );
      setSuccessShow(true);
    } else {
      const appointmentObj = {
        appointmentData: {
          date: date,
          time: appoint_time,
          reparation: manualReparation,
          client_name: cname,
          client_email: cemail,
          client_phone: cphone,
          shop: parseInt(shop),
          active: true,
        },
        repairSeviceData: {
          device: manualDevice,
          brand: manualBrand,
          model: manualModel,
          status: -1,
          price: `€${manualPrice}`,
          guarantee: manualGuarantee,
          reparation: manualReparation,
        },
      };
      createManualAppointment(appointmentObj);
      setSuccessShow(true);
    }

    handleClose();
    // setSuccessShow(true);
  };
  const handleShowModal = () => {
    // setShow(true);

    if (manual === true) {
      if (
        app_date !== undefined &&
        appoint_time !== undefined &&
        manualDevice !== 0 &&
        manualBrand !== 0 &&
        manualModel !== 0 &&
        manualReparation !== 0
      ) {
        if (isUpdateReparatie === true) {
          saveReparationDetails();
        }
        if (saveSuccess === true) {
          setShow(true);
        }
      } else {
        message.error("Sommige verplichte velden zijn niet ingevuld", [2.5]);
      }
    } else {
      if (
        app_date !== undefined &&
        phone !== 0 &&
        brand !== 0 &&
        model !== 0 &&
        reparation !== 0
      ) {
        setShow(true);
      } else {
        message.error("Sommige verplichte velden zijn niet ingevuld", [2.5]);

        // alert("Sommige verplichte velden zijn niet ingevuld");
      }
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
    formData.append("shop_id", shop_account_profile.id);

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
    let interval = parseInt(shop_account_profile.intervals);
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
    getDevices();
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
      shop_id: shop_account_profile.id,
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
      shop_id: shop_account_profile.id,
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
  // ============= for manual add reparation start ===========
  const handleManualDeviceChange = (value, e) => {
    setManualDevice(value);
    getBrands(value);
    setManualBrand(0);
    setManualModel(0);
    setManualReparation(0);
    setShowSaveButton(null);
    setPhoneN(e.key);
    setSaveSuccess(true);
  };

  const handleManualBrandChange = (value, e) => {
    setManualBrand(value);
    getModels(manualDevice, value);
    setManualModel(0);
    setManualReparation(0);
    setShowSaveButton(null);
    setBrandN(e.key);
    setSaveSuccess(true);
  };

  const handleManualModelChange = (value, e) => {
    setManualModel(value);
    setManualReparation(0);
    const data = {
      device: manualDevice,
      model: value,
    };
    getReparations(data).then((res) => {
      setManualReparaties(res.data);
    });
    setModelN(e.key);
    setShowSaveButton(null);
    setSaveSuccess(true);
  };

  const handleManualReparatiesChange = (value, e) => {
    setManualReparation(value);
    const data = {
      device: manualDevice,
      model: manualModel,
      repar: value,
      brand: manualBrand,
      shop: shop,
    };
    setShowSaveButton(null);
    setReparationN(e.key);

    getReparationDetails(data).then((res) => {
      if (res.data.length === 0) {
        setIsResponse(false);
        setShowSaveButton(true);
        setManualPrice(0);
        setManualActualPrice(0);
        setManualGuarantee(0);
        setManualActualGuarantee(0);
      } else {
        setIsResponse(true);
        setShowSaveButton(false);
        const details = res.data[0];
        setReparationId(details.id);
        setManualPrice(details.price);
        setManualActualPrice(details.price);
        setManualGuarantee(details.guarantee_time);
        setManualActualGuarantee(details.guarantee_time);
      }
    });
    setManualShowSaveReparation(true);
    setSaveSuccess(true);
  };
  const handlePriceChange = (e) => {
    setManualPrice(e.target.value);
    setShowSaveButton(true);
    setSaveSuccess(true);
  };

  const handleGuaranteeChange = (e) => {
    setManualGuarantee(e.target.value);
    setShowSaveButton(true);
    setSaveSuccess(true);
  };
  const saveReparationDetails = () => {
    setShowSaveButton(false);
    if (isResponse) {
      const updateData = {
        id: reparationId,
        price: manualPrice,
        guarantee_time: manualGuarantee,
      };
      if (
        manualPrice !== manualActualPrice ||
        manualGuarantee !== manualActualGuarantee
      ) {
        updateReparationData(updateData, shop);
        setManualActualPrice(manualPrice);
        setManualActualGuarantee(manualGuarantee);
      }
    } else {
      const reparationDetails = {
        repaData: {
          device: manualDevice,
          brand: manualBrand,
          model: manualModel,
          shop: parseInt(shop),
          reparation: manualReparation,
          price: parseInt(manualPrice),
          guarantee_time: parseInt(manualGuarantee),
        },
      };
      saveReparationData(reparationDetails);
    }
  };

  const onCheckboxChange = () => {
    setIsUpdateReparatie(!isUpdateReparatie);
  };

  console.log("isUpdateReparatie", isUpdateReparatie);
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

                    {/* ========== manual Appointment = false start ========== */}
                    {!manual ? (
                      <Fragment>
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
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="shop-appointment-form-group">
                          <div className="shop-appointment-form-label">
                            <Label>Selecteer je device</Label>
                          </div>
                          <div>
                            <Select
                              className="device-select"
                              value={manualDevice}
                              onChange={handleManualDeviceChange}
                            >
                              <Option value={0} key={0}>
                                Alle apparaten
                              </Option>
                              {devices.map((element) => {
                                return (
                                  <Option
                                    value={element.id}
                                    key={element.device_name}
                                  >
                                    {element.device_name}
                                  </Option>
                                );
                              })}
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
                              value={manualBrand}
                              onChange={handleManualBrandChange}
                            >
                              <Option value={0} key={0}>
                                Alle merken
                              </Option>
                              {deviceBrands.map((element) => {
                                return (
                                  <Option
                                    value={element.id}
                                    key={element.brand_name}
                                  >
                                    {element.brand_name}
                                  </Option>
                                );
                              })}
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
                              value={manualModel}
                              onChange={handleManualModelChange}
                            >
                              <Option value={0} key={0}>
                                Alle modellen
                              </Option>
                              {brandModels.map((element) => {
                                return (
                                  <Option
                                    value={element.id}
                                    key={element.model_name}
                                  >
                                    {element.model_name}
                                  </Option>
                                );
                              })}
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
                              value={manualReparation}
                              onChange={handleManualReparatiesChange}
                            >
                              <Option value={0} key={0}>
                                Alle reparaties
                              </Option>
                              {manualMreparaties.map((element) => {
                                return (
                                  <Option
                                    value={element.id}
                                    key={element.reparation_name}
                                  >
                                    {element.reparation_name}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>
                        </div>
                        <div className="shop-appointment-form-group">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="shop-appointment-form-label">
                                <Label>Prijs</Label>
                              </div>
                              <div className="shop-appointment-form-input">
                                <Input
                                  type="text"
                                  placeholder="Prijs"
                                  value={manualPrice}
                                  onChange={(e) => handlePriceChange(e)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="shop-appointment-form-label">
                                <Label>Garantie (mnd)</Label>
                              </div>
                              <div className="shop-appointment-form-input">
                                <Input
                                  type="text"
                                  placeholder="Guarantee"
                                  value={manualGuarantee}
                                  onChange={(e) => handleGuaranteeChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {showSaveButton === true ? (
                          <div className="shop-appointment-form-group pt-4 pb-0">
                            <Checkbox
                              checked={isUpdateReparatie}
                              onChange={onCheckboxChange}
                            >
                              Update reparatie database
                            </Checkbox>
                            {/* <Button
                              block
                              className="save-button"
                              onClick={(e) => saveReparationDetails(e)}
                            >
                              Update reparatie database
                            </Button> */}
                          </div>
                        ) : null}
                      </Fragment>
                    )}
                    <Button
                      className="make-appointment mt-3"
                      onClick={handleShowModal}
                    >
                      Maak afspraak
                    </Button>
                    {/* ========== manual Appointment = false End ========== */}

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
                        <Label>{shop_account_profile.name}</Label>
                        <Label>
                          {`${
                            shop_account_profile.address !== undefined
                              ? shop_account_profile.address
                              : ""
                          } ${
                            shop_account_profile.street !== undefined
                              ? shop_account_profile.street
                              : ""
                          } ${
                            shop_account_profile.city !== undefined
                              ? shop_account_profile.city
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
                        {manual === true ? (
                          <Fragment>
                            <Label>
                              Prijs:{" "}
                              {manualPrice.toString().charAt(0) !== "€"
                                ? "€"
                                : null}
                              {manualPrice}
                            </Label>
                            <Divider />
                            <Label>Garantie: {manualGuarantee} Maanden</Label>
                            <Label className="modal-sub-title">
                              Klant gegevens
                            </Label>
                          </Fragment>
                        ) : (
                          <Fragment>
                            {services[0] !== undefined && (
                              <Label>
                                Prijs:{" "}
                                {services[0].price.charAt(0) !== "€"
                                  ? "€"
                                  : null}
                                {showReparationPrice()}
                              </Label>
                            )}
                            <Label className="modal-sub-title">
                              Jouw gegevens
                            </Label>
                          </Fragment>
                        )}

                        <Input
                          placeholder="Je naam"
                          value={cname}
                          onChange={onChangeCName}
                        ></Input>
                        <Input
                          placeholder="Emailadres"
                          value={cemail}
                          onChange={onChangeCEmail}
                        ></Input>
                        <Input
                          placeholder="Telefoonnummer"
                          value={cphone}
                          onChange={onChangeCPhone}
                        ></Input>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="confirm-appointment-btn"
                          onClick={confirmAppointment}
                        >
                          Bevestig de afspraak
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
                        {manual === true ? (
                          <Fragment>
                            <p>
                              De afspraak is gemaakt en staat op je dashboard.
                            </p>
                            <p>
                              Er is een bevestigingsemail verstuurd naar je
                              klant.
                            </p>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p>De afspraak is gemaakt</p>
                            <p>
                              Bedankt voor het maken van een afspraak. We hebben
                              je een bevestiging email gestuurd.
                            </p>
                          </Fragment>
                        )}
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
  auth_user: state.account.auth_user,
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  shopReviews: state.account.account_review,
  account_valid_time: state.account.account_valid_time,
  account_invalid_time: state.account.account_invalid_time,
  shop_account_profile: state.account.shop_account_profile,
  isLoadedProfile: state.account.isLoadedProfile,
  modelServices: state.search.modelServices,
  isLoadService: state.search.isLoadService,
  shopReparationList: state.appointment.shopReparationList,
  appointmentDate: state.appointment.appointmentDate,
  devices: state.search.devices,
  deviceBrands: state.search.deviceBrands,
  brandModels: state.search.brandModels,
  reparationDetails: state.search.reparationDetails,
  updateReparationLoading: state.search.updateReparationLoading,
  saveReparationLoading: state.search.saveReparationLoading,
  manualAppointmentLoading: state.appointment.manualAppointmentLoading,
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
    // ============ for Manual
    getDevices: (data) => {
      getDevices(dispatch);
    },
    getBrands: (id) => {
      getBrands(id, dispatch);
    },
    getModels: (deviceId, brandId) => {
      getModels(deviceId, brandId, dispatch);
    },
    getReparations: (data) => {
      getReparations(data, dispatch);
    },
    getReparationDetails: (data) => {
      getReparationDetails(data, dispatch);
    },
    saveReparationData: (data) => {
      saveReparationData(data, dispatch);
    },
    updateReparationData: (data, shop) => {
      updateReparationData(data, shop, dispatch);
    },
    createManualAppointment: (data) => {
      createManualAppointment(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopAppointment);
