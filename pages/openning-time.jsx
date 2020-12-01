import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  TimePicker,
  Button,
  Modal,
  Input,
  Select,
  message,
  Checkbox,
} from "antd";
import { Table } from "react-bootstrap";
import {
  getAccountProfile,
  updateValidOpenTime,
  updateInvalidOpenTime,
} from "service/account/operations.js";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./openning-time.less";

import { Layout } from "@/components/global";

const { Option } = Select;

const OpenningTime = (routerProps) => {
  const [isValidChanged, setValidChanged] = useState(false);
  const [isInvalidChanged, setInvalidChanged] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [checkOpenTime, setCheckOpenTime] = useState(null);
  const [checkCloseTime, setCheckCloseTime] = useState(null);
  const [checkReason, setCheckReason] = useState(null);
  const [weekDay, setWeekDay] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [openTimeVisible, setOpenTimeVisible] = useState(false);
  const [invalidTimeVisible, setInvalidTimeVisible] = useState(false);
  const [openTimeTable, setTimeTable] = useState({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  });
  const [checkTimeTable, setCheckTimeTable] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [isClose, setClose] = useState(false);
  const [invalidTimeTitle, setInvalidTimeTitle] = useState("");
  const [isEditOpenTimes, setIsEditOpenTimes] = useState(true);
  const [isEditIrregularTimes, setIsEditIrregularTimes] = useState(true);
  const [editOBtn, setIsEditOBtn] = useState("Change Opening Times");
  const [editRBtn, setIsEditRBtn] = useState("Add Irregular Opening Times");

  const {
    auth_user,
    updateValidOpenTime,
    account_valid_time,
    account_invalid_time,
    account_valid_time_id,
    account_invalid_time_id,
    getAccountProfile,
  } = routerProps;

  function onChangeCheckReason(e) {
    setCheckReason(e.target.value);
  }

  const showOpenTimeModal = () => {
    setOpenTimeVisible(true);
  };

  const showCheckCalendarModal = () => {
    if (checkDay === null) {
      message.warning("please select the day in calendar", [2.5]);
      return;
    }
    setInvalidTimeVisible(true);
  };

  const handleCheckClose = (e) => {
    if (e.target.checked === true) {
      setClose(true);
    } else {
      setClose(false);
    }
  };

  const handleCheckTime = () => {
    setIsEditRBtn("Save Changes Irregular Times");
    setIsEditIrregularTimes(false);

    if (isClose === true) {
      let objArray = checkTimeTable;
      let obj = {
        checkDay: checkDay,
        reason: checkReason,
        open_close_time: "-",
      };

      let index = objArray.findIndex(
        ({ checkDay }) => checkDay === obj.checkDay
      );

      if (index === -1) {
        objArray.push(obj);
      } else {
        objArray[index] = obj;
      }
      setInvalidChanged(true);
      setCheckTimeTable(objArray);
      setInvalidTimeVisible(false);
    } else {
      if (checkOpenTime === null || checkCloseTime === null) {
        message.warning("opentime and close time have to select both!", [2.5]);
        return;
      }
      if (timeValidate(checkOpenTime, checkCloseTime) === true) {
        let objArray = checkTimeTable;
        let obj = {
          checkDay: checkDay,
          reason: checkReason,
          open_close_time: checkOpenTime + "-" + checkCloseTime,
        };
        let index = objArray.findIndex(
          ({ checkDay }) => checkDay === obj.checkDay
        );

        if (index === -1) {
          objArray.push(obj);
        } else {
          objArray[index] = obj;
        }
        setInvalidChanged(true);
        setCheckTimeTable(objArray);
        setInvalidTimeVisible(false);
      } else {
        message.error("please select the time correctly!", [2.5]);
      }
    }
  };

  const handleCheckTimeCancel = () => {
    setInvalidTimeVisible(false);
  };

  function initWeekSelect() {
    const week = [
      ["All day", "All"],
      ["Monday", "Mon"],
      ["Tuesday", "Tue"],
      ["Wednesday", "Wed"],
      ["Thursday", "Thu"],
      ["Friday", "Fri"],
      ["Saturday", "Sat"],
      ["Sunday", "Sun"],
    ];
    return week.map((element) => {
      return (
        <Option value={element[1]} key={element[1]}>
          {element[0]}
        </Option>
      );
    });
  }
  function timeValidate(oTime, cTime) {
    let oT = "";
    let cT = "";
    oTime.split(":").map((el) => {
      oT = oT + el;
      return true;
    });
    cTime.split(":").map((el) => {
      cT = cT + el;
      return true;
    });
    return +oT < +cT;
  }
  const handleOk1 = () => {
    if (timeValidate(openTime, closeTime) === true) {
      setIsEditOBtn("Save Changes");
      setValidChanged(true);
      if (weekDay === "All") {
        setTimeTable({
          Mon: openTime + "-" + closeTime,
          Tue: openTime + "-" + closeTime,
          Wed: openTime + "-" + closeTime,
          Thu: openTime + "-" + closeTime,
          Fri: openTime + "-" + closeTime,
          Sat: openTime + "-" + closeTime,
          Sun: openTime + "-" + closeTime,
        });
      } else if (weekDay === "") {
        message.error("Selecteer een dag a.u.b.", [2.5]);
        return;
      } else {
        setTimeTable({
          ...openTimeTable,
          [weekDay]: openTime + "-" + closeTime,
        });
      }
      setIsEditOpenTimes(false);
    } else {
      message.error("Er gaat wat fout, heb je een tijd geselecteerd?", [2.5]);
    }
  };

  const handleCancel1 = () => {
    setOpenTimeVisible(false);
  };

  function onCheckOpenTimeChange(date, dateString) {
    setCheckOpenTime(dateString);
  }

  function onCheckCloseTimeChange(date, dateString) {
    setCheckCloseTime(dateString);
  }

  function onOpenTimeChange(date, dateString) {
    setOpenTime(dateString);
  }

  function onCloseTimeChange(date, dateString) {
    setCloseTime(dateString);
  }

  function onWeekDayChange(e) {
    setWeekDay(e);
  }

  function selectDate(date, { selected, disabled }) {
    setSelectedDay(date);
    let m = moment(date);
    setInvalidTimeTitle(
      "Normal openning times not valid on " + m.format("DD-MM-YYYY")
    );
    setCheckDay(date.getTime());
  }

  const updateOpenTime = () => {
    let data;

    setIsEditOpenTimes(true);
    setIsEditOBtn("Change Open Times");
    if (isValidChanged === true) {
      data = {
        valid_day_time: JSON.stringify(openTimeTable),
        shop: auth_user.account_id,
      };
      updateValidOpenTime(account_valid_time_id, data);
    }

    message.success("Shop open and close time table is updated!", [2.5]);
    getAccountProfile(auth_user.account_id);
  };

  const updateIrregularTime = () => {
    let data;

    setIsEditIrregularTimes(true);
    setIsEditRBtn("Add Irregular Times");

    if (isInvalidChanged === true) {
      data = {
        invalid_day_time: JSON.stringify(checkTimeTable),
        shop: auth_user.account_id,
      };
      updateInvalidOpenTime(account_invalid_time_id, data);
    }
    message.success("Shop open and close time table is updated!", [2.5]);
    getAccountProfile(auth_user.account_id);
  };

  useEffect(() => {
    function initProfilePage() {
      let temp = [];
      if (Object.keys(account_valid_time).length !== 0) {
        temp = JSON.parse(account_valid_time);
        setTimeTable(temp);
      }
      if (Object.keys(account_invalid_time).length !== 0) {
        temp = JSON.parse(account_invalid_time);
        setCheckTimeTable(temp);
      }
    }
    if (isLoad === false) {
      initProfilePage();
      setLoad(true);
    }
  }, [isLoad, account_invalid_time, account_valid_time, setLoad]);

  function splitOpenTime(arg, flg) {
    if (arg === undefined || arg === "") {
      return "";
    }
    let spls = arg.split("-");
    if (flg === 0) return spls[0];
    else {
      return spls[1];
    }
  }

  /** calendar initialize start*/
  let dateArr = [];
  let closeDateArr = [];
  if (Object.keys(account_invalid_time).length !== 0) {
    let temp = JSON.parse(account_invalid_time);
    temp.map((el) => {
      if (el.open_close_time !== "-") {
        dateArr.push(new Date(el.checkDay));
      } else {
        closeDateArr.push(new Date(el.checkDay));
      }
      return true;
    });
  }

  const modifiers = {
    sunday: { daysOfWeek: [0] },
    saturday: { daysOfWeek: [6] },
    invalid: dateArr,
    closed: closeDateArr,
  };

  const modifiersStyles = {
    sunday: {
      color: "red",
      borderLeft: "none",
    },
    saturday: {
      color: "blue",
      borderRight: "none",
    },
    invalid: {
      color: "white",
      backgroundColor: "orange",
    },
    closed: {
      color: "white",
      backgroundColor: "red",
    },
  };
  /** calendar initialize end*/

  return (
    <Layout>
      <div className="repair-shop-opentime">
        <div className="main-title">
          <div className="wrap">
            <h4>Edit Openning Times</h4>
          </div>
        </div>
        <div className="repair-shop-opentime-container">
          <div className="repair-shop-opentime-container-wrap">
            <div className="edit-opentime-blog">
              <div className="edit-opentime-blog-left">
                <Modal
                  title="Edit open & close time"
                  visible={openTimeVisible}
                  onOk={() => {
                    handleOk1();
                  }}
                  onCancel={() => {
                    handleCancel1();
                  }}
                >
                  <div className="open-time-modal-item">
                    <div className="time-picker-label mr-1">Weekday : </div>
                    <Select
                      className="contact-modal-input"
                      placeholder="contact site url"
                      defaultValue="select"
                      defaultKey="All"
                      onChange={onWeekDayChange}
                    >
                      {initWeekSelect()}
                    </Select>
                  </div>
                  <div className="select-time-picker">
                    <div className="open-time-item">
                      <div className="time-picker-label mr-1">Open Time : </div>
                      <TimePicker
                        onChange={onOpenTimeChange}
                        picker="time"
                        format="HH:mm"
                      />
                    </div>
                    <div className="open-time-item ml-3">
                      <div className="time-picker-label mr-1">
                        Close Time :{" "}
                      </div>
                      <TimePicker
                        onChange={onCloseTimeChange}
                        picker="time"
                        format="HH:mm"
                      />
                    </div>
                  </div>
                </Modal>
                <div className="opentime-blog-title">Openning Times</div>
                <div className="opentime-blog-content">
                  <Table>
                    <tbody>
                      <tr>
                        <td>Monday</td>
                        <td>{splitOpenTime(openTimeTable.Mon, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Mon, 1)}</td>
                      </tr>
                      <tr>
                        <td>Tuesday</td>
                        <td>{splitOpenTime(openTimeTable.Tue, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Tue, 1)}</td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td>{splitOpenTime(openTimeTable.Wed, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Wed, 1)}</td>
                      </tr>
                      <tr>
                        <td>Thursday</td>
                        <td>{splitOpenTime(openTimeTable.Thu, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Thu, 1)}</td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td>{splitOpenTime(openTimeTable.Fri, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Fri, 1)}</td>
                      </tr>
                      <tr>
                        <td>Saturday</td>
                        <td>{splitOpenTime(openTimeTable.Sat, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Sat, 1)}</td>
                      </tr>
                      <tr>
                        <td>Sunday</td>
                        <td>{splitOpenTime(openTimeTable.Sun, 0)}</td>
                        <td>{splitOpenTime(openTimeTable.Sun, 1)}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="time-change-btn-group">
                    <Button
                      className="mr-5"
                      onClick={() => {
                        if (isEditOpenTimes === true) {
                          showOpenTimeModal();
                        } else {
                          updateOpenTime();
                        }
                      }}
                    >
                      {editOBtn}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="edit-opentime-blog-right">
                <Modal
                  // title="Normal openning times not valid on"
                  title={invalidTimeTitle}
                  visible={invalidTimeVisible}
                  onOk={() => {
                    handleCheckTime();
                  }}
                  onCancel={() => {
                    handleCheckTimeCancel();
                  }}
                >
                  <div className="open-time-modal-item">
                    <div className="time-picker-label mr-1">Reason : </div>
                    <Input
                      placeholder="please input open invalid reason"
                      onChange={onChangeCheckReason}
                    ></Input>
                  </div>
                  <div className="select-time-picker">
                    <div className="open-time-item">
                      <div className="time-picker-label mr-1">Open Time : </div>
                      <TimePicker
                        onChange={onCheckOpenTimeChange}
                        picker="time"
                        format="HH:mm"
                      />
                    </div>
                    <div className="open-time-item ml-3">
                      <div className="time-picker-label mr-1">
                        Close Time :{" "}
                      </div>
                      <TimePicker
                        onChange={onCheckCloseTimeChange}
                        picker="time"
                        format="HH:mm"
                      />
                    </div>
                  </div>
                  <div className="close-day-check-blog pt-3">
                    <Checkbox onChange={handleCheckClose}>Close a day</Checkbox>
                  </div>
                </Modal>
                <div className="opentime-blog-title mb-3">
                  Normal openning times not valid on
                </div>
                <div className="opentime-blog-content">
                  <DayPicker
                    selectedDays={selectedDay}
                    onDayClick={selectDate}
                    month={new Date()}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                  />
                  <div className="">
                    <Button
                      className="check-calendar-btn mt-4"
                      onClick={() => {
                        if (isEditIrregularTimes === true) {
                          showCheckCalendarModal();
                        } else {
                          updateIrregularTime();
                        }
                      }}
                    >
                      {editRBtn}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  auth_user: state.account.auth_user,
  account_valid_time: state.account.account_valid_time,
  account_valid_time_id: state.account.account_valid_time_id,
  account_invalid_time: state.account.account_invalid_time,
  account_invalid_time_id: state.account.account_invalid_time_id,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    updateValidOpenTime: (id, data) => {
      updateValidOpenTime(id, data, dispatch);
    },
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenningTime);
