import React from "react";
import TagButton from "../../../../../components/buttons/TagButton";

const ConditionForText = ({
  status,
  selector,
  admId,
  adoId,
  branchId,
  branchLabel,
  setBranchLabel,
  branchValue,
  setBranchValue,
  providerId,
  proLabel,
  setProLabel,
  proValue,
  setProValue,
  branchManagerLabel,
  setBranchManagerLabel,
  branchManagerValue,
  setBranchManagerValue,
  affiliateLabel,
  setAffiliateLabel,
  affiliateValue,
  setAffiliateValue,
  affiliateId,
  companionLabel,
  setCompanionLabel,
  companionValue,
  setCompanionValue,
  companionId,
  admissionManagerLabel,
  setAdmissionManagerLabel,
  admissionManagerValue,
  setAdmissionManagerValue,
  admissionOfficerLabel,
  setAdmissionOfficerLabel,
  admissionOfficerValue,
  setAdmissionOfficerValue,
  commonUappIdValue,
  commonStdValue,
  consultantTypeValue,
  consultantValue,
  applicationValue,
  applicationSubValue,
  offerValue,
  enrollValue,
  intakeValue,
  intakeRngValue,
  interviewValue,
  elptValue,
  financeValue,
  commonUniValue,
  commonUappIdLabel,
  commonStdLabel,
  consultantTypeLabel,
  consultantLabel,
  applicationLabel,
  applicationSubLabel,
  offerLabel,
  enrollLabel,
  intakeLabel,
  intake,
  intakeRngLabel,
  interviewLabel,
  elptLabel,
  financeLabel,
  commonUniLabel,
  setApplicationLabel,
  setApplicationValue,
  setApplicationSubLabel,
  setApplicationSubValue,
  setOfferLabel,
  setOfferValue,
  setEnrollLabel,
  setEnrollValue,
  setIntakeLabel,
  setIntakeValue,
  setIntakeRngLabel,
  setIntakeRngValue,
  setInterviewLabel,
  setInterviewValue,
  setElptLabel,
  setElptValue,
  setFinanceLabel,
  setFinanceValue,
  setCommonUappIdLabel,
  setCommonUappIdValue,
  setCommonUniLabel,
  setCommonUniValue,
  setConsultantTypeLabel,
  setConsultantLabel,
  setConsultantTypeValue,
  setConsultantValue,
  setCommonStdLabel,
  setCommonStdValue,
  consultantId,
  setApplicationId,
  documentStatusLabel,
  setdocumentStatusLabel,
  documentStatusValue,
  setdocumentStatusValue,
  percentageLabel,
  setPercentageLabel,
  percentageValue,
  setPercentageValue,
  selectedDates,
  setSelectedDates,
  confidenceLevel,
  setConfidenceLevel,
  confidenceValue,
  setConfidenceValue,
  setSalesTeamLeaderValue,
  setSalesTeamLeaderLabel,
  SalesTeamLeaderValue,
  SalesTeamLeaderLabel,
  educationLevelValue,
  setEducationLevelValue,
  educationLevelLabel,
  setEducationLevelLabel,
  departmentValue,
  setDepartmentValue,
  departmentLabel,
  setDepartmentLabel,
}) => {
  return (
    <>
      <div className="d-flex mt-1">
        {commonUappIdValue && commonUappIdValue !== 0 ? (
          <TagButton
            label={commonUappIdLabel}
            setValue={() => setCommonUappIdValue(0)}
            setLabel={() => setCommonUappIdLabel("UAPP ID")}
          ></TagButton>
        ) : (
          ""
        )}

        {commonStdValue && commonStdValue !== 0 ? (
          <TagButton
            label={commonStdLabel}
            setValue={() => setCommonStdValue(0)}
            setLabel={() => setCommonStdLabel("Name")}
          ></TagButton>
        ) : (
          ""
        )}

        {consultantTypeValue && consultantTypeValue !== 0 ? (
          <TagButton
            label={consultantTypeLabel}
            setValue={() => setConsultantTypeValue(0)}
            setLabel={() => setConsultantTypeLabel("Consultant Type")}
          ></TagButton>
        ) : (
          ""
        )}
        {!consultantId && consultantValue && consultantValue !== 0 ? (
          <TagButton
            label={consultantLabel}
            setValue={() => setConsultantValue(0)}
            setLabel={() => setConsultantLabel("Consultant")}
          ></TagButton>
        ) : (
          ""
        )}

        {!status && applicationValue && applicationValue !== 0 ? (
          <TagButton
            label={applicationLabel}
            setValue={() => setApplicationValue(0)}
            setLabel={() => setApplicationLabel("Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {!selector && applicationSubValue && applicationSubValue !== 0 ? (
          <TagButton
            label={applicationSubLabel}
            setValue={() => setApplicationSubValue(0)}
            setLabel={() => setApplicationSubLabel("Sub Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {/* {selector !== "2" && offerValue !== 0 ? (
          <TagButton
            label={offerLabel}
            setValue={() => setOfferValue(0)}
            setLabel={() => setOfferLabel("Offer")}
          ></TagButton>
        ) : (
          ""
        )} */}

        {/* {selector !== "3" && enrollValue !== 0 ? (
          <TagButton
            label={enrollLabel}
            setValue={() => setEnrollValue(0)}
            setLabel={() => setEnrollLabel("Enrolment Status")}
          ></TagButton>
        ) : (
          ""
        )} */}

        {intakeValue && intakeValue !== 0 ? (
          <TagButton
            label={intakeLabel}
            setValue={() => setIntakeValue(0)}
            setLabel={() => setIntakeLabel("Intake")}
          ></TagButton>
        ) : (
          ""
        )}

        {!intake && intakeRngValue && intakeRngValue !== 0 ? (
          <TagButton
            label={intakeRngLabel}
            setValue={() => setIntakeRngValue(0)}
            setLabel={() => setIntakeRngLabel("Intake Range")}
          ></TagButton>
        ) : (
          ""
        )}

        {interviewValue && interviewValue !== 0 ? (
          <TagButton
            label={interviewLabel}
            setValue={() => setInterviewValue(0)}
            setLabel={() => setInterviewLabel("Interview")}
          ></TagButton>
        ) : (
          ""
        )}
        {elptValue && elptValue !== 0 ? (
          <TagButton
            label={elptLabel}
            setValue={() => setElptValue(0)}
            setLabel={() => setElptLabel("ELPT")}
          ></TagButton>
        ) : (
          ""
        )}

        {financeValue && financeValue !== 0 ? (
          <TagButton
            label={financeLabel}
            setValue={() => setFinanceValue(0)}
            setLabel={() => setFinanceLabel("SLCs")}
          ></TagButton>
        ) : (
          ""
        )}

        {commonUniValue && commonUniValue !== 0 ? (
          <TagButton
            label={commonUniLabel}
            setValue={() => setCommonUniValue(0)}
            setLabel={() => setCommonUniLabel("University Name")}
          ></TagButton>
        ) : (
          ""
        )}

        {!branchId && branchValue && branchValue !== 0 ? (
          <TagButton
            label={branchLabel}
            setValue={() => setBranchValue(0)}
            setLabel={() => setBranchLabel("Select Branch")}
          ></TagButton>
        ) : (
          ""
        )}

        {branchManagerValue && branchManagerValue !== 0 ? (
          <TagButton
            label={branchManagerLabel}
            setValue={() => setBranchManagerValue(0)}
            setLabel={() => setBranchManagerLabel("Branch Admin")}
          ></TagButton>
        ) : (
          ""
        )}

        {!providerId && proValue && proValue !== 0 ? (
          <TagButton
            label={proLabel}
            setValue={() => setProValue(0)}
            setLabel={() => setProLabel("Select Provider")}
          ></TagButton>
        ) : (
          ""
        )}

        {documentStatusValue && documentStatusValue !== 0 ? (
          <TagButton
            label={documentStatusLabel}
            setValue={() => setdocumentStatusValue(0)}
            setLabel={() => setdocumentStatusLabel("Select Document Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {percentageValue && percentageValue !== 0 ? (
          <TagButton
            label={percentageLabel}
            setValue={() => setPercentageValue(0)}
            setLabel={() => setPercentageLabel("Assesment percentage")}
          ></TagButton>
        ) : (
          ""
        )}

        {!admId && admissionManagerValue && admissionManagerValue !== 0 ? (
          <TagButton
            label={admissionManagerLabel}
            setValue={() => setAdmissionManagerValue(0)}
            setLabel={() => setAdmissionManagerLabel("Admission Manager")}
          ></TagButton>
        ) : (
          ""
        )}

        {!adoId && admissionOfficerValue && admissionOfficerValue !== 0 ? (
          <TagButton
            label={admissionOfficerLabel}
            setValue={() => setAdmissionOfficerValue(0)}
            setLabel={() => setAdmissionOfficerLabel("Admission Officer")}
          ></TagButton>
        ) : (
          ""
        )}

        {!affiliateId && affiliateValue && affiliateValue !== 0 ? (
          <TagButton
            label={affiliateLabel}
            setValue={() => setAffiliateValue(0)}
            setLabel={() => setAffiliateLabel("Affiliate")}
          ></TagButton>
        ) : (
          ""
        )}

        {!companionId && companionValue && companionValue !== 0 ? (
          <TagButton
            label={companionLabel}
            setValue={() => setCompanionValue(0)}
            setLabel={() => setCompanionLabel("Companion")}
          ></TagButton>
        ) : (
          ""
        )}
        {SalesTeamLeaderValue && SalesTeamLeaderValue !== 0 ? (
          <TagButton
            label={SalesTeamLeaderLabel}
            setValue={() => setSalesTeamLeaderValue(0)}
            setLabel={() => setSalesTeamLeaderLabel("Select Sales Team Leader")}
          ></TagButton>
        ) : (
          ""
        )}
        {confidenceValue?.toString() === "0" || confidenceValue > 0 ? (
          <TagButton
            label={confidenceLevel}
            setValue={() => setConfidenceValue("")}
            setLabel={() => setConfidenceLevel("Confidence Level")}
          ></TagButton>
        ) : (
          ""
        )}
        {educationLevelValue && educationLevelValue !== 0 ? (
          <TagButton
            label={educationLevelLabel}
            setValue={() => setEducationLevelValue(0)}
            setLabel={() => setEducationLevelLabel("Select Education Level")}
          ></TagButton>
        ) : (
          ""
        )}
        {departmentValue && departmentValue !== 0 ? (
          <TagButton
            label={departmentLabel}
            setValue={() => setDepartmentValue(0)}
            setLabel={() => setDepartmentLabel("Select Department")}
          ></TagButton>
        ) : (
          ""
        )}
        {selectedDates && selectedDates?.length > 0 && (
          <TagButton
            label={selectedDates.join(" - ")}
            setValue={() => setSelectedDates([])}
            setLabel={() => {}}
          />
        )}

        {/* 
        {commonUappIdValue !== 0 &&
        (commonStdValue !== 0 ||
          consultantValue !== 0 ||
          applicationValue !== 0 ||
          offerValue !== 0 ||
          enrollValue !== 0 ||
          intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ","
          : ""} */}
      </div>
    </>
  );
};

export default ConditionForText;
