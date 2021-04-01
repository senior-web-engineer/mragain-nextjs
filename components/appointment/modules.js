import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { createModalModule } from "@/modules/modal";
import api from "@/utils/api";
import moment from "moment";
import router from "next/router";
import * as yup from "yup";

//

export const appointmentConfirmation = createModalModule()

// NOTE: when adding address validation
// use the when method (https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema)
const validator = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  tel: yup.string().required(),
})

export const appointmentForm = createFormModule({
  validator,
  async init(shop) {
    const fromAddressBar = router.router.query;
    const address = [shop.street || "", shop.city || ""]
    .filter(Boolean)
    .join(", ");
    return {
      shop: shop.id,
      shopAddress: address,
      shopName: shop.name,
      ...fromAddressBar,
      location: "in-store",
      paymentType: "cash",
      date: new Date().toString(),
      time: "",
      name: "",
      email: "",
      tel: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    };
  },

  async submit(data) {
    const service = serviceFetcher.selector(store.ref.getState()).result;
    const formatedDate = moment(data.date).format("MM-DD-YYYY");
    const payload = {
      name: data.shopName,
      address: data.shopAddress,
      datetime: `${formatedDate} - ${data.time}`,
      appointmentData: {
        date: formatedDate,
        time: data.time,
        reparation: parseInt(service.reparation.id),
        client_name: data.name,
        client_email: data.email,
        client_phone: data.tel,
        shop: data.shop,
        active: true,
      },
      repairSeviceData: {
        device: parseInt(data.device),
        brand: parseInt(data.brand),
        model: parseInt(data.model),
        status: -1,
        price: service.price,
        guarantee: service.guarantee_time,
        reparation: parseInt(service.reparation.id),
      },
    };

    const promise = api.post(`${API_PATH.CREATEAPPOINTMENT}/`, payload);
    return promise;
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
    return data
      .map(({ model }) => model)
      .find((model) => `${model.id}` === modelId);
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
      model: modelId,
    });
    return data.find((service) => `${service.id}` === serviceId);
  },
});

export const openTimeFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "open-time",
    () => appointmentForm.state.values.shop,
  ],
  async fetchData([_1, _2, shop]) {
    const response = await api.get(`${API_PATH.GETVALIDOPENTIME}/${shop}/`);
    try {
      return JSON.parse(response?.[0]?.valid_day_time || "");
    } catch (err) {
      return null;
    }
  },
});

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
