import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Row, TabContent, TabPane } from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import TestScoreForm from "./Components/TestScoreForm";
import TestScoreShowComponent from "./Components/TestScoreShowComponent";
import Loader from "../../Search/Loader/Loader";
import SubjectNavbar from "./Components/SubjectNavbar";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddUniversitySubjectTestScore = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { id, subjId } = useParams();
  const history = useHistory();
  const activetab = "3";
  const [ieltsReq4, setIeltsReq4] = useState(false);
  const [euIeltsReq4, setEuIeltsReq4] = useState(false);
  const [intIeltsReq4, setIntIeltsReq4] = useState(false);
  const [greRequired4, setGreRequired4] = useState(false);
  const [euGreRequired, setEuGreRequired] = useState(false);
  const [intGreRequired, setIntGreRequired] = useState(false);
  const [gmatRequired4, setGmatRequired4] = useState(false);
  const [euGmatRequired4, setEuGmatRequired4] = useState(false);
  const [intGmatRequired4, setIntGmatRequired4] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [ieltsScore4, setIeltsScore4] = useState(null);
  const [euIeltsScore4, setEuIeltsScore4] = useState(null);
  const [intIeltsScore4, setIntIeltsScore4] = useState(null);
  const [greScore4, setGreScore4] = useState(null);
  const [euGreScore4, setEuGreScore4] = useState(null);
  const [intGreScore4, setIntGreScore4] = useState(null);
  const [gmatScore4, setGmatScore4] = useState(null);
  const [euGmatScore4, setEuGmatScore4] = useState(null);
  const [intGmatScore4, setIntGmatScore4] = useState(null);
  const { addToast } = useToasts();
  const [otherData, setOtherData] = useState({});
  const [otherEuData, setOtherEuData] = useState({});
  const [otherIntData, setOtherIntData] = useState({});
  const [homeTestScore, setHomeTestScore] = useState(false);
  const [euTestScore, setEuTestScore] = useState(false);
  const [intTestScore, setIntTestScore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorIeltsHome, setErrorIeltsHome] = useState("");
  const [errorGreHome, setErrorGreHome] = useState("");
  const [errorGmatHome, setErrorGmatHome] = useState("");

  const [errorIeltsEu, setErrorIeltsEu] = useState("");
  const [errorGreEu, setErrorGreEu] = useState("");
  const [errorGmatEu, setErrorGmatEu] = useState("");

  const [errorIeltsInt, setErrorIeltsInt] = useState("");
  const [errorGreInt, setErrorGreInt] = useState("");
  const [errorGmatInt, setErrorGmatInt] = useState("");
  useEffect(() => {
    get(`SubjectTestScore/GetBySubject/${subjId}`).then((res) => {
      console.log("TestScore", res);
      setLoading(false);
      setHomeTestScore(res[0]?.testScore);
      setEuTestScore(res[1]?.testScore);
      setIntTestScore(res[2]?.testScore);

      setOtherData(res[0]);
      setOtherEuData(res[1]);
      setOtherIntData(res[2]);

      setGreRequired4(res[0]?.testScore?.isGreMandatory);
      setEuGreRequired(res[1]?.testScore?.isGreMandatory);
      setIntGreRequired(res[2]?.testScore?.isGreMandatory);

      setGmatRequired4(res[0]?.testScore?.isGmatMandatory);
      setEuGmatRequired4(res[1]?.testScore?.isGmatMandatory);
      setIntGmatRequired4(res[2]?.testScore?.isGmatMandatory);

      setIeltsReq4(res[0]?.testScore?.isIELTSMandatory);
      setEuIeltsReq4(res[1]?.testScore?.isIELTSMandatory);
      setIntIeltsReq4(res[2]?.testScore?.isIELTSMandatory);

      setIeltsScore4(res[0]?.testScore?.ieltSscore);
      setEuIeltsScore4(res[1]?.testScore?.ieltSscore);
      setIntIeltsScore4(res[2]?.testScore?.ieltSscore);

      setGreScore4(res[0]?.testScore?.greScore);
      setEuGreScore4(res[1]?.testScore?.greScore);
      setIntGreScore4(res[2]?.testScore?.greScore);

      setGmatScore4(res[0]?.testScore?.gmatScore);
      setEuGmatScore4(res[1]?.testScore?.gmatScore);
      setIntGmatScore4(res[2]?.testScore?.gmatScore);
    });
  }, [success, subjId]);

  const handleIeltsScore4 = (e) => {
    setIeltsScore4(e.target.value);
  };
  const handleEuIeltsScore4 = (e) => {
    setEuIeltsScore4(e.target.value);
  };
  const handleIntIeltsScore4 = (e) => {
    setIntIeltsScore4(e.target.value);
  };

  const handleGreScore4 = (e) => {
    setGreScore4(e.target.value);
  };
  const handleEuGreScore4 = (e) => {
    setEuGreScore4(e.target.value);
  };
  const handleIntGreScore4 = (e) => {
    setIntGreScore4(e.target.value);
  };

  const handleGmatScore4 = (e) => {
    setGmatScore4(e.target.value);
  };
  const handleEuGmatScore4 = (e) => {
    setEuGmatScore4(e.target.value);
  };
  const handleIntGmatScore4 = (e) => {
    setIntGmatScore4(e.target.value);
  };

  const handleIeltsReq4 = (e) => {
    setIeltsReq4(e.target.checked);

    errorIeltsHome !== "" &&
      setErrorIeltsHome(
        `IELTS ${!e.target.checked ? "Equivalent" : ""} score required`
      );

    // if (errorIeltsHome !== "") {
    //   if (e.target.checked === false) {
    //     setErrorIeltsHome("IELTS Equivalent score required");
    //   } else {
    //     setErrorIeltsHome("IELTS score required");
    //   }
    // }
  };
  const handleEuIeltsReq4 = (e) => {
    setEuIeltsReq4(e.target.checked);
    errorIeltsEu !== "" &&
      setErrorIeltsEu(
        `IELTS ${!e.target.checked ? "Equivalent" : ""} score required`
      );
  };
  const handleIntIeltsReq4 = (e) => {
    setIntIeltsReq4(e.target.checked);
    errorIeltsInt !== "" &&
      setErrorIeltsInt(
        `IELTS ${!e.target.checked ? "Equivalent" : ""} score required`
      );
  };

  const handleGreRequired4 = (e) => {
    setGreRequired4(e.target.checked);
    e.target.checked === false && setErrorGreHome("");
  };
  const handleEuGreRequired4 = (e) => {
    setEuGreRequired(e.target.checked);
    e.target.checked === false && setErrorGreEu("");
  };
  const handleIntGreRequired4 = (e) => {
    setIntGreRequired(e.target.checked);
    e.target.checked === false && setErrorGreInt("");
  };

  const handleGmatRequired4 = (e) => {
    setGmatRequired4(e.target.checked);
    e.target.checked === false && setErrorGmatHome("");
  };
  const handleEuGmatRequired4 = (e) => {
    setEuGmatRequired4(e.target.checked);
    e.target.checked === false && setErrorGmatEu("");
  };
  const handleIntGmatRequired4 = (e) => {
    setIntGmatRequired4(e.target.checked);
    e.target.checked === false && setErrorGmatInt("");
  };

  const ValidateFormHome = () => {
    var isValid = true;
    if (!ieltsScore4) {
      isValid = false;
      setErrorIeltsHome(
        `IELTS ${!ieltsReq4 ? "Equivalent" : ""} score required`
      );
    }

    if (greRequired4 && !greScore4) {
      isValid = false;
      setErrorGreHome("GRE score required");
    }
    if (gmatRequired4 && !gmatScore4) {
      isValid = false;
      setErrorGmatHome("GMAT score required");
    }

    return isValid;
  };

  const submitScore = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("isIELTSMandatory", ieltsReq4 ? true : false);
    subData.append("isGreMandatory", greRequired4 ? true : false);
    subData.append("isGmatMandatory", gmatRequired4 ? true : false);

    if (ValidateFormHome()) {
      if (otherData?.testScore?.id) {
        setProgress5(true);
        put(`SubjectTestScore/Update`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setProgress5(true);
        post(`SubjectTestScore/Create`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
            setProgress5(false);
          }
        });
      }
    }
  };

  const ValidateFormEu = () => {
    var isValid = true;
    if (!euIeltsScore4) {
      isValid = false;
      setErrorIeltsEu(
        `IELTS ${!euIeltsReq4 ? "Equivalent" : ""} score required`
      );
    }
    if (euGreRequired && !euGreScore4) {
      isValid = false;
      setErrorGreEu("GRE score required");
    }
    if (euGmatRequired4 && !euGmatScore4) {
      isValid = false;
      setErrorGmatEu("GMAT score required");
    }

    return isValid;
  };

  const submitEuScore = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("isIELTSMandatory", euIeltsReq4 ? true : false);
    subData.append("isGreMandatory", euGreRequired ? true : false);
    subData.append("isGmatMandatory", euGmatRequired4 ? true : false);

    if (ValidateFormEu()) {
      if (otherEuData?.testScore?.id) {
        setProgress5(true);
        put(`SubjectTestScore/Update`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm2(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setProgress5(true);
        post(`SubjectTestScore/Create`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm2(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
            setProgress5(false);
          }
        });
      }
    }
  };

  const goPrevious = () => {
    history.push(`/add-university-course-Fee/${id}/${subjId}`);
  };
  const goForward = () => {
    history.push(`/add-university-course-requirements/${id}/${subjId}`);
  };

  const ValidateFormInt = () => {
    var isValid = true;
    if (!intIeltsScore4) {
      isValid = false;
      setErrorIeltsInt(
        `IELTS ${!intIeltsReq4 ? "Equivalent" : ""} score required`
      );
    }
    if (intGreRequired && !intGreScore4) {
      isValid = false;
      setErrorGreInt("GRE score required");
    }
    if (intGmatRequired4 && !intGmatScore4) {
      isValid = false;
      setErrorGmatInt("GMAT score required");
    }

    return isValid;
  };

  const submitIntScore = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("isIELTSMandatory", intIeltsReq4 ? true : false);

    subData.append("isGreMandatory", intGreRequired ? true : false);
    subData.append("isGmatMandatory", intGmatRequired4 ? true : false);

    if (ValidateFormInt()) {
      if (otherIntData?.testScore?.id) {
        setProgress5(true);
        put(`SubjectTestScore/Update`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm3(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setProgress5(true);
        post(`SubjectTestScore/Create`, subData).then((res) => {
          setProgress5(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowForm3(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
            setProgress5(false);
          }
        });
      }
    }
  };
  return (
    <div>
      <SubjectNavbar
        title="Course Test Score"
        activeTab={activetab}
        id={id}
        subjId={subjId}
      />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="3">
                  <div>
                    <p className="section-title">
                      Test Score for Home Students
                    </p>
                    {homeTestScore === false ? (
                      <>
                        {permissions?.includes(
                          permissionList?.Edit_Subjects
                        ) && (
                          <>
                            {showForm === false ? (
                              <button
                                className="add-button"
                                onClick={() => setShowForm(!showForm)}
                                permission={6}
                              >
                                Add test score
                              </button>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {showForm === false ? (
                          <>
                            <div
                              className="hedding-titel d-flex justify-content-between"
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                            >
                              <TestScoreShowComponent
                                setShowForm={setShowForm}
                                showForm={showForm}
                                testScore={homeTestScore}
                                name={"Home"}
                              />
                              {permissions?.includes(
                                permissionList?.Edit_Subjects
                              ) && (
                                <span
                                  onClick={() => setShowForm(!showForm)}
                                  permission={6}
                                  style={{ cursor: "pointer" }}
                                >
                                  Edit
                                </span>
                              )}
                            </div>
                          </>
                        ) : null}
                      </>
                    )}

                    {showForm ? (
                      <>
                        <TestScoreForm
                          submitScore={submitScore}
                          subjId={subjId}
                          otherData={otherData}
                          handleIeltsReq4={handleIeltsReq4}
                          ieltsReq4={ieltsReq4}
                          handleIeltsScore4={handleIeltsScore4}
                          handleGreRequired4={handleGreRequired4}
                          greRequired4={greRequired4}
                          handleGreScore4={handleGreScore4}
                          handleGmatRequired4={handleGmatRequired4}
                          gmatRequired4={gmatRequired4}
                          handleGmatScore4={handleGmatScore4}
                          setShowForm={setShowForm}
                          progress5={progress5}
                          greScore4={greScore4}
                          gmatScore4={gmatScore4}
                          ieltsScore4={ieltsScore4}
                          applicationTypeId={1}
                          errorIelts={errorIeltsHome}
                          errorGre={errorGreHome}
                          errorGmat={errorGmatHome}
                          setErrorIelts={setErrorIeltsHome}
                          setErrorGre={setErrorGreHome}
                          setErrorGmat={setErrorGmatHome}
                        />
                      </>
                    ) : null}
                  </div>
                  {/* home test score ends here */}

                  {/* eu/uk test score starts here */}

                  <div className="my-5">
                    <p className="section-title">
                      Test Score for EU/UK Students
                    </p>
                    {euTestScore === false ? (
                      <>
                        {permissions?.includes(
                          permissionList?.Edit_Subjects
                        ) && (
                          <>
                            {showForm2 === false ? (
                              <button
                                onClick={() => setShowForm2(!showForm2)}
                                permission={6}
                                className="add-button"
                              >
                                Add test score
                              </button>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {showForm2 === false ? (
                          <>
                            <div
                              className="hedding-titel d-flex justify-content-between"
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                            >
                              <TestScoreShowComponent
                                setShowForm={setShowForm2}
                                showForm={showForm2}
                                testScore={euTestScore}
                                name={"EU/UK"}
                              />
                              {permissions?.includes(
                                permissionList?.Edit_Subjects
                              ) && (
                                <span
                                  onClick={() => setShowForm2(!showForm2)}
                                  permission={6}
                                  style={{ cursor: "pointer" }}
                                >
                                  Edit
                                </span>
                              )}
                            </div>
                          </>
                        ) : null}
                      </>
                    )}

                    {showForm2 ? (
                      <>
                        <TestScoreForm
                          submitScore={submitEuScore}
                          subjId={subjId}
                          otherData={otherEuData}
                          handleIeltsReq4={handleEuIeltsReq4}
                          ieltsReq4={euIeltsReq4}
                          handleIeltsScore4={handleEuIeltsScore4}
                          handleGreRequired4={handleEuGreRequired4}
                          greRequired4={euGreRequired}
                          handleGreScore4={handleEuGreScore4}
                          handleGmatRequired4={handleEuGmatRequired4}
                          gmatRequired4={euGmatRequired4}
                          handleGmatScore4={handleEuGmatScore4}
                          setShowForm={setShowForm2}
                          progress5={progress5}
                          greScore4={euGreScore4}
                          gmatScore4={euGmatScore4}
                          ieltsScore4={euIeltsScore4}
                          applicationTypeId={2}
                          errorIelts={errorIeltsEu}
                          errorGre={errorGreEu}
                          errorGmat={errorGmatEu}
                          setErrorIelts={setErrorIeltsEu}
                          setErrorGre={setErrorGreEu}
                          setErrorGmat={setErrorGmatEu}
                        />
                      </>
                    ) : null}
                  </div>
                  {/* eu/uk test score ends here */}

                  {/* int test score starts here */}
                  <div>
                    <p className="section-title">
                      Test Score for International Students
                    </p>
                    {intTestScore === false ? (
                      <>
                        {permissions?.includes(
                          permissionList?.Edit_Subjects
                        ) && (
                          <>
                            {showForm3 === false ? (
                              <button
                                onClick={() => setShowForm3(!showForm3)}
                                permission={6}
                                className="add-button"
                              >
                                Add test score
                              </button>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {showForm3 === false ? (
                          <>
                            <div
                              className="hedding-titel d-flex justify-content-between"
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                            >
                              <TestScoreShowComponent
                                setShowForm={setShowForm3}
                                showForm={showForm3}
                                testScore={intTestScore}
                                name={"International"}
                              />

                              {permissions?.includes(
                                permissionList?.Edit_Subjects
                              ) && (
                                <span
                                  onClick={() => setShowForm3(!showForm3)}
                                  permission={6}
                                  style={{ cursor: "pointer" }}
                                >
                                  Edit
                                </span>
                              )}
                            </div>
                          </>
                        ) : null}
                      </>
                    )}

                    {showForm3 ? (
                      <>
                        <TestScoreForm
                          submitScore={submitIntScore}
                          subjId={subjId}
                          otherData={otherIntData}
                          handleIeltsReq4={handleIntIeltsReq4}
                          ieltsReq4={intIeltsReq4}
                          handleIeltsScore4={handleIntIeltsScore4}
                          handleGreRequired4={handleIntGreRequired4}
                          greRequired4={intGreRequired}
                          handleGreScore4={handleIntGreScore4}
                          handleGmatRequired4={handleIntGmatRequired4}
                          gmatRequired4={intGmatRequired4}
                          handleGmatScore4={handleIntGmatScore4}
                          setShowForm={setShowForm3}
                          progress5={progress5}
                          greScore4={intGreScore4}
                          gmatScore4={intGmatScore4}
                          ieltsScore4={intIeltsScore4}
                          applicationTypeId={3}
                          errorIelts={errorIeltsInt}
                          errorGre={errorGreInt}
                          errorGmat={errorGmatInt}
                          setErrorIelts={setErrorIeltsInt}
                          setErrorGre={setErrorGreInt}
                          setErrorGmat={setErrorGmatInt}
                        />
                      </>
                    ) : null}
                  </div>
                  {/* int test score ends here */}
                  <Row className="mt-4 text-center">
                    <Col>
                      <PreviousButton action={goPrevious} />
                      <SaveButton text="Next" action={goForward} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddUniversitySubjectTestScore;
