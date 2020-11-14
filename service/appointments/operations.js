import { API_PATH } from "../../constants";
import axios from "axios";
import { fetchAppointmentlist, fetchReparationGuarantee } from "./action";
// import { tokenConfig, tokenConfigGet } from "Service/account/operations.js";
import { tokenConfig, tokenConfigGet } from "../account/operations";
import API from './api'

export function createAppointment(
  data,
  data1,
  name,
  address,
  datetime,
  dispatch
) {
  API()
    .post(`${API_PATH.CREATEAPPOINTMENT}/`, {
      appointmentData: data,
      repairSeviceData: data1,
      name,
      address,
      datetime,
    })
    .then((res) => {
      data1.appointment = res.data.appointment_id;
      API
        .post(`${API_PATH.CREATESHOPREPAIRSERVICE}/`, data1)
        .then((res) => {})
        .catch((err) => {});
    })
    .catch((err) => {});
}

export async function checkReviewPage(auth) {
  return await API()
    .post(`${API_PATH.CHECKREVIEWPAGE}/`, {
      auth: auth,
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

export async function createReview(auth, data, dispatch) {
  return await API()
    .post(`${API_PATH.CREATEREVIEW}/`, {
      auth: auth,
      reviewData: data,
    })
    .then((res) => {
      API.get(`${API_PATH.EVALUATERATE}/${data.shop}/`);
      return true;
    })
    .catch((err) => {
      return false;
    });
}

export function getReparationGuarantee(id, dispatch) {
  return API()
    .get(`${API_PATH.GETREPARATIONGUARANTEE}/${id}/`)
    .then((res) => {
      dispatch(fetchReparationGuarantee(res.data));
    })
    .catch((err) => {});
}

export async function getAppointmentNumber(data) {
  try {
    const res = await API.post(`${API_PATH.GETAPPOINTMENTNUMBER}/`, data);
    return res.data;
  } catch (error) {
    console.warn(error);
    return -1;
  }
}

export async function getAppointmentTimeTable(data) {
  try {
    const res = await API.post(`${API_PATH.GETAPPOINTMENTTIMETABLE}/`, data);
    return res.data;
  } catch (error) {
    return [];
  }
}

export function getAppointments(id, dispatch) {
  API()
    .get(`${API_PATH.GETAPPOINTMENTS}/${id}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchAppointmentlist(res.data));
    })
    .catch((err) => {});
}

export function filterReparationOverview(data, dispatch) {
  API()
    .get(`${API_PATH.FILTERREPARATION}/`, { params: data })
    .then((res) => {
      dispatch(fetchAppointmentlist(res.data));
    })
    .catch((err) => {});
}

export function updateAppointment(id, email, data, shop_id, dispatch) {
  let status = data.status;
  API()
    .put(`${API_PATH.UPDATEAPPOINTMENT}/${id}/`, data)
    .then((res) => {
      API
        .get(`${API_PATH.GETAPPOINTMENTS}/${shop_id}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchAppointmentlist(res.data));
          if (status === 1) {
            API
              .post(`${API_PATH.REPAIRCOLSEAUTUEMAIL}/`, {
                id: id,
                email: email,
                shop: shop_id,
              })
              .then((res) => {});
          }
        });
    })
    .catch((err) => {});
}

export function CancelAppointment(id, shop_id, dispatch) {
  API()
    .delete(
      `${API_PATH.CANCELAPPOINTMENT}/${shop_id}/`,
      tokenConfigGet({ appoint_id: id })
    )
    .then((res) => {
      API
        .get(`${API_PATH.GETAPPOINTMENTS}/${shop_id}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchAppointmentlist(res.data));
        });
    })
    .catch((err) => {});
}

export default { createAppointment };
