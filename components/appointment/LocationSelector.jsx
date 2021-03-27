import { faBox, faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import InlineSelector from "./InlineSelector";

//

const DEFAULT_OPTIONS = [
  {
    label: "In-store service",
    description: "Create an apointment to visit our store",
    icon: faStore,
    value: "in-store",
  },
  {
    label: "Home service",
    description: "Coming soon",
    icon: faHome,
    disabled: true,
    value: "home",
  },
  {
    label: "Delivery",
    description: "Coming soon",
    icon: faBox,
    disabled: true,
    value: "delivery",
  },
];

export default function LocationSelector(props) {
  return <InlineSelector options={DEFAULT_OPTIONS} {...props} />;
}
