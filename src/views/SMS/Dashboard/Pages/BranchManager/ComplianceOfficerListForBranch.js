import Axios from "axios";
import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import Pagination from "../../../Pagination/Pagination";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  Col,
  Form,
  FormGroup,
  Input,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { useHistory } from "react-router-dom";
import ButtonLoader from "../../../Components/ButtonLoader";
import remove from "../../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import { Image, Modal as AntModal, Upload } from "antd";
import * as Icon from "react-feather";
import put from "../../../../../helpers/put";
import { rootUrl } from "../../../../../constants/constants";
import ToggleSwitch from "../../../Components/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

const ComplianceOfficerListForBranch = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [complianceOficers, setComplianceOficers] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [stateLabel, setStateLabel] = useState("Select State");
  const [stateValue, setStateValue] = useState(0);
  const [country, setCountry] = useState([]);
  const [officerInfo, setOfficerInfo] = useState({});
  const [emailError, setEmailError] = useState(true);
  const [buttonStatus1, setButtoStatus1] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [updateId, setUpdateId] = useState(undefined);
  const permissions = localStorage.getItem("permissions");

  const { addToast } = useToasts();
  const history = useHistory();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const goToProfile = (data) => {
    history.push(`/complianceOfficerProfile/${data?.id}`);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError("");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    get(`CountryDD/Index`).then((res) => {
      setCountry(res);
    });

    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });

    if (updateId !== undefined) {
      get(`ComplianceOfficer/Get/${updateId}`).then((res) => {
        setOfficerInfo(res);
        setCountryLabel(res?.country?.name);
        setCountryValue(res?.country.id);
        setStateLabel(res?.state?.name);
        setStateValue(res?.state?.id);
        setTitleLabel(res?.nameTittle?.name);
        setTitleValue(res?.nameTittle?.id);
      });
    }

    get(
      `ComplianceOfficer/Getpaginated?page=${currentPage}&pageSize=${dataPerPage}&branchId=${id}`
    ).then((res) => {
      setComplianceOficers(res?.models);
      setEntity(res?.totalEntity);
    });
  }, [currentPage, dataPerPage, callApi, success, updateId, id]);

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteCompOfficer = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`ComplianceOfficer/Delete/${delData}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);

      setSuccess(!success);
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const closeOpenModal = () => {
    setModalOpen(false);
    setUpdateId(undefined);
    setOfficerInfo({});
    setCountryLabel("Select County");
    setCountryValue(0);
    setStateLabel("Select State");
    setStateValue(0);
    setTitleLabel("Select Title");
    setTitleValue(0);
    setFileList([]);
  };

  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Title
  const selectTitle = (label, value) => {
    setTitleError(false);
    setTitleLabel(label);
    setTitleValue(value);
  };

  // select University Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);

    setStateLabel("Select State");
  };

  const handleEmail = (e) => {
    get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  const AuthStr = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    subdata.append(
      "complianceOfficerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    if (titleValue == 0) {
      setTitleError(true);
    } else if (countryValue == 0) {
      setCountryError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      if (updateId != undefined) {
        setButtoStatus1(true);
        setProgress1(true);
        put("ComplianceOfficer/Update", subdata).then((res) => {
          setButtoStatus1(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModalOpen(false);
            setFileList([]);
            setSuccess(!success);
            setUpdateId(undefined);
            setOfficerInfo({});
            setCountryLabel("Select County");
            setCountryValue(0);
            setStateLabel("Select State");
            setStateValue(0);
            setTitleLabel("Select Title");
            setTitleValue(0);
            setFileList([]);
          }
        });
      } else {
        setButtoStatus1(true);
        setProgress1(true);
        Axios.post(`${rootUrl}ComplianceOfficer/Create`, subdata, {
          headers: {
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtoStatus1(false);
          setProgress1(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            // setSubmitData(true);
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModalOpen(false);
            setSuccess(!success);
            setUpdateId(undefined);
            setCountryLabel("Select County");
            setCountryValue(0);
            setStateLabel("Select State");
            setStateValue(0);
            setTitleLabel("Select Title");
            setTitleValue(0);
            setFileList([]);
          }
        });
      }
    }
  };

  const handleUpdate = (officerId) => {
    setUpdateId(officerId);
    setModalOpen(true);
  };

  const handleAccountStatus = (e, officerId) => {
    // setChecked(e.target.checked);

    const subData = {
      id: officerId,
    };

    put(`ComplianceOfficer/UpdateAccountStatus/${officerId}`, subData).then(
      (res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  return (
    <>
      {/* <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="hedding-titel">
              <h5>
                {" "}
                <b>Compliance Officer List</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>

            <div className="d-flex">
              <div className="mr-2 mt-2">Showing :</div>
              <div>
                <Select
                  options={dataSizeName}
                  value={{ label: dataPerPage, value: dataPerPage }}
                  onChange={(opt) => selectDataSize(opt.value)}
                />
              </div>
            </div>
          </div>

          {permissions?.includes(permissionList.Add_New_ComplianceOfficer) ? (
            <ButtonForFunction
              func={handleModalOpen}
              className={" btn btn-uapp-add mt-2"}
              icon={<i className="fas fa-plus"></i>}
              name={" Add Compliance Officer"}
              permission={6}
            />
          ) : null}

          <div className="table-responsive my-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>State/County</th>
                  {permissions?.includes(
                    permissionList.Change_ComplianceOfficer_Status
                  ) ? (
                    <th>Account Status</th>
                  ) : null}
                  <th style={{ width: "8%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {complianceOficers?.map((comp, i) => (
                  <tr key={comp?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{1 + i}</th>

                    <td>
                      {comp?.nameTittle?.name} {comp?.firstName}{" "}
                      {comp?.lastName}
                    </td>

                    <td>{comp?.email}</td>

                    <td>{comp?.phoneNumber}</td>

                    <td>{comp?.city}</td>

                    <td>{comp?.country?.name}</td>
                    <td>{comp?.stateName}</td>

                    {permissions?.includes(
                      permissionList.Change_ComplianceOfficer_Status
                    ) ? (
                      <td>
                        {
                          <ToggleSwitch
                            defaultChecked={
                              comp?.isActive == false ? false : true
                            }
                            onChange={(e) => {
                              handleAccountStatus(e, comp?.id);
                            }}
                          />
                        }
                      </td>
                    ) : null}

                    <td style={{ width: "8%" }} className="text-center">
                      <ButtonGroup variant="text">
                        {permissions?.includes(
                          permissionList?.View_ComplianceOfficer_info
                        ) ? (
                          <ButtonForFunction
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            func={() => goToProfile(comp)}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList.Update_ComplianceOfficer_info
                        ) ? (
                          <>
                            <ButtonForFunction
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              func={() => handleUpdate(comp?.id)}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />
                          </>
                        ) : null}

                        {permissions?.includes(
                          permissionList?.Delete_ComplianceOfficer
                        ) ? (
                          <>
                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(comp?.id)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          </>
                        ) : null}

                        <Modal
                          isOpen={deleteModal}
                          toggle={closeDeleteModal}
                          className="uapp-modal"
                        >
                          <ModalBody>
                            <p>
                              Are You Sure to Delete this? Once Deleted it can't
                              be Undone!
                            </p>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              color="danger"
                              onClick={handleDeleteCompOfficer}
                              disabled={buttonStatus}
                            >
                              {progress ? <ButtonLoader /> : "YES"}
                            </Button>
                            <Button onClick={closeDeleteModal}>NO</Button>
                          </ModalFooter>
                        </Modal>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card> */}

      <div className="custom-card-border p-4 mb-30px">
        <h5 className="mb-0">Compliance Officer </h5>

        {complianceOficers?.length === 0 ? (
          <p className="text-center">No Compliance Officer</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <td>SL/NO</td>
                  <td>Name</td>
                  <td>Contact </td>
                  <td>Address</td>
                  <td>Status </td>
                  <td>Action </td>
                </tr>
              </thead>
              <tbody>
                {complianceOficers?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{i + 1}</td>

                    <td>
                      {item?.nameTittle?.name} {item?.firstName}{" "}
                      {item?.lastName}
                    </td>
                    <td>Contact </td>
                    <td>Address</td>
                    <td>
                      {
                        <ToggleSwitch
                          defaultChecked={
                            item?.isActive === false ? false : true
                          }
                          onChange={(e) => {
                            handleAccountStatus(e, item?.id);
                          }}
                        />
                      }
                    </td>
                    <td>
                      <span
                        className="text-info pointer mr-3"
                        onClick={() => handleUpdate(item?.id)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-danger pointer"
                        onClick={() => toggleDanger(item?.id)}
                      >
                        Delete
                      </span>

                      <ConfirmModal
                        isOpen={deleteModal}
                        toggle={() => setDeleteModal(!deleteModal)}
                        confirm={handleDeleteCompOfficer}
                        cancel={() => setDeleteModal(false)}
                        buttonStatus={buttonStatus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {complianceOficers?.count > 5 && (
              <div className="text-center text-blue">
                <Link to="/applicationsByStatus/1/1">See All</Link>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        toggle={closeOpenModal}
        className="uapp-modal2"
        size="lg"
      >
        <ModalHeader>Compliance Officer</ModalHeader>
        <ModalBody>
          <Form className="mt-5" onSubmit={handleSubmit}>
            <Input type="hidden" value={id} name="branchId" id="branchId" />

            {updateId != undefined ? (
              <Input type="hidden" value={updateId} name="id" id="id" />
            ) : null}

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Title <span className="text-danger">*</span>
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitle}
                  value={{ label: titleLabel, value: titleValue }}
                  onChange={(opt) => selectTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                  required
                />

                {titleError && (
                  <span className="text-danger">Title is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  First Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                  defaultValue={officerInfo?.firstName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Last Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                  defaultValue={officerInfo?.lastName}
                />
              </Col>
            </FormGroup>

            {updateId !== undefined ? null : (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Email <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                    defaultValue={officerInfo?.email}
                    onBlur={handleEmail}
                  />
                  {!emailError ? (
                    <span className="text-danger">Email already exists</span>
                  ) : null}
                </Col>
              </FormGroup>
            )}

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Phone Number</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  defaultValue={officerInfo?.phoneNumber}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Post Code</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="postCode"
                  id="postCode"
                  placeholder="Enter Post Code"
                  defaultValue={officerInfo?.postCode}
                />
              </Col>
            </FormGroup>

            {updateId != undefined ? null : (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Password <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                  />
                </Col>
              </FormGroup>
            )}

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={countryName}
                  value={{ label: countryLabel, value: countryValue }}
                  onChange={(opt) => selectCountry(opt.label, opt.value)}
                  name="countryId"
                  id="countryId"
                  required
                />
                {countryError ? (
                  <span className="text-danger">Country is required</span>
                ) : null}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>State/County</span>
              </Col>
              <Col md="6">
                {/* <Select
                      options={stateName}
                      value={{ label: stateLabel, value: stateValue }}
                      onChange={(opt) => selectState(opt.label, opt.value)}
                      name="stateName"
                      id="stateName"
                      required
                    />
                    {stateError ? (
                      <span className="text-danger">State is required</span>
                    ) : null} */}
                <Input
                  type="text"
                  name="stateName"
                  id="stateName"
                  placeholder="Enter State/County"
                  defaultValue={officerInfo?.stateName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  City <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter City Name"
                  required
                  defaultValue={officerInfo?.city}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Image</span>
              </Col>
              <Col md="6">
                <div className="row">
                  {officerInfo?.complianceOfficerMedia ? (
                    <div className="col-md-4">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          officerInfo?.complianceOfficerMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}
                  <div className="col-md-4">
                    <Upload
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload Image Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                    <AntModal
                      visible={previewVisible}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </AntModal>
                  </div>
                </div>
                <span className="text-danger d-block">{error}</span>
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <Button
                  color="danger"
                  className="mr-1 mt-3"
                  onClick={closeOpenModal}
                >
                  Cancel
                </Button>

                <ButtonForFunction
                  type={"submit"}
                  className={"ml-1 mt-3 badge-primary"}
                  name={progress1 ? <ButtonLoader /> : "Submit"}
                  permission={6}
                  disable={buttonStatus1}
                />
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ComplianceOfficerListForBranch;
