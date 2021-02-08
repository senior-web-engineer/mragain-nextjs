// export const API_URL = "http://127.0.0.1:8000/api";
// export const API_URL = "https://mragainproduction.eu.pythonanywhere.com/api";
//export const API_URL = "https://mragain.eu.pythonanywhere.com/api";

// const isProduct = true;
// export const API_URL = isProduct
//   ? "https://mragainproduction.eu.pythonanywhere.com/api"
//   : "https://mragain.eu.pythonanywhere.com/api";

// export const BACK_END_URL = isProduct
//   ? "https://mragainproduction.eu.pythonanywhere.com"
//   : "https://mragain.eu.pythonanywhere.com"

// export const FRONT_END_URL = isProduct
//   ? "https://mragain.nl"
//   : "https://develop.mragain.nl";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
export const FRONT_END_URL = process.env.NEXT_PUBLIC_FRONT_END_URL;

console.log("API_URL", API_URL);
export const API_PATH = {
  SEARCH: `${API_URL}/searchshop`,
  CONTACTUS: `${API_URL}/contact-us`,
  GETFILTERFIELDS: `${API_URL}/getfilterfields`,
  GETFILTERFIELDEXT: `${API_URL}/getfilterfieldext`,
  REGISTERUSER: `${API_URL}/signup`,
  GETAUTHUSER: `${API_URL}/auth-user`,
  LOGIN: `${API_URL}/rest-auth/login`,
  LOGINASUSER: `${API_URL}/admin/login-as-user`,
  LOGOUT: `${API_URL}/logout`,
  OBTAINAUTHTOKEN: `${API_URL}/token`,
  ACCOUNTSETTING: `${API_URL}/account-settings`,
  UPDATEACCOUNT: `${API_URL}/auth-users`,
  UPDATEACCOUNTLOCATION: `${API_URL}/update-account-geolocation`,
  RESETPASSWORDCONFIRM: `${API_URL}/reset-password-confirm`,
  UPDATEACCOUNTPROFILE: `${API_URL}/update-account-profile`,
  UPDATEACCOUNTDETAIL: `${API_URL}/update-account-detail`,
  UPDATEVALIDOPENTIME: `${API_URL}/update-valid-open-time`,
  UPDATEINVALIDOPENTIME: `${API_URL}/update-invalid-open-time`,
  GETVALIDOPENTIME: `${API_URL}/get-valid-open-time`,
  GETINVALIDOPENTIME: `${API_URL}/get-invalid-open-time`,
  REPAIRDEVICES: `${API_URL}/repair-devices`,
  DELETEREPAIRDEVICE: `${API_URL}/delete-repair-device`,
  GETREVIEWS: `${API_URL}/get-reviews`,
  GETMODELSERVICE: `${API_URL}/get-model-service`,
  GETDEVICES: `${API_URL}/get-devices`,
  GETBRANDS: `${API_URL}/get-brands`,
  GETMODELS: `${API_URL}/get-models`,
  GETREPARATIONS: `${API_URL}/get-reparations`,
  GETAPPOINTMENTNUMBER: `${API_URL}/get_appointment_number`,
  GETAPPOINTMENTTIMETABLE: `${API_URL}/get_appointment_timetable`,
  CREATEAPPOINTMENT: `${API_URL}/create-appointment`,
  CREATESHOPREPAIRSERVICE: `${API_URL}/create-shop-repair-service`,
  REPAIRBRANDMODEL: `${API_URL}/repair-brand-model`,
  GETSHOPREPAIRATION: `${API_URL}/get-shop-reparation`,
  VERIFYACCOUNT: `${API_URL}/activate`,
  SHOPGUARANTEE: `${API_URL}/shop-guarantee-reparation`,
  GUARANTEEMODELS: `${API_URL}/shop-guarantee-reparation`,
  GETAPPOINTMENTS: `${API_URL}/get-appointments`,
  UPDATEAPPOINTMENT: `${API_URL}/update-appointment`,
  CANCELAPPOINTMENT: `${API_URL}/cancel-appointment`,
  FILTERREPARATION: `${API_URL}/filter-appointment`,
  REPAIRCOLSEAUTUEMAIL: `${API_URL}/repair-close-auto-email`,
  CHECKREVIEWPAGE: `${API_URL}/check-review-page`,
  CREATEREVIEW: `${API_URL}/create-review`,
  EVALUATERATE: `${API_URL}/evaluate-shop-rate`,
  GETNEWESTSHOPS: `${API_URL}/get-newest-shops`,
  UPLOADIMAGE: `${API_URL}/upload-image`,
  GETREPARATIONGUARANTEE: `${API_URL}/get-reparation-guarantee`,
  DELETEGUARANTEEMODELS: `${API_URL}/delete-guarantee-model`,
  RESETPASSWORDEMAIL: `${API_URL}/password/reset`,
  RESETPASSWORDCONFIRMEMAIL: `${API_URL}/password/reset-confirm`,
  GETSHOPIDBYINFORMATION: `${API_URL}/get-shopid-by`,
  EXPORTCSV: `${API_URL}/export-csv/`,
  IMPORTCSV: `${API_URL}/import-csv/`,
  GETSHOPPUBLISHPROFILE: `${API_URL}/get-shops-publish-profile/`,
  GETSHOPDEVICES: `${API_URL}/get-shop-devices`,
  GETDEVICEBRANDS: `${API_URL}/get-shop-brands`,
  GETBRANDMODELS: `${API_URL}/get-shop-models`,
  GETSHOPREPARATIONDETAILS: `${API_URL}/get-shop-reparations`,
  GETREPARATIONDETAILS: `${API_URL}/get-shop-reparation-detail`,
  SAVESHOPREPARATION: `${API_URL}/save-shop-reparation`,
  UPDATESHOPREPARATION: `${API_URL}/update-shop-reparation`,
  CREATEAPPOINTMENTMANUALLY: `${API_URL}/shop-create-appointment`,
  GETPAGES: `${API_URL}/get-pages`,
  GETPAGEDETAILS: `${API_URL}/pagedetail`,
  GETMODELDETAILS: `${API_URL}/get-model-detail`,
  GETMODELREPARATIONS: `${API_URL}/get-model-repairs/`,
};

export default {
  API_URL,
  API_PATH,
  FRONT_END_URL,
  BACK_END_URL,
};
