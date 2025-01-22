import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Card, Col, Row } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import Filter from "../../../components/Dropdown/Filter";
import DateRange from "../../../components/form/DateRange";
import PipelineCard from "./Components/PipelineCard";
import StatusCard from "./Components/StatusCard";

const AdmissionsPipeline = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showStages, setShowStages] = useState(false);
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const [consultantDD, setConsultantDD] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const dateFormat = "DD-MM-YYYY";
  const [selectedDates, setSelectedDates] = useState([]);
  const [funnelData, setFunnelData] = useState([
    {
      title: "Pre-application",
      applications: "5k",
      students: "234",
    },
    {
      title: "UAPP Compliance",
      applications: "5k",
      students: "234",
    },
    {
      title: "University processing",
      applications: "5k",
      students: "234",
    },
    {
      title: "Conditional Offer",
      applications: "5k",
      students: "234",
    },
    {
      title: "Pre-Offer Stage/Post",
      applications: "5k",
      students: "234",
    },
    {
      title: "Unconditional Offer",
      applications: "5k",
      students: "234",
    },
    {
      title: "Pre arrival Stage/Visa",
      applications: "5k",
      students: "234",
    },
    {
      title: "Registration",
      applications: "5k",
      students: "234",
    },
  ]);
  const admissionPipelineDesign = [
    {
      bgColor: "#E6F3FA",
      activeBgColor: "#007ACC",
    },
    {
      bgColor: "#FFF6CC",
      activeBgColor: "#E6C317",
    },
    {
      bgColor: "#FFEBD6",
      activeBgColor: "#FF7F11",
    },
    {
      bgColor: "#EAF8EB",
      activeBgColor: "#32A852",
    },
    {
      bgColor: "#FCE5E6",
      activeBgColor: "#E63946",
    },
    {
      bgColor: "#E3F6E3",
      activeBgColor: "#2CA02C",
    },
    {
      bgColor: "#ECEBFF",
      activeBgColor: "#6C63FF",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#005A9C",
    },
  ];

  const [statusCardData, setStatusCardData] = useState([
    {
      title: "20% Assessment",
      applications: "5k",
      students: "234",
    },
    {
      title: "40% Assessment",
      applications: "5k",
      students: "234",
    },
    {
      title: "60% Assessment",
      applications: "5k",
      students: "234",
    },
    {
      title: "80% Assessment",
      applications: "5k",
      students: "234",
    },
    {
      title: "100% Assessment",
      applications: "5k",
      students: "234",
    },
  ]);

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
      <BreadCrumb title="Admissions Pipeline" />
      <Card>
        <div className="p-24px">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-8px h-60px">
              <h5 className="fs-16px">Admission Application Pipeline</h5>
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
                  isDisabled={false}
                />
                <Filter
                  data={consultantDD}
                  label={consultantLabel}
                  setLabel={setConsultantLabel}
                  value={consultantValue}
                  setValue={setConsultantValue}
                  action={() => {}}
                  isDisabled={false}
                />
              </div>
            </div>

            <div className="row align-items-center">
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
                        applications={card.applications}
                        students={card.students}
                        width="154px"
                        bgColor={admissionPipelineDesign[index].bgColor}
                        activeBgColor={
                          admissionPipelineDesign[index].activeBgColor
                        }
                        isActive={selectedCardIndex === index ? true : false}
                        onClick={() => {
                          setShowStages(true);
                          setSelectedCardIndex(index);
                        }}
                      />
                    ))}
                  </div>

                  <div id="scroll-right" className="scroll-right">
                    <button class="scroll-button me-2">&#10095;</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-16px mt-16px">
              <div className="col-12">
                <div className="scroll-content scroll-arrow">
                  {funnelData.map((card, index) => (
                    <div
                      key={index}
                      style={{ minWidth: "170px" }}
                      className="text-center"
                    >
                      {selectedCardIndex === index && (
                        <AiFillCaretDown size={22} color="#7C7C7C" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* {showStages && (
              
            )} */}
            <>
              <div className="d-flex align-items-center h-48px ">
                <p className="fs-16px fw-600 align-self-center">
                  Pre-application Stage
                </p>
              </div>
              <div className="border p-2 rounded h-34px bg-F2EFED mb-3">
                <h5 className="fs-12px fw-500">New Application</h5>
              </div>
              <div>
                <Row>
                  {statusCardData.map((card, index) => (
                    <Col lg={4}>
                      <StatusCard
                        key={index}
                        title={card.title}
                        applications={card.applications}
                        students={card.students}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdmissionsPipeline;
