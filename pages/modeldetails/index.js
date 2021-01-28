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
import { Rate } from "antd";
import "../../components/global/StarRatingInfo/StarRatingInfo.less";

export default function index() {
  const [modelImages, setmodelImages] = useState([
    "https://cdn-0.idownloadblog.com/wp-content/uploads/2019/09/iPhone-11-Pro-Max-Midnight-Green-Mockup-with-AR72014-iDownloadBlog-scaled.jpeg",
    "https://www.iphonehacks.com/wp-content/uploads/2019/10/iphone-11-pro-max-teardown.jpg",
    "https://misterminit.co/wp-content/uploads/2016/10/iphone-screen-repair-sydney.jpg",
    "https://i.pinimg.com/originals/8b/e4/c6/8be4c66bd3d94434e888de089226ad7f.jpg",
    "https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FD8mu7GAVkdYxbaGbmbHyJA--%7EB%2FaD05NzI7dz0xNjAwO2FwcGlkPXl0YWNoeW9u%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Ff9cd12e8a31e295524b7ef4755ed488b%2F205342770%2FRTX27FN4-ed.jpg&client=amp-blogside-v2&signature=d4f55c01c8007e4f3d7dd48e8a7c1d7ff43a6fa3",
    "https://www.restorecomputerrepair.com/images/services_images/iphone_repair_baltimore.jpg",
  ]);

  const [currentImage, setcurrentImage] = useState(modelImages[0]);

  const [issueData, setissueData] = useState([
    {
      image:
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK25dsCxZd1lZU0g2XfUTnfJR4UaflhG5_gw&usqp=CAU",
        "https://image.flaticon.com/icons/png/512/68/68736.png",
      title: "Damaged Screen",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/21/768/png-transparent-battery-charger-computer-icons-random-icons-electronics-logo-mobile-phones.png",
      title: "Battery Drain Issues",
    },
    {
      image:
        "https://icons-for-free.com/iconfiles/png/512/cellular+low+signal+icon-1320184993950493075.png",
      title: "Weak Signal Reception",
    },
    {
      image: "https://p7.hiclipart.com/preview/657/91/737/5bc0036b954d9.jpg",
      title: "Inaccurate GPS Location",
    },
    {
      image:
        "https://www.pngfind.com/pngs/m/265-2656711_svg-png-icon-radio-transmitter-icon-png-transparent.png",
      title: "Connectivity Issues",
    },
  ]);

  let settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
    verticalArrows: true,
    swipeToSlide: true,
    currentSlide: 0,
    arrows: false,
  };

  const onselectImage = (image) => {
    // console.log("🚀 => onselectImage => image", image);

    setcurrentImage(image);
  };

  return (
    <Layout>
      <Main>
        <Head>
          <title>MrAgain-Model Details</title>
          <meta name="Keywords" content="Blogs, Mr-Again" />
          <meta name="description" content="MrAgain ModelDetails" />
          <script
            src="https://kit.fontawesome.com/6cdc6e8865.js"
            crossorigin="anonymous"
          ></script>
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
        </Head>

        <div className="row ">
          {/* <div className="col-md-1" /> */}
          <div className="col-md-12 col-xs-12  pt-3 ">
            <div className="row px-5 mt-sm-5 mt-md-2">
              <div className=" col-lg-1 col-md-2 col-xs-3 col-sm-3 ">
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
                      className="w-100 slider-image"
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
              <div className="col-lg-6 col-md-5 col-xs-5 col-sm-9 image-preview ">
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
              <div className="col-md-5  col-xs-4 pl-5 ">
                <div className="model-details">
                  <p className="brand py-0 my-1 ">SAMSUNG</p>
                  <h3 className="pb-0 mb-0">iphone 11 Pro</h3>
                  <div className="star-rate-info py-0 y-0">
                    <Rate value={parseInt(4)} className="star-rate" />
                  </div>
                  <p className="mt-3">
                    <img
                      src="https://banner2.cleanpng.com/20180802/vgh/-5b738fa79d1605.37427684153430007164344456.jpg"
                      style={{ width: "20px", marginRight: "5px" }}
                    />
                    Released 2020, August 21
                  </p>
                </div>
                <hr />
                <div className="text-justify">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose injected humour
                  and the like.
                </div>
              </div>
            </div>
          </div>
          <div className="w-100  mb-5 mx-5">
            {/* <hr /> */}
            <h4 className="list-title">TOP 5 COMMON ISSUES </h4>
            <div className="top-5-content">
              <div className="row mx-2 px-5">
                {issueData.length > 0
                  ? issueData.map((issue, i) => (
                      <div className="list-details  d-inline">
                        {/* <span className=""> */}
                        {/* <FontAwesomeIcon
                icon={faBolt}
                className="text-success "
              ></FontAwesomeIcon> */}
                        <img src={issue.image} alt="" className="list-image " />
                        <span>{issue.title}</span>
                        {/* </span> */}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </Layout>
  );
}
