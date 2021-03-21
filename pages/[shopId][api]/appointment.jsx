import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { appointmentForm, brandFetcher, deviceFetcher, modelFetcher, serviceFetcher } from "@/components/appointment/modules";
import { getShopProfileByInformationServer } from "@/service/account/operations";
import React, { useEffect } from "react";
import BookingInfo from "@/components/appointment/BookingInfo";
import styled from "styled-components";

const MainWrap = styled.div`
  padding-top: 1px;
`;

export default function AppointmentPage({ shop }) {
  useEffect(() => {
    async function loadData() {
      await appointmentForm.actions.initialize(shop);
      deviceFetcher.fetch()
      brandFetcher.fetch()
      modelFetcher.fetch()
      serviceFetcher.fetch()
    }

    loadData()
  });

  return (
    <DefaultLayout>
      <MainWrap>
        <MaxConstraints>
          <BookingInfo shop={shop} />
        </MaxConstraints>
      </MainWrap>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);
  return {
    props: {
      shop:
        shopProfileServerInfo && shopProfileServerInfo[0]
          ? shopProfileServerInfo[0]
          : shopProfileServerInfo,
    },
  };
}
