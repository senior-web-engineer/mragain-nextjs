import React, {useEffect} from 'react';
import { Layout } from '../components/global';
import { RegisterSection } from '../components/land'
import { Main } from '@/styled-components/meld-je-aan-als-reparateur.style.jsx'
import './meld-je-aan-als-reparateur.style.less';

const Land = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <Layout>
            <Main>
                <RegisterSection />
            </Main>  
        </Layout>
    );
}

export default Land;
