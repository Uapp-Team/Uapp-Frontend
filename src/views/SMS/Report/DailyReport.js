import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import get from "../../../helpers/get";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import Chart from "react-apexcharts";
import Calender from "../../../components/date/Calender";
import { currentDate } from "../../../components/date/calenderFormate";

const DailyReport = () => {
  const [chartData, setChartData] = useState([]);
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    get(`DailyReport/Report?dateTime=${date}`).then((res) => {
      const dataArray = [
        res?.totalApplication,
        res?.submittedToUniversity,
        res?.unconditionalOffer,
        res?.totalRegistered,
        res?.totalRejected,
      ];
      setChartData(dataArray);
    });
  }, [date]);

  return (
    <>
      <BreadCrumb title="Daily Report" backTo="" path="/" />
      <div className="animated fadeIn">
        <div className="uapp-dashboard">
          <div className="uapp-dashboard-activity">
            <Card className="p-3">
              <CardBody>
                <h5 className="mb-0">Daily Report</h5>

                <hr />

                <p className="mb-0" style={{ fontWeight: "500" }}>
                  {date !== null && date}
                </p>

                <Row>
                  <Col lg="8">
                    <Chart
                      type="bar"
                      width={"90%"}
                      height={300}
                      series={[
                        {
                          name: "total",
                          data: chartData,
                          // data: [30, 40, 45, 50, 39],
                        },
                      ]}
                      options={{
                        dataLabels: {
                          enabled: false,
                        },
                        plotOptions: {
                          bar: {
                            distributed: true,
                            horizontal: true,
                            barHeight: "90%",
                          },
                        },
                        xaxis: {
                          categories: [
                            "Total Application",
                            "Submitted to University",
                            "Unconditional Offer",
                            "Total Registered",
                            "Rejections",
                          ],
                        },
                        grid: {
                          yaxis: {
                            labels: {
                              style: {
                                fontSize: "15",
                                colors: ["#1e98b0"],
                              },
                            },
                            lines: {
                              show: false,
                            },
                          },
                        },
                        colors: [
                          "#24A1CD",
                          "#23CCB5",
                          "#AE75F8",
                          "#70E000",
                          "#F87675",
                        ],
                      }}
                    ></Chart>
                  </Col>

                  <Col lg="4">
                    <Calender action={setDate} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyReport;
