import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const ConsultantContactForm = ({
  countryLabel,
  countryValue,
  countryError,
  countryName,
  selectCountry,
  phoneNumber,
  setphoneNumber,
  houseNo,
  setHouseNo,
  setAddressLine,
  addressLine,
  cityN,
  setCityN,
  state,
  setState,
  zipCode,
  setZipCode,
  setZipCodeError,
  handlePhoneNumber,
  phoneNumberError,
  cityError,
  handleCity,
  houseNoError,
  handleHouse,
  // addressLineError,
  handleAddressLine,
  zipCodeError,
  handleZipCode,
  setCityError,
  handlePrevious,
  buttonStatus,
  progress,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");
  let addressField = document.querySelector("#address");
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
      console.log(place);
      for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        let componentType = component.types[0];
        switch (componentType) {
          case "street_number":
            setStreet(component.long_name);
            break;
          case "route":
            setRoute(component.long_name);
            break;
          case "locality":
            setCityN(component.long_name);
            setCityError("");
            break;
          case "postal_town":
            setCityError("");
            setCityN(component.long_name);
            break;
          case "administrative_area_level_1":
            setState(component.long_name);
            break;
          case "postal_code":
            setZipCode(component.long_name);
            setZipCodeError("");
            break;
          default:
          // code block
        }
      }
    }
    if (street !== "" || route !== "") {
      setHouseNo(street + " " + route);
    }
  }, [
    addressField,
    setHouseNo,
    setAddressLine,
    setZipCodeError,
    setCityN,
    setState,
    setZipCode,
    street,
    route,
    setCityError,
    setStreet,
    setRoute,
  ]);

  return (
    <Row>
      <Col lg="6" md="8">
        {/* <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span>
            Phone Number
          </span>

          <Input
            type="text"
            onChange={(e) => {
              handlePhoneNumber(e);
            }}
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
          <span className="text-danger">{phoneNumberError}</span>
        </FormGroup> */}

        <FormGroup className="has-icon-left position-relative">
          <span>
            {" "}
            <span className="text-danger">*</span>
            Address Line 1
          </span>

          <Input
            type="text"
            id="address"
            placeholder="Enter Address"
            onChange={(e) => {
              handleHouse(e);
            }}
            value={houseNo}
          />
          <span className="text-danger">{houseNoError}</span>
        </FormGroup>

        <FormGroup className="has-icon-left position-relative">
          <span>
            {/* <span className="text-danger">*</span> */}
            Address Line 2
          </span>

          <Input
            type="text"
            onChange={(e) => {
              handleAddressLine(e);
            }}
            value={addressLine}
            placeholder="Enter Address Line"
          />
          {/* <span className="text-danger">{addressLineError}</span> */}
        </FormGroup>
        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span>
            City
          </span>

          <Input
            type="text"
            onChange={(e) => {
              handleCity(e);
            }}
            value={cityN}
            placeholder="Enter City"
          />
          <span className="text-danger">{cityError}</span>
        </FormGroup>

        <FormGroup className="has-icon-left position-relative">
          <span>State/County</span>

          <Input
            type="text"
            placeholder="Enter State/County"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </FormGroup>

        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> Zip/Post Code
          </span>

          <Input
            type="text"
            placeholder="Enter Zip Code"
            onChange={(e) => {
              handleZipCode(e);
            }}
            value={zipCode}
          />
          <span className="text-danger">{zipCodeError}</span>
        </FormGroup>

        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> Country
          </span>

          <Select
            options={countryName}
            value={{ label: countryLabel, value: countryValue }}
            onChange={(opt) => selectCountry(opt.label, opt.value)}
            required
          />
          {countryError && (
            <span className="text-danger">Country is required</span>
          )}
        </FormGroup>
        <FormGroup className="d-flex justify-content-between mt-4">
          <PreviousButton action={handlePrevious} />
          {permissions?.includes(permissionList?.Edit_Consultant) && (
            <SaveButton
              text="Save and Next"
              progress={progress}
              buttonStatus={buttonStatus}
            />
          )}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default ConsultantContactForm;
