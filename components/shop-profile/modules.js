import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api from "@/utils/api";
import { notification } from "antd";
import router from "next/router";
const { createFormModule } = require("@/modules/forms");

export const filtersFormModule = createFormModule({
  guid: "shop-services",
  async init(shopId) {
    const fromAddressBar = router.router.query;

    return {
      device: fromAddressBar.device || "0",
      brand: fromAddressBar.brand || "0",
      model: fromAddressBar.model || "0",
      shop: shopId,
    };
  },

  submit(data) {
    return shopServicesListModule.actions.updateQuery(data);
  },
});

export const serviceFormModule = createFormModule({
  guid: "shop-selectedService",
  async init() {
    return {
      service: null,
      services: {},
    };
  },
});

export const shopServicesListModule = createListModule({
  guid: "shop-services",
  async fetchData(query = {}) {
    try {
      const data = await api.get(
        `${API_PATH.GETSHOPREPARATIONDETAILS}/`,
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
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});

export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices", () => filtersFormModule.state.values.shop],
  async fetchData([_1, _2, shopId]) {
    const data = await api.get(`${API_PATH.GETSHOPDEVICES}/`, { shop: shopId });
    return data.map(({ device }) => device);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands", () => filtersFormModule.state.values.shop],
  async fetchData([_1, _2, shop, deviceId]) {
    const data = await api.get(`${API_PATH.GETDEVICEBRANDS}/?`, {
      device: deviceId,
      shop,
    });
    return data.map(({ brand }) => brand);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: [
    "shops",
    "models",
    () => filtersFormModule.state.values.shop,
    () => filtersFormModule.state.values.device,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId]) {
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
    });
    return data.map(({ model }) => model);
  },
});
