import React from "react";
import { useState } from "react";
// import ReactImageMagnify from "react-image-magnify";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Slider from "react-slick";
import "./modelDetails.css";
import { Rate } from "antd";
import "../../components/global/StarRatingInfo/StarRatingInfo.less";
import batteryIssue from "../../assets/icons/Problems - Battery.svg";
import crackIssue from "../../assets/icons/Problems - Crack.svg";
import signalIssue from "../../assets/icons/Problems - Signal.svg";
import locationIssue from "../../assets/icons/Problems - Location.svg";
import connectivityIssue from "../../assets/icons/Problems - Connectivity.svg";
import releasedDate from "../../assets/icons/Specifications - Date.svg";
import { useEffect } from "react";
import noPreview from "../../assets/images/no-preview-available.png";
import { FRONT_END_URL } from "@/constants.js";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ModelDetails(routerProps) {
  const { modelDetails, reparations } = routerProps;
  const router = useRouter();

  const [modelImages, setmodelImages] = useState(reparations);
  const [currentImage, setcurrentImage] = useState("");
  const model = modelDetails[0];

  useEffect(() => {
    const images = model.model_photo;
    if (images === null) {
      setcurrentImage(null);
      setmodelImages([noPreview]);
    } else {
      const removeSingleQuote = images.replace(/'/g, '"');
      const convertToArray = JSON.parse(removeSingleQuote);
      setcurrentImage(convertToArray[0]);
      setmodelImages(convertToArray);
    }
  }, [modelDetails]);

  const [issueData, setissueData] = useState([
    {
      image: crackIssue,
      title: "Damaged Screen",
    },
    {
      image: batteryIssue,
      title: "Battery Drain Issues",
    },
    {
      image: signalIssue,
      title: "Weak Signal Reception",
    },
    {
      image: locationIssue,
      title: "Inaccurate GPS Location",
    },
    {
      image: connectivityIssue,
      title: "Connectivity Issues",
    },
  ]);

  const [allServices, setAllServices] = useState([
    { icon: "fas fa-bolt", serviceName: "Scherm vervangen", price: "49.33" },
    {
      icon: "fas fa-battery-quarter",
      serviceName: "Batterij vervangen",
      price: "25.50",
    },
    { icon: "fas fa-tint", serviceName: "Waterschade", price: "34.40" },
    { icon: "fas fa-camera", serviceName: "Front Camera", price: "29.37" },
    {
      icon: "fas fa-charging-station",
      serviceName: "Oplaadpunt",
      price: "49.33",
    },
    { icon: "fas fa-camera", serviceName: "Back camera", price: "45.33" },
    {
      icon: "fas fa-headphones-alt",
      serviceName: "Earspeaker",
      price: "39.31",
    },
    { icon: "fas fa-volume-up", serviceName: "Loudspeaker", price: "42.19" },
    { icon: "fas fa-home", serviceName: "Behuizing", price: "34.33" },
    { icon: "fab fa-usb", serviceName: "USB connector", price: "32.33" },
    { icon: "fas fa-mobile", serviceName: "Back cover", price: "38.74" },
    { icon: "fas fa-diagnoses", serviceName: "Diagnose", price: "44.30" },
    { icon: "fas fa-toggle-on", serviceName: "Aan-uit-knop", price: "36.13" },
    {
      icon: "fas fa-exchange-alt",
      serviceName: "Data overzetten",
      price: "25.58",
    },
    {
      icon: "fas fa-trash-restore-alt",
      serviceName: "Software reset",
      price: "29.76",
    },
    { icon: "fas fa-wrench", serviceName: "Software Update", price: "32.68" },
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
    setcurrentImage(image);
  };

  return (
    <Fragment>
      <Head>
        <title>MrAgain - {model.model_name}</title>
        <meta name="Keywords" content="Model Details, Mr-Again" />
        <meta name="description" content="MrAgain Model Details" />
        <script
          src="https://kit.fontawesome.com/6cdc6e8865.js"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
          crossOrigin="anonymous"
        ></link>
        <link rel="canonical" href={FRONT_END_URL + router.asPath} />
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content="Model Details" />
        <meta
          property="og:description"
          content="Vind de beste reparateur bij jou in de buurt"
        />
        <meta name="og:url" content={FRONT_END_URL + router.asPath} />
        <meta property="og:image" content="" />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      </Head>
      <div className="row ">
        <div className="col-md-12 col-xs-12  pt-3 ">
          <div className="row px-5 mt-sm-5 mt-md-2">
            <div className=" col-lg-1 col-md-2 col-xs-3 col-sm-3 ">
              <Slider {...settings}>
                {modelImages.map((image, i) => (
                  <img
                    src={image}
                    className="w-100 slider-image"
                    onClick={() => onselectImage(image)}
                    key={i}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-lg-6 col-md-5 col-xs-5 col-sm-9 image-preview ">
              {currentImage === null ? (
                <img src={noPreview} alt="" className="w-100 align-bottom" />
              ) : (
                <SideBySideMagnifier
                  imageSrc={currentImage}
                  imageAlt="Example"
                  fillAvailableSpace={false}
                  alwaysInPlace={true}
                  fillGapLeft={10}
                  fillGapRight={20}
                  fillGapTop={120}
                  fillGapBottom={80}
                />
              )}
            </div>
            <div className="col-md-5  col-xs-4 pl-2 pl-lg-5 ">
              <div className="model-details">
                <p className="brand py-0 my-1 ">
                  {model.brand.brand_name.toUpperCase()}
                </p>
                <h3 className="pb-0 mb-1">{model.model_name}</h3>
                <div className="star-rate-info ">
                  <span className="series-number pt-5">
                    {model.model_serie_number}
                  </span>
                  <Rate value={parseInt(4)} className="star-rate" />
                </div>
                <p className="mt-4 mb-4">
                  <img
                    src={releasedDate}
                    style={{ width: "20px", marginRight: "5px" }}
                  />
                  Released{" "}
                  {model.model_year === null
                    ? " date not available"
                    : model.model_year}
                </p>
              </div>
              <hr />
              <div className="text-justify">
                {model.model_info !== null
                  ? model.model_info
                  : "No details available for this model"}
              </div>
              <button className="btn book-repair">
                BOOK FOR A REPAIR{" "}
                <i className="fas fa-arrow-right book-repair-icon"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="w-100  mb-5 mx-md-5 mx-sm-3 mx-xs-3">
          <div className="list-title">TOP 5 COMMON ISSUES </div>
          <div className="top-5-content px-0  mx-0">
            <div className="row mx-2 mx-sm-2 px-sm-2  mx-xs-1 px-xs-1 px-5">
              {issueData.length > 0
                ? issueData.map((issue, i) => (
                    <div className="list-details  d-inline" key={i}>
                      <img
                        src={issue.image}
                        alt=""
                        className="list-image pt-1 "
                      />
                      <span className="">{issue.title}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <section className="all-services pb-5">
          <div className="row">
            <div className="col-md-1 "></div>
            <div className="col-md-10  ">
              <div className="services-title">
                <h4>ALL AVAILABLE SERVICES OFFERED</h4>
                {/* <input type="text" className="" placeholder="SEARCH" /> */}
              </div>
              {reparations.length > 0 ? (
                reparations.map((reparation, i) => (
                  <div className="services-list" key={i}>
                    <div className="row">
                      <div className="col-md-8 d-inline">
                        <div className="service-icons">
                          {/* <i className={`${reparation.icon}`} /> */}
                          {reparation.repair_image !== "" ? (
                            <img
                              src={reparation.repair_image}
                              className="icon-img"
                            />
                          ) : (
                            <div className="service-icons">
                              <i className="far fa-images icon-img"></i>
                            </div>
                          )}
                        </div>
                        <span className="ml-3">
                          {reparation.reparation_name}
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="service-section-2">
                          <div className="start-at-label">Starts At</div>
                          {reparation.price.length > 0 ? (
                            <div className=" price-label ">
                              ${Math.min(...reparation.price)} - $
                              {Math.max(...reparation.price)}
                            </div>
                          ) : (
                            <div className="price-label ">$0 - $0</div>
                          )}
                        </div>
                        <button className="btn browse-shops ">
                          Browse Shops
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="services-list">No records found</div>
              )}
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
