import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";

const GreAndGmatInformationCard = ({
  sId,
  // permissions,
  // permissionList,
  // handleUpdateGREAndGMATScores,
  // studentDetails,
  // gMatResult,
  // greResult,
}) => {
  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});

  useEffect(() => {
    get(`GreScore/GetbyStudent/${sId}`).then((res) => {
      setGreData(res);
    });
    get(`GmatScore/GetByStudent/${sId}`).then((res) => {
      setGmatData(res);
    });
  });

  return (
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
        <span>GRE information is not added.</span>
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
          <span>GMAT information is not added.</span>
        )}
      </>
    </div>
  );
};

export default GreAndGmatInformationCard;
