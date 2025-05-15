import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import post from "../../../../helpers/post";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddEducationLevel = () => {
  const { name, description, levelValue, id } = useParams();

  const history = useHistory();
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);

  // back to dashboard

  const backToEducationLevelList = () => {
    history.push("/educationalLevelList");
  };

  // Submit Form Data

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (
      name !== undefined &&
      description !== undefined &&
      levelValue !== undefined &&
      id !== undefined
    ) {
      setButtonStatus(true);
      put(`EducationLevel/Update`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/educationalLevelList");
        }
      });
    } else {
      setButtonStatus(true);
      post(`EducationLevel/Create`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/educationalLevelList");
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Education Level"
        backTo="Education Level List"
        path="/educationalLevelList"
      />

      {/* Card Containing Form for Data Submit */}

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit} className="mt-5">
            {name !== undefined &&
            description !== undefined &&
            levelValue !== undefined &&
            id !== undefined ? (
              <input type="hidden" name="id" id="id" value={id} />
            ) : null}

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
                  placeholder="Enter Name"
                  required
                  defaultValue={name}
                />
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
                  rows={8}
                  placeholder="Enter Description"
                  defaultValue={description}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Level value <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="number"
                  name="levelValue"
                  id="levelValue"
                  placeholder="Enter Level Value"
                  required
                  defaultValue={levelValue}
                />
              </Col>
            </FormGroup>

            <FormGroup
              row
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <Col md="6">
                <Button
                  color="danger"
                  className="mt-3 mr-1"
                  onClick={() => history.push(`/educationalLevelList`)}
                >
                  Cancel
                </Button>

                <ButtonForFunction
                  type={"submit"}
                  name={"Submit"}
                  className={"ml-1 mt-3 badge-primary"}
                  disable={buttonStatus}
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddEducationLevel;
