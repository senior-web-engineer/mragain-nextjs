import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";
import router from "next/router";

//

export const appointmentForm = createFormModule({
  async init(shop) {
    const fromAddressBar = router.router.query;
    return {
      shop: shop.id,
      ...fromAddressBar,
      location: "in-store",
      date: (new Date()).toString(),
      time: "4:20",
    };
  },
});

export const deviceFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "device",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
  ],
  async fetchData([_1, _2, shopId, deviceId]) {
    const data = await api.get(`${API_PATH.GETSHOPDEVICES}/`, { shop: shopId });

    return data
      .map(({ device }) => device)
      .find((device) => `${device.id}` === deviceId);
  },
});

export const brandFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "brand",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId]) {
    const data = await api.get(`${API_PATH.GETDEVICEBRANDS}/?`, {
      device: deviceId,
      shop,
    });

    return data
      .map(({ brand }) => brand)
      .find((brand) => `${brand.id}` === brandId);
  },
});

export const modelFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "model",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
    () => appointmentForm.state?.values.model,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId, modelId]) {
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
    });
    return data.map(({ model }) => model).find((model) => `${model.id}` === modelId);;
  },
});

export const serviceFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "service",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
    () => appointmentForm.state?.values.model,
    () => appointmentForm.state?.values.service,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId, modelId, serviceId]) {
    const data = await api.get(`${API_PATH.GETSHOPREPARATIONDETAILS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
      model: modelId
    });
    return data.find(service => `${service.id}` === serviceId);
  },
});

export const openTimeFetcher = dataFetcher({
  selectors: ["appoitment", "open-time", () => appointmentForm.state.values.shop],
  async fetchData([_1, _2, shop]) {
    const response = await api.get(`${API_PATH.GETVALIDOPENTIME}/${shop}/`);
    try {
      return JSON.parse(response?.[0]?.valid_day_time || "");
    } catch(err) {
      return null;
    }
  },
})


export const invalidTimeFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "invalid-time",
    () => appointmentForm.state?.values.shop,
  ],
  async fetchData([_1, _2, shop]) {
    const data = await api.get(`${API_PATH.GETINVALIDOPENTIME}/${shop}/`);
    return JSON.parse(data?.[0]?.invalid_day_time || "[]");
  },
});
