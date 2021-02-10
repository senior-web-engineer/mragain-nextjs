import React from "react";
import "./modelDetails.css";
import { Fragment } from "react";
import { useRouter } from "next/router";

export default function BrandsComponent({ data, deviceId }) {
  const router = useRouter();

  const onModelSelect = (model) => {
    const modelName = model.name.replaceAll(" ", "-");
    let path = "";

    if (deviceId === 1) {
      path = "telefoone-reparatie";
    } else if (deviceId === 2) {
      path = "tablet-reparatie";
    } else if (deviceId === 3) {
      path = "headphone-reparatie";
    } else if (deviceId === 7) {
      path = "tv-reparatie";
    } else if (deviceId === 8) {
      path = "laundry-machines-reparatie";
    } else if (deviceId === 9) {
      path = "consoles-reparatie";
    }
    router.push(`${path}/${modelName}`);
  };

  return (
    <Fragment>
      {data.length > 0 ? (
        data.map((model, i) => (
          <div className="col-md-3 py-3 ">
            <h5 className="brand-title">{model.name}</h5>
            <div className="brand-list">
              {model.model.length > 0 ? (
                model.model.map((m, i) => (
                  <div className="model-list" onClick={(e) => onModelSelect(m)}>
                    {m.name}
                  </div>
                ))
              ) : (
                <div className="model-list">No record found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-data-found">No record found</div>
      )}
    </Fragment>
  );
}
