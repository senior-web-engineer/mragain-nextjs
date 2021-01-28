import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { Layout } from "components/global";
import Head from "next/head";
import { API_PATH, FRONT_END_URL } from "../../constants.js";
import { useEffect } from "react";
import Pagelist from "@/components/PageComponent/PageList.js";

export default function Blog({ blogs }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Main>
        <div className="blog-list">
          <Head>
            <title>Onze blogs - MrAgain</title>
            <meta name="Keywords" content="Blogs, Mr-Again" />
            <meta name="description" content="De blog van MrAgain" />
            <link rel="canonical" href={FRONT_END_URL + "/blog"} />
            <meta property="og:type" content="website" />
            <meta name="og_title" property="og:title" content"De blog van MrAgain" />
            <meta
              property="og:description"
              content="De blogs van MrAgain"
            />
            <meta name="og:url" content={FRONT_END_URL + "/blog"} />
            <meta property="og:image" content="/telefoon-reparatie-mragain.jpg" />
            <meta
              name="og_site_name"
              property="og:site_name"
              content="Mr Again"
            />
          </Head>
          <div className="row px-0">
            <div className="blog-list-title w-100 mt-4 ">Onze blogs</div>
            <Pagelist pages={blogs} />
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
