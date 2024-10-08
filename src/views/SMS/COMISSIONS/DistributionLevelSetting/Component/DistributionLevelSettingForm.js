import React, { useState } from "react";
import { Button, FormGroup, Input, Col } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CancelButton from "../../../../../components/buttons/CancelButton";
const DistributionLevelSettingForm = (props) => {
  const {
    success,
    setSuccess,
    name,
    setName,
    value,
    setValue,
    percent,
    setPercent,
    update,
    setUpdate,
    data,
    setData,
    nameError,
    setNameError,
    valueError,
    setValueError,
    percentError,
    setPercentError,
  } = props;

  const { addToast } = useToasts();

  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);

  const handleLevelName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Level Name is required");
    } else {
      setNameError("");
    }
  };
  const handleLevelValue = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setValue(newValue);

    if (!newValue) {
      setValueError("Level Value is required");
    } else if (!isNumeric) {
      setValueError("Input must contain only numbers.");
    } else {
      setValueError("");
    }
  };

  const handleCommissionPercent = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setPercent(newValue);

    if (!newValue) {
      setPercentError("commission Percent is required");
    } else if (!isNumeric) {
      setPercentError("Input must contain only numbers.");
    } else {
      setPercentError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!name) {
      isFormValid = false;
      setNameError("Level Name is required");
    }

    if (!/^\d+$/.test(value)) {
      isFormValid = false;
      setValueError("Input must contain only numbers.");
    }

    if (!value) {
      isFormValid = false;
      setValueError("Level value is required");
    }

    if (!/^\d+$/.test(percent)) {
      isFormValid = false;
      setPercentError("Input must contain only numbers.");
    }

    if (!percent) {
      isFormValid = false;
      setPercentError("Commission Percent is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid) {
      if (data?.id) {
        setButtonStatus(true);
        setProgress(true);
        put(`DistributionLevelSetting/Update`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setName("");
            setValue("");
            setPercent("");
            setSuccess(!success);
            setData({});
            setUpdate(false);
            setNameError("");
            setValueError("");
            setPercentError("");
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`DistributionLevelSetting/Create`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setName("");
            setValue("");
            setPercent("");
            setSuccess(!success);
            setNameError("");
            setValueError("");
            setPercentError("");
          }
        });
      }
    }
  };
  const handleClear = () => {
    setData();
    setName("");
    setValue("");
    setPercent("");
    setNameError("");
    setValueError("");
    setPercentError("");
  };

  return (
    <div>
      <p className="section-title">
        {" "}
        {data?.id ? "Edit" : "Add"} Distribution Level Settings
      </p>

      <form onSubmit={handleSubmit}>
        {data?.id ? (
          <input type="hidden" name="id" id="id" value={data?.id} />
        ) : null}

        <FormGroup row className="has-icon-left position-relative">
          <Col md="9">
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Level Name
              </span>
              <Input
                type="text"
                name="levelName"
                id="levelName"
                value={name}
                onChange={(e) => {
                  handleLevelName(e);
                }}
              />
              <span className="text-danger">{nameError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Level Value
              </span>
              <Input
                type="text"
                name="levelValue"
                id="levelValue"
                value={value}
                onChange={(e) => {
                  handleLevelValue(e);
                }}
              />
              <span className="text-danger">{valueError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Commission Percent
              </span>
              <Input
                type="text"
                name="commissionPercent"
                id="commissionPercent"
                value={percent}
                onChange={(e) => {
                  handleCommissionPercent(e);
                }}
              />
              <span className="text-danger">{percentError}</span>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end mt-3">
              {permissions?.includes(
                permissionList.Configure_CommissionStucture
              ) ? (
                <>
                  <CancelButton cancel={handleClear} text="Clear" />
                  <SaveButton
                    text="Submit"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </>
              ) : null}
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    </div>
  );
};

export default DistributionLevelSettingForm;
