import {
  FETCH_APPOINTMENT_LIST,
  FETCH_APPOINTMENT_COUNT,
  FETCH_REPARATION_LIST,
  SET_LOAD_APPOINTMENT,
  SET_APPOINTMENT_DATE,
} from "./types";
const initial_state = {
  appointmentDate: null,
  appointmentList: [],
  appointmentNum: 0,
  isLoadAppointment: 0,
  shopReparationList: [],
};

const appointmentReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_APPOINTMENT_DATE: {
      return {
        ...state,
        appointmentDate: action.payload,
      };
    }
    case FETCH_APPOINTMENT_COUNT: {
      return {
        ...state,
        appointmentNum: action.payload,
      };
    }
    case FETCH_APPOINTMENT_LIST: {
      return {
        ...state,
        appointmentList: action.payload,
        isLoadAppointment: true,
      };
    }
    case FETCH_REPARATION_LIST: {
      return {
        ...state,
        shopReparationList: action.payload,
      };
    }
    case SET_LOAD_APPOINTMENT: {
      return {
        ...state,
        isLoadAppointment: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default appointmentReducer;