import { Col, Row, Table, Tag } from "antd";
import styled from "styled-components";

export const rowStyle = {
  marginBottom: "24px",
};

export const ContactInfo = styled.div`
  display: flex;
  margin-top: 24px;

  span {
    display: flex;
    align-items: center;
    margin-right: 22px;
  }
`;

export const HeaderLargeText = styled.h3`
  font-size: 16px;
  line-height: 16px;
  margin: 0;
`;

export const HeaderSmallText = styled.p`
  display: block;
  font-size: 11px;
  line-height: 16px;
  color: #909090;
  margin: 0;
`;

export const HeaderText = styled.h1`
  margin: 0;
`;

export const AdvantagesWrap = styled.div`
  width: 100%;
  height: auto;
  font-size: 12px;
  color: #707070;
  font-weight: 400;
  margin-top: 10px;
  padding: 20px 25px 10px 25px;
  display: flex;
  justify-content: space-around;
  background: #efefef;

  h3 {
    font-size: 12px;
    color: #0d3244;
    font-weight: 500;
  }

  image-wrap {
    min-width: 31px;
    margin-right: 10px;
  }

  span {
    display: flex;
    width: calc(25% - 20px);
    margin-right: 20px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
`;

export const CoverWrapper = styled.div`
  width: 100%;
  height: 210px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;

  button {
    position: absolute;
    bottom: 38px;
    right: 24px;
  }
`;

export const ProfileWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  position: absolute;
  top: 170px;
  left: 3%;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 10;

  @media (max-width: 1300px) {
    left: 0 !important;
  }
`;

export const ProfileButtonWrapper = styled.div`
  button {
    position: absolute;
    width: 140px;
    top: 330px;
    left: 3%;
    z-index: 10;
  }

  @media (max-width: 1300px) {
    button {
      left: 0 !important;
    }
  }
`;

export const BoxWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  padding: ${(props) => (props.padding ? " 24px 32px" : "0")};
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const RowWrapper = styled(Row)`
  border-radius: 14px;
  overflow: hidden;
  display: flex;
`;

export const HoursEditor = styled.div`
  background: #fafafa;
  width: 100%;
  height: 100%;
  padding: 15px;

  input {
    font-size: 12px !important;
  }
`;

export const HoursEditorTitle = styled.div`
  width: 100%;
  padding: 38px 0 20px 0;
  margin: 0;
  letter-spacing: 0.05em;
  font-size: 12px;
  color: #909090;
`;

export const PaddingWrapper = styled.div`
  padding: 24px 32px;
`;

export const ScheduleListWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 14px;
`;

export const ListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 18px;

  .ant-col {
    padding: 0 !important;
  }

  p {
    margin: 0;
  }
`;

export const TableSection = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
`;

export const TableWrapper = styled(Table)`
  .ant-table {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
  }
  .ant-table-tbody {
    background: white;
  }
`;

export const TagWrapper = styled(Tag)`
  transform: scale(1.1);
`;

export const Action = styled.a`
  color: blue;
`;

export const ActionList = styled.a`
  color: gray;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;

  &:hover {
    color: white;
    background: ${(props) => props.color || "#ed5556"};
  }
`;

export const DateWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DateText = styled(HoursEditorTitle)`
  margin: 0;
  margin-right: 6px;
  width: 60px;
  padding: 0;
`;
