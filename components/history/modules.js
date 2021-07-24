import { notification } from "antd";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api, { privateApi } from "@/utils/api";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const reparationsList = createListModule({
  guid: "shop-reprations",
  async fetchData(query = {}) {
    const userId = currentUser.selector(store.ref.getState())?.result?.id;

    try {
      const data = await privateApi.get(
        `${API_PATH.GETAPPOINTMENTS}/${userId}/`,
        query
      );
      return {
        items: data,
      };
    } catch (err) {
      notification.error({
        message: "Something went wrong while getting the list of shops",
      });

      return { items: [] };
    }
  },
});

export const historyFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await api.get(`${API_PATH.GETAPPOINTMENTS}/${shop}`);
    return data.map(({ item }) => item);
  },
});
