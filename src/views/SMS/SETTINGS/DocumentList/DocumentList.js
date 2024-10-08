import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Table,
  ButtonGroup,
} from "reactstrap";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import ButtonForFunction from "../../Components/ButtonForFunction";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const DocumentList = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [documentData, setDocumentdata] = useState([]);
  const [docuDD, setDocuDD] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Document Category");
  const [docuValue, setDocuValue] = useState(0);
  const [categoryError, setCategoryError] = useState(false);
  const [application, setApplication] = useState(null);
  const [applicationError, setApplicationError] = useState(false);
  const [updateDocument, setUpdateDocument] = useState(undefined);
  const [delDocuId, setDelDocuId] = useState(0);
  const [delDocuName, setDelDocuName] = useState("");
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  // const [Description, setDescription] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    get("Document/Index").then((res) => {
      setDocumentdata(res);
      setLoading(false);
    });

    get("DocumentCategoryDD/Index").then((res) => {
      setDocuDD(res);
    });
  }, [success]);

  const docuCategory = docuDD.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  const selectDocumentDD = (label, value) => {
    setDocuLabel(label);
    setDocuValue(value);
    setCategoryError(false);
  };

  const handleUpdate = (document) => {
    setModalOpen(true);
    setDocuLabel(document?.documentCategory?.name);
    setDocuValue(document?.documentCategory?.id);
    setName(document?.name);
    setDescription(document?.description);
    setApplication(`${document?.isVaryForApplication}`);
    // localStorage.setItem("updateDocument", document?.id);
    setUpdateDocument(document?.id);
  };

  const handleName = (e) => {
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

  const validateForm = () => {
    var isFormValid = true;

    if (docuValue === 0) {
      isFormValid = false;
      setCategoryError(true);
    }
    if (application === null) {
      isFormValid = false;
      setApplicationError(true);
    }
    if (!Name) {
      isFormValid = false;
      setNameError("Name is required");
    }
    if (!Description) {
      isFormValid = false;
      setDescriptionError("Description is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    var formIsValid = validateForm(subData);

    if (formIsValid) {
      if (updateDocument !== undefined) {
        setButtonStatus(true);
        setProgress1(true);
        put(`Document/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSuccess(!success);
            setModalOpen(false);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setName("");
            setDescription("");
            setDocuLabel("Select Document Category");
            setDocuValue(0);
            setApplication(null);
            setUpdateDocument(undefined);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setUpdateDocument(undefined);
        setButtonStatus(true);
        setProgress1(true);
        post(`Document/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSuccess(!success);
            setModalOpen(false);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setName("");
            setDescription("");
            setDocuLabel("Select Document Category");
            setDocuValue(0);
            setApplication(null);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleUpdateSubmit = () => {
    const id = localStorage.getItem("updateDocument");

    const subData = {
      id: id,
      name: Name,
    };

    //    const returnvalue = put(`UniversityCountry/Update`,subData).then((action)=> {
    //       setSuccess(!success);
    //       setModalOpen(false)
    //       addToast(action?.data?.message, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    //       setUniversityCountry('');
    //      localStorage.removeItem('updateUniCountry')
    //     })
  };

  const handleDeleteDocument = (id) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Document/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setProgress(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelDocuName("");
      setDelDocuId(0);
    });
  };

  const toggleDanger = (name, id) => {
    setDelDocuName(name);
    setDelDocuId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setName("");
    setDescription("");
    setDocuLabel("Select Document Category");
    setDocuValue(0);
    setApplication(null);
    setUpdateDocument(undefined);
    setDescriptionError("");
    setNameError("");
    setCategoryError("");
    setApplicationError("");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelDocuName("");
    setDelDocuId(0);
    setDeleteModal(false);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const handleApplication = (event) => {
    setApplication(event.target.value);
    setApplicationError(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb title="Documents" backTo="" path="/" />

          <Card>
            <CardHeader>
              {permissions?.includes(permissionList?.Configure_Documents) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Document"}
                  permission={6}
                />
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {documentData?.length}
                  </span>{" "}
                  Documents Found{" "}
                </b>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal2"
                >
                  <ModalHeader>Document Details</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      {updateDocument != undefined ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={updateDocument}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Category <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={docuCategory}
                            value={{ label: docuLabel, value: docuValue }}
                            onChange={(opt) =>
                              selectDocumentDD(opt.label, opt.value)
                            }
                            name="documentCategoryId"
                            id="documentCategoryId"
                          />

                          {categoryError && (
                            <span className="text-danger">
                              Category is required.
                            </span>
                          )}
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Applicable? <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isVaryForApplication"
                              onChange={handleApplication}
                              name="isVaryForApplication"
                              value="true"
                              checked={application == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isVaryForApplication"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isVaryForApplication"
                              onChange={handleApplication}
                              name="isVaryForApplication"
                              value="false"
                              checked={application === "false"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isVaryForApplication"
                            >
                              No
                            </Label>
                          </FormGroup>

                          <br />

                          {applicationError && (
                            <span className="text-danger">
                              Must select one option
                            </span>
                          )}
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Name <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            value={Name}
                            placeholder="Enter name"
                            onChange={(e) => {
                              handleName(e);
                            }}
                          />
                          <span className="text-danger">{NameError}</span>
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Description <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="textarea"
                            rows="6"
                            name="description"
                            id="description"
                            value={Description}
                            placeholder="Write Description"
                            onChange={(e) => {
                              handleDescription(e);
                            }}
                          />
                          <span className="text-danger">
                            {DescriptionError}
                          </span>
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
              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentData?.map((document, i) => (
                      <tr key={document?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{i + 1}</th>
                        <td>{document?.name}</td>
                        <td className="text-center">{document?.description}</td>
                        <td className="text-center">
                          {document?.documentCategory?.name}
                        </td>

                        <td>
                          <ButtonGroup>
                            {permissions?.includes(
                              permissionList.Configure_Documents
                            ) ? (
                              <ButtonForFunction
                                func={() => handleUpdate(document)}
                                className={"mx-1 btn-sm"}
                                color={"warning"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList.Configure_Documents
                            ) ? (
                              <ButtonForFunction
                                className={"mx-1 btn-sm"}
                                func={() =>
                                  toggleDanger(document?.name, document?.id)
                                }
                                color={"danger"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>
                          <ConfirmModal
                            text="Do You Want To Delete This Document?"
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            confirm={() => handleDeleteDocument(delDocuId)}
                            cancel={closeDeleteModal}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
