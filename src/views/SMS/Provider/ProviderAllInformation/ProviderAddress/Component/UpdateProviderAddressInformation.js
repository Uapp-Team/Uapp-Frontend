import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input } from "reactstrap";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import Select from "react-select";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const UpdateProviderAddressInformation = ({
  handleSubmitIndividual,
  id,
  oneData,
  addressLine3,
  cityN3,
  state3,
  zipCode3,
  countryName,
  countryLabel2,
  countryValue2,
  selectCountry2,
  countryError2,
  closeShowForm,
  setAddressLine3,
  setCityN3,
  setState3,
  setZipCode3,
  progress,
  buttonStatus,
  handleAddressLine2,
  addressLine2,
  addressLineError2,
  setAddressLine2,
  setHouseNo2,
  houseNo2,
  handleCityN2,
  cityN2,
  cityError2,
  handleState2,
  state2,
  stateError2,
  handleZipCode2,
  zipCode2,
  zipCodeError2,
  setCityError2,
  setCityN2,
  setStateError2,
  setState2,
  setZipCodeError2,
  setZipCode2,
}) => {
  console.log(oneData);
  // const [addressField, setAddressField] = useState("");
  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  let addressField = document.querySelector("#gyerhuogt");
  console.log(addressField);
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
      setStreet("");
      setRoute("");
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
  console.log(addressField);
  return (
    <>
      <Form id="scrollDown" onSubmit={handleSubmitIndividual}>
        <input type="hidden" name="providerId" id="providerId" value={id} />

        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span> Address Line 1
            </span>

            <Input
              type="string"
              name="addressline"
              id="gyerhuogt"
              onChange={(e) => {
                handleAddressLine2(e);
              }}
              placeholder="Enter Address Line 1"
              value={addressLine2}
            />
            <span className="text-danger">{addressLineError2}</span>
          </Col>
        </FormGroup>
        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>Address Line 2</span>

            <Input
              type="string"
              name="houseNo"
              id="houseNo"
              placeholder="Enter Address Line 2"
              onChange={(e) => setHouseNo2(e.target.value)}
              value={houseNo2}
              // required
            />
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span> City
            </span>

            <Input
              type="string"
              name="city"
              id="city"
              placeholder="Enter City"
              onChange={(e) => {
                handleCityN2(e);
              }}
              value={cityN2}
            />
            <span className="text-danger">{cityError2}</span>
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span>State/County
            </span>

            <Input
              type="string"
              name="state"
              id="state"
              placeholder="Enter State/County"
              value={state2}
              onChange={(e) => {
                handleState2(e);
              }}
            />
            <span className="text-danger">{stateError2}</span>
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span> Zip Code
            </span>

            <Input
              type="string"
              name="zipCode"
              id="zipCode"
              placeholder="Enter Zip Code"
              onChange={(e) => {
                handleZipCode2(e);
              }}
              value={zipCode2}
            />
            <span className="text-danger">{zipCodeError2}</span>
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span> Country
            </span>

            <Select
              options={countryName}
              value={{ label: countryLabel2, value: countryValue2 }}
              onChange={(opt) => selectCountry2(opt.label, opt.value)}
              name="countryId"
              id="countryId"
              required
            />

            {countryError2 && (
              <span className="text-danger">Country is required</span>
            )}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col lg="4" md="6" sm="8" className="text-right">
            <CancelButton cancel={closeShowForm} />
            {permissions?.includes(permissionList.Edit_Provider) ? (
              <SaveButton progress={progress} buttonStatus={buttonStatus} />
            ) : null}
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default UpdateProviderAddressInformation;
