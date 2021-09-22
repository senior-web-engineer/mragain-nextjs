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

export const getBasicSettings = dataFetcher({
  selectors: [],
  fetchData() {
    return privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
  },
});

export const basicSettingsForm = createFormModule({
  guid: "saveGeneralInfo",
  async init(id) {
    const fetchedData = await privateApi.get(
      `${API_PATH.ACCOUNTSETTING}/${id}`
    );
    return {
      address: fetchedData.address || "",
      allow_appointment: fetchedData.allow_appointment || false,
      city: fetchedData.city || "",
      country: fetchedData.country || "",
      phone_number: fetchedData.phone_number || "",
      btw: fetchedData.btw || "",
      email: fetchedData.email || "",
      iban: fetchedData.iban || "",
      kvk: fetchedData.kvk || "",
      name: fetchedData.name || "",
      ptype: fetchedData.ptype || 0,
      shop_active: fetchedData.shop_active || false,
      shop_type: fetchedData.shop_type || [],
      site_url: fetchedData.site_url || "",
      status_app_email: fetchedData.status_app_email || false,
      street: fetchedData.street || "",
      zipcode: fetchedData.zipcode || "",
      intervals: fetchedData.intervals || 30,
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const auth = currentUser.selector(store.ref.getState())?.result?.id;
    const promise = privateApi.put(`${API_PATH.ACCOUNTSETTING}/${auth}/`, {
      address: data.address,
      allow_appointment: data.allow_appointment,
      city: data.city,
      country: data.country,
      phone_number: data.phone_number,
      btw: data.btw,
      email: data.email,
      geo_lat: data.geo_lat,
      geo_long: data.geo_long,
      iban: data.iban,
      kvk: data.kvk,
      name: data.name,
      ptype: data.ptype,
      shop_active: data.shop_active,
      shop_type: data.shop_type,
      site_url: data.site_url,
      status_app_email: data.status_app_email,
      street: data.street,
      zipcode: data.zipcode,
      intervals: data.intervals,
      ///// non existing form fields
      double_appointment: true,
      /////
      shop,
      auth,
    });

    notification.success({
      message: "General info saved successfully",
    });

    return promise;
  },
});

export const changePasswordForm = createFormModule({
  guid: "changePassword",
  async init() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const id = currentUser.selector(store.ref.getState())?.result?.id;
    const promise = privateApi.post(`${API_PATH.RESETPASSWORDCONFIRM}/${id}`, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      shop,
    });

    notification.success({
      message: "Password updated successfully",
    });

    return promise;
  },
});
