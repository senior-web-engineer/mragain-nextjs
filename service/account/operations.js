import { API_PATH } from "../../constants";
import axios from "axios";
import {
  signupSuccess,
  logoutA,
  signupFail,
  loginFail,
  initUserLoginChange,
  registerAuthToken,
  registerAuthUser,
  resetPasswordFail,
  resetPasswordSuccess,
  fetchAccountSettings,
  initAccountProfile,
  initAccountValidTime,
  initAccountInvalidTime,
  fetchRepairDevices,
  setLoadedProfile,
  initAccountReviews,
  fetchShopModelGuarantee,
  setLoadPBM,
  setCreatedGuarantee,
  setDeletedGuarantee,
} from "./action";
import Axios from "axios";

export const tokenConfig = () => {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfigOnly = () => {
  const token = localStorage.getItem("auth-token");
  const config = { headers: {} };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfig1 = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfigGet = (data) => {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  config.params = data;
  return config;
};

export function registerUser(data, dispatch) {
  axios
    .post(`${API_PATH.REGISTERUSER}/`, data)
    .then((res) => {
      dispatch(signupSuccess());
    })
    .catch((err) => {
      if (err.response.data.error !== "") {
        dispatch(signupFail(err.response.data.error));
      }
    });
}

export function getAuthUser(dispatch) {
  axios.get(`${API_PATH.GETAUTHUSER}/`, tokenConfig()).then((res) => {
    dispatch(registerAuthUser(res.data));
    console.log("getAuthUser -> res.data", res.data)
  });
}

export function login(data, dispatch) {
  axios
    .post(`${API_PATH.LOGIN}/`, {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      let token = res.data.key;
      dispatch(registerAuthToken(token));
      axios
        .get(`${API_PATH.GETAUTHUSER}/`, tokenConfig1(token))
        .then((res) => {
          localStorage.setItem("auth-token", token);
          let obj = Object.assign({}, res.data);
          delete obj.is_super;
          localStorage.setItem("auth-user", JSON.stringify(obj));
          dispatch(registerAuthUser(res.data));
          dispatch(initUserLoginChange(true));
        })
        .catch((err) => {});
    })
    .catch((err) => {
      dispatch(loginFail());
    });
}

export function logout(dispatch) {
  axios
    .get(`${API_PATH.LOGOUT}/`, tokenConfig())
    .then((res) => {
      dispatch(logoutA());
    })
    .catch((err) => {});
}

export function resetPasswordEmail(_data, dispatch) {
  var url = API_PATH.RESETPASSWORDEMAIL;
  axios
    .post(`${url}/`, _data)
    .then((res) => {})
    .catch((err) => {});
}

export async function resetPasswordConfirmEmail(_data, dispatch) {
  var url = API_PATH.RESETPASSWORDCONFIRMEMAIL;
  return await axios
    .post(`${url}/`, _data)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      if (err.response.data !== null) {
        let error = "";
        if ("new_password2" in err.response.data) {
          error = err.response.data.new_password2[0];
        } else if ("token" in err.response.data) {
          error = "token: " + err.response.data.token[0];
        }
        dispatch(signupFail(error));
        return false;
      }
    });
}

