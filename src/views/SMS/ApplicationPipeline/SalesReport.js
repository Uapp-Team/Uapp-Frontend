import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import PipelineCard from "./Components/PipelineCard";

const SalesReport = () => {
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

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
          {/* <h5>Admission Application Pipeline</h5> */}

          <div className="row align-items-center relative">
            <div className="col-12">
              <div class="scroll-container">
                <div id="scroll-left" className="scroll-left">
                  <button class="scroll-button ms-2">&#10094;</button>
                </div>
                0{" "}
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
                    className="text-center mt-4"
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

          {funnelData.map((card, index) => (
            <div key={index} className="mx-auto w-25 mt-4">
              {selectedCardIndex === index && (
                <div
                  className="p-16px rounded"
                  style={{
                    backgroundColor: admissionPipelineDesign[index].bgColor,
                    border: `1px solid ${admissionPipelineDesign[index].activeBgColor}`,
                  }}
                  // style={{
                  //   backgroundColor: "#F9FAFA",
                  //   border: "1px solid #367D7E",
                  //   minWidth: "350px",
                  // }}
                >
                  <p
                    className="14px fw-500"
                    style={{
                      color: admissionPipelineDesign[index].activeBgColor,
                    }}
                  >
                    {card.title}
                  </p>
                  <hr />
                  <Row>
                    <Col>
                      <span className="fw-600 fs-16px">894</span>
                      <p>Entry criterion not met</p>
                    </Col>
                    <Col>
                      <span className="fw-600 fs-16px">894</span>
                      <p>Entry criterion not met</p>
                    </Col>
                    <Col>
                      <span className="fw-600 fs-16px">894</span>
                      <p>Entry criterion not met</p>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default SalesReport;
