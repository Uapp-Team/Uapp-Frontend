import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Col,
  Input,
} from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import Select from "react-select";
import ButtonForFunction from "../../Components/ButtonForFunction";
import remove from "../../../../helpers/remove";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const AddCity = () => {
  const history = useHistory();
  const [uni, setUni] = useState([]);
  const [uniError, setUniError] = useState("");
  const [uniLabel, setUniLabel] = useState("Select University County");
  const [uniValue, setUniValue] = useState(0);
  const [city, setCity] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cityvar, setCityVar] = useState("");
  const [cityvarError, setCityVarError] = useState("");
  const [data, setData] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});

  useEffect(() => {
    get(`UniversityCountryDD/Index`).then((res) => {
      setUni(res);
      setLoading(false);
    });

    get(`UniversityCity/Index`).then((res) => {
      setCity(res);
      setLoading(false);
      console.log("city list", res);
    });
  }, [success]);

  const backToDashboard = () => {
    history.push("/");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setUniLabel("Select University");
    setUniValue(0);
  };

  const uniOptions = uni?.map((ans) => ({
    label: ans?.name,
    value: ans?.id,
  }));

  const selectUni = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
    setUniError("");
  };

  const handleDeleteUniState = () => {
    remove(`UniversityCity/Delete/${delData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
    setDeleteModal(false);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUniLabel("Select University Country");
    setUniValue(0);
    setCityVar("");
    setCityVarError("");
    setData({});
    setUniError("");
  };

  // delete button click
  const toggleDanger = (state) => {
    setDelData(state);
    setDeleteModal(true);
  };

  const handleUpdate = (data) => {
    setData(data);
    setModalOpen(true);
    setUniLabel(data?.universityCountry?.name);
    setUniValue(data?.universityCountryId);
    setCityVar(data?.name);
  };

  const handleCityName = (e) => {
    setCityVar(e.target.value);
    if (e.target.value === "") {
      setCityVarError("City is required");
    } else {
      setCityVarError("");
    }
  };

  const validateForm = () => {
    var isFormValid = true;
    if (!cityvar) {
      isFormValid = false;
      setCityVarError("City is required");
    }
    if (uniValue == 0) {
      isFormValid = false;
      setUniError("University country is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateForm(subData);

    if (formIsValid) {
      if (!data?.id) {
        setButtonStatus(true);
        setProgress(true);
        post(`UniversityCity/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setCityVar("");
            setUniLabel("Select University Country");
            setUniValue(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: "true",
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`UniversityCity/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setCityVar("");
            setCityVarError("");
            setUniLabel("Select University Country");
            setUniValue(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: "true",
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <BreadCrumb title="Cities" backTo="" path="/" />

      <Card>
        <CardHeader>
          {permissions?.includes(permissionList?.Manage_Core_Data) ? (
            <ButtonForFunction
              className={"btn btn-uapp-add"}
              func={() => setModalOpen(true)}
              icon={<i className="fas fa-plus"></i>}
              name={" Add City"}
            />
          ) : null}

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary"> {city?.length} </span>{" "}
              Cities Found{" "}
            </b>
          </div>
        </CardHeader>

        <CardBody>
          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader> Cities</ModalHeader>

              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {data?.id ? (
                    <input type="Hidden" name="id" id="id" value={data?.id} />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="5">
                      <span>
                        City <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="7">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={cityvar}
                        placeholder="Write City Name"
                        onChange={(e) => {
                          handleCityName(e);
                        }}
                      />
                      <span className="text-danger">{cityvarError}</span>
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="5">
                      <span>
                        University Country{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="7">
                      <Select
                        options={uniOptions}
                        value={{ label: uniLabel, value: uniValue }}
                        onChange={(opt) => selectUni(opt.label, opt.value)}
                        name="universityCountryId"
                        id="universityCountryId"
                      />
                      <span className="text-danger">{uniError}</span>
                    </Col>
                  </FormGroup>

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
          </div>

          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th>City</th>
                  <th className="text-center">Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {city?.map((state, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    {/* <th scope="row">{i + 1}</th> */}
                    <td>{state?.name}</td>
                    <td>{state?.universityCountry?.name}</td>
                    <td>
                      <ButtonGroup>
                        {permissions?.includes(
                          permissionList.Manage_Core_Data
                        ) ? (
                          <ButtonForFunction
                            func={() => handleUpdate(state)}
                            className={"mx-1 btn-sm"}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList?.Manage_Core_Data
                        ) ? (
                          <ButtonForFunction
                            func={() => toggleDanger(state)}
                            className={"mx-1 btn-sm"}
                            color={"danger"}
                            icon={<i className="fas fa-trash-alt"></i>}
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
        text="Do You Want To Delete This City? Once Deleted it can't be Undone "
        // ${delData?.name}
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
        confirm={() => handleDeleteUniState()}
      />
    </div>
  );
};

export default AddCity;
