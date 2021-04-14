import { createFormModule } from "@/modules/forms";
import { notification } from "antd";
import { connect } from "react-redux";
import { registerUser } from "service/account/operations.js";
import * as yup from "yup";

const validator = yup.object({
    companyName: yup.string().required(),
    chamber: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

function ValidateEmail(mail) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(mail)) {
    return true;
  }
  return false;
}

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
    if (!data.terms) {
      notification.warning({
        message: 'Bevestig de algemene voorwaarden!',
      });
      return;
    }

    if(ValidateEmail(data.email) ===  false) {
      notification.warning({
        message: 'Heb je een geldig emailadres gebruikt?',
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      notification.warning({
        message: 'Je wachtwoorden moeten hetzelfde zijn!',
      });
      return;
    }

    const user = {
      name: data.companyName,
      email: data.email,
      password: data.password,
      country: "The Netherlands",
      address: "",
      street: "",
      zipcode: "",
      city: "",
      phonumber: 0,
      kvk: data.chamber,
      btw: "",
      iban: "",
      status_app_email: 1,
      allow_appointment: 1,
      site_url: "",
      about_us: "",
      bg_photo: "",
      logo_photo: "",
      distance: 0,
      geo_lat: 0,
      geo_long: 0,
      ptype: 0,
    }
    registerUser(user);
  },
});
