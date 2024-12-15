import React, { useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const ContactFormComponent = ({
  addressName,
  studentId,
  countryLabel,
  countryValue,
  bothAdressType,
  handleBothAddressType,
  countryError,
  countryName,
  selectCountry,
  mailingAddressId,
  houseNo,
  setHouseNo,
  setAddressLine,
  addressLine,
  state,
  setState,
  zipCode,
  setZipCode,
  handleAddressLine,
  addressLineError,
  cityError,
  handleCity,
  city,
  stateError,
  handleState,
  handleZipCode,
  zipCodeError,
  setCity,
  setAddressLineError,
  setCityError,
  setStateError,
  setZipCodeError,
  bothAdressTypeError,
  setBothAddressTypeError,
}) => {
  const userType = localStorage.getItem("userType");
  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");
  let addressField = document.querySelector("#mailing-address");
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
            setCityError("");
            setCity(component.long_name);
            break;
          case "postal_town":
            setCityError("");
            setCity(component.long_name);
            break;
          case "administrative_area_level_1":
            setStateError("");
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
      setAddressLineError("");
      setAddressLine(street + " " + route);
    }
  }, [
    addressField,
    setAddressLine,
    setCity,
    setState,
    setZipCode,
    street,
    route,
    setStreet,
    setRoute,
    setAddressLineError,
    setCityError,
    setStateError,
    setZipCodeError,
  ]);

  return (
    <div>
      <p className="section-title">{addressName}</p>
      {/* <Form onSubmit={handleSubmit} className="mt-5"> */}
      <input
        type="hidden"
        // name="studentId"
        // id="studentId"
        value={studentId}
      />

      <input
        type="hidden"
        // name="addressTypeId"
        // id="addressTypeId"
        value={mailingAddressId}
      />

      <FormGroup>
        <span>
          <span className="text-danger">*</span> Address Line 1
        </span>

        <Input
          className="form-mt"
          type="text"
          // name="addressLine"
          // id="addressLine"
          id="mailing-address"
          onChange={(e) => {
            handleAddressLine(e);
          }}
          value={addressLine}
          placeholder="Enter Address Line"
        />
        <span className="text-danger">{addressLineError}</span>
      </FormGroup>

      <FormGroup>
        <span>Address Line 2 </span>

        <Input
          className="form-mt"
          type="text"
          // name="houseNo"
          // id="houseNo"
          onChange={(e) => setHouseNo(e.target.value)}
          placeholder="Enter Address Line"
          defaultValue={houseNo}
          // required
        />
      </FormGroup>

      <FormGroup>
        <span>
          <span className="text-danger">*</span> City
        </span>

        <Input
          className="form-mt"
          type="text"
          // name="city"
          // id="city"
          onChange={(e) => {
            handleCity(e);
          }}
          defaultValue={city}
          placeholder="Enter City"
        />
        <span className="text-danger">{cityError}</span>
      </FormGroup>

      <FormGroup>
        <span>
          <span className="text-danger">*</span> State/County
        </span>

        <Input
          className="form-mt"
          type="text"
          // name="state"
          // id="state"
          placeholder="Enter State/County"
          onChange={(e) => {
            handleState(e);
          }}
          defaultValue={state}
        />
        <span className="text-danger">{stateError}</span>
      </FormGroup>

      <FormGroup>
        <span>
          <span className="text-danger">*</span> Post/Zip Code
        </span>

        <Input
          className="form-mt"
          type="text"
          placeholder="Enter Zip / Postal Code"
          onChange={(e) => {
            handleZipCode(e);
          }}
          defaultValue={zipCode}
        />
        <span className="text-danger">{zipCodeError}</span>
      </FormGroup>

      <FormGroup>
        <span>
          <span className="text-danger">*</span> Country
        </span>

        <Select
          className="form-mt"
          options={countryName}
          value={{ label: countryLabel, value: countryValue }}
          onChange={(opt) => selectCountry(opt.label, opt.value)}
          // name="countryId"
          // id="countryId"
          required
        />

        {countryError && (
          <span className="text-danger">Country is required</span>
        )}
      </FormGroup>

      {userType.toString() === userTypes?.Student ? (
        <>
          {addressName !== "Permanent Address" ? (
            <FormGroup>
              <span className="form-mt">
                {" "}
                <span className="text-danger">*</span>
                Is your permanent address same as the mailing address?
              </span>
              <br />
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  // id="useForBoth"
                  onChange={handleBothAddressType}
                  // name="useForBoth"
                  value="true"
                  checked={bothAdressType === "true"}
                />
                <Label className="form-check-label" check htmlFor="useForBoth">
                  Yes
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Input
                  className="form-check-input form-mt"
                  type="radio"
                  // id="useForBoth"
                  onChange={handleBothAddressType}
                  // name="useForBoth"
                  value="false"
                  checked={bothAdressType === "false"}
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="isStayedOutsideEU_UkinLast3Years"
                >
                  No
                </Label>
              </FormGroup>
              <br />

              <span className="text-danger">{bothAdressTypeError}</span>
            </FormGroup>
          ) : null}
        </>
      ) : (
        <>
          {addressName !== "Permanent Address" ? (
            <FormGroup>
              <span className="">
                <span className="text-danger">*</span>
                Is the student's permanent address the same as their mailing
                address?
              </span>
              <br />

              <FormGroup check inline>
                <Input
                  className="form-check-input form-mt"
                  type="radio"
                  id="useForBoth"
                  onChange={handleBothAddressType}
                  name="useForBoth"
                  value="true"
                  checked={bothAdressType === "true"}
                />
                <Label className="form-check-label" check htmlFor="useForBoth">
                  Yes
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="useForBoth"
                  onChange={handleBothAddressType}
                  name="useForBoth"
                  value="false"
                  checked={bothAdressType === "false"}
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="isStayedOutsideEU_UkinLast3Years"
                >
                  No
                </Label>
              </FormGroup>
              <br />

              <span className="text-danger">{bothAdressTypeError}</span>
            </FormGroup>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ContactFormComponent;
