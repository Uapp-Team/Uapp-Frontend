import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import Loader from "../Search/Loader/Loader";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import put from "../../../helpers/put";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import { rootUrl } from "../../../constants/constants";

const Department = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [departmentInfo, setDepartmentInfo] = useState([]);
  const [depId, setDepId] = useState(0);
  const [depName, setDepName] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [department, setdepartment] = useState("");
  const [DepartmentNameError, setDepartmentNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [data, setData] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [dImg, setDImg] = useState({})
  console.log(dImg, 'dimg');


  useEffect(() => {
    get(`Department/index`).then((res) => {
      setDepartmentInfo(res);
      setLoading(false);
    });
  }, [success]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setData({});
    setdepartment("");
    setDescription("");
    setDescriptionError("");
    setDepartmentNameError("");


  };

  const handleDepartmentName = (e) => {
    setdepartment(e.target.value);
    if (e.target.value === "") {
      setDepartmentNameError("Department name is required");
    } else {
      setDepartmentNameError("");
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

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (!department) {
      isFormValid = false;
      setDepartmentNameError("Department name is required");
    }
    if (!description) {
      isFormValid = false;
      setDescriptionError("Description is required");
    }
    return isFormValid;
  };

  const handleUpdate = (data) => {
    setData(data);
    console.log(data);
    setDImg(data?.departmentImage?.fileUrl)
    setModalOpen(true);
    setdepartment(data?.name);
    setDescription(data?.description);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }


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
      setImgError(false);
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    subData.append("departmentImage", FileList[0]?.originFileObj);
    subData.append("name", department);
    subData.append("id", data?.id ? data.id : 0);
    subData.append("description", description);

    // const subdata = {
    //   id: data?.id,
    //   name: department,
    //   description: description,
    //   departmentImage: FileList[0]?.originFileObj,
    // };


    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      if (!data?.id) {
        setProgress1(true);
        setButtonStatus(true);
        post(`Department/Create`, subData).then((res) => {
          setProgress1(false);
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSuccess(!success);
            setModalOpen(false);

            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            get(`Department/index`).then((res) => {
              setDepartmentInfo(res);
            });
            setSuccess(!success);
            setModalOpen(false);
            setdepartment("");
            setData({});
            setFileList([]);
            setDepartmentNameError("");
            setDescription("");
            setDescriptionError("");
          } else if (res?.status === 200 && res?.data?.isSuccess === false) {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`Department/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setdepartment("");
            setDepartmentNameError("");
            setDescription("");
            setDescriptionError("");
            setData({});
            setFileList([]);
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

  const toggleDanger = (name, id) => {
    setDepName(name);
    setDepId(id);
    setDeleteModal(true);
  };
  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDepName("");
    setDepId(0);
  };

  const handleDelete = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`Department/Delete/${id}`).then((res) => {
      setButtonStatus1(false);
      setProgress(false);
      setSuccess(!success);
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      const newState = departmentInfo.filter((data) => data.id != id);
      setDepartmentInfo(newState);
      setDepName("");
      setDepId(0);
    });
  };

  const AddModalOpen = () => {
    setModalOpen(true);
    setdepartment("");
  };

  return (
    <div>
      <BreadCrumb title="Department List" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardHeader>
              {permissions?.includes(permissionList.Add_Departments) ? (
                <ButtonForFunction
                  func={AddModalOpen}
                  className={"btn btn-uapp-add"}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Department"}
                  permission={6}
                />
              ) : null}

              <div>
                <b>
                  Total{" "}
                  <span className="badge badge-primary">
                    {" "}
                    {departmentInfo.length}
                  </span>{" "}
                  Department Found{" "}
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
                  <ModalHeader>Add Department </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Department Name{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="7">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            value={department}
                            onChange={(e) => {
                              handleDepartmentName(e);
                            }}
                            placeholder="Create Department"
                          />
                          <span className="text-danger">
                            {DepartmentNameError}
                          </span>
                        </Col>
                      </FormGroup>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Description <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="7">
                          <GrammarlyEditorPlugin clientId="client_6TpAG6pgQ9Tz9ozRZHiGDf">
                            <Input
                              type="textarea"
                              rows="4"
                              name="description"
                              id="description"
                              value={description}
                              onChange={(e) => {
                                handleDescription(e);
                              }}
                              placeholder="Add Description"
                            />
                            <span className="text-danger">
                              {descriptionError}
                            </span>
                          </GrammarlyEditorPlugin>
                        </Col>
                      </FormGroup>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Image <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="7">
                          <div className="row">
                            {data?.id ? <>   {data?.departmentImage !== null ? (
                              <div className="col-md-6 pb-2 pr-3">
                                <Image
                                  width={104}
                                  height={104}
                                  src={rootUrl + dImg}
                                />
                              </div>
                            ) : null}</> : null}

                            <div className="col-md-6 pb-2 pr-3">
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
                                  <div
                                    className="text-danger"
                                    style={{ marginTop: 8 }}
                                  >
                                    <Icon.Upload />
                                    {/* <br />
                                  <span>Upload Here</span> */}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Upload>
                              <Modal
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
                              </Modal>
                              <span className="text-danger d-block">{error}</span>
                            </div>
                          </div>
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

              {permissions?.includes(permissionList.View_Departments) && (
                <div className="table-responsive">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {/* <th>SL/NO</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentInfo.map((dept, index) => (
                        <tr
                          key={index}
                          dept={dept}
                          style={{ textAlign: "center" }}
                        >
                          {/* <th scope="row">{index + 1}</th> */}
                          <td>{dept?.name}</td>
                          <td>{dept?.description}</td>
                          <td>
                            <ButtonGroup variant="text">
                              {/* <Button  color="danger" onClick={()=>handleDelete(dept?.id)}   className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}

                              {/* <Button className="btn-sm mx-2" onClick={() => toggleDanger(dept.name, dept.id)} color="danger"><i className="fas fa-trash-alt"></i></Button> */}

                              {permissions?.includes(
                                permissionList.Edit_Departments
                              ) ? (
                                <ButtonForFunction
                                  func={() => handleUpdate(dept)}
                                  className={"btn-sm"}
                                  color={"warning"}
                                  icon={<i className="fas fa-edit"></i>}
                                  permission={6}
                                />
                              ) : null}

                              {permissions?.includes(
                                permissionList.Delete_Departments
                              ) ? (
                                <ButtonForFunction
                                  func={() => toggleDanger(dept.name, dept.id)}
                                  className={"btn-sm mx-2"}
                                  color={"danger"}
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  permission={6}
                                />
                              ) : null}

                              {/* <Link to={`editDepartment/${dept?.id}`}>
                         <Button color="warning" className=" btn-sm"> <i className="fas fa-edit"></i> </Button>
                         </Link> */}

                              {/* <LinkButton
                          url={`editDepartment/${dept?.id}`}
                          color={"warning"}
                          className={"btn-sm"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        /> */}
                            </ButtonGroup>

                            {/* modal for delete */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      <ConfirmModal
        text="Do You Want To Delete This Department? Once Deleted it can't be Undone "
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
        confirm={() => handleDelete(depId)}
      />
    </div>
  );
};

export default Department;
