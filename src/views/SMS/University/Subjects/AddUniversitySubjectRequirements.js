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
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const AddUniversitySubjectRequirements = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const activetab = "4";
  const [eduLevelDD, setEduLevelDD] = useState([]);
  const [eduLabel, setEduLabel] = useState("Select Education Level");
  const [eduValue, setEduValue] = useState(0);
  const [eduError, setEduError] = useState(false);
  const [isEducationRequired, setIsEducationRequired] = useState(false);
  const [requiredId, setRequiredId] = useState(0);

  const [applicationTypeDD, setApplicationTypeDD] = useState([]);
  const [appliLabel, setAppliLabel] = useState("Select Application type");
  const [appliValue, setAppliValue] = useState(0);
  const [appliError, setAppliError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const history = useHistory();

  const [document, setDocument] = useState([]);
  const [docError, setDocError] = useState("");
  const [docList, setDocList] = useState([]);
  let [checked, setChecked] = useState([]);
  const { id, subjId } = useParams();
  const [delData, setDelData] = useState({});
  const [resultInPercent, setResultInPercent] = useState("");
  const [resultInPercentError, setResultInPercentError] = useState("");
  console.log(checked);

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
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeDD(res);
    });

    get(`AdditionalDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      setDocList(res);
    });
  }, [subjId, success]);

  const eduLevelMenu = eduLevelDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  const ApplicationMenu = applicationTypeDD.map((level) => ({
    label: level?.name,
    value: level?.id,
  }));

  const selectApplicationType = (label, value) => {
    setAppliError(false);
    setAppliLabel(label);
    setAppliValue(value);
    get(
      `SubjectDocumentRequirement/UnassignedDocuments/${subjId}/${value}`
    ).then((res) => {
      setDocument(res);
    });
  };

  const selectEduLevel = (label, value) => {
    setEduError(false);
    setEduLabel(label);
    setEduValue(value);
  };

  const { addToast } = useToasts();

  const AuthStr = localStorage.getItem("token");

  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      setDocError("");
      if (!checked?.includes(id)) {
        setChecked([...checked, id]);
      }
    } else {
      const newD = id;
      const res = checked.filter((c) => c !== newD);
      setChecked(res);
    }
  };

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
  const handleGeneralSubmit = (event) => {
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

  const validateRegisterForm3 = () => {
    var isFormValid = true;
    if (checked.length === 0) {
      isFormValid = false;
      setDocError("Document is required");
    }
    if (appliValue === 0) {
      isFormValid = false;
      setAppliError(true);
    }

    return isFormValid;
  };

  const handleDocSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("documents", checked);

    for (var x of subdata.values()) {
      console.log(x);
    }

    var formIsValid = validateRegisterForm3(subdata);

    if (formIsValid) {
      setButtonStatus(true);
      setProgress2(true);
      Axios.post(
        `${rootUrl}SubjectDocumentRequirement/AssignDocuments`,
        subdata,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }
      ).then((res) => {
        setButtonStatus(false);
        setProgress2(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setChecked([]);
          setAppliLabel("Select Application type");
          setAppliValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setChecked([]);
          setAppliLabel("Select Application type");
          setAppliValue(0);
        }
      });
    }
  };

  const toggleDanger2 = (document) => {
    setDeleteModal2(true);
    setDelData(document);
  };

  const closeDeleteModal2 = () => {
    setDeleteModal2(false);
    setDelData({});
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
              <Form onSubmit={handleGeneralSubmit} className="mb-2">
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
                {isEducationRequired ? (
                  <FormGroup row className="text-right">
                    <Col md="5">
                      {permissions?.includes(permissionList?.Edit_Subjects) && (
                        <SaveButton
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      )}
                    </Col>
                  </FormGroup>
                ) : null}
              </Form>

              <Form onSubmit={handleDocSubmit} className="mb-2">
                <p className="section-title">Document requirement</p>
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
                        <span className="text-danger">*</span> Application Type
                      </span>

                      <Select
                        options={ApplicationMenu}
                        value={{ label: appliLabel, value: appliValue }}
                        onChange={(opt) =>
                          selectApplicationType(opt.label, opt.value)
                        }
                        name="typeId"
                        id="typeId"
                      />

                      {appliError && (
                        <span className="text-danger">
                          Application type is required
                        </span>
                      )}
                    </FormGroup>

                    {document.length > 0 && (
                      <FormGroup>
                        <span>
                          <span className="text-danger">*</span> Document
                        </span>

                        {document?.map((per) => (
                          <Col xs="6" sm="4" md="3" lg="2" key={per?.id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleCheck(e)}
                                type="checkbox"
                                name=""
                                id={per.id}
                                checked={
                                  checked.includes(`${per.id}`) ? true : false
                                }
                              />
                              <label className="form-check-label" htmlFor="">
                                {per?.name}
                              </label>
                            </div>
                          </Col>
                        ))}
                        <span className="text-danger">{docError}</span>
                      </FormGroup>
                    )}
                  </Col>
                </Row>

                <FormGroup row className="text-right">
                  <Col md="5">
                    {permissions?.includes(permissionList?.Edit_Subjects) && (
                      <SaveButton
                        progress={progress2}
                        buttonStatus={buttonStatus2}
                      />
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

                            <ConfirmModal
                              text="Do You Want To Delete This Information ?"
                              isOpen={deleteModal2}
                              toggle={closeDeleteModal2}
                              confirm={() => handleDeleteDocuRequired2()}
                              cancel={closeDeleteModal2}
                              buttonStatus={buttonStatus}
                              progress={progress}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              <div className="mt-5 d-flex justify-content-between">
                <PreviousButton action={handlePrevious} />
                <SaveButton text="Next" action={handleNext} />
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddUniversitySubjectRequirements;
