import React from "react";
import TagButton from "../../../../../components/buttons/TagButton";

const ConditionForText = ({
  selector,
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
  admId,
  companionLabel,
  setCompanionLabel,
  companionValue,
  setCompanionValue,
  companionId,
  admissionManagerLabel,
  setAdmissionManagerLabel,
  admissionManagerValue,
  setAdmissionManagerValue,
  commonUappIdValue,
  commonStdValue,
  consultantValue,
  applicationValue,
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
  consultantLabel,
  applicationLabel,
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
  setConsultantLabel,
  setConsultantValue,
  setCommonStdLabel,
  setCommonStdValue,
  consultantId,
  setApplicationId,
  documentStatusLabel,
  setdocumentStatusLabel,
  documentStatusValue,
  setdocumentStatusValue,
}) => {
  return (
    <>
      <div className="d-flex mt-1">
        {commonUappIdValue !== 0 ? (
          <TagButton
            label={commonUappIdLabel}
            setValue={() => setCommonUappIdValue(0)}
            setLabel={() => setCommonUappIdLabel("UAPP ID")}
          ></TagButton>
        ) : (
          ""
        )}

        {commonStdValue !== 0 ? (
          <TagButton
            label={commonStdLabel}
            setValue={() => setCommonStdValue(0)}
            setLabel={() => setCommonStdLabel("Name")}
          ></TagButton>
        ) : (
          ""
        )}

        {!consultantId && consultantValue !== 0 ? (
          <TagButton
            label={consultantLabel}
            setValue={() => setConsultantValue(0)}
            setLabel={() => setConsultantLabel("Consultant")}
          ></TagButton>
        ) : (
          ""
        )}

        {selector !== "1" && applicationValue !== 0 ? (
          <TagButton
            label={applicationLabel}
            setValue={() => setApplicationValue(0)}
            setLabel={() => setApplicationLabel("Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {selector !== "2" && offerValue !== 0 ? (
          <TagButton
            label={offerLabel}
            setValue={() => setOfferValue(0)}
            setLabel={() => setOfferLabel("Offer")}
          ></TagButton>
        ) : (
          ""
        )}

        {selector !== "3" && enrollValue !== 0 ? (
          <TagButton
            label={enrollLabel}
            setValue={() => setEnrollValue(0)}
            setLabel={() => setEnrollLabel("Enrolment Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {intakeValue !== 0 ? (
          <TagButton
            label={intakeLabel}
            setValue={() => setIntakeValue(0)}
            setLabel={() => setIntakeLabel("Intake")}
          ></TagButton>
        ) : (
          ""
        )}

        {!intake && intakeRngValue !== 0 ? (
          <TagButton
            label={intakeRngLabel}
            setValue={() => setIntakeRngValue(0)}
            setLabel={() => setIntakeRngLabel("Intake Range")}
          ></TagButton>
        ) : (
          ""
        )}

        {interviewValue !== 0 ? (
          <TagButton
            label={interviewLabel}
            setValue={() => setInterviewValue(0)}
            setLabel={() => setInterviewLabel("Interview")}
          ></TagButton>
        ) : (
          ""
        )}
        {elptValue !== 0 ? (
          <TagButton
            label={elptLabel}
            setValue={() => setElptValue(0)}
            setLabel={() => setElptLabel("ELPT")}
          ></TagButton>
        ) : (
          ""
        )}

        {financeValue !== 0 ? (
          <TagButton
            label={financeLabel}
            setValue={() => setFinanceValue(0)}
            setLabel={() => setFinanceLabel("SLCs")}
          ></TagButton>
        ) : (
          ""
        )}

        {commonUniValue !== 0 ? (
          <TagButton
            label={commonUniLabel}
            setValue={() => setCommonUniValue(0)}
            setLabel={() => setCommonUniLabel("University Name")}
          ></TagButton>
        ) : (
          ""
        )}

        {!branchId && branchValue !== 0 ? (
          <TagButton
            label={branchLabel}
            setValue={() => setBranchValue(0)}
            setLabel={() => setBranchLabel("Select Branch")}
          ></TagButton>
        ) : (
          ""
        )}

        {branchManagerValue !== 0 ? (
          <TagButton
            label={branchManagerLabel}
            setValue={() => setBranchManagerValue(0)}
            setLabel={() => setBranchManagerLabel("Branch Admin")}
          ></TagButton>
        ) : (
          ""
        )}

        {!providerId && proValue !== 0 ? (
          <TagButton
            label={proLabel}
            setValue={() => setProValue(0)}
            setLabel={() => setProLabel("Select Provider")}
          ></TagButton>
        ) : (
          ""
        )}

        {documentStatusValue !== 0 ? (
          <TagButton
            label={documentStatusLabel}
            setValue={() => setdocumentStatusValue(0)}
            setLabel={() => setdocumentStatusLabel("Select Document Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {!admId && admissionManagerValue !== 0 ? (
          <TagButton
            label={admissionManagerLabel}
            setValue={() => setAdmissionManagerValue(0)}
            setLabel={() => setAdmissionManagerLabel("Admission Manager")}
          ></TagButton>
        ) : (
          ""
        )}
        {!affiliateId && affiliateValue !== 0 ? (
          <TagButton
            label={affiliateLabel}
            setValue={() => setAffiliateValue(0)}
            setLabel={() => setAffiliateLabel("Affiliate")}
          ></TagButton>
        ) : (
          ""
        )}
        {!companionId && companionValue !== 0 ? (
          <TagButton
            label={companionLabel}
            setValue={() => setCompanionValue(0)}
            setLabel={() => setCompanionLabel("Companion")}
          ></TagButton>
        ) : (
          ""
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
