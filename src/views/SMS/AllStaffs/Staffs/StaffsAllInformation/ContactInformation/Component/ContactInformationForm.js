import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, FormGroup, Input, Row } from "reactstrap";
import PreviousButton from "../../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../../constants/AuthorizationConstant";

const ContactInformationForm = ({
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
  setHouseNoError,
  setCityError,
  setZipCodeError,
  progress,
  handlePrevious,
  buttonStatus,
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
            setCityError("");
            setCityN(component.long_name);
            break;
          case "postal_town":
            setCityError("");
            setCityN(component.long_name);
            break;
          case "administrative_area_level_1":
            setState(component.long_name);
            break;
          case "postal_code":
            setZipCodeError("");
            setZipCode(component.long_name);
            break;
          default:
          // code block
        }
      }
    }
    if (street !== "" || route !== "") {
      setHouseNoError("");
      setHouseNo(street + " " + route);
    }
  }, [
    addressField,
    setHouseNo,
    setAddressLine,
    setCityN,
    setState,
    setZipCode,
    setHouseNoError,
    setCityError,
    setZipCodeError,
    street,
    route,
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

        <FormGroup className="mt-4 d-flex justify-content-between">
          <PreviousButton action={handlePrevious} />
          {permissions?.includes(permissionList?.Update_Employee) && (
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

export default ContactInformationForm;
