import React from "react";
import { Layout } from "components/global";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { API_PATH, FRONT_END_URL } from "../../constants.js";
import { useState } from "react";
// import ReactImageMagnify from "react-image-magnify";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Slider from "react-slick";
import "./modelDetails.css";
export default function index() {
  const [modelImages, setmodelImages] = useState([
    "https://cdn-0.idownloadblog.com/wp-content/uploads/2019/09/iPhone-11-Pro-Max-Midnight-Green-Mockup-with-AR72014-iDownloadBlog-scaled.jpeg",
    "https://venturebeat.com/wp-content/uploads/2019/09/iphone11pro.jpg?fit=1958%2C1102&strip=all",
    "https://www.mysimplephones.com/skin/electronics_black/images/Apple_iPhone_11_Pro_description_2.jpg",
    "https://folio.ng/folio_upload/2019/10/iPhone-11-Pro.jpg",
    "https://lh3.googleusercontent.com/proxy/xm4GNE0FC97hI5GqDYLWhqOhWARO8KNqzimtGKgjg-3_22EOOUNY-XC9SJLA8snH3YDxLZiuGGw-3elvWGIteqDmg7wc9eqDN9BXBLmjUnSIhpTIRRizkO_NSZqejyWoBOy1Ew",
  ]);

  const [currentImage, setcurrentImage] = useState(modelImages[0]);
  const [currentSlideNo, setcurrentSlideNo] = useState(0);

  let settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    verticalArrows: true,
    swipeToSlide: true,
    currentSlide: 0,
    // arrows: false,
  };

  const onselectImage = (image) => {
    // console.log("🚀 => onselectImage => image", image);

    setcurrentImage(image);
  };
  const onSelectUpArrow = () => {
    setcurrentSlideNo(currentSlideNo - 1);
  };
  const onSelectDownArrow = () => {
    settings.currentSlide = currentSlideNo + 1;
    setcurrentSlideNo(currentSlideNo + 1);
  };
  console.log("🚀 => index => currentSlideNo", currentSlideNo);
  return (
    <Layout>
      <Main>
        <Head>
          <title>MrAgain-Blogs</title>
          <meta name="Keywords" content="Blogs, Mr-Again" />
          <meta name="description" content="MrAgain ModelDetails" />
          {/* <link rel="canonical" href={FRONT_END_URL + "/blog"} /> */}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Onze blogs" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          {/* <meta name="og:url" content={FRONT_END_URL + "/blog"} /> */}
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <script
            src="https://kit.fontawesome.com/6cdc6e8865.js"
            crossorigin="anonymous"
          ></script>
        </Head>

        <div className="row my-2">
          {/* <div className="col-md-1" /> */}
          <div className="col-md-12 col-xs-12 ">
            <div className="row px-5 mt-sm-5 mt-md-2">
              <div className="col-md-2 col-xs-2 col-sm-3 py-3 px-4 ">
                {/* <button
                  className="btn up-down-arrow btn-sm py-0 mb-1"
                  onClick={() => onSelectUpArrow()}
                >
                  <i class="fas fa-chevron-circle-up"></i>
                </button> */}
                <Slider {...settings}>
                  {modelImages.map((im) => (
                    //   <div
                    //     style={{
                    //       width: "100px",
                    //       height: "100px",
                    //       backgroundColor: "grey",
                    //       margin: "10px 0px 10px 0px",
                    //     }}
                    //   >
                    <img
                      src={im}
                      className="w-100"
                      onClick={() => onselectImage(im)}
                    />
                  ))}
                </Slider>
                {/* <button
                  className="btn up-down-arrow btn-sm py-0 mt-1"
                  onClick={() => onSelectDownArrow()}
                >
                  <i class="fas fa-chevron-circle-down"></i>
                </button> */}
              </div>
              <div className="col-md-5 col-xs-5 col-sm-9 pt-3">
                <SideBySideMagnifier
                  imageSrc={currentImage}
                  imageAlt="Example"
                  fillAvailableSpace="false"
                  alwaysInPlace="true"
                  fillGapLeft={10}
                  fillGapRight={20}
                  fillGapTop={120}
                  fillGapBottom={80}
                />
              </div>
              <div className="col-md-4 col-xs-4 ">
                <div className="model-details">
                  <p className="brand">SAMSUNG</p>
                  <h3>iphone 11 Pro</h3>
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </Main>
    </Layout>
  );
}
