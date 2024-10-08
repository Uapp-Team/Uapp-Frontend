import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  TabContent,
  TabPane,
  Row,
  Button,
  ModalFooter,
  ModalBody,
  Modal,
  Table,
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../../constants/constants";

import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import ButtonLoader from "../../Components/ButtonLoader";
import SubjectNavbar from "./Components/SubjectNavbar";
import remove from "../../../../helpers/remove";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const AddUniversitySubjectRequirements = () => {
  const activetab = "4";
  const [eduLevelDD, setEduLevelDD] = useState([]);
  const [eduLabel, setEduLabel] = useState("Select Education Level");
  const [eduValue, setEduValue] = useState(0);
  const [eduError, setEduError] = useState(false);
  const [requiredRes, setRequiredRes] = useState("");
  const [isEducationRequired, setIsEducationRequired] = useState(false);
  const [requiredId, setRequiredId] = useState(0);

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
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [delRequiredDocuId, setDelRequiredDocuId] = useState(0);
  const [delRequiredDocuName, setDelRequiredDocuName] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const history = useHistory();

  const [document, setDocument] = useState([]);
  const [docLabel, setDocLabel] = useState("Select Document");
  const [docValue, setDocValue] = useState(0);
  const [docError, setDocError] = useState("");
  const [docList, setDocList] = useState([]);
  const [mand, setMand] = useState(false);

  const { id, subjId } = useParams();
  const [delData, setDelData] = useState({});
  const [resultInPercent, setResultInPercent] = useState("");
  const [resultInPercentError, setResultInPercentError] = useState("");

  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEduLevelDD(res);
    });

    get(`SubjectRequirement/GetBySubject/${subjId}`).then((res) => {
      console.log(res);
      setIsEducationRequired(res?.isEducationRequired);
      setEduLabel(
        res?.id !== undefined
          ? res?.educationLevel?.name
          : "Select Education Level"
      );
      setEduValue(res?.id !== undefined ? res?.educationLevel?.id : 0);
      setRequiredId(res?.id);
      setResultInPercent(res?.requiredResultInPercent);
    });
  }, [subjId]);
  useEffect(() => {
    get("DocumentGroupDD/Index").then((res) => {
      setDocuDD(res);
    });
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeDD(res);
    });
    get(`SubjectDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      setDocumentGrpList(res);
    });

    get(`AdditionalDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      setDocList(res);
    });

    get(`DocumentDD/Index`).then((res) => {
      setDocument(res);
    });
  }, [subjId, success]);
  const eduLevelMenu = eduLevelDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  const DocumentGroupMenu = docuDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  const DocumentOptions = document.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));
  const ApplicationMenu = applicationTypeDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  const selectDocumentGroup = (label, value) => {
    setDocuError(false);
    setDocuLabel(label);
    setDocuValue(value);
  };

  const selectDocument = (label, value) => {
    setDocError("");
    setDocLabel(label);
    setDocValue(value);
  };
  const selectApplicationType = (label, value) => {
    setAppliError(false);
    setAppliLabel(label);
    setAppliValue(value);
  };

  const selectEduLevel = (label, value) => {
    setEduError(false);
    setEduLabel(label);
    setEduValue(value);
  };

  const { addToast } = useToasts();

  const AuthStr = localStorage.getItem("token");

  const handleResultInPercent = (e) => {
    setResultInPercent(e.target.value);
    if (e.target.value === "") {
      setResultInPercentError("Result In Percent is required");
    } else {
      setResultInPercentError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (isEducationRequired === true) {
      if (eduValue === 0) {
        isFormValid = false;
        setEduError(true);
      }
      if (!resultInPercent) {
        isFormValid = false;
        setResultInPercentError("Result In Percent is required");
      }
    }

    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isEducationRequired", isEducationRequired);
    // for (var value of subdata) {
    // }
    var formIsValid = validateRegisterForm();

    if (formIsValid) {
      if (requiredId !== undefined) {
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
          }
        });
      }
    }
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    // for (var value of subdata) {
    // }

    if (docuValue === 0) {
      setDocuError(true);
    }
    // else if (appliValue === 0) {
    //   setAppliError(true);
    // }
    else {
      if (update !== 0) {
        setButtonStatus1(true);
        setProgress1(true);
        Axios.put(`${rootUrl}SubjectDocumentRequirement/Update`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus1(false);
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

  const validateRegisterForm3 = () => {
    var isFormValid = true;
    if (docValue === 0) {
      isFormValid = false;
      setDocError("Document is required");
    }
    if (appliValue === 0) {
      isFormValid = false;
      setAppliError(true);
    }

    return isFormValid;
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isMandatory", mand);
    var formIsValid = validateRegisterForm3(subdata);

    if (formIsValid) {
      setButtonStatus(true);
      setProgress2(true);
      Axios.post(`${rootUrl}AdditionalDocumentRequirement/Create`, subdata, {
        headers: {
          "Content-Type": "application/json",
          authorization: AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        setProgress2(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setSuccess(!success);
          setDocLabel("Select Document");
          setDocValue(0);
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

          setDocLabel("Select Document");
          setDocValue(0);
          setAppliLabel("Select Application type");
          setAppliValue(0);
        }
      });
    }
  };

  const toggleDanger = (document) => {
    setDelRequiredDocuName(document?.documentGroup?.title);
    setDelRequiredDocuId(document?.id);
    console.log(document);
    setDeleteModal(true);
  };

  const toggleDanger2 = (document) => {
    setDeleteModal2(true);
    setDelData(document);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelRequiredDocuName("");
    setDelRequiredDocuId(0);
  };

  const closeDeleteModal2 = () => {
    setDeleteModal2(false);
    setDelData({});
  };

  const handleDeleteDocuRequired = (id) => {
    setButtonStatus2(true);
    setProgress3(true);
    remove(`SubjectDocumentRequirement/Delete/${id}`).then((action) => {
      setButtonStatus2(false);
      setProgress3(false);
      setDeleteModal(false);
      setSuccess(!success);
      //
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelRequiredDocuName("");
      setDelRequiredDocuId(0);
    });
  };

  const handleDeleteDocuRequired2 = () => {
    console.log(delData);
    setButtonStatus(true);
    setProgress3(true);
    remove(`AdditionalDocumentRequirement/Delete/${delData?.id}`).then(
      (action) => {
        setButtonStatus2(false);
        setProgress3(false);
        setDeleteModal2(false);
        setSuccess(!success);
        //
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    );
  };

  const handlePrevious = () => {
    history.push(`/add-university-course-test-score/${id}/${subjId}`);
  };
  const handleNext = () => {
    history.push(`/add-university-course-assign-to-campus/${id}/${subjId}`);
  };

  return (
    <div>
      <SubjectNavbar
        title="Course Requirement"
        activeTab={activetab}
        id={id}
        subjId={subjId}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <Form onSubmit={handleSubmit} className="mb-2">
                <p className="section-title">General requirement</p>
                <Input
                  type="hidden"
                  id="subjectId"
                  name="subjectId"
                  value={subjId}
                />

                <Input type="hidden" id="id" name="id" value={requiredId} />

                <Row>
                  <Col md="5">
                    <FormGroup className="ml-4">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          setIsEducationRequired(e.target.checked);
                        }}
                        value={isEducationRequired}
                        checked={isEducationRequired}
                      />
                      <span>Is Education Required</span>
                    </FormGroup>

                    {isEducationRequired ? (
                      <>
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> Education
                            Level
                          </span>

                          <Select
                            options={eduLevelMenu}
                            value={{ label: eduLabel, value: eduValue }}
                            onChange={(opt) =>
                              selectEduLevel(opt.label, opt.value)
                            }
                            name="educationLevelId"
                            id="educationLevelId"
                            placeholder="Select Education Level"
                          />

                          {eduError && (
                            <span className="text-danger">
                              Education level is required
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <span>
                            {" "}
                            <span className="text-danger">*</span> Required
                            Result In Percent
                          </span>

                          <Input
                            type="number"
                            id="requiredResultInPercent"
                            name="requiredResultInPercent"
                            value={resultInPercent}
                            placeholder="Write Required Result"
                            onChange={(e) => {
                              handleResultInPercent(e);
                            }}
                          />
                          <span className="text-danger">
                            {resultInPercentError}
                          </span>
                        </FormGroup>
                      </>
                    ) : null}
                  </Col>
                </Row>
                <FormGroup row>
                  <Col>
                    <button
                      className="save-button"
                      type="submit"
                      disabled={buttonStatus === true && true}
                    >
                      Save
                    </button>
                    {progress ? (
                      <span>
                        <ButtonLoader />
                      </span>
                    ) : (
                      <></>
                    )}
                  </Col>
                </FormGroup>
              </Form>
              <Form onSubmit={handleSubmit2} className="mb-2">
                <p className="section-title">Document requirement</p>
                {update !== 0 ? (
                  <Input type="hidden" id="id" name="id" value={update} />
                ) : null}

                <Input
                  type="hidden"
                  id="subjectId"
                  name="subjectId"
                  value={subjId}
                />

                <Row>
                  <Col md="5">
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span> Document Group
                      </span>

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
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup row className="has-icon-left position-relative">
                  <Col>
                    <button
                      className="save-button"
                      type="submit"
                      disabled={buttonStatus1 === true && true}
                    >
                      Save
                    </button>
                    {progress1 ? (
                      <span>
                        <ButtonLoader />
                      </span>
                    ) : (
                      <></>
                    )}
                  </Col>
                </FormGroup>
              </Form>

              {documentGrpList < 1 ? (
                <div className="mb-3">No data available</div>
              ) : (
                <div className="table-responsive mb-2">
                  <Table className="table-sm table-bordered col-md-10">
                    <thead className="tablehead">
                      <tr>
                        <th>SL/NO</th>
                        <th>Document Group</th>
                        <th>Documents</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentGrpList?.map((document, i) => (
                        <tr key={document.id}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            {document?.documentGroup?.title} -{" "}
                            {document?.applicationTypeId === 1
                              ? "Home"
                              : document?.applicationTypeId === 2
                              ? "EU/UK"
                              : "International"}
                          </td>
                          <td className="">
                            {document?.documents?.map((dc) => (
                              <li>{dc?.name}</li>
                            ))}
                          </td>
                          <td>
                            <span
                              onClick={() => toggleDanger(document)}
                              permission={6}
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </span>

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{delRequiredDocuName}</b> ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  disabled={buttonStatus2}
                                  color="danger"
                                  onClick={() =>
                                    handleDeleteDocuRequired(delRequiredDocuId)
                                  }
                                >
                                  {progress3 ? <ButtonLoader /> : "YES"}
                                </Button>
                                <Button onClick={closeDeleteModal}>NO</Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

              <Form onSubmit={handleSubmit3} className="mb-2">
                <p className="section-title">Additional document requirement</p>
                <Input
                  type="hidden"
                  id="subjectId"
                  name="subjectId"
                  value={subjId}
                />

                <Row>
                  <Col md="5">
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span> Document
                      </span>

                      <Select
                        options={DocumentOptions}
                        value={{ label: docLabel, value: docValue }}
                        onChange={(opt) => selectDocument(opt.label, opt.value)}
                        name="documentId"
                        id="documentId"
                      />

                      <span className="text-danger">{docError}</span>
                    </FormGroup>

                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span> Application Type
                      </span>

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
                    </FormGroup>

                    <FormGroup>
                      <span>Required </span>

                      <Input
                        className="ml-2"
                        type="checkbox"
                        onChange={(e) => {
                          setMand(e.target.checked);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row className="has-icon-left position-relative">
                  <Col>
                    <button
                      className="save-button"
                      type="submit"
                      disabled={buttonStatus2 === true && true}
                    >
                      Save
                    </button>
                    {progress2 ? (
                      <span>
                        <ButtonLoader />
                      </span>
                    ) : (
                      <></>
                    )}
                  </Col>
                </FormGroup>
              </Form>

              {docList < 1 ? (
                <div className="mb-3">No data available</div>
              ) : (
                <div className="table-responsive mb-2">
                  <Table className="table-sm table-bordered col-md-10">
                    <thead className="tablehead">
                      <tr>
                        <th>SL/NO</th>
                        <th>Document</th>
                        <th>Application Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docList?.map((document, i) => (
                        <tr key={document.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{document?.document?.name}</td>
                          <td>
                            {document?.applicationTypeId === 1
                              ? "Home"
                              : document?.applicationTypeId === 2
                              ? "EU/UK"
                              : "International"}
                          </td>
                          <td>
                            <span
                              onClick={() => toggleDanger2(document)}
                              permission={6}
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </span>

                            <Modal
                              isOpen={deleteModal2}
                              toggle={closeDeleteModal2}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{delData?.name}</b> ? Once Deleted it can't
                                  be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  disabled={buttonStatus2}
                                  color="danger"
                                  onClick={() => handleDeleteDocuRequired2()}
                                >
                                  {" "}
                                  {progress3 ? <ButtonLoader /> : "YES"}
                                </Button>
                                <Button onClick={closeDeleteModal2}>NO</Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              <Row className="mt-4 text-center">
                <Col>
                  <PreviousButton action={handlePrevious} />
                  <SaveButton text="Next" action={handleNext} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddUniversitySubjectRequirements;
