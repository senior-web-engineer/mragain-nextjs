import Image from "next/image";
import React from "react";
import styled from "styled-components";

import Computers from "@/assets/icons/computer.svg";
import Earphones from "@/assets/icons/computer.svg";
import Tablets from "@/assets/icons/headphones.svg";
import Wearables from "@/assets/icons/headphones.svg";
import Laundry from "@/assets/icons/headphones.svg";
import GamingConsoles from "@/assets/icons/headphones.svg";
import SoundSystems from "@/assets/icons/headphones.svg";
import Amex from "@/assets/icons/Method-Amex.svg";
// PAYMENT METHODS
import Mastercard from "@/assets/icons/Method-Mastercard.svg";
import PayPal from "@/assets/icons/Method-PayPal.svg";
import Stripe from "@/assets/icons/Method-Stripe.svg";
import Visa from "@/assets/icons/Method-Visa.svg";
import MobilePhone from "@/assets/icons/mobile-phone.svg";

const PaymentImageWrapper = styled.span`
  margin-right: 10px;
`;

export const additionalInfoOptions = {
  devices: [
    {
      id: 1,
      icon: MobilePhone,
      device_name: "Mobile Phones",
      description: "smartphones, feature phones",
    },
    {
      id: 2,
      icon: Tablets,
      device_name: "Tablets",
      description: "tablet phones, graphic tablet",
    },
    {
      id: 3,
      icon: Wearables,
      device_name: "Wearables",
      description: "smartwatch, fitness tracker",
    },
    {
      id: 4,
      icon: Laundry,
      device_name: "Laundry",
      description: "washing machine, dryer",
    },
    {
      id: 5,
      icon: GamingConsoles,
      device_name: "Gaming Consoles",
      description: "home, portable consoles",
    },
    {
      id: 6,
      icon: Computers,
      device_name: "Computers",
      description: "desktop, laptop, macbook",
    },
    {
      id: 7,
      icon: SoundSystems,
      device_name: "Sound Systems",
      description: "speakers, microphones",
    },
    {
      id: 8,
      icon: Earphones,
      device_name: "Earphones",
      description: "earphones, earbuds, headsets",
    },
  ],
  paymentMethods: [
    {
      value: "1",
      id: "cash",
      label: "Cash",
    },
    {
      value: "2",
      id: "pin",
      label: "PIN",
    },
    {
      value: "3",
      id: "creditcard",
      label: "CreditCard",
    },
    {
      value: "4",
      id: "klarna/afterpay",
      label: "Klarna/Afterpay",
    },
  ],
};

export const paymentMethods = (method) => {
  let image;
  switch (method.trim().toLocaleLowerCase()) {
    case "cash":
      return (
        <PaymentImageWrapper>
          <Image width="34" height="24" src={Mastercard} />
        </PaymentImageWrapper>
      );
    case "pin":
      return (
        <PaymentImageWrapper>
          <Image width="34" height="24" src={PayPal} />
        </PaymentImageWrapper>
      );
    case "stripe":
      return (
        <PaymentImageWrapper>
          <Image width="34" height="24" src={Stripe} />
        </PaymentImageWrapper>
      );
    case "visa":
      return (
        <PaymentImageWrapper>
          <Image width="34" height="24" src={Visa} />
        </PaymentImageWrapper>
      );
    case "amex":
      return (
        <PaymentImageWrapper>
          <Image width="34" height="24" src={Amex} />
        </PaymentImageWrapper>
      );
  }
};

export const repeatingList = [
  {
    value: 0,
    label: "Every Year",
    color: "green",
  },
  {
    value: 1,
    label: "Every Month",
    color: "blue",
  },
  {
    value: 2,
    label: "Every Week",
    color: "red",
  },
];
