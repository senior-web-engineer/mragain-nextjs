import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { setFindedLocation, setSearchFilter } from "service/search/action.js";
import { CommonText, GreenText } from "./SearchForm.style.jsx";
import "./SearchForm.style.less";

const SearchForm = (routerProps) => {
  const { setFindedLocation, setSearchFilter } = routerProps;
  let btnInput = React.createRef();
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleChange(e) {
    console.log("handleChange is called");
    setLocation(e.target.value);
  }

  function handleKeyPress(e) {
    console.log(e);
    if (e.key === "Enter") {
      btnInput.current.click();
    }
  }

  function onSearch() {
    let loc = location;
    if (loc === "zipcode-error") {
      alert("Er gaat wat fout, klopt je locatie of postcode? ");
      return;
    }
    setFindedLocation(loc);
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
      <div className="form-group">
        <label htmlFor={'search'}>
        <input
          type="input"
          name={'search'}
          className="form-control"
          placeholder="Woonplaats of postcode"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
        /></label>
        <Button
          variant="light-green"
          type="submit"
          ref={btnInput}
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
