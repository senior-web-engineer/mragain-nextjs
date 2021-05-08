import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";
import * as yup from "yup";


const contactValidator = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    telephone: yup.number().required().positive().max(9),
    contents: yup.string()
  })
  
  export const contactFormModule = createFormModule({
    validator: contactValidator,
    async init() {
      return {
        name: "",
        email: "",
        telephone: "",
        contents: "",
      }
    },
  
    async submit(data) {
      const message = {
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        contents: data.contents
      };
      return api.post(`${API_PATH.CONTACTUS}/`, message)
    }
  });