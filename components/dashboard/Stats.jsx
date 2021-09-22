import React from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { useFetcher } from "@/modules/dataFetcher";

import { SubTitle } from "../styled/text";
import { appointmentStats } from "./modules";

const Wrap = styled.div`
  width: 56%;
  background-color: #fff;
  border-radius: 10px;

  ${SubTitle} {
    border-bottom: 1px solid #ddd;
    line-height: 43px;
    padding: 0 24px;
  }
`;

const Divider = styled.div`
  border: 1px solid #f3f3f3;
  margin: 0 16px;
  height: 64px;
`;

const StatsNumbers = styled.div`
  display: flex;
  padding: 30px 40px;

  count {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: #404040;
    display: block;
  }

  label {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    color: #909090;
  }
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
        <div>
          <count>{data.today}</count>
          <label>Today's Appointments</label>
        </div>
        <Divider />
        <div>
          <count>{data.new}</count>
          <label>New Appointments</label>
        </div>
        <Divider />
        <div>
          <count>{data.upcoming}</count>
          <label>Upcoming Appointments</label>
        </div>
        <Divider />
        <div>
          <count>{data.completed}</count>
          <label>Completed Appointments</label>
        </div>
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