export function getAccountSettings(data, dispatch) {
  console.log("data", data);
  axios
    .get(`${API_PATH.ACCOUNTSETTING}/${data}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchAccountSettings(res.data));
    })
    .catch((err) => {});
}

export function getDevices(dispatch) {
  axios
    .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchRepairDevices(res.data));
    })
    .catch((err) => {});
}

export function getShopIdByInformation(str, dispatch) {
  return axios
    .get(`${API_PATH.GETSHOPIDBYINFORMATION}/`, { params: { shop_info: str } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {});
}

export function getShopBrandModel(data, dispatch) {
  dispatch(setLoadPBM(false));
  axios
    .get(`${API_PATH.REPAIRBRANDMODEL}/${data.shop}/`, tokenConfigGet(data))
    .then((res) => {
      dispatch(fetchShopModelGuarantee(res.data));
      // dispatch(setLoadPBM(true));
    })
    .catch((err) => {});
}

export async function updateAccountSettings(id, data, dispatch) {
  return await axios
    .put(`${API_PATH.ACCOUNTSETTING}/${id}/`, data, tokenConfig())
    .then((res) => {
      dispatch(fetchAccountSettings(res.data));
      return axios
        .put(`${API_PATH.UPDATEACCOUNTLOCATION}/${id}/`, data, tokenConfig())
        .then((res) => {
          if (res.data.city === "error") {
            return "error";
          }
          return "Je account settings zijn gewijzigd";
        })
        .catch((err) => {
          return "error1";
        });
    })
    .catch((err) => {});
}

export function resetPasswordConfirm(data, dispatch) {
  axios
    .put(`${API_PATH.RESETPASSWORDCONFIRM}/`, data, tokenConfig())
    .then((res) => {
      dispatch(resetPasswordSuccess("Je wachtwoord is gewijzigd"));
    })
    .catch((err) => {
      dispatch(resetPasswordFail(err.response.data));
    });
}

export function deleteAccount(id, dispatch) {
  axios
    .delete(`${API_PATH.UPDATEACCOUNT}/${id}`, id, tokenConfig())
    .then((res) => {})
    .catch((err) => {});
}

export function deleteShopGuarantee(id, account, device, dispatch) {
  dispatch(setLoadPBM(false));
  axios
    .delete(`${API_PATH.SHOPGUARANTEE}/`, tokenConfig())
    .then((res) => {
      axios
        .get(
          `${API_PATH.REPAIRBRANDMODEL}/${account}/`,
          tokenConfigGet({
            shop: account,
            device: device,
          })
        )
        .then((res) => {
          dispatch(fetchShopModelGuarantee(res.data));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

export function getSimpleAccountInformation(id, dispatch) {
  dispatch(setLoadedProfile(false));
  // console.log("account id---------------------------->", id);
  axios
    .get(`${API_PATH.UPDATEACCOUNTPROFILE}/${id}/`, tokenConfig())
    .then((res) => {
      dispatch(initAccountProfile(res.data));
      dispatch(setLoadedProfile(true));
    })
    .catch((err) => {});
}
export function getAccountProfile(id, dispatch) {
  let profile;
  let validTime;
  let invalidTime;
  let reviews;
  dispatch(setLoadedProfile(false));
  axios
    .get(`${API_PATH.UPDATEACCOUNTPROFILE}/${id}/`)
    .then((res) => {
      profile = res.data;
      axios
        .get(`${API_PATH.GETVALIDOPENTIME}/${id}/`)
        .then((res) => {
          validTime = res.data;
          axios
            .get(`${API_PATH.GETINVALIDOPENTIME}/${id}/`)
            .then((res) => {
              invalidTime = res.data;
              axios
                .get(`${API_PATH.GETREVIEWS}/${id}/`)
                .then((res) => {
                  reviews = res.data;
                  if (reviews.length === 0) {
                    reviews = [];
                  }
                  dispatch(initAccountProfile(profile));
                  dispatch(initAccountValidTime(validTime));
                  dispatch(initAccountInvalidTime(invalidTime));
                  dispatch(initAccountReviews(reviews));
                  dispatch(setLoadedProfile(true));
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

/**
 * @description Function called to upload the image to the server for the profile page.
 *
 * @export
 * @param {*} data : for sending the formData to the sever
 * @param {*} id
 * @param {*} name
 * @param {*} flg
 * @param {*} dispatch
 */
export async function uploadImage(data, id, name, flg, dispatch) {
  axios
    .post(`${API_PATH.UPLOADIMAGE}`, data, tokenConfig())
    .then((res) => {
      console.log("image upload for post", res);
      // if (flg === true) {
      //   axios
      //     .put(
      //       `${API_PATH.UPDATEACCOUNTPROFILE}/${id}/`,
      //       {
      //         name: name,
      //         bg_photo: res.data.file,
      //       },
      //       tokenConfig()
      //     )
      //     .then((res) => {
      //       console.log("image upload", res);
      //       return res;
      //     })
      //     .catch((err) => {
      //       console.log("error");
      //     });
      // } else {
      //   return res.data.file;
      // }
    })
    .catch((err) => {
      return console.log("error");
    });
}

/**
 * @description: Function called to upadate the account with the details liek image , id etc 
 *
 * @export
 * @param {*} id
 * @param {*} data
 * @param {*} dispatch
 */
export function updateAccountProfile(id, data, dispatch) {
  axios
    .post(`${API_PATH.UPDATEACCOUNTDETAIL}`, data, tokenConfig())
    .then((res) => {
      console.log("updateAccountProfile -> res",res);
      return res;
    })
    .catch((err) => {
      console.log("error");
    });
}

export function updateValidOpenTime(id, data, dispatch) {
  axios
    .put(`${API_PATH.UPDATEVALIDOPENTIME}/${id}/`, data, tokenConfig())
    .then((res) => {
      console.log(res);
      console.log("updateValidOpenTime -> res", res)
      return res;
    })
    .catch((err) => {
      console.log("error");
    });
}

export function updateInvalidOpenTime(id, data, dispatch) {
  axios
    .put(`${API_PATH.UPDATEINVALIDOPENTIME}/${id}/`, data, tokenConfig())
    .then((res) => {
      console.log("success");
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("error");
    });
}

export function createRepairDevice(data, dispatch) {
  axios
    .post(`${API_PATH.REPAIRDEVICES}/`, data, tokenConfig())
    .then((res) => {
      axios
        .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchRepairDevices(res.data));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

export function createGuaranteeModels(data, dispatch) {
  dispatch(setCreatedGuarantee(false));
  axios
    .post(`${API_PATH.GUARANTEEMODELS}/`, data, tokenConfig())
    .then((res) => {
      axios
        .get(
          `${API_PATH.REPAIRBRANDMODEL}/${data.shop_id}/`,
          tokenConfigGet({
            shop: data.shop_id,
            device: data.payload.device_id,
          })
        )
        .then((res) => {
          dispatch(fetchShopModelGuarantee(res.data));
        })
        .catch((err) => {});
      dispatch(setCreatedGuarantee(true));
    })
    .catch((err) => {});
}

export function updateShopModalGuarantees(data, dispatch) {
  axios
    .put(`${API_PATH.GUARANTEEMODELS}/`, data, tokenConfig())
    .then((res) => {})
    .catch((err) => {});
}

export function deleteRepairDevice(id, dispatch) {
  axios
    .delete(`${API_PATH.DELETEREPAIRDEVICE}/${id}/`, tokenConfig())
    .then((res) => {
      axios
        .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchRepairDevices(res.data));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

export function deleteGuaranteeModels(data, dispatch) {
  dispatch(setDeletedGuarantee(false));
  axios
    .put(`${API_PATH.DELETEGUARANTEEMODELS}`, data, tokenConfig())
    .then((res) => {
      axios
        .get(
          `${API_PATH.REPAIRBRANDMODEL}/${data.shop_id}/`,
          tokenConfigGet({
            shop: data.shop_id,
            device: data.device_id,
          })
        )
        .then((res) => {
          dispatch(fetchShopModelGuarantee(res.data));
          dispatch(setDeletedGuarantee(true));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

export const createImportReparationAndGuaranteeCSV = async (data) => {
  const config = tokenConfigOnly();
  const result = await axios.post(`${API_PATH.IMPORTCSV}`, data, config);
  return result;
};

export const getExportReparationAndGuaranteeCSV = async (data) => {
  const result = await Axios.get(
    `${API_PATH.EXPORTCSV}${data.shopId}/?device=${data.deviceId}&shop=${data.shopId}`
  );
  return result;
};

export default { registerUser };
