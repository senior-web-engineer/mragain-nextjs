import { useFormContext } from "@/modules/forms";
import React from "react";
import styled from "styled-components";

//

// TODO: copied from BookingInfo
const ServiceDetails = styled.section`
  strong {
    font-size: 12px;
    color: #303030;
    font-weight: 500;
    margin-left: 4px;
  }

  label {
    margin: 0;
  }

  > div {
    display: flex;
  }
`;

const ServiceDetailsWrap = styled.div`
  display: flex;
  padding-bottom: 22px;
  border-bottom: 3px solid #fafafa;
  margin-bottom: 17px;
`;

const FIELDS = ["name", "email", "tel"];
const FIELDS_LABELS = {
  name: "Name",
  email: "Email",
  tel: "Contact number",
};

export default function UserInfo() {
  const { values } = useFormContext().state;

  const shouldRender = FIELDS.some((field) => values[field]);

  if (!shouldRender) {
    return null;
  }

  function renderField(name) {
    if (!values[name]) {
      return null;
    }

    return (
      <div>
        <label>{FIELDS_LABELS[name]}: </label>
        <strong>{values?.[name]}</strong>
      </div>
    );
  }

  return (
    <>
      <h5>Your details</h5>
      <ServiceDetailsWrap>
        <ServiceDetails>{FIELDS.map(renderField)}</ServiceDetails>
      </ServiceDetailsWrap>
    </>
  );
}
