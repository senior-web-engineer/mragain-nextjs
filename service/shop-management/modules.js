import { notification } from "antd";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { createListModule } from "@/modules/list";
import api, { privateApi } from "@/utils/api";

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
    return privateApi.get(`${API_PATH.GETACTIVEBRANDS}/`);
  },
});

export const getReparations = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETREPARATIONS}/`, {
      device: 2,
      model: 2,
    });
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

export const getShopNonWorkingDays = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await privateApi.get(`${API_PATH.GETINVALIDTIME}/${shopId}/`);
    return data;
  },
});

export const saveShopNonWorkingDays = (data) => {
  const shopId = currentUser.selector(store.ref.getState())?.result?.account_id;
  const promise = privateApi.post(
    `${API_PATH.SAVEINVALIDTIME}/${shopId}`,
    data
  );

  notification.success({
    message: "Saved successfully",
  });

  return promise;
};

export const shopManagementGeneralInfo = dataFetcher({
  selectors: [],
  async fetchData() {
    const id = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await privateApi.get(`${API_PATH.ACCOUNTSETTING}/${id}`);
    return data;
  },
});

export const getValidOpenTime = dataFetcher({
  selectors: [],
  async fetchData() {
    const id = currentUser.selector(store.ref.getState())?.result?.id;
    const data = await privateApi.get(`${API_PATH.GETVALIDOPENTIME}/${id}/`);
    return data;
  },
});

export const saveValidOpenTime = async (payload) => {
  const id = currentUser.selector(store.ref.getState())?.result?.id;
  const data = await privateApi.put(`${API_PATH.UPDATEVALIDOPENTIME}/${id}/`, {
    id: id,
    shop: id,
    valid_day_time: payload,
  });
  return data;
};

export const deleteNonRegularHours = async (id) => {
  const shopId = currentUser.selector(store.ref.getState())?.result?.id;
  const data = await privateApi.post(
    `${API_PATH.DELETEINVALIDTIME}/${shopId}/`,
    {
      id,
    }
  );
  return data;
};

export const shopManagementGeneralForm = createFormModule({
  guid: "saveGeneralInfo",
  async init() {
    const id = currentUser.selector(store.ref.getState())?.result?.id;
    const fetchedData = await privateApi.get(
      `${API_PATH.ACCOUNTSETTING}/${id}`
    );
    console.log("FD", fetchedData);
    return {
      about_us: fetchedData.about_us || "",
      phone_number: fetchedData.phone_number || "",
      site_url: fetchedData.site_url || "",
      street: fetchedData.street || "",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}/`, {
      about_us: data.about_us,
      phone_number: data.phone_number,
      site_url: data.site_url,
      street: data.street,
      shop,
    });

    createAppointmentFormModal.actions.close();
    notification.success({
      message: "Je wijzigingen zijn succesvol opgeslagen",
    });

    return promise;
  },
});

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
    console.log(data);
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
      // {
      //   payMethod: data.payMethod.join(",") || "",
      //   repairOption: "1,2",
      //   reparationOption: "1,2",
      //   services: data.services.join(",") || "",
      //   waitingArea: data.waitingArea || false,
      //   parkingArea: "1,2",
      //   insurance: 0,
      //   devices: data.devices || [],
      //   brands: data.brands || [],
      //   purchases: data.purchases || [],
      // }
      {
        payMethod: "1,2",
        repairOption: "1,2",
        services: "1,2",
        waitingArea: 0,
        parkingArea: "1,2,3",
        insurance: 0,
        devices: data.devices || [],
        // brands: data.brands.map((id) => +id) || [],
        brands: [1, 2, 3],
        purchases: [1, 2, 3],
      }
    );

    notification.success({
      message: "Additional info saved successfully",
    });

    return promise;
  },
});
