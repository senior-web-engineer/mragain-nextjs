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
} from "./action";
import axios from "axios";

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
    .get(`${API_PATH.GETMODELSERVICE}/`, { params: data })
    .then((res) => {
      dispatch(fetchModelServices(res.data));
      // dispatch(setLoadService(true));
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

export function contactUs(data, dispatch) {
  axios
    .post(`${API_PATH.CONTACTUS}/`, data)
    .then((res) => {})
    .catch((err) => {});
}

export default { searchShopFilter };
