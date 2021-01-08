import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { Layout } from "components/global";
import Head from "next/head";
import { FRONT_END_URL } from "../../constants.js";
import "./blog.css";
import parse from "html-react-parser";
import { getPages } from "@/service/search/operations.js";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Blog = (routerprops) => {
  const { getPages, listOfPages } = routerprops;
  const router = useRouter();

  useEffect(() => {
    getPages("b");
  }, []);

  const getBlogDetails = (blog) => {
    console.log("🚀 => getBlogDetails => blog", blog);
    router.push(`/blog/${blog.slug}`);
  };

  return (
    <Layout>
      <Main>
        <div className="blog-list">
          <Head>
            <title>MrAgain-Blogs</title>
            <meta name="Keywords" content="Blogs, Mr-Again" />
            <meta name="description" content="MrAgain Blogs" />
            <link rel="canonical" href={FRONT_END_URL + "/blog"} />
            {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
            <meta property="og:type" content="website" />
            <meta name="og_title" property="og:title" content="Blogs" />
            <meta
              property="og:description"
              content="Vind de beste reparateur bij jou in de buurt"
            />
            <meta name="og:url" content={FRONT_END_URL + "/blog"} />
            <meta property="og:image" content="" />
            <meta
              name="og_site_name"
              property="og:site_name"
              content="Mr Again"
            />
          </Head>
          <div className="row">
            <div className="col-md-1 col-xs-1" />
            <div className="col-md-10 col-xs-10">
              <div className="blog-list-title">Our blogs</div>
              {/* {parse(data)} */}
              <ol className="list-content">
                {listOfPages.length > 0
                  ? listOfPages.map((blog) => (
                      <li
                        className="list-title"
                        onClick={() => getBlogDetails(blog)}
                      >
                        {blog.title}
                      </li>
                    ))
                  : null}
              </ol>
            </div>
            <div className="col-md-1 col-xs-1" />
          </div>
        </div>
      </Main>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  listOfPages: state.search.listOfPages,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getPages: (data) => {
      getPages(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
