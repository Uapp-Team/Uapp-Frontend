import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import get from "../../../../../helpers/get";
import { FormGroup, Input } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";

const TeamCommission = () => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);
  const [percent, setPercent] = useState("");
  const [percentError, setPercentError] = useState("");
  const [registrationAmount, setregistrationAmount] = useState(0.0);
  const [registrationAmounttError, setregistrationAmountError] = useState("");

  useEffect(() => {
    get(`AffiliateTeamCommission`).then((res) => {
      console.log(res);
      setPercent(res?.percentage);
      setregistrationAmount(res?.registrationAmount);
    });
  }, [success]);

  const handleCommissionPercent = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+(\.\d+)?$/.test(newValue);
    setPercent(newValue);

    if (!newValue) {
      setPercentError("commission Percent is required");
    } else if (!isNumeric) {
      setPercentError("Input must contain only numbers.");
    } else if (newValue >= 100) {
      setPercentError("Input percentage must be below 100");
    } else {
      setPercentError("");
    }
  };
  const handleregistrationAmount = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+(\.\d+)?$/.test(newValue);
    setregistrationAmount(newValue);

    if (!newValue) {
      setregistrationAmountError("commission Percent is required");
    } else if (!isNumeric) {
      setregistrationAmountError("Input must contain only numbers.");
    } else {
      setregistrationAmountError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!percent) {
      isFormValid = false;
      setPercentError("Commission Percent is required");
    }

    if (!/^\d+(\.\d+)?$/.test(percent)) {
      isFormValid = false;
      setPercentError("Input must contain only numbers.");
    }
    if (percent >= 100) {
      isFormValid = false;
      setPercentError("Input percentage must be below 100");
    }

    if (!registrationAmount) {
      isFormValid = false;
      setregistrationAmountError("Commission Percent is required");
    }

    if (!/^\d+(\.\d+)?$/.test(registrationAmount)) {
      isFormValid = false;
      setregistrationAmountError("Input must contain only numbers.");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post(`AffiliateTeamCommission`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <div className="w-50">
      <p className="section-title">Configure Team Commission Setting</p>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <span>
            <span className="text-danger">*</span>
            Commission Amount In percent(%)
          </span>
          <Input
            type="number"
            name="percentage"
            id="percentage"
            value={percent}
            onChange={(e) => {
              handleCommissionPercent(e);
            }}
          />
          <span className="text-danger">{percentError}</span>
        </FormGroup>
        <FormGroup>
          <span>
            <span className="text-danger">*</span>
            Lead to student Amount
          </span>
          <Input
            type="number"
            name="registrationAmount"
            id="registrationAmount"
            value={registrationAmount}
            onChange={(e) => {
              handleregistrationAmount(e);
            }}
          />
          <span className="text-danger">{registrationAmounttError}</span>
        </FormGroup>{" "}
        <SaveButton
          text="Submit"
          progress={progress}
          buttonStatus={buttonStatus}
        />
      </form>
    </div>
  );
};

export default TeamCommission;
