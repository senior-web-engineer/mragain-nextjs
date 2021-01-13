import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { Layout } from "components/global";
import { API_PATH, FRONT_END_URL } from "../../../constants";
import "../blog.css";
import parse from "html-react-parser";
import dateFormat from "dateformat";
import { useEffect } from "react";

export default function BlogTitle({ blogDetails, blogTitle }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let blog = null;
  if (blogDetails !== undefined) {
    blog = blogDetails[0];
    // console.log("🚀 => BlogTitle => blog", blog);
  }

  return (
    <Layout>
      <Main>
        {blog !== null && (
          <div className="blog-content">
            <Head>
              <title>{blog.title}</title>
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
              <meta property="og:image" content={blog.post_image} />
              <meta property="og:site_name" content="MrAgain" />
            </Head>
            <div className="row">
              <div className="col-md-2 col-xs-2"></div>
              <div className="col-md-8 col-xs-8">
                <div className="blog-title">{blog.title}</div>
                <div className="date-content">
                  {dateFormat(
                    blog.created_on.toUpperCase(),
                    "mmmm dS, yyyy, h:MM TT"
                  )}
                </div>
                <img
                  className="blog-image"
                  src={blog.post_image}
                  alt={
                    blog.post_image_alt_text !== null
                      ? blog.post_image_alt_text
                      : "blog image"
                  }
                />
                <div className="my-3">
                  {parse(blog !== null ? blog.content : "")}
                </div>
              </div>
              <div className="col-md-2 col-xs-2"></div>
            </div>
          </div>
        )}
      </Main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
  const blogs = await res.json();
  // console.log("🚀 => getStaticPaths => blogs", blogs);

  const paths = blogs.map((blog) => `/blog/${blog.slug}`);
  // console.log("🚀 => getStaticPaths => paths", paths);
  return { paths, fallback: true };
}
export async function getStaticProps({ query, params }) {
  const { blogTitle } = query || params;

  const res = await fetch(API_PATH.GETPAGEDETAILS + "/?slug=" + blogTitle);
  const blogDetails = await res.json();

  return {
    props: {
      blogDetails,
      blogTitle,
    },
  };
}
