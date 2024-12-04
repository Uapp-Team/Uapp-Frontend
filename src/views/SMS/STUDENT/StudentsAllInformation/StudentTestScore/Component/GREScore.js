import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import icon_gmt from "../../../../../../assets/img/icons/icon-gmt.png";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import put from "../../../../../../helpers/put";
import remove from "../../../../../../helpers/remove";

import moment from "moment";
import { useHistory } from "react-router-dom";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import DMYPicker from "../../../../../../components/form/DMYPicker";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
export default function GREScore({ applicationStudentId }) {
  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const [openGreDeleteModal, setOpenGreDeleteModal] = useState(false);
  const [gmatDeleteModal, openGmatDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [showGreForm, setShowGreForm] = useState(false);
  const [showGmatForm, setShowGmatForm] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [greVerbal, setGreVerbal] = useState(0);
  const [greVerbalError, setGreVerbalError] = useState(false);
  const [greVerbalRank, setGreVerbalRank] = useState(0);
  const [greVerbalRankError, setGreVerbalRankError] = useState(false);

  const [greQuantitative, setGreQuantitative] = useState(0);
  const [greQuantitativeError, setGreQuantitativeError] = useState(false);
  const [greQuantitativeRank, setGreQuantitativeRank] = useState(0);
  const [greQuantitativeRankError, setGreQuantitativeRankError] =
    useState(false);

  const [GreTotalScore, setGreTotalScore] = useState(0);
  const [GreTotalScoreError, setGreTotalScoreError] = useState(false);
  const [GreTotalScoreRank, setGreTotalScoreRank] = useState(0);
  const [GreTotalScoreRankError, setGreTotalScoreRankError] = useState(false);

  const [greWriting, setGreWriting] = useState(0);
  const [greWritingError, setGreWritingError] = useState(false);
  const [greWritingRank, setGreWritingRank] = useState(0);
  const [greWritingRankError, setGreWritingRankError] = useState(false);

  const [greExamDate, setGreExamDate] = useState(null);
  const [greExamDateError, setGreExamDateError] = useState("");
  ////////////////////////////
  const [GmatTotalScore, setGmatTotalScore] = useState(0);
  const [GmatTotalScoreError, setGmatTotalScoreError] = useState(false);
  const [GmatTotalScoreRank, setGmatTotalScoreRank] = useState(0);
  const [GmatTotalScoreRankError, setGmatTotalScoreRankError] = useState(false);

  const [GmatVerbal, setGmatVerbal] = useState(0);
  const [GmatVerbalError, setGmatVerbalError] = useState(false);
  const [GmatVerbalRank, setGmatVerbalRank] = useState(0);
  const [GmatVerbalRankError, setGmatVerbalRankError] = useState(false);

  const [GmatQuantitative, setGmatQuantitative] = useState(0);
  const [GmatQuantitativeError, setGmatQuantitativeError] = useState(false);
  const [GmatQuantitativeRank, setGmatQuantitativeRank] = useState(0);
  const [GmatQuantitativeRankError, setGmatQuantitativeRankError] =
    useState(false);

  const [GmatWriting, setGmatWriting] = useState(0);
  const [GmatWritingError, setGmatWritingError] = useState(false);
  const [GmatWritingRank, setGmatWritingRank] = useState(0);
  const [GmatWritingRankError, setGmatWritingRankError] = useState(false);

  const [GmatExamDate, setGmatExamDate] = useState(null);
  const [GmatExamDateError, setGmatExamDateError] = useState("");
  ////////////////////////////
  const [nav, setNav] = useState({});

  const handleForward = () => {
    history.push(`/addExperience/${applicationStudentId}/${1}`);
  };

  const goBackward = () => {
    history.push(`/addStudentEducationalInformation/${applicationStudentId}`);
  };
  useEffect(() => {
    const fetchApplicationStudent = async () => {
      try {
        const navigation = await get(
          `StudentNavbar/Get/${applicationStudentId}`
        );
        setNav(navigation);
        get(`GreScore/GetbyStudent/${applicationStudentId}`).then((res) => {
          setGreData(res);
          setGreTotalScore(res?.totalScore ? res?.totalScore : 0);
          setGreTotalScoreRank(res?.totalRank ? res?.totalRank : 0);
          setGreVerbal(res?.verbalScore ? res?.verbalScore : 0);
          setGreVerbalRank(res?.verbalRank ? res?.verbalRank : 0);
          setGreQuantitative(
            res?.quantitativeScore ? res?.quantitativeScore : 0
          );
          setGreQuantitativeRank(
            res?.quantitativeRank ? res?.quantitativeRank : 0
          );
          setGreWriting(res?.writingScore ? res?.writingScore : 0);
          setGreWritingRank(res?.writingRank ? res?.writingRank : 0);
          setGreExamDate(res?.greExamDate);
        });

        get(`GmatScore/GetByStudent/${applicationStudentId}`).then((res) => {
          setGmatData(res);
          setGmatTotalScore(res?.totalScore ? res?.totalScore : 0);
          setGmatTotalScoreRank(res?.totalRank ? res?.totalRank : 0);
          setGmatVerbal(res?.verbalScore ? res?.verbalScore : 0);
          setGmatVerbalRank(res?.verbalRank ? res?.verbalRank : 0);
          setGmatQuantitative(
            res?.quantitativeScore ? res?.quantitativeScore : 0
          );
          setGmatQuantitativeRank(
            res?.quantitativeRank ? res?.quantitativeRank : 0
          );
          setGmatWriting(res?.writingScore ? res?.writingScore : 0);
          setGmatWritingRank(res?.writingRank ? res?.writingRank : 0);
          setGmatExamDate(res?.gmatExamDate);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicationStudent();
  }, [success, applicationStudentId]);

  const handleDeleteGreData = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`GreScore/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setOpenGreDeleteModal(false);
      setSuccess(!success);
      setGreData({});
      setGreVerbal(0);
      setGreVerbalError(false);
      setGreVerbalRank(0);
      setGreVerbalRankError(false);
      setGreQuantitative(0);
      setGreQuantitativeError(false);
      setGreQuantitativeRank(0);
      setGreQuantitativeRankError(false);
      setGreWriting(0);
      setGreWritingError(false);
      setGreWritingRank(0);
      setGreWritingRankError(false);
      setGreExamDate(null);
      setGreExamDateError("");
    });
  };

  const handleGreVerbal = (e) => {
    setGreVerbal(e.target.value);
    if (e.target.value > 170 || e.target.value === "") {
      setGreVerbalError(true);
    } else {
      setGreVerbalError(false);
    }
  };

  const handleGreVerbalRank = (e) => {
    setGreVerbalRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGreVerbalRankError(true);
    } else {
      setGreVerbalRankError(false);
    }
  };

  const handleGreQuantitative = (e) => {
    setGreQuantitative(e.target.value);
    if (e.target.value > 170 || e.target.value === "") {
      setGreQuantitativeError(true);
    } else {
      setGreQuantitativeError(false);
    }
  };

  const handleGreQuantitativeRank = (e) => {
    setGreQuantitativeRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGreQuantitativeRankError(true);
    } else {
      setGreQuantitativeRankError(false);
    }
  };

  const handleGreWriting = (e) => {
    setGreWriting(e.target.value);
    if (e.target.value > 6 || e.target.value === "") {
      setGreWritingError(true);
    } else {
      setGreWritingError(false);
    }
  };

  const handleGreWritingRank = (e) => {
    setGreWritingRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGreWritingRankError(true);
    } else {
      setGreWritingRankError(false);
    }
  };

  const handleGreTotalScore = (e) => {
    setGreTotalScore(e.target.value);
    if (e.target.value > 800 || e.target.value < 200 || e.target.value === "") {
      setGreTotalScoreError(true);
    } else {
      setGreTotalScoreError(false);
    }
  };

  const handleGreTotalScoreRank = (e) => {
    setGreTotalScoreRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGreTotalScoreRankError(true);
    } else {
      setGreTotalScoreRankError(false);
    }
  };

  const handleGreExamDate = (e) => {
    if (e) {
      setGreExamDate(e);
    } else {
      setGreExamDateError("Exam Date Is Required");
    }
  };

  const closeModalGre = () => {
    setShowGreForm(false);
    setSuccess(!success);
    setGreVerbal(0);
    setGreVerbalError(false);
    setGreVerbalRank(0);
    setGreVerbalRankError(false);
    setGreQuantitative(0);
    setGreQuantitativeError(false);
    setGreQuantitativeRank(0);
    setGreQuantitativeRankError(false);
    setGreWriting(0);
    setGreWritingError(false);
    setGreWritingRank(0);
    setGreWritingRankError(false);
    setGreExamDate(null);
    setGreExamDateError("");
  };

  const FormGreValid = () => {
    var validation = true;

    if (greVerbal === "" || greVerbal < 0 || greVerbal > 170) {
      validation = false;
      setGreVerbalError(true);
    }

    if (greVerbalRank === "" || greVerbalRank < 0 || greVerbalRank > 100) {
      validation = false;
      setGreVerbalRankError(true);
    }
    if (
      greQuantitative === "" ||
      greQuantitative < 0 ||
      greQuantitative > 170
    ) {
      validation = false;
      setGreQuantitativeError(true);
    }
    if (
      greQuantitativeRank === "" ||
      greQuantitativeRank < 0 ||
      greQuantitativeRank > 100
    ) {
      validation = false;
      setGreQuantitativeRankError(true);
    }

    if (greExamDate == null) {
      validation = false;
      setGreExamDateError("Exam Date Is Required");
    }

    if (greWriting === "" || greWriting < 0 || greWriting > 6) {
      validation = false;
      setGreWritingError(true);
    }
    if (greWritingRank === "" || greWritingRank < 0 || greWritingRank > 100) {
      validation = false;
      setGreWritingRankError(true);
    }

    return validation;
  };

  const handleSaveGreData = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    var gredataobject = {};
    subData.forEach(function (value, key) {
      gredataobject[key] = value;
    });
    const isValid = FormGreValid();

    if (isValid === true) {
      if (greData?.id) {
        setButtonStatus(true);
        setProgress(true);
        put(`GreScore/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoComplete: true,
            });
            setSuccess(!success);
            setShowGreForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`GreScore/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoComplete: true,
            });
            setSuccess(!success);
            setShowGreForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  // GMAT data update
  const handleGmatTotalScore = (e) => {
    setGmatTotalScore(e.target.value);
    if (e.target.value > 800 || e.target.value < 200 || e.target.value === "") {
      setGmatTotalScoreError(true);
    } else {
      setGmatTotalScoreError(false);
    }
  };

  const handleGmatTotalScoreRank = (e) => {
    setGmatTotalScoreRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGmatTotalScoreRankError(true);
    } else {
      setGmatTotalScoreRankError(false);
    }
  };

  const handleGmatVerbal = (e) => {
    setGmatVerbal(e.target.value);
    if (e.target.value > 60 || e.target.value === "") {
      setGmatVerbalError(true);
    } else {
      setGmatVerbalError(false);
    }
  };

  const handleGmatVerbalRank = (e) => {
    setGmatVerbalRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGmatVerbalRankError(true);
    } else {
      setGmatVerbalRankError(false);
    }
  };

  const handleGmatQuantitative = (e) => {
    setGmatQuantitative(e.target.value);
    if (e.target.value > 60 || e.target.value === "") {
      setGmatQuantitativeError(true);
    } else {
      setGmatQuantitativeError(false);
    }
  };

  const handleGmatQuantitativeRank = (e) => {
    setGmatQuantitativeRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGmatQuantitativeRankError(true);
    } else {
      setGmatQuantitativeRankError(false);
    }
  };

  const handleGmatWriting = (e) => {
    setGmatWriting(e.target.value);
    if (e.target.value > 6 || e.target.value === "") {
      setGmatWritingError(true);
    } else {
      setGmatWritingError(false);
    }
  };
  const handleGmatWritingRank = (e) => {
    setGmatWritingRank(e.target.value);
    if (e.target.value > 100 || e.target.value === "") {
      setGmatWritingRankError(true);
    } else {
      setGmatWritingRankError(false);
    }
  };

  const handleGmatExamDate = (e) => {
    if (e) {
      setGmatExamDate(e);
    } else {
      setGmatExamDateError("Exam Date Is Required");
    }
  };

  const FormGmatValid = () => {
    var validation = true;

    if (GmatTotalScore > 800 || GmatTotalScore < 200 || GmatTotalScore === "") {
      validation = false;
      setGmatTotalScoreError(true);
    }

    if (
      GmatTotalScoreRank === "" ||
      GmatTotalScoreRank < 0 ||
      GmatTotalScoreRank > 100
    ) {
      validation = false;
      setGmatTotalScoreRankError(true);
    }

    if (GmatVerbal === "" || GmatVerbal < 0 || GmatVerbal > 60) {
      validation = false;
      setGmatVerbalError(true);
    }

    if (GmatVerbalRank === "" || GmatVerbalRank < 0 || GmatVerbalRank > 100) {
      validation = false;
      setGmatVerbalRankError(true);
    }

    if (
      GmatQuantitative === "" ||
      GmatQuantitative < 0 ||
      GmatQuantitative > 60
    ) {
      validation = false;
      setGmatQuantitativeError(true);
    }
    if (
      GmatQuantitativeRank === "" ||
      GmatQuantitativeRank < 0 ||
      GmatQuantitativeRank > 100
    ) {
      validation = false;
      setGmatQuantitativeRankError(true);
    }

    if (GmatExamDate == null) {
      validation = false;
      setGmatExamDateError("Exam Date Is Required");
    }

    if (GmatWriting === "" || GmatWriting < 0 || GmatWriting > 6) {
      validation = false;
      setGmatWritingError(true);
    }
    if (
      GmatWritingRank === "" ||
      GmatWritingRank < 0 ||
      GmatWritingRank > 100
    ) {
      validation = false;
      setGmatWritingRankError(true);
    }

    return validation;
  };

  const closeModalGmat = () => {
    setShowGmatForm(false);
    setSuccess(!success);
    setGmatTotalScore(0);
    setGmatTotalScoreError(false);
    setGmatTotalScoreRank(0);
    setGmatTotalScoreRankError(false);
    setGmatVerbal(0);
    setGmatVerbalError(false);
    setGmatVerbalRank(0);
    setGmatVerbalRankError(false);
    setGmatQuantitative(0);
    setGmatQuantitativeError(false);
    setGmatQuantitativeRank(0);
    setGmatQuantitativeRankError(false);
    setGmatWriting(0);
    setGmatWritingError(false);
    setGmatWritingRank(0);
    setGmatWritingRankError(false);
    setGmatExamDate(null);
    setGmatExamDateError("");
  };

  const handleSubmitUpdateGmat = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    const isValid = FormGmatValid();

    if (GmatExamDate) {
      subData.append("gmatExamDate", GmatExamDate);
    }
    if (isValid === true) {
      if (gmatData?.id) {
        setButtonStatus(true);
        setProgress(true);
        put(`GmatScore/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoComplete: true,
            });
            setSuccess(!success);
            setShowGmatForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`GmatScore/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoComplete: true,
            });
            setSuccess(!success);
            setShowGmatForm(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleDeleteGmatData = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`GmatScore/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setShowGmatForm(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      openGmatDeleteModal(false);
      setSuccess(!success);
      setGmatData({});
      setGmatTotalScore(0);
      setGmatTotalScoreError(false);
      setGmatTotalScoreRank(0);
      setGmatTotalScoreRankError(false);
      setGmatVerbal(0);
      setGmatVerbalError(false);
      setGmatVerbalRank(0);
      setGmatVerbalRankError(false);
      setGmatQuantitative(0);
      setGmatQuantitativeError(false);
      setGmatQuantitativeRank(0);
      setGmatQuantitativeRankError(false);
      setGmatWriting(0);
      setGmatWritingError(false);
      setGmatWritingRank(0);
      setGmatWritingRankError(false);
      setGmatExamDate(null);
      setGmatExamDateError("");
    });
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const greDeleteModalOpen = () => {
    setOpenGreDeleteModal(true);
    setShowGreForm(false);
  };

  const gmatDeleteModalOpen = () => {
    openGmatDeleteModal(true);
  };

  return (
    <>
      <section id="root">
        <p className="section-title">GRE & GMAT Score</p>
        <div className="mt-3">
          {greData !== null ? (
            <div className="col-12 border p-2 rounded">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="bank-account-info-text">
                        Exam Date:{" "}
                        {greExamDate
                          ? moment(greExamDate).format("DD-MM-YYYY")
                          : "N/A"}
                      </span>
                      <h5 className="card-heading">GRE Result</h5>
                    </div>

                    <span>
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowGreForm(!showGreForm)}
                        >
                          Edit
                        </span>
                      ) : null}{" "}
                      |{" "}
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={greDeleteModalOpen}
                        >
                          Delete
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <hr />
                  <Row className="text-gray">
                    <Col lg="3">
                      <p>
                        <span> Quantitative Score</span>
                        <br />
                        <b> {greData?.quantitativeScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span>Quantitative Rank</span>
                        <br />
                        <b> {greData?.quantitativeRank}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span>Verbal Score</span>
                        <br />
                        <b> {greData?.verbalScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Verbal Rank</span>
                        <br />
                        <b>{greData?.verbalRank}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row className="text-gray">
                    <Col lg="3">
                      <p>
                        <span> Writing Score</span>
                        <br />
                        <b>{greData?.writingScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Writing Rank</span>
                        <br />
                        <b> {greData?.writingRank}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Total Score</span>
                        <br />
                        <b>{greData?.totalScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Total Rank </span>
                        <br />
                        <b>{greData?.totalRank}</b>
                      </p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <ConfirmModal
                text="Do You Want To Delete GRE RESULT?"
                isOpen={openGreDeleteModal}
                toggle={() => setOpenGreDeleteModal(!openGreDeleteModal)}
                className="uapp-modal"
                confirm={() => handleDeleteGreData(greData)}
                buttonStatus={buttonStatus}
                progress={progress}
                cancel={() => setOpenGreDeleteModal(false)}
              />
            </div>
          ) : (
            <>
              <div className="mt-1 mb-4 d-flex justify-between">
                <img style={{ height: "100%" }} src={icon_gmt} alt="" />{" "}
                <div className="pl-3">
                  <span>
                    GRE Information Not Found.Please Add GRE Information.
                  </span>
                </div>
              </div>
              {permissions?.includes(permissionList?.Edit_Student) ? (
                <button
                  className="add-button"
                  icon={<i className="fas fa-plus"></i>}
                  onClick={() => setShowGreForm(!showGreForm)}
                >
                  Add GRE Score
                </button>
              ) : null}
            </>
          )}
          <div className="mt-5">
            {showGreForm ? (
              <>
                {greData ? (
                  <p className="section-title">Update GRE Result</p>
                ) : (
                  <p className="section-title"> Add GRE Result</p>
                )}

                <Form onSubmit={handleSaveGreData}>
                  <Input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={applicationStudentId}
                  />

                  {greData?.id ? (
                    <Input
                      type="hidden"
                      name="id"
                      id="id"
                      value={greData?.id}
                    />
                  ) : null}

                  <input
                    type="hidden"
                    name="haveGreExam"
                    id="haveGreExam"
                    checked={true}
                  />

                  <Row>
                    <Col lg="6" md="8">
                      <FormGroup className="has-icon-left position-relative">
                        <DMYPicker
                          label="GRE Exam Date"
                          value={greExamDate}
                          setValue={handleGreExamDate}
                          error={greExamDateError}
                          action={setGreExamDateError}
                          required={true}
                        />
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Total Score <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="number"
                          id="totalScore"
                          name="totalScore"
                          onChange={(e) => {
                            handleGreTotalScore(e);
                          }}
                          defaultValue={GreTotalScore}
                        />
                        <span className="text-danger">
                          {GreTotalScoreError && (
                            <span className="text-danger">
                              Enter a valid score from 200 to 800.
                            </span>
                          )}
                        </span>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Total Rank <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="number"
                          id="totalRank"
                          name="totalRank"
                          onChange={(e) => {
                            handleGreTotalScoreRank(e);
                          }}
                          defaultValue={GreTotalScoreRank}
                        />
                        <span className="text-danger">
                          {GreTotalScoreRankError && (
                            <span className="text-danger">
                              Enter a valid percentile ranking.
                            </span>
                          )}
                        </span>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Verbal <span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="verbalScore"
                              name="verbalScore"
                              onChange={(e) => {
                                handleGreVerbal(e);
                              }}
                              defaultValue={greVerbal}
                            />
                            <span className="text-danger">
                              {greVerbalError && (
                                <span className="text-danger">
                                  Enter a valid score from 0 to 170.
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="verbalRank"
                              name="verbalRank"
                              min="0"
                              onChange={(e) => {
                                handleGreVerbalRank(e);
                              }}
                              defaultValue={greVerbalRank}
                            />
                            <span className="text-danger">
                              {greVerbalRankError && (
                                <span className="text-danger">
                                  Enter a valid percentile ranking
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Quantitative <span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="quantitativeScore"
                              name="quantitativeScore"
                              onChange={(e) => {
                                handleGreQuantitative(e);
                              }}
                              defaultValue={greQuantitative}
                            />
                            <span className="text-danger">
                              {greQuantitativeError && (
                                <span className="text-danger">
                                  Enter a valid score from 0 to 170.
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="quantitativeRank"
                              name="quantitativeRank"
                              step="any"
                              onChange={(e) => {
                                handleGreQuantitativeRank(e);
                              }}
                              defaultValue={greQuantitativeRank}
                            />
                            <span className="text-danger">
                              {greQuantitativeRankError && (
                                <span className="text-danger">
                                  Enter a valid percentile ranking
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Writing<span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="writingScore"
                              name="writingScore"
                              onChange={(e) => {
                                handleGreWriting(e);
                              }}
                              defaultValue={greWriting}
                            />
                            <span className="text-danger">
                              {greWritingError && (
                                <span className="text-danger">
                                  Enter a valid score from 1 to 6.
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="writingRank"
                              name="writingRank"
                              onChange={(e) => {
                                handleGreWritingRank(e);
                              }}
                              defaultValue={greWritingRank}
                            />
                            <span className="text-danger">
                              {greWritingRankError && (
                                <span className="text-danger">
                                  Enter a valid percentile ranking
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="text-right">
                        <CancelButton cancel={closeModalGre} />
                        <SaveButton
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-3">
          {gmatData !== null ? (
            <div className="col-12 border p-2 rounded">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="bank-account-info-text">
                        Exam Date:{" "}
                        {GmatExamDate
                          ? moment(GmatExamDate).format("DD-MM-YYYY")
                          : "N/A"}
                      </span>
                      <h5 className="card-heading">GMAT Result</h5>
                    </div>

                    <span>
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowGmatForm(!showGmatForm)}
                        >
                          Edit
                        </span>
                      ) : null}{" "}
                      |{" "}
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={gmatDeleteModalOpen}
                        >
                          Delete
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <hr />
                  <Row className="text-gray">
                    <Col lg="3">
                      <p>
                        <span> Quantitative Score</span>
                        <br />
                        <b> {gmatData?.quantitativeScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span>Quantitative Rank</span>
                        <br />
                        <b> {gmatData?.quantitativeRank}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span>Verbal Score</span>
                        <br />
                        <b> {gmatData?.verbalScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Verbal Rank</span>
                        <br />
                        <b>{gmatData?.verbalRank}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row className="text-gray">
                    <Col lg="3">
                      <p>
                        <span> Writing Score</span>
                        <br />
                        <b> {gmatData?.writingScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Writing Rank</span>
                        <br />
                        <b>{gmatData?.writingRank}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Total Score</span>
                        <br />
                        <b>{gmatData?.totalScore}</b>
                      </p>
                    </Col>
                    <Col lg="3">
                      <p>
                        <span> Total Rank </span>
                        <br />
                        <b>{gmatData?.totalRank}</b>
                      </p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <ConfirmModal
                text="Do You Want To Delete GMAT RESULT?"
                isOpen={gmatDeleteModal}
                toggle={() => openGmatDeleteModal(!gmatDeleteModal)}
                buttonStatus={buttonStatus}
                progress={progress}
                confirm={() => handleDeleteGmatData(gmatData)}
                cancel={() => openGmatDeleteModal(false)}
              />
            </div>
          ) : (
            <>
              <div className="mt-5 mb-4 d-flex justify-between">
                <img style={{ height: "100%" }} src={icon_gmt} alt="" />{" "}
                <div className="pl-3">
                  <span>
                    GMAT Information Not Found.Please Add GMAT Information.
                  </span>
                </div>
              </div>
              {permissions?.includes(permissionList?.Edit_Student) ? (
                <button
                  className="add-button"
                  icon={<i className="fas fa-plus"></i>}
                  onClick={() => setShowGmatForm(!showGmatForm)}
                >
                  Add GMAT Score
                </button>
              ) : null}
            </>
          )}
          <div className="mt-5">
            {showGmatForm ? (
              <>
                {gmatData ? (
                  <p className="section-title">Update GMAT Result</p>
                ) : (
                  <p className="section-title"> Add GMAT Result</p>
                )}

                <Form onSubmit={handleSubmitUpdateGmat}>
                  <Input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={applicationStudentId}
                  />

                  {gmatData?.id ? (
                    <Input
                      type="hidden"
                      name="id"
                      id="id"
                      value={gmatData?.id}
                    />
                  ) : null}

                  <Row>
                    <Col lg="6" md="8">
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Input
                          type="hidden"
                          name="haveGmatExam"
                          id="haveGmatExam"
                          value={true}
                        />
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <DMYPicker
                          setValue={handleGmatExamDate}
                          label="GMAT Exam Date"
                          value={GmatExamDate}
                          error={GmatExamDateError}
                          action={setGmatExamDateError}
                          required={true}
                        />
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Total Score <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="number"
                          id="totalScore"
                          name="totalScore"
                          onChange={(e) => {
                            handleGmatTotalScore(e);
                          }}
                          defaultValue={GmatTotalScore}
                        />
                        <span className="text-danger">
                          {GmatTotalScoreError && (
                            <span className="text-danger">
                              Enter a valid score from 200 to 800.
                            </span>
                          )}
                        </span>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Total Rank <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="number"
                          id="totalRank"
                          name="totalRank"
                          onChange={(e) => {
                            handleGmatTotalScoreRank(e);
                          }}
                          defaultValue={GmatTotalScoreRank}
                        />
                        <span className="text-danger">
                          {GmatTotalScoreRankError && (
                            <span className="text-danger">
                              Enter a valid percentile ranking.
                            </span>
                          )}
                        </span>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Verbal <span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="verbalScore"
                              name="verbalScore"
                              onChange={(e) => {
                                handleGmatVerbal(e);
                              }}
                              defaultValue={GmatVerbal}
                            />
                            {GmatVerbalError && (
                              <span className="text-danger">
                                Enter a valid score from 0 to 60.
                              </span>
                            )}
                          </div>
                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="verbalRank"
                              name="verbalRank"
                              onChange={(e) => {
                                handleGmatVerbalRank(e);
                              }}
                              defaultValue={GmatVerbalRank}
                            />
                            {GmatVerbalRankError && (
                              <span className="text-danger">
                                Enter a valid percentile ranking.
                              </span>
                            )}
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Quantitative <span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="quantitativeScore"
                              name="quantitativeScore"
                              onChange={(e) => {
                                handleGmatQuantitative(e);
                              }}
                              defaultValue={GmatQuantitative}
                            />
                            {GmatQuantitativeError && (
                              <span className="text-danger">
                                Enter a valid score from 0 to 60.
                              </span>
                            )}
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="quantitativeRank"
                              name="quantitativeRank"
                              onChange={(e) => {
                                handleGmatQuantitativeRank(e);
                              }}
                              defaultValue={GmatQuantitativeRank}
                            />
                            {GmatQuantitativeRankError && (
                              <span className="text-danger">
                                Enter a valid percentile ranking.
                              </span>
                            )}
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Writing<span className="text-danger">*</span>{" "}
                        </span>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <p className="text-center">Score</p>
                            <Input
                              type="number"
                              id="writingScore"
                              name="writingScore"
                              onChange={(e) => {
                                handleGmatWriting(e);
                              }}
                              defaultValue={GmatWriting}
                            />
                            {GmatWritingError && (
                              <span className="text-danger">
                                Enter a valid score from 0 to 6.
                              </span>
                            )}
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="writingRank"
                              name="writingRank"
                              onChange={(e) => {
                                handleGmatWritingRank(e);
                              }}
                              defaultValue={GmatWritingRank}
                            />
                            {GmatWritingRankError && (
                              <span className="text-danger">
                                Enter a valid percentile ranking.
                              </span>
                            )}
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="text-right">
                        <CancelButton cancel={closeModalGmat} />
                        <SaveButton
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : null}
          </div>
        </div>
      </section>
      {/* <FormGroup
        className="has-icon-left position-relative"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <ButtonForFunction
          name={"Previous"}
          icon={<i className="fas fa-arrow-left-long mr-1"></i>}
          func={goBackward}
          className={"ms-md-2 mt-3 btn-warning"}
        />

        <Button.Ripple
          type="submit"
          className="mr-1 mt-3 btn-warning"
          onClick={handleForward}
        >
          Next
          <i className="fas fa-arrow-right-long ml-1"></i>
        </Button.Ripple>
      </FormGroup> */}
      <Row>
        <Col className="d-flex justify-content-between mt-4">
          <PreviousButton action={goBackward} />
          {nav?.experience && <SaveButton text="Next" action={handleForward} />}
        </Col>
      </Row>
    </>
  );
}
