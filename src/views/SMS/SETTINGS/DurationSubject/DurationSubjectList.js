import React, { useEffect, useState } from "react";
import {
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
  ButtonGroup,
  ModalHeader,
} from "reactstrap";
import ButtonForFunction from "../../Components/ButtonForFunction";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import Loader from "../../Search/Loader/Loader";
import put from "../../../../helpers/put";
import post from "../../../../helpers/post";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import Uget from "../../../../helpers/Uget";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import { durationInfo, durationType } from "../../../../constants/presetData";

const EducationLevelList = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [educationLevelData, setEducationLevelData] = useState([]);
  const [deleteData, setDeleteData] = useState({});

  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState("");

  const [durationTypeId, setDurationTypeId] = useState(0);
  const [durationTypeIdName, setDurationTypeIdName] = useState(
    "Select Duration Type"
  );
  const [durationTypeIdErrorText, setDurationTypeIdErrorText] = useState("");
  const [durationTypeIdError, setDurationTypeIdError] = useState(false);

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
    remove(`Duration/${data?.id}`).then((res) => {
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
    setModalOpen(false);
    setData({});
    setValue("");
    setDurationTypeId(0);
    setDurationTypeIdName("Select Duration Type");
    setDurationTypeIdErrorText("");
    setValueError("");
  };

  const handleName = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setValueError("Value is required");
    } else {
      setValueError("");
    }
  };

  const validateForm = () => {
    var isFormValid = true;

    if (durationTypeId === 0) {
      isFormValid = false;
      setDurationTypeIdError(true);
      setDurationTypeIdErrorText("Duration Type is required");
    }

    if (!value) {
      isFormValid = false;
      setValueError("Name is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("id", data?.id ? data?.id : 0);
    subData.append("name", "");
    subData.append("durationTypeId", durationTypeId);
    subData.append("value", value);
    var formIsValid = validateForm(subData);
    if (formIsValid) {
      if (data?.id) {
        setButtonStatus(true);
        put(`Duration/${data?.id}`, subData).then((res) => {
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setData({});
            setValue("");
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
        post(`Duration`, subData).then((res) => {
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setData({});
            setValue("");
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
    Uget("Duration/Index").then((res) => {
      setEducationLevelData(res?.data);
      setLoading(false);
    });
  }, [success]);

  const redirectToUpdate = (data) => {
    setData(data);
    setValue(data?.value);
    setDurationTypeId(data?.durationTypeId);
    setDurationTypeIdName(durationInfo(data?.durationTypeId)?.name);
    // setDurationTypeIdName(data?.name.split(" ")[1]);
    setModalOpen(true);
  };

  return (
    <div>
      <BreadCrumb
        title="Subject Duration"
        backTo="Education Levels"
        path="/educationalLevelList"
      />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Duration Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                {/* {data?.id ? (
                  <input type="hidden" name="id" id="id" value={data?.id} />
                ) : null} */}

                <FormGroup row>
                  {/* <Col md="4">
                    <p>
                      Name <span className="text-danger">*</span>{" "}
                    </p>
                  </Col> */}
                  <Col md="8">
                    <div className="mb-3">
                      <span>
                        Duration Type <span className="text-danger">*</span>
                      </span>
                      <DefaultDropdown
                        list={durationType}
                        label={durationTypeIdName}
                        setLabel={setDurationTypeIdName}
                        value={durationTypeId}
                        setValue={setDurationTypeId}
                        error={durationTypeIdError}
                        setError={setDurationTypeIdError}
                        errorText={durationTypeIdErrorText}
                      />
                    </div>

                    <span>
                      Value <span className="text-danger">*</span>{" "}
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={value}
                      onChange={(e) => {
                        handleName(e);
                      }}
                    />
                    <span className="text-danger">{valueError}</span>
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

          <Card>
            <CardHeader>
              {/* <div className='mb-3'> */}
              {permissions?.includes(
                permissionList.Configure_Educationlevels
              ) ? (
                <>
                  <ButtonForFunction
                    className={"btn btn-uapp-add "}
                    icon={<i className="fas fa-plus"></i>}
                    func={handleAddEducationLevel}
                    name={"Add Duration"}
                  />
                </>
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {educationLevelData?.length}
                  </span>{" "}
                  Subject Duration Found{" "}
                </b>
              </div>

              {/* </div> */}
            </CardHeader>

            <CardBody>
              <div className="table-responsive mb-3">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>Duration Name</th>

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
                        <td>{educationInfo?.name}</td>
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

      <ConfirmModal
        text="Do You Want To Delete This Education Levels?"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={() => handleDeleteData(deleteData)}
        cancel={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default EducationLevelList;
