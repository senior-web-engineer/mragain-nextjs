import { notification } from "antd";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { createListModule } from "@/modules/list";
import { createModalModule } from "@/modules/modal";
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

export const appointmentForm = createFormModule({
  guid: "createAppointment",
  async init() {
    return {
      customerName: "",
      email: "",
      contactNumber: "",
      device: "",
      brand: "",
      model: "",
      reparation: "",
      date: "",
      time: "",
      duration: "60minutes",
      price: "0",
      guarantee: "0",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const promise = privateApi.post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}/`, {
      appointmentData: {
        active: true,
        client_email: data.email,
        client_name: data.customerName,
        cient_phone: data.contactNumber,
        reparation: data.reparation,
        shop,
        date: data.date,
        time: data.time,
      },
      repairSeviceData: {
        device: data.device,
        brand: data.brand,
        model: data.model,
        reparation: data.reparation,
        status: "-1",
        price: data.price,
        guarantee: data.guarantee,
      },
    });

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "Appointment created successfull",
    });

    return promise;
  },
});

export const devicesFetcher = dataFetcher({
  selectors: ["dashboard", "devices"],
  async fetchData() {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await api.get(`${API_PATH.GETSHOPDEVICES}/`, { shop });
    return data.map(({ device }) => device);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["dashboard", "brands"],
  async fetchData([_1, _2, device]) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await api.get(`${API_PATH.GETDEVICEBRANDS}/?`, {
      device,
      shop,
    });
    return data.map(({ brand }) => brand);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: ["dashboard", "brands", () => appointmentForm.state.values.device],
  async fetchData([_1, _2, device, brand]) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device,
      shop,
      brand,
    });
    return data.map(({ model }) => model);
  },
});

export const serviceFetcher = keyedDataFetcher({
  selectors: [
    "dashboard",
    "services",
    () => appointmentForm.state.values.device,
  ],
  fetchData([_1, _2, device, model]) {
    return api.get(`${API_PATH.GETREPARATIONS}/`, { device, model });
  },
});

export const createAppointmentFormModal = createModalModule();
