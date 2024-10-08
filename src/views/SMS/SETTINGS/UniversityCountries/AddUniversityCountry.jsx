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
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { StoreUniversityCountryData } from "../../../../redux/actions/SMS/UniversityAction/UniversityCountryAction";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import LinkSpanButton from "../../Components/LinkSpanButton";
import Loader from "../../Search/Loader/Loader";
import ButtonLoader from "../../Components/ButtonLoader";
import axios from "axios";
import { rootUrl } from "../../../../constants/constants";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import remove from "../../../../helpers/remove";

const AddUniversityCountry = (props) => {
  const univerSityCountries = props.univerSityCountryList[0];
  console.log(univerSityCountries);
  const [universityCountry, setUniversityCountry] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateState, setUpdateState] = useState({});
  const token = localStorage.getItem("token");
  const [editUniCountryId, setEditUniCountryId] = useState(0);
  const [editUniCountryName, setEditUniCountryName] = useState("");
  const [delUniCountryId, setDelUniCountryId] = useState(0);
  const [delUniCountryName, setDelUniCountryName] = useState("");
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState("");
  const [countryId, setCountryId] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [CurrencyNameError, setCurrencyNameError] = useState("");
  const [CurrencyName, setCurrencyName] = useState("");
  const [CurrencySignError, setCurrencySignError] = useState("");
  const [CurrencySign, setCurrencySign] = useState("");

  useEffect(() => {
    get(`UniversityCountry/Index`)
      .then((action) => {
        console.log(action);
        dispatch(StoreUniversityCountryData(action));
        setLoading(false);
      })
      .catch();

    get(`CountryDD/Index`).then((res) => {
      setCountries(res);
    });
  }, [success]);

  const handleCurrencyName = (e) => {
    setCurrencyName(e.target.value);
    if (e.target.value === "") {
      setCurrencyNameError("Currency Name is required");
    } else {
      setCurrencyNameError("");
    }
  };

  const handleCurrencySign = (e) => {
    setCurrencySign(e.target.value);
    if (e.target.value === "") {
      setCurrencySignError("Currency Sign is required");
    } else {
      setCurrencySignError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (countryValue === 0) {
      isFormValid = false;
      setCountryError("Country is required");
    }
    if (!CurrencyName) {
      isFormValid = false;
      setCurrencyNameError("Currency Name is required");
    }
    if (!CurrencySign) {
      isFormValid = false;
      setCurrencySignError("Currency Sign is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setUpdateState({});
      setButtonStatus(true);
      setProgress1(true);

      put(`universityCountry/Create`, subData).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          setSuccess(!success);
          setModalOpen(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setUniversityCountry("");
          setEditUniCountryId(0);
          setEditUniCountryName("");
          setCountryLabel("Select Country");
          setCountryValue(0);
          setCurrencySign("");
          setCurrencyName("");
        } else if (res?.status == 200 && res?.data?.isSuccess == false) {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const countryOptions = countries?.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const selectCountry = (label, value) => {
    setCountryError("");
    setCountryLabel(label);
    setCountryValue(value);
    setCountryId(value);
    console.log(value);
  };

  const handleDeleteUniCountry = (id) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`UniversityCountry/Delete/${id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelUniCountryName("");
      setDelUniCountryId(0);
      setSuccess(!success);
    });
  };

  const toggleDanger = (name, id) => {
    setDelUniCountryName(name);
    setDelUniCountryId(id);
    setDeleteModal(true);
  };

  const handleUpdate = (country) => {
    setModalOpen(true);
    setCountryValue(country?.cultureCountryId);
    setCountryLabel(country?.name);
    setCurrencyName(country?.currencyName);
    setCurrencySign(country?.currencySign);
    setEditUniCountryId(country?.id);
    setEditUniCountryName(country?.name);
  };

  // on Close Modal
  const closeModal = () => {
    setCountryLabel("Select Country");
    setCountryError("");
    setCountryValue(0);
    setCurrencySign("");
    setCurrencyName("");
    setModalOpen(false);
    setUpdateState({});
    setEditUniCountryId(0);
    setEditUniCountryName("");
    setCurrencySignError("");
    setCurrencyNameError("");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelUniCountryName("");
    setDelUniCountryId(0);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb title="University Countries" backTo="" path="/" />

          <Card>
            <CardHeader>
              {permissions?.includes(permissionList?.Manage_Core_Data) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Country"}
                  permission={6}
                />
              ) : null}

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {univerSityCountries?.length}
                  </span>{" "}
                  University Countries Found{" "}
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
                  <ModalHeader>University Country</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      {updateState?.id ? (
                        <Input
                          type="hidden"
                          name="id"
                          id="id"
                          defaultValue={updateState?.id}
                        />
                      ) : (
                        <>
                          <Input
                            type="hidden"
                            name="id"
                            id="id"
                            defaultValue={editUniCountryId}
                          />
                          <Input
                            type="hidden"
                            name="name"
                            id="name"
                            defaultValue={editUniCountryName}
                          />
                        </>
                      )}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            <span className="text-danger">*</span> Country Name
                          </span>
                        </Col>
                        <Col md="8">
                          <Select
                            options={countryOptions}
                            value={{ label: countryLabel, value: countryValue }}
                            onChange={(opt) =>
                              selectCountry(opt.label, opt.value)
                            }
                            name="cultureCountryId"
                            id="cultureCountryId"
                          />
                          <span className="text-danger">{countryError}</span>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <span>
                            <span className="text-danger">*</span>
                            Currency Name
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="currencyName"
                            id="currencyName"
                            placeholder="Enter Currency Name"
                            onChange={(e) => {
                              handleCurrencyName(e);
                            }}
                            value={CurrencyName}
                          />
                          <span className="text-danger">
                            {CurrencyNameError}
                          </span>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <span>
                            <span className="text-danger">*</span>
                            Currency Sign
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="currencySign"
                            id="currencySign"
                            placeholder="Enter Currency Sign"
                            onChange={(e) => {
                              handleCurrencySign(e);
                            }}
                            value={CurrencySign}
                          />
                          <span className="text-danger">
                            {CurrencySignError}
                          </span>
                        </Col>
                      </FormGroup>

                      <FormGroup
                        className="has-icon-left position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          color="danger"
                          className="mr-1 mt-3"
                          onClick={closeModal}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          className="mr-1 mt-3"
                          disabled={buttonStatus}
                        >
                          {progress1 ? <ButtonLoader /> : "Submit"}
                        </Button>
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
                      <th>Currency Name</th>
                      <th>Currency Sign</th>

                      {permissions?.includes(
                        permissionList.View_University_List
                      ) ? (
                        <th className="text-center">Count</th>
                      ) : null}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {univerSityCountries?.map((uniCountry, i) => (
                      <tr key={uniCountry.id} style={{ textAlign: "center" }}>
                        <th scope="row">{i + 1}</th>
                        <td>{uniCountry.name}</td>
                        <td>{uniCountry.currencyName}</td>
                        <td>{uniCountry.currencySign}</td>
                        {permissions?.includes(
                          permissionList.View_University_List
                        ) ? (
                          <td className="text-center">
                            <LinkSpanButton
                              url={{
                                pathname: `/universityListFromAddUniversityCountry/${uniCountry?.id}`,
                                universityCountry: uniCountry?.id,
                                name: uniCountry?.name,
                              }}
                              className={"badge badge-pill badge-secondary"}
                              data={`View (${uniCountry?.universityCount})`}
                              permission={6}
                            />
                          </td>
                        ) : null}
                        <td>
                          <ButtonGroup>
                            {permissions?.includes(
                              permissionList.Manage_Core_Data
                            ) ? (
                              <ButtonForFunction
                                func={() => handleUpdate(uniCountry)}
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
                                className={"mx-1 btn-sm"}
                                func={() =>
                                  toggleDanger(uniCountry.name, uniCountry.id)
                                }
                                color={"danger"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>
                          <ConfirmModal
                            text="Do You Want To Delete This University Country? Once Deleted it can't be Undone!"
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            confirm={() =>
                              handleDeleteUniCountry(delUniCountryId)
                            }
                            cancel={closeDeleteModal}
                          />

                          {/* <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this{" "}
                                <b>{delUniCountryName}</b> ? Once Deleted it
                                can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={() =>
                                  handleDeleteUniCountry(delUniCountryId)
                                }
                                disabled={buttonStatus}
                              >
                                {progress ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal> */}
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
const mapStateToProps = (state) => ({
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
});
export default connect(mapStateToProps)(AddUniversityCountry);
