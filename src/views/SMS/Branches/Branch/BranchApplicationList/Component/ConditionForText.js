import React from "react";
import TagButton from "../../../../../../components/buttons/TagButton";

const ConditionForText = ({
  branchLabel,
  setBranchLabel,
  branchValue,
  setBranchValue,
  commonUappIdValue,
  commonStdValue,
  consultantValue,
  applicationValue,
  offerValue,
  enrollValue,
  intakeValue,
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
  setApplicationId,
}) => {
  return (
    <>
      <div className="d-flex mt-1">
        {commonUappIdValue !== 0 ||
        commonStdValue !== 0 ||
        consultantValue !== 0 ||
        applicationValue !== 0 ||
        offerValue !== 0 ||
        enrollValue !== 0 ||
        intakeValue !== 0 ||
        interviewValue !== 0 ||
        elptValue !== 0 ||
        financeValue !== 0 ||
        commonUniValue !== 0
          ? ""
          : ""}
        {commonUappIdValue !== 0 ? (
          <TagButton
            label={commonUappIdLabel}
            setValue={() => setCommonUappIdValue(0)}
            setLabel={() => setCommonUappIdLabel("UAPP ID")}
          ></TagButton>
        ) : (
          ""
        )}
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
          ? ""
          : ""}
        {commonStdValue !== 0 ? (
          <TagButton
            label={commonStdLabel}
            setValue={() => setCommonStdValue(0)}
            setLabel={() => setCommonStdLabel("Name")}
          ></TagButton>
        ) : (
          ""
        )}
        {commonStdValue !== 0 &&
        (consultantValue !== 0 ||
          applicationValue !== 0 ||
          offerValue !== 0 ||
          enrollValue !== 0 ||
          intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {consultantValue !== 0 ? (
          <TagButton
            label={consultantLabel}
            setValue={() => setConsultantValue(0)}
            setLabel={() => setConsultantLabel("Consultant")}
          ></TagButton>
        ) : (
          ""
        )}
        {consultantValue !== 0 &&
        (applicationValue !== 0 ||
          offerValue !== 0 ||
          enrollValue !== 0 ||
          intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {applicationValue !== 0 ? (
          <TagButton
            label={applicationLabel}
            setValue={() => setApplicationValue(0)}
            setLabel={() => setApplicationLabel("Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {applicationValue !== 0 &&
        (offerValue !== 0 ||
          enrollValue !== 0 ||
          intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {offerValue !== 0 ? (
          <TagButton
            label={offerLabel}
            setValue={() => setOfferValue(0)}
            setLabel={() => setOfferLabel("Offer")}
          ></TagButton>
        ) : (
          ""
        )}
        {offerValue !== 0 &&
        (enrollValue !== 0 ||
          intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {enrollValue !== 0 ? (
          <TagButton
            label={enrollLabel}
            setValue={() => setEnrollValue(0)}
            setLabel={() => setEnrollLabel("Enrolment Status")}
          ></TagButton>
        ) : (
          ""
        )}

        {enrollValue !== 0 &&
        (intakeValue !== 0 ||
          interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {intakeValue !== 0 ? (
          <TagButton
            label={intakeLabel}
            setValue={() => setIntakeValue(0)}
            setLabel={() => setIntakeLabel("Intake")}
          ></TagButton>
        ) : (
          ""
        )}
        {intakeValue !== 0 &&
        (interviewValue !== 0 ||
          elptValue !== 0 ||
          financeValue !== 0 ||
          commonUniValue !== 0)
          ? ""
          : ""}
        {interviewValue !== 0 ? (
          <TagButton
            label={interviewLabel}
            setValue={() => setInterviewValue(0)}
            setLabel={() => setInterviewLabel("Interview")}
          ></TagButton>
        ) : (
          ""
        )}
        {interviewValue !== 0 &&
        (elptValue !== 0 || financeValue !== 0 || commonUniValue !== 0)
          ? ""
          : ""}
        {elptValue !== 0 ? (
          <TagButton
            label={elptLabel}
            setValue={() => setElptValue(0)}
            setLabel={() => setElptLabel("ELPT")}
          ></TagButton>
        ) : (
          ""
        )}
        {elptValue !== 0 && (financeValue !== 0 || commonUniValue !== 0)
          ? ""
          : ""}
        {financeValue !== 0 ? (
          <TagButton
            label={financeLabel}
            setValue={() => setFinanceValue(0)}
            setLabel={() => setFinanceLabel("SLCs")}
          ></TagButton>
        ) : (
          ""
        )}
        {financeValue !== 0 && commonUniValue !== 0 ? "" : ""}
        {commonUniValue !== 0 ? (
          <TagButton
            label={commonUniLabel}
            setValue={() => setCommonUniValue(0)}
            setLabel={() => setCommonUniLabel("University Name")}
          ></TagButton>
        ) : (
          ""
        )}
        {branchValue !== 0 ? (
          <TagButton
            label={branchLabel}
            setValue={() => setBranchValue(0)}
            setLabel={() => setBranchLabel("Select Branch")}
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
