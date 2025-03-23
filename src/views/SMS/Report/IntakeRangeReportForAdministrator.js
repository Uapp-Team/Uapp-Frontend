import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";
import get from "../../../helpers/get";
import Consultant from "./Consultant";

const IntakeRangeReportForAdministrator = () => {
  const [consultant, setConsultant] = useState([]);
  const [university, setUniversity] = useState([]);
  const [accountIntake, setAccountIntake] = useState([]);
  const [offer, setOffer] = useState([]);
  const history = useHistory();
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [universityLabel, setUniversityLabel] = useState("Select University");
  const [universityValue, setUniversityValue] = useState(0);

  const [accountIntakeLabel, setAccountIntakeLabel] = useState(
    "Select Account Intake"
  );
  const [accountIntakeValue, setAccountInakeValue] = useState(0);

  const [offerLabel, setOfferLabel] = useState("Select Offer Status");
  const [offerValue, setOfferValue] = useState(0);

  const [typeCount, setTypeCount] = useState({});
  const [statistics, setStatistics] = useState({});
  const [monthStatistics, setMonthStatistics] = useState({});
  const [options1, setOptions1] = useState({});
  const [series1, setSeries1] = useState([]);
  const [options2, setOptions2] = useState({});
  const [series2, setSeries2] = useState([]);
  const [options3, setOptions3] = useState({});
  const [series3, setSeries3] = useState([]);
  const [options4, setOptions4] = useState({});
  const [series4, setSeries4] = useState([]);
  const [options5, setOptions5] = useState({});
  const [series5, setSeries5] = useState([]);
  const [options6, setOptions6] = useState({});
  const [series6, setSeries6] = useState([]);
  const [estOption, setEstOption] = useState({});
  const [estSeries, setEstSeries] = useState([]);
  const [incomeData, setIncomeData] = useState({});
  const [progress, setProgress] = useState();

  const handleClearSearch = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setUniversityLabel("Select University");
    setUniversityValue(0);
    setAccountIntakeLabel("Select Account Intake");
    setAccountInakeValue(0);
    setOfferLabel("Select Offer Status");
    setOfferValue(0);
  };

  useEffect(() => {
    get(`SearchFilter/Universities/0/0/0`).then((res) => {
      setUniversity(res);
    });

    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    get(`AccountIntakeDD/index`).then((res) => {
      setAccountIntake(res);
    });

    get(`OfferStatusDD/Index`).then((res) => {
      setOffer(res);
    });
  }, []);

  useEffect(() => {
    get(`IntakeRangeReport/ApplicationTypeCount`).then((res) => {
      setTypeCount(res);
      setSeries5([
        {
          name: "Application Count",
          data: [res?.home, res?.eu, res?.international],
        },
      ]);

      setSeries6([res?.home, res?.eu, res?.international]);

      setOptions6({
        chart: {
          type: "pie",
        },
        colors: ["#4BADC0", "#9AD0DB", "#B7DEE5"],
        labels: ["Home/UK", "EU/EEU", "International"],
        responsive: [
          // {
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200,
          //     },
          //   },
          // },
        ],
      });

      setOptions5({
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#5fb3cf"],
        plotOptions: {
          bar: {
            columnWidth: "20%",
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -30,
          style: {
            fontSize: "14px",
            colors: ["#304758"],
            fontWeight: "500",
          },
        },

        xaxis: {
          categories: ["Home/UK", "EU/EEU", "International"],

          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val;
            },
          },
        },
      });
    });

    get(
      `IntakeRangeReport/ApplicationStatistics?consultantId=${consultantValue}&universityId=${universityValue}&accountIntakeId=${accountIntakeValue}&offerStatusId=${offerValue}`
    ).then((res) => {
      setStatistics(res);
      setOptions3({
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        colors: ["#5fb3cf"],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [
            "Total Applications",
            "Submitted to University",
            "Unconditional Offer",
            "Total Registered",
            "Total Rejections",
          ],
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val;
            },
          },
        },
      });

      setSeries3([
        {
          data: [
            res?.totalApplication,
            res?.submittedToUniversity,
            res?.unconditionalOffer,
            res?.totalRegistered,
            res?.totalRejected,
          ],
        },
      ]);

      setOptions4({
        chart: {
          type: "pie",
        },
        colors: ["#4BADC0", "#9AD0DB"],
        labels: ["Converted", "Not Converted"],
        responsive: [
          // {
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200,
          //     },
          //   },
          // },
        ],
      });

      setSeries4([res?.convertedPercentage, res?.notConvertedPercentage]);
    });

    get(
      `IntakeRangeReport/MonthWiseStatistics?consultantId=${consultantValue}&universityId=${universityValue}&accountIntakeId=${accountIntakeValue}&offerStatusId=${offerValue}`
    ).then((res) => {
      setMonthStatistics(res);
      setOptions1({
        chart: {
          id: "basic-bar",
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#5fb3cf"],
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },

        // yaxis: {
        //   axisBorder: {
        //     show: true,
        //   },
        //   axisTicks: {
        //     show: true,
        //   },
        //   labels: {
        //     show: true,
        //     formatter: function (val) {
        //       return val;
        //     },
        //   },
        // },
        // plotOptions: {
        //   bar: {
        //     columnWidth: "60%",
        //     dataLabels: {
        //       position: "top", // top, center, bottom
        //     },
        //   },
        // },
        // dataLabels: {
        //   enabled: true,
        //   formatter: function (val) {
        //     return val;
        //   },
        //   offsetY: -30,
        //   style: {
        //     fontSize: "14px",
        //     colors: ["#304758"],
        //     fontWeight: "500",
        //   },
        // },
      });

      setSeries1([
        {
          name: "Total Applications",
          data: [
            res?.januaryData?.totalApplication,
            res?.februaryData?.totalApplication,
            res?.marchData?.totalApplication,
            res?.aprilData?.totalApplication,
            res?.mayData?.totalApplication,
            res?.juneData?.totalApplication,
            res?.julyData?.totalApplication,
            res?.augustData?.totalApplication,
            res?.septemberData?.totalApplication,
            res?.octoberData?.totalApplication,
            res?.novemberData?.totalApplication,
            res?.decemberData?.totalApplication,
          ],
        },
      ]);
      setSeries2([
        res?.januaryData?.totalApplicationPercentage,
        res?.februaryData?.totalApplicationPercentage,
        res?.marchData?.totalApplicationPercentage,
        res?.aprilData?.totalApplicationPercentage,
        res?.mayData?.totalApplicationPercentage,
        res?.juneData?.totalApplicationPercentage,
        res?.julyData?.totalApplicationPercentage,
        res?.augustData?.totalApplicationPercentage,
        res?.septemberData?.totalApplicationPercentage,
        res?.octoberData?.totalApplicationPercentage,
        res?.novemberData?.totalApplicationPercentage,
        res?.decemberData?.totalApplicationPercentage,
      ]);

      setOptions2({
        chart: {
          type: "pie",
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
            fontWeight: "400",
            colors: ["white"],
          },
        },
        legend: {
          show: true,
          fontSize: "9px",
          fontWeight: "400",
          markers: {
            width: 6,
            height: 6,
            strokeWidth: 0,
            strokeColor: "red",
            fillColors: undefined,
            radius: 6,
          },
        },

        colors: [
          "#00687B",
          "#B7DEE5",
          "#9AD0DB",
          "#B7DEE5",
          "#9AD0DB",
          "#D4EBF0",
          "#9AD0DB",
          "#B7DEE5",
          "#9AD0DB",
          "#B7DEE5",
          "#9AD0DB",
          "#B7DEE5",
        ],
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200,
        //       },
        //       legend: {
        //         position: "bottom",
        //       },
        //     },
        //   },
        // ],
      });
    });

    // if (consultantValue > 0) {
    //   get(
    //     `IntakeRangeReport/ConsultantTargetReport?consultantId=${consultantValue}&accountIntakeId=${accountIntakeValue}`
    //   ).then((res) => {
    //     console.log(res);
    //     setIncomeData(res);
    //     let levels = [];
    //     let seriesData = [];

    //     for (let x = 0; x < res?.groupLevels.length; x++) {
    //       let lebelString =
    //         "" +
    //         res?.groupLevels[x]?.startFrom +
    //         "-" +
    //         res?.groupLevels[x]?.endsAt +
    //         "";
    //       levels.push(lebelString);
    //       seriesData.push(res?.groupLevels[x]?.unconditional);
    //     }

    //     console.log(levels);
    //     setEstOption({
    //       chart: {
    //         type: "donut",
    //       },
    //       tooltip: {
    //         enabled: true,
    //       },
    //       dataLabels: {
    //         formatter: function (val) {
    //           return (val * res?.totalUnconditional) / 100;
    //         },
    //       },
    //       labels: levels,
    //       colors: ["#241ACD", "#F8C52F", "#F87675", "#AE75F8"],
    //       legend: {
    //         show: true,
    //       },
    //       responsive: [
    //         // {
    //         //   breakpoint: 480,
    //         //   options: {
    //         //     chart: {
    //         //       width: 200,
    //         //     },
    //         //     legend: {
    //         //       position: "bottom",
    //         //     },
    //         //   },
    //         // },
    //       ],
    //     });

    //     setEstSeries(seriesData);
    //   });
    // }
  }, [consultantValue, offerValue, universityValue, accountIntakeValue]);

  useEffect(() => {
    if (consultantValue) {
      get(
        `Report/IntakeRange/${consultantValue}/${universityValue}/${accountIntakeValue}/${offerValue}`
      ).then((res) => {
        console.log(res);
        setProgress(res);
      });
    }
  }, [consultantValue, universityValue, accountIntakeValue, offerValue]);

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const universityOptions = university?.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const accountIntakeOptions = accountIntake?.map((ai) => ({
    label: ai?.name,
    value: ai?.id,
  }));

  const offerOptions = offer?.map((os) => ({
    label: os?.name,
    value: os?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const selectUniversity = (label, value) => {
    setUniversityLabel(label);
    setUniversityValue(value);
  };

  const selectAccountIntake = (label, value) => {
    console.log(label, typeof value);
    setAccountIntakeLabel(label);
    setAccountInakeValue(value);
  };

  const selectOfferStatus = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
  };

  return (
    <div>
      <BreadCrumb title="Intake Range Report" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <Select
                options={consultantOptions}
                value={{
                  label: consultantLabel,
                  value: consultantValue,
                }}
                onChange={(opt) => selectConsultant(opt.label, opt.value)}
                name="consultantId"
                id="consultantId"
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Select
                options={universityOptions}
                value={{
                  label: universityLabel,
                  value: universityValue,
                }}
                onChange={(opt) => selectUniversity(opt.label, opt.value)}
                name="universityId"
                id="universityId"
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Select
                options={accountIntakeOptions}
                value={{
                  label: accountIntakeLabel,
                  value: accountIntakeValue,
                }}
                onChange={(opt) => selectAccountIntake(opt.label, opt.value)}
                name="accountIntakeId"
                id="accountIntakeId"
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Select
                options={offerOptions}
                value={{
                  label: offerLabel,
                  value: offerValue,
                }}
                onChange={(opt) => selectOfferStatus(opt.label, opt.value)}
                name="offerStatusId"
                id="offerStatusId"
              />
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3">
            <div className="d-flex mt-1">
              {consultantValue !== 0 ||
              universityValue !== 0 ||
              accountIntakeValue !== 0 ||
              offerValue !== 0
                ? ""
                : ""}
              {consultantValue !== 0 ? (
                <TagButton
                  label={consultantLabel}
                  setValue={() => setConsultantValue(0)}
                  setLabel={() => setConsultantLabel("Select Consultant")}
                />
              ) : (
                ""
              )}
              {consultantValue !== 0 &&
                (universityValue !== 0 ||
                accountIntakeValue !== 0 ||
                offerValue !== 0
                  ? ""
                  : "")}
              {universityValue !== 0 ? (
                <TagButton
                  label={universityLabel}
                  setValue={() => setUniversityValue(0)}
                  setLabel={() => setUniversityLabel("Select University")}
                />
              ) : (
                ""
              )}
              {universityValue !== 0 &&
                (accountIntakeValue !== 0 || offerValue !== 0 ? "" : "")}

              {accountIntakeValue !== 0 ? (
                <TagButton
                  label={accountIntakeLabel}
                  setValue={() => setAccountInakeValue(0)}
                  setLabel={() =>
                    setAccountIntakeLabel("Select Account Intake")
                  }
                />
              ) : (
                ""
              )}
              {accountIntakeValue !== 0 && offerValue !== 0 ? "" : ""}

              {offerValue !== 0 ? (
                <TagButton
                  label={offerLabel}
                  setValue={() => setOfferValue(0)}
                  setLabel={() => setOfferLabel("Select Offer Status")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="mt-1 mx-1 d-flex btn-clear">
              {consultantValue !== 0 ||
              universityValue !== 0 ||
              accountIntakeValue !== 0 ||
              offerValue !== 0 ? (
                <button className="tag-clear" onClick={handleClearSearch}>
                  Clear All
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 1st Chart Start */}

      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500", textAlign: "center" }}>
                Total Applications
              </span>
              <Chart
                options={options1}
                series={series1}
                type="bar"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>

        <div className="col-lg-5 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>
                Total Applications %
                {/* Total Applications: {statistics?.totalApplication} */}
              </span>

              <Chart
                options={options2}
                series={series2}
                type="pie"
                // width="370"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 1st  Chart End */}

      {/* Estimated Income Reports Chart Start */}

      {consultantValue === 0 ? null : (
        <Card className="p-3">
          <CardBody>
            <Consultant
              progress={progress}
              // estimate={`${
              //   accountIntakeLabel !== "Select Account Intake"
              //     ? accountIntakeLabel
              //     : ""
              // } ${offerLabel !== "Select Offer Status" ? offerLabel : ""} ${
              //   universityLabel !== "Select University" ? universityLabel : ""
              // } `}
            />
          </CardBody>
        </Card>
      )}

      {/* {consultantValue === 0 ? null : (
        <div className="row">
          <div className="col-lg-7 col-md-6 col-sm-12">
            <Card>
              <CardBody>
                <span style={{ fontWeight: "500" }}>Finance</span>
                <Chart
                  options={estOption}
                  series={estSeries}
                  type="donut"
                  // width="390"
                  width="100%"
                  height="300"
                />
              </CardBody>
            </Card>
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 my-3 my-md-0">
            <div
              className="text-center d-flex flex-column justify-content-around py-3"
              style={{
                height: "358px",
                backgroundColor: "#23CCB5",
                borderRadius: "12px",
                border: "0.5px solid rgba(37, 37, 37, 0.12)",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  color: "#ffffff",
                }}
              >
                Estimated Income
              </div>

              <div>
                <img src={camera444} className="img-fluid" alt="" />
              </div>

              <div
                style={{
                  fontWeight: "600",
                  fontSize: "32px",
                  color: "#ffffff",
                }}
              >
                £ {incomeData?.estimatedTotalIncome}
              </div>

              <div
                style={{
                  fontWeight: "500",
                  fontSize: "13px",
                  color: "#ffffff",
                }}
              >
                {accountIntakeLabel}
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Estimated Income Reports Chart End */}

      {/* 2nd Chart Start */}

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Overall Performance</span>
              <Chart
                options={options3}
                series={series3}
                type="bar"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Conversions %</span>
              <Chart
                options={options4}
                series={series4}
                type="pie"
                // width="420"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 2nd Chart End */}

      {/* 3rd Chart Start */}

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Application Type</span>
              <Chart
                options={options5}
                series={series5}
                type="bar"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Application Type</span>
              <Chart
                options={options6}
                series={series6}
                type="pie"
                // width="420"
                width="100%"
                height="300"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 3rd Chart End */}
    </div>
  );
};

export default IntakeRangeReportForAdministrator;

{
  /* <span
                    className="text-danger btn"
                    onClick={() => setConsultantValue(0)}
                  >
                    {" "}
                    <i className="fa fa-times"></i> Clear
                  </span> */
}
