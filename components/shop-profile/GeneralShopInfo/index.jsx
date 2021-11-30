import { MaxConstraints } from "@/components/styled/layout";
import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";


const MainWrap = styled.div`
  background-color: #f3f3f3;
`;

const RowWrap = styled.div`
  width: 100%;
  padding: 40px 0px;
`;

const Header = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 14px;
  color: #404040;
  margin-bottom: 24px;
`;

const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #404040;
`;

export default function GeneralShopInfo({ shopGeneralInfo }) {
    return (
        <MainWrap>
            <MaxConstraints>
                <RowWrap>
                    <Row>
                        {shopGeneralInfo?.content?.map((info) => (
                            <Col span={12}>
                                <Header>{info?.header}</Header>
                                <Text>{info?.content}</Text>
                            </Col>
                        ))}
                    </Row>
                </RowWrap>
            </MaxConstraints>
        </MainWrap>
    );
}
