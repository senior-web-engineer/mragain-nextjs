import React from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { useFetcher } from "@/modules/dataFetcher";
import media from "@/utils/media";

import { SubTitle } from "../styled/text";
import { appointmentStats } from "./modules";

const Wrap = styled.div`
  border-radius: 10px;

  ${SubTitle} {
    display: none;
    border-bottom: 1px solid #ddd;
    line-height: 43px;
    padding: 0 24px;
  }

  ${media.desktop`
    background-color: #fff;
    width: 56%;
    ${SubTitle} {
      display: block;
    }
  `}
`;

const Divider = styled.div`
  border: 1px solid #f3f3f3;
  margin: 0 16px;
  height: 64px;
  display: none;

  ${media.desktop`
    display: block;
  `}
`;

const StatsNumbers = styled.div`
  display: flex;
  margin: 0 -16px;
  max-width: 100%;

  stat {
    background: #ffffff;
    border-radius: 10px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 16px;
    width: 136px;
    height: 136px;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  count {
    font-style: normal;
    font-weight: 600;
    color: #404040;
    display: block;
    font-size: 18px;
    line-height: 24px;
  }

  label {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    color: #909090;
  }

  ${media.desktop`
    padding: 30px 40px;
    margin: 0;
    overflow-x: auto;

    stat {
      border-radius: 0;
      margin: 0;
      width: auto;
      height: auto;
      padding: 0;
      display: block;
    }

    count {
      font-size: 20px;
      line-height: 26px;
    }
  `}
`;

export default function Stats() {
  const { data, isLoading } = useFetcher({
    dataFetcher: appointmentStats,
  });

  function renderContent() {
    if (isLoading || !data) {
      return <Loader />;
    }

    return (
      <StatsNumbers>
        <stat>
          <count>{data.today}</count>
          <label>Today's Appointments</label>
        </stat>
        <Divider />
        <stat>
          <count>{data.new}</count>
          <label>New Appointments</label>
        </stat>
        <Divider />
        <stat>
          <count>{data.upcoming}</count>
          <label>Upcoming Appointments</label>
        </stat>
        <Divider />
        <stat>
          <count>{data.completed}</count>
          <label>Completed Appointments</label>
        </stat>
      </StatsNumbers>
    );
  }

  return (
    <Wrap>
      <SubTitle>Quick stats</SubTitle>
      {renderContent()}
    </Wrap>
  );
}
