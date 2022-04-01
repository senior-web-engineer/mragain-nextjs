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

import { RightCircleFilled } from "@ant-design/icons";
import { Progress } from 'antd';
import { Row, Col } from 'antd';
import { List } from 'antd';
import { Button,Divider } from 'antd';
export default function CityListPage({ }) {
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
    { content: `De beste reparateurs voor jouw device, die vind je bij MrAgain. Wij geloven dat de wereld net een beetje mooier wordt als we er voor kunnen zorgen dat de levensduur van jouw device verlengd wordt. Van waterschade, vervangen van je scherm of ingewikkelde moederbord reparaties, er is altijd een telefoon reparateur die je kan helpen met jouw telefoon reparatie.` },
    { content: `De beste reparateurs voor jouw device, die vind je bij MrAgain. Wij geloven dat de wereld net een beetje mooier wordt als we er voor kunnen zorgen dat de levensduur van jouw device verlengd wordt. Van waterschade, vervangen van je scherm of ingewikkelde moederbord.` }
  ];
  let cityList = [
    {
      header: `Cities with “A”`, content: [
        'Almere', 'Aant', 'Almere', 'Aant', 'Almere', 'Aant', 'Almere', 'Aant'
      ]
    },
    {
      header: `Cities with “B”`, content: [
        'Bmere', 'Bant', 'Bmere', 'Bant', 'Bmere', 'Bant', 'Bmere', 'Bant'
      ]
    },
    {
      header: `Cities with “C”`, content: [
        'Cmere', 'Cant', 'Cmere', 'Cant', 'Cmere', 'Cant', 'Cmere', 'Cant'
      ]
    },
    {
      header: `Cities with “D”`, content: [
        'Dmere', 'Dant', 'Dmere', 'Dant', 'Dmere', 'Dant', 'Dmere', 'Dant'
      ]
    }
  ]
  let primaryColor = '#06c987';
  let secondaryColor = '#E0E0E0';

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
      <Col className="gutter-row mt-5" span={6} xs={24} sm={24} md={6} lg={6} key={index} >
        <h4>{block?.header}</h4>
        <Progress percent={10} showInfo={false} strokeColor={primaryColor} trailColor={secondaryColor} className="sub-progress" />

        <List
          className="mt-3"
          grid={{
            gutter: 16,
            xs: 4,
            sm: 4,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={block?.content}
          renderItem={item => (
            <List.Item>
              <span className="item-text">{item}</span>
              <Divider className="item-divider" />
            </List.Item>
          )}
        />
      </Col>
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
        <Progress percent={10} showInfo={false} strokeColor={primaryColor} trailColor={secondaryColor} className="main-progress" />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-5">
          {cityList?.map((block, index) =>
            renderBlocks2(block, index)
          )}
        </Row>
      </section>
      <section className="wrapper mt-7 item-center">
        <Button type="link" size="large">
          Load more/Explore
        </Button>
        <RightCircleFilled style={{ fontSize: '24px', width: '24px', height: '24px', color: '#06c987', cursor: 'pointer' }} />
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
