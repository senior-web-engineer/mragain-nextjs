import * as yup from "yup";

import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";

const resetPasswordValidator = yup.object({
  password: yup.string().required().min(8),
  confirmpassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const resetPasswordModule = createFormModule({
  validator: resetPasswordValidator,
  async init(data) {
    return {
      password: "",
      confirmpassword: "",
      uid: data.uid,
      token: data.token
    };
  },
  async submit(data) {
    return api.put(`${API_PATH.RESETPASSWORDCONFIRMEMAIL}/`, {
      new_password1: data.password,
      new_password2: data.confirmpassword,
      uid: data.uid,
      token: data.token
    }).catch((err) => {
      return { error:err };
    })
  },
});
