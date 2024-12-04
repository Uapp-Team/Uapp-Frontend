import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Col, FormGroup, Input, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import put from "../../../../../helpers/put";
import Select from "react-select";
import { Image } from "antd";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import { rootUrl } from "../../../../../constants/constants";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ProviderNavigation from "../ProviderRegistrationAndNavigation/ProviderNavigation";
import { userTypes } from "../../../../../constants/userTypeConstant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import UploadButton from "../../../../../components/buttons/UploadButton";
import DownloadButton from "../../../../../components/buttons/DownloadButton";

const UpdateProvider = () => {
  const { id } = useParams();
  const userType = localStorage.getItem("userType");
  const activetab = "1";
  const [providerInfo, setProviderInfo] = useState({});
  console.log(providerInfo);
  const [providerType, setProviderType] = useState([]);
  const [providerTypeLabel, setProviderTypeLabel] = useState(
    "Select Provider type"
  );
  const [providerTypeValue, setProviderTypeValue] = useState(0);
  const [providerTypeError, setProviderTypeError] = useState(false);
  const [providerStatus, setProviderStatus] = useState([]);
  const [providerStatusLabel, setProviderStatusLabel] = useState(
    "Select Provider Status"
  );
  const [providerStatusValue, setProviderStatusValue] = useState(0);
  const [providerStatusError, setProviderStatusError] = useState(false);
  const [FileList2, setFileList2] = useState([]);
  const [familyError, setFamilyError] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [logo, setlogo] = useState(false);
  const [cover, setcover] = useState(false);
  const [logoFileList, setLogoFileList] = useState([]);
  const [coverFileList, setCoverFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [providerNameError, setProviderNameError] = useState("");
  const [providerName, setProviderName] = useState("");
  const [officialEmailError, setOfficialEmailError] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [financeEmailError, setFinanceEmailError] = useState("");
  const [financeEmail, setFinanceEmail] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [CompanyLicenseNumberError, setCompanyLicenseNumberError] =
    useState("");
  const [companyLicenseNumber, setCompanyLicenseNumber] = useState("");
  const [vatNumberError, setVatNumberError] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [imgError, setImgError] = useState(false);
  const [coverImgError, setCoverImgError] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);

  useEffect(() => {
    get(`Provider/GetViewModel/${id}`).then((res) => {
      console.log(res);
      setBranchValue(res?.branchId);
      setBranchLabel(res?.branchName);
      setProviderInfo(res);
      setProviderTypeLabel(res?.providerType?.name);
      setProviderTypeValue(res?.providerType?.id);
      setProviderName(res?.providerName);
      setOfficialEmail(res?.officialEmail);
      setFinanceEmail(res?.financeEmail);

      setphoneNumber(res?.officialPhoneNumber);
      setCompanyLicenseNumber(res?.companyLisenceNumber);
      setVatNumber(res?.vatNumber);
      setProviderStatusValue(res?.providerAccountStatus?.id);
      console.log(res?.providerAccountStatus?.name);
      setProviderStatusLabel(res?.providerAccountStatus?.name);
    });
  }, [id]);

  useEffect(() => {
    get(`ProviderType/GetAll`)
      .then((res) => {
        setProviderType(res);
      })
      .catch();
  }, []);

  useEffect(() => {
    get("ProviderAccountStatusDD/Index").then((res) => {
      setProviderStatus(res);
    });
  }, []);

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
    });
  }, []);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const ProStatus = providerStatus?.map((proStatus) => ({
    label: proStatus.name,
    value: proStatus.id,
  }));

  const providerMenu = providerType?.map((providerOptions) => ({
    label: providerOptions.name,
    value: providerOptions.id,
  }));

  const selectProviderType = (label, value) => {
    setProviderTypeLabel(label);
    setProviderTypeValue(value);
  };

  const selectProviderStatus = (label, value) => {
    setProviderStatusError(false);
    setProviderStatusLabel(label);
    setProviderStatusValue(value);
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setFamilyError("");
  };

  const handleLogoFileChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setLogoFileList([]);
      setlogo("Only jpeg, jpg, png image is allowed");
    } else {
      setLogoFileList(fileList);
      setlogo("");
      setImgError(false);
    }
  };

  const handleCoverFileChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setCoverFileList([]);
      setcover("Only jpeg, jpg, png image is allowed");
    } else {
      setCoverFileList(fileList);
      setcover("");
      setCoverImgError(false);
    }
  };

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

  const handleProviderName = (e) => {
    setProviderName(e.target.value);
    if (e.target.value === "") {
      setProviderNameError("Provider Name is required");
    } else {
      setProviderNameError("");
    }
  };

  const handleOfficialEmail = (e) => {
    setOfficialEmail(e.target.value);

    if (e.target.value === "") {
      setOfficialEmailError("Official Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setOfficialEmailError("Official Email is not validate");
    } else {
      setOfficialEmailError("");
    }
  };
  const handleFinanceEmail = (e) => {
    setFinanceEmail(e.target.value);
    if (e.target.value) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
        setFinanceEmailError("Finance Email is not validate");
      } else {
        setFinanceEmailError("");
      }
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNUmberError("Phone number is required");
    } else if (value?.length < 9) {
      setphoneNUmberError("Phone number required minimum 9 digit");
    } else {
      setphoneNUmberError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (providerStatusValue === 0) {
      isFormValid = false;
      setProviderStatusError(true);
    }
    if (providerTypeValue === 0) {
      isFormValid = false;
      setProviderTypeError(true);
    }
    if (!providerName) {
      isFormValid = false;
      setProviderNameError("Provider Name is required");
    }
    if (!phoneNumber) {
      isFormValid = false;
      setphoneNUmberError("Phone number is required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNUmberError("Phone number required minimum 9 digit");
    }

    if (!officialEmail) {
      isFormValid = false;
      setOfficialEmailError("Official Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(officialEmail)
    ) {
      isFormValid = false;
      setOfficialEmailError("Official Email is not validate");
    }
    if (financeEmail) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(financeEmail)) {
        isFormValid = false;
        setFinanceEmailError("Email is not Valid");
      }
    }

    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);
    subData.append("companyLisenceFile", FileList2[0]?.originFileObj);
    subData.append("providerLogoFile", logoFileList[0]?.originFileObj);
    subData.append("providerCoverPhotoFile", coverFileList[0]?.originFileObj);
    subData.append("officialPhoneNumber", phoneNumber);
    for (var value of subData.values()) {
      console.log("valuess", value);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      put(`Provider/Update`, subData, config).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/providerAddress/${id}`);
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Provider Informations"
        backTo={userType === userTypes?.ProviderAdmin ? null : "Provider"}
        path="/providerList"
      />
      <ProviderNavigation id={id} activetab={activetab}></ProviderNavigation>
      <Card>
        <CardBody>
          <p className="section-title">Company or Institution Details</p>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" id="id" value={providerInfo?.id} />
            {userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <FormGroup row className="has-icon-left position-relative">
                <Col lg="6" md="8">
                  {" "}
                  <span>
                    <span className="text-danger">*</span> Branch{" "}
                    <span className="text-danger"></span>
                  </span>
                  <Select
                    className="form-mt"
                    options={branchOptions}
                    value={{ label: branchLabel, value: branchValue }}
                    onChange={(opt) => selectBranch(opt.label, opt.value)}
                    name="BranchId"
                    id="BranchId"
                    // isDisabled={branchId ? true : false}
                  />
                  {branchError && (
                    <span className="text-danger">Branch is required</span>
                  )}
                </Col>
              </FormGroup>
            ) : null}

            {userType === userTypes.ProviderAdmin.toString() ? null : (
              <>
                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span>{" "}
                      <span>Provider Status</span>
                    </span>

                    <Select
                      options={ProStatus}
                      value={{
                        label: providerStatusLabel,
                        value: providerStatusValue,
                      }}
                      onChange={(opt) =>
                        selectProviderStatus(opt.label, opt.value)
                      }
                      name="ProviderAccountStatusId"
                      id="ProviderAccountStatusId"
                      required
                    />
                    {providerStatusError && (
                      <span className="text-danger">
                        Provider Status is required
                      </span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span>{" "}
                      <span>Company/Provider type</span>
                    </span>

                    <Select
                      options={providerMenu}
                      value={{
                        label: providerTypeLabel,
                        value: providerTypeValue,
                      }}
                      onChange={(opt) =>
                        selectProviderType(opt.label, opt.value)
                      }
                      name="providerTypeId"
                      id="providerTypeId"
                    />
                    {providerTypeError && (
                      <span className="text-danger">
                        Company/Provider type is required
                      </span>
                    )}
                  </Col>
                </FormGroup>
              </>
            )}
            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span>{" "}
                  <span>Company or Institution name</span>
                </span>

                <Input
                  type="text"
                  name="ProviderName"
                  id="ProviderName"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    handleProviderName(e);
                  }}
                  value={providerName}
                />
                <span className="text-danger">{providerNameError}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col lg="6" md="8" className="phone-input-group">
                <span>
                  <span className="text-danger">*</span>
                  Official Phone
                </span>
                <PhoneInput
                  className="w-100"
                  type="string"
                  name="officialPhoneNumber"
                  id="officialPhoneNumber"
                  country={"gb"}
                  enableLongNumbers={true}
                  onChange={handlePhoneNumber}
                  value={phoneNumber ? phoneNumber : ""}
                  inputProps={{
                    required: true,
                  }}
                />

                <span className="text-danger">{phoneNUmberError}</span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span>{" "}
                  <span>Official Email</span>
                </span>

                <Input
                  type="email"
                  name="OfficialEmail"
                  id="OfficialEmail"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    handleOfficialEmail(e);
                  }}
                  value={officialEmail}
                />
                <span className="text-danger">{officialEmailError}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span>Finance (Billing) Email</span>
                </span>

                <Input
                  type="email"
                  name="FinanceEmail"
                  id="FinanceEmail"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    handleFinanceEmail(e);
                  }}
                  value={financeEmail}
                />
                <span className="text-danger">{financeEmailError}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span>Company Lisence Number</span>
                </span>

                <Input
                  type="text"
                  name="CompanyLisenceNumber"
                  id="CompanyLisenceNumber"
                  placeholder="Enter Address Line"
                  defaultValue={providerInfo?.companyLisenceNumber}
                />
                <span className="text-danger">{CompanyLicenseNumberError}</span>
              </Col>
            </FormGroup>
            <Row>
              <Col lg="6" md="8">
                <FormGroup row>
                  <Col sm="4">
                    <span>Company Lisence File </span>
                  </Col>
                  <Col sm="3">
                    <Upload
                      multiple={false}
                      fileList={FileList2}
                      onChange={handleChange2}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList2.length < 1 ? <UploadButton /> : ""}
                    </Upload>

                    <div className="text-danger d-block">{familyError}</div>
                  </Col>

                  <Col sm="3">
                    {providerInfo?.companyLisenceFileId !== null ? (
                      <a
                        href={rootUrl + providerInfo?.companyLisence?.fileUrl}
                        target="blank"
                      >
                        <DownloadButton />
                      </a>
                    ) : null}
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup row>
              <Col lg="6" md="8">
                <span>VAT registration No. </span>

                <Input
                  type="text"
                  name="vatNumber"
                  id="vatNumber"
                  placeholder="Enter Address Line"
                  defaultValue={providerInfo?.vatNumber}
                />
                <span className="text-danger">{vatNumberError}</span>
              </Col>
            </FormGroup>

            <Row>
              <Col lg="6">
                <FormGroup row>
                  <Col md="3">
                    <span>
                      {/* {userType !== userTypes?.SystemAdmin.toString() && (
                        <span className="text-danger mr-1">*</span>
                      )} */}
                      Logo
                    </span>
                  </Col>

                  <Col md="5">
                    <div className="d-flex">
                      {providerInfo?.providerLogoId !== null ? (
                        <div className="mr-2">
                          <Image
                            width={104}
                            height={104}
                            src={rootUrl + providerInfo?.providerLogo?.fileUrl}
                          />
                        </div>
                      ) : null}
                      <div className="ms-2">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={logoFileList}
                          onPreview={handlePreview}
                          onChange={handleLogoFileChange}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {logoFileList.length < 1 ? (
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
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

                        <span className="text-danger d-block">{logo}</span>
                      </div>
                    </div>
                    {/* {userType !== userTypes?.SystemAdmin.toString() ? (
                      <>
                        {" "}
                        {imgError ? (
                          <span className="text-danger">Logo is required</span>
                        ) : null}
                      </>
                    ) : null} */}
                    {imgError ? (
                      <span className="text-danger">Logo is required</span>
                    ) : null}
                  </Col>
                  <Col md="4" className="pt-4">
                    <span className="text-gray">
                      File size less than 2MB, keep visual elements centered
                    </span>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup row>
                  <Col md="3">
                    <span> Cover Image</span>
                  </Col>

                  <Col md="5">
                    <div className="d-flex">
                      {providerInfo?.providerCoverPhotoId !== null ? (
                        <div className="mr-2">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              providerInfo?.providerCoverPhoto?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}
                      <div className="ms-2">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={coverFileList}
                          onPreview={handlePreview}
                          onChange={handleCoverFileChange}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {coverFileList.length < 1 ? (
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
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

                        <span className="text-danger d-block">{cover}</span>
                      </div>
                    </div>
                    {coverImgError ? (
                      <span className="text-danger">
                        Cover Image is required
                      </span>
                    ) : null}
                  </Col>
                  <Col md="4">
                    <span className="text-gray">
                      Recommanded resolution is 1674*412 with file size less
                      than 2MB, keep visual elements centered
                    </span>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row className="mt-4 text-right">
              <Col lg="6" md="8">
                {permissions?.includes(permissionList.Edit_Provider) ? (
                  <SaveButton
                    text="Save and Next"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                ) : null}
              </Col>
            </FormGroup>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateProvider;
