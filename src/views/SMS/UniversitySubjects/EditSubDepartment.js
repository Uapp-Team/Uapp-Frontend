import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
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
import get from "../../../helpers/get";

import put from "../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const EditSubDepartment = () => {
  const { id } = useParams();
  const history = useHistory();

  const [departmentList, setdepartmentList] = useState([]);
  const [departmentLabel, setdepartmentLabel] = useState("");
  const [departmentValue, setdepartmentValue] = useState(0);
  const [departmentError, setDepartmentError] = useState(false);
  const [dept, setDept] = useState({});
  const { addToast } = useToasts();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [uid, setUid] = useState();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    get(`Department/Index`).then((action) => {
      setdepartmentList(action);
    });
  }, []);

  useEffect(() => {
    get(`SubDepartment/Get/${id}`).then((res) => {
      setName(res?.name);
      setDescription(res?.description);
      setUid(res?.id);
      setDept(res);
      setdepartmentLabel(res?.departmentinfo?.name);
      setdepartmentValue(res?.departmentinfo?.id);
    });
  }, [id]);

  const departmentName = departmentList?.map((depart) => ({
    label: depart.name,
    value: depart.id,
  }));

  const selectDepartmentName = (label, value) => {
    setdepartmentLabel(label);
    setdepartmentValue(value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
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
    if (!name) {
      isFormValid = false;
      setNameError("Name is required");
    }
    if (departmentValue === 0) {
      isFormValid = false;
      setDepartmentError(true);
    }
    if (!description) {
      isFormValid = false;
      setDescriptionError("Description is required");
    }

    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      put("SubDepartment/Update", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/subDepartment");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Update Sub Department"
        backTo="Sub Department List"
        path="/subDepartment"
      />

      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <div>
            <Form onSubmit={handleSubmit}>
              <Input type="hidden" name="id" id="id" value={uid} />

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                  />

                  <span className="text-danger">{nameError}</span>
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Department <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Select
                    options={departmentName}
                    value={{ label: departmentLabel, value: departmentValue }}
                    onChange={(opt) =>
                      selectDepartmentName(opt.label, opt.value)
                    }
                    name="departmentId"
                    id="departmentId"
                  />
                  {departmentError ? (
                    <span className="text-danger">Department is required.</span>
                  ) : null}
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
                    name="description"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => handleDescription(e)}
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
                  {permissions?.includes(permissionList?.Edit_Departments) ? (
                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"mr-1 mt-3"}
                      name={progress ? <ButtonLoader /> : "Submit"}
                      permission={6}
                      isDisabled={buttonStatus}
                    />
                  ) : null}
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

export default EditSubDepartment;
