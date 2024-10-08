import React, { useEffect, useState } from "react";
import { FormGroup, Input } from "reactstrap";
import Select from "react-select";

const ContactFormForPermanent = ({
  studentId,
  countryName2,
  selectCountry2,
  permanentAddressId,
  addressName,
  countryLabel2,
  countryValue2,
  countryError2,
  houseNo2,
  setHouseNo2,
  setAddressLine2,
  addressLine2,
  cityN2,
  setCityN2,
  state2,
  setState2,
  zipCode2,
  setZipCode2,
  handleAddressLine2,
  addressLineError2,
  handleState2,
  stateError2,
  setStateError2,
  handleCityN2,
  setCityError2,
  cityError2,
  zipCodeError2,
  handleZipCode2,
  setZipCodeError2,
}) => {
  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");

  let addressField = document.querySelector("#permanent-address");
  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressField,
      {
        fields: ["address_components", "geometry"],
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", fillInAddress);
    function fillInAddress() {
      // Get the place details from the autocomplete object.
      const place = autocomplete.getPlace();

      for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number":
            setStreet(component.long_name);
            break;
          case "route":
            setRoute(component.long_name);
            break;
          case "locality":
            setCityError2("");
            setCityN2(component.long_name);
            break;
          case "postal_town":
            setCityError2("");
            setCityN2(component.long_name);
            break;
          case "administrative_area_level_1":
            setStateError2("");
            setState2(component.long_name);
            break;
          case "postal_code":
            setZipCodeError2("");
            setZipCode2(component.long_name);
            break;
          default:
          // code block
        }
      }
    }
    if (street !== "" || route !== "") {
      setAddressLine2(street + " " + route);
    }
  }, [
    addressField,
    setAddressLine2,
    setCityN2,
    setCityError2,
    setState2,
    setStateError2,
    setZipCode2,
    setZipCodeError2,
    street,
    route,
    setStreet,
    setRoute,
  ]);

  return (
    <div>
      <p className="section-title">{addressName}</p>
      {/* <Form onSubmit={handleSubmit} className="mt-5"> */}
      <input type="hidden" value={studentId} />

      <input type="hidden" value={permanentAddressId} />

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Address Line 1
        </span>

        <Input
          className="form-mt"
          type="text"
          id="permanent-address"
          onChange={(e) => {
            handleAddressLine2(e);
          }}
          value={addressLine2}
          placeholder="Enter Address Line"
        />
        <span className="text-danger">{addressLineError2}</span>
      </FormGroup>

      <FormGroup className="has-icon-left position-relative">
        <span>Address Line 2 </span>

        <Input
          className="form-mt"
          type="text"
          onChange={(e) => setHouseNo2(e.target.value)}
          placeholder="Enter Address Line"
          value={houseNo2}
          // required
        />
      </FormGroup>

      <FormGroup className="has-icon-left position-relative">
        <span className="text-danger">*</span> City
        <Input
          className="form-mt"
          type="text"
          placeholder="Enter City"
          onChange={(e) => {
            handleCityN2(e);
          }}
          Value={cityN2}
        />
        <span className="text-danger">{cityError2}</span>
      </FormGroup>

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> State/County
        </span>

        <Input
          className="form-mt"
          type="text"
          placeholder="Enter State/County"
          onChange={(e) => {
            handleState2(e);
          }}
          value={state2}
        />
        <span className="text-danger">{stateError2}</span>
      </FormGroup>

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Zip Code
        </span>

        <Input
          className="form-mt"
          type="text"
          placeholder="Enter Zip / Postal Code"
          onChange={(e) => {
            handleZipCode2(e);
          }}
          value={zipCode2}
        />
        <span className="text-danger">{zipCodeError2}</span>
      </FormGroup>

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Country
        </span>

        <Select
          className="form-mt"
          options={countryName2}
          value={{ label: countryLabel2, value: countryValue2 }}
          onChange={(opt) => selectCountry2(opt.label, opt.value)}
          required
        />

        {countryError2 && (
          <span className="text-danger">Country is required</span>
        )}
      </FormGroup>
    </div>
  );
};

export default ContactFormForPermanent;
