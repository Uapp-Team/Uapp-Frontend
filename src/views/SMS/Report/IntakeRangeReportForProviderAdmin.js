import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";
import get from "../../../helpers/get";
import Select from "react-select";
import Chart from "react-apexcharts";
import camera444 from "../../../assets/img/camera444.svg";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const IntakeRangeReportForProviderAdmin = () => {
  const [consultant, setConsultant] = useState([]);
  const [university, setUniversity] = useState([]);
  const [accountIntake, setAccountIntake] = useState([]);
  const [offer, setOffer] = useState([]);
  const history = useHistory();
  const consultantValue = 0;

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

  const backToDashboard = () => {
    history.push(`/`);
  };

  const handleClearSearch = () => {
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
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
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
          offsetY: -20,
          style: {
            fontSize: "14px",
            colors: ["#304758"],
            fontWeight: "500",
          },
        },

        xaxis: {
          categories: ["Home/UK", "EU/EEU", "International"],

          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
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
          toolbar: {
            show: false,
          },
          height: 350,
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
            "Total Rejections",
            "Total Registered",
            "Unconditional Offer",
            "Submitted to University",
            "Total Applications",
          ],
        },
      });

      setSeries3([
        {
          data: [
            res?.totalRejected,
            res?.totalRegistered,
            res?.unconditionalOffer,
            res?.submittedToUniversity,
            res?.totalApplication,
          ],
        },
      ]);

      setOptions4({
        chart: {
          type: "pie",
          toolbar: {
            show: false,
          },
        },
        colors: ["#4BADC0", "#9AD0DB"],
        labels: ["Converted", "Not Converted"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
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
          toolbar: {
            show: false,
          },
        },
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

        colors: ["#5fb3cf"],
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
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      });
    });
  }, [consultantValue, offerValue, universityValue, accountIntakeValue]);

  console.log(estOption);

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
      <BreadCrumb title="Intake Range Report" backTo="" path="" />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-4 col-sm-12">
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

            <div className="col-md-4 col-sm-12">
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

            <div className="col-md-4 col-sm-12">
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

          <div className="d-flex justify-content-end mt-3">
            <div
              className="mt-1 mx-1 d-flex btn-clear"
              onClick={handleClearSearch}
            >
              <span className="text-danger">
                <i className="fa fa-times"></i> Clear
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 1st Chart Start */}

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500", textAlign: "center" }}>
                Total Applications
              </span>
              <Chart options={options1} series={series1} type="bar" />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-6 col-sm-12">
          <Card>
            <CardBody>
              <span style={{ fontWeight: "500" }}>
                Total Applications %
                {/* Total Applications: {statistics?.totalApplication} */}
              </span>

              <Chart
                options={options2}
                series={series2}
                type="pie"
                width="400"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 1st  Chart End */}

      {/* 2nd Chart Start */}

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Overall Performance</span>
              <Chart options={options3} series={series3} type="bar" />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-6 col-sm-12">
          <Card>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Conversions %</span>
              <Chart
                options={options4}
                series={series4}
                type="pie"
                width="460"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 2nd Chart End */}

      {/* 3rd Chart Start */}

      <div className="row">
        <div className="col-md-6">
          <Card style={{ height: "355.69px" }}>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Application Type</span>
              <Chart options={options5} series={series5} type="bar" />
            </CardBody>
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <CardBody>
              <span style={{ fontWeight: "500" }}>Application Type</span>
              <Chart
                options={options6}
                series={series6}
                type="pie"
                width="460"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 3rd Chart End */}
    </div>
  );
};

export default IntakeRangeReportForProviderAdmin;
