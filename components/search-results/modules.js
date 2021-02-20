import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api from "@/utils/api";
import router from "next/router";
const { createFormModule } = require("@/modules/forms");

export const filtersFormModule = createFormModule({
  guid: "shops",
  async init() {
    const fromAddressBar = router.router.query;

    return {
      location: fromAddressBar.zip || "",
      device: fromAddressBar.device || "0",
      brand: fromAddressBar.brand || "0",
      model: fromAddressBar.model || "0",
      service: "0",
      distance: fromAddressBar.distance || "5",
      guarantee: fromAddressBar.guarantee || "-1",
      price: fromAddressBar.price || "-1",
      limit: 100,
    };
  },

  submit(data) {
    return shopListModule.actions.updateQuery(data)
  }
});

export const shopListModule = createListModule({
  guid: "shops",
  async fetchData(query = {}) {
    const data = await api.get(`${API_PATH.SEARCH}/`, {
      ...query,
      phone: query.device,
      reparation: query.service,
      distance: query.distance,
      price: query.price,
      guarantee: query.guarantee,
      sort: 0,
    });
    return {
      items: data,
    };
  },
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});

export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices"],
  fetchData() {
    return api.get(`${API_PATH.GETDEVICES}/`);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands"],
  fetchData([_1, _2, deviceId]) {
    return api.get(`${API_PATH.GETBRANDS}/?device=${deviceId}`);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: ["shops", "models", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, deviceId, bandId]) {
    return api.get(`${API_PATH.GETMODELS}/?device=${deviceId}&brand=${bandId}`);
  },
});

export const serviceFetcher = keyedDataFetcher({
  selectors: ["shops", "services", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, device, model]) {
    return api.get(`${API_PATH.GETREPARATIONS}/`, { device, model });
  },
});
