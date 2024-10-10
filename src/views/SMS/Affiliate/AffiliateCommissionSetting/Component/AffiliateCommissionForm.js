import React, { useState } from "react";
import { FormGroup, Input, Col } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CancelButton from "../../../../../components/buttons/CancelButton";
const AffiliateCommissionForm = (props) => {
  const {
    success,
    setSuccess,
    name,
    setName,
    percent,
    setPercent,
    data,
    setData,
    nameError,
    setNameError,
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
  // const handleLevelValue = (e) => {
  //   const newValue = e.target.value;
  //   const isNumeric = /^\d+$/.test(newValue);
  //   setValue(newValue);

  //   if (!newValue) {
  //     setValueError("Level Value is required");
  //   } else if (!isNumeric) {
  //     setValueError("Input must contain only numbers.");
  //   } else {
  //     setValueError("");
  //   }
  // };

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

    // if (!/^\d+$/.test(value)) {
    //   isFormValid = false;
    //   setValueError("Input must contain only numbers.");
    // }

    // if (!value) {
    //   isFormValid = false;
    //   setValueError("Level value is required");
    // }

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
      setButtonStatus(true);
      setProgress(true);
      post(`AffiliateCommissionSetting/save`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.title, {
            appearance: "success",
            autoDismiss: true,
          });
          setData();
          setName("");
          setPercent("");
          setSuccess(!success);
          setNameError("");
          setPercentError("");
        }
      });
      // }
    }
  };
  const handleClear = () => {
    setData();
    setName("");
    setPercent("");
    setNameError("");
    setPercentError("");
  };

  return (
    <div>
      <p className="section-title">
        {" "}
        {data?.id ? "Edit" : "Add"} Affiliate Commission Group
      </p>

      <form onSubmit={handleSubmit}>
        {data?.id ? (
          <input type="hidden" name="id" id="id" value={data?.id} />
        ) : null}

        <FormGroup row>
          <Col md="9">
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Group Name
              </span>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  handleLevelName(e);
                }}
              />
              <span className="text-danger">{nameError}</span>
            </FormGroup>
            {/* <FormGroup>
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
            </FormGroup> */}
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Commission Amount
              </span>
              <Input
                type="text"
                name="amount"
                id="amount"
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

export default AffiliateCommissionForm;
