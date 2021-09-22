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
  return (
    <DefaultLayout showSignup>
      <Main>
        <RegisterSection />
      </Main>
    </DefaultLayout>
  );
};

export default Land;
