import React from "react";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AllScoresCard = ({
  addNewScore,
  eltName,
  isQualification,
  isQualificationAdd,
  ielts,
  handleEditDuolingo,
  handleEditFunctions,
  handleEditGcse,
  handleEditIelts,
  handleEditPearson,
  toggleDanger,
  handleDate,
  deleteModal,
  setDeleteModal,
  deleteEnglishTestScore,
  buttonStatus,
  progress,
  duolingo,
  functions,
  pearson,
  gcse,
  handleEditToefl,
  toefl,
  handleEditOthers,
  others,
  pte,
  handleEditPte,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <div className="row mx-0 mb-3">
      {ielts?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:IELTS Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditIelts}
                    >
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(ielts, "IELTS", 1)}
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
                    <span>Listening</span>
                    <br />
                    <b> {ielts?.listening}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Reading</span>
                    <br />
                    <b> {ielts?.reading}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Writing</span>
                    <br />
                    <b> {ielts?.writing}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Speaking</span>
                    <br />
                    <b> {ielts?.speaking}</b>
                  </p>
                </Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3">
                  <p>
                    <span>Overall</span>
                    <br />
                    <b> {ielts?.overall}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Exam Date</span>
                    <br />
                    <b> {dateFormate(ielts?.examDate)}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {duolingo?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:DUOLINGO Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditDuolingo}
                    >
                      Edit
                    </span>
                  ) : null}
                  |
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(duolingo, "Duolingo", 2)}
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
                    <span>Literacy</span>
                    <br />
                    <b> {duolingo?.leteracy}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Comprehension</span>
                    <br />
                    <b>{duolingo?.comprehension}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Conversation</span>
                    <br />
                    <b> {duolingo?.conversation}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Production</span>
                    <br />
                    <b> {duolingo?.production}</b>
                  </p>
                </Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3">
                  <p>
                    <span>Exam Date</span>
                    <br />
                    <b> {dateFormate(duolingo?.examDate)}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b> {duolingo?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {toefl?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:TOEFL Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditToefl}
                    >
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(toefl, "Toefl", 3)}
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
                    <span>Overall</span>
                    <br />
                    <b> {toefl?.overall}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Speaking</span>
                    <br />
                    <b>{toefl?.speaking}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>reading</span>
                    <br />
                    <b>{toefl?.reading}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Writing</span>
                    <br />
                    <b> {toefl?.writing}</b>
                  </p>
                </Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3">
                  <p>
                    <span>Listening</span>
                    <br />
                    <b> {toefl?.listening}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Exam Date</span>
                    <br />
                    <b> {dateFormate(toefl?.examDate)}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b> {toefl?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}
      {functions?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:Function Skills Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditFunctions}
                    >
                      Edit
                    </span>
                  ) : null}
                  |
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(functions, "Functions", 4)}
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
                    <span>Overall</span>
                    <br />
                    <b> {functions?.overall}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Speaking</span>
                    <br />
                    <b>{functions?.speaking}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>reading</span>
                    <br />
                    <b> {functions?.reading}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Writing</span>
                    <br />
                    <b>{functions?.writing}</b>
                  </p>
                </Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3">
                  <p>
                    <span>Listening</span>
                    <br />
                    <b> {functions?.listening}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Exam Date</span>
                    <br />
                    <b> {dateFormate(functions?.examDate)}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b> {functions?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {gcse?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:GCSE Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditGcse}
                    >
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(gcse, "Gcse", 5)}
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
                    <span>Result</span>
                    <br />
                    <b> {gcse?.result}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>IELTS Equivalent Score</span>
                    <br />
                    <b> {gcse?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {pearson?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:PEARSON Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditPearson}
                    >
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(pearson, "Pearson", 6)}
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
                    <span>Result</span>
                    <br />
                    <b> {pearson?.result}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b>{pearson?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {others?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:Other Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={handleEditOthers}
                    >
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(others, "Others", 7)}
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
                    <span>Test Name</span>
                    <br />
                    <b> {others?.testName}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Overall Score</span>
                    <br />
                    <b>{others?.scoreOverall}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b> {others?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}
      {pte?.id ? (
        <div className="col-12 border p-2 rounded mb-3">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">
                  English Test Score:PTE Score
                </span>

                <span>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span style={{ cursor: "pointer" }} onClick={handleEditPte}>
                      Edit
                    </span>
                  ) : null}{" "}
                  |{" "}
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleDanger(pte, 8)}
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
                    <span>Overall</span>
                    <br />
                    <b> {pte?.overall}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span> Speaking</span>
                    <br />
                    <b>{pte?.speaking}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>reading</span>
                    <br />
                    <b> {pte?.reading}</b>
                  </p>
                </Col>
                <Col lg="3">
                  <p>
                    <span>Writing</span>
                    <br />
                    <b> {pte?.writing}</b>
                  </p>
                </Col>
              </Row>
              <Row className="text-gray">
                <Col lg="3">
                  <p>
                    <span> IELTS Equivalent Score</span>
                    <br />
                    <b> {pte?.ieltsEquivalent}</b>
                  </p>
                </Col>
                <Col lg="3"></Col>
                <Col lg="3"></Col>

                <Col lg="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      ) : null}

      <FormGroup
        className="has-icon-left position-relative"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      ></FormGroup>

      {(ielts !== null ||
        duolingo !== null ||
        toefl !== null ||
        functions !== null ||
        gcse !== null ||
        pearson !== null ||
        others !== null ||
        pte !== null) &&
      isQualification === true &&
      isQualificationAdd === false ? (
        <>
          {" "}
          {permissions?.includes(permissionList?.Edit_Student) ? (
            <button
              className="add-button"
              icon={<i className="fas fa-plus"></i>}
              onClick={addNewScore}
              name={" Add English Test Score"}
            >
              Add English Test Score
            </button>
          ) : null}
        </>
      ) : null}

      <ConfirmModal
        text={`Do You Want To Delete ${eltName} SCORE ?`}
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={deleteEnglishTestScore}
        cancel={() => setDeleteModal(false)}
        buttonStatus={buttonStatus}
        progress={progress}
      />
    </div>
  );
};

export default AllScoresCard;
