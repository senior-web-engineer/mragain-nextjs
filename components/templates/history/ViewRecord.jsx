import React from "react";
import { Descriptions, Badge, Divider } from "antd";
import { Drawer } from "@/modules/modal";
import Image from "next/image";
import moment from "moment";

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
          <Descriptions title="General Info" layout="vertical" bordered>
            <Descriptions.Item label="IMEI Number">
              {data?.serialnumber}
            </Descriptions.Item>
            <Descriptions.Item label="Guaranty">
              <Badge
                status={getGuaranteeStatus(
                  data?.appointment.date,
                  data?.guarantee
                )}
                text={data?.guarantee}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Reparation active">
              {data?.reparation.repair_active ? "YES" : "NO"}
            </Descriptions.Item>
            <Descriptions.Item label="Reparation Type">
              {data?.reparation.reparation_name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {data?.reparation.description}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Appointment Info" layout="vertical" bordered>
            <Descriptions.Item label="Client name">
              {data?.appointment.client_name}
            </Descriptions.Item>
            <Descriptions.Item label="Client email">
              {data?.appointment.client_email}
            </Descriptions.Item>
            <Descriptions.Item label="Client phone">
              {data?.appointment.client_phone}
            </Descriptions.Item>
            <Descriptions.Item label="Client Address">
              {data?.appointment.client_address}
            </Descriptions.Item>
            <Descriptions.Item label="Client Active">
              <Badge
                status={data?.appointment.active ? "success" : "error"}
                text={data?.appointment.active ? "YES" : "NO"}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Appointment Date">
              {data?.appointment.date}
            </Descriptions.Item>
            <Descriptions.Item label="Appointment Time">
              {data?.appointment.time}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Device Info" layout="vertical" bordered>
            <Descriptions.Item label="Type" span={3}>
              {data?.device.device_name}
            </Descriptions.Item>
            <Descriptions.Item label="Brand">
              {data?.brand.brand_name}
            </Descriptions.Item>
            <Descriptions.Item label="Model">
              {data?.model.model_name}
            </Descriptions.Item>
            <Descriptions.Item label="Memory">{data?.memory}</Descriptions.Item>
            <Descriptions.Item label="Model info" span={3}>
              {data?.model.model_info}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
};
