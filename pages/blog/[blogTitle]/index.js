import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { Layout } from "components/global";
import { FRONT_END_URL } from "../../../constants";
import "../blog.css";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { getPageDetails } from "@/service/search/operations";
import { connect } from "react-redux";
import { useEffect } from "react";
import dateFormat from "dateformat";

const BlogTitle = (routerprops) => {
  const { getPageDetails, pageDetails } = routerprops;

  const router = useRouter();

  const blogTitle = router.query.blogTitle;

  useEffect(() => {
    getPageDetails(blogTitle);
  }, []);

  const blog = pageDetails[0];

  // if (blog !== undefined) {
  //   console.log(
  //     dateFormat(blog.created_on, "dddd, dS mmmm, yyyy, h:MM TT").toUpperCase()
  //   );
  // }
  return (
    <Layout>
      <Main>
        <div className="blog-content">
          <Head>
            <title>{blog !== undefined && blog.title}</title>
            <meta name="Keywords" content="Blogs, Mr-Again" />
            <meta name="description" content={blog !== undefined && blog.seo_description} />
            <link rel="canonical" href={FRONT_END_URL + "/blog/" + blogTitle} />
            {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
            <meta property="og:type" content="website" />
            <meta property="og_title" content={blog.title} />
            <meta property="og:description" content={blog.seo_description} />
            <meta property="og:url" content={FRONT_END_URL + "/blog/" + blogTitle} />
            <meta property="og:image" content={blog.post_image} />
            <meta property="og:site_name" content={blog.title} />
          </Head>
          <div className="row">
            <div className="col-md-2 col-xs-2"></div>
            <div className="col-md-8 col-xs-8">
              <div className="blog-title">
                {blog !== undefined && blog.title}
              </div>
              <div className="date-content">
                {dateFormat(
                  blog !== undefined && blog.created_on.toUpperCase(),
                  "mmmm dS, yyyy, h:MM TT"
                )}
              </div>
              <img
                className="blog-image"
                src={blog !== undefined && blog.post_image}
                alt=""
              />
              <div className="my-3">
                {parse(blog !== undefined ? blog.content : "")}
              </div>
            </div>
            <div className="col-md-2 col-xs-2"></div>
          </div>
        </div>
      </Main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  pageDetails: state.search.pageDetails,
});
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getPages: (data) => {
      getPages(data, dispatch);
    },
    getPageDetails: (data) => {
      getPageDetails(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogTitle);
