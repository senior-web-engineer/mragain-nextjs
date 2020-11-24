import React from "react";
import { Main } from "@/styled-components/how-werkt-het.style"
import HowSection from "@/components/how/HowSection/HowSection"
import HowBannerSection from "@/components/how/HowBannerSection/HowBannerSection"
import Head from "next/head"
import { FRONT_END_URL} from "../constants";
import { Layout } from "@/components/global"

const How = () => (
    <Layout>
        <Main>
            <Head>
            <title>Mr Again - Hoe werkt het?</title>
            <meta name="Keywords" content="Veel gestelde vragen, Mr Again, FAQ Mr Again, Telefoon reparaties, Telefoon reparateur, telefoonscherm, garantie, kwaliteit" />
            <meta
                name="description"
                content="Je vindt hier antwoorden op de veel gestelde vragen aan MrAgain, staat je vraag er niet bij, neem dan contact met ons op!"
            />
            <link
                rel="canonical"
                href={ FRONT_END_URL + '/veel-gestelde-vragen'}
            />
            {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
            <meta property="og:type" content="website" />
            <meta name="og_title" property="og:title" content="FAQ" />
            <meta
                property="og:description"
                content="Vind de beste reparateur bij jou in de buurt"
            />
            <meta
                name="og:url"
                content={ FRONT_END_URL }
            />
            <meta property="og:image" content="" />
            <meta name="og_site_name" property="og:site_name" content="Mr Again" />
            </Head>
            <HowBannerSection />
            <HowSection />
        </Main>
    </Layout>
);

export default How;
