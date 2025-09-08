import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  UncontrolledTooltip,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonLoader from "../../Components/ButtonLoader";
import { userTypes } from "../../../../constants/userTypeConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { event } from "jquery";

const Create = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantError, setConsultantError] = useState("");
  const [amount, setAmount] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [amountInputError, setAmountInputError] = useState("");
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    if (userType == userTypes?.Consultant) {
      get(
        `Balance/ConsultantBalance/${localStorage.getItem("referenceId")}`
      ).then((res) => {
        setAmount(res);
      });
    } else {
      get(`Balance/ConsultantBalance/${consultantValue}`).then((res) => {
        setAmount(res);
      });
    }
  }, [success, consultantValue]);

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantError("");
    setConsultantLabel(label);
    setConsultantValue(value);
    setAmountInputError("");
    setAmount(null);
  };

  const handleInputAmount = (e) => {
    setAmountInput(e.target.value);
    if (e.target.value < 50) {
      setAmountInputError("Minimum withdraw limit is £ 50.");
    } else if (e.target.value > amount) {
      setAmountInputError(
        "you don't have sufficient balance to complete the transaction."
      );
    } else {
      setAmountInputError("");
    }
  };

  const handleSubmit = (event) => {
    setProgress(true);
    event.preventDefault();
    const subData = new FormData(event.target);
    if (userType == userTypes?.Consultant) {
      setButtonStatus(true);
      post(`WithdrawRequest/Create`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setConsultantLabel("Select Consultant");
          setConsultantValue(0);
          setAmountInput("");
          history.push("/withdrawRequestList");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      if (consultantValue == 0) {
        setConsultantError("Consultant Must be Selected");
      } else {
        setButtonStatus(true);
        post(`WithdrawRequest/Create`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setConsultantLabel("Select Consultant");
            setConsultantValue(0);
            setAmountInput("");
            history.push("/withdrawRequestList");
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Create Withdraw Request"
        backTo="Withdraw List"
        path={`/withdrawRequestList`}
      />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={handleSubmit}>
                {userType == userTypes?.Consultant ? (
                  <input
                    type="hidden"
                    name="consultantId"
                    id="consultandId"
                    value={localStorage.getItem("referenceId")}
                  />
                ) : (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Select Consultant <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Select
                        options={consultantOptions}
                        value={{
                          label: consultantLabel,
                          value: consultantValue,
                        }}
                        onChange={(opt) =>
                          selectConsultant(opt.label, opt.value)
                        }
                        name="consultantId"
                        id="consultantId"
                      />
                      <span className="text-danger">{consultantError}</span>
                    </Col>
                  </FormGroup>
                )}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Amount <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Enter Amount"
                      required
                      onChange={(e) => {
                        handleInputAmount(e);
                      }}
                    />
                    <span className="text-danger">{amountInputError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="10">
                    <div className="d-flex justify-content-end">
                      <Button
                        color="primary"
                        type="submit"
                        disabled={
                          amountInput < 50 ||
                          amountInput > amount ||
                          amountInput == isNaN(amountInput) ||
                          buttonStatus
                            ? true
                            : false
                        }
                      >
                        {progress ? <ButtonLoader /> : "Submit"}
                      </Button>
                    </div>
                  </Col>
                </FormGroup>
              </form>
            </div>

            <div className="col-md-3">
              <div className="d-flex justify-content-end">
                <h5>Balance Available to Withdraw</h5>
              </div>
              <br />
              <h2 className="text-center text-blue">&#xA3; {amount}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div>
                <ul>
                  <li>
                    <span style={{ fontWeight: "500" }}>
                      Minimum withdraw limit is &#xA3; 50{" "}
                    </span>
                  </li>

                  <li>
                    <span style={{ fontWeight: "500" }}>
                      You can have only one withdraw request at a time
                    </span>
                  </li>

                  <li>
                    <span style={{ fontWeight: "500" }}>
                      Deposit to your withdrawal account may take upto 7
                      business days
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Create;
