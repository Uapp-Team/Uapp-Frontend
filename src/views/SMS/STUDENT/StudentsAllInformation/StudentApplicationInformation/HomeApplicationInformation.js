import React, { useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import get from "../../../../../helpers/get";

export default function HomeApplicationInformation({
  applicationInformation,
  countryId,
  studentTypeValue,
  applicationStudentId,
  hasSLC,
  setHasSLC,
  haveStartedEducation,
  setHaveStartedEducation,
  howManyYears,
  setHowManyYears,
  howManyYearsError,
  setResidencyForHomeRequire,
  handleManyYears,
  setHowManyYearsError,
  residencyStatusForHomeError,
  homeResidencyStatusError,
  homeResidencyStatus,
  handleHomeResidencyStatus,
  showResidency,
  setShowResidency,
  hasSCLError,
  haveStartedEducationError,
  setHasSLCError,
}) {
  useEffect(() => {
    setHasSLC(
      applicationInformation != null &&
        applicationInformation?.loanfromStudentLoansCompanyForHome === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.loanfromStudentLoansCompanyForHome === false
        ? false
        : null
    );
    setHaveStartedEducation(
      applicationInformation != null &&
        applicationInformation?.havingUndergraduatePostgraduateCourseForHome ===
          true
        ? true
        : applicationInformation != null &&
          applicationInformation?.havingUndergraduatePostgraduateCourseForHome ===
            false
        ? false
        : null
    );
    get(`ApplicationInfo/Check/${applicationStudentId}/${countryId}`).then(
      (res) => {
        console.log(res);
        setShowResidency(res);
      }
    );
  }, [applicationInformation, applicationStudentId, countryId, setHasSLC]);

  return (
    <div>
      <input
        type="hidden"
        name="studentId"
        id="studentId"
        value={applicationStudentId}
      />

      <input
        type="hidden"
        name="id"
        id="id"
        value={
          applicationInformation?.id === null ||
          applicationInformation?.id === undefined
            ? 0
            : applicationInformation?.id
        }
      />

      <input
        type="hidden"
        name="studentTypeId"
        id="studentTypeId"
        value={studentTypeValue}
      />

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Have You Ever Had Any Other
          Loans From The Student Loans Company (SLC)?
        </span>
        <br />
        <FormGroup check inline className="form-mt">
          <input
            className="form-check-input"
            type="radio"
            name="loanfromStudentLoansCompanyForHome"
            value={true}
            checked={hasSLC === true}
            onChange={() => {
              setHasSLC(true);
            }}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="loanfromStudentLoansCompanyForHome"
          >
            Yes
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            type="radio"
            name="loanfromStudentLoansCompanyForHome"
            value={false}
            checked={hasSLC === false}
            onChange={() => {
              setHasSLC(false);
            }}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="loanfromStudentLoansCompanyForHome"
          >
            No
          </Label>
        </FormGroup>
        <br />
        {hasSCLError && (
          <span className="text-danger">Student Loans Company Required</span>
        )}
      </FormGroup>

      {hasSLC === true ? (
        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> How Many Years?
          </span>
          <Input
            className="form-mt"
            type="text"
            name="LoanYearsForHome"
            id="LoanYearsForHome"
            placeholder="Enter Years"
            value={howManyYears}
            onChange={(e) => {
              handleManyYears(e);
            }}
          />
          <span className="text-danger">{howManyYearsError}</span>
        </FormGroup>
      ) : null}

      {showResidency.showResidencyStatus === true && (
        <>
          <div className="mt-1 mb-4 d-flex justify-between cardborder">
            <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
            <div className="pl-3">
              <span>{showResidency.message}</span>
            </div>
          </div>

          <FormGroup>
            <span>
              {" "}
              <span className="text-danger">*</span> What is Your Current
              Residency Status ?
            </span>

            <Input
              type="text"
              name="ResidencyStatusForHome"
              id="ResidencyStatusForHome"
              defaultValue={applicationInformation?.residencyStatusForHome}
              placeholder="Enter Residency Status For Home"
              onChange={(e) => {
                handleHomeResidencyStatus(e);
              }}
            />
            <span className="text-danger">{homeResidencyStatusError}</span>
          </FormGroup>
        </>
      )}
      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Have You Started an
          Undergraduate or Postgraduate Course of Higher Education in Any
          Country Since Leaving School?
        </span>
        <br />

        <FormGroup check inline className="form-mt">
          <input
            className="form-check-input"
            type="radio"
            name="HavingUndergraduatePostgraduateCourseForHome"
            value={true}
            checked={haveStartedEducation === true}
            onChange={() => setHaveStartedEducation(true)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="HavingUndergraduatePostgraduateCourseForHome"
          >
            Yes
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            type="radio"
            name="HavingUndergraduatePostgraduateCourseForHome"
            value={false}
            checked={haveStartedEducation === false}
            onChange={() => setHaveStartedEducation(false)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="HavingUndergraduatePostgraduateCourseForHome"
          >
            No
          </Label>
        </FormGroup>
        <br />
        {haveStartedEducationError && (
          <span className="text-danger">Select an option is required</span>
        )}
      </FormGroup>
    </div>
  );
}
