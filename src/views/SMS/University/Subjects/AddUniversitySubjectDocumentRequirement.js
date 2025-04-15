import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../../constants/constants";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import ButtonLoader from "../../Components/ButtonLoader";

const AddUniversitySubjectDocumentRequirement = () => {
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
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [delRequiredDocuId, setDelRequiredDocuId] = useState(0);
  const [delRequiredDocuName, setDelRequiredDocuName] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const [document, setDocument] = useState([]);
  const [docLabel, setDocLabel] = useState("Select Document");
  const [docValue, setDocValue] = useState(0);
  const [docError, setDocError] = useState("");
  const [docList, setDocList] = useState([]);
  const [mand, setMand] = useState(false);

  const { id, subjId } = useParams();
  const [delData, setDelData] = useState({});

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

  //   const financeMenu = financeDD.map((finance) => ({
  //     label: finance?.name,
  //     value: finance?.id,
  //   }));

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

  const history = useHistory();
  const { addToast } = useToasts();

  // redirect to SubjecList
  const backToSubjecList = () => {
    history.push(`/university-courses/${id}`);
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit2 = (event) => {
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

  const handleSubmit3 = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isMandatory", mand);

    if (docValue === 0) {
      setDocError("Document is required");
    } else if (appliValue === 0) {
      setAppliError(true);
    } else {
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

  const handleDeleteDocuRequired2 = () => {
    console.log(delData);
    setButtonStatus1(true);
    setProgress(true);
    const returnValue = remove(
      `AdditionalDocumentRequirement/Delete/${delData?.id}`
    ).then((action) => {
      setButtonStatus1(false);
      setProgress(false);
      setDeleteModal2(false);
      setSuccess(!success);
      //
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  const onPreviousPage = () => {
    history.push(`/add-university-course-requirements/${id}/${subjId}`);
  };

  const onNextPage = () => {
    history.push({
      pathname: `/add-university-course-assign-to-campus/${id}/${subjId}`,
    });
  };

  const redirectToSubjectProfile = () => {
    history.push({
      pathname: `/subjectProfile/${subjId}`,
      unnniId: id,
    });
  };

  return (
    <div>
      <Card>
        <CardBody>
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
                  <Form onSubmit={handleSubmit2} className="">
                    {update != 0 ? (
                      <Input type="hidden" id="id" name="id" value={update} />
                    ) : null}
                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="subjectId"
                        name="subjectId"
                        value={subjId}
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
                            <th className="text-center">Documents</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentGrpList?.map((document, i) => (
                            <tr key={document.id}>
                              {/* <th scope="row">{i + 1}</th> */}
                              <td>
                                {document?.documentGroup?.title} -{" "}
                                {document?.applicationTypeId === 1
                                  ? "Home/UK"
                                  : document?.applicationTypeId === 2
                                  ? "EU/EEU"
                                  : "International"}
                              </td>
                              <td className="">
                                {document?.documents?.map((dc) => (
                                  <li>{dc?.name}</li>
                                ))}
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

                                {/* <ConfirmModal
                                  text={`Do You Want To Delete This ${delRequiredDocuName} Information ?`}
                                  isOpen={deleteModal}
                                  toggle={closeDeleteModal}
                                  confirm={() =>
                                    handleDeleteDocuRequired(delRequiredDocuId)
                                  }
                                  cancel={closeDeleteModal}
                                  buttonStatus={buttonStatus1}
                                  progress={progress}
                                /> */}

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

              {/* Additional Document Requirement */}

              <div className="row mt-5">
                <div className="col-6">
                  <div className="hedding-titel d-flex justify-content-between mb-2">
                    <div>
                      <h5>
                        {" "}
                        <b>Additional Document Requirement</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <Form onSubmit={handleSubmit3} className="">
                    <FormGroup row className="has-icon-left position-relative">
                      <Input
                        type="hidden"
                        id="subjectId"
                        name="subjectId"
                        value={subjId}
                      />
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Document <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={DocumentOptions}
                          value={{ label: docLabel, value: docValue }}
                          onChange={(opt) =>
                            selectDocument(opt.label, opt.value)
                          }
                          name="documentId"
                          id="documentId"
                        />

                        <span className="text-danger">{docError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
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
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>Required </span>
                      </Col>
                      <Col md="8">
                        <Input
                          className="ml-2"
                          type="checkbox"
                          onChange={(e) => {
                            setMand(e.target.checked);
                          }}
                        />
                      </Col>
                    </FormGroup>

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
                        name={progress2 ? <ButtonLoader /> : "Save"}
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
                        <b>Additional Documents</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>

                  {docList < 1 ? (
                    <div>No data available</div>
                  ) : (
                    <div className="table-responsive">
                      <Table className="table-sm table-bordered">
                        <thead className="thead-uapp-bg">
                          <tr style={{ textAlign: "center" }}>
                            {/* <th>SL/NO</th> */}
                            <th>Document</th>
                            <th className="text-center">Application Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docList?.map((document, i) => (
                            <tr
                              key={document.id}
                              style={{ textAlign: "center" }}
                            >
                              {/* <th scope="row">{i + 1}</th> */}
                              <td>{document?.document?.name}</td>
                              <td className="text-center">
                                {document?.applicationTypeId === 1
                                  ? "Home/UK"
                                  : document?.applicationTypeId === 2
                                  ? "EU/EEU"
                                  : "International"}
                              </td>
                              <td>
                                <ButtonGroup>
                                  <ButtonForFunction
                                    className={"mx-1 btn-sm"}
                                    func={() => toggleDanger2(document)}
                                    color={"danger"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                </ButtonGroup>

                                <Modal
                                  isOpen={deleteModal2}
                                  toggle={closeDeleteModal2}
                                  className="uapp-modal"
                                >
                                  <ModalBody>
                                    <p>
                                      Are You Sure to Delete this{" "}
                                      <b>{delData?.name}</b> ? Once Deleted it
                                      can't be Undone!
                                    </p>
                                  </ModalBody>

                                  <ModalFooter>
                                    <Button
                                      disabled={buttonStatus1}
                                      color="danger"
                                      onClick={() =>
                                        handleDeleteDocuRequired2()
                                      }
                                    >
                                      {progress ? <ButtonLoader /> : "YES"}
                                    </Button>
                                    <Button onClick={closeDeleteModal2}>
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

export default AddUniversitySubjectDocumentRequirement;
