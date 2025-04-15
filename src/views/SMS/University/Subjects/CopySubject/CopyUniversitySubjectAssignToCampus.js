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
import post from "../../../../../helpers/post";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const CopyUniversitySubjectAssignToCampus = () => {
  const [activetab, setActivetab] = useState("7");
  const [campusList, setCampusList] = useState([]);
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [campId, setCampId] = useState(0);
  const [delCamId, setDelCamId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [assignAllModal, setAssignAllModal] = useState(false);

  const { id, subjId, newSubId } = useParams();

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    get(`SubjectCampus/index?subjectid=${newSubId}`).then((res) => {
      console.log("camp data", res);
      setCampusList(res);
    });
  }, [success]);

  const handleAssignSubjectToCampus = (e, campu) => {
    e.preventDefault();

    const subData = {
      campusId: campu?.campusId,
      subjectId: newSubId,
      isAcceptHome: homeAccept,
      isAcceptEU_UK: ukAccept,
      isAcceptInternational: intAccept,
    };

    setProgress(true);
    post("SubjectCampus/Assign", subData).then((res) => {
      setProgress(false);
      if (res?.data?.isSuccess == true && res?.status == 200) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        //   get(`UniversityCampusSubject/GetAllSubjectByCampus/${id}`).then((res) => {

        //     setMultipleSubAssign([]);
        //     setMultipleSubAssign(res);
        //   });
        get(`SubjectCampus/index?subjectid=${newSubId}`).then((res) => {
          setCampusList([]);
          setCampusList(res);
        });
        setSuccess(!success);
        setHomeAccept(false);
        setUkAccept(false);
        setIntAccept(false);
      } else {
        addToast(res?.data?.message, {
          appearance: "danger",
          autoDismiss: true,
        });
      }
    });
  };

  const handleAssignAllModal = () => {
    setAssignAllModal(true);
  };

  const closeAssignAllModal = () => {
    setAssignAllModal(false);
  };

  const handleAssignAllSubmit = () => {
    // const subData = {
    //     subjectId: subjId
    //   };

    setProgress1(true);
    get(`SubjectCampus/AssignAll?subjectId=${newSubId}`).then((res) => {
      setProgress1(false);
      console.log("assign all", res);
      if (res === true) {
        addToast("Course assigned to all campuses successfuly", {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        get(`SubjectCampus/index?subjectid=${newSubId}`).then((res) => {
          setCampusList([]);
          setCampusList(res);
        });
        setAssignAllModal(false);
      } else {
        addToast("Something went wrong", {
          appearance: "danger",
          autoDismiss: true,
        });
      }
    });
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
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
    if (tab == "5") {
      history.push(
        `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
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

  const toggleDanger = (camp) => {
    setDelCamId(camp?.campusId);
    setDeleteModal(true);
  };

  const handleDeletePermission = (campusSubjectId) => {
    setProgress2(true);
    const returnValue = get(
      `SubjectCampus/Unassign?subjectid=${newSubId}&campusid=${campusSubjectId}`
    ).then((action) => {
      console.log("del data cccc", action);
      if (action === true) {
        setProgress2(false);
        setHomeAccept(false);
        setUkAccept(false);
        setIntAccept(false);

        setDeleteModal(false);
        addToast("Course unassigned successfully", {
          appearance: "error",
          autoDismiss: true,
        });
        get(`SubjectCampus/index?subjectid=${newSubId}`).then((res) => {
          setCampusList([]);
          setCampusList(res);
        });
      } else {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
        setProgress2(false);
      }
    });
  };

  // redirect to SubjecList
  const backToSubjecList = () => {
    history.push(`/university-courses/${id}`);
  };

  const onNextPage = () => {
    history.push({
      pathname: `/copyAndAddUniversitySubjectIntake/${id}/${subjId}/${newSubId}`,
    });
  };

  const onPreviousPage = () => {
    history.push(
      `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`
    );
  };

  return (
    <div>
      <BreadCrumb
        title="Assign Course to Campus"
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
            <TabPane tabId="7">
              <div className="hedding-titel d-flex justify-content-between mb-2">
                <div className="my-3">
                  <h5>
                    {" "}
                    <b>Assign Course to Campus</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              {permissions?.includes(permissionList.Edit_Subjects) ? (
                <div className="container test-score-div-1-style mt-1 mb-4">
                  <div className="d-flex justify-content-between">
                    <span className="test-score-span-1-style my-auto">
                      Do you want to assign this subject to all campuses with
                      all application types? [not recommended]
                    </span>
                    <Button onClick={handleAssignAllModal} color="primary">
                      Assign All
                    </Button>
                  </div>
                </div>
              ) : null}

              <div className="container test-score-div-1-style mt-1 mb-4">
                <span className="test-score-span-1-style">
                  <div>
                    <span>
                      Assign an individual subject with specific application
                      types.
                    </span>
                    <div>
                      <span className="text-danger">
                        N.B : Select the checkboxes of a particular campus only.
                      </span>
                    </div>
                  </div>
                </span>
              </div>

              {/* assign all modal starts here */}
              <Modal
                isOpen={assignAllModal}
                toggle={() => setAssignAllModal(!assignAllModal)}
                // toggle={handleAssignAllModal}
                className="uapp-modal"
              >
                <ModalBody>
                  <p>Are You Sure to Assign All Courses?</p>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={handleAssignAllSubmit} color="primary">
                    {progress1 ? <ButtonLoader /> : "YES"}
                  </Button>
                  <Button color="danger" onClick={closeAssignAllModal}>
                    NO
                  </Button>
                </ModalFooter>
              </Modal>
              {/* assign all modal ends here */}

              <div className="table-responsive">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      <th>Campus Name</th>
                      <th>Application Type</th>
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campusList?.map((campus, i) => (
                      <tr key={campus?.id} style={{ textAlign: "center" }}>
                        <td>{campus?.name}</td>
                        <td>
                          <Row>
                            <Col
                              xs="4"
                              sm="12"
                              md="4"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <span className="mr-2">Home/UK </span>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  //   id={sub?.subjectId}
                                  name="isAcceptHome"
                                  // disabled={sub?.isChecked ? false : true}
                                  onChange={(e) => {
                                    setHomeAccept(false);
                                    setHomeAccept(!homeAccept);
                                    setCampId(campus?.campusId);
                                    // setSubId(sub?.subjectId);
                                    // setSubName(sub?.subjectName);
                                    // localStorage.setItem(
                                    //   "subjectIdCheck",
                                    //   sub?.subjectName
                                    // );
                                  }}
                                  defaultChecked={campus?.isAcceptHome}
                                />
                              </FormGroup>
                            </Col>

                            <Col
                              xs="4"
                              sm="12"
                              md="4"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <span className="mr-2">EU/EEU </span>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  //   id={sub?.subjectId}
                                  name="isAcceptEU_UK"
                                  // disabled={sub?.isChecked ? false : true}
                                  onChange={(e) => {
                                    setUkAccept(false);
                                    setUkAccept(!ukAccept);
                                    setCampId(campus?.campusId);
                                    // setUkAccept(e.target.checked);
                                    // setSubId(sub?.subjectId);
                                    // setSubName(sub?.subjectName);
                                    // localStorage.setItem(
                                    //   "subjectIdCheck",
                                    //   sub?.subjectName
                                    // );
                                  }}
                                  defaultChecked={campus?.isAcceptEU_UK}
                                />
                              </FormGroup>
                            </Col>

                            <Col
                              xs="4"
                              sm="12"
                              md="4"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <span className="mr-2">International </span>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  //   id={sub?.subjectId}
                                  name="isAcceptInternational"
                                  // disabled={sub?.isChecked ? false : true}
                                  onChange={(e) => {
                                    setIntAccept(false);
                                    setIntAccept(!intAccept);
                                    setCampId(campus?.campusId);
                                    // setSubName(sub?.subjectName);
                                    // localStorage.setItem(
                                    //   "subjectIdCheck",
                                    //   sub?.subjectName
                                    // );
                                  }}
                                  defaultChecked={campus?.isAcceptInternational}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </td>
                        <td style={{ width: "8%" }} className="text-center">
                          {campus?.isAssigned ? (
                            <>
                              {permissions?.includes(
                                permissionList.Edit_Subjects
                              ) ? (
                                <Button
                                  onClick={() => toggleDanger(campus)}
                                  color="danger"
                                >
                                  Unassign
                                </Button>
                              ) : null}
                            </>
                          ) : (
                            <>
                              {permissions?.includes(
                                permissionList.Edit_Subjects
                              ) ? (
                                <Button
                                  // id={sub?.subjectId}
                                  onClick={(e) =>
                                    handleAssignSubjectToCampus(e, campus)
                                  }
                                  color="primary"
                                >
                                  {progress ? <ButtonLoader /> : "Assign"}
                                </Button>
                              ) : null}
                            </>
                          )}

                          {/* subject unassign modal */}
                          <Modal
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Unassign this ? Once Unassigned
                                it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                onClick={() => handleDeletePermission(delCamId)}
                                color="danger"
                              >
                                {progress2 ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={() => setDeleteModal(false)}>
                                NO
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <div>
                  <ButtonForFunction
                    func={onPreviousPage}
                    color={"warning uapp-form-button float-right"}
                    name={"Previous Page"}
                    permission={6}
                  />
                </div>

                <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default CopyUniversitySubjectAssignToCampus;
