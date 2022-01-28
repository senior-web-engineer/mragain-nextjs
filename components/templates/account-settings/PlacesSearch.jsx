import { Input } from "antd";
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", selectedAddress: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.props.onSelect(latLng);
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{
          componentRestrictions: {
            country: ["nl", "be"],
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: "Zoek je locatie",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && (
                <div style={{ background: "white", padding: "10px" }}>
                  Loading...
                </div>
              )}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const genericStyle = { padding: "5px 10px" };
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                      ...genericStyle,
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      ...genericStyle,
                    };
                return (
                  <div
                    key={`places-select-${suggestion.id}`}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
