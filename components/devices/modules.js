import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import api from "@/utils/api";

export const modelFetcher = dataFetcher({
  selectors: ["models"],
  async fetchData(_, model) {
    const data = await api.get(`${API_PATH.GETMODELDETAILS}/?model=${model}`);

    return data[0];
  },
});

export const modelReparationsFetcher = dataFetcher({
  selectors: ["models", "reparations"],
  fetchData(_, model) {
    return api.post(`${API_PATH.GETMODELREPARATIONS}/`, { model });
  },
});
