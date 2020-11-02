import { combineReducers } from "redux";
import { routerReducer } from "connected-next-router";
import searchReducer from "../service/search";
import accountReducer from "../service/account";
import appointmentReducer from "../service/appointments";
const rootReducer = () =>
  combineReducers({
    router: routerReducer,
    search: searchReducer,
    account: accountReducer,
    appointment: appointmentReducer
  });

export default rootReducer;
