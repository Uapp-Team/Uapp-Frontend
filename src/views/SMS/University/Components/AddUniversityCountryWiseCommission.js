import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import ButtonForFunction from "../../Components/ButtonForFunction";
import Select from "react-select";
import get from "../../../../helpers/get";
import ButtonLoader from "../../Components/ButtonLoader";

import { v4 as uuidv4 } from "uuid";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddUniversityCountryWiseCommission = () => {
  const [countries, setCountries] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState("");
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState("");

  const history = useHistory();
  const { univerId } = useParams();

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      console.log("countries", res);
      setCountries(res);
    });
  }, []);

  const countryOptions = countries?.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const selectCountry = (label, value) => {
    setCountryError("");
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleRanges = (e) => {
    setChecked(e.target.checked);
  };

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), from: "", to: "", amount: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), from: "", to: "", amount: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div>
      <BreadCrumb
        title="University Commission Information"
        backTo="University Commission Information"
        path={`/addUniversityCommission/${univerId}`}
      />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-5 ml-4">
            {/* <input
                            type="hidden"
                            name="subjectId"
                            id="subjectId"
                            value={subjId}
                        /> */}

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="9">
                <Select
                  options={countryOptions}
                  value={{ label: countryLabel, value: countryValue }}
                  onChange={(opt) => selectCountry(opt.label, opt.value)}
                  name="countryId"
                  id="countryId"
                />
                {/* <span className="text-danger">{countryError}</span> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Has Ranges</span>
              </Col>
              <Col md="9">
                <Input
                  className="ml-1"
                  type="checkbox"
                  onChange={handleRanges}
                  checked={checked}
                />
              </Col>
            </FormGroup>

            {checked ? (
              <div>
                {inputFields.map((inputField) => (
                  <div className="row mb-2" key={inputField.id}>
                    <div className="col-md-3">
                      <Input
                        name="from"
                        placeholder="From"
                        value={inputField.firstName}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <Input
                        name="to"
                        placeholder="To"
                        value={inputField.lastName}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <Input
                        name="amount"
                        placeholder="Amount"
                        value={inputField.lastName}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <div className="d-flex justify-content-end">
                        <Button
                          color="danger"
                          className="mr-2"
                          disabled={inputFields.length === 1}
                          onClick={() => handleRemoveFields(inputField.id)}
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <Button color="primary" onClick={handleAddFields}>
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <Button
                                        color="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button> */}
              </div>
            ) : (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Default Amount <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="9">
                  <Input
                    type="number"
                    name="defaultAmount"
                    id="defaultAmount"
                    min="0"
                    step="any"
                    placeholder="Default Amount"
                    // defaultValue={otherData?.testScore?.greScore}
                    required
                    // onChange={handleGreScore4}
                  />
                </Col>
              </FormGroup>
            )}

            <div className="row mt-4 mb-5">
              <div className="col-md-11 d-flex justify-content-end">
                <ButtonForFunction
                  // func={() => setShowForm(false)}
                  color={"danger"}
                  className={"ml-lg-2 ml-sm-1 mt-3"}
                  name={"Cancel"}
                  permission={6}
                />

                <ButtonForFunction
                  type={"submit"}
                  className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
                  name={progress ? <ButtonLoader /> : "Save"}
                  permission={6}
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddUniversityCountryWiseCommission;
