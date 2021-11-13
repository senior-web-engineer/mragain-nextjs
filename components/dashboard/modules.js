import { notification } from "antd";
import moment from "moment";

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

export const recentActivity = dataFetcher({
  selectors: [
    "dashboard-recent-activity",
    (state) => {
      return currentUser.selector(state)?.result?.id;
    },
  ],
  async fetchData([_, shopId]) {
    const data = await privateApi.get(
      `${API_PATH.GETALLNOTIFICATIONS}/${shopId}/`
    );
    return data.reverse();
  },
});

export const appointmentStats = dataFetcher({
  selectors: [
    "dashboard-appointment-stats",
    (state) => {
      return currentUser.selector(state)?.result?.id;
    },
  ],
  fetchData([_, shopId]) {
    return privateApi.get(`${API_PATH.GETDASHSTATS}/${shopId}/`);
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
        message:
          "Er gaat iets fout, neem contact met ons op als dit probleem zich blijft voordoen",
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
        appointment_type: 1,
        client_email: data.email,
        client_name: data.customerName,
        client_phone: data.contactNumber,
        reparation: data.reparation,
        shop,
        date: moment(data.date).format("YYYY-MM-DD"),
        time: moment(data.time).format("HH:mm"),
      },
      repairSeviceData: {
        device: data.device,
        brand: data.brand,
        model: data.model,
        reparation: data.reparation,
        status: -1,
        price: data.price,
        guarantee: data.guarantee_time,
      },
    });

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "Afspraak is succesvol aangemaakt!",
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
  async fetchData([_, __, device]) {
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
  async fetchData([_, __, device, brand]) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device,
      shop,
      brand,
    });
    return data.map(({ model }) => model);
  },
});

export const servicesFetcher = keyedDataFetcher({
  selectors: [
    "dashboard",
    "services",
    () => appointmentForm.state.values.device,
    () => appointmentForm.state.values.brand,
  ],
  fetchData([_1, _2, device, brand, model]) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    return api.get(`${API_PATH.GETSHOPREPARATIONDETAILS}/`, {
      device,
      model,
      brand,
      shop,
    });
  },
});

export const createAppointmentFormModal = createModalModule();
export const notificationsModal = createModalModule();
