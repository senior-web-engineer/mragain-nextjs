import React from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";
import { FRONT_END_URL } from "@/constants";
import Head from "next/head";

let url = `${FRONT_END_URL}/devices`;

export default function Devices({ models }) {
  return (
    <DefaultLayout>
     <Head>
	<title>Alle apparaten voor elektronica reparatie | MrAgain </title>
	<meta name="description" content="Op zoek naar reparatie voor je telefoon, tablet of laptop? Vind snel je model en reparateurs die je kunnen helpen"/>
	<link rel="canonical" href={url} />
	{/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
	<meta property="og:type" content="website" />
	<meta name="og_title" property="og:title" content="Alle apparaten voor elektronica reparatie | MrAgain" />
	<meta property="og:description" content="Op zoek naar reparatie voor je telefoon, tablet of laptop? Vind snel je model en reparateurs die je kunnen helpen" />
	<meta name="og:url" content={url}/>
	<meta name="og_site_name" property="og:site_name" content="Mr Again" />
	<meta name="theme-color" content="#ffffff" />
     </Head>
      <MaxConstraints>
        <DeviceFinder models={models} />
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  const firstDevice = models?.[0]?.device_name;

  return {
    props: {
      models,
    },
  };
}
