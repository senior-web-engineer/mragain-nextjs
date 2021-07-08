import React, { useEffect, useState } from "react";

import { currentUser } from "@/service/repair-management/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Tabs, Row, Col, Button } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import { ModelTransfer } from "@/components/templates/repair-management/ModelTransfer";
import { EditModal } from "@/components/templates/repair-management/EditModal";
import {
  editRepairModelModal,
  getRepairBrandModel,
  getShopReparations,
  getRepairDevices,
  getAllModels,
  saveSelectedModels,
  saveModelReparations,
} from "@/service/repair-management/modules";
import { find, uniqBy, filter } from "lodash";

export default function RepairManagementPage({ auth_user }) {
  const router = useRouter();
  const { shopId } = router.query;
  const [targetKeys, setTargetKeys] = useState([]);
  const [devices, setDevices] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const [shopReparations, setShopReparations] = useState([]);

  const [activeTab, setActiveTab] = useState("device-manager");

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      const fetchedDevices = await getRepairDevices.fetch();
      const allModels = await getAllModels.fetch();
      const firstModel = {
        id: allModels[0].brand.id,
        key: `${fetchedDevices[0].id}-${allModels[0].brand.brand_name}`,
      };
      setSelectedBrand(firstModel);
      const currentModels = await getRepairBrandModel.fetch();
      setDevices(
        fetchedDevices.map((device) => ({
          title: device.device_name,
          key: device.id,
          id: device.id,
          selectable: false,
          children: uniqBy(
            allModels
              .filter((model) => model.brand.device_id === device.id)
              .map((model) => ({
                key: `${device.id}-${model.brand.brand_name}`,
                title: model.brand.brand_name,
                id: model.brand.id,
              })),
            "key"
          ),
        }))
      );

      const selectedModels = currentModels.map((model) =>
        model.model_id.toString()
      );
      const mappedModels = allModels.map((model) => ({
        model: model.model_name,
        key: model.id.toString(),
        id: model.id,
        brand_id: model.brand_id,
        model_id: model.id,
      }));
      setModels(mappedModels.filter((model) => model !== undefined));
      setTargetKeys(selectedModels);
      setSelectedModels(filter(models, ["brand_id", firstModel.id]));

      // const reparationModels = await getShopReparations.fetch();
      // setShopReparations(
      //   reparationModels.map((reparationModel) => ({
      //     ...reparationModel,
      //     key: reparationModel.id.toString(),
      //   }))
      // );
    }

    loadData();
  }, []);

  const handleOnBrandSelected = async (brandId) => {
    setSelectedModels(filter(models, ["brand_id", brandId]));
  };

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const onChange = (key) => {
    if (targetKeys.includes(key)) {
      const newTargetKeys = [...targetKeys];
      newTargetKeys.splice(newTargetKeys.indexOf(key), 1);
      setTargetKeys(newTargetKeys);
    } else {
      setTargetKeys([...targetKeys, key]);
    }
  };

  const onEditModelReparations = async () => {
    setShopReparations(await saveModelReparations.actions.initialize());
    editRepairModelModal.actions.open();
  };

  const handleOnModelsSaved = (selectedDevice) => {
    const savingData = [
      {
        brand_id: selectedBrand.id,
        models: selectedModels
          .filter((item) => targetKeys.includes(item.key))
          .map((item) => item.id),
      },
    ];
    const payload = {
      brand: savingData,
      device_id: selectedDevice,
    };
    console.log(payload);
    saveSelectedModels.fetch(payload);
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <h1>Repair Management</h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
        <TabPane tab="Device Manager" key="device-manager">
          <ModelTransfer
            data={selectedModels}
            targetKeys={targetKeys}
            onChange={onChange}
            menuItems={devices}
            onBrandSelected={handleOnBrandSelected}
            selectedBrand={selectedBrand}
            onEditModelReparations={onEditModelReparations}
            onModelsSaved={handleOnModelsSaved}
          />
        </TabPane>
        <TabPane tab="Rules" key="rules"></TabPane>
        <TabPane tab="Miscellaneous" key="miscellaneous"></TabPane>
      </Tabs>
      <EditModal
        editRepairModelModal={editRepairModelModal}
        data={shopReparations}
        saveModelReparations={saveModelReparations}
      />
    </DefaultLayout>
  );
}
