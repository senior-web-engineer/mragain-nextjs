import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import api from "@/utils/api";
import { notification } from "antd";
import router from "next/router";
import { createFormModule } from "@/modules/forms";
import { createModalModule } from "@/modules/modal";
import querystring from "querystring";
import { store } from "@/configureStore";
export const filtersFormModule = createFormModule({
  guid: "shops",
  async init() {
    const fromAddressBar = router.router.query;

    return {
      location: fromAddressBar.zip || "",
      device: fromAddressBar.device || "0",
      brand: fromAddressBar.brand || "0",
      model: fromAddressBar.model || "0",
      service: fromAddressBar.service || "0",
      distance: fromAddressBar.distance || "5",
      guarantee: fromAddressBar.guarantee || "-1",
      price: fromAddressBar.price || "-1",
      sort: parseInt(fromAddressBar.sort) || 0,
      long: 0,
      lat: 0,
      limit: 100,
    };
  },

  submit(data) {
    return shopListModule.actions.updateQuery(data);
  },
});

export const shopListModule = createListModule({
  guid: "shops",
  async fetchData(query = {}) {
    const nextURL = `${router.pathname}?${querystring.stringify(query)}`;
    router.router.replace(nextURL, nextURL, { shallow: true });
    try {
      let data = await api.get(`${API_PATH.SEARCH}/`, {
        ...query,
        brand: parseInt(query.brand),
        service: parseInt(query.service),
        model: parseInt(query.model),
        phone: parseInt(query.device),
        reparation: parseInt(query.service),
        distance: parseInt(query.distance),
        price: parseInt(query.price),
        guarantee: parseInt(query.guarantee),
        sort: query.sort,
      });

      let shopDevices =  await api
          .post(`${API_PATH.SHOP_DEVICES}/`, {
            shops: data.map((item) => item.shop.id).join(","),
          });
      data = data.map(item=>{
        item.devices = [];
        for(let device of shopDevices){
          if(device.shop_id===item.shop.id){
            item.devices.push(device);
          }
        }
        return item;
      });



      console.log('shopDevices',shopDevices);
      console.log('data',data);

      api
        .post(`${API_PATH.NEXT_SLOTS}/`, {
          shops: data.map((item) => item.shop.id).join(","),
        })
        .then((slots) => {
          const items = shopListModule.state.items;
          const refreshed = Object.keys(items).reduce((accumulator, key) => {
            accumulator[key] = items[key].map(item => {
              const slot = slots.find(s => `${s.shop_id}` === `${item.shop.id}`)
              if (slot) {
                return {
                  ...item,
                  ...slot
                }
              }

              return item;
            });
            return accumulator;
          }, {});

          shopListModule.actions.refreshItems(refreshed)
        });

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
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});

export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices"],
  fetchData() {
    return api.get(`${API_PATH.GETDEVICES}/`);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands"],
  fetchData([_1, _2, deviceId]) {
    return api.get(`${API_PATH.GETBRANDS}/?device=${deviceId}`);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: ["shops", "models", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, deviceId, bandId]) {
    return api.get(`${API_PATH.GETMODELS}/?device=${deviceId}&brand=${bandId}`);
  },
});

export const serviceFetcher = keyedDataFetcher({
  selectors: ["shops", "services", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, device, model]) {
    return api.get(`${API_PATH.GETREPARATIONS}/`, { device, model });
  },
});

export const refineSearchModal = createModalModule();
