import React, { useEffect } from "react";
import Image from "next/image";
import { appointmentReview } from "./modules";
import { connect } from "react-redux";
import Modal from "@/modules/modal";
import styled from "styled-components";
import moment from "moment";

const ContentWrap = styled.div`
  text-align: center;
  h3 {
    font-size: 25px;
    color: #06c987;
    font-weight: 500;
    margin: 25px 0;
  }

  dl {
    width: 450px;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    margin: 50px auto 10px;
  }

  dt {
    width: 50%;
    color: #303030;
    font-weight: 500;
    margin-bottom: 10px;
  }

  dd {
    width: 50%;
    color: #707070;
    font-weight: 300;
  }

  hr {
    width: 100%;
  }
`;

const AppointmentReviewModalContent = connect(() => ({
  modalData: appointmentReview.selectors.data,
}))(({ modalData }) => {
  return (
    <ContentWrap>
      <Image
        loading="eager"
        width={201}
        height={200}
        src="/images/notifications/appointment.png"
      />
      <h3>Appointment set</h3>
      <dl>
        <dd>Shop</dd>
        <dt>
          {modalData.form.shopName} <br /> {modalData.form.shopAddress}
        </dt>
        <dd>Date & Time</dd>
        <dt>
          {modalData.form.time}{" "}
          {moment(modalData.form.date).format("dddd, DD MMMM YYYY")}
        </dt>
        <hr />
        <dd>Your details</dd>
        <dt>
          {modalData.form.name} <br />
          {modalData.form.email} <br />
          {modalData.form.tel}
        </dt>
        <hr />
        <dd>Device details</dd>
        <dt>
          {modalData.device.device_name} <br />
          {modalData.brand.brand_name} <br />
          {modalData.model.model_name}
        </dt>
        <hr />
        <dd>Services</dd>
        <dt>
          {modalData.service.reparation.reparation_name}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&euro;
          {modalData.service.price}
        </dt>
      </dl>
    </ContentWrap>
  );
});

export default function OrderReview() {
  useEffect(() => {
    appointmentReview.actions.open();
  }, []);
  return (
    <Modal module={appointmentReview} footer={null}>
      <AppointmentReviewModalContent />
    </Modal>
  );
}
