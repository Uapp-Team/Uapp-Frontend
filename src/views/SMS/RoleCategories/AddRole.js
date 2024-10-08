import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  FormGroup,
  Col,
} from "reactstrap";
import Select from "react-select";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../components/buttons/PreviousButton";
import SaveButton from "../../../components/buttons/SaveButton";

const AddRole = () => {
  const history = useHistory();
  const [role, setRole] = useState([]);
  const [roleLabel, setRoleLabel] = useState("Select Parent Role");
  const [roleValue, setRoleValue] = useState(0);
  const [roleError, setRoleError] = useState(false);
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    get(`RoleDD/Index`).then((res) => {
      setRole(res);
    });
  }, []);

  const backToDashboard = () => {
    history.push("/");
  };

  const roleOptions = role?.map((r) => ({
    label: r?.name,
    value: r?.id,
  }));

  const SelectRole = (label, value) => {
    setRoleError(false);
    console.log(value);
    setRoleLabel(label);
    setRoleValue(value);
  };
  const handleRoleName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Role Name is Required");
    } else {
      setNameError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (roleValue === 0) {
      isFormValid = false;
      setRoleError(true);
    }
    if (!name) {
      isFormValid = false;
      setNameError("Role Name is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid) {
      post(`Role/Create`, subData).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: "true",
          });
          setRoleLabel("Select Parent Role");
          setRoleValue("");
          setName("");
          history.push(`/roleItems`);
        } else {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: "error",
          });
        }
      });
    }
  };

  const handlePrevious = () => {
    history.push(`/roleItems`);
  };

  return (
    <div>
      <BreadCrumb title="Add Role Item" backTo="" path="/" />
      <Card>
        <CardBody>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="hedding-titel d-flex justify-content-between">
                <div>
                  <h5>
                    {" "}
                    <b>Add Role Item</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-2">
                  Parent Role<span className="text-danger">*</span>
                </div>

                <div className="col-md-6">
                  <Select
                    options={roleOptions}
                    value={{ label: roleLabel, value: roleValue }}
                    onChange={(opt) => SelectRole(opt.label, opt.value)}
                    name="parentId"
                    id="parentId"
                  />
                  {roleError && (
                    <span className="text-danger">Parent Role is required</span>
                  )}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-2">
                  Role Name <span className="text-danger">*</span>
                </div>

                <div className="col-md-6">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Role Name"
                    value={name}
                    onChange={(e) => {
                      handleRoleName(e);
                    }}
                  />
                  <span className="text-danger">{nameError}</span>
                </div>
              </div>

              <FormGroup row>
                <Col md="6" className="mt-4 d-flex justify-content-between">
                  <PreviousButton action={handlePrevious} />
                  <SaveButton text="Save and Next" />
                </Col>
              </FormGroup>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddRole;
