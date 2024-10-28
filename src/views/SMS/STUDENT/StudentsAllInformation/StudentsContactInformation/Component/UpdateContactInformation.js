import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const UpdateContactInformation = ({
  handleSubmitIndividual,
  applicationStudentId,
  addressLine2,
  houseNo2,
  cityN2,
  state2,
  zipCode2,
  countryName,
  countryLabel2,
  countryValue2,
  selectCountry2,
  countryError2,
  closeShowForm,
  setAddressLine2,
  setCityN2,
  setState2,
  setZipCode2,
  progress,
  buttonStatus,
  handleAddressLine2,
  addressLineError2,
  setHouseNo2,
  handleCityN2,
  cityError2,
  handleState2,
  stateError2,
  handleZipCode2,
  zipCodeError2,
  setCityError2,
  setStateError2,
  setZipCodeError2,
}) => {
  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  let addressField = document.querySelector("#addressLine");

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
  return (
    <>
      <Form id="scrollDown" onSubmit={handleSubmitIndividual}>
        <input
          type="hidden"
          name="studentId"
          id="studentId"
          value={applicationStudentId}
        />

        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span> Address Line 1
            </span>

            <Input
              type="string"
              name="addressLine"
              id="addressLine"
              onChange={(e) => {
                handleAddressLine2(e);
              }}
              placeholder="Enter Address Line 1"
              value={addressLine2}
            />
            <span className="text-danger">{addressLineError2}</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>Address Line 2</span>

            <Input
              type="string"
              name="houseNo"
              id="houseNo"
              onChange={(e) => setHouseNo2(e.target.value)}
              placeholder="Enter Address Line 2"
              value={houseNo2}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span>
              City{" "}
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

        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>
              <span className="text-danger">*</span>
              State/County
            </span>

            <Input
              type="string"
              name="stateName"
              id="stateName"
              placeholder="Enter State/County"
              value={state2}
              onChange={(e) => {
                handleState2(e);
              }}
            />
            <span className="text-danger">{stateError2}</span>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>
              {" "}
              <span className="text-danger">*</span>
              Zip Code{" "}
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

        <FormGroup row>
          <Col lg="4" md="6" sm="8">
            <span>
              {" "}
              <span className="text-danger">*</span>
              Country
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
          <Col>
            <CancelButton cancel={closeShowForm} />
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <SaveButton progress={progress} buttonStatus={buttonStatus} />
            ) : null}
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default UpdateContactInformation;
