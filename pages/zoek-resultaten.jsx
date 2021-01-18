import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Alert, Button, Input, Select, Spin, Icon } from "antd";
import filterIcon from "@/assets/images/filterIcon.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ShopInfoCard, Layout } from "@/components/global";
import lib from "@/assets/js/lib";
import { FRONT_END_URL } from "../constants.js";
import {
  getSearchFilterFieldExt,
  searchShopFilter,
} from "service/search/operations.js";
import { compose, withProps, lifecycle } from "recompose";
import {
  google,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { setFindOut } from "service/search/action.js";
import "./zoek-resultaten.less";
import Head from "next/head";
import image1 from "@/assets/images/home_newest_image3.jpg";
import { setSearchFilter, setLoadFilter } from "../service/search/action";
import { Modal } from "react-bootstrap";
import { getBrands, getDevices, getModels } from "service/search/operations";

const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const googleMapsApiKey = "AIzaSyBG_U7llCBV6Q-OdBP5Sa_VhyuGuyL6Fzk";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const router = useRouter();
  const goShopProfile = (shop_name, city, street) => {
    const shop = shop_name.replaceAll(" ", "-");
    const cityName = city.replaceAll(" ", "-");
    // const streetName = street.replaceAll(" ", "-");
    // router.push(`/profiel/${shop}--${cityName}--${streetName}`);
    router.push(`/${shop}--${cityName}`);
  };

  const [shopInfo, setshopInfo] = useState(null);
  return (
    <GoogleMap
      defaultZoom={7}
      // defaultCenter={{ lat: 52.11346, lng: 5.1213965 }}
      defaultCenter={{ lat: 51.363244, lng: 5.264762 }}
    >
      {props.isMarkerShown &&
        props.shoplist.map((shop) => {
          return (
            <Marker
              key={shop.name}
              position={{
                lat: parseFloat(shop.geo_lat),
                lng: parseFloat(shop.geo_long),
              }}
              draggable={shopInfo === shop.id ? true : false}
              ref={props.onMarkerMounted}
              onPositionChanged={props.onPositionChanged}
              // label={shop.name}
              className="map-marker"
              onClick={() => {
                goShopProfile(shop.name, shop.city, shop.street);
              }}
              onMouseOver={() => {
                setshopInfo(shop.id);
              }}
              onMouseOut={() => {
                setshopInfo(null);
              }}
            >
              {shopInfo === shop.id ? (
                <InfoWindow>
                  <span className="text-dark font-weight-bold">
                    {shop.name}
                  </span>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
    </GoogleMap>
  );
});

const SearchShop = (routerProps) => {
  const [spacing] = React.useState(2);
  const [pageType] = React.useState(1);
  const [phone, setPhone] = React.useState(0);
  const [brand, setBrand] = React.useState(0);
  const [reparation, setReparation] = React.useState(0);
  const [model, setModel] = React.useState(0);
  const [price, setPrice] = React.useState(-1);
  const [guarantee, setGuarantee] = React.useState(-1);
  const [location, setLocation] = React.useState("");
  const [distance, setDistance] = React.useState(15);
  const [sort, setSort] = React.useState(0); // default: sort = 0, sort = 1 increase, sort = 2 decrease

  const [brandflg, setBrandflg] = React.useState(false);
  const [isLoad, setLoad] = React.useState(false);
  const [isShowPrice, setShowPrice] = React.useState(false);
  const [isFilterError, setError] = React.useState(false);
  const [isShowExFilter, setShowExFilter] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [showMaps, setShowMaps] = React.useState(false);
  const router = useRouter();
  const { device } = router.query;
  /* eslint-disable */

  const {
    getDevices,
    getBrands,
    getModels,
    getSearchFilterFieldExt,
    findShopbyFilter,
    devices,
    deviceBrands,
    brandModels,
    // filterlistPBM,
    filterlistRPG,
    shoplist,
    isFindOut,
    isLoadFilter,
    isSearchFilter,
    searchFilters,
    setLoadFilter,
    setFindOut,
    setSearchFilter,
    // defaultlocation,
  } = routerProps;

  if (isLoad === false) {
    setLoadFilter(false);
    getDevices();
    setLoad(true);
  }

  let prList = [],
    guList = [],
    repList = [];

  let isExistP = [],
    isExistG = [],
    isExistR = [];

  if (filterlistRPG !== []) {
    filterlistRPG.map((element) => {
      isExistP = prList.filter((price) => price === element.price);
      if (isExistP.length === 0) {
        prList.push(element.price);
      }
      isExistG = guList.filter((guarantee) => guarantee === element.guar_time);
      if (isExistG.length === 0) {
        guList.push(element.guar_time);
      }
      isExistR = repList.filter((rep) => rep.id === element.reparation.id);
      if (isExistR.length === 0) {
        repList.push(element.reparation);
      }
      return true;
    });
  }

  prList.sort();
  guList.sort();
  repList.sort();

  const antIcon = <Icon type="loading" spin />;

  useEffect(() => {
    const params = router.query;
    console.log("isSearchFilter", isSearchFilter);
    if (isSearchFilter === true && searchFilters.location === null) {
      return;
    }

    // if (isLoadFilter === true) {
    if (isSearchFilter === true) {
      if (searchFilters.location !== "") {
        setLocation(searchFilters.location);
      }
      let dev = parseInt(searchFilters.device);
      if (dev !== null && dev !== 0) {
        if (dev !== phone) {
          setPhone(dev);
          getBrands(dev);
        }
        let br = parseInt(searchFilters.brand);
        if (br !== null && br !== 0) {
          if (br !== brand) {
            console.log(br, brand);
            handleBrandChange(br);
          }
          let mo = parseInt(searchFilters.model);
          if (mo !== null && mo !== 0) {
            if (mo !== model) {
              handleModelChange(mo);
            }
            let rep = parseInt(searchFilters.reparation);
            if (rep !== null && rep !== 0) {
              setReparation(rep);
            }
          }
        }
      }
    } else {
      if (params.position !== "") {
        setLocation(params.position);
      }
      let dist = parseInt(params.distance);

      if (params.distance !== undefined && dist !== null && dist !== 0) {
        setDistance(dist);
      }
      let dev = parseInt(params.device);
      if (dev !== null && dev !== 0) {
        if (dev !== phone) {
          setPhone(dev);
          getBrands(dev);
        }

        let br = parseInt(params.brand);
        if (br !== null && br !== 0) {
          console.log(br, brand);
          if (br !== brand) {
            handleBrandChange(br);
          }
          let mo = parseInt(params.model);
          if (mo !== null && mo !== 0) {
            if (mo !== model) {
              handleModelChange(mo);
            }
            let rep = parseInt(params.reparation);
            if (rep !== null && rep !== 0) {
              setReparation(rep);
              let price = parseInt(params.price);
              if (price !== null && price !== 0) {
                setPrice(price);
              }
              let guarantee = parseInt(params.guarantee);
              if (guarantee !== null && guarantee !== 0) {
                setGuarantee(guarantee);
              }
              setShowPrice(true);
            }
          }
        }
      }
    }
    setIsSearch(true);
    // }
  }, [isLoadFilter, isSearchFilter, isLoad]);

  const classes = useStyles();

  function displayShopMaps(value) {
    setShowMaps(true);
  }
  function hideShopMaps() {
    setShowMaps(false);
  }

  function handlePhoneChange(value) {
    setPhone(value);
    getBrands(value);
    if (brandflg === true) {
      setBrandflg(false);
    }
    setBrand(0);
    setModel(0);
    setReparation(0);
    setPrice(-1);
    setGuarantee(-1);
    setShowExFilter(false);
    setIsSearch(true);
  }

  function handleBrandChange(value) {
    setBrand(value);
    setBrandflg(true);
    getModels(phone, value);
    // if (value !== 0) {
    //   setModel(0);
    // } else {
    setModel(0);
    setReparation(0);
    setPrice(-1);
    setGuarantee(-1);
    setShowExFilter(false);
    // }
  }

  function handleModelChange(value) {
    setModel(value);
    setReparation(0);
    setPrice(-1);
    setGuarantee(-1);
    setShowExFilter(true);
    getSearchFilterFieldExt(value);
    setIsSearch(true);
  }

  function handleReparationChange(value) {
    setReparation(value);
    setPrice(-1);
    setGuarantee(-1);
    setIsSearch(true);
  }

  function handlePriceChange(value) {
    setPrice(value);
    setGuarantee(-1);
    setIsSearch(true);
  }

  function handleGuaranteeChange(value) {
    setGuarantee(value);
    setIsSearch(true);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleDistanceChange(value) {
    setDistance(value);
    setIsSearch(true);
  }

  function handleSortChange(value) {
    setSort(value);
  }

  function onFindShopbyFilter() {
    let loc = location;
    if (loc === "zipcode-error") {
      // alert("Voer een plaats of postcode in");
      // return;
    }
    // if (loc === "") {
    //   setError(true);
    // } else {
    let _filters = {
      isSearchFilter: false,
      filters: {
        location: loc,
        device: phone,
        brand: brand,
        model: model,
        reparation,
      },
    };
    setSearchFilter(_filters);
    if (reparation !== 0) {
      setShowPrice(true);
    }
    setIsSearch(true);
    // router.push(
    //   `/zoek-resultaten?position=${loc}&distance=${distance}&device=${phone}&brand=${brand}&model=${model}&reparation=${reparation}&price=${price}&guarantee=${guarantee}&sort=${sort}`
    // );
    // }
  }

  function initBrandSelect() {
    return (
      deviceBrands !== undefined &&
      deviceBrands.map((element) => {
        return (
          <Option value={element.id} key={element.id}>
            {element.brand_name}
          </Option>
        );
      })
    );
  }

  function initModelSelect() {
    if (phone === 0 || brand === 0) {
      return;
    }

    if (isLoadFilter === false) {
      // return;
    }

    return (
      brandModels !== undefined &&
      brandModels.map((element) => {
        return (
          <Option value={element.id} key={element.id}>
            {element.model_name}
          </Option>
        );
      })
    );
  }

  function initReparationSelect() {
    return (
      repList !== [] &&
      repList.map((element) => {
        return (
          <Option value={element.id} key={element.id}>
            {element.name}
          </Option>
        );
      })
    );
  }

  function initGuaranteeSelect() {
    return (
      guList !== [] &&
      guList.map((element) => {
        return (
          <Option value={element} key={element}>
            {element} maanden
          </Option>
        );
      })
    );
  }

  function findingSpiner() {
    return <Spin indicator={antIcon} />;
  }

  // if (isLoad === false) {
  //   setLoadFilter(false);
  //   setLoad(true);

  // let queryParams = routerProps.location.search;
  // const params = queryString.parse(queryParams);

  // setLocation(params.position);
  // if (isSearchFilter === true) {
  //   if (params.position !== "") {
  //     setLocation(params.position);
  //   }

  //   if (params.device !== null && params.device !== 0) {
  //     setPhone(params.device);
  //     if (params.brand !== null && params.brand !== 0) {
  //       setBrand(params.brand);
  //       handleBrandChange(params.brand);
  //       if (params.model !== null && params.model !== 0) {
  //         setModel(params.model);
  //         handleModelChange(params.model);
  //         if (params.reparation !== null && params.reparation !== 0) {
  //           setReparation(params.reparation);
  //         }
  //       }
  //     }
  //   }
  // }
  // }

  useEffect(() => {
    if (isSearch === true) {
      setFindOut(false);
      let filter = {
        location,
        distance,
        phone,
        brand,
        model,
        reparation,
        price,
        guarantee,
        sort,
      };
      findShopbyFilter(filter);
      setIsSearch(false);
    }
  }, [isSearch]);

  return (
    <Layout>
      <div className="serarch-shop-section">
        <Head>
          <title itemProp="name">Mr Again - Zoek resultaten</title>
          <meta
            name="Keywords"
            content="Telefoon reparateur, Tablet reparateur, Telefoon Reparatie Utrecht, Telefoon Reparatie Rotterdam, Telefoon Reparatie Amsterdam, Telefoon Reparatie Den Haag, Telefoon Reparatie Nijmegen, Telefoon Reparatie Almere, Telefoon reparatie Den Bosch, Telefoon Reparatie Tilburg, Telefoon reparatie Eindhoven, Telefoon Reparatie Maastricht, Telefoon reparatie Alkmaar, Telefoon Reparatie Groningen, Telefoon reparatie Leeuwarden, Telefoon reparatie Haarlem, Telefoon reparatie Zoetermeer, telefoon scherm vervangen"
          />
          <meta
            name="description"
            content="Bij MrAgain vind je snel de beste telefoon reparateur bij jou in de buurt."
          />
          <link rel="canonical" href={FRONT_END_URL + "/zoek-resultaten"} />

          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Zoek resultaten" />
          <meta
            property="og:description"
            content="Vind snel de beste telefoon reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL + "/zoek-resultaten"} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />

          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="main-title">
          <div className="wrap">
            <h4>Zoek resultaten</h4>
          </div>
        </div>
        <div className="main">
          <div className="result-container">
            <div className="filter-option-section">
              {isFilterError && (
                <Alert
                  closable
                  message="Je bent vergeten een plaats of postcode in te vullen."
                  type="error"
                  afterClose={() => setError(false)}
                  className="input-location-fail"
                />
              )}
              <div className="filter-option-form">
                <div className="first-filter">
                  <Select value={phone} onChange={handlePhoneChange}>
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {devices.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.device_name}
                        </Option>
                      );
                    })}
                  </Select>
                  <Select
                    defaultValue="Brand"
                    onChange={handleBrandChange}
                    value={brand === 0 ? "Alle merken" : brand}
                  >
                    <Option value={0} key={0}>
                      Alle merken
                    </Option>
                    {initBrandSelect()}
                    {/* {phoneflg && initBrandSelect()} */}
                  </Select>
                  {/* <Select
                    defaultValue="All Reparations"
                    onChange={handleReparationChange}
                    value={reparation === 0 ? "Alle reparaties" : reparation}
                  >
                    <Option value={0} key={0}>
                      Alle reparaties
                    </Option>
                    {isShowExFilter && initReparationSelect()}
                  </Select>*/}
                  <Select
                    defaultValue="All Model"
                    onChange={handleModelChange}
                    value={model === 0 ? "Alle modellen" : model}
                  >
                    <Option value={0} key={0}>
                      Alle modellen
                    </Option>
                    {brandflg && initModelSelect()}
                  </Select>
                  <Button
                    className="search-button"
                    onClick={onFindShopbyFilter}
                  >
                    Zoek
                  </Button>
                </div>
                <div className="second-filter">
                  <Select
                    className={isShowExFilter ? "" : "hidden"}
                    defaultValue="All Reparations"
                    onChange={handleReparationChange}
                    value={reparation === 0 ? "Alle reparaties" : reparation}
                  >
                    <Option value={0} key={0}>
                      Alle reparaties
                    </Option>
                    {isShowExFilter && initReparationSelect()}
                  </Select>
                  <Select
                    className={isShowExFilter ? "" : "hidden"}
                    defaultValue="All Price"
                    onChange={handlePriceChange}
                    value={price === -1 ? "Alle prijzen" : price}
                  >
                    <Option value={-1} key={-1}>
                      Alle prijzen
                    </Option>
                    <Option value={50} key={50}>
                      €0-50
                    </Option>
                    <Option value={100} key={100}>
                      €50-100
                    </Option>
                    <Option value={0} key={0}>
                      €100
                    </Option>
                  </Select>
                  <Select
                    className={isShowExFilter ? "" : "hidden"}
                    defaultValue="All Guarantee"
                    onChange={handleGuaranteeChange}
                    value={guarantee === -1 ? "Alle garanties" : guarantee}
                  >
                    <Option value={-1} key={-1}>
                      Alle garanties
                    </Option>
                    {isShowExFilter && initGuaranteeSelect()}
                  </Select>
                </div>
                <div className="third-filter">
                  <div className="third-filter-wrap">
                    <div className="location-select-blog">
                      <Input
                        className="location-select"
                        placeholder="Woonplaats of postcode"
                        onChange={handleLocationChange}
                        value={location}
                      />
                    </div>
                    <div className="distance-select-blog">
                      <Select
                        className="distance-select"
                        defaultValue="+15km"
                        onChange={handleDistanceChange}
                        value={distance}
                      >
                        {[5, 10, 15, 20, 50].map((item) => (
                          <Option value={item} key={item}>
                            + {item}km
                          </Option>
                        ))}
                      </Select>
                      <Button className="filter-on-button">
                        <img src={filterIcon} alt="filtericon" />
                        Filter op
                      </Button>
                    </div>
                    <div className="rate-select-blog">
                      <Select
                        className="rate-select"
                        defaultValue="Rating Hoog-Laag"
                        onChange={handleSortChange}
                      >
                        <Option value="1">Hoog-Laag</Option>
                        <Option value="2">Laag-Hoog</Option>
                      </Select>
                      <Button
                        className="kaart-button"
                        onClick={() => {
                          displayShopMaps();
                        }}
                      >
                        Kaart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="search-result-section">
              <div className="search-result-title">
                <h5>Gevonden reparateurs: {shoplist.length} </h5>
                {isFindOut === false && findingSpiner()}
              </div>

              <div className="search-result-content">
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                      {shoplist.map((shop) => (
                        <Grid key={shop.id} item>
                          <ShopInfoCard
                            shop_id={shop.id}
                            shop_name={shop.name}
                            city={shop.city}
                            street={shop.street}
                            className={classes.paper}
                            title={shop.name}
                            rate={shop.mark}
                            distance={`${shop.distance}km`}
                            guar_time={
                              isShowPrice === true ? `${shop.gua_time} mnd` : -1
                            }
                            image={
                              shop.logo_photo !== "" && shop.logo_photo !== null
                                ? shop.logo_photo
                                : shop.logo_photo === ""
                                ? shop.bg_photo
                                : image1
                            }
                            key={shop.name}
                            type={pageType}
                            price={isShowPrice === true ? `€${shop.price}` : ""}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={showMaps}
          onHide={hideShopMaps}
          className="search-shop-map"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <MyMapComponent isMarkerShown={true} shoplist={shoplist} />
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isLoadFilter: state.search.isLoadFilter,
  isSearchFilter: state.search.isSearchFilter,
  isFindOut: state.search.isFindOut,
  shoplist: state.search.list,
  searchFilters: state.search.searchFilters,
  // defaultlocation: state.search.location,
  // filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  devices: state.search.devices,
  deviceBrands: state.search.deviceBrands,
  brandModels: state.search.brandModels,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getSearchFilterFieldExt: (model_id) => {
      getSearchFilterFieldExt(model_id, dispatch);
    },
    findShopbyFilter: (data) => {
      searchShopFilter(data, dispatch);
    },
    getDevices: () => {
      getDevices(dispatch);
    },
    getBrands: (id) => {
      getBrands(id, dispatch);
    },
    getModels: (deviceId, brandId) => {
      getModels(deviceId, brandId, dispatch);
    },
    setFindOut: (data) => {
      dispatch(setFindOut(data));
    },
    setSearchFilter: (data) => {
      dispatch(setSearchFilter(data));
    },
    setLoadFilter: (data) => {
      dispatch(setLoadFilter(data));
    },
  };
};
/* eslint-enable */
export default connect(mapStateToProps, mapDispatchToProps)(SearchShop);
