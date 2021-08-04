import { DownOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, message, Row, Tree, Upload } from "antd";
import React, { useEffect, useState } from "react";
import {
  createImportReparationAndGuaranteeCSV,
  getExportReparationAndGuaranteeCSV,
} from "service/account/operations";

import { Text } from "@/components/common/Text/Text";

import {
  MenuWrap,
  ModelWrapper,
  NoItemsSelected,
  RowActionsWrapper,
  RowModelsWrapper,
  RowWrapper,
  TransferWrapper,
} from "./styles";

export const ModelTransfer = ({
  shopId,
  targetKeys,
  onChange,
  menuItems,
  data,
  onBrandSelected,
  selectedBrand,
  onEditModelReparations,
  onModelsSaved,
}) => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [selectedBrandTitle, setSelectedBrandTitle] = useState("");
  const [selectedBrandImage, setSelectedBrandImage] = useState("");
  const [selectedDevice, setSelectedDevice] = useState();
  const [exportBtnLoading, setExportBtnLoading] = useState(false);
  const [importBtnLoading, setImportBtnLoading] = useState(false);

  const onSelect = (selectedKeys, event) => {
    setSelectedBrandTitle(event.selectedNodes[0].props.title);
    setSelectedBrandImage(event.selectedNodes[0].props.image);
    onBrandSelected(event.selectedNodes[0].props.id);
    setSelectedDevice(selectedKeys[0].split("-")[0]);
    setSelected([selectedKeys[0].split("-")[0], selectedKeys[0]]);
  };

  const onSave = () => {
    onModelsSaved(selectedDevice);
    setEditing(false);
  };

  useEffect(() => {
    if (selectedBrand) {
      console.log(selectedBrand);
      setSelected([selectedBrand.key.split("-")[0], selectedBrand.key]);
      setSelectedBrandTitle(selectedBrand.key.split("-")[1]);
      onBrandSelected(selectedBrand.id);
      setSelectedDevice(selectedBrand.key.split("-")[0]);
    }
  }, [selectedBrand, menuItems]);

  const uploadCSV = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        setImportBtnLoading(true);

        let formData = new FormData();

        formData.append("device_id", selected[0]);
        formData.append("shop_id", shopId);
        formData.append("csv_file", info.fileList[0].originFileObj);

        message.info(`${info.file.name} is uploading`);
        createImportReparationAndGuaranteeCSV(formData).then(() => {
          setImportBtnLoading(false);
          message.success(`${info.file.name} file uploaded successfully`);
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onExportCsv = async () => {
    setExportBtnLoading(true);

    getExportReparationAndGuaranteeCSV({
      deviceId: selected[0],
      shopId: shopId,
    })
      .then((result) => {
        const a = document.createElement("a");
        const blob = new Blob([result.data], { type: "octet/stream" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "MrAgain_reparatiebeheer.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        setExportBtnLoading(false);
      })
      .catch((err) => {
        setExportBtnLoading(false);
        alert(
          "Er is een fout opgetreden bij het exporteren, probeer het later nog eens."
        );
      });
  };

  return (
    <RowWrapper>
      <Col xxl={{ span: 4 }} lg={{ span: 6 }}>
        <MenuWrap>
          <Tree
            showIcon
            showLine={false}
            switcherIcon={<DownOutlined />}
            selectedKeys={selected}
            onSelect={onSelect}
            blockNode
            treeData={menuItems}
          />
        </MenuWrap>
      </Col>
      <Col xxl={{ span: 20 }} lg={{ span: 18 }}>
        <TransferWrapper>
          <RowActionsWrapper type="flex" justify="space-between">
            <Col>
              <Text.Headline weight="normal">
                {selectedBrandTitle}
                {selectedBrandImage}
              </Text.Headline>
            </Col>
            <Col>
              <Row type="flex" gutter={[16, 16]}>
                <Col>
                  <Input
                    size="large"
                    value={search}
                    placeholder="Search model"
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </Col>
                <Col>
                  <a
                    href="/MrAgain_Instructies_Model_en_Reparatie_beheer-2020.pdf"
                    target="_blank"
                    download
                  >
                    <Button size="large" type="dashed">
                      Download Instructies
                    </Button>
                  </a>
                </Col>
                <Col>
                  <Upload {...uploadCSV}>
                    <Button size="large" loading={importBtnLoading}>
                      Import
                    </Button>
                  </Upload>
                </Col>
                <Col>
                  <Button
                    loading={exportBtnLoading}
                    size="large"
                    onClick={onExportCsv}
                  >
                    Export
                  </Button>
                </Col>
                <Col>
                  {editing ? (
                    <Button size="large" type="primary" onClick={onSave}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </RowActionsWrapper>
          <RowModelsWrapper type="flex" gutter={[16, 16]}>
            {data
              .filter((item) =>
                item.model.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .filter((item) =>
                !editing ? targetKeys.includes(item.key) : true
              ).length === 0 ? (
              <NoItemsSelected>
                <Text.Headline>
                  You don't have Models selected yet!
                </Text.Headline>
              </NoItemsSelected>
            ) : (
              data
                .filter((item) =>
                  item.model.toLowerCase().includes(search.toLocaleLowerCase())
                )
                .filter((item) =>
                  !editing ? targetKeys.includes(item.key) : true
                )
                .map((item) => {
                  return (
                    <Col xxl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 24 }}>
                      <ModelWrapper>
                        <Text.Body style={{ margin: 0 }} size="12">
                          {item.model}
                        </Text.Body>
                        {editing ? (
                          <Checkbox
                            defaultChecked={targetKeys.includes(item.key)}
                            onChange={() => onChange(item.key)}
                          />
                        ) : (
                          <Button
                            onClick={() =>
                              onEditModelReparations(selectedDevice, item)
                            }
                          >
                            <EditOutlined />
                          </Button>
                        )}
                      </ModelWrapper>
                    </Col>
                  );
                })
            )}
          </RowModelsWrapper>
        </TransferWrapper>
      </Col>
    </RowWrapper>
  );
};
