import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import { privateApi } from "@/utils/api";
import { notification } from "antd";

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
