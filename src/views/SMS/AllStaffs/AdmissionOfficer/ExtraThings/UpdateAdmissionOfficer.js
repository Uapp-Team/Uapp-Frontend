import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../../../helpers/get";
import CustomButtonRipple from "../../../Components/CustomButtonRipple";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  Form,
  FormGroup,
} from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";
import Select from "react-select";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../helpers/put";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const UpdateAdmissionOfficer = () => {
  const { officerId, id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
    });

    get(`AdmissionOfficer/Get/${officerId}`).then((res) => {
      setData(res);
      setNameTitleLabel(res?.nameTittle?.name);
      setNameTitleValue(res?.nameTittle?.id);
      setUniCountryLabel(res?.country?.name);
      setUniCountryValue(res?.country.id);
      setUniStateLabel(res?.state?.name);
      setUniStateValue(res?.state?.id);
    });
  }, [officerId]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  const nameTitleMenu = nameTitleDD?.map((nameTitle) => ({
    label: nameTitle?.name,
    value: nameTitle?.id,
  }));

  //   select name title
  const selectNameTitle = (label, value) => {
    setNameTitleLabel(label);
    setNameTitleValue(value);
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("Select State");
    setUniStateValue(0);
  };

  // Trial start

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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress(true);
    const subdata = new FormData(event.target);
    subdata.append(
      "admissionOfficerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    setButtonStatus(true);
    put(`AdmissionOfficer/Update`, subdata).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      if (res.status === 200 && res.data.isSuccess === true) {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/ProviderDetails/${id}`);
      } else {
        addToast(res.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Update Admission Officer"
        backTo="Provider Details"
        path={`/providerDetails/${id}`}
      />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <input type="hidden" name="id" id="id" value={officerId} />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Title <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitleMenu}
                  value={{ label: nameTitleLabel, value: nameTitleValue }}
                  onChange={(opt) => selectNameTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  First Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={data?.firstName}
                  placeholder="Type First Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Last Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={data?.lastName}
                  placeholder="Type Last Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Phone Number <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={data?.phoneNumber}
                  placeholder="Type Your Phone Number"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={countryDD}
                  value={{ label: uniCountryLabel, value: uniCountryValue }}
                  onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                  name="countryId"
                  id="countryId"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>State/County</span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="stateName"
                  id="stateName"
                  placeholder="Type Your State/County"
                  defaultValue={data?.stateName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  City <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={data?.city}
                  placeholder="Type City Name"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Post Code <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="postCode"
                  id="postCode"
                  defaultValue={data?.postCode}
                  placeholder="Type Post Code"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>Image</span>
              </Col>
              <Col md="6">
                <div className="d-flex">
                  {data?.id ? (
                    <div className="mr-2">
                      <Image
                        width={104}
                        height={104}
                        src={rootUrl + data?.admissionOfficerMedia?.fileUrl}
                      />
                    </div>
                  ) : null}

                  <div>
                    <>
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

                      <span className="text-danger d-block">{error}</span>
                    </>
                  </div>
                </div>
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-9">
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <CustomButtonRipple
                    color={"primary"}
                    type={"submit"}
                    className={"mr-1 mt-3"}
                    name={progress ? <ButtonLoader /> : "Submit"}
                    permission={6}
                    isDisabled={buttonStatus}
                  />
                </FormGroup>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateAdmissionOfficer;
