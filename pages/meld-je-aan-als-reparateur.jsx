import React, {useEffect} from 'react';
import { FindBannerSection } from '../components/land';
import { AdvantageSection } from '../components/land';
import { TestimonialSection, Layout } from '../components/global';
import { NewestShopsSection } from '../components/land';
import { Main } from '@/styled-components/meld-je-aan-als-reparateur.style.jsx'
import './meld-je-aan-als-reparateur.style.less';

const Land = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <Layout>
            <Main>
                <FindBannerSection />
                <AdvantageSection />
                <NewestShopsSection />
                <TestimonialSection />
            </Main>  
        </Layout>
    );
}

export default Land;
