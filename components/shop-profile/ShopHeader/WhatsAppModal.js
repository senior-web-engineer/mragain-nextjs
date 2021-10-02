import React, { useCallback } from "react";
import { SubTitle } from "@/components/styled/text";
import Modal from "@/modules/modal";
import { WhatsappIcon } from "react-share";
import { whatsAppModal } from "../modules";
import styled from "styled-components";
import {TextButton} from "@/components/ui/Button";
import { useScreenSize } from "@/utils/media";
import { event } from "../../../lib/gtag"

const ButtonExtend = styled(TextButton)`
  height: 52px;
  padding: 0;
`;
const WhatsAppIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default function DetailsModal({ shop }) {
  const isMobile = useScreenSize().size === "mobile";
  const iconSIze = isMobile ? 35 : 52;
  const whatsAppMod = useCallback(() => {
    whatsAppModal.actions.open();
  });
  return (
    <>
      <ButtonExtend onClick={whatsAppMod} id="whatsAppButton">
          <WhatsappIcon size={iconSIze} round enableBackground={false} />
      </ButtonExtend>
      <Modal
        module={whatsAppModal}
        footer={null}
        title={<SubTitle as="h3">{shop.name}</SubTitle>}
      >
        <p>Komt zeer binnenkort, gebruik voor nu de "contact" button!</p>
      </Modal>
    </>
  );
}
