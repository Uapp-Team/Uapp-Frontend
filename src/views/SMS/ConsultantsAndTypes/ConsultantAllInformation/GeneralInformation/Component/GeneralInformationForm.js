import React from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import {
  BranchAdmin,
  BranchManager,
} from "../../../../../../components/core/User";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const GeneralInformationForm = ({
  handleSubmit,
  consData,
  consultantRegisterId,
  userTypeId,
  userTypes,
  consTypeMenu,
  typeLabel,
  typeValue,
  selectConsType,
  consultantError,
  setHomeAccept,
  setAcceptError,
  setUkAccept,
  setIntAccept,
  acceptError,
  consParentMenu,
  homeAccept,
  ukAccept,
  intAccept,
  parentLabel,
  parentValue,
  parentError,
  branchOptions,
  branchLabel,
  branchValue,
  selectParentCons,
  selectBranch,
  branchError,
  nameTitleMenu,
  nameLabel,
  nameValue,
  titleError,
  selectNameTitle,
  progress,
  buttonStatus,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmail,
  firstNameError,
  lastNameError,
  firstName,
  lastName,
  setTitleValue,
  setTitleError,
  titleValue,
  title,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <p className="section-title">Details </p>

        <input type="hidden" name="id" value={consultantRegisterId} />
        {userTypeId === userTypes?.Consultant ? (
          <>
            <input
              type="hidden"
              name="consultantTypeId"
              value={consData?.consultantType?.id}
            />
            <input
              type="hidden"
              name="parentConsultantId"
              value={consData?.parentConsultant?.id}
            />
            <input type="hidden" name="BranchId" value={consData?.branch?.id} />
          </>
        ) : null}

        <Row>
          <Col lg="6" md="8">
            {userTypeId === userTypes?.Consultant ? (
              <input type="hidden" value={branchValue} />
            ) : branchOptions.length > 1 ? (
              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span>
                  Branch
                </span>

                <Select
                  className="form-mt"
                  options={branchOptions}
                  value={{ label: branchLabel, value: branchValue }}
                  onChange={(opt) => selectBranch(opt.label, opt.value)}
                  name="BranchId"
                  id="BranchId"
                />

                {branchError && (
                  <span className="text-danger">Branch is required</span>
                )}
              </FormGroup>
            ) : null}

            {userTypeId === userTypes?.Consultant ? null : (
              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span>
                  Consultant Type
                </span>

                <Select
                  className="form-mt"
                  options={consTypeMenu}
                  value={{ label: typeLabel, value: typeValue }}
                  onChange={(opt) => selectConsType(opt.label, opt.value)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />
                {consultantError && (
                  <span className="text-danger">
                    Consultant type is required
                  </span>
                )}
              </FormGroup>
            )}

            {userTypeId === userTypes?.Consultant ? null : (
              <FormGroup className="has-icon-left position-relative">
                <span>
                  {/* <span className="text-danger">*</span> */}
                  <b> Recruitment Type</b>
                </span>

                <Row>
                  <Col xs="2" sm="12" md="2" className="text-center mt-2">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          setHomeAccept(e.target.checked);
                          setAcceptError(false);
                        }}
                        checked={homeAccept}
                      />
                      <span className="mr-2">Home </span>
                    </FormGroup>
                  </Col>

                  <Col xs="2" sm="12" md="2" className="text-center mt-2">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          setUkAccept(e.target.checked);
                          setAcceptError(false);
                        }}
                        checked={ukAccept}
                      />
                      <span className="mr-2">EU/UK </span>
                    </FormGroup>
                  </Col>

                  <Col xs="2" sm="12" md="2" className="text-center mt-2">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          setIntAccept(e.target.checked);
                          setAcceptError(false);
                          console.log("Tria testing", e.target.checked);
                        }}
                        checked={intAccept}
                      />
                      <span className="mr-2">International </span>
                    </FormGroup>
                  </Col>
                </Row>
                {acceptError ? (
                  <span className="text-danger">
                    Recruitment type is required
                  </span>
                ) : null}
              </FormGroup>
            )}

            {/* {consData?.parentConsultant?.id && ( */}
            <>
              {userTypeId === userTypes?.Consultant.toString() ? (
                <FormGroup className="has-icon-left position-relative">
                  <span className="mr-2">Parent Consultant :</span>
                  <span className=" fw-500">
                    {consData?.parentConsultant?.firstName}{" "}
                    {consData?.parentConsultant?.lastName}
                  </span>
                </FormGroup>
              ) : (
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    {" "}
                    {!BranchAdmin() && !BranchManager() && (
                      <span className="text-danger">*</span>
                    )}
                    Parent Consultant
                  </span>

                  <Select
                    className="form-mt"
                    options={consParentMenu}
                    value={{ label: parentLabel, value: parentValue }}
                    onChange={(opt) => selectParentCons(opt.label, opt.value)}
                    name="parentConsultantId"
                    id="parentConsultantId"
                  />

                  {parentError && (
                    <span className="text-danger">
                      Parent consultant is required
                    </span>
                  )}
                </FormGroup>
              )}
            </>
            {/* )} */}

            <FormGroup>
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
            </FormGroup>

            <FormGroup className="has-icon-left position-relative">
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
            </FormGroup>

            <FormGroup className="has-icon-left position-relative">
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
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>
                {" "}
                <span className="text-danger">*</span>Email
              </span>

              <Input
                className="form-mt"
                type="email"
                id="email"
                name="email"
                value={consData?.email}
              />
            </FormGroup>
            <FormGroup className="mt-4 text-right">
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

export default GeneralInformationForm;
