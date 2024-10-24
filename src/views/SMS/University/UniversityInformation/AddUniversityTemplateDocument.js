import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import get from "../../../../helpers/get";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import { Image } from "antd";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { rootUrl } from "../../../../constants/constants";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import UniversityNavbar from "../Components/UniversityNavbar";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const AddUniversityTemplateDocument = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { univerId } = useParams();
  const activetab = "5";
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [applicationError, setApplicationError] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [applicationObject, setApplicationObject] = useState({});
  const [applicationTypeLabel, setApplicationTypeLabel] = useState(
    "Select Application Type"
  );
  const [applicationTypeValue, setApplicationTypeValue] = useState(0);
  const [applicationTypeId, setApplicationTypeId] = useState([]);

  // image upload starts here
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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

  const goPrevious = () => {
    history.push(`/addUniversityFeaturesGallery/${univerId}`);
  };
  const goForward = () => {
    history.push(`/addUniversityFunding/${univerId}`);
  };

  useEffect(() => {
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeId(res);
    });

    if (univerId !== undefined) {
      get(`UniversityTemplateDocument/GetByUniversity/${univerId}`).then(
        (res) => {
          setLoading(false);
          setTemplateList(res);
          if (res.length > 0) {
            setShowForm(true);
          } else {
            setShowForm(false);
            setSelectedId(0);
          }
        }
      );
    }
  }, [success, univerId]);

  const applicationOptions = applicationTypeId?.map((app) => ({
    label: app?.name,
    value: app?.id,
  }));

  const selectApplicationType = (label, value) => {
    setApplicationError(false);
    setApplicationTypeLabel(label);
    setApplicationTypeValue(value);
  };

  // redirect to
  const backToUniList = () => {
    history.push("/universityList");
  };

  const toggleDanger = (p) => {
    setTemplateId(p?.id);
    setTemplateName(p?.name);
    setDeleteModal(true);
  };

  const handleName = (e) => {
    let data = e.target.value.trimStart();
    setName(data);
    if (data === "") {
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

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (applicationTypeValue === 0) {
      isFormValid = false;
      setApplicationError(true);
    }
    if (!name) {
      isFormValid = false;
      setNameError("Name is required");
    }
    if (FileList1.length < 1 && selectedId === 0) {
      isFormValid = false;
      setUploadError(true);
    }
    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);

    subData.append(
      "template",
      FileList1.length === 0 ? null : FileList1[0]?.originFileObj
    );

    // for(var i of subData){
    //
    // }
    if (validateRegisterForm()) {
      if (selectedId === 0) {
        setProgress(true);
        setButtonStatus(true);
        post("UniversityTemplateDocument/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            // history.push('/addUniversityRequiredDocument');
            setSuccess(!success);
            setShowForm(!showForm);
            setFileList1([]);
            setApplicationTypeLabel("Select Application Type");
            setApplicationTypeValue(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`UniversityTemplateDocument/Update`, subData).then((res) => {
          // setuniversityId(res.data.result.universityId)
          setButtonStatus(false);
          setProgress(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            // setSubmitData(false);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setShowForm(true);
            setSelectedId(0);
            setFileList1([]);
            setApplicationObject({});
            setSuccess(!success);
          }
        });
      }
    }
  };

  const onShow = () => {
    setShowForm(false);
    setApplicationTypeLabel("Select Application Type");
    setApplicationTypeValue(0);
    setApplicationObject({});
    setFileList1([]);
    setSelectedId(0);
  };

  const cancel = () => {
    setShowForm(true);
    setSelectedId(0);
    setApplicationTypeLabel("Select Application Type");
    setApplicationTypeValue(0);
  };

  const handleDeletePermission = (id) => {
    setButtonStatus(true);
    setProgress1(true);
    remove(`UniversityTemplateDocument/Delete/${id}`).then((action) => {
      if (action?.status === 200 && action?.data?.isSuccess === true) {
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setProgress1(false);
        setDeleteModal(false);
        setSuccess(!success);
        setTemplateId(0);
        setTemplateName("");
      } else {
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setProgress1(false);
        setButtonStatus(false);
        setDeleteModal(false);
        setTemplateId(0);
        setSuccess(!success);
        setTemplateName("");
      }
    });
  };

  const handleUpdate = (id) => {
    setShowForm(false);

    get(`UniversityTemplateDocument/Get/${id}`).then((action) => {
      setApplicationObject(action);
      setName(action?.name);
      setApplicationTypeLabel(
        action?.applicationTypeId === 1
          ? "Home"
          : action?.applicationTypeId === 2
          ? "EU/UK"
          : "International"
      );
      setApplicationTypeValue(action?.applicationTypeId);
      setSelectedId(action?.id);
    });
  };

  return (
    <div>
      <BreadCrumb
        title="University Template Document"
        backTo="University"
        path="/universityList"
      />

      <UniversityNavbar activetab={activetab} univerId={univerId} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="5">
                  {templateList.length > 0 ? (
                    <div className="table-responsive mt-4 mb-3">
                      <p className="section-title">
                        University Template Document
                      </p>
                      <Table className="table-sm table-bordered">
                        <thead className="tablehead">
                          <tr /*style={{ textAlign: "center" }}*/>
                            {/* <th>SL/NO</th> */}
                            <th>Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>File</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {templateList?.map((temp, i) => (
                            <tr
                              key={temp?.id} /*style={{ textAlign: "center" }}*/
                            >
                              {/* <th scope="row">{i + 1}</th> */}
                              <td>{temp?.name}</td>
                              <td>{temp?.description}</td>
                              <td>
                                {temp?.applicationTypeId === 1
                                  ? "Home"
                                  : temp?.applicationTypeId === 2
                                  ? "EU/UK"
                                  : "International"}
                              </td>
                              <td>
                                <a
                                  href={rootUrl + temp?.templateFile?.fileUrl}
                                  target="blank"
                                  download
                                >
                                  <i
                                    class="fas fa-arrow-down"
                                    style={{ color: "black" }}
                                  ></i>{" "}
                                  Download
                                </a>
                              </td>

                              <td>
                                {permissions?.includes(
                                  permissionList.Edit_University
                                ) && (
                                  <p>
                                    <a href="#template-document-form">
                                      <span
                                        className="mr-2"
                                        pointer
                                        text-body
                                        onClick={() => handleUpdate(temp?.id)}
                                      >
                                        Edit
                                      </span>
                                    </a>
                                    |
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() => toggleDanger(temp)}
                                    >
                                      Delete
                                    </span>
                                  </p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <ConfirmModal
                        text={`Do You Want To Delete This ${templateName} Information ?`}
                        isOpen={deleteModal}
                        toggle={() => {
                          setDeleteModal(false);
                          setTemplateId(0);
                          setTemplateName("");
                        }}
                        confirm={() => handleDeletePermission(templateId)}
                        cancel={() => {
                          setDeleteModal(false);
                          setTemplateId(0);
                          setTemplateName("");
                        }}
                        buttonStatus={buttonStatus}
                        progress={progress}
                      />
                    </div>
                  ) : null}

                  {permissions?.includes(permissionList.Edit_University) && (
                    <>
                      {showForm === false ? (
                        <div className="pt-3">
                          <Form
                            onSubmit={handleSubmit}
                            id="template-document-form"
                          >
                            <p className="section-title"> Template Document</p>
                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Input
                                type="hidden"
                                id="universityId"
                                name="universityId"
                                value={univerId}
                              />
                              {selectedId !== 0 ? (
                                <Input
                                  type="hidden"
                                  id="Id"
                                  name="Id"
                                  value={selectedId}
                                />
                              ) : null}
                            </FormGroup>

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="6">
                                <span>
                                  <span className="text-danger">*</span>{" "}
                                  Application Type{" "}
                                </span>
                                <Select
                                  options={applicationOptions}
                                  value={{
                                    label: applicationTypeLabel,
                                    value: applicationTypeValue,
                                  }}
                                  onChange={(opt) =>
                                    selectApplicationType(opt.label, opt.value)
                                  }
                                  name="applicationTypeId"
                                  id="applicationTypeId"
                                />

                                {applicationError && (
                                  <span className="text-danger">
                                    Application type is required
                                  </span>
                                )}
                              </Col>
                            </FormGroup>

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="6">
                                <span>
                                  {" "}
                                  <span className="text-danger">
                                    *
                                  </span> Name{" "}
                                </span>
                                <Input
                                  type="text"
                                  name="name"
                                  id="name"
                                  onChange={(e) => {
                                    handleName(e);
                                  }}
                                  value={name}
                                  placeholder="Write Name"
                                />
                                <span className="text-danger">{nameError}</span>
                              </Col>
                            </FormGroup>

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="6">
                                <span>Description </span>
                                <Input
                                  type="textarea"
                                  rows="4"
                                  name="description"
                                  id="description"
                                  defaultValue={applicationObject?.description}
                                  placeholder="Write Description"
                                />
                              </Col>
                            </FormGroup>

                            <Row>
                              <Col md="6">
                                <FormGroup
                                  row
                                  className="has-icon-left position-relative"
                                >
                                  <Col md="3">
                                    <span>
                                      <span className="text-danger">*</span>{" "}
                                      Upload Document:{" "}
                                    </span>
                                  </Col>
                                  <Col md="5">
                                    <div className="row">
                                      {applicationObject?.templateFile ? (
                                        <div className="col-md-6">
                                          <Image
                                            width={104}
                                            height={104}
                                            src={
                                              rootUrl +
                                              applicationObject?.templateFile
                                                ?.thumbnailUrl
                                            }
                                          />
                                        </div>
                                      ) : null}

                                      <div className="col-md-6">
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
                                      </div>
                                    </div>

                                    {uploadError && (
                                      <span className="text-danger">
                                        Document is required
                                      </span>
                                    )}
                                  </Col>
                                  <Col md="4" className="pt-4">
                                    <span
                                      style={{ color: "rgba(0, 0, 0, 0.45)" }}
                                    >
                                      File size less than 2MB, keep visual
                                      elements centered
                                    </span>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="has-icon-left position-relative text-right">
                                  {templateList.length > 0 && (
                                    <button
                                      className="cancel-button"
                                      onClick={cancel}
                                    >
                                      Cancel
                                    </button>
                                  )}
                                  <button className="save-button" type="submit">
                                    Save
                                  </button>
                                  {progress ? (
                                    <span>
                                      <ButtonLoader />
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      ) : (
                        <FormGroup>
                          <button
                            className="add-button"
                            onClick={onShow}
                            permission={6}
                          >
                            Add another
                          </button>
                        </FormGroup>
                      )}
                    </>
                  )}

                  <Row className="mt-4 ">
                    <Col className="d-flex justify-content-between mt-4">
                      <PreviousButton action={goPrevious} />
                      <SaveButton text="Next" action={goForward} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddUniversityTemplateDocument;
