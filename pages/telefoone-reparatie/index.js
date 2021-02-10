import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { Layout } from "components/global";
// import { API_PATH, FRONT_END_URL } from "../../../constants";
import { useEffect } from "react";
import BrandsComponent from "../../components/models/BrandsComponent";
import "../general.css";
import { useRouter } from "next/router";
import { getAllBrandModels } from "@/service/search/operations.js";

export default function index({ brandModels, device }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Main>
        <Head>
          {/* <title>{blog.title}</title>
              <meta name="Keywords" content={blog.seo_keyword} />
              <meta name="description" content={blog.seo_description} />
              <link
                rel="canonical"
                href={`${FRONT_END_URL}/blog/${blogTitle}`}
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={blog.title} />
              <meta property="og:description" content={blog.seo_description} />
              <meta
                property="og:url"
                content={`${FRONT_END_URL}/blog/${blogTitle}`}
              />
              <meta property="og:image" content={blog.post_image} /> */}

          <meta property="og:site_name" content="MrAgain" />
        </Head>
        <div className="container px-0">
          <div className="row">
            <BrandsComponent data={brandModels} deviceId={device.device} />
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const device = {
    device: 1,
  };
  const brandModels = await getAllBrandModels(device);
  return {
    props: {
      brandModels,
      device,
    },
  };
}
