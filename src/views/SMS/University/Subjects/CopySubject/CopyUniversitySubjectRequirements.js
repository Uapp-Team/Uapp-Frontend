import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  NavItem,
  NavLink,
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import get from "../../../../../helpers/get";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const CopyUniversitySubjectRequirements = () => {
  const [activetab, setActivetab] = useState("5");
  const [eduLevelDD, setEduLevelDD] = useState([]);
  const [eduLabel, setEduLabel] = useState("Select Education Level");
  const [eduValue, setEduValue] = useState(0);
  const [eduError, setEduError] = useState(false);
  const [requiredRes, setRequiredRes] = useState("");
  const [requiredId, setRequiredId] = useState(0);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { id, subjId, newSubId } = useParams();

  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEduLevelDD(res);
    });

    get(`SubjectRequirement/GetBySubject/${newSubId}`).then((res) => {
      setEduLabel(
        res?.id != undefined
          ? res?.educationLevel?.name
          : "Select Education Level"
      );
      setEduValue(res?.id != undefined ? res?.educationLevel?.id : 0);
      setRequiredId(res?.id);
      setRequiredRes(res?.requiredResultInPercent);
    });
  }, [newSubId]);

  const eduLevelMenu = eduLevelDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

  const selectEduLevel = (label, value) => {
    setEduError(false);
    setEduLabel(label);
    setEduValue(value);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToSubjecList = () => {
    history.push(`/university-courses/${id}`);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/copyAndAddUniversitySubject/${id}/${subjId}/${newSubId}`);
    }
    if (tab == "2") {
      history.push(
        `/copyAndAddUniversitySubjectFee/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "3") {
      history.push(
        `/copyAndAddUniversitySubjectDeliveryPattern/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "4") {
      history.push(
        `/copyAndAddUniversitySubjectTestScore/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "6") {
      history.push(
        `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "7") {
      history.push(
        `/copyAddUniversitySubjectAssignToCampus/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "8") {
      history.push(
        `/copyAndAddUniversitySubjectIntake/${id}/${subjId}/${newSubId}`
      );
    }
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
    }

    if (eduValue === 0) {
      setEduError(true);
    } else {
      if (requiredId != undefined) {
        setButtonStatus(true);
        setProgress(true);
        Axios.put(`${rootUrl}SubjectRequirement/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}SubjectRequirement/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`,
            });
          }
        });
      }
    }
  };

  // redirect to Next Page
  const onNextPage = () => {
    history.push({
      pathname: `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`,
    });
  };

  const onPreviousPage = () => {
    history.push(
      `/copyAndAddUniversitySubjectDeliveryPattern/${id}/${subjId}/${newSubId}`
    );
  };

  return (
    <div>
      <BreadCrumb
        title="subject Requirement"
        backTo="University Course"
        path={`/university-courses/${id}`}
      />

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Course Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Course Fee Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Delivery Pattern
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Test Score
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Document Requirement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Campus
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Intake
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="5">
              <Form onSubmit={handleSubmit} className="mt-5">
                <Input
                  type="hidden"
                  id="subjectId"
                  name="subjectId"
                  value={newSubId}
                />

                <Input type="hidden" id="id" name="id" value={requiredId} />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Education Level <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={eduLevelMenu}
                      value={{ label: eduLabel, value: eduValue }}
                      onChange={(opt) => selectEduLevel(opt.label, opt.value)}
                      name="educationLevelId"
                      id="educationLevelId"
                      placeholder="Select Education Level"
                    />

                    {eduError && (
                      <span className="text-danger">
                        Education level is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Required Result In Percent{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      id="requiredResultInPercent"
                      name="requiredResultInPercent"
                      defaultValue={requiredRes}
                      placeholder="Write Required Result"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-3 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      permission={6}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                />
                <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default CopyUniversitySubjectRequirements;
