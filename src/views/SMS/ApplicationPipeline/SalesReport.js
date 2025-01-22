import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import PipelineCard from "./Components/PipelineCard";
import { AiFillCaretDown } from "react-icons/ai";

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

  const piplineDesign = [
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
    },
    {
      bgColor: "#D6E9F5",
      activeBgColor: "#D6E9F5",
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
          <h5>Admission Application Pipeline</h5>

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
                      bgColor={piplineDesign[index].bgColor}
                      activeBgColor={piplineDesign[index].activeBgColor}
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
        </CardBody>
      </Card>
    </>
  );
};

export default SalesReport;
