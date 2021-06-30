import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import api, { privateApi } from "@/utils/api";
import { createFormModule } from "@/modules/forms";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const getRepairDevices = dataFetcher({
  selectors: [],
  fetchData() {
    return privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
  },
});

export const getRepairBrandModel = dataFetcher({
  selectors: [],
  fetchData() {
    const shopName = currentUser.selector(store.ref.getState())?.result?.name;
    return privateApi.get(
      `${API_PATH.REPAIRBRANDMODEL}/${shopName}/?shop=${shopName}&device=1`
    );
  },
});

export const getShopReparationModel = dataFetcher({
  selectors: [],
  fetchData() {
    const shopName = currentUser.selector(store.ref.getState())?.result?.name;
    return privateApi.get(
      `${API_PATH.GETSHOPREPAIRATION}/${shopName}/?shop=${shopId}&device=1&model=34&brand=2`
    );
  },
});

export const shopInfoFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopName = currentUser.selector(store.ref.getState())?.result?.name;
    const data = await privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
    return data;
  },
});
