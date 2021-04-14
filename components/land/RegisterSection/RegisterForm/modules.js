import { createFormModule } from "@/modules/forms";
import * as yup from "yup";

const validator = yup.object({
    companyName: yup.string().required(),
    // chamber: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

export const registerFormModule = createFormModule({
    validator,
    async init() {
      return {
        companyName: "",
        chamber: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      };
    },
  
    async submit(data) {
        console.log(data);
      return {
        companyName: "companyName",
        chamber: "chamber",
        email: "email@email.com",
        password: "password",
        confirmPassword: "password"
      }
    },
  });