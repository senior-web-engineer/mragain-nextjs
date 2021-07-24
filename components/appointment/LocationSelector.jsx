import { faBox, faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import InlineSelector from "./InlineSelector";

//

const DEFAULT_OPTIONS = [
  {
    label: "Reparatie in de winkel",
    description: "Maak een afspraak en kom bij ons langs",
    icon: faStore,
    value: "in-store",
  },
  {
    label: "Reparatie op locatie",
    description: "Coming soon",
    icon: faHome,
    disabled: true,
    value: "home",
  },
  {
    label: "Opsturen",
    description: "Coming soon",
    icon: faBox,
    disabled: true,
    value: "delivery",
  },
];

export default function LocationSelector(props) {
  return <InlineSelector options={DEFAULT_OPTIONS} {...props} />;
}
