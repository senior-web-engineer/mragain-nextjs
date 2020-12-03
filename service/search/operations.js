import { API_PATH } from "../../constants";
import {
  setFindOut,
  resetShopFilterList,
  fetchFiterPBMList,
  fetchFiterRPGList,
  fetchShopFilterList,
  fetchModelServices,
  setLoadService,
  fetchNewestShopList,
  setLoadFilter,
  setShopDevices,
  setDeviceBrands,
  setShopReparationDetails,
  setReparationData,
} from "./action";
import axios from "axios";
import { logoutA } from "../account/action";
import { DETAILS_OF_SHOP_REPARATION } from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

axios.create({
  headers: {
    get: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    post: {
      "content-type": "multipart/form-data",
      Accept: "application/json",
    },
  },
  withCredentials: true,
});
export function getNewestShopList(count, city, dispatch) {
  axios
    .get(`${API_PATH.GETNEWESTSHOPS}/`, {
      params: { count: count, city: city },
    })
    .then((res) => {
      dispatch(fetchNewestShopList(res.data));
    })
    .catch((err) => {});
}
export async function getSearchFilterField(dispatch) {
  dispatch(setLoadFilter(false));
  return await axios
    .get(`${API_PATH.GETFILTERFIELDS}/`)
    .then((res) => {
      // console.log(res.status);
      if (res.status === 401) {
        dispatch(logoutA());
      } else {
      }
      dispatch(fetchFiterPBMList(res.data));
      return true;
    })
    .catch((err) => {
      return false;
    });
}

export function getModelService(data, dispatch) {
  dispatch(setLoadService(false));
  axios
    .get(`${API_PATH.GETSHOPREPARATIONDETAILS}/`, { params: data })
    .then((res) => {
      dispatch(fetchModelServices(res.data));
      dispatch(setLoadService(true));
    })
    .catch((err) => {});
}

export function getSearchFilterFieldExt(model_id, dispatch) {
  axios
    .get(`${API_PATH.GETFILTERFIELDEXT}/${model_id}/`)
    .then((res) => {
      dispatch(fetchFiterRPGList(res.data));
    })
    .catch((err) => {});
}

export function searchShopFilter(data, dispatch) {
  axios
    .get(`${API_PATH.SEARCH}/`, { params: data })
    .then((res) => {
      if (res.data.length > 0) {
        if (res.data[0].model_id === 0) {
          dispatch(setFindOut(true));
          dispatch(resetShopFilterList());
          return;
        }
      }
      dispatch(setFindOut(true));
      dispatch(fetchShopFilterList(res.data));
    })
    .catch((err) => {
      dispatch(setFindOut(true));
      dispatch(resetShopFilterList());
    });
}
export function getShopDevices(id, dispatch) {
  axios
    .get(`${API_PATH.GETSHOPDEVICES}/?shop=${id}`)
    .then((res) => {
      dispatch(setShopDevices(res.data));
      return res;
    })
    .catch((err) => {});
}
export async function getDeviceBrands(shopId, deviceId, dispatch) {
  return await axios.get(
    `${API_PATH.GETDEVICEBRANDS}/?shop=${shopId}&device=${deviceId}`
  );
}

export async function getBrandModels(shopId, deviceId, brandId, dispatch) {
  return await axios.get(
    `${API_PATH.GETBRANDMODELS}/?shop=${shopId}&device=${deviceId}&brand=${brandId}`
  );
}

export function contactUs(data, dispatch) {
  axios
    .post(`${API_PATH.CONTACTUS}/`, data)
    .then((res) => {})
    .catch((err) => {});
}

export default { searchShopFilter };
