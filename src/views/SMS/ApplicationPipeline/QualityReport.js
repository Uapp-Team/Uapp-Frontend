import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import DefaultDropdown from "../../../components/Dropdown/DefaultDropdown";
import Filter from "../../../components/Dropdown/Filter";
import DateRange from "../../../components/form/DateRange";
import get from "../../../helpers/get";
import Uget from "../../../helpers/Uget";
import PipelineCard from "./Components/PipelineCard";
import StatusCard from "./Components/StatusCard";
import { qualityDesign } from "./DemoData";

const QualityReport = () => {
  const qualityPipeline = sessionStorage.getItem("qualityPipeline");
  const [funnelData, setFunnelData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(
    qualityPipeline?.selectedCardIndex !== null
      ? qualityPipeline?.selectedCardIndex
      : null
  );

  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState(
    qualityPipeline?.intakeRngLabel || "Select Intake"
  );
  const [intakeRngValue, setIntakeRngValue] = useState(
    qualityPipeline?.intakeRngValue || 0
  );
  const [intake, setIntake] = useState(qualityPipeline?.intake || 0);
  const [intakeLabel, setIntakeLabel] = useState(
    qualityPipeline?.intakeLabel || "Select Intake"
  );
  const [consultantValue, setConsultantValue] = useState(
    qualityPipeline?.consultantValue || 0
  );
  const [consultantLabel, setConsultantLabel] = useState(
    qualityPipeline?.consultantLabel || "Select Consultant"
  );
  const [selectedDates, setSelectedDates] = useState(
    qualityPipeline?.selectedDates || []
  );

  useEffect(() => {
    sessionStorage.setItem(
      "qualityPipeline",
      JSON.stringify({
        selectedCardIndex,
        intakeRngLabel,
        intakeRngValue,
        intake,
        intakeLabel,
        consultantValue,
        consultantLabel,
        selectedDates,
      })
    );
  }, [
    selectedCardIndex,
    intakeRngLabel,
    intakeRngValue,
    intake,
    intakeLabel,
    consultantValue,
    consultantLabel,
    selectedDates,
  ]);

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
    if (intakeRngValue > 0) {
      Uget(
        `ApplicationPipeline/QualityReport?accountIntakeId=${intakeRngValue}&intakeId=${intake}&fromApplicationDate=${
          selectedDates[0] ? selectedDates[0] : ""
        }&toApplicationDate=${
          selectedDates[1] ? selectedDates[1] : ""
        }&consultantTypeId=${consultantValue}`
      ).then((res) => {
        setFunnelData(res?.data);
      });
    }
  }, [intakeRngValue, intake, selectedDates, consultantValue]);

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
      <BreadCrumb title="Application Quality Report" />
      <Card>
        <CardBody>
          <Row>
            <Col lg={4}>
              <p className="fs-16px fw-600">Application Quality Report</p>
            </Col>
            <Col lg={8}>
              <div className="d-flex align-items-center justify-content-center gap-4px">
                <Filter
                  data={intakeRngDD}
                  label={intakeRngLabel}
                  setLabel={setIntakeRngLabel}
                  value={intakeRngValue}
                  setValue={setIntakeRngValue}
                  action={() => {}}
                  className="mr-2"
                />

                <DefaultDropdown
                  label={intakeLabel}
                  setLabel={setIntakeLabel}
                  value={intake}
                  setValue={setIntake}
                  url={`IntakeDD/get/${intakeRngValue}`}
                  name="intake"
                  action={(l, v) => setSelectedDates([])}
                />

                <DateRange
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  action={() => {
                    setIntake(0);
                    setIntakeLabel("Select Intake");
                  }}
                />

                <DefaultDropdown
                  placeholder="Select Type"
                  url="ConsultantTypeDD/Index"
                  label={consultantLabel}
                  setLabel={setConsultantLabel}
                  value={consultantValue}
                  setValue={setConsultantValue}
                  action={() => {}}
                  className="ml-2"
                />
              </div>
            </Col>
          </Row>
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
                      width="324.75px"
                      bgColor={qualityDesign[index].bgColor}
                      activeBgColor={qualityDesign[index].activeBgColor}
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
                    style={{ minWidth: "350px" }}
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
                              confidence={
                                index === 0 ? child?.confidenceLevel : null
                              }
                              parameters={child?.parameters}
                              bgColor={index === 0 ? "#ffff" : "#EDF2F2"}
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

export default QualityReport;
