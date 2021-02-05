import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { Layout } from "components/global";
// import { API_PATH, FRONT_END_URL } from "../../../constants";
import { useEffect } from "react";
import { getBrands } from "@/service/search/operations";
import { connect } from "react-redux";
import BrandsComponent from "../../components/models/BrandsComponent";
import "../general.css";
import { useRouter } from "next/router";

const index = (routerProps) => {
  const router = useRouter();
  const { getBrands, brandModels } = routerProps;
  useEffect(() => {
    window.scrollTo(0, 0);
    getBrands(deviceId);
  }, []);

  const deviceId = 7;

  const onModelSelect = (model) => {
    const modelName = model.model_name.replaceAll(" ", "-");
    router.push(`telefoone-reparatie/${modelName}`);
  };
  let data = brandModels;
  data = [];
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
        <div className="row ">
          <div className="col-md-12 mx-5 my-5 px-5">
            <BrandsComponent deviceId={deviceId} />

            {brandModels.length > 0 ? (
              brandModels.map((model, i) => (
                <ul className="model-list">
                  <li
                    className="model-name"
                    className
                    onClick={(e) => onModelSelect(model)}
                  >
                    {model.model_name}
                  </li>
                </ul>
              ))
            ) : (
              <div className="no-data-found">No data found</div>
            )}
          </div>
        </div>
      </Main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  deviceBrands: state.search.deviceBrands,
  brandModels: state.search.brandModels,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getBrands: (id) => {
      getBrands(id, dispatch);
    },
  };
};
/* eslint-enable */
export default connect(mapStateToProps, mapDispatchToProps)(index);
