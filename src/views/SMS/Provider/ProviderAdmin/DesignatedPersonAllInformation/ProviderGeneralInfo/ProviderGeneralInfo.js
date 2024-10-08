import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";

import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";
import post from "../../../../../../helpers/post";
import get from "../../../../../../helpers/get";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import ProviderAdminNavigation from "../ProviderAdminRegistrationAndNavigation/ProviderAdminNavigation";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const ProviderGeneralInfo = () => {
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);
  const [nameTitleError, setNameTitleError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [data, setData] = useState({});
  const [activetab, setActivetab] = useState("1");
  const { providerId, providerAdminId } = useParams();
  const userTypeId = localStorage.getItem("userType");

  console.log("providerAdminId", providerAdminId);
  console.log("providerId", providerId);

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
    });

    get(`ProviderAdminInfo/GetGeneralInformation/${providerAdminId}`).then(
      (res) => {
        console.log("dataaa", res);
        setData(res);
        setNameTitleValue(res?.nameTittle?.id);
        setNameTitleLabel(res?.nameTittle?.name);
      }
    );
  }, [success]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (nameTitleValue === 0) {
      setNameTitleError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      console.log("submitted");
      setButtonStatus(true);
      setProgress(true);
      post(`ProviderAdminInfo/GeneralInformation`, subdata).then((res) => {
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
        } else {
          addToast(res.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const goNext = () => {
    history.push(`/providerAdminPersonalInfo/${providerId}/${providerAdminId}`);
  };

  const onGoUniProfile = () => {
    history.push(`/providerAdminProfile/${providerAdminId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Designated Person Information"
        backTo="Provider Admin Profile"
        path={`/providerAdminProfile/${providerAdminId}`}
      />

      <Card>
        <CardBody>
          {/* nav tabs start */}

          <ProviderAdminNavigation
            activetab={activetab}
            providerId={providerId}
            providerAdminId={providerAdminId}
          />

          {/* nav tabs end */}

          <Form onSubmit={handleSubmit} className="mt-5">
            <input type="hidden" name="email" value={data?.email} />
            <input type="hidden" name="id" value={providerAdminId} />
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
                  defaultValue={data?.firstName}
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
                  defaultValue={data?.lastName}
                />
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
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

          <div className="d-flex justify-content-end">
            <Button.Ripple onClick={goNext} className="mr-1 mt-3 btn-warning">
              Next
              <i className="fas fa-arrow-right-long ml-1"></i>
            </Button.Ripple>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderGeneralInfo;
