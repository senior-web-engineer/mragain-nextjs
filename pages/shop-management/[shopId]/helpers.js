import React from "react";
import MobilePhone from "@/assets/icons/mobile-phone.svg";
import Tablets from "@/assets/icons/headphones.svg";
import Wearables from "@/assets/icons/headphones.svg";
import Laundry from "@/assets/icons/headphones.svg";
import GamingConsoles from "@/assets/icons/headphones.svg";
import Computers from "@/assets/icons/computer.svg";
import SoundSystems from "@/assets/icons/headphones.svg";
import Earphones from "@/assets/icons/computer.svg";

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
  brands: [
    {
      value: "asus",
      label: "Asus",
    },
    {
      value: "samsung",
      label: "Samsung",
    },
    {
      value: "xiaomi",
      label: "Xiaomi",
    },
    {
      value: "apple",
      label: "Apple",
    },
    {
      value: "sony",
      label: "Sony",
    },
  ],
};
