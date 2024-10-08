import React, { useEffect, useState } from "react";
import icon_gmt from "../../../../../../assets/img/icons/icon-gmt.png";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  Row,
} from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import remove from "../../../../../../helpers/remove";
import put from "../../../../../../helpers/put";
import ButtonLoader from "../../../../Components/ButtonLoader";
import moment from "moment";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router-dom";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
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

  //const [greExamErrorMessage, setGreExamErrorMessage] = useState('');
  //const [grequantitativeRankErrorMessage, setGrequantitativeRankErrorMessage] = useState('');
  //const [grequantitativeScoreErrorMessage, setGreQuantitativeScoreErrorMessage] = useState('');
  //const [greverbalRankErrorMessage, setGreVerbalRankErrorMessage] = useState('');
  //const [greverbalScoreErrorMessage, setGreVerbalScoreErrorMessage] = useState('');
  //const [grewritingRankErrorMessage, setGreWritingRankErrorMessage] = useState('');
  //const [grewritingScoreErrorMessage, setGreWritingScoreErrorMessage] = useState('');
  const handleForward = () => {
    history.push(`/addExperience/${applicationStudentId}/${1}`);
  };

  const goBackward = () => {
    history.push(`/addStudentEducationalInformation/${applicationStudentId}`);
  };

  useEffect(() => {
    get(`GreScore/GetbyStudent/${applicationStudentId}`).then((res) => {
      setGreData(res);
    });
    get(`GmatScore/GetByStudent/${applicationStudentId}`).then((res) => {
      setGmatData(res);
    });
  });

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
    });
  };
  //const validateGreForm = (greobject) => {
  //  var isValid = true;
  //  if (greobject.greExamDate === '') {
  //    isValid = false;
  //    setGreExamErrorMessage("Exam date is required");
  //  }
  //  if (greobject.quantitativeRank === '') {
  //    isValid = false;
  //    setGrequantitativeRankErrorMessage("Quantitive rank is quired");
  //  }
  //  if (greobject.quantitativeRank === '') {
  //    isValid = false;
  //    setGreQuantitativeScoreErrorMessage("Quantitive score is quired");
  //  }
  //  return isValid;
  //}

  const handleSaveGreData = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    var gredataobject = {};
    subData.forEach(function (value, key) {
      gredataobject[key] = value;
    });
    console.log(gredataobject, "Data object");
    //var isFromValid = validateGreForm(gredataobject);
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
  };

  // GMAT data update

  const handleSubmitUpdateGmat = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    // for (var x of subData.values()) {
    // }

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
                        Exam Date: {handleDate(greData?.greExamDate)}
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
                    <Col lg="3"></Col>
                    <Col lg="3"></Col>
                  </Row>
                </CardBody>

                <ConfirmModal
                  text="Do You Want To Delete GRE RESULT?"
                  isOpen={openGreDeleteModal}
                  toggle={() => setOpenGreDeleteModal(!openGreDeleteModal)}
                  className="uapp-modal"
                  confirm={() => handleDeleteGreData(greData)}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  cancel={() => setOpenGreDeleteModal(false)}
                ></ConfirmModal>
              </Card>
            </div>
          ) : (
            <>
              <div className="mt-1 mb-4 d-flex justify-between">
                <img style={{ height: "100%" }} src={icon_gmt} alt="" />{" "}
                <div className="pl-3">
                  <span>GRE Information Not Found. Add Gre Information.</span>
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
                        <span>
                          GRE Exam Date <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="date"
                          id="greExamDate"
                          required
                          name="greExamDate"
                          defaultValue={moment(
                            new Date(greData?.greExamDate)
                          ).format("YYYY-MM-DD")}
                        />
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
                              min="100"
                              max="300"
                              required
                              defaultValue={greData?.verbalScore}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="verbalRank"
                              name="verbalRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={greData?.verbalRank}
                            />
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
                              required
                              min="100"
                              max="300"
                              defaultValue={greData?.quantitativeScore}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="quantitativeRank"
                              name="quantitativeRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={greData?.quantitativeRank}
                            />
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
                              required
                              min="100"
                              max="300"
                              defaultValue={greData?.writingScore}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="writingRank"
                              name="writingRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={greData?.writingRank}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="text-right">
                        <CancelButton
                          cancel={() => setShowGreForm(!showGreForm)}
                        />
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
                        Exam Date: {handleDate(gmatData?.gmatExamDate)}
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

                <ConfirmModal
                  text="Do You Want To Delete GMAT RESULT?"
                  isOpen={gmatDeleteModal}
                  toggle={() => openGmatDeleteModal(!gmatDeleteModal)}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  confirm={() => handleDeleteGmatData(gmatData)}
                  cancel={() => openGmatDeleteModal(false)}
                ></ConfirmModal>
              </Card>
            </div>
          ) : (
            <>
              <div className="mt-5 mb-4 d-flex justify-between">
                <img style={{ height: "100%" }} src={icon_gmt} alt="" />{" "}
                <div className="pl-3">
                  <span>GMAT Information Not Found. Add GMAT Information.</span>
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
                        <span>
                          GMAT Exam Date <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="date"
                          required
                          id="gmatExamDate"
                          name="gmatExamDate"
                          defaultValue={moment(
                            new Date(gmatData?.gmatExamDate)
                          ).format("YYYY-MM-DD")}
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
                          required
                          min="100"
                          max="300"
                          defaultValue={gmatData?.totalScore}
                        />
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Total Rank <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="number"
                          id="totalRank"
                          name="totalRank"
                          required
                          min="100"
                          max="300"
                          defaultValue={gmatData?.totalRank}
                        />
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
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.verbalScore}
                            />
                          </div>
                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="verbalRank"
                              name="verbalRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.verbalRank}
                            />
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
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.quantitativeScore}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="quantitativeRank"
                              name="quantitativeRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.quantitativeRank}
                            />
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
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.writingScore}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <p className="text-center">Rank</p>
                            <Input
                              type="number"
                              id="writingRank"
                              name="writingRank"
                              required
                              min="100"
                              max="300"
                              defaultValue={gmatData?.writingRank}
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="text-right">
                        <CancelButton
                          cancel={() => setShowGmatForm(!showGmatForm)}
                        />
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
          <SaveButton text="Next" action={handleForward} />
        </Col>
      </Row>
    </>
  );
}
