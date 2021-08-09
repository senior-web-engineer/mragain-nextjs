import { notification } from "antd";
import React from "react";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import { useFetcher } from "@/modules/dataFetcher";

import { SubTitle } from "../styled/text";
import { recentActivity } from "./modules";

const Wrap = styled.div`
  width: 40%;
  background-color: #fff;
  border-radius: 10px;

  ${SubTitle} {
    border-bottom: 1px solid #ddd;
    line-height: 43px;
    padding: 0 24px;
  }
`;

const MessagesWrap = styled.div`
  padding: 5px 24px;
`;

const MessageWrap = styled.div`
  padding: 8px;

  strong {
    display: block;
  }
`;

const NTYPE_TO_TITLE = {
  "New appointment": "Translate me: new appointment in dutch",
};

export default function Notifications() {
  const { data, isLoading } = useFetcher({
    dataFetcher: recentActivity,
  });

  function renderNotification(notification) {
    return (
      <MessageWrap>
        <strong>{NTYPE_TO_TITLE[notification.n_type]}</strong>
        {notification.message}
      </MessageWrap>
    );
  }

  function renderContent() {
    if (isLoading) {
      return <Loader />;
    }

    return <MessagesWrap>{(data || []).map(renderNotification)}</MessagesWrap>;
  }

  return (
    <Wrap>
      <SubTitle>Recent activity</SubTitle>
      {renderContent()}
    </Wrap>
  );
}
