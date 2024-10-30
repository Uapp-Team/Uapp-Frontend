import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
  Row,
} from "reactstrap";
import Select from "react-select";
import get from "../../../../helpers/get";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const List = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const { addToast } = useToasts();
  const [list, setList] = useState([]);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [document, setDocument] = useState([]);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [app, setApp] = useState([]);
  const [appLabel, setAppLabel] = useState("Select Application Type");
  const [appValue, setAppValue] = useState(0);
  const [docLabel, setDocLabel] = useState("Select Document Type");
  const [docValue, setDocValue] = useState(0);
  const [appError, setAppError] = useState("");
  const [docError, setDocError] = useState("");
  const [manError, setManError] = useState("");
  const [man, setMan] = useState(null);
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [applicationType, setApplicationType] = useState([]);

  useEffect(() => {
    get(`StudentTypeDocument/Index`).then((res) => {
      setList(res);
      setDetails(res?.details);
    });

    get(`DocumentDD/Index`).then((res) => {
      setDocument(res);
    });

    get(`ApplicationTypeDD/Index`).then((res) => {
      setApp(res);
      console.log("applicationtype", res);
    });
  }, [success]);

  const appOption = app?.map((ap) => ({
    label: ap?.name,
    value: ap?.id,
  }));

  const documentOption = document?.map((doc) => ({
    label: doc?.name,
    value: doc?.id,
  }));

  const selectApp = (label, value) => {
    setAppError("");
    setAppLabel(label);
    setAppValue(value);
  };

  const selectDocument = (label, value) => {
    setDocError("");
    setDocLabel(label);
    setDocValue(value);
  };

  const handleApplication = (event) => {
    setMan(event.target.value);
    setManError("");
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const closeModal = () => {
    setModalOpen(false);
    setAppLabel("Select Application Type");
    setAppValue(0);
    setDocLabel("Select Document Type");
    setDocValue(0);
    setDetails("");
    setDetailsError("");
    setManError("");
    setDocError("");
    setAppError("");
    setMan(null);
    setApplicationType([]);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelData({});
    setDeleteModal(false);
  };

  const toggleDanger = (data) => {
    setDelData(data);

    setDeleteModal(true);
  };

  const handleDeleteDocumentGroup = () => {
    setButtonStatus2(true);
    setProgress2(true);
    remove(`StudentTypeDocument/Delete/${delData?.id}`).then((res) => {
      setButtonStatus2(false);
      setProgress2(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      closeDeleteModal();
    });
  };

  const handleDetails = (e) => {
    setDetails(e.target.value);
    if (e.target.value === "") {
      setDetailsError("Details is required");
    } else {
      setDetailsError("");
    }
  };
  console.log(applicationType);
  const validateForm = () => {
    var isFormValid = true;
    if (!details) {
      isFormValid = false;
      setDetailsError("Details is required");
    }
    if (docValue === 0) {
      isFormValid = false;
      setDocError("Document type is required");
    }
    if (applicationType.length === 0) {
      isFormValid = false;
      setAppError("Application type is required");
    }
    if (man == null) {
      isFormValid = false;
      setManError("Must select one option");
    }

    return isFormValid;
  };

  const handleChange = (e, id) => {
    let isChecked = e.target.checked;

    if (isChecked === true) {
      setApplicationType([...applicationType, id]);
      setAppError("");
    } else {
      const res = applicationType.filter((c) => c !== id);
      setApplicationType(res);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);
    var formIsValid = validateForm(subData);

    for (let i = 0; i < applicationType.length; i++) {
      subData.delete("applicationTypeId");
      subData.append("applicationTypeId", applicationType[i]);

      if (formIsValid) {
        setButtonStatus(true);
        setProgress1(true);
        post(`StudentTypeDocument/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setApplicationType([]);
            setSuccess(!success);
            closeModal();
          } else if (res?.status === 200 && res?.data?.isSuccess === false) {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
            // closeModal();
          }
        });
      }
    }
  };

  return (
    <div>
      <BreadCrumb title="Prefix Document Groups" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              {permissions?.includes(permissionList.Configure_Documents) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Prefix Type Document Groups"}
                  permission={6}
                />
              ) : null}
            </div>

            <div>
              {" "}
              <b>
                {" "}
                Total{" "}
                <span className="badge badge-primary">{list?.length}</span>{" "}
                Prefix Document Groups Found{" "}
              </b>
            </div>
          </div>

          {permissions?.includes(permissionList?.Configure_Documents) ? (
            <div>
              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal2"
              >
                <ModalHeader>Prefix Type Document Group</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="9">
                        <span>
                          Document Type <span className="text-danger">*</span>{" "}
                        </span>
                        <Select
                          options={documentOption}
                          value={{
                            label: docLabel,
                            value: docValue,
                          }}
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
                      <Col md="9">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8" className="ml-3">
                        <>
                          <Row className="has-icon-left position-relative">
                            {app?.map((notices, i) => (
                              <div key={i}>
                                {" "}
                                <Col md="6" className="d-flex">
                                  <span>{notices?.name}</span>
                                  <Input
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleChange(e, notices?.id)
                                    }
                                  />
                                </Col>
                              </div>
                            ))}
                            <span className="text-danger">{appError}</span>
                          </Row>
                        </>
                      </Col>
                    </FormGroup>
                    {/* 
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="9">
                        <span>
                          Application Type{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                        <Select
                          options={appOption}
                          value={{
                            label: appLabel,
                            value: appValue,
                          }}
                          onChange={(opt) => selectApp(opt.label, opt.value)}
                          name="applicationTypeId"
                          id="applicationTypeId"
                        />

                        <span className="text-danger">{appError}</span>
                      </Col>
                    </FormGroup> */}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="9">
                        <span>
                          Details <span className="text-danger">*</span>{" "}
                        </span>
                        <Input
                          type="textarea"
                          name="details"
                          id="details"
                          value={details}
                          onChange={(e) => {
                            handleDetails(e);
                          }}
                          placeholder="Enter Details"
                        />
                        <span className="text-danger">{detailsError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="9">
                        <span>
                          Mandatory {""}
                          <span className="text-danger">*</span>
                        </span>
                      </Col>
                      <Col md="8">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleApplication}
                            name="isMandatory"
                            value="true"
                            checked={man == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isMandatory"
                            onChange={handleApplication}
                            name="isMandatory"
                            value="false"
                            checked={man == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isMandatory"
                          >
                            No
                          </Label>
                        </FormGroup>

                        <br />

                        <span className="text-danger">{manError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between mt-3">
                      <CancelButton cancel={closeModal} />

                      <SaveButton
                        text="Submit"
                        progress={progress1}
                        buttonStatus={buttonStatus}
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
            </div>
          ) : null}

          <div className="mt-3 table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th>Title</th>

                  <th>Application type</th>
                  <th>Details</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {list?.map((doc, i) => (
                  <tr key={doc?.id} style={{ textAlign: "center" }}>
                    {/* <th scope="row">{i + 1}</th> */}

                    <td className="text-center">{doc?.document?.name}</td>
                    <td className="text-center">
                      {doc?.applicationTypeId === 1 ? (
                        <span>Home</span>
                      ) : doc?.applicationTypeId === 2 ? (
                        <span>EU/UK</span>
                      ) : (
                        <span>International</span>
                      )}
                    </td>
                    <td>{doc?.details}</td>

                    <td>
                      <ButtonGroup>
                        {permissions?.includes(
                          permissionList.Configure_Documents
                        ) ? (
                          <ButtonForFunction
                            className={"mx-1 btn-sm"}
                            func={() => toggleDanger(doc)}
                            color={"danger"}
                            icon={<i className="fas fa-trash-alt"></i>}
                            permission={6}
                          />
                        ) : null}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <ConfirmModal
        text="Do You Want To Delete This Prefix Document Group? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress2}
        confirm={handleDeleteDocumentGroup}
        cancel={closeDeleteModal}
      />
    </div>
  );
};

export default List;
