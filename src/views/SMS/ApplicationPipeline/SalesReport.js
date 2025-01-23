import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import PipelineCard from "./Components/PipelineCard";
import { AiFillCaretDown } from "react-icons/ai";
import { pipelineDesign, applicationStatus } from "./DemoData";

const SalesReport = () => {
  const [funnelData, setFunnelData] = useState(applicationStatus);

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
          <p className="fs-16px fw-600 mb-3">Admissions Application Pipeline</p>

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
                              {data.applicationCount}
                            </span>
                            <span className="fs-12px"> Application</span>
                            <br />
                            <span className="fw-600 fs-16px">
                              {data.studentCount}
                            </span>
                            <span className="fs-12px"> Student</span>
                          </div>

                          <p className="mb-0">{data.title}</p>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : null}
              </div>
            ))}
        </CardBody>
      </Card>
    </>
  );
};

export default SalesReport;
