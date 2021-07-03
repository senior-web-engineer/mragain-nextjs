import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api, { privateApi } from "@/utils/api";
import { notification } from "antd";
import { createFormModule } from "@/modules/forms";
import { createModalModule } from "@/modules/modal";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const reparationsList = createListModule({
  guid: "shop-reprations",
  async fetchData(query = {}) {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;

    try {
      const data = await privateApi.get(
        `${API_PATH.GETAPPOINTMENTS}/${shopId}/`,
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
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;
    const data = await privateApi.get(`${API_PATH.GETAPPOINTMENTS}/${shopId}/`);
    return data.map(({ item }) => item);
  },
});

export const appointmentForm = createFormModule({
  guid: "createAppointment",
  async init(appointmentData) {
    return {
      customerName: appointmentData?.customerName || "",
      email: appointmentData?.email || "",
      contactNumber: appointmentData?.contactNumber || "",
      device: appointmentData?.device || "",
      brand: appointmentData?.brand || "",
      model: appointmentData?.model || "",
      reparation: appointmentData?.reparation || "",
      date: appointmentData?.date || "",
      time: appointmentData?.time || "",
      duration: appointmentData?.duration || "60minutes",
      price: appointmentData?.price || "0",
      guarantee: appointmentData?.guarantee || "0",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.id;
    const promise = privateApi.post(
      `${API_PATH.UPDATEAPPOINTMENT}/${data.id}`,
      {
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
      }
    );

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "Appointment created successfull",
    });

    return promise;
  },
});

export const createAppointmentFormModal = createModalModule();
