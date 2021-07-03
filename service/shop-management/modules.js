import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import api, { privateApi } from "@/utils/api";
import { createFormModule } from "@/modules/forms";
import { notification } from "antd";

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

export const getBrands = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETBRANDS}/?device=1`);
  },
});

export const shopInfoFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await privateApi.get(
      `${API_PATH.GETSHOPGENERALINFO}/${shopId}`
    );
    return data;
  },
});

export const shopManagementGeneralForm = createFormModule({
  guid: "saveGeneralInfo",
  async init() {
    return {
      about: "",
      phone: "",
      webSite: "",
      address: "",
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

// const test = {
//   payMethod: "1,2",
//   repairOption: "1,2",
//   services: "services text 1234",
//   waitingArea: 0,
//   parkingArea: "1,2,3",
//   insurance: 0,
//   devices: [1, 2, 3],
//   brands: [1, 2, 3],
//   purchases: [1, 2, 3],
// };

export const shopManagementAdditionalForm = createFormModule({
  guid: "saveAdditionalInfo",
  async init(shopId) {
    const shopInfoData = await privateApi.get(
      `${API_PATH.GETSHOPGENERALINFO}/${shopId}/`
    );
    return {
      devices: shopInfoData.devices || [],
      brands: shopInfoData.brands || [],
      payMethod: shopInfoData.payMethod || [],
      locationOptions: shopInfoData.locationOptions || {},
      storePurchases: shopInfoData.storePurchases || [],
      temporaryReplacement: shopInfoData.temporaryReplacement || false,
      waitingArea: shopInfoData.waitingArea || false,
      repairOption: shopInfoData.repairOption || [],
      services: shopInfoData.services || [],
      purchases: shopInfoData.purchases || [],
      parkingArea: shopInfoData.parkingArea || [],
      insurance: shopInfoData.insurance || [],
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.put(
      `${API_PATH.UPDATESHOPGENERALINFO}/${shop}/`,
      // {
      //   devices: data.devices,
      //   brands: data.brands,
      //   payMethod: data.payMethod,
      //   locationOptions: data.locationOptions,
      //   storePurchases: data.storePurchases,
      //   temporaryReplacement: data.temporaryReplacement,
      //   waitingArea: data.waitingArea,
      //   repairOption: data.repairOption,
      //   services: data.services,
      //   purchases: data.purchases,
      //   parkingArea: data.parkingArea,
      //   insurance: data.insurance,
      //   shop,
      // }
      {
        payMethod: data.payMethod || "",
        repairOption: data.repairOption || "",
        services: data.services || "",
        waitingArea: data.waitingArea || 0,
        parkingArea: data.parkingArea || "",
        insurance: data.insurance || 0,
        devices: data.devices || [],
        brands: data.brands || [],
        purchases: data.purchases || [],
      }
    );

    notification.success({
      message: "Additional info saved successfully",
    });

    return promise;
  },
});
