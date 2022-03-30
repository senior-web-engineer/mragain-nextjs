import "./index.less";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { PlusIcon } from "@/assets/icons/SvgIcons";
import CitySearch from "@/components/city/index.jsx";
import { searchForm } from "@/components/city/modules.js";
import DefaultLayout from "@/components/layouts/Homepage";
import { wrapper } from "@/configureStore";
import { API_URL, FRONT_END_URL } from "@/constants";
import api from "@/utils/api";

import LinearProgress from '@mui/material/LinearProgress'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from '@mui/material/Box';

export default function CityListPage({  }) {
//   const cityContent = cityInfo?.[0];
//   const router = useRouter();

//   let canonical = `${FRONT_END_URL}/${cityContent?.url}`;
  let description = `Ben je op zoek naar een telefoon reparateur`;
  let title = `Telefoon Reparatie | Mr Again`;
  let image_url = `${FRONT_END_URL}/media/telefoon-reparatie.jpg`;  
  let search_title = `Laat je telefoon maken`;
  let search_headline = `Telefoon reparatie Netherlands`;
  let text_headline = `Text headline`;
  let pageContent = [
      {content:`De beste reparateurs voor jouw device, die vind je bij MrAgain. Wij geloven dat de wereld net een beetje mooier wordt als we er voor kunnen zorgen dat de levensduur van jouw device verlengd wordt. Van waterschade, vervangen van je scherm of ingewikkelde moederbord reparaties, er is altijd een telefoon reparateur die je kan helpen met jouw telefoon reparatie.`},
      {content:`De beste reparateurs voor jouw device, die vind je bij MrAgain. Wij geloven dat de wereld net een beetje mooier wordt als we er voor kunnen zorgen dat de levensduur van jouw device verlengd wordt. Van waterschade, vervangen van je scherm of ingewikkelde moederbord.`}
    ];
  let cityList = [
    {header:`Cities with “A”`,content:[
        'Almere','Aant','Almere','Aant'
        ]},
    {header:`Cities with “B”`,content:[
        'Bmere','Bant', 'Bmere','Bant'
        ]},
    {header:`Cities with “C”`,content:[
        'Cmere','Cant','Cmere','Cant'
        ]},
    {header:`Cities with “D”`,content:[
        'Dmere','Dant','Dmere','Dant'
        ]}
    ]

  const renderBlocks = (block, index) => {
    return (
      <div className="block" key={index}>
        {/* <h4>{block?.header}</h4> */}
        <div dangerouslySetInnerHTML={{ __html: block?.content }}></div>
      </div>
    );
  };

  const renderBlocks2 = (block, index) => {
    return (
      <Grid item xs={12} sm={6} md={3} key={index} >
        <h4>{block?.header}</h4>
        <LinearProgress variant="determinate" value={10} className="sub-progress"/>
        <List className="list-wraper">
            {block?.content?.map((city, i) => {
                return [
                <ListItem key={i} >
                    <ListItemText
                        className="list-text"
                        primary={city}
                    />
                </ListItem>,
                <Divider className="list-div" />
                ]
            })}
        </List>
      </Grid>
    );
  };

//   useEffect(() => {
//     window.history.replaceState(
//       null,
//       "",
//       cityContent?.name?.replace(" ", "-")?.toLowerCase()
//     );
//   }, [router.asPath]);

  return (
    <DefaultLayout showSignup>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* <link rel="canonical" href={canonical} /> */}
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />

        <meta property="og:description" content={description} />
        {/* <meta name="og:url" property="og:url" content={canonical} /> */}
        <meta property="og:image" content={image_url} />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      <section className="search">
        <CitySearch
          title={search_title}
          headline={search_headline}
        />
      </section>
      <section className="categories">
        <div className="wrapper">
          <h6>Lees meer over</h6>
          <h2>{text_headline}</h2>
          <div className="blocks-wrapper">
            <div className="subheadline-blocks">
              {pageContent?.map((block, index) =>
                renderBlocks(block, index)
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper mt-7 ">
        <h2>List of cities</h2>
        <LinearProgress variant="determinate" value={10} className="main-progress"/>
        <Grid container spacing={5} className="mt-5">
            {cityList?.map((block, index) =>
                renderBlocks2(block, index)
              )}
        </Grid>
      </section>
      <section className="wrapper mt-7 d-flex justify-center">
        <Link href="#" underline="hover" className="link-primary">
         Load more/Explore
        </Link>
        <Box className="icon-wrapper">
            <ArrowForwardIosRoundedIcon fontSize="small" />
        </Box>
      </section>
      
    </DefaultLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  await searchForm.actions.initialize();
//   const { city } = ctx?.query;
//   const cityInfo = await api.get(
//     `${API_URL}/city-landing?name=${city?.replace("-", " ")}`
//   );

//   if (!cityInfo?.length) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/`,
//       },
//     };
//   }

//   return {
//     props: {
//       cityInfo,
//     },
//   };
});
