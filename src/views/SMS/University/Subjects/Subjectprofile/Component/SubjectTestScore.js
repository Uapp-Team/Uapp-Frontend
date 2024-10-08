import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { useParams, useHistory } from "react-router-dom";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";

const SubjectTestScore = () => {
  const { subjId } = useParams();
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
  const history = useHistory();
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
  return (
    <div>
      {homeTestScore === false ? null : (
        <>
          {" "}
          <p className="section-title">Test Score for Home Students</p>
          <div
            className="mb-3"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {homeTestScore?.isIELTSMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  IELTS is Mandatory
                </span>
                <br />
                <span className="pl-5">
                  IELTS Score: {homeTestScore?.ieltSscore}
                </span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">
                  IELTS Equivalent Score: {homeTestScore?.ieltSscore}
                </span>
                <br />
              </>
            )}
            {homeTestScore?.isGreMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GRE is required
                </span>
                <br />
                <span className="pl-5">
                  GRE Score: {homeTestScore?.greScore}
                </span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">
                  GRE Score: {homeTestScore?.greScore}
                </span>
                <br />
              </>
            )}
            {homeTestScore?.isGmatMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GMAT is required
                </span>
                <br />
                <span className="pl-5">
                  GMAT Score: {homeTestScore?.gmatScore}
                </span>
              </>
            ) : (
              <>
                <span className="pl-5">
                  GMAT Score: {homeTestScore?.gmatScore}
                </span>
              </>
            )}
          </div>
        </>
      )}

      {euTestScore === false ? null : (
        <>
          <p className="section-title">Test Score for EU/UK Students</p>
          <div
            className="mb-3"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {euTestScore?.isIELTSMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  IELTS is Mandatory
                </span>
                <br />
                <span className="pl-5">
                  IELTS Score: {euTestScore?.ieltSscore}
                </span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">
                  IELTS Equivalent Score: {euTestScore?.ieltSscore}
                </span>
                <br />
              </>
            )}
            {euTestScore?.isGreMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GRE is required
                </span>
                <br />
                <span className="pl-5">GRE Score: {euTestScore?.greScore}</span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">GRE Score: {euTestScore?.greScore}</span>
                <br />
              </>
            )}
            {euTestScore?.isGmatMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GMAT is required
                </span>
                <br />
                <span className="pl-5">
                  GMAT Score: {euTestScore?.gmatScore}
                </span>
              </>
            ) : (
              <>
                <span className="pl-5">
                  GMAT Score: {euTestScore?.gmatScore}
                </span>
              </>
            )}
          </div>
        </>
      )}

      {intTestScore === false ? null : (
        <>
          <p className="section-title">Test Score for International Students</p>
          <div
            className="mb-3"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {intTestScore?.isIELTSMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  IELTS is Mandatory
                </span>
                <br />
                <span className="pl-5">
                  IELTS Score: {intTestScore?.ieltSscore}
                </span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">
                  IELTS Equivalent Score: {intTestScore?.ieltSscore}
                </span>
                <br />
              </>
            )}
            {euTestScore?.isGreMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GRE is required
                </span>
                <br />
                <span className="pl-5">
                  GRE Score: {intTestScore?.greScore}
                </span>
                <br />
              </>
            ) : (
              <>
                <span className="pl-5">
                  GRE Score: {intTestScore?.greScore}
                </span>
                <br />
              </>
            )}
            {intTestScore?.isGmatMandatory ? (
              <>
                <img src={icon_info} alt="" />{" "}
                <span
                  className="pl-3"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  GMAT is required
                </span>
                <br />
                <span className="pl-5">
                  GMAT Score: {intTestScore?.gmatScore}
                </span>
              </>
            ) : (
              <>
                <span className="pl-5">
                  GMAT Score: {intTestScore?.gmatScore}
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectTestScore;
