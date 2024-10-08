import React from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import SaveButton from "../../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../../constants/AuthorizationConstant";

const GeneralInformationForm = ({
  handleSubmit,
  providerComplianceId,
  consData,
  branchOptions,
  branchLabel,
  branchValue,
  selectBranch,
  branchError,
  userTypeId,
  userTypes,
  consTypeMenu,
  typeLabel,
  typeValue,
  consultantError,
  nameTitleMenu,
  nameLabel,
  nameValue,
  selectNameTitle,
  selectConsType,
  titleError,
  progress,
  buttonStatus,
  firstNameError,
  handleFirstName,
  handleLastName,
  lastNameError,
  title,
  setTitleValue,
  setTitleError,
  titleValue,
  email,
  handleEmail,
  handleEmailError,
  emailExistError,
  emailError,
  firstName,
  lastName,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={providerComplianceId} />
      <input type="hidden" name="email" value={consData?.email} />

      <Row>
        <Col md="6">
          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span>
              Provider
            </span>

            <Select
              options={branchOptions}
              value={{ label: branchLabel, value: branchValue }}
              onChange={(opt) => selectBranch(opt.label, opt.value)}
              name="providerId"
              id="providerId"
            />

            {branchError && (
              <span className="text-danger">Provider is required</span>
            )}
          </FormGroup>

          <FormGroup>
            <span>
              <span className="text-danger">*</span> Title
            </span>
            <div>
              {title?.map((tt) => (
                <>
                  <input
                    type="radio"
                    name="nameTitleId"
                    id="nameTitleId"
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
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span>
              First Name
            </span>

            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => {
                handleFirstName(e);
              }}
            />
            <span className="text-danger">{firstNameError}</span>
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span>
              Last Name
            </span>

            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => {
                handleLastName(e);
              }}
            />
            <span className="text-danger">{lastNameError}</span>
          </FormGroup>

          <FormGroup>
            <span>
              <span className="text-danger">*</span> Email
            </span>

            <Input type="email" name="email" id="email" value={email} />
          </FormGroup>
          <FormGroup className="mt-4 text-right">
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

export default GeneralInformationForm;
