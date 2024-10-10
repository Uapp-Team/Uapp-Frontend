import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../helpers/get";

const ProfileRecruitingForFrom = ({ id }) => {
  const [fromData, setFromData] = useState([]);

  const [forData, setForData] = useState([]);
  const [typeData, setTypeData] = useState({});
  const userId = localStorage.getItem("referenceId");
  const [headData, setHeadData] = useState({});
  const [success, setSuccess] = useState(false);
  console.log(headData, "headData");

  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/ProfileHead/${id}`).then((res) => {
        setHeadData(res);
      });
    } else {
      get(`ConsultantProfile/ProfileHead/${userId}`).then((res) => {
        setHeadData(res);
      });
    }
  }, [success, id, userId]);

  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/GetRecruitmentInfo/${id}`).then((res) => {
        console.log(res);
        setTypeData(res);
      });

      get(`RecruitmentFrom/GetByConsultant/${id}`).then((res) => {
        console.log(res);
        setFromData(res);
      });

      get(`RecruitmentFor/GetByConsultant/${id}`).then((res) => {
        console.log(res);
        setForData(res);
      });
    } else {
      get(`ConsultantProfile/GetRecruitmentInfo/${userId}`).then((res) => {
        console.log(res);
        setTypeData(res);
      });

      get(`RecruitmentFrom/GetByConsultant/${userId}`).then((res) => {
        console.log(res);
        setFromData(res);
      });

      get(`RecruitmentFor/GetByConsultant/${userId}`).then((res) => {
        console.log(res);
        setForData(res);
      });
    }
  }, [id, userId]);

  return (
    <>
      {headData?.consultantTypeId === 2 ? (
        <div>
          <Card>
            <CardBody>
              <div className="mb-3">
                <h5 className="mb-4"> Recruiting from</h5>

                <div className="d-flex flex-wrap mt-3">
                  {fromData?.map((from, i) => (
                    <div
                      key={i}
                      className="mr-2"
                      style={{
                        backgroundColor: "#EEF3F4",
                        padding: "8px 16px",
                        border: "1px solid rgba(37, 37, 37, 0.12)",
                        borderRadius: "211px",
                      }}
                    >
                      {from?.countryName}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="mb-4"> Recruiting for</h5>
                <div className="d-flex flex-wrap mt-3">
                  {forData?.map((from, i) => (
                    <div
                      key={i}
                      className="mr-2"
                      style={{
                        backgroundColor: "#EEF3F4",
                        padding: "8px 16px",
                        border: "1px solid rgba(37, 37, 37, 0.12)",
                        borderRadius: "211px",
                      }}
                    >
                      {from?.countryName}
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default ProfileRecruitingForFrom;
