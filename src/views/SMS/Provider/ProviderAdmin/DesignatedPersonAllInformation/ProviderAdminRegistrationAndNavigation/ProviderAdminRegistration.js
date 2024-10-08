import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const ProviderAdminRegistration = () => {
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);
  const [nameTitleError, setNameTitleError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const { providerId } = useParams();
  const [progress, setProgress] = useState(false);
  const [activetab, setActivetab] = useState("1");

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
    });
  }, []);

  const toggle = (tab) => {
    setActivetab(tab);
  };

  const nameTitleMenu = nameTitleDD?.map((nameTitle) => ({
    label: nameTitle?.name,
    value: nameTitle?.id,
  }));

  //   select name title
  const selectNameTitle = (label, value) => {
    setNameTitleError(false);
    setNameTitleLabel(label);
    setNameTitleValue(value);
  };

  const handleEmail = (e) => {
    get(`EmailCheck/Validate/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (nameTitleValue === 0) {
      setNameTitleError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(`ProviderAdminInfo/GeneralInformation`, subdata).then((res) => {
        console.log("provider post response", res);
        setProgress(false);
        setSuccess(!success);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess == true) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setNameTitleLabel("Select Title");
          setNameTitleValue(0);

          history.push(
            `/providerAdminGeneralInfo/${providerId}/${res?.data?.result?.id}`
          );
        } else {
          addToast(res.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const backToConsultantList = () => {
    history.push("/providerList");
  };

  return (
    <div>
      <BreadCrumb
        title="Designated Person Information"
        backTo="Provider List"
        path="/providerList"
      />

      <Card>
        <CardBody>
          {/* nav tabs start */}

          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                General Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                disabled
                active={activetab === "2"}
                onClick={() => toggle("2")}
              >
                Personal Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                disabled
                active={activetab === "3"}
                onClick={() => toggle("3")}
              >
                Contact Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                disabled
                active={activetab === "4"}
                onClick={() => toggle("4")}
              >
                Eligibility
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                disabled
                active={activetab === "4"}
                onClick={() => toggle("4")}
              >
                Terms & Condition
              </NavLink>
            </NavItem>
          </Nav>

          {/* nav tabs end */}

          <Form onSubmit={handleSubmit} className="mt-5">
            <input type="hidden" name="providerId" value={providerId} />
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Title <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitleMenu}
                  value={{
                    label: nameTitleLabel,
                    value: nameTitleValue,
                  }}
                  onChange={(opt) => selectNameTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                />

                {nameTitleError ? (
                  <span className="text-danger">Title is required</span>
                ) : null}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  First Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Last Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Email <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  onBlur={handleEmail}
                />

                {!emailError ? (
                  <span className="text-danger">Email already exists</span>
                ) : null}
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <Button
                  onClick={backToConsultantList}
                  className="mt-3 mr-1"
                  color="danger"
                >
                  Cancel
                </Button>

                <ButtonForFunction
                  type={"submit"}
                  className={"mt-3 ml-1"}
                  color={"primary"}
                  name={progress ? <ButtonLoader /> : "Save"}
                  disable={buttonStatus}
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAdminRegistration;
