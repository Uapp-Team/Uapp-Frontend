import React, { useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import DMYPicker from "../../../../../components/form/DMYPicker";

export default function EuUkApplicationInformation({
  applicationStudentId,
  applicationInformation,
  studentTypeValue,
  countryLabel,
  handleDate,
  date,
  dateError,
  setdateError,
  loansForEu,
  setLoansForEu,
  handleEuManyYears,
  loanYearsForEUError,
  loanYearsForEU,
  isSettlementStatus,
  isSettlementStatusError,
  setIsSettlementStatusError,
  setIsSettlementStatus,
  shareCode,
  handleshareCode,
  shareCodeError,
  statusInUK,
  statusInUKError,
  handleresidencyStatusUK,
  setHavingUnderGraduateCourseForEUError,
  havingUnderGraduateCourseForEUError,
  setHavingUnderGraduateCourseForEU,
  havingUnderGraduateCourseForEU,
  setIsStayedInUkInLast3YearsError,
  isStayedInUkInLast3YearsError,
  isStayedInUkInLast3Years,
  setIsStayedInUkInLast3Years,
  loansForEUError,
  setLoansForEUError,
}) {
  useEffect(() => {
    setLoansForEu(
      applicationInformation != null &&
        applicationInformation?.loanfromStudentLoansCompanyForEU === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.loanfromStudentLoansCompanyForEU === false
        ? false
        : null
    );

    setIsSettlementStatus(
      applicationInformation != null &&
        applicationInformation?.isHavePre_Settlementstatus === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isHavePre_Settlementstatus === false
        ? false
        : null
    );
    setIsStayedInUkInLast3Years(
      applicationInformation != null &&
        applicationInformation?.isStayedInsideInUkinLast3Years === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isStayedInsideInUkinLast3Years === false
        ? false
        : null
    );
    setHavingUnderGraduateCourseForEU(
      applicationInformation != null &&
        applicationInformation?.havingUndergraduatePostgraduateCourseForEU ===
          true
        ? true
        : applicationInformation != null &&
          applicationInformation?.havingUndergraduatePostgraduateCourseForEU ===
            false
        ? false
        : null
    );
  }, [applicationInformation]);

  // const handleDate = (e) => {
  //   var datee = e;
  //   var utcDate = new Date(datee);
  //   var localeDate = utcDate.toLocaleString("en-CA");
  //   const x = localeDate.split(",")[0];
  //   return x;
  // };
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
        {/* <Input
          className="form-mt"
          type="date"
          name="DateOfMoveToUk"
          id="DateOfMoveToUk"
          onChange={(e) => {
            handleDate(e);
          }}
          value={date}
          // min={minDate}
        /> */}
        <DMYPicker
          setValue={handleDate}
          label="When Did You Move to The UK?"
          value={date}
          error={dateError}
          action={setdateError}
          required={true}
        />
      </FormGroup>

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
            name="loanfromStudentLoansCompanyForEU"
            value={true}
            checked={loansForEu === true}
            onChange={() => setLoansForEu(true)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="loanfromStudentLoansCompanyForEU"
          >
            Yes
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            type="radio"
            name="loanfromStudentLoansCompanyForEU"
            value={false}
            checked={loansForEu === false}
            onChange={() => setLoansForEu(false)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="loanfromStudentLoansCompanyForEU"
          >
            No
          </Label>
        </FormGroup>
        <br />
        <span className="text-danger">{loansForEUError}</span>
      </FormGroup>

      {loansForEu === true ? (
        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> How Many Years?
          </span>

          <Input
            className="form-mt"
            type="text"
            name="loanYearsForEU"
            id="loanYearsForEU"
            placeholder="Enter Years"
            onChange={(e) => {
              handleEuManyYears(e);
            }}
            value={loanYearsForEU}
          />
          <span className="text-danger">{loanYearsForEUError}</span>
        </FormGroup>
      ) : null}

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Do You Have Settled or
          Pre-settled Status Under The EU Settlement Scheme?
        </span>
        <br />

        <FormGroup check className="form-mt">
          <input
            className="form-check-input"
            id="IsHavePre_Settlementstatus1"
            type="radio"
            name="IsHavePre_Settlementstatus"
            value={true}
            onChange={() => setIsSettlementStatus(true)}
            checked={isSettlementStatus === true}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="IsHavePre_Settlementstatus1"
          >
            <span style={{ fontSize: "13px" }}>
              I have Settled/Pre-settled Status
            </span>
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            id="IsHavePre_Settlementstatus2"
            type="radio"
            name="IsHavePre_Settlementstatus"
            value={false}
            onChange={() => setIsSettlementStatus(false)}
            checked={isSettlementStatus === false}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="IsHavePre_Settlementstatus2"
          >
            <span style={{ fontSize: "13px" }}>I have other status</span>
          </Label>
        </FormGroup>
        <br />
        <span className="text-danger">{isSettlementStatusError}</span>
      </FormGroup>

      {isSettlementStatus === true ? (
        <>
          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span> What is Your Current
              Residency Status in The UK?
            </span>

            <FormGroup check className="form-mt">
              <input
                className="form-check-input"
                type="radio"
                name="CurrentResidencyStatusForEU"
                id="settle"
                value={`Settled`}
                onChange={(e) => {
                  handleresidencyStatusUK(e);
                }}
                checked={statusInUK === "Settled"}
              />
              <Label className="form-check-label" check htmlFor="settle">
                <span style={{ fontSize: "13px" }}>Settled</span>
              </Label>
            </FormGroup>

            <FormGroup check className="form-mt">
              <input
                className="form-check-input"
                type="radio"
                name="CurrentResidencyStatusForEU"
                id="Pre-settled"
                value={`Pre-settled`}
                onChange={(e) => {
                  handleresidencyStatusUK(e);
                }}
                checked={statusInUK === "Pre-settled"}
              />
              <Label className="form-check-label" check htmlFor="Pre-settled">
                <span style={{ fontSize: "13px" }}>Pre-settled</span>
              </Label>
            </FormGroup>

            {/* <Input
              className="form-mt"
              type="text"
              name="CurrentResidencyStatusForEU"
              id="CurrentResidencyStatusForEU"
              placeholder="Enter Residency Status"
              value={statusInUK}
              onChange={(e) => {
                handleresidencyStatusUK(e);
              }}
            /> */}
            <span className="text-danger">{statusInUKError}</span>
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span> Please Provide The Valid
              Share Code
            </span>

            <Input
              className="form-mt"
              type="text"
              name="shareCode"
              id="shareCode"
              placeholder="Enter Share Code"
              value={shareCode}
              onChange={(e) => {
                handleshareCode(e);
              }}
            />
            <span className="text-danger">{shareCodeError}</span>
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger mr-1">*</span>
              Have You Been Resident in The UK And Islands For The Last Three
              Years?
            </span>
            <br />

            <FormGroup check inline className="form-mt">
              <input
                className="form-check-input"
                type="radio"
                name="isStayedInsideInUkinLast3Years"
                value={true}
                onChange={() => setIsStayedInUkInLast3Years(true)}
                checked={isStayedInUkInLast3Years === true}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsStayedInsideInUkinLast3Years"
              >
                Yes
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <input
                className="form-check-input"
                type="radio"
                name="isStayedInsideInUkinLast3Years"
                value={false}
                onChange={() => setIsStayedInUkInLast3Years(false)}
                checked={isStayedInUkInLast3Years === false}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsStayedInsideInUkinLast3Years"
              >
                No
              </Label>
            </FormGroup>
            <br />
            <span className="text-danger">{isStayedInUkInLast3YearsError}</span>
          </FormGroup>
        </>
      ) : isSettlementStatus === false ? (
        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> What is Your Current
            Residency Status in The UK?
          </span>

          <Input
            className="form-mt"
            type="text"
            name="CurrentResidencyStatusForEU"
            id="CurrentResidencyStatusForEU"
            placeholder="Enter Residency Status"
            value={statusInUK}
            onChange={(e) => {
              handleresidencyStatusUK(e);
            }}
          />
          <span className="text-danger">{statusInUKError}</span>
        </FormGroup>
      ) : null}

      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span> Have You Started An
          Undergraduate or Postgraduate Course of Higher Education in Any
          Country Since Leaving School?
        </span>
        <br />
        <FormGroup check inline className="form-mt">
          <input
            className="form-check-input"
            type="radio"
            name="HavingUndergraduatePostgraduateCourseForEU"
            value={true}
            onChange={() => setHavingUnderGraduateCourseForEU(true)}
            checked={havingUnderGraduateCourseForEU === true}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="HavingUndergraduatePostgraduateCourseForEU"
          >
            Yes
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            type="radio"
            name="HavingUndergraduatePostgraduateCourseForEU"
            value={false}
            onChange={() => setHavingUnderGraduateCourseForEU(false)}
            checked={havingUnderGraduateCourseForEU === false}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="HavingUndergraduatePostgraduateCourseForEU"
          >
            No
          </Label>
        </FormGroup>
        <br />
        {havingUnderGraduateCourseForEUError && (
          <span className="text-danger">
            {havingUnderGraduateCourseForEUError}
          </span>
        )}
      </FormGroup>
    </div>
  );
}
