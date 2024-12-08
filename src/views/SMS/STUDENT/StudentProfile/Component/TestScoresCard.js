import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const TestScoresCard = ({
  sId,
  ielts,
  setIelts,
  duolingo,
  setDuolingo,
  toefl,
  setToefl,
  functions,
  setFunctions,
  gcse,
  setGcse,
  pearson,
  setPearson,
  others,
  setOthers,
  pte,
  setPte,
  greData,
  setGreData,
  gmatData,
  setGmatData,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  useEffect(() => {
    get(`GreScore/GetbyStudent/${sId}`).then((res) => {
      setGreData(res);
    });
    get(`GmatScore/GetByStudent/${sId}`).then((res) => {
      setGmatData(res);
    });
  }, [sId]);

  useEffect(() => {
    get(`Ielts/Index/${sId}`).then((res) => {
      setIelts(res);
    });

    get(`Duolingo/Index/${sId}`).then((res) => {
      setDuolingo(res);
    });

    get(`Toefl/Index/${sId}`).then((res) => {
      setToefl(res);
    });

    get(`FunctionalSkill/Index/${sId}`).then((res) => {
      setFunctions(res);
    });

    get(`Gcse/Index/${sId}`).then((res) => {
      setGcse(res);
    });

    get(`Pearson/Index/${sId}`).then((res) => {
      setPearson(res);
    });

    get(`Other/Index/${sId}`).then((res) => {
      setOthers(res);
    });

    get(`Pte/Index/${sId}`).then((res) => {
      setPte(res);
    });
  }, [sId]);
  return (
    <div>
      <>
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>English Language & Test Score</b>{" "}
            </td>
            <td className="border-0 text-right">
              {permissions?.includes(permissionList?.Edit_Student) ? (
                <Link to={`/addTestScore/${sId}/${1}`}>Edit</Link>
              ) : null}
            </td>
          </thead>
        </Table>
      </>
      <div>
        <div>
          {greData !== null ? (
            <div className="col-12 border p-2 rounded  mb-3">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-heading">GRE Result</h5>
                    </div>
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
              </Card>
            </div>
          ) : (
            <p className="pl-10px">GRE information is not added.</p>
          )}

          <>
            {gmatData !== null ? (
              <div className="col-12 border p-2 rounded mb-3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="card-heading">GMAT Result</h5>
                      </div>
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
              </div>
            ) : (
              <p className="pl-10px">GMAT information is not added.</p>
            )}
          </>
        </div>

        {ielts?.id ? (
          <div className="col-12 border p-2 rounded mb-3">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <span className="card-heading">IELTS Score</span>
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
                  <span className="card-heading">DUOLINGO Score</span>
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
                  <span className="card-heading">TOEFL Score</span>
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
                      <span>Reading</span>
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
                  <span className="card-heading">Function Skills Score</span>
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
                      <span>Reading</span>
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
                  <span className="card-heading">GCSE Score</span>
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
                  <span className="card-heading">PEARSON Score</span>
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
                  <span className="card-heading">Other Score</span>
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
                  <span className="card-heading">PTE Score</span>
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
                      <span>Reading</span>
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
      </div>
    </div>
  );
};

export default TestScoresCard;
