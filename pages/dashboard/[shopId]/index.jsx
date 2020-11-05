import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import {
  Input,
  Button,
  Popconfirm,
  DatePicker,
  Avatar,
  Checkbox,
  Select,
} from "antd";
import { Label } from "semantic-ui-react";
import { Table, Modal } from "react-bootstrap";
import Link from "../../../src/Link";
import { Layout } from "@/components/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImagePicker from "react-image-picker";
import avatar from "@/assets/images/user-avartar.png";
import "react-image-picker/dist/index.css";
import "./index.less";
import menu_icon from "../../../assets/images/menu.png";
import {
  getSearchFilterField,
  getSearchFilterFieldExt,
  getModelService,
} from "Service/search/operations.js";
import { setLoadService } from "Service/search/action.js";
import { setLoadAppointment } from "Service/appointments/action.js";
import {
  getAppointments,
  updateAppointment,
  CancelAppointment,
} from "Service/appointments/operations.js";
import {
  uploadImage,
  getSimpleAccountInformation,
} from "Service/account/operations.js";
import { Helmet } from "react-helmet";
import { FRONT_END_URL } from "../../../constants.js";

const { Option } = Select;

const ShopDashboard = (routerProps) => {
  const updateDimensions = () => {
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  useEffect(() => {
    if(!isLoggedIn) {
      router.push("/");
      return;
    }
    window.addEventListener("resize", updateDimensions);
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }, []);

  const [state, setState] = useState({
    height: 0,
    width: 0,
  });

  const [isLoad, setLoad] = React.useState(false);
  const [phone, setPhone] = React.useState(1);
  const [brand, setBrand] = React.useState(0);
  const [brandflg, setBrandflg] = React.useState(false);
  const [model, setModel] = React.useState(0);
  const [reparation, setReparation] = React.useState(0);
  const [serialnumber, setSerialNumber] = React.useState("");
  const [color, setColor] = React.useState("");
  const [memory, setMemory] = React.useState("");
  const [comments, setComment] = React.useState("");
  const [closeRepair, setCloseRepair] = React.useState(false);
  const [editable, setEditable] = React.useState(true);
  const [selectRepid, setSelectRepId] = React.useState(0);
  const [selectEmail, setSelectEmail] = React.useState(0);
  const [price, setPrice] = React.useState("");
  const [guarantee, setGuarantee] = React.useState(0);
  const [display, setDisplay] = useState("none");

  const {
    match,
    uploadImage,
    getAppointments,
    getModelService,
    getSearchFilterField,
    getSearchFilterFieldExt,
    getSimpleAccountInformation,
    filterlistPBM,
    filterlistRPG,
    auth_user,
    account_profile,
    appointmentList,
    isLoadAppointment,
    isLoadService,
    modelServices,
    setLoadService,
    setLoadAppointment,
    updateAppointment,
    CancelAppointment,
    isLoggedIn
  } = routerProps;

  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [appointlist, setAppointList] = useState([]);
  const [appCount, setAppCount] = useState(0);

  let repList = [];
  let isExistR = [];

  const handleGetSimpleAccount = () => {
    getSimpleAccountInformation(url_shopId);
  };
  const handleGetAppointments = () => {
    getAppointments(url_shopId);
  };

  const { param_shopId } = router.query
  const url_shopId = parseInt(param_shopId);
  
  useEffect(() => {
    if (isLoad === false) {
      let auth_user = JSON.parse(localStorage.getItem("auth-user"));
      if (
        auth_user === null ||
        parseInt(auth_user.account_id) !== parseInt(param_shopId)
      ) {
        router.push("/");
      } else {
        handleGetSimpleAccount();
        handleGetAppointments();
      }
    }
  }, [isLoad])


  if (filterlistRPG !== undefined) {
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
  }

  const confirmCancelAppointment = (appoint_id) => {
    CancelAppointment(appoint_id, url_shopId);
    alert("De afspraak is geannuleerd");
  };

  const handleRemovePicture = () => {
    let arr = [...imageList];
    arr.pop();
    setImageList(arr);
  };

  /**
   * @description: image upload and preview edit reparations.
   *
   * @param {*} e
   */
  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files.length) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        var base64data = reader.result;
        let arr = [...imageList];
        let img_url = base64data;
        arr.push(img_url);
        setImageList(arr);

        const formData = new FormData();
        formData.append("image", file);
        formData.append("shop_id", auth_user.account_id);
        uploadImage(formData, true);
      };
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleUpdateAppointment = (id, email) => {
    let _update = {
      serialnumber,
      color,
      memory,
      images: JSON.stringify(imageList),
      status: closeRepair === true ? 1 : 0,
      comments,
      device: phone,
      brand,
      model,
      reparation,
      price: price,
      guarantee: guarantee,
    };
    setShowModal(false);
    updateAppointment(id, email, _update, url_shopId);
  };
  const handleModalShow = (el) => {
    setPhone(el.device.id);
    setBrand(el.brand.id);
    setModel(el.model.id);
    setReparation(el.reparation.id);
    setShowModal(true);
    setSelectRepId(el.id);
    setGuarantee(el.guarnantee);
    setSelectEmail(el.appointment.client_email);
    setSerialNumber(el.serialnumber);
    setColor(el.color);
    setMemory(el.memory);
    setComment(el.comments);
    setCloseRepair(el.status === 1 ? true : false);
    setEditable(el.status === 1 ? true : false);
    if (el.images.length > 0) {
      setImageList(JSON.parse(el.images));
    } else {
      setImageList([]);
    }
    setPrice(el.price);
    getSearchFilterFieldExt(el.model.id);
  };

  function handlePhoneChange(value, e) {
    setPhone(value);
    if (brandflg === true) {
      setBrandflg(false);
      setBrand(0);
    }
  }

  function handleBrandChange(value, e) {
    setBrand(value);
    setBrandflg(true);
    setModel(0);
  }

  function handleModelChange(value, e) {
    setModel(value);
    getSearchFilterFieldExt(value);
  }

  function initBrandSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    return (
      phoneObj[0] !== undefined &&
      phoneObj[0]["brand"].map((element) => {
        return (
          <Option value={element.id} key={element.brand_name}>
            {element.brand_name}
          </Option>
        );
      })
    );
  }

  function initModelSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    if (phoneObj[0] !== undefined) {
      let modelObj = phoneObj[0]["brand"].filter((e1) => e1.id === brand);
      return (
        modelObj[0] !== undefined &&
        modelObj[0]["model"].map((element) => {
          return (
            <Option value={element.id} key={element.model_name}>
              {element.model_name}
            </Option>
          );
        })
      );
    }
  }

  function initReparationSelect() {
    return (
      repList !== [] &&
      repList.map((element) => {
        return (
          <Option value={element.id} key={element.name}>
            {element.name}
          </Option>
        );
      })
    );
  }

  function handleReparationChange(value, e) {
    setReparation(value);
    let services = {
      shop_id: url_shopId,
      device: phone,
      brand: brand,
      model: model,
      reparation: value,
    };
    getModelService(services);
  }

  function handleSerialNumberChange(e) {
    setSerialNumber(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleMemoryChange(e) {
    setMemory(e.target.value);
  }

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleCloseDayChange(e) {
    setCloseRepair(e.target.checked);
  }

  function getAppointmentsCountThisWeek(_list) {
    let count = 0;
    let date = new Date();
    if (_list !== undefined) {
      _list.map((el) => {
        let comp = moment(el.date).isSame(date, "week");

        if (comp === true) {
          if (el.status === -1) {
            count = count + 1;
          }
        }
        return true;
      });
    }
    return count;
  }

  function getAppointmentsCountAll(_list) {
    let count = 0;

    if (_list !== undefined) {
      _list.map((el) => {
        if (el.status === -1) {
          count = count + 1;
        }
        return true;
      });
    }
    return count;
  }

  function SortAppointmentList(date) {
    let _list = [];

    if (appointmentList !== undefined) {
      let m = moment(date);
      let str = m.format("DD-MM-YYYY");
      appointmentList.map((el) => {
        let comp = moment(el.appointment.date).isSame(str, "day");
        if (comp === true) {
          _list.push(el);
        }
        return true;
      });
    }
    setAppointList(_list);
  }

  function onSortDate(date) {
    SortAppointmentList(date);
  }

  function formatDate(date, frmString) {
    let date1 = new Date(date);
    date1 = new Date(date1.setDate(date1.getDate() + 1));
    return moment(new Date(date1), frmString).format(frmString);
  }

  useEffect(() => {
    if (isLoadService === true) {
      if (modelServices.length > 0) {
        setPrice(modelServices[0].price);
        setGuarantee(modelServices[0].guarantee);
        setLoadService(false);
      }
    }
    if (isLoad === false || isLoadAppointment === true) {
      if (appointmentList === undefined) {
        setAppCount(0);
      } else {
        let count = getAppointmentsCountThisWeek(appointmentList);
        setAppCount(count);
        count = getAppointmentsCountAll(appointmentList);
      }

      function compare_item(a, b) {
        if (a.appointment.date < b.appointment.date) {
          return -1;
        } else if (a.appointment.date > b.appointment.date) {
          return 1;
        } else {
          return 0;
        }
      }
      let applist = appointmentList.sort(compare_item);

      setAppointList(applist);
      setLoadAppointment(false);
      setLoad(true);
    }
  }, [
    isLoadService,
    isLoad,
    isLoadAppointment,
    modelServices,
    setLoadService,
    appointmentList,
    setLoadAppointment,
  ]);

  const onDisplayChange = (e) => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <Layout>
      <div className="shop-dashboard-page">
        <Helmet>
          <title>Mr Again - Dashboard</title>
          <meta name="Keywords" content="Dashboard, MrAgain, Reparateur," />
          <meta
            name="description"
            content="Via je dashboard beheer je snel en eenvoudig al je reparaties"
          />
          <link rel="canonical" href={FRONT_END_URL + "/login"} />

          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Dashboard" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta name="og_site_name" property="og:site_name" content="Mr Again" />

          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <div className="shop-dashboard-page-container">
          <span className="menu-btn" onClick={onDisplayChange}>
            <img src={menu_icon} />
          </span>

          {state.width < 1020 ? (
            <div className="dashboard-page-widget" style={{ display: display }}>
              <Avatar
                className="shop-widget-avatar"
                src={account_profile.bg_photo}
              />
              <div className="widget-shop-title">{account_profile.name}</div>
              <div className="widget-shop-email">{auth_user.email}</div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "calendar"]}
                />
                <Link href={"/dashboard/" + url_shopId}>Dashboard</Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="over-icon"
                  icon={["fas", "chalkboard-teacher"]}
                />
                <Link href={"/reparatie-overzicht/" + url_shopId}>
                  Reparatie Overzicht
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "tasks"]}
                />
                <Link href={"/apparaten-beheer/" + url_shopId}>
                  Model & Reparatie beheer
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "user"]}
                />
                <Link href={"/profiel-beheer/" + url_shopId}>Profiel</Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "cogs"]}
                />
                <Link href={"/account-gegevens/" + url_shopId}>
                  Account Settings
                </Link>
              </div>
            </div>
          ) : (
            <div className="dashboard-page-widget" style={{ display: "block" }}>
              <Avatar
                className="shop-widget-avatar"
                src={account_profile.bg_photo}
              />
              <div className="widget-shop-title">{account_profile.name}</div>
              <div className="widget-shop-email">{auth_user.email}</div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "calendar"]}
                />
                <Link href={"/dashboard/" + url_shopId}>Dashboard</Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="over-icon"
                  icon={["fas", "chalkboard-teacher"]}
                />
                <Link href={"/reparatie-overzicht/" + url_shopId}>
                  Reparatie Overzicht
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "tasks"]}
                />
                <Link href={"/apparaten-beheer/" + url_shopId}>
                  Model & Reparatie beheer
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "user"]}
                />
                <Link href={"/profiel-beheer/" + url_shopId}>Profiel</Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "cogs"]}
                />
                <Link href={"/account-gegevens/" + url_shopId}>
                  Account Settings
                </Link>
              </div>
            </div>
          )}
          <div className="dashboard-page-content">
            <div className="dashboard-page-body">
              <div className="dashboard-page-body-title">Mijn Dashboard</div>
              <div className="new-appointment-blog">
                <div className="new-appointment-count">
                  <div className="count">
                    <p>NIEUWE AFSPRAKEN</p>
                    <p>{appCount}</p>
                  </div>
                  <Avatar className="appointment-avatar" src={avatar} />
                </div>
              </div>
              <div className="shop-appointment-table-header">
                <div className="shop-appointment-table-title">
                  Ingeplande afspraken
                </div>
                <div className="sort-by-date">
                  <DatePicker onChange={(date) => onSortDate(date)} />
                  <div className="sort-by-date-desc">Sorteer op datum</div>
                </div>
              </div>
              <div className="shop-appointment-table-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Tijd</th>
                      <th>Klant</th>
                      <th>Apparaat</th>
                      <th>Model</th>
                      <th>Type reparatie</th>
                      <th>Prijs</th>
                      <th>Actie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointlist &&
                      appointlist.map((el) => {
                        if (el.status !== 1) {
                          return (
                            <tr key={el.id}>
                              <td>
                                {formatDate(el.appointment.date, "DD-MM-YYYY")}
                              </td>
                              <td>{el.appointment.time}</td>
                              <td>{el.appointment.client_name}</td>
                              <td>{el.device.device_name}</td>
                              <td>{el.model.model_name}</td>
                              <td>{el.reparation.reparation_name}</td>
                              <td>{el.price}</td>
                              <td className="reparation-action-btn-group">
                                <Button
                                  className="reparation-change-btn"
                                  onClick={() => {
                                    handleModalShow(el);
                                  }}
                                >
                                  Bewerk reparatie
                                </Button>
                                {el.status === -1 && (
                                  <Popconfirm
                                    title="Weet je zeker dat je de afspraak wilt annuleren?"
                                    onConfirm={() => {
                                      confirmCancelAppointment(el.appointment.id);
                                    }}
                                    okText="Ja"
                                    cancelText="Nee"
                                  >
                                    <Button className="reparation-cancel-btn">
                                      Annuleer afspraak
                                    </Button>
                                  </Popconfirm>
                                )}
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </tbody>
                </Table>
                <Modal
                  show={showModal}
                  onHide={handleModalClose}
                  className="reparation-change-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Reparatie details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="select-device-reparation">
                      <div>
                        <Select
                          className="device-select"
                          onChange={handlePhoneChange}
                          value={phone}
                          disabled={editable}
                        >
                          {filterlistPBM.map((element) => {
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
                      <div>
                        <Select
                          className="brand-select"
                          onChange={handleBrandChange}
                          value={brand}
                          disabled={editable}
                        >
                          {initBrandSelect()}
                        </Select>
                      </div>
                      <div>
                        <Select
                          className="model-select"
                          onChange={handleModelChange}
                          value={model}
                          disabled={editable}
                        >
                          {initModelSelect()}
                        </Select>
                      </div>
                      <div>
                        <Select
                          className="service-select"
                          onChange={handleReparationChange}
                          value={reparation}
                          disabled={editable}
                        >
                          {initReparationSelect()}
                        </Select>
                      </div>
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">IMEI nummer </Label>
                      <Input
                        className="repair-input"
                        onChange={(e) => {
                          handleSerialNumberChange(e);
                        }}
                        value={serialnumber}
                        disabled={editable}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">Uitvoering</Label>
                      <Input
                        className="repair-input"
                        onChange={(e) => {
                          handleColorChange(e);
                        }}
                        value={color}
                        disabled={editable}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">Omschrijving</Label>
                      <Input
                        className="repair-input"
                        onChange={(e) => {
                          handleMemoryChange(e);
                        }}
                        value={memory}
                        disabled={editable}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">Opmerkingen</Label>
                      <Input
                        className="repair-input"
                        onChange={(e) => {
                          handleCommentChange(e);
                        }}
                        value={comments}
                      />
                    </div>
                    <div className="repair-input-group-check">
                      <Checkbox
                        onChange={(e) => {
                          handleCloseDayChange(e);
                        }}
                        checked={closeRepair}
                        disabled={editable}
                      />
                      <Label>Reparatie afgerond</Label>
                    </div>
                    <div className="repair-input-group-image">
                      <input
                        className="image-picker-input"
                        id="car"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        multiple
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                        disabled={editable}
                      />
                      {imageList ? (
                        <ImagePicker
                          images={imageList.map((image, i) => ({
                            src: image,
                            value: i,
                          }))}
                          disabled={editable}
                        />
                      ) : (
                        ""
                      )}
                      <div className="image-picker-label">
                        <label className="image-picker-label-btn" htmlFor="car">
                          Voeg foto toe
                        </label>
                        <Button
                          className="image-picker-btn"
                          onClick={handleRemovePicture}
                          disabled={editable}
                        >
                          Verwijder foto
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleUpdateAppointment(selectRepid, selectEmail);
                      }}
                    >
                      Sla op
                    </Button>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Annuleer
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth_user: state.account.auth_user,
  appointmentList: state.appointment.appointmentList,
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  isLoadAppointment: state.appointment.isLoadAppointment,
  modelServices: state.search.modelServices,
  isLoadService: state.search.isLoadService,
  account_profile: state.account.account_profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (data, id, name, flg) =>
      uploadImage(data, id, name, flg, dispatch),
    getSearchFilterField: (data) => {
      getSearchFilterField(dispatch);
    },
    getSearchFilterFieldExt: (model_id) => {
      getSearchFilterFieldExt(model_id, dispatch);
    },
    getModelService: (data) => {
      getModelService(data, dispatch);
    },
    updateAppointment: (id, email, data, shop) => {
      updateAppointment(id, email, data, shop, dispatch);
    },
    CancelAppointment: (id, shop) => {
      CancelAppointment(id, shop, dispatch);
    },
    setLoadService: (data) => {
      dispatch(setLoadService(data));
    },
    setLoadAppointment: (data) => {
      dispatch(setLoadAppointment(data));
    },
    getAppointments: (id) => {
      getAppointments(id, dispatch);
    },
    getSimpleAccountInformation: (id) => {
      getSimpleAccountInformation(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDashboard);