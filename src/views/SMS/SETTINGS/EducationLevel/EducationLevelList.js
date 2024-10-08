import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  ModalHeader,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import ButtonForFunction from "../../Components/ButtonForFunction";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import Loader from "../../Search/Loader/Loader";
import put from "../../../../helpers/put";
import post from "../../../../helpers/post";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { number } from "prop-types";

const EducationLevelList = () => {
  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [educationLevelData, setEducationLevelData] = useState([]);
  const [deleteData, setDeleteData] = useState({});

  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [LevelValu, setLevelValu] = useState("");
  const [LevelValuError, setLevelValuError] = useState("");

  // Delete Modal

  const toggleDanger = (data) => {
    //
    setDeleteData(data);
    setDeleteModal(true);
  };

  // Delete Button

  const handleDeleteData = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`EducationLevel/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const closeModal = () => {
    setData({});
    setName("");
    setDescription("");
    setLevelValu("");
    setModalOpen(false);
    setLevelValuError("");
    setDescriptionError("");
    setNameError("");
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

  const handleLevelValu = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setLevelValu(newValue);

    if (!newValue) {
      setLevelValuError("Level Valu is required");
    } else if (!isNumeric) {
      setLevelValuError("Input must contain only numbers.");
    } else {
      setLevelValuError("");
    }
  };

  // const handleLevelValu = (e) => {
  //   setLevelValu(e.target.value);
  //   if (e.target.value === "") {
  //     setLevelValuError("Level Valu is required");
  //   } else {
  //     setLevelValuError("");
  //   }
  // };

  const validateForm = () => {
    var isFormValid = true;

    if (!Name) {
      isFormValid = false;
      setNameError("Name is required");
    }
    if (!Description) {
      isFormValid = false;
      setDescriptionError("Description is required");
    }

    if (!/^\d+$/.test(LevelValu)) {
      isFormValid = false;
      setLevelValuError("Input must contain only numbers.");
    }

    if (LevelValu === "") {
      isFormValid = false;
      setLevelValuError("Level Valu is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateForm(subData);
    if (formIsValid) {
      if (data?.id) {
        setButtonStatus(true);
        setProgress1(true);
        put(`EducationLevel/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setData({});
            setName("");
            setDescription("");
            setLevelValu("");
            setModalOpen(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress1(true);
        post(`EducationLevel/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setData({});
            setName("");
            setDescription("");
            setLevelValu("");
            setModalOpen(false);
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

  // Go To Education Level Form Page

  const handleAddEducationLevel = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    get("EducationLevel/Index").then((res) => {
      setEducationLevelData(res);
      setLoading(false);
    });
  }, [success]);

  // back to dashboard

  const backToDashboard = () => {
    history.push("/");
  };

  const redirectToUpdate = (data) => {
    setData(data);
    setName(data?.name);
    setDescription(data?.description);
    setLevelValu(data?.levelValue);
    setModalOpen(true);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Education Level Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} className="mt-5">
                {data?.id ? (
                  <input type="hidden" name="id" id="id" value={data?.id} />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
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
                      placeholder="Enter Name"
                      value={Name}
                      onChange={(e) => {
                        handleName(e);
                      }}
                    />
                    <span className="text-danger">{NameError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Description <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      rows={8}
                      placeholder="Enter Description"
                      value={Description}
                      onChange={(e) => {
                        handleDescription(e);
                      }}
                    />
                    <span className="text-danger">{DescriptionError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Level Value <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      name="levelValue"
                      id="levelValue"
                      placeholder="Enter Level Value"
                      value={LevelValu}
                      onChange={(e) => {
                        handleLevelValu(e);
                      }}
                    />
                    <span className="text-danger">{LevelValuError}</span>
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="12">
                    <FormGroup className="d-flex justify-content-between mt-3">
                      <CancelButton cancel={closeModal} />

                      <SaveButton
                        text="Submit"
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>

          <BreadCrumb title="Education Levels" backTo="" path="/" />

          <Card>
            <CardHeader>
              {/* <div className='mb-3'> */}
              {permissions?.includes(
                permissionList.Configure_Educationlevels
              ) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  func={handleAddEducationLevel}
                  name={" Add Educational Levels"}
                />
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {educationLevelData?.length}
                  </span>{" "}
                  Education Levels Found{" "}
                </b>
              </div>

              {/* </div> */}
            </CardHeader>

            <CardBody>
              <div className="table-responsive mb-3">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th>Name</th>
                      <th>Decription</th>
                      <th>Level Value</th>
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationLevelData?.map((educationInfo, i) => (
                      <tr
                        key={educationInfo?.id}
                        style={{ textAlign: "center" }}
                      >
                        <th scope="row">{serialNum + i}</th>
                        <td>{educationInfo?.name}</td>

                        <td>{educationInfo?.description}</td>

                        <td>{educationInfo?.levelValue}</td>

                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.Configure_Educationlevels
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={() => redirectToUpdate(educationInfo)}
                              />
                            ) : null}

                            {/* <LinkButton
                             icon={<i className="fas fa-edit"></i>}
                             color={"warning"}
                             className={"mx-1 btn-sm"}
                             url={`/addEducationLevel/${educationInfo?.name}/${educationInfo?.description}/${educationInfo?.levelValue}/${educationInfo?.id}`}
                            /> */}

                            {permissions?.includes(
                              permissionList.Configure_Educationlevels
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-trash-alt"></i>}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(educationInfo)}
                              />
                            ) : null}
                          </ButtonGroup>
                          <ConfirmModal
                            text="Do You Want To Delete This Education Levels?"
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            confirm={() => handleDeleteData(deleteData)}
                            cancel={() => setDeleteModal(false)}
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

export default EducationLevelList;
