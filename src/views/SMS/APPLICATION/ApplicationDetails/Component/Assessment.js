import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import ReactApexChart from "react-apexcharts";
import AssessmentStatus from "./Status/AssessmentStatus";

const Assessment = ({ id, success }) => {
  const [details, setDetails] = useState(false);
  const [document, setDocument] = useState(false);
  const [profile, setProfile] = useState(false);
  const [consent, setConsent] = useState(false);
  const [internalAssesment, setInternalAssesment] = useState(false);
  const [assessmentPercent, setassessmentPercent] = useState(0);

  useEffect(() => {
    get(`ApplicationAssesment/GetByApplication/${id}`).then((res) => {
      setDetails(res?.applicationDetails);
      setDocument(res?.document);
      setProfile(res?.profile);
      setConsent(res?.consent);
      setInternalAssesment(res?.internalAssesment);
    });
  }, [id, success]);

  useEffect(() => {
    const assessmentPercent =
      (details === 3 && 20) +
      (document === 3 && 20) +
      (profile === 3 && 20) +
      (consent === 3 && 20) +
      (internalAssesment === 3 && 20);
    setassessmentPercent(assessmentPercent);
  }, [consent, details, document, internalAssesment, profile]);

  const series = [assessmentPercent];

  return (
    <div className="custom-card-border p-4 mb-3 ">
      <p>
        <b>Application Assessment</b>
      </p>
      <hr />

      {assessmentPercent > 0 && (
        <>
          {assessmentPercent <= 20 && (
            <div id="chart">
              <ReactApexChart
                options={{
                  chart: {
                    height: 350,
                    type: "radialBar",
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: "50%",
                      },
                    },
                  },
                  colors: ["#F64C4C"],
                  stroke: {
                    lineCap: "round",
                  },
                  labels: ["Assessment"],
                }}
                series={series}
                type="radialBar"
                height={250}
              />
            </div>
          )}
          {assessmentPercent > 20 && assessmentPercent <= 60 && (
            <div id="chart">
              <ReactApexChart
                options={{
                  chart: {
                    height: 350,
                    type: "radialBar",
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: "50%",
                      },
                    },
                  },
                  colors: ["#FFAD0D"],
                  stroke: {
                    lineCap: "round",
                  },
                  labels: ["Assessment"],
                }}
                series={series}
                type="radialBar"
                height={250}
              />
            </div>
          )}
          {assessmentPercent > 60 && (
            <div id="chart">
              <ReactApexChart
                options={{
                  chart: {
                    height: 350,
                    type: "radialBar",
                  },
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: "50%",
                      },
                    },
                  },
                  colors: ["#47B881"],
                  stroke: {
                    lineCap: "round",
                  },
                  labels: ["Assessment"],
                }}
                series={series}
                type="radialBar"
                height={250}
              />
            </div>
          )}
        </>
      )}

      <AssessmentStatus title="Application Details" value={details} />
      <AssessmentStatus title="Student Details" value={profile} />
      <AssessmentStatus title="Internal Assessment" value={internalAssesment} />
      <AssessmentStatus title="Documents" value={document} />
      <AssessmentStatus title="Consent" value={consent} />
    </div>
  );
};

export default Assessment;
