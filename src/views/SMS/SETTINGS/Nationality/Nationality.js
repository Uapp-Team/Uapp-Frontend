import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Form,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import Loader from "../../Search/Loader/Loader";
import { Upload, Modal as AntdModal } from "antd";
import Select from "react-select";
import * as Icon from "react-feather";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import axios from "axios";
import { rootUrl } from "../../../../constants/constants";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const Nationality = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [exelModalOpen, setExelModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [delData, setDelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const token = localStorage.getItem("token");
  // file upload
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [countryId, setCountryId] = useState(0);

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
  };

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const closeDeleteModal = () => {
    setDelData({});
    setDeleteModal(false);
  };

  useEffect(() => {
    get("Nationality/Index").then((res) => {
      setCountryList(res);
      setLoading(false);
    });

    get(`CountryDD/Index`).then((res) => {
      console.log(res);
      setCountries(res);
    });
  }, [success]);

  // on Close Modal
  const closeModal = () => {
    setData({});
    setModalOpen(false);
  };

  const countryOptions = countries?.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const selectCountry = (label, value) => {
    setCountryLabel(label);
    setCountryValue(value);
    setCountryId(value);
    setCountryError(false);
  };

  // on Close Modal
  const closeExelModal = () => {
    setExelModalOpen(false);
  };

  const toggleDeleteModal = (data) => {
    setDelData(data);

    setDeleteModal(true);
  };

  const deleteConfirm = () => {
    setButtonStatus(true);
    setProgress(true);
    axios
      .delete(`${rootUrl}Nationality/Delete/${delData?.id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res?.status == 200 && res?.data?.result == true) {
          setButtonStatus(false);
          setProgress(false);
          addToast("Nationality deleted successfully", {
            appearance: "error",
            autoDismiss: true,
          });
          setDelData({});
          setSuccess(!success);
          setDeleteModal(false);
        } else {
          setButtonStatus(false);
          setProgress(false);
          addToast("Something went wrong", {
            appearance: "error",
            autoDismiss: true,
          });
          setDelData({});

          setDeleteModal(false);
        }
      });
  };

  const AddModalOpen = () => {
    setModalOpen(true);
  };

  const AddExelModalOpen = () => {
    setExelModalOpen(true);
  };

  const handleAddCountry = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    if (countryValue === 0) {
      setCountryError(true);
    } else {
      setButtonStatus(true);
      setProgress1(true);
      put(`Nationality/Create?id=${countryId}`).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setData({});
          setSuccess(!success);
          setModalOpen(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleUpdateCountry = (data) => {
    setData(data);
    setModalOpen(true);
  };

  const handleAddExelFile = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append(
      "nationalityFile",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );

    for (var i of subData) {
    }

    if (FileList1.length < 1) {
      setUploadError(true);
    } else {
      setButtonStatus(true);
      setProgress2(true);
      post("Nationality/CreateFromExcel", subData).then((res) => {
        setButtonStatus(false);
        setProgress2(false);
        if (res?.status == 200 && res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList1([]);
          setExelModalOpen(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb title="Nationalities" backTo="" path="/" />

          <Card>
            <CardHeader>
              <div>
                {permissions?.includes(permissionList.Manage_Core_Data) ? (
                  <Button
                    className="btn btn-uapp-add mr-2"
                    onClick={() => AddModalOpen("add")}
                  >
                    {" "}
                    <i className="fas fa-plus"></i> Add Nationality
                  </Button>
                ) : null}
                {permissions?.includes(permissionList.Manage_Core_Data) ? (
                  <Button
                    className="btn btn-uapp-add"
                    onClick={() => AddExelModalOpen()}
                  >
                    {" "}
                    <i className="fas fa-plus"></i> Import From Excel
                  </Button>
                ) : null}
              </div>

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {countryList.length}{" "}
                  </span>{" "}
                  Nationalities Found{" "}
                </b>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                {/* exel modal starts here */}
                <Modal
                  isOpen={exelModalOpen}
                  toggle={closeExelModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Nationality </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleAddExelFile}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            {" "}
                            Upload Excel File{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          <Upload
                            accept=".xlsx, .xls"
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
                              <div
                                className="text-danger"
                                style={{ marginTop: 8 }}
                              >
                                <Icon.Upload />
                                <br />
                                <span>Upload Here</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </Upload>
                          <AntdModal
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
                          </AntdModal>

                          {uploadError && (
                            <span className="text-danger">
                              Excel file is required
                            </span>
                          )}
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
                          onClick={closeExelModal}
                        >
                          Close
                        </Button>

                        <Button
                          color="primary"
                          type="submit"
                          className="mr-1 mt-3"
                          disabled={buttonStatus}
                        >
                          {progress2 ? <ButtonLoader /> : "Submit"}
                        </Button>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
                {/* exel modal ends here */}

                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Nationality </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleAddCountry}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            {" "}
                            Country Name <span className="text-danger">
                              *
                            </span>{" "}
                          </span>
                        </Col>
                        <Col md="8">
                          {data?.id ? (
                            <input
                              type="hidden"
                              name="id"
                              id="id"
                              value={data?.id}
                            />
                          ) : null}

                          <Select
                            options={countryOptions}
                            value={{ label: countryLabel, value: countryValue }}
                            onChange={(opt) =>
                              selectCountry(opt.label, opt.value)
                            }
                            name="cultureCountryId"
                            id="cultureCountryId"
                          />

                          {countryError && (
                            <span className="text-danger">
                              Country Name is required
                            </span>
                          )}
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
                <div></div>
              </div>

              <div className="table-responsive">
                <Table className="table-sm table-bordered text-center">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th> Name</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryList.map((list, index) => (
                      <tr key={index} list={list}>
                        <td>{index + 1}</td>
                        <td>{list?.name}</td>

                        <td>
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.Manage_Core_Data
                            ) ? (
                              <Button
                                className="btn-sm mx-2"
                                onClick={() => toggleDeleteModal(list)}
                                color="danger"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
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

      {/* modal for delete */}
      <ConfirmModal
        text="Do You Want To Delete This Nationality? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        confirm={deleteConfirm}
        cancel={closeDeleteModal}
      />
    </div>
  );
};

export default Nationality;
