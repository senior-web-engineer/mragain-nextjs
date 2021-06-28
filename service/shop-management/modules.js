import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import api, { privateApi } from "@/utils/api";
import { createFormModule } from "@/modules/forms";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const getDevices = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETDEVICES}/`);
  },
});

export const shopInfoFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
      const shopName = currentUser.selector(store.ref.getState())?.result
          ?.name;
      const data = await privateApi.get(
          `${API_PATH.GETSHOPIDBYINFORMATION}/?shop_info=${shopName}`
      );
      return data;
  },
});

export const shopManagementGeneralForm = createFormModule({
  guid: "saveGeneralInfo",
  async init() {
    return {
      about: '',
      phone: '',
      website: '',
      address: '',
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}/`, {
      about: data.about,
      phone: data.phone,
      website: data.website,
      address: data.address,
      shop,
    });

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "General info saved successfully",
    });

    return promise;
  },
}); 

export const shopManagementAdditionalForm = createFormModule({
  guid: "saveAdditionalInfo",
  async init() {
    return {
      devices: [],
      cateredBrands: [],
      paymentMethods: [],
      locationOptions: {
        inStoreService: true,
        homeService: false,
        doorToDoorDelivery: false,
      },
      storePurchases: [],
      temporaryReplacement: true,
      waitingArea: false,
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}/`, {
      devices: data.devices,
      cateredBrands: data.cateredBrands,
      paymentMethods: data.paymentMethods,
      locationOptions: data.locationOptions,
      storePurchases: data.storePurchases,
      temporaryReplacement: data.temporaryReplacement,
      waitingArea: data.waitingArea,
      shop,
    });

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "Additional info saved successfully",
    });

    return promise;
  },
});