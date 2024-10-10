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
  Input,
  Col,
  Table,
  ButtonGroup,
} from "reactstrap";

import { useToasts } from "react-toast-notifications";

import { Link } from "react-router-dom";

import get from "../../../../helpers/get";
import post from "../../../../helpers/post";

import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkSpanButton from "../../Components/LinkSpanButton";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const DocumentCategoryList = () => {
  const [uniTypeId, setUniTypeId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryDescriptionError, setCategoryDescriptionError] = useState("");

  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [docuList, setDocuList] = useState([]);
  // const [postId, setPostId] = useState(0);
  const [updateState, setUpdateState] = useState({});

  const [docuName, setDocuName] = useState("");
  const [docuId, setDocuId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  useEffect(() => {
    get(`DocumentCategory/Index`).then((action) => {
      setDocuList(action);
      setUniTypeId(action?.id);
      setLoading(false);
    });
  }, [success]);

  const handleCategory = (e) => {
    setCategoryName(e.target.value);
    if (e.target.value === "") {
      setCategoryNameError("Category Name is required");
    } else {
      setCategoryNameError("");
    }
  };
  const handleDescription = (e) => {
    setCategoryDescription(e.target.value);
    if (e.target.value === "") {
      setCategoryDescriptionError("Description is required");
    } else {
      setCategoryDescriptionError("");
    }
  };

  const validateForm = () => {
    var isFormValid = true;

    if (!categoryName) {
      isFormValid = false;
      setCategoryNameError("Category Name is required");
    }
    // if (!categoryDescription) {
    //   isFormValid = false;
    //   setCategoryDescriptionError("Description is required");
    // }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    var formIsValid = validateForm(subdata);

    if (formIsValid) {
      if (!updateState?.id) {
        setUpdateState({});
        setButtonStatus(true);
        setProgress(true);
        post(`DocumentCategory/Create`, subdata).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setCategoryName("");
            setCategoryDescription("");
            setUpdateState({});
          } else if (res?.status === 200 && res?.data?.isSuccess === false) {
            setProgress(false);
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`DocumentCategory/Update`, subdata).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSuccess(!success);
            setModalOpen(false);
            setCategoryName("");
            setCategoryDescription("");
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setUpdateState({});
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

  const handleUpdate = (docu) => {
    setModalOpen(true);
    setCategoryName(docu?.name);
    setCategoryDescription(docu?.description);
    setUpdateState(docu);
  };

  const handleDeleteCategory = (id) => {
    setButtonStatus(true);
    setProgress1(true);
    remove(`Documentcategory/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      //
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDocuName("");
      setDocuId(0);
    });
  };

  const toggleDanger = (name, id) => {
    setDocuName(name);
    setDocuId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUpdateState({});
    setCategoryDescriptionError("");
    setCategoryNameError("");
    setCategoryDescription("");
    setCategoryName("");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDocuName("");
    setDocuId(0);
    setDeleteModal(false);
  };

  // redirect to dashboard
  const backToDocumentList = () => {
    history.push("/documentList");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Document Categories"
            backTo="Document List"
            path="/documentList"
          />

          <Card>
            <CardHeader>
              {permissions?.includes(permissionList.Configure_Documents) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Categories"}
                  permission={6}
                />
              ) : null}

              <br />

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {docuList?.length}
                  </span>{" "}
                  Document Categories Found{" "}
                </b>
              </div>
            </CardHeader>

            <CardBody>
              <Link to="/newform">
                {/* <Button className="btn btn-danger mt-2 mb-4" > <i className="fas fa-plus"></i>  Add New Page</Button> */}
              </Link>

              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Document Category</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        {updateState?.id ? (
                          <Input
                            type="hidden"
                            name="id"
                            id="id"
                            defaultValue={updateState?.id}
                          />
                        ) : null}
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            Category Name <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            value={categoryName}
                            placeholder="Write Document Name"
                            onChange={(e) => {
                              handleCategory(e);
                            }}
                          />
                          <span className="text-danger">
                            {categoryNameError}
                          </span>
                        </Col>
                      </FormGroup>

                      {/* <FormGroup
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
                            rows="4"
                            name="description"
                            id="description"
                            value={categoryDescription}
                            placeholder="Write Description"
                            onChange={(e) => {
                              handleDescription(e);
                            }}
                          />
                          <span className="text-danger">
                            {categoryDescriptionError}
                          </span>
                        </Col>
                      </FormGroup> */}
                      <FormGroup className="d-flex justify-content-between mt-3">
                        <CancelButton cancel={closeModal} />

                        <SaveButton
                          text="Submit"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
                <div></div>
              </div>

              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      {/* <th>SL/NO</th> */}
                      <th>Category Name</th>
                      {/* <th>Description</th> */}
                      {/* <th className="text-center" >Count</th> */}
                      {permissions?.includes(
                        permissionList.Configure_Documents
                      ) ? (
                        <>
                          <th>Action</th>
                        </>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {docuList?.map((docu, i) => (
                      <tr key={docu?.id} style={{ textAlign: "center" }}>
                        {/* <th scope="row">{i + 1}</th> */}
                        <td>{docu?.name}</td>
                        {/* <td>{docu?.description}</td> */}
                        {/* <td className="text-center" >               

                    <LinkSpanButton
                      url={
                        {
                          pathname: '/universityList',
                          universityType: uniType?.id,
                          universityName: uniType?.name,
                        }
                      }
                      className={"badge badge-pill badge-primary"}
                      data={uniType?.universityCount}
                      permission={6}
                    />

                  </td> */}

                        {permissions?.includes(
                          permissionList.Configure_Documents
                        ) && (
                          <td>
                            <ButtonGroup>
                              {permissions?.includes(
                                permissionList.Configure_Documents
                              ) ? (
                                <ButtonForFunction
                                  func={() => handleUpdate(docu)}
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
                                    toggleDanger(docu?.name, docu?.id)
                                  }
                                  color={"danger"}
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  permission={6}
                                />
                              ) : null}
                            </ButtonGroup>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <ConfirmModal
        text="Do You Want To Delete This Document Category? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        confirm={() => handleDeleteCategory(docuId)}
        cancel={closeDeleteModal}
      />
    </div>
  );
};

export default DocumentCategoryList;
