import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  FormGroup,
  Table,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
  Input,
} from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import get from "../../../helpers/get";
import Chart from "react-apexcharts";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const DailyReport = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("dateeeee", startDate);
    get(`DailyReport/Report?dateTime=${startDate}`).then((res) => {
      console.log(res);

      const dataArray = [
        res?.totalApplication,
        res?.submittedToUniversity,
        res?.unconditionalOffer,
        res?.totalRegistered,
        res?.totalRejected,
      ];
      setChartData(dataArray);
    });
  }, [startDate]);

  console.log("Chart data", chartData);

  return (
    <div>
      <BreadCrumb title="Daily Report" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-2">
              <Input
                type="date"
                className="daily-report-daepicker-style"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 ml-2">
            <span
              style={{ color: "#1e98b0", fontWeight: "500", fontSize: "16px" }}
            >
              {" "}
              Showing for: {startDate}
            </span>
          </div>

          {/* bar chart implementation start */}

          <div className="text-center">
            <Chart
              type="bar"
              width={"80%"}
              height={300}
              series={[
                {
                  name: "total",
                  data: chartData,
                },
              ]}
              options={{
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    barHeight: "60",
                  },
                },
                colors: ["#1e98b0"],
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
                      style: { fontSize: "15", colors: ["#1e98b0"] },
                    },
                    lines: {
                      show: false,
                    },
                  },
                },
              }}
            ></Chart>
          </div>

          {/* bar chart implementation end */}
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyReport;
