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
import Select from "react-select";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const DegreeList = () => {
  const [degreeList, setDegreeList] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const { addToast } = useToasts();
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState({});

  const [education, setEducation] = useState([]);
  const [educationLabel, setEducationLabel] = useState(
    "Select Education Level"
  );
  const [educationValue, setEducationValue] = useState(0);
  const [educationError, setEducationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Education level is required"
  );
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Degree/Index`).then((res) => {
      setDegreeList(res);
      setLoading(false);
    });

    get("EducationLevelDD/Index").then((res) => {
      setEducation(res);
    });
  }, [success]);

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
    remove(`Degree/Delete/${data?.id}`).then((res) => {
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

  const educationName = education?.map((edu) => ({
    label: edu.name,
    value: edu.id,
  }));

  // select  Education Level
  const selectEducationLevel = (label, value) => {
    setEducationError(false);
    setEducationLabel(label);
    setEducationValue(value);
  };

  const handleAddDegree = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setData({});
    setName("");
    setEducationLabel(`Select Education Level`);
    setEducationValue(0);
    setModalOpen(false);
    setNameError("");
    setEducationError(false);
  };

  // back to dashboard

  const backToDashboard = () => {
    history.push("/");
  };

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateForm = () => {
    var isFormValid = true;

    if (educationValue === 0) {
      isFormValid = false;
      setEducationError(true);
    }

    if (!Name) {
      isFormValid = false;
      setNameError("Name is required");
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
        put(`Degree/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setData({});
            setSuccess(!success);
            setName("");
            setEducationLabel(`Select Education Level`);
            setEducationValue(0);
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
        post("Degree/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setName("");
            setEducationLabel(`Select Education Level`);
            setEducationValue(0);
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

  const redirectToUpdate = (data) => {
    setData(data);
    setName(data?.name);
    setEducationLabel(data?.educationLevel?.name);
    setEducationValue(data?.educationLevel?.id);
    setModalOpen(true);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Degree Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
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
                      Education Level <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={educationName}
                      defaultValue={{
                        label: educationLabel,
                        value: educationValue,
                      }}
                      onChange={(opt) =>
                        selectEducationLevel(opt.label, opt.value)
                      }
                      name="educationLevelId"
                      id="educationLevelId"
                      required
                    />
                    {educationError ? (
                      <span className="text-danger">{errorMessage}</span>
                    ) : null}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="12">
                    <div className="d-flex justify-content-between">
                      <Button
                        color="danger"
                        className="mt-3"
                        onClick={closeModal}
                      >
                        Close
                      </Button>

                      <ButtonForFunction
                        type={"submit"}
                        name={progress1 ? <ButtonLoader /> : "Submit"}
                        className={"mr-1 mt-3 badge-primary"}
                        disable={buttonStatus}
                      />
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>

          <BreadCrumb title="Degrees" backTo="" path="/" />

          <Card>
            <CardHeader>
              {/* <div className='mb-3'> */}

              <ButtonForFunction
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                func={handleAddDegree}
                name={" Add Degree"}
              />

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {degreeList?.length}
                  </span>{" "}
                  Degrees Found{" "}
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
                      <th>Education Level Name</th>
                      <th>Education Level Description </th>
                      <th>Education Level Value </th>
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {degreeList?.map((degree, i) => (
                      <tr key={degree?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{serialNum + i}</th>
                        <td>{degree?.name}</td>

                        <td>{degree?.educationLevel?.name}</td>

                        <td>{degree?.educationLevel?.description}</td>

                        <td>{degree?.educationLevel?.levelValue}</td>

                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            <ButtonForFunction
                              icon={<i className="fas fa-edit"></i>}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              func={() => redirectToUpdate(degree)}
                            />

                            <ButtonForFunction
                              icon={<i className="fas fa-trash-alt"></i>}
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              func={() => toggleDanger(degree)}
                            />
                          </ButtonGroup>
                          <ConfirmModal
                            text="Do You Want To Delete This Degree? Once Deleted it can't be Undone!"
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

export default DegreeList;
