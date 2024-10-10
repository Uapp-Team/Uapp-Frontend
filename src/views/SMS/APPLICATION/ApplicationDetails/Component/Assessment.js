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

  useEffect(() => {
    get(`ApplicationAssesment/GetByApplication/${id}`).then((res) => {
      setDetails(res?.applicationDetails);
      setDocument(res?.document);
      setProfile(res?.profile);
      setConsent(res?.consent);
      setInternalAssesment(res?.internalAssesment);
    });
  }, [id, success]);

  const assessmentPercent =
    (details === 3 && 20) +
    (document === 3 && 20) +
    (profile === 3 && 20) +
    (consent === 3 && 20) +
    (internalAssesment === 3 && 20);

  const chartColor =
    assessmentPercent <= 20
      ? "#F64C4C"
      : assessmentPercent <= 60
      ? "#FFAD0D"
      : "#47B881";

  const series = [assessmentPercent];

  const options = {
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
    colors: [chartColor],
    stroke: {
      lineCap: "round",
    },
    labels: ["Assessment"],
  };

  return (
    <div className="custom-card-border p-4 mb-3 ">
      {/* <div className="row">
        <div className="col-9">
          <h5>Application Assessment</h5>
        </div>
        <div className="col-3 text-right">
          <h5>{assessmentPercent}%</h5>
        </div>
      </div> */}
      <p>
        <b>Application Assessment</b>
      </p>
      <hr />

      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={250}
        />
      </div>
      <AssessmentStatus title="Application Details" value={details} />
      <AssessmentStatus title="Student Details" value={profile} />
      <AssessmentStatus title="Internal Assessment" value={internalAssesment} />
      <AssessmentStatus title="Documents" value={document} />
      <AssessmentStatus title="Consent" value={consent} />
    </div>
  );
};

export default Assessment;
