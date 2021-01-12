import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { Layout } from "components/global";
import Head from "next/head";
import { API_PATH, FRONT_END_URL, GETPAGES } from "../../constants.js";
import "./blog.css";
import { getPages } from "@/service/search/operations.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dateFormat from "dateformat";

export default function Blog({ blogs }) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("🚀 => Blog => blogs", blogs);

  const getBlogDetails = (blog) => {
    console.log("🚀 => Blog => blogs", blogs);
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
            <meta name="og_title" property="og:title" content="Onze blogs" />
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
            <div className="blog-list-title w-100">Onze blogs</div>

            {blogs.length > 0
              ? blogs.map((blog) => (
                  <div className="col-md-3 col-xs-12">
                    <div className="card shadow" style={{ width: "290px" }}>
                      <img
                        className="card-img-top w-100"
                        src={blog.post_image_thumb}
                        alt="Card image"
                      />
                      <div className="card-body">
                        <h4 className="card-title text-left">{blog.title}</h4>
                        <div className="w-100">
                          <div className="date-content text-left d-inline ">
                            {dateFormat(
                              blog.created_on.toUpperCase(),
                              "mmmm dS, yyyy"
                            )}
                          </div>
                          <span className=" float-right ">
                            <a
                              className="read-more"
                              onClick={() => getBlogDetails(blog)}
                            >
                              Read more...{" "}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
  const blogs = await res.json();
  // console.log("🚀 => getStaticProps => blogs", blogs);

  return {
    props: {
      blogs,
    },
  };
}