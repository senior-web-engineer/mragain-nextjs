import Image from "next/image";
import React from "react";
import styled from "styled-components";

import GamingConsoles from "@/assets/icons/devices/console.png";
import Earphones from "@/assets/icons/devices/headset.png";
import SoundSystems from "@/assets/icons/devices/microphone.png";
import Computers from "@/assets/icons/devices/pc.png";
import MobilePhone from "@/assets/icons/devices/smartphone.png";
import Wearables from "@/assets/icons/devices/smartwatch.png";
import Tablets from "@/assets/icons/devices/tablet.png";
import TV from "@/assets/icons/devices/tv.png";
import Laundry from "@/assets/icons/devices/washingmachine.png";
// PAYMENT METHODS
import Amex from "@/assets/icons/Method-Amex.svg";
import Mastercard from "@/assets/icons/Method-Mastercard.svg";
import PayPal from "@/assets/icons/Method-PayPal.svg";
import Stripe from "@/assets/icons/Method-Stripe.svg";
import Visa from "@/assets/icons/Method-Visa.svg";

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
      icon: Earphones,
      device_name: "Headphones",
      description: "earphones, earbuds, headsets",
    },
    {
      id: 10,
      icon: Wearables,
      device_name: "Wearables",
      description: "smartwatch, fitness tracker",
    },
    {
      id: 9,
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
      icon: TV,
      device_name: "TV",
      description: "television, oled, smart TV",
    },
    {
      id: 9,
      icon: SoundSystems,
      device_name: "Sound Systems",
      description: "speakers, microphones",
    },
    {
      id: 8,
      icon: Laundry,
      device_name: "Laundry Machine",
      description: "washing machine, dryer",
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

export const repeatingList = [
  {
    value: 0,
    label: "Elk jaar",
    color: "green",
  },
  {
    value: 1,
    label: "Elke maand",
    color: "blue",
  },
  {
    value: 2,
    label: "Elke week",
    color: "red",
  },
];
