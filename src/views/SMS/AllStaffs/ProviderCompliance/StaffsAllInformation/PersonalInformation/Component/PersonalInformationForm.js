import { Image, Modal, Upload } from "antd";
import React from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { rootUrl } from "../../../../../../../constants/constants";
import * as Icon from "react-feather";
import PreviousButton from "../../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../../../constants/userTypeConstant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { permissionList } from "../../../../../../../constants/AuthorizationConstant";

const PersonalInformationForm = ({
  handleSubmit,
  providerComplianceId,
  Dates,
  setPassport,
  passport,
  gender,
  setGenderValue,
  setGenderError,
  genderValue,
  genderError,
  maritalStatus,
  setMaritalStatusValue,
  setMaritalStatusError,
  maritalStatusValue,
  maritalStatusError,
  consPersonalInfo,
  FileList1,
  handlePreview1,
  handleChange1,
  previewVisible1,
  previewTitle1,
  handleCancel1,
  previewImage1,
  error,
  profilePicError,
  FileList2,
  handlePreview2,
  handleChange2,
  previewVisible2,
  previewTitle2,
  handleCancel2,
  previewImage2,
  error2,
  progress,
  buttonStatus,
  DatesError,
  handleDate,
  phoneError,
  handlePhoneNumber,
  goPrevious,
  phone,
}) => {
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" id="id" value={providerComplianceId} />

      <FormGroup row>
        <Col lg="6" md="8">
          <span>
            <span className="text-danger">*</span> Date Of Birth
          </span>

          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            onChange={(e) => {
              handleDate(e);
            }}
            value={Dates}
          />
          {DatesError && (
            <span className="text-danger">Birth date is required</span>
          )}
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col lg="6" md="8">
          <span>Passport/ID</span>
          <Input
            type="text"
            name="passportId"
            id="passportId"
            placeholder="Enter Passport Number"
            onChange={(e) => setPassport(e.target.value)}
            defaultValue={passport}
          />
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative my-4">
        <Col lg="6" md="8">
          <span>
            <span className="text-danger">*</span> Gender
          </span>
          <br />

          {gender?.map((tt) => (
            <>
              <input
                type="radio"
                name="genderId"
                id="genderId"
                value={tt?.id}
                onClick={() => {
                  setGenderValue(tt?.id);
                  setGenderError(false);
                }}
                checked={genderValue === tt?.id ? true : false}
              />

              <label
                className="mr-3"
                style={{ fontWeight: 500, fontSize: "14px" }}
              >
                {tt?.name}
              </label>
            </>
          ))}
          <br />
          {genderError && (
            <span className="text-danger">Gender is required</span>
          )}
        </Col>
      </FormGroup>

      {/* <FormGroup row className="has-icon-left position-relative my-4">
        <Col lg="6" md="8">
          <span>
            <span className="text-danger">*</span> Marital Status
          </span>
          <br />
          {maritalStatus?.map((tt) => (
            <>
              <input
                type="radio"
                name="maritalStatusId"
                id="maritalStatusId"
                value={tt?.id}
                onClick={() => {
                  setMaritalStatusValue(tt?.id);
                  setMaritalStatusError(false);
                }}
                checked={maritalStatusValue === tt?.id ? true : false}
              />

              <label
                className="mr-3"
                style={{ fontWeight: 500, fontSize: "14px" }}
              >
                {tt?.name}
              </label>
            </>
          ))}
          <br />
          {maritalStatusError && (
            <span className="text-danger">Marital status is required</span>
          )}
        </Col>
      </FormGroup> */}

      <FormGroup row>
        <Col lg="6" md="8" className="phone-input-group">
          <span>
            <span className="text-danger">*</span>
            Phone
          </span>
          <PhoneInput
            className="w-100"
            type="string"
            name="officialPhoneNumber"
            id="officialPhoneNumber"
            country={"gb"}
            enableLongNumbers={true}
            onChange={handlePhoneNumber}
            value={phone ? phone : ""}
            inputProps={{
              required: true,
            }}
          />

          <span className="text-danger">{phoneError}</span>
        </Col>
      </FormGroup>

      <Row>
        <Col lg="6" md="8">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                {consPersonalInfo?.employeeProfileImage == null &&
                userType !== userTypes.SystemAdmin.toString() &&
                userType !== userTypes.Admin.toString() ? (
                  <span className="text-danger">*</span>
                ) : null}
                Profile Image
              </span>
            </Col>
            <Col md="5">
              <div className="row">
                {consPersonalInfo?.employeeProfileImage != null ? (
                  <div className="col-md-6">
                    <Image
                      width={104}
                      height={104}
                      src={
                        rootUrl +
                        consPersonalInfo?.employeeProfileImage?.thumbnailUrl
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
                      <div className="text-danger" style={{ marginTop: 8 }}>
                        <Icon.Upload />
                        <br />
                        <span>Upload Here</span>
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
                  <span className="text-danger d-block">{error}</span>
                </div>
              </div>

              {profilePicError && (
                <span className="text-danger">Profile photo is required</span>
              )}
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
        <Col lg="6" md="8">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>Cover Image</span>
            </Col>
            <Col md="5">
              <div className="row">
                {consPersonalInfo?.employeeCoverImage != null ? (
                  <div className="col-md-6">
                    <Image
                      width={104}
                      height={104}
                      src={
                        rootUrl +
                        consPersonalInfo?.employeeCoverImage?.thumbnailUrl
                      }
                    />
                  </div>
                ) : null}

                <div className="col-md-6">
                  <Upload
                    listType="picture-card"
                    multiple={false}
                    fileList={FileList2}
                    onPreview={handlePreview2}
                    onChange={handleChange2}
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    {FileList2.length < 1 ? (
                      <div className="text-danger" style={{ marginTop: 8 }}>
                        <Icon.Upload />
                        <br />
                        <span>Upload Here</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Upload>
                  <Modal
                    visible={previewVisible2}
                    title={previewTitle2}
                    footer={null}
                    onCancel={handleCancel2}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage2}
                    />
                  </Modal>
                  <span className="text-danger d-block">{error2}</span>
                </div>
              </div>
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
        <Col lg="6" md="8">
          <FormGroup className="mt-4 d-flex justify-content-between">
            <PreviousButton action={goPrevious} />
            {permissions?.includes(permissionList?.Edit_Provider) && (
              <SaveButton
                text="Save and Next"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            )}
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInformationForm;
