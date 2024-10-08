import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Modal,
  Form,
  Col,
  Input,
} from "reactstrap";
import get from "../../../helpers/get";
import put from "../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const EditDepartment = () => {
  const history = useHistory();
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const { addToast } = useToasts();

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [department, setdepartment] = useState("");
  const [DepartmentNameError, setDepartmentNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    get(`Department/Get/${id}`).then((res) => {
      setInfo(res);
      setdepartment(res.name);
      setDescription(res.description);
    });
  }, [id]);

  const backToDashboard = () => {
    history.push("/department");
  };

  const handleDepartmentName = (e) => {
    setdepartment(e.target.value);
    if (e.target.value === "") {
      setDepartmentNameError("Department name is required");
    } else {
      setDepartmentNameError("");
    }
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    if (e.target.value === "") {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (!department) {
      isFormValid = false;
      setDepartmentNameError("Department name is required");
    }
    if (!description) {
      isFormValid = false;
      setDescriptionError("Description name is required");
    }

    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const subData = new FormData(e.target);
    const subData = {
      id: info?.id,
      name: department,
      description: description,
    };
    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      put(`Department/Update`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/department");
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Update Department"
        backTo="Department List"
        path="/department"
      />

      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <div>
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="id" id="id" value={info.id} />

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Department Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={department}
                    onChange={(e) => {
                      handleDepartmentName(e);
                    }}
                    placeholder="Create Department"
                  />
                  <span className="text-danger">{DepartmentNameError}</span>
                </Col>
              </FormGroup>
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Description <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="textarea"
                    rows="4"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => {
                      handleDescription(e);
                    }}
                    placeholder="Add Description"
                  />
                  <span className="text-danger">{descriptionError}</span>
                </Col>
              </FormGroup>

              <FormGroup
                row
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Col md="5">
                  <CustomButtonRipple
                    color={"primary"}
                    type={"submit"}
                    className={"mr-0 mt-3"}
                    name={progress ? <ButtonLoader /> : "Submit"}
                    isDisabled={buttonStatus}
                  />
                </Col>
              </FormGroup>
            </Form>

            <div></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditDepartment;
