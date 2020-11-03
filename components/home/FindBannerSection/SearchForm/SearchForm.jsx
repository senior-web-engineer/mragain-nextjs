import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import { setFindedLocation, setSearchFilter } from "Service/search/action.js";
import lib from "@/assets/js/lib";
import { CommonText, GreenText } from "./SearchForm.style.jsx";
import "./SearchForm.style.less";

const SearchForm = (routerProps) => {
  const { setFindedLocation, setSearchFilter } = routerProps;
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setLocation(e.target.value);
  }

  function onSearch() {
    let loc = location;
    if (loc === "zipcode-error") {
      alert("Er gaat wat fout, klopt je locatie of postcode? ");
      return;
    }
    setFindedLocation(loc);
    // if (location !== "") {
    //   let filter = {
    //     location: loc,
    //     distance: 0,
    //     phone: 0,
    //     brand: 0,
    //     model: 0,
    //     reparation: 0,
    //     price: -1,
    //     guarantee: -1,
    //     sort: 0,
    //   };
    let _filters = {
      isSearchFilter: false,
      filters: {
        location: "",
        device: null,
        brand: null,
        model: null,
        reparation: null,
      },
    };
    setSearchFilter(_filters);
    router.push(
      `/zoek-resultaten?position=${loc}&device=${0}&brand=${0}&model=${0}&reparation=${0}`
    );
  }

  return (
    <div
      className="search-form"
      onSubmit={(e) => {
        onSearch();
      }}
    >
      <div className="form-title">
        <CommonText>
          Vind een betrouwbare reparateur bij jou in de buurt
        </CommonText>
        <GreenText></GreenText>
      </div>
      {/*<div className="form-subtitle">
        <GreenText>Vind de beste reparateur bij jou in de buurt</GreenText>
      </div>*/}
      <div className="form-group">
        <input
          type="input"
          className="form-control"
          placeholder="Woonplaats of postcode"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Button
          variant="light-green"
          type="submit"
          onClick={() => {
            onSearch();
          }}
        >
          Zoek
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shoplist: state.search.list,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setFindedLocation: (data) => {
      dispatch(setFindedLocation(data));
    },
    setSearchFilter: (data) => {
      dispatch(setSearchFilter(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);