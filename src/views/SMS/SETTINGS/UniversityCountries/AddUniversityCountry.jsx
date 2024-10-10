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
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { Upload } from "antd";
import * as Icon from "react-feather";
import post from "../../../../helpers/post";
import Update from "../../InFlow/Update";

const AddUniversityCountry = (props) => {
  const univerSityCountries = props.univerSityCountryList[0];
  const [buttonStatus1, setButtonStatus1] = useState(false);
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

  const [modalOpen2, setModalOpen2] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [text1, setText1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
    setError1(false);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const updateProfilePic = (country) => {
    setModalOpen2(true);
    setFileList1([]);
    setEditUniCountryId(country?.id);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setText1("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList1(fileList);
      setText1("");
      setError1(false);
      setButtonStatus1(false);
    }
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("currentFLagFile", FileList1[0]?.originFileObj);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      post(`UniversityCountry/UpdateFlag`, subData).then((res) => {
        setButtonStatus1(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList1([]);
          setModalOpen2(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

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

  return (
    <div>
      <BreadCrumb title="University Countries" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <div>
                {/* {permissions?.includes(permissionList?.Manage_Core_Data) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Country"}
                  permission={6}
                />
              ) : null} */}
              </div>

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

                      {/* <FormGroup row>
                        <Col md="4">
                          <span>
                            <span className="text-danger">*</span>
                            Country Flag
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
                      </FormGroup> */}

                      <FormGroup
                        className="has-icon-left position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
                      {/* <th>SL/NO</th> */}
                      <th>Flag</th>
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
                        {/* <th scope="row">{i + 1}</th> */}
                        <td>
                          <img
                            src={rootUrl + uniCountry.countryFlag}
                            alt="flag"
                            width="25px"
                            className="rounded-circle"
                          />
                        </td>
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
                          <ButtonForFunction
                            func={() => updateProfilePic(uniCountry)}
                            className={"mx-1 btn-sm"}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          />
                          {/* <span
                            onClick={() => updateProfilePic(uniCountry)}
                            className="pointer"
                          >
                            Update Flag
                          </span> */}
                          {/* <ButtonGroup>
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
                          </ButtonGroup> */}
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
        text="Do You Want To Delete This University Country? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        confirm={() => handleDeleteUniCountry(delUniCountryId)}
        cancel={closeDeleteModal}
      />

      <Modal isOpen={modalOpen2} toggle={closeModal1} className="uapp-modal">
        <ModalHeader>Update University Country Flag</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmitProfilePhoto}>
            <input type="hidden" name="id" id="id" value={editUniCountryId} />

            <FormGroup row className="has-icon-left position-relative">
              <Col className="ml-5" md="4">
                <span>
                  Flag Image <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row d-flex">
                  <div className="col-md-6">
                    <>
                      <Upload
                        listType="picture-card"
                        multiple={false}
                        fileList={FileList1}
                        onPreview={handlePreview1}
                        onChange={handleChange1}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        {FileList1.length < 1 ? (
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Image Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        visible={previewVisible1}
                        title={previewTitle1}
                        footer={null}
                        onCancel={handleCancel1}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage1}
                        />
                      </Modal>

                      <span className="text-danger d-block">{text1}</span>

                      {error1 && (
                        <span className="text-danger">
                          University Country Flag is required
                        </span>
                      )}
                    </>
                  </div>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="12">
                <div className="d-flex justify-content-end">
                  {/* <Button
                    color="danger"
                    onClick={closeModal1}
                    className="mr-1 mt-3"
                  >
                    Cancel
                  </Button> */}
                  <CancelButton cancel={closeModal1} />

                  <SaveButton
                    text="Submit"
                    progress={progress1}
                    buttonStatus={buttonStatus}
                  />
                  {/* <Button
                    type="submit"
                    className="ml-1 mt-3"
                    color="primary"
                    disabled={buttonStatus1}
                  >
                    {progress ? <ButtonLoader /> : "Update"}
                  </Button> */}
                </div>
              </Col>
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
});
export default connect(mapStateToProps)(AddUniversityCountry);
