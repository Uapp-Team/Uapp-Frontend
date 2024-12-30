import React, { useState } from "react";
import { FormGroup, Form, Col, Input, Row } from "reactstrap";
import { Upload, Modal, Image } from "antd";
import { rootUrl } from "../../../../../../constants/constants";
import * as Icon from "react-feather";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import Select from "react-select";
import DMYPicker from "../../../../../../components/form/DMYPicker";

const PersonalForm = ({
  arrLinkError,
  setarrLinkError,
  consData,
  userTypeId,
  userTypes,
  companionParentMenu,
  companionParentLabel,
  companionParentValue,
  parentError,
  selectParentCompanion,
  titleError,
  handleFirstNameChange,
  handleLastNameChange,
  firstNameError,
  lastNameError,
  firstName,
  lastName,
  setTitleValue,
  setTitleError,
  titleValue,
  title,
  dateError,
  handleDate,
  handleSubmit,
  companionId,
  SetDate,
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
  companionPersonalInfo,
  FileList1,
  handlePreview1,
  handleChange1,
  previewVisible1,
  previewTitle1,
  handleCancel1,
  previewImage1,
  profilePicError,
  error,
  FileList2,
  handlePreview2,
  previewTitle2,
  previewVisible2,
  handleChange2,
  handleCancel2,
  previewImage2,
  error2,
  progress,
  buttonStatus,
  handlePhoneNumber,
  phoneNUmberError,
  birthDate,
  minDate,
  phoneNumber,
  arrLink,
  setarrLink,
  affiliateId,
  consultantError,
  selectConsultant,
  consultantValue,
  consultantLabel,
  consultantName,
  branchOptions,
  branchValue,
  branchError,
  branchLabel,
  selectBranch,
  setDateError,
  passportError,
  handlePassportChange,
}) => {
  const userId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [linkTitle, setlinkTitle] = useState("");
  const [linkUrl, setlinkUrl] = useState("");
  const [linkTitleError, setlinkTitleError] = useState("");
  const [linkUrlError, setlinkUrlError] = useState("");

  const removeLink = (i) => {
    arrLink.splice(i, 1);
    setarrLink([...arrLink]);
  };

  const addLink = (data) => {
    if (data.title === "" || data.link === "") {
      data.title === "" && setlinkTitleError("Title Required");
      data.link === "" && setlinkUrlError("Url Required");
    } else {
      setlinkTitleError("");
      setlinkUrlError("");
      const arrayData = [...arrLink];
      arrayData.push(data);
      setarrLink(arrayData);
      setlinkTitle("");
      setlinkUrl("");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <p className="section-title">Personal Details </p>
        <input type="hidden" name="id" id="id" value={companionId} />

        {userType === userTypes?.SystemAdmin.toString() ? (
          <FormGroup row className="has-icon-left position-relative">
            <Col lg="6" md="8">
              {" "}
              <span>
                <span className="text-danger">*</span> Branch{" "}
              </span>
              <Select
                className="form-mt"
                options={branchOptions}
                value={{ label: branchLabel, value: branchValue }}
                onChange={(opt) => selectBranch(opt.label, opt.value)}
                // name="BranchId"
                // id="BranchId"
                // isDisabled={branchId ? true : false}
              />
              {branchError && (
                <span className="text-danger">Branch is required</span>
              )}
            </Col>
          </FormGroup>
        ) : null}

        {userType !== userTypes?.Companion &&
        userType !== userTypes?.Consultant ? (
          <FormGroup row>
            <Col lg="6" md="8">
              <span>
                <span className="text-danger">*</span>Consultant
              </span>
              <Select
                className="form-mt"
                options={consultantName}
                value={{
                  label: consultantLabel,
                  value: consultantValue,
                }}
                onChange={(opt) => selectConsultant(opt.label, opt.value)}
                name="consultantId"
                id="consultantId"
              />
              {consultantError && (
                <span className="text-danger">Consultant is required.</span>
              )}
            </Col>
          </FormGroup>
        ) : (
          <input
            type="hidden"
            name="consultantId"
            id="consultantId"
            value={consultantValue}
          />
        )}

        {userType !== userTypes?.Companion ? (
          <FormGroup row>
            <Col lg="6" md="8">
              <span>Parent Companion</span>
              <Select
                className="form-mt"
                options={companionParentMenu}
                value={{
                  label: companionParentLabel,
                  value: companionParentValue,
                }}
                onChange={(opt) => selectParentCompanion(opt.label, opt.value)}
                name="parentCompanionId"
                id="parentCompanionId"
              />
              {parentError && (
                <span className="text-danger">
                  Parent Affiliate is required.
                </span>
              )}
            </Col>
          </FormGroup>
        ) : (
          <input
            type="hidden"
            name="parentCompanionId"
            id="parentCompanionId"
            value={companionParentValue}
          />
        )}

        <FormGroup row>
          <Col lg="6" md="8">
            <span>
              {" "}
              <span className="text-danger">*</span> Title
            </span>
            <div>
              {title?.map((tt) => (
                <>
                  <input
                    type="radio"
                    name="nameTittleId"
                    id="nameTittleId"
                    value={tt?.id}
                    onChange={() => {
                      setTitleValue(tt?.id);
                      setTitleError(false);
                    }}
                    checked={titleValue === tt?.id ? true : false}
                  />

                  <label
                    className="mr-3"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    {tt?.name}
                  </label>
                </>
              ))}
            </div>

            {titleError && (
              <span className="text-danger">Title is required</span>
            )}
          </Col>{" "}
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            {" "}
            <span>
              {" "}
              <span className="text-danger">*</span>First Name
            </span>
            <Input
              className="form-mt"
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => {
                handleFirstNameChange(e);
              }}
              placeholder="Enter First Name"
              value={firstName}
            />
            <span className="text-danger">{firstNameError}</span>
          </Col>{" "}
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            {" "}
            <span>
              {" "}
              <span className="text-danger">*</span>Last Name
            </span>
            <Input
              className="form-mt"
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => {
                handleLastNameChange(e);
              }}
              placeholder="Enter Last Name"
              value={lastName}
            />
            <span className="text-danger">{lastNameError}</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            <span>
              {" "}
              <span className="text-danger">*</span>Email
            </span>

            <Input
              className="form-mt"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={companionPersonalInfo?.data?.email}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            <DMYPicker
              label="Date Of Birth"
              value={birthDate}
              setValue={handleDate}
              error={dateError}
              action={setDateError}
              required={true}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            <span>
              <span className="text-danger">*</span>Passport/ID
            </span>

            <Input
              type="text"
              name="passportId"
              id="passportId"
              placeholder="Enter Passport Number"
              onChange={(e) => {
                handlePassportChange(e);
              }}
              value={passport}
            />
            <span className="text-danger">{passportError}</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8">
            <span>
              <span className="text-danger">*</span>
              Gender
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
        <FormGroup row>
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
        </FormGroup>
        <FormGroup row>
          <Col lg="6" md="8" className="phone-input-group">
            <span>
              <span className="text-danger">*</span>
              Phone Number
            </span>
            <PhoneInput
              className="w-100"
              type="string"
              name="phoneNumber"
              id="phoneNumber"
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
        <div>
          <span>
            <span className="text-danger">*</span> Digital Portfolio Information
          </span>
          <FormGroup row className="mt-3 mb-5">
            <Col lg="6">
              <Row
                className="py-3"
                style={{
                  border: "1px solid #D9D9D9",
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                <Col md="5">
                  <FormGroup>
                    <span>Digital Channel Title</span>
                    <Input
                      className="form-mt"
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={(e) => {
                        setlinkTitle(e.target.value);
                      }}
                      placeholder="Enter Link Title"
                      value={linkTitle}
                    />
                    <span className="text-danger d-block">
                      {linkTitleError}
                    </span>
                  </FormGroup>
                </Col>
                <Col md="5">
                  <FormGroup>
                    <span>URL</span>
                    <Input
                      className="form-mt"
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={(e) => {
                        setlinkUrl(e.target.value);
                      }}
                      placeholder="Enter Link Url"
                      value={linkUrl}
                    />
                    <span className="text-danger d-block">{linkUrlError}</span>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup className="d-flex justify-content-between mt-4">
                    <SaveButton
                      text="Add"
                      type="button"
                      buttonStatus={buttonStatus}
                      action={() =>
                        addLink({
                          companionLink: 0,
                          title: linkTitle,
                          link: linkUrl,
                          companionId: companionId,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              {arrLink.length === 0 && (
                <span className="text-danger">{arrLinkError}</span>
              )}
            </Col>
          </FormGroup>
        </div>

        <div className="mb-5">
          {" "}
          <Row>
            <Col lg="6">
              {arrLink.length > 0 &&
                arrLink?.map((item, i) => (
                  <>
                    <div className="d-flex justify-content-between px-3">
                      <p>{item?.title}</p>
                      <div className="d-flex">
                        <p style={{ color: "#7C7C7C" }}>{item?.link}</p>
                        <i
                          onClick={() => removeLink(i)}
                          className="fas fa-times pointer"
                          style={{
                            marginLeft: "20px",
                            color: "#7C7C7C",
                            fontSize: "20px",
                          }}
                        ></i>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </Col>
          </Row>
        </div>

        <Row>
          <Col lg="6" md="6" sm="4">
            <FormGroup row>
              <Col md="3">
                <span>
                  {userId === companionId && (
                    <span className="text-danger">*</span>
                  )}
                  Profile Image
                </span>
              </Col>
              <Col md="5">
                <div className="row">
                  {companionPersonalInfo?.data?.companionProfileImage !=
                  null ? (
                    <div className="col-md-6">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          companionPersonalInfo?.data?.companionProfileImage
                            ?.fileUrl
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

            {/* <FormGroup row >
              <Col md="3">
                <span>Cover Image</span>
              </Col>
              <Col md="5">
                <div className="row">
                  {consPersonalInfo?.consultantCoverImage != null ? (
                    <div className="col-md-6">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          consPersonalInfo?.consultantCoverImage?.thumbnailUrl
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
            </FormGroup> */}
            <FormGroup className="text-right mt-4">
              {permissions?.includes(permissionList?.Edit_Consultant) && (
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
    </div>
  );
};

export default PersonalForm;
