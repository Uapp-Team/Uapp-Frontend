import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";

import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import SpanButton from "../../../Components/SpanButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const ApplicationStudentProfile = ({ stdId }) => {
  const [studentProInfo, setStudentProInfo] = useState({});
  const [contactData, setContactData] = useState([]);
  const [consentData, setConsentData] = useState({});

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});
  const [gMatResult, setGMatResult] = useState({});
  const [greResult, setGreResult] = useState({});

  const { addToast } = useToasts();
  const history = useHistory();

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`StudentProfile/StudentApplication/${stdId}`).then((res) => {
      setStudentProInfo(res);
      setContactData(res?.studentContactInfos);
      console.log("stdPro", res);
    });

    get(`StudentProfile/Get/${stdId}`).then((res) => {
      setGMatResult(res?.gmatScoreInfo);
      setGreResult(res?.greScoreInfo);
    });

    get(`StudentConsent/Get/${stdId}`).then((res) => {
      setConsentData(res);
    });

    get(`Ielts/Index/${stdId}`).then((res) => {
      setIelts(res);
    });

    get(`Duolingo/Index/${stdId}`).then((res) => {
      setDuolingo(res);
    });

    get(`Toefl/Index/${stdId}`).then((res) => {
      setToefl(res);
    });

    get(`FunctionalSkill/Index/${stdId}`).then((res) => {
      setFunctions(res);
    });

    get(`Ielts/Index/${stdId}`).then((res) => {
      setIelts(res);
    });

    get(`Duolingo/Index/${stdId}`).then((res) => {
      setDuolingo(res);
    });

    get(`Toefl/Index/${stdId}`).then((res) => {
      setToefl(res);
    });

    get(`FunctionalSkill/Index/${stdId}`).then((res) => {
      setFunctions(res);
    });

    get(`Gcse/Index/${stdId}`).then((res) => {
      setGcse(res);
    });

    get(`Pearson/Index/${stdId}`).then((res) => {
      setPearson(res);
    });

    get(`Other/Index/${stdId}`).then((res) => {
      setOthers(res);
    });

    get(`Pte/Index/${stdId}`).then((res) => {
      setPte(res);
    });
  }, [stdId]);

  //   const handleUpdateTestScores = (data) => {

  //     history.push(`/addTestScore/${data?.id}/${1}`);
  //   };

  const handleEdit = (data) => {
    history.push(`/addStudentCountryInformation/${data?.id}/${1}`);
  };

  const handleConsentDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    // const x = localeDate.split(",")[0];
    // return x;
    return localeDate;
  };

  return (
    <div>
      <div className="hedding-titel d-flex justify-content-between">
        <div className="my-4">
          <h2 className="text-secondary">
            {studentProInfo?.nameTittle} {studentProInfo?.firstName}{" "}
            {studentProInfo?.lastName}
          </h2>
        </div>
        <div className="text-right edit-style  p-3">
          {permissions?.includes(permissionList.Update_Student_info) ? (
            <SpanButton
              icon={<i className="fas fa-pencil-alt pencil-style"></i>}
              func={() => handleEdit(studentProInfo)}
              permission={6}
            />
          ) : null}
        </div>
      </div>
      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Application Information</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>UAPP ID:</b>
            </td>

            <td width="60%">{studentProInfo?.studentViewId}</td>
          </tr>
          <tr>
            <td width="40%">
              <b>Application Type:</b>
            </td>

            <td width="60%">
              {studentProInfo?.applicationInfos?.studentTypeName}
            </td>
          </tr>

          {studentProInfo?.applicationInfos?.studentTypeId === 1 ? (
            <>
              <tr>
                <td width="40%">
                  <b>Applied Student Finance:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.isAppliedStudentFinance ===
                  true
                    ? "Yes"
                    : "No"}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Finance Application Details:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.financeApplicationDetails}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Share Code:</b>
                </td>

                <td width="60%">{studentProInfo?.applicationInfos?.code}</td>
              </tr>
            </>
          ) : studentProInfo?.applicationInfos?.studentTypeId === 2 ? (
            <>
              <tr>
                <td width="40%">
                  <b>Move in UK:</b>
                </td>

                <td width="60%">
                  {dateFormate(
                    studentProInfo?.applicationInfos?.dateOfMoveToUk
                  )}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Stayed in Outside UK/EU Territory in Last 3 Years:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos
                    ?.isStayedOutsideEU_UkinLast3Years === false
                    ? "No"
                    : "Yes"}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Pre-Settlement Status:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos
                    ?.isHavePre_Settlementstatus === true
                    ? "Yes"
                    : "No"}
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td width="40%">
                  <b>Applying From Inside:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.isApplyingFromInside ===
                  true
                    ? "Yes"
                    : "No"}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Visa Status:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.visaStatusName}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Source Of Tution Fee:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.tutionFeeSource}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Source Of Fund:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.sourceOfFund}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Source Of Sponsor:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.applicationInfos?.sourceOfSponsor}
                </td>
              </tr>
            </>
          )}

          {/* {
            studentProInfo?.applicationInfos?.studentTypeId === 1 ?
            <tr>
            <td width="40%">
              <b>Applied Student Finance:</b>
            </td>

            <td width="60%">
              {studentProInfo?.applicationInfos?.isAppliedStudentFinance === true ? "Yes" : "No"}
            </td>
          </tr>
          :
          studentProInfo?.applicationInfos?.studentTypeId === 2 ?
            <tr>
            <td width="40%">
              <b>Move in UK:</b>
            </td>

            <td width="60%">
              {dateFormate(studentProInfo?.applicationInfos?.dateOfMoveToUk)}
            </td>
          </tr>
          :
          <tr>
            <td width="40%">
              <b>Applying From Inside:</b>
            </td>

            <td width="60%">
              {studentProInfo?.applicationInfos?.isApplyingFromInside === true ? "Yes" : "No"}
            </td>
          </tr>

          }

          <tr>
            <td width="40%">
              <b>Stayed in Outside UK/EU Territory in Last 3 Years:</b>
            </td>

            <td width="60%">
              {studentProInfo?.applicationInfos
                ?.isStayedOutsideEU_UkinLast3Years === false
                ? "No"
                : "Yes"}
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>Pre-Settlement Status:</b>
            </td>

            <td width="60%">
              {studentProInfo?.applicationInfos?.isHavePre_Settlementstatus ===
              true
                ? "Yes"
                : "No"}
            </td>
          </tr>

          {
            studentProInfo?.applicationInfos?.code !== null ?
            <tr>
            <td width="40%">
              <b>Share Code:</b>
            </td>

            <td width="60%">{studentProInfo?.applicationInfos?.code}</td>
          </tr>
          :
          null
          } */}
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Personal Information</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Name:</b>
            </td>

            <td width="60%">
              {studentProInfo?.firstName} {studentProInfo?.lastName}
            </td>
          </tr>
          <tr>
            <td width="40%">
              <b>Date of Birth:</b>
            </td>

            <td width="60%">
              {studentProInfo?.dateOfBirth ? (
                <>{dateFormate(studentProInfo?.dateOfBirth)}</>
              ) : null}
            </td>
          </tr>

          <tr>
            <td width="40%">
              <b>Nationality:</b>
            </td>

            <td width="60%">{studentProInfo?.nationality}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Country of Birth:</b>
            </td>

            <td width="60%">{studentProInfo?.birthCountry}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Passport Number:</b>
            </td>

            <td width="60%">{studentProInfo?.passportNumber}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Gender:</b>
            </td>

            <td width="60%">{studentProInfo?.gender}</td>
          </tr>

          <tr>
            <td width="40%">
              <b>Marital Status:</b>
            </td>

            <td width="60%">{studentProInfo?.maritalStatus}</td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between mt-4 mb-4">
        <div>
          <h5>
            {" "}
            <b>Correspondence Addresses</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      {contactData.length > 0 ? (
        <>
          {contactData.map((contact, i) => (
            <>
              <div className="hedding-titel d-flex justify-content-between mt-3">
                <div>
                  <h5>
                    {" "}
                    <b>{contact?.addressType?.name} :</b>{" "}
                  </h5>

                  {/* <div className="bg-h"></div> */}
                </div>
              </div>
              <Table className="table-bordered mb-5">
                <tbody key={i}>
                  {/* <tr>
                  <td width="40%">
                    <span>
                      {" "}
                      <b>Address type:</b>
                    </span>
                  </td>

                  <td width="60%">
                    {contact?.addressType?.name}
                  </td>
                </tr> */}

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>House no:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.houseNo}</td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>Phone number:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.cellPhoneNumber}</td>
                  </tr>

                  {/* <tr>
                <td width="40%">
                  <span>
                    {" "}
                    <b>Email:</b>
                  </span>
                </td>

                <td width="60%">{studentDetails?.email}</td>
              </tr> */}

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>Country:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.country?.name}</td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>City:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.city}</td>
                  </tr>

                  {contact?.state !== null ? (
                    <tr>
                      <td width="40%">
                        <span>
                          {" "}
                          <b>State/County:</b>
                        </span>
                      </td>

                      <td width="60%">{contact?.stateName}</td>
                    </tr>
                  ) : null}

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>Zip code:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.zipCode}</td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <span>
                        {" "}
                        <b>Address line:</b>
                      </span>
                    </td>

                    <td width="60%">{contact?.addressLine}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          ))}
        </>
      ) : (
        <span>Correspondence address is not added.</span>
      )}

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Student Contact Information</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Mobile Number :</b>
            </td>

            <td width="60%">{studentProInfo?.phoneNumber}</td>
          </tr>
          <tr>
            <td width="40%">
              <b>Email Address:</b>
            </td>

            <td width="60%">{studentProInfo?.email}</td>
          </tr>
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Education/Qualification</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      {studentProInfo?.educationInfos === null ? (
        <Table className="table-bordered mt-4">
          <tbody>
            <tr>
              <td width="40%">
                <b>Have you ever studied?</b>
              </td>

              <td width="60%">No</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <>
          {studentProInfo?.educationInfos?.educationLevelName ? (
            <Table className="table-bordered mt-4">
              <tbody>
                <tr>
                  <td width="40%">
                    <b>Qualification Level:</b>
                  </td>

                  <td width="60%">
                    {studentProInfo?.educationInfos?.educationLevelName}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>Qualification Course:</b>
                  </td>

                  <td width="60%">
                    {studentProInfo?.educationInfos?.qualificationSubject}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>Final Grade Awarded:</b>
                  </td>

                  <td width="60%">
                    {studentProInfo?.educationInfos?.finalGrade}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>From Date:</b>
                  </td>

                  <td width="60%">
                    {dateFormate(
                      studentProInfo?.educationInfos?.attendedInstitutionFrom
                    )}
                  </td>
                </tr>
                {studentProInfo?.educationInfos?.stillStudying ? (
                  <tr>
                    <td width="40%">
                      <b>Still Studying:</b>
                    </td>

                    <td width="60%">Yes</td>
                  </tr>
                ) : (
                  <tr>
                    <td width="40%">
                      <b>To Date:</b>
                    </td>

                    <td width="60%">
                      {studentProInfo?.educationInfos?.attendedInstitutionTo !==
                      null
                        ? dateFormate(
                            studentProInfo?.educationInfos
                              ?.attendedInstitutionTo
                          )
                        : null}
                    </td>
                  </tr>
                )}
                <tr>
                  <td width="40%">
                    <b>Name of Institution:</b>
                  </td>

                  <td width="60%">
                    {studentProInfo?.educationInfos?.nameOfInstitution}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>Country of Completed Qualification:</b>
                  </td>

                  <td width="60%">{studentProInfo?.educationInfos?.country}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <div>Education/Qualification is not added.</div>
          )}
        </>
      )}

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Test Scores</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
      </div>

      {/* Test Score Data */}
      {greResult ||
      greResult ||
      ielts?.id ||
      duolingo?.id ||
      toefl?.id ||
      functions?.id ||
      gcse?.id ||
      pearson?.id ||
      others?.id ||
      pte?.id ? (
        <div className=" row">
          {greResult ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <h5 className="test-score-title-style2">GRE Score</h5>
                  </div>

                  <h6>Quantitative Score: {greResult?.quantitativeScore}</h6>
                  <h6>Quantitative Rank: {greResult?.quantitativeRank}</h6>
                  <h6>Verbal Score: {greResult?.verbalScore}</h6>
                  <h6>Verbal Rank: {greResult?.verbalRank}</h6>
                  <h6>Writing Score: {greResult?.writingScore}</h6>
                  <h6>Writing Rank: {greResult?.writingRank}</h6>
                </CardBody>
              </Card>
            </div>
          ) : null}

          {gMatResult ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <h5 className="test-score-title-style2">GMAT Score</h5>
                  </div>

                  <h6>Quantitative Score: {gMatResult?.quantitativeScore}</h6>
                  <h6>Quantitative Rank: {gMatResult?.quantitativeRank}</h6>
                  <h6>Verbal Score: {gMatResult?.verbalScore}</h6>
                  <h6>Verbal Rank: {gMatResult?.verbalRank}</h6>
                  <h6>Total Score: {gMatResult?.totalScore}</h6>
                  <h6>Total Rank: {gMatResult?.totalRank}</h6>
                  <h6>Writing Score: {gMatResult?.writingScore}</h6>
                  <h6>Writing Rank: {gMatResult?.writingRank}</h6>
                </CardBody>
              </Card>
            </div>
          ) : null}

          {/* English Test Scores */}
        </div>
      ) : (
        <span>Test score is not added.</span>
      )}

      <div className="row mt-3">
        {ielts?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">IELTS Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Overall: {ielts?.overall}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Speaking: {ielts?.speaking}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      reading: {ielts?.reading}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Writing: {ielts?.writing}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Listening: {ielts?.listening}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Exam Date: {dateFormate(ielts?.examDate)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {duolingo?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">DUOLINGO Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Literacy: {duolingo?.leteracy}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Comprehension: {duolingo?.comprehension}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Conversation: {duolingo?.conversation}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Production: {duolingo?.production}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Exam Date: {dateFormate(duolingo?.examDate)}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {duolingo?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {toefl?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">TOEFL Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Overall: {toefl?.overall}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Speaking: {toefl?.speaking}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      reading: {toefl?.reading}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Writing: {toefl?.writing}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Listening: {toefl?.listening}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Exam Date: {dateFormate(toefl?.examDate)}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {toefl?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {functions?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">
                    Functional Skill Score
                  </h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Overall: {functions?.overall}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Speaking: {functions?.speaking}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      reading: {functions?.reading}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Writing: {functions?.writing}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Listening: {functions?.listening}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Exam Date: {dateFormate(functions?.examDate)}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {functions?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {gcse?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">GCSE Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Result: {gcse?.result}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {gcse?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {pearson?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">PEARSON Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Result: {pearson?.result}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {pearson?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {others?.id ? (
          <div className="col-6 mt-2">
            <Card className="">
              <CardBody className="">
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">Other Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Test Name: {others?.testName}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Overall Score: {others?.scoreOverall}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {others?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
        {pte?.id ? (
          <div className="col-6 mt-2">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <h5 className="test-score-title-style2">PTE Score</h5>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <span className="bank-account-info-text">
                      Overall: {pte?.overall}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Speaking: {pte?.speaking}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Reading: {pte?.reading}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Writing: {pte?.writing}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      Listening: {pte?.listening}
                    </span>
                    <br />
                    <span className="bank-account-info-text">
                      IELTS Equivalent Score: {pte?.ieltsEquivalent}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </div>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Employment History</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      {studentProInfo?.experienceinfo?.companyName ? (
        <Table className="table-bordered mt-4">
          <tbody>
            <tr>
              <td width="40%">
                <b>Job Title:</b>
              </td>

              <td width="60%">{studentProInfo?.experienceinfo?.jobTitle}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Company Name:</b>
              </td>

              <td width="60%">{studentProInfo?.experienceinfo?.companyName}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Duties and Responsibilities:</b>
              </td>

              <td width="60%">
                {studentProInfo?.experienceinfo?.employeementDetails}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>From Date:</b>
              </td>

              <td width="60%">
                {dateFormate(studentProInfo?.experienceinfo?.startDate)}
              </td>
            </tr>
            {studentProInfo?.experienceinfo?.isStillWorking ? (
              <tr>
                <td width="40%">
                  <b>Currently Working:</b>
                </td>

                <td width="60%">Yes</td>
              </tr>
            ) : (
              <tr>
                <td width="40%">
                  <b>To Date:</b>
                </td>

                <td width="60%">
                  {studentProInfo?.experienceinfo?.endDate !== null
                    ? dateFormate(studentProInfo?.experienceinfo?.endDate)
                    : null}
                  {/* {dateFormate(
                                studentProInfo?.experienceinfo?.endDate
                              )} */}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <span>Employment history is not added.</span>
      )}

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Reference Details</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      {studentProInfo?.referenceInfo?.referenceName ? (
        <Table className="table-bordered mt-4">
          <tbody>
            <tr>
              <td width="40%">
                <b>Reference Name:</b>
              </td>

              <td width="60%">
                {studentProInfo?.referenceInfo?.referenceName}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>Relation:</b>
              </td>

              <td width="60%">
                {studentProInfo?.referenceInfo?.referenceTypeName}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>Reference Institute/Company:</b>
              </td>

              <td width="60%">
                {studentProInfo?.referenceInfo?.institute_Company}
              </td>
            </tr>
            <tr>
              <td width="40%">
                <b>Phone Number:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.phoneNumber}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Email Address:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.emailAddress}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Country:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.country}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>Street Address:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.addressLine}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>City:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.city}</td>
            </tr>
            <tr>
              <td width="40%">
                <b>State/County:</b>
              </td>

              <td width="60%">{studentProInfo?.referenceInfo?.stateName}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <span>Reference information is not added.</span>
      )}

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Personal Statement</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>
      {studentProInfo?.profilePersonalStatement?.statement ? (
        <div
          className="container py-3"
          style={{ border: "1px solid rgb(222, 226, 230)" }}
        >
          {studentProInfo?.profilePersonalStatement?.statement}
        </div>
      ) : (
        <div
          className=""
          // style={{ border: "1px solid rgb(222, 226, 230)" }}
        >
          Personal statement is not added.
        </div>
      )}

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Other Information</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>
      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Disability:</b>
            </td>

            <td width="60%">
              {studentProInfo?.profileOtherInfo?.isHaveDisability ? (
                <>Yes</>
              ) : (
                <>No</>
              )}
            </td>
          </tr>
          {studentProInfo?.profileOtherInfo?.isHaveDisability ? (
            <tr>
              <td width="40%">
                <b>Disability Description:</b>
              </td>

              <td width="60%">
                {studentProInfo?.profileOtherInfo?.disabilityDescription}
              </td>
            </tr>
          ) : null}

          <tr>
            <td width="40%">
              <b>Criminal Convictions:</b>
            </td>

            <td width="60%">
              {studentProInfo?.profileOtherInfo?.isHaveCriminalConvictions ? (
                <>Yes</>
              ) : (
                <>No</>
              )}
            </td>
          </tr>
          {studentProInfo?.profileOtherInfo?.isHaveCriminalConvictions ? (
            <tr>
              <td width="40%">
                <b>Criminal Convictions Description:</b>
              </td>

              <td width="60%">
                {
                  studentProInfo?.profileOtherInfo
                    ?.criminalConvictionsDescription
                }
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>

      <div className="hedding-titel d-flex justify-content-between my-4">
        <div>
          <h5>
            {" "}
            <b>Consent</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
        {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
      </div>

      <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>Status:</b>
            </td>

            <td width="60%">
              {consentData?.consentSignStatusId == 1
                ? "Not Signed"
                : consentData?.consentSignStatusId == 2
                ? "Email Sent"
                : "Signed"}
            </td>
          </tr>
          {consentData?.consentSignTime !== null ? (
            <tr>
              <td width="40%">
                <b>Date and Time:</b>
              </td>

              <td width="60%">
                {consentData == null
                  ? "-"
                  : handleConsentDate(consentData?.consentSignTime)}
              </td>
            </tr>
          ) : null}
          <tr>
            <td width="40%">
              <b>IP:</b>
            </td>

            <td width="60%">
              {consentData?.consentFromIp == null
                ? "No Ip Found"
                : consentData?.consentFromIp}
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Table className="table-bordered mt-4">
        <tbody>
          <tr>
            <td width="40%">
              <b>PDF:</b>
            </td>

            <td width="60%">{studentProInfo?.email}</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
};

export default ApplicationStudentProfile;
