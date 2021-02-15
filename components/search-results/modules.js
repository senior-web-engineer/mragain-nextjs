import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api from "@/utils/api";

const { createFormModule } = require("@/modules/forms");

export const filtersFormModule = createFormModule({
  guid: "shops",
  async init() {
    return {
      location: 100
    }
  }
})

export const shopListModule = createListModule({
  guid: "shops",
  async fetchData(query) {
    return {
      items: []
    }
  },
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});


export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices"],
  fetchData() {
    return api.get(`${API_PATH.GETDEVICES}/`)
  }
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands"],
  fetchData([_1,_2, deviceId]) {
    return api.get(`${API_PATH.GETBRANDS}/?device=${deviceId}`)
  }
});

export const modelFetcher = keyedDataFetcher({
  selectors: ["shops", "models",() => filtersFormModule.state.values.device,],
  fetchData([_1, _2, deviceId, bandId]) {
    return api.get(`${API_PATH.GETMODELS}/?device=${deviceId}&brand=${bandId}`)
  }
});
