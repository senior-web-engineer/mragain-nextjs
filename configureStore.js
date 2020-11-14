import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { routerReducer, createRouterMiddleware, initialRouterState } from 'connected-next-router'
import { createWrapper } from 'next-redux-wrapper'
import Router from 'next/router'
import searchReducer from "./service/search"
import accountReducer from "./service/account";
import appointmentReducer from "./service/appointments";
import thunk from 'redux-thunk';
// import { useRouter } from "next/router"
import { format } from 'url'

const rootReducer = combineReducers({
  router: routerReducer,
  search: searchReducer,
  account: accountReducer,
  appointment: appointmentReducer
});

export const initStore = (context) => {
  
  const routerMiddleware = createRouterMiddleware();

  const { asPath, pathname, query } = context.ctx || Router.router || {};

  let initialState
  if (asPath) {
    const url = format({ pathname, query })
    initialState = {
      router: initialRouterState(url, asPath)
    }
  }
  return createStore(rootReducer, initialState, applyMiddleware(routerMiddleware, thunk))
}

export const wrapper = createWrapper(initStore)