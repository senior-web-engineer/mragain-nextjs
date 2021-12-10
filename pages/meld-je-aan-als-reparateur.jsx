import "./meld-je-aan-als-reparateur.style.less";

import React, { useEffect } from "react";

import DefaultLayout from "@/components/layouts/Homepage";
import { RegisterSection } from '../components/land'
import { Main } from '@/styled-components/meld-je-aan-als-reparateur.style.jsx'
import './meld-je-aan-als-reparateur.style.less';

const Land = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

let canonical = '/meld-je-aan-als-reparateur';

  return (
    <DefaultLayout showSignup>
          <Head>
	          <meta name="viewport" content="width=device-width, initial-scale=1" />
	          <title>
	            Elektronica reparateur? Meld je aan bij MrAgain en word direct beter gevonden!
	          </title>
	          <meta
	            name="description"
	            content="Wil je als reparateur beter online gevonden worden? MrAgain is het platform voor elektronica reparateurs. Meld je aan en word direct beter gevonden!"
	          />
	          <link rel="canonical" href={FRONT_END_URL} + {canonical} />
	  </Head>
	  <Main>
        <RegisterSection />
      </Main>
    </DefaultLayout>
  );
};

export default Land;
