import { notification } from "antd";
import { uniqueId } from "lodash";
import moment from "moment";

import { store } from "@/configureStore";
import { API_PATH, BACK_END_URL } from "@/constants";
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

async function fetchReparations(query = {}) {
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
}

export const reparationsList = createListModule({
  guid: "shop-reprations",
  async fetchData(query = {}) {
    return fetchReparations(query);
  },
});

export const appointmentForm = createFormModule({
  guid: "createAppointment",
  async init() {
    const data = createAppointmentFormModal.selectors.data;
    if (data?.id) {
      const reparations = reparationsList.selectors.getItems(
        store.ref.getState()
      );
      const reparation = reparations.find((r) => r.id === data.id);
      if (reparation) {
        return {
          customerName: reparation.appointment.client_name,
          email: reparation.appointment.client_email,
          contactNumber: reparation.appointment.client_phone,
          device: reparation.device.id,
          model: reparation.model.id,
          brand: reparation.brand.id,
          reparation: reparation.reparation.id,
          date: moment(reparation.appointment.date),
          time: moment(reparation.appointment.time, "HH:mm:ss"),
          price: reparation.price,
          id: reparation.id,
          guarantee_time: reparation.guarantee,
          comments: reparation.comments,
          appointmentId: reparation.appointment.id,
          images: JSON.parse(reparation.images).map((url) => ({
            url: url.startsWith("/") ? BACK_END_URL + url : url,
            uid: uniqueId(),
          })),
        };
      }
    }
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
      guarantee_time: "0",
    };
  },
  async submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;

    let promise = null;

    if (data?.id) {
      promise = privateApi.post(`${API_PATH.SAVESHOPREPARATION}`, {
        repaData: {
          device: data.device,
          brand: data.brand,
          model: data.model,
          shop,
          reparation: data.reparation,
          price: data.price,
          guarantee_time: parseInt(data.guarantee_time),
        },
      });
      promise = Promise.all([
        promise,
        api.put(`${API_PATH.UPDATEAPPOINTMENT}/${data.id}/`, {
          device: data.device,
          brand: data.brand,
          model: data.model,
          reparation: data.reparation,
          images: JSON.stringify(
            (data.images || []).map(
              (file) =>
                file.url?.replace(BACK_END_URL, "") || file?.response?.file
            )
          ),
          comments: data.comments,
        }),
      ]);
    } else {
      promise = privateApi.post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}/`, {
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
          guarantee_time: data.guarantee_time,
          guarantee: data.guarantee_time,
        },
      });
    }

    await promise;

    promise.then(async () => {
      const { items } = await fetchReparations();
      reparationsList.actions.refreshItems({ 0: items });
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
