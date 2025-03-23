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
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { rootUrl } from "../../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const CopyUniversitySubjectDocumentRequirement = () => {
  const [activetab, setActivetab] = useState("6");
  const [docuDD, setDocuDD] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Document Group");
  const [docuValue, setDocuValue] = useState(0);
  const [docuError, setDocuError] = useState(false);
  const [applicationTypeDD, setApplicationTypeDD] = useState([]);
  const [appliLabel, setAppliLabel] = useState("Select Application type");
  const [appliValue, setAppliValue] = useState(0);
  const [appliError, setAppliError] = useState(false);
  const [documentGrpList, setDocumentGrpList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delRequiredDocuId, setDelRequiredDocuId] = useState(0);
  const [delRequiredDocuName, setDelRequiredDocuName] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const { id, subjId, newSubId } = useParams();

  useEffect(() => {
    get("DocumentGroupDD/Index").then((res) => {
      setDocuDD(res);
    });
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeDD(res);
    });
    get(`SubjectDocumentRequirement/GetBySubject/${newSubId}`).then((res) => {
      setDocumentGrpList(res);
    });
  }, [newSubId, success]);

  const DocumentGroupMenu = docuDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));
  const ApplicationMenu = applicationTypeDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

  const selectDocumentGroup = (label, value) => {
    setDocuError(false);
    setDocuLabel(label);
    setDocuValue(value);
  };
  const selectApplicationType = (label, value) => {
    setAppliError(false);
    setAppliLabel(label);
    setAppliValue(value);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToSubjecList = () => {
    history.push(`/universitySubjectList/${id}`);
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

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
    }

    if (docuValue === 0) {
      setDocuError(true);
    }
    // else if (appliValue === 0) {
    //   setAppliError(true);
    // }
    else {
      if (update != 0) {
        setButtonStatus(true);
        setProgress1(true);
        Axios.put(`${rootUrl}SubjectDocumentRequirement/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          setProgress1(false);

          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setSuccess(!success);
            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            setUpdate(0);
            // history.push({
            //   pathname: "/subjectList",
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            setUpdate(0);
          }
        });
      } else {
        setButtonStatus(true);
        setProgress1(true);
        Axios.post(`${rootUrl}SubjectDocumentRequirement/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          setProgress1(false);

          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setSuccess(!success);
            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
            // history.push({
            //   pathname: "/subjectList",
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setDocuLabel("Select Document Group");
            setDocuValue(0);
            setAppliLabel("Select Application type");
            setAppliValue(0);
          }
        });
      }
    }
  };

  // const handleUpdate = (document) => {

  //   setUpdate(document?.id);
  //   setDocuLabel(document?.documentGroup?.title);
  //   setDocuValue(document?.documentGroup?.id);
  //   setAppliLabel(
  //     document?.applicationTypeId === 1
  //       ? "Home/UK"
  //       : document?.applicationTypeId === 2
  //       ? "EU/EEU"
  //       : "International"
  //   );
  //   setAppliValue(document?.applicationTypeId);
  // };

  const toggleDanger = (document) => {
    setDelRequiredDocuName(document?.documentGroup?.title);
    setDelRequiredDocuId(document?.id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelRequiredDocuName("");
    setDelRequiredDocuId(0);
  };

  const handleDeleteDocuRequired = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    const returnValue = remove(`SubjectDocumentRequirement/Delete/${id}`).then(
      (action) => {
        setButtonStatus1(false);
        setProgress(false);
        setDeleteModal(false);
        setSuccess(!success);
        //
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelRequiredDocuName("");
        setDelRequiredDocuId(0);
      }
    );
  };

  const onNextPage = () => {
    history.push({
      pathname: `/copyAddUniversitySubjectAssignToCampus/${id}/${subjId}/${newSubId}`,
    });
  };

  const onPreviousPage = () => {
    history.push(
      `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
    );
  };

  const redirectToSubjectProfile = () => {
    history.push({
      pathname: `/subjectProfile/${newSubId}`,
      unnniId: id,
    });
  };

  return (
    <div>
      <BreadCrumb
        title="subject Document Requirement"
        backTo="University Course"
        path={`/universitySubjectList/${id}`}
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
            <TabPane tabId="6">
              <div className="row mt-5">
                <div className="col-6">
                  <div className="hedding-titel d-flex justify-content-between mb-2">
                    <div>
                      <h5>
                        {" "}
                        <b>Add Document Required</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <Form onSubmit={handleSubmit} className="">
                    {update != 0 ? (
                      <Input type="hidden" id="id" name="id" value={update} />
                    ) : null}
                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="subjectId"
                        name="subjectId"
                        value={newSubId}
                      />
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Document Group <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={DocumentGroupMenu}
                          value={{ label: docuLabel, value: docuValue }}
                          onChange={(opt) =>
                            selectDocumentGroup(opt.label, opt.value)
                          }
                          name="documentGroupId"
                          id="documentGroupId"
                        />

                        {docuError && (
                          <span className="text-danger">
                            Document group is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    {/* <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={ApplicationMenu}
                          value={{ label: appliLabel, value: appliValue }}
                          onChange={(opt) =>
                            selectApplicationType(opt.label, opt.value)
                          }
                          name="applicationTypeId"
                          id="applicationTypeId"
                        />

                        {appliError && (
                          <span className="text-danger">
                            Application type is required
                          </span>
                        )}
                      </Col>
                    </FormGroup> */}

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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

                      <ButtonForFunction
                        type={"submit"}
                        className={"mt-3 badge-primary"}
                        name={progress1 ? <ButtonLoader /> : "Save"}
                        permission={6}
                        disable={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-6">
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Document Requirement List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>

                  {documentGrpList < 1 ? (
                    <div>No data available</div>
                  ) : (
                    <div className="table-responsive">
                      <Table className="table-sm table-bordered">
                        <thead className="thead-uapp-bg">
                          <tr style={{ textAlign: "center" }}>
                            {/* <th>SL/NO</th> */}
                            <th>Document Group</th>
                            <th className="text-center">Application Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentGrpList?.map((document, i) => (
                            <tr
                              key={document.id}
                              style={{ textAlign: "center" }}
                            >
                              {/* <th scope="row">{i + 1}</th> */}
                              <td>{document?.documentGroup?.title}</td>
                              <td className="text-center">
                                {document?.applicationTypeId === 1
                                  ? "Home/UK"
                                  : document?.applicationTypeId === 2
                                  ? "EU/EEU"
                                  : "International"}
                              </td>
                              <td>
                                <ButtonGroup>
                                  {/* <ButtonForFunction
                                func={() => handleUpdate(document)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              /> */}
                                  <ButtonForFunction
                                    className={"mx-1 btn-sm"}
                                    func={() => toggleDanger(document)}
                                    color={"danger"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                </ButtonGroup>

                                <Modal
                                  isOpen={deleteModal}
                                  toggle={closeDeleteModal}
                                  className="uapp-modal"
                                >
                                  <ModalBody>
                                    <p>
                                      Are You Sure to Delete this{" "}
                                      <b>{delRequiredDocuName}</b> ? Once
                                      Deleted it can't be Undone!
                                    </p>
                                  </ModalBody>

                                  <ModalFooter>
                                    <Button
                                      disabled={buttonStatus1}
                                      color="danger"
                                      onClick={() =>
                                        handleDeleteDocuRequired(
                                          delRequiredDocuId
                                        )
                                      }
                                    >
                                      {progress ? <ButtonLoader /> : "YES"}
                                    </Button>
                                    <Button onClick={closeDeleteModal}>
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
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between">
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
                {/* <div className="d-flex justify-content-end">
                <Link to={`/universitySubjectList/${id}`}>
                <Button color="primary" className="mr-2">
                    Go to University Course List
                  
                </Button></Link>

                 
               
               <ButtonForFunction
                  func={redirectToSubjectProfile}
                  color={"primary"}
                  name={"Go to Course Profile"}
                  permission={6}
                />

              </div> */}
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default CopyUniversitySubjectDocumentRequirement;
