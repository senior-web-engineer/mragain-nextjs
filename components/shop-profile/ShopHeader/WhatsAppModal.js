import React, { useCallback } from "react";
import { WhatsappIcon } from "react-share";
import styled from "styled-components";
import { TextButton } from "@/components/ui/Button";
import { useScreenSize } from "@/utils/media";
import Link from "next/link";

const ButtonExtend = styled(TextButton)`
  height: 52px;
  padding: 0;
`;

export default function DetailsModal({ number }) {
  const isMobile = useScreenSize().size === "mobile";
  const iconSIze = isMobile ? 35 : 52;
  return (
    <>
      <ButtonExtend id="whatsAppButton">
        <WhatsAppClick number={number}>
          <WhatsappIcon size={iconSIze} round enableBackground={false} />
        </WhatsAppClick>
      </ButtonExtend>
    </>
  );
}

const WhatsAppClick = ({ children, number }) => {
  if (typeof number !== "string") {
    number = number.toString();
  }

  const isMobile = useScreenSize().size === "mobile";

  // https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/?lang=en
  number =
    number.startsWith("00") || number.startsWith("+")
      ? number.slice(2)
      : number;

  function whatsappLink() {
    return (
      "https://" +
      (isMobile ? "api" : "web") +
      `.whatsapp.com/send/?phone=${number}`
    );
  }

  return (
    <>
      <Link href={whatsappLink()}>
        <a target="_blank">{children}</a>
      </Link>
    </>
  );
};
