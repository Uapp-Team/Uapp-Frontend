import Axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Form, FormGroup, Input, Col } from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ButtonLoader from "../../Components/ButtonLoader";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import SaveButton from "../../../../components/buttons/SaveButton";

const AddUniversityFeatures = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [radioPracticalTraining, setRadioPracticalTraining] = useState(false);
  const [radioIntershipParticipation, setRadioIntershipParticipation] =
    useState(false);
  const [radioWorkWhileStudying, setRadioWorkWhileStudying] = useState(false);
  const [radioConditionalOfferLetter, setRadioConditionalOfferLetter] =
    useState(false);

  const [radioAccommodations, setRadioAccommodations] = useState(false);
  const [featureId, setFeatureId] = useState(undefined);
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const myForm = createRef();
  const { addToast } = useToasts();
  const { univerId } = useParams();

  useEffect(() => {
    get(`UniversityFeatures/GetByUniversity/${univerId}`).then((res) => {
      console.log(res);
      setFeatureId(res?.id);
      setRadioPracticalTraining(`${res?.practicalTraining}`);
      setRadioIntershipParticipation(`${res?.intershipParticipation}`);
      setRadioWorkWhileStudying(`${res?.workWhileStudying}`);
      setRadioConditionalOfferLetter(`${res?.conditionalOfferLetter}`);
      setRadioAccommodations(`${res?.accommodations}`);
      setLoading(false);
    });
  }, [univerId]);

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("object");
    const subdata = new FormData(event.target);
    console.log(event);
    //  watch form data values
    for (var value of subdata.values()) {
      console.log("value", value);
    }

    if (featureId !== undefined) {
      // setButtonStatus(true);
      setProgress(true);
      put("UniversityFeatures/Update", subdata).then((res) => {
        // setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      // setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}UniversityFeatures/Create`, subdata, {
        headers: {
          authorization: AuthStr,
        },
      }).then((res) => {
        // setButtonStatus(false);
        setProgress(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
    }
  };

  // onValueChangePracticalTraining
  const onValueChangePracticalTraining = (event) => {
    setRadioPracticalTraining(event.target.checked);
  };

  // onValueChangeIntershipParticipation
  const onValueChangeIntershipParticipation = (event) => {
    setRadioIntershipParticipation(event.target.checked);
    // handleSubmit(event);
  };

  // onValueChangeWorkWhileStudying
  const onValueChangeWorkWhileStudying = (event) => {
    setRadioWorkWhileStudying(event.target.checked);
  };

  // onValueChangeConditionalOfferLetter
  const onValueChangeConditionalOfferLetter = (event) => {
    setRadioConditionalOfferLetter(event.target.checked);
  };

  // onValueChangeAccommodations
  const onValueChangeAccommodations = (event) => {
    setRadioAccommodations(event.target.checked);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form ref={myForm} onSubmit={handleSubmit}>
          <p className="section-title">Features</p>
          {featureId !== undefined ? (
            <>
              <input type="hidden" name="id" id="id" value={featureId} />
            </>
          ) : null}

          <FormGroup row className="has-icon-left position-relative">
            <Input
              type="hidden"
              id="UniversityId"
              name="UniversityId"
              value={univerId}
            />
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="PracticalTraining"
                  name="PracticalTraining"
                  onChange={(e) => {
                    onValueChangePracticalTraining(e);
                  }}
                  value={radioPracticalTraining}
                  defaultChecked={
                    radioPracticalTraining === "true" ? true : false
                  }
                />
                <span>Practical Training</span>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="IntershipParticipation"
                  name="IntershipParticipation"
                  onChange={(e) => {
                    onValueChangeIntershipParticipation(e);
                  }}
                  value={radioIntershipParticipation}
                  defaultChecked={
                    radioIntershipParticipation === "true" ? true : false
                  }
                />

                <span>Internship Participation</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="WorkWhileStudying"
                  name="WorkWhileStudying"
                  onChange={(e) => {
                    onValueChangeWorkWhileStudying(e);
                  }}
                  value={radioWorkWhileStudying}
                  defaultChecked={
                    radioWorkWhileStudying === "true" ? true : false
                  }
                />
                <span>Work While Studying</span>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="ConditionalOfferLetter"
                  name="ConditionalOfferLetter"
                  onChange={(e) => {
                    onValueChangeConditionalOfferLetter(e);
                  }}
                  value={radioConditionalOfferLetter}
                  defaultChecked={
                    radioConditionalOfferLetter === "true" ? true : false
                  }
                />
                <span>Conditional Offer Letter</span>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="Accommodations"
                  name="Accommodations"
                  onChange={(e) => {
                    onValueChangeAccommodations(e);
                  }}
                  value={radioAccommodations}
                  defaultChecked={radioAccommodations === "true" ? true : false}
                />
                <span>Accommodations</span>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
            {permissions?.includes(permissionList.Edit_University) && (
              <SaveButton progress={progress} />
            )}
          </FormGroup>
        </Form>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(AddUniversityFeatures);
