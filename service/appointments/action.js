import {
  FETCH_APPOINTMENT_COUNT,
  FETCH_APPOINTMENT_LIST,
  SET_LOAD_APPOINTMENT,
  SET_APPOINTMENT_DATE,
  FETCH_REPARATION_LIST,
  MANUAL_APPOINTMENT_STATUS,
} from "./types";

export const fetchAppointmentCount = (data) => ({
  type: FETCH_APPOINTMENT_COUNT,
  payload: data,
});

export const fetchAppointmentlist = (data) => ({
  type: FETCH_APPOINTMENT_LIST,
  payload: data,
});

export const fetchReparationGuarantee = (data) => ({
  type: FETCH_REPARATION_LIST,
  payload: data,
});

export const setLoadAppointment = (data) => ({
  type: SET_LOAD_APPOINTMENT,
  payload: data,
});

export const setAppointmentDate = (date) => ({
  type: SET_APPOINTMENT_DATE,
  payload: date,
});

export const manualAppointmentStatus = (data) => (
  console.log("🚀 => data", data),
  {
    type: MANUAL_APPOINTMENT_STATUS,
    payload: data,
  }
);
