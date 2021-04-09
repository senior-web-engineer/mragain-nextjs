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
}))(
  (
    {
      /*modalData*/
    }
  ) => {
    const modalData = {
      form: {
        shop: 2,
        shopAddress: "Utrech",
        shopName: "Telefoon reparatie Utrecht",
        device: "1",
        brand: "1",
        model: "2",
        service: "10585",
        "shopId][api": "Telefoon reparatie Utrecht",
        location: "in-store",
        paymentType: "cash",
        date: "Mon Apr 12 2021 21:07:46 GMT+0300",
        time: "07:00",
        name: "1dasdas@dasdsa.com",
        email: "2dasdas@dasdsa.com",
        tel: "3dasdas@dasdsa.com",
        address: "",
        city: "",
        zip: "",
        state: "",
      },
      shop: {
        id: 2,
        name: "Telefoon reparatie Utrecht",
        street: "",
        zipcode: "3561LD",
        city: "Utrech",
        phone_number: null,
        site_url: "",
        bg_photo:
          "https://mragain.eu.pythonanywhere.com/media/home_newest_image1.jpg",
        logo_photo: "",
        about_us: "",
        intervals: null,
        double_appointment: null,
        mark: 0,
        geo_lat: 52.11346046499999,
        geo_long: 5.1213965,
      },
      service: {
        id: 10585,
        model_id: 2,
        brand_id: 1,
        price: 101,
        active: true,
        guarantee_time: 10,
        reparation_time: "10",
        reparation: {
          id: 1,
          reparation_name: "Scherm vervangen",
          repair_image:
            "https://mragain.eu.pythonanywhere.com/media/repair_images/Problems_-_Crack.png",
          is_deleted: false,
          device: 2,
        },
      },
      brand: {
        id: 1,
        brand_name: "Apple",
        is_deleted: false,
        device_id: 1,
        device: { id: 1, device_name: "Smartphones", is_deleted: false },
      },
      device: { id: 1, device_name: "Smartphones", is_deleted: false },
      model: {
        id: 2,
        model_name: "Iphone 11 Pro",
        model_serie_number: "0",
        model_year: "1980-01-01",
        model_photo:
          "['/media/iPhone-11-Pro-1.jpeg', '/media/iPhone-11-Pro-2.jpg', '/media/iPhone-11-Pro-3.jpg', '/media/iPhone-11-Pro-4.jpeg', '/media/iPhone-11-Pro-5.jpg', '/media/iPhone-11-Pro-6.jpg']",
        model_colours: "None",
        model_info:
          "sample text Iphone 11 Pro text text Iphone 11 Pro text text",
        is_deleted: false,
        brand: 1,
        repairs: [1, 2, 3, 15, 16, 18, 19, 20, 21, 22, 23, 24, 26, 28, 30, 32],
      },
    };
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
  }
);

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
