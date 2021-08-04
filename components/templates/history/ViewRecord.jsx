import { Badge, Descriptions, Divider } from "antd";
import moment from "moment";
import Image from "next/image";
import React from "react";

import { Drawer } from "@/modules/modal";

export const ViewRecord = ({ data, viewRecordModal }) => {
  console.log(data);
  const getGuaranteeStatus = (date, guarantee) => {
    return moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))
      ? "error"
      : "processing";
  };

  return (
    <Drawer width="800px" module={viewRecordModal}>
      {data && (
        <div>
          <Descriptions title="Afspraak gegevens" bordered>
            <Descriptions.Item label="Type" span={3}>
              {data?.device.device_name}
            </Descriptions.Item>
            <Descriptions.Item label="Merk" span={3}>
              {data?.brand.brand_name}
            </Descriptions.Item>
            <Descriptions.Item label="Model" span={3}>
              {data?.model.model_name}
            </Descriptions.Item>
            <Descriptions.Item label="Reparatie" span={3}>
              {data?.reparation.reparation_name}
            </Descriptions.Item>
            <Descriptions.Item label="Datum" span={3}>
              {data?.appointment.date}
            </Descriptions.Item>
            <Descriptions.Item label="Prijs" span={3}>
              {data?.price}
            </Descriptions.Item>
            <Descriptions.Item label="Garantie" span={3}>
              <Badge
                status={getGuaranteeStatus(
                  data?.appointment.date,
                  data?.guarantee
                )}
                text={data?.guarantee}
              />
            </Descriptions.Item>
          </Descriptions>
          <Divider />

          <Descriptions title="Reparatie data" bordered>
            <Descriptions.Item label="IMEI nummer" span={3}>
              {data?.serialnumber}
            </Descriptions.Item>
            <Descriptions.Item label="Notities" span={3}>
              {data?.reparation.comments}
            </Descriptions.Item>
            <Descriptions.Item label="Fotos" span={3}>
              <img src={data?.images}></img>
            </Descriptions.Item>
          </Descriptions>
          <Divider />

          <Descriptions title="Klant gegevens" bordered>
            <Descriptions.Item label="Naam" span={3}>
              {data?.appointment.client_name}
            </Descriptions.Item>
            <Descriptions.Item label="Emailadres" span={3}>
              {data?.appointment.client_email}
            </Descriptions.Item>
            <Descriptions.Item label="Telefoon nummer" span={3}>
              {data?.appointment.client_phone}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
};
