import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";

import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
  Label,
} from "reactstrap";

import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import { Image } from "antd";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import { rootUrl } from "../../../../../../constants/constants";
import ProviderAdminNavigation from "../ProviderAdminRegistrationAndNavigation/ProviderAdminNavigation";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import post from "../../../../../../helpers/post";
import get from "../../../../../../helpers/get";
import moment from "moment";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const ProviderAdminEligibilityInfo = () => {
  const [activetab, setActivetab] = useState("4");
  const [success, setSuccess] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Country of Citizenship"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [errorc, setErrorC] = useState("");

  const [uniCountryLabel2, setUniCountryLabel2] = useState("Select Residence");
  const [uniCountryValue2, setUniCountryValue2] = useState(0);
  const [errorc2, setErrorC2] = useState("");
  const [exDate, setExDate] = useState("");

  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);
  const [residencyError, setResidencyError] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // Id or Passport States

  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);
  const [idPassportError, setIdPassportError] = useState(false);

  // Proof of Address States

  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewImage4, setPreviewImage4] = useState("");
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState([]);
  const [proofOfAddressError, setProofOfAddressError] = useState(false);

  // Proof of Right to Work States

  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewImage5, setPreviewImage5] = useState("");
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState([]);
  const [proofOfRightError, setProofOfRightError] = useState("");

  const [previewVisible6, setPreviewVisible6] = useState(false);
  const [previewImage6, setPreviewImage6] = useState("");
  const [previewTitle6, setPreviewTitle6] = useState("");
  const [FileList6, setFileList6] = useState([]);
  const [cvError, setCvError] = useState("");

  const [rightToWork, setRightToWork] = useState("false");

  const [eligibilityData, setEligibilityData] = useState({});
  const [navVisibility, setNavVisibility] = useState({});

  const { providerId, providerAdminId } = useParams();
  const userTypeId = localStorage.getItem("userType");

  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    get(
      `ProviderAdminEligibility/GetProviderAdminEligibility/${providerAdminId}`
    ).then((res) => {
      //
      console.log("eligibilitydata", res);
      setEligibilityData(res);
      setUniCountryLabel(
        res !== null
          ? res?.countryOfCitizenShip?.name
          : "Select Country of Citizenship"
      );
      setUniCountryValue(res !== null ? res?.countryOfCitizenShip?.id : 0);
      setUniCountryLabel2(
        res !== null ? res?.countryOfResidence?.name : "Select Residence"
      );
      setUniCountryValue2(res !== null ? res?.countryOfResidence?.id : 0);
      setResidencyLabel(
        res !== null ? res?.residencyStatus?.name : "Select Residency Status"
      );
      setResidencyValue(res !== null ? res?.residencyStatus?.id : "0");
      //   setRadioPracticalTraining();
      setRightToWork(
        res?.haveRightToWork !== null ? `${res?.haveRightToWork}` : "false"
      );
      setExDate(
        res?.expireDate !== null
          ? moment(new Date(res?.expireDate)).format("YYYY-MM-DD")
          : null
      );
    });
  }, [success]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  const countryDD2 = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // select Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setErrorC("");
    if (uniCountryValue == uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };

  // select residence
  const selectUniCountry2 = (label, value) => {
    setUniCountryLabel2(label);
    setUniCountryValue2(value);
    setErrorC2("");
    if (uniCountryValue == uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };

  const residencyOptions = residency?.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  const selectResidency = (label, value) => {
    setResidencyError("");
    setResidencyLabel(label);
    setResidencyValue(value);
  };

  // Id or Passport Code Start

  function getBase643(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase643(file.originFileObj);
    }

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError(false);
  };

  // Id or Passport Code End

  // Proof of Address Code Start

  function getBase644(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel4 = () => {
    setPreviewVisible4(false);
  };

  const handlePreview4 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase644(file.originFileObj);
    }

    setPreviewImage4(file.url || file.preview);
    setPreviewVisible4(true);
    setPreviewTitle4(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setProofOfAddressError(false);
  };

  // Proof of Address Code End

  // Proof of Right to Work Code Start

  function getBase645(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel5 = () => {
    setPreviewVisible5(false);
  };

  const handlePreview5 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase645(file.originFileObj);
    }

    setPreviewImage5(file.url || file.preview);
    setPreviewVisible5(true);
    setPreviewTitle5(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setProofOfRightError("");
  };

  // Proof of Right to Work Code End

  // CV Start

  function getBase646(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel6 = () => {
    setPreviewVisible6(false);
  };

  const handlePreview6 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase646(file.originFileObj);
    }

    setPreviewImage6(file.url || file.preview);
    setPreviewVisible6(true);
    setPreviewTitle6(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange6 = ({ fileList }) => {
    setFileList6(fileList);
    setCvError("");
  };

  // cv End

  const backToConsultantList = () => {
    history.push("/admissionOfficerList");
  };

  // on change radio button
  const onRadioValueChange = (event) => {
    setRightToWork(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append(
      "idOrPassportFile",
      FileList3.length == 0 ? null : FileList3[0]?.originFileObj
    );
    subData.append(
      "proofOfAddressFile",
      FileList4.length == 0 ? null : FileList4[0]?.originFileObj
    );
    subData.append(
      "BRPFile",
      FileList5.length == 0 ? null : FileList5[0]?.originFileObj
    );
    subData.append(
      "CvFile",
      FileList6.length == 0 ? null : FileList6[0]?.originFileObj
    );

    for (var value of subData) {
      console.log(value);
    }

    if (uniCountryValue == 0) {
      setErrorC("Country of Citizenship is required");
    } else if (uniCountryValue2 == 0) {
      setErrorC2("Residence is required");
    } else if (uniCountryValue !== uniCountryValue2 && residencyValue == 0) {
      // if(residencyValue == 0){
      setResidencyError("Residency status is required");
      // }
    }

    // else if (branchValue == 0) {
    //   setBranchError(true);
    // }

    //    else if (FileList3.length < 1) {
    //       setIdPassportError(true);
    //     }
    //    else if (FileList4.length < 1 ) {
    //       setProofOfAddressError(true);
    //     }
    //     else if( FileList5.length < 1 ){

    //       setProofOfRightError('BRP file is required');

    //     }
    //     else if(FileList6.length <1 ){
    //       setCvError('CV is required');
    //     }
    else {
      setButtonStatus(true);
      setProgress(true);
      post(`ProviderAdminEligibility/Eligibility`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList3([]);
          setFileList4([]);
          setFileList5([]);
          setFileList6([]);
          //   history.push(`/consultantBankDetails/${consultantRegisterId}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const goBackward = () => {
    history.push(`/providerAdminContactInfo/${providerId}/${providerAdminId}`);
  };

  const goForward = () => {
    history.push(
      `/providerAdminTermsAndConditionInfo/${providerId}/${providerAdminId}`
    );
  };

  const onGoUniProfile = () => {
    history.push(`/providerAdminProfile/${providerAdminId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Designated Person Information"
        backTo="Provider Admin Profile"
        path={`/providerAdminProfile/${providerAdminId}`}
      />

      <Card>
        <CardBody>
          <ProviderAdminNavigation
            activetab={activetab}
            providerId={providerId}
            providerAdminId={providerAdminId}
          />

          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <Form onSubmit={handleSubmit} className="mt-5">
                <input
                  type="hidden"
                  name="providerAdminId"
                  id="providerAdminId"
                  value={providerAdminId}
                />

                <input
                  type="hidden"
                  name="id"
                  id="id"
                  value={eligibilityData !== null ? eligibilityData?.id : 0}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Country of Citizenship{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={countryDD}
                      value={{
                        label: uniCountryLabel,
                        value: uniCountryValue,
                      }}
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="countryOfCitizenShipId"
                      id="countryOfCitizenShipId"
                    />

                    <span className="text-danger">{errorc}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Residence <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={countryDD2}
                      value={{
                        label: uniCountryLabel2,
                        value: uniCountryValue2,
                      }}
                      onChange={(opt) =>
                        selectUniCountry2(opt.label, opt.value)
                      }
                      name="countryOfResidenceId"
                      id="countryOfResidenceId"
                    />

                    <span className="text-danger">{errorc2}</span>
                  </Col>
                </FormGroup>

                {uniCountryValue == uniCountryValue2 ? null : (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Residency Status <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={residencyOptions}
                        value={{ label: residencyLabel, value: residencyValue }}
                        onChange={(opt) =>
                          selectResidency(opt.label, opt.value)
                        }
                        name="residencyStatusId"
                        id="residencyStatusId"
                      />

                      <span className="text-danger">{residencyError}</span>
                    </Col>
                  </FormGroup>
                )}

                {residencyValue == 2 && uniCountryValue !== uniCountryValue2 ? (
                  <>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Visa Type <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="visaType"
                          id="visaType"
                          placeholder="Enter Visa Status"
                          required
                          defaultValue={eligibilityData?.visaType}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Expiry Date of Your BRP/TRP or Visa{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="date"
                          name="expireDate"
                          id="expireDate"
                          defaultValue={exDate}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Do You Have Right to Work?
                          {/* <span className="text-danger">*</span>{" "} */}
                        </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="haveRightToWork"
                            value="true"
                            onChange={onRadioValueChange}
                            name="haveRightToWork"
                            checked={rightToWork == "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="haveRightToWork"
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="haveRightToWork"
                            onChange={onRadioValueChange}
                            name="haveRightToWork"
                            value="false"
                            checked={rightToWork == "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="haveRightToWork"
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </>
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Id/Passport
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {eligibilityData?.idOrPassport != null ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              eligibilityData?.idOrPassport?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList3}
                          onPreview={handlePreview3}
                          onChange={handleChange3}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList3.length < 1 ? (
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
                        <Modal
                          visible={previewVisible3}
                          title={previewTitle3}
                          footer={null}
                          onCancel={handleCancel3}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage3}
                          />
                        </Modal>
                        {/* <span className="text-danger d-block">{error3}</span> */}
                      </div>
                    </div>

                    {idPassportError && (
                      <span className="text-danger">File is required </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Proof of Address
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {eligibilityData?.proofOfAddress?.fileUrl ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              eligibilityData?.proofOfAddress?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList4}
                          onPreview={handlePreview4}
                          onChange={handleChange4}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList4.length < 1 ? (
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
                        <Modal
                          visible={previewVisible4}
                          title={previewTitle4}
                          footer={null}
                          onCancel={handleCancel4}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage4}
                          />
                        </Modal>
                        {/* <span className="text-danger d-block">{error4}</span> */}
                      </div>
                    </div>

                    {proofOfAddressError && (
                      <span className="text-danger">File is required</span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      BRP/TRP
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {eligibilityData?.brp?.fileUrl ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={rootUrl + eligibilityData?.brp?.thumbnailUrl}
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList5}
                          onPreview={handlePreview5}
                          onChange={handleChange5}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList5.length < 1 ? (
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
                        <Modal
                          visible={previewVisible5}
                          title={previewTitle5}
                          footer={null}
                          onCancel={handleCancel5}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage5}
                          />
                        </Modal>
                        {/* <span className="text-danger d-block">{error5}</span> */}
                      </div>
                    </div>

                    <span className="text-danger">{proofOfRightError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      CV File
                      {/* <span className="text-danger">*</span>{" "} */}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {eligibilityData?.cv?.fileUrl ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={rootUrl + eligibilityData?.cv?.thumbnailUrl}
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList6}
                          onPreview={handlePreview6}
                          onChange={handleChange6}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList6.length < 1 ? (
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
                        <Modal
                          visible={previewVisible6}
                          title={previewTitle6}
                          footer={null}
                          onCancel={handleCancel6}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage5}
                          />
                        </Modal>
                      </div>
                    </div>

                    <span className="text-danger">{cvError}</span>
                  </Col>
                </FormGroup>

                {/* CV */}

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"mr-1 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      permission={6}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ButtonForFunction
                  className={"mr-1 mt-3 btn-warning"}
                  func={goBackward}
                  name={"Previous"}
                  icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                />

                <Button.Ripple
                  onClick={goForward}
                  className="mr-1 mt-3 btn-warning"
                >
                  Next
                  <i className="fas fa-arrow-right-long ml-1"></i>
                </Button.Ripple>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAdminEligibilityInfo;
