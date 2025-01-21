import { CaretDownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Card } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import FunnelCard from "./Components/FunnelCard";

const AdmissionsPipeline = () => {
  const [stageArrow, setStageArrow] = useState(false);
  const [funnelData, setFunnelData] = useState([
    {
      title: "Pre-application",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: true,
      backgroundColor: "#E6F3FA",
      height: "280px",
      rotateY: "10deg",
    },
    {
      title: "UAPP Compliance",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#FFF6CC",
      height: "270px",
      rotateY: "9deg",
    },
    {
      title: "University processing",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#FFEBD6",
      height: "260px",
      rotateY: "8deg",
    },
    {
      title: "Conditional Offer",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#EAF8EB",
      height: "250px",
      rotateY: "7deg",
    },
    {
      title: "Pre-Offer Stage/Post",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#FCE5E6",
      height: "240px",
      rotateY: "6deg",
    },
    {
      title: "Unconditional Offer",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#E3F6E3",
      height: "230px",
      rotateY: "5deg",
    },
    {
      title: "Registration",
      count: "5k",
      applicationsLabel: "Applications",
      studentsLabel: "234 Student",
      isActive: false,
      backgroundColor: "#D6E9F5",
      height: "220px",
      rotateY: "4deg",
    },
  ]);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Track the clicked card index

  // Function to handle card click
  const handleCardClick = (index) => {
    setSelectedCardIndex(index); // Set the clicked card index
    setStageArrow(true);
    setFunnelData((prevData) =>
      prevData.map((card, i) => ({
        ...card,
        isActive: i === index, // Mark the clicked card as active
      }))
    );
  };

  return (
    <>
      <BreadCrumb title="Admissions Pipeline" />
      <div className="animated fadeIn">
        <Card className="p-3">
          <h5>Admission Application Pipeline</h5>
          <div>
            <div className="funnel-container">
              {funnelData.map((card, index) => (
                <FunnelCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  applicationsLabel={card.applicationsLabel}
                  studentsLabel={card.studentsLabel}
                  isActive={card.isActive}
                  backgroundColor={card.backgroundColor}
                  height={card.height}
                  rotateY={card.rotateY}
                  onClick={() => handleCardClick(index)}
                  stageArrow={stageArrow}
                />
              ))}
            </div>
            {/* Display the arrow icon only for the active card */}
            {selectedCardIndex !== null && selectedCardIndex !== undefined && (
              <div className="p-5">
                <CaretDownOutlined style={{ fontSize: "30px" }} />
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdmissionsPipeline;
