import * as yup from "yup";

const requiredRule = yup.string().required.bind(yup.string());
yup.addMethod(
  yup.string,
  "required",
  function required(msg = () => "Required field") {
    return requiredRule(msg());
  }
);
