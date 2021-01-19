import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { Layout } from "components/global";
import { API_PATH, FRONT_END_URL } from "../../../constants";
import { useEffect } from "react";
import PageDetails from "@/components/PageComponent/PageDetails";

export default function BlogTitle({ blogDetails, blogTitle }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let blog = null;
  if (blogDetails !== undefined) {
    blog = blogDetails[0];
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
              <PageDetails pageDetails={blog} />
            </div>
          </div>
        )}
      </Main>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
//   const blogs = await res.json();

//   const paths = blogs.map((blog) => `/blog/${blog.slug}`);
//   return { paths, fallback: true };
// }
export async function getServerSideProps({ query, params }) {
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
