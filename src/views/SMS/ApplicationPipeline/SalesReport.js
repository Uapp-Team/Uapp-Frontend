import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import Filter from "../../../components/Dropdown/Filter";
import DateRange from "../../../components/form/DateRange";
import DDFilterByAppUrl from "../../../components/form/DDFilterByAppUrl";
import get from "../../../helpers/get";
import PipelineCard from "./Components/PipelineCard";
import StatusCard from "./Components/StatusCard";
import { applicationStatus, pipelineDesign } from "./DemoData";

const SalesReport = () => {
  const [funnelData, setFunnelData] = useState(applicationStatus);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const [intake, setIntake] = useState(0);
  const [consultantValue, setConsultantValue] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntakeRngValue(res?.id);
      setIntakeRngLabel(res?.intakeName);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-content");
    const scrollContainer2 = document.querySelector(".scroll-arrow");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");

    function checkScrollButtons() {
      if (scrollContainer.scrollLeft === 0) {
        scrollLeftButton.classList.add("hidden");
      } else {
        scrollLeftButton.classList.remove("hidden");
      }

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollRightButton.classList.add("hidden");
      } else {
        scrollRightButton.classList.remove("hidden");
      }
    }
    scrollLeftButton.addEventListener("click", () => {
      scrollContainer.scrollLeft -= 400; // Adjust the value as needed
      scrollContainer2.scrollLeft -= 400; // Adjust the value as needed
      checkScrollButtons();
    });

    scrollRightButton.addEventListener("click", () => {
      scrollContainer.scrollLeft += 400; // Adjust the value as needed
      scrollContainer2.scrollLeft += 400; // Adjust the value as needed
      checkScrollButtons();
    });

    scrollContainer.addEventListener("scroll", checkScrollButtons);
    // Initial check
    checkScrollButtons();
  }, [funnelData]);

  return (
    <>
      <BreadCrumb title="Sales Report" />
      <Card>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-8px">
            <p className="fs-16px fw-600">Sales Report</p>
            <div className="d-flex align-items-center justify-content-center gap-4px">
              <DateRange
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                formattedDate={dateFormat}
              />
              <Filter
                data={intakeRngDD}
                label={intakeRngLabel}
                setLabel={setIntakeRngLabel}
                value={intakeRngValue}
                setValue={setIntakeRngValue}
                action={() => {}}
                className="ml-2"
              />

              <DDFilterByAppUrl
                label=""
                placeholder="Select Intake"
                url="IntakeDD/Index"
                defaultValue={intake}
                action={setIntake}
                className="ml-2"
              />
              <DDFilterByAppUrl
                label=""
                placeholder="Select Consultant type"
                url="ConsultantTypeDD/Index"
                defaultValue={consultantValue}
                action={setConsultantValue}
                className="ml-2"
              />
            </div>
          </div>

          <div className="row align-items-center relative">
            <div className="col-12">
              <div class="scroll-container">
                <div id="scroll-left" className="scroll-left">
                  <button class="scroll-button ms-2">&#10094;</button>
                </div>

                <div className="scroll-content carved-div ">
                  {funnelData.map((card, index) => (
                    <PipelineCard
                      key={index}
                      title={card.title}
                      applications={card.applicationCount}
                      students={card.studentCount}
                      width="154px"
                      bgColor={pipelineDesign[index].bgColor}
                      activeBgColor={pipelineDesign[index].activeBgColor}
                      isActive={selectedCardIndex === index ? true : false}
                      onClick={() => setSelectedCardIndex(index)}
                    />
                  ))}
                </div>
                <div id="scroll-right" className="scroll-right">
                  <button class="scroll-button me-2">&#10095;</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-12">
              <div className="scroll-content scroll-arrow">
                {funnelData.map((card, index) => (
                  <div
                    key={index}
                    style={{ minWidth: "170px" }}
                    className="text-center mb-4"
                  >
                    {selectedCardIndex === index && (
                      <>
                        <AiFillCaretDown size={22} color="#7C7C7C" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {funnelData[selectedCardIndex]?.childs?.length > 1 &&
            funnelData?.map((card, index) => (
              <div key={index} className="d-flex">
                {selectedCardIndex === index ? (
                  <div
                    className="p-16px rounded"
                    style={{
                      backgroundColor: pipelineDesign[index].bgColor,
                      border: `1px solid ${pipelineDesign[index].activeBgColor}`,
                    }}
                  >
                    <p
                      className="14px fw-500"
                      style={{
                        color: pipelineDesign[index].activeBgColor,
                      }}
                    >
                      {card?.title}
                    </p>
                    <hr />
                    <Row>
                      {card?.childs.map((data, index) => (
                        <Col key={index}>
                          <div>
                            <span className="fw-600 fs-16px">
                              {data?.applicationCount}
                            </span>
                            <span className="fs-12px"> Application</span>
                            <br />
                            <span className="fw-600 fs-16px">
                              {data?.studentCount}
                            </span>
                            <span className="fs-12px"> Student</span>
                          </div>

                          <p className="mb-0">{data?.title}</p>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : null}
              </div>
            ))}

          {selectedCardIndex !== null && (
            <div>
              <p className="fs-16px fw-600 mt-5">
                {funnelData[selectedCardIndex]?.title}
              </p>
              {funnelData[selectedCardIndex]?.childs.length > 0 &&
                funnelData[selectedCardIndex]?.childs?.map((item, index) => (
                  <div key={index}>
                    <div className="p-2 rounded bg-F2EFED mb-3">
                      <span className="fw-500">{item?.title}</span>
                    </div>
                    <Row>
                      {item?.childs?.length > 0 &&
                        item?.childs.map((child, childIndex) => (
                          <Col lg={4} md={6} sm={12} key={childIndex}>
                            <StatusCard
                              title={child?.title}
                              applications={child?.applicationCount}
                              students={child?.studentCount}
                            />
                          </Col>
                        ))}
                    </Row>
                  </div>
                ))}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default SalesReport;
