import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import { rootUrl } from "../../../../../../constants/constants";
import DownloadButton from "../../../../../../components/buttons/DownloadButton";

const ApplicationInformation = ({
  sId,
  applicationData,
  setApplicationData,
}) => {
  const [applicationProfileData, setApplicationProfileData] = useState({});

  useEffect(() => {
    get(`ApplicationInfo/Overview/${sId}`).then((res) => {
      setApplicationData(res);
      console.log(res, "profile info");
    });

    get(`ApplicationInfo/GetByStudentId/${sId}`).then((res) => {
      setApplicationProfileData(res);
      console.log(res, "application profile info");
    });
  }, [sId, setApplicationData]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Application Information</b>
          </td>
          <td className="border-0"></td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Student's preferred study destination</td>
            <td width="40%">{applicationData?.preferredCountry}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Application Type</td>
            <td>{applicationData?.applicationInfo}</td>
          </tr>

          <>
            {" "}
            {applicationProfileData?.studentTypeId === 1 && (
              <>
                {" "}
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td>Loan From Student Loans Company</td>
                  <td>
                    {applicationProfileData?.loanfromStudentLoansCompanyForHome ===
                    false
                      ? "No"
                      : "Yes"}
                  </td>
                </tr>
                {applicationProfileData?.loanfromStudentLoansCompanyForHome ===
                  true && (
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Loan Years</td>
                    <td>{applicationProfileData?.loanYearsForHome}</td>
                  </tr>
                )}
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td>
                    Undergraduate or Postgraduate Course of Higher Education in
                    Any Country Since Leaving School
                  </td>
                  <td>
                    {applicationProfileData?.havingUndergraduatePostgraduateCourseForHome ===
                    false
                      ? "No"
                      : "Yes"}
                  </td>
                </tr>
              </>
            )}
          </>

          <>
            {applicationProfileData?.studentTypeId === 2 && (
              <>
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td>First Entry Date in UK</td>
                  <td>{dateFormate(applicationProfileData?.dateOfMoveToUk)}</td>
                </tr>

                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td>Loan From Student Loans Company</td>
                  <td>
                    {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                    false
                      ? "No"
                      : "Yes"}
                  </td>
                </tr>
                {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                  true && (
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Loan Years</td>
                    <td>{applicationProfileData?.loanYearsForEU}</td>
                  </tr>
                )}
                {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                  false && (
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Pre Settlement status</td>
                    <td>
                      {applicationProfileData?.isHavePre_Settlementstatus ===
                      false
                        ? "No"
                        : "Yes"}
                    </td>
                  </tr>
                )}

                {applicationProfileData?.isHavePre_Settlementstatus ===
                false ? (
                  <>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Current Residency Status</td>
                      <td>
                        {applicationProfileData?.currentResidencyStatusForEU}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>
                        Undergraduate or Postgraduate Course of Higher Education
                        in Any Country Since Leaving School
                      </td>
                      <td>
                        {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                        false
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Valid Share Code</td>
                      <td>{applicationProfileData?.shareCode}</td>
                    </tr>

                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Have You Been Resident For Last Three Years</td>
                      <td>
                        {applicationProfileData?.isStayedInsideInUkinLast3Years ===
                        false
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>
                        Undergraduate or Postgraduate Course of Higher Education
                        in Any Country Since Leaving School
                      </td>
                      <td>
                        {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                        false
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                  </>
                )}
              </>
            )}
          </>

          <>
            {applicationProfileData?.studentTypeId === 3 && (
              <>
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td width="60%">Applying From Inside</td>
                  <td width="40%">
                    {applicationProfileData?.isApplyingFromInside === false
                      ? "No"
                      : "Yes"}
                  </td>
                </tr>
                {applicationProfileData?.isApplyingFromInside === false ? (
                  <>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td width="60%">Applied For Uk Visa</td>
                      <td width="40%">
                        {applicationProfileData?.isAppliedForUkVisa === false
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                    {applicationProfileData?.isAppliedForUkVisa === true && (
                      <>
                        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                          <td width="60%">Apply visa Type</td>
                          <td width="40%">
                            {applicationProfileData?.visaType}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                          <td width="60%">Refused For UK Visa</td>
                          <td width="40%">
                            {applicationProfileData?.isRefusedForUKVisa ===
                            false
                              ? "No"
                              : "Yes"}
                          </td>
                        </tr>
                        {applicationProfileData?.refusalLetterForUKVisa
                          ?.fileUrl ? (
                          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                            <td width="60%">Attach the refusal letter</td>
                            <td width="40%">
                              <a
                                href={
                                  rootUrl +
                                  applicationProfileData?.refusalLetterForUKVisa
                                    ?.fileUrl
                                }
                                target="blank"
                              >
                                <DownloadButton />
                              </a>
                            </td>
                          </tr>
                        ) : null}
                      </>
                    )}
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td width="60%">Refused Visa to Any Other Country</td>
                      <td width="40%">
                        {applicationProfileData?.isRefusedForOtherVisa === false
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                    {applicationProfileData?.refusalLetterForOtherVisa
                      ?.fileUrl ? (
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td width="60%">Attach the refusal letter</td>
                        <td width="40%">
                          <a
                            href={
                              rootUrl +
                              applicationProfileData?.refusalLetterForOtherVisa
                                ?.fileUrl
                            }
                            target="blank"
                          >
                            <DownloadButton />
                          </a>
                        </td>
                      </tr>
                    ) : null}
                  </>
                ) : (
                  <>
                    {" "}
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td width="60%">Current Residency Status</td>
                      <td width="40%">
                        {
                          applicationProfileData?.currentResidencyStatusForInternational
                        }
                      </td>
                    </tr>{" "}
                  </>
                )}
              </>
            )}
          </>
        </tbody>
      </Table>
    </>
  );
};

export default ApplicationInformation;
