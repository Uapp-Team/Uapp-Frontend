import React, { useState } from "react";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { useHistory } from "react-router";
import VideoList from "./VideoList";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("active");
  const history = useHistory();

  const videoAndQuizFor = () => {
    history.push("/videoAndQuizFor");
  };

  return (
    <div>
      <div>
        <h3 className="guided-title">Consultant guided video</h3>
      </div>
      <div className="video-header">
        <div className="guided-buttons">
          <button
            className={`guided-btn ${
              activeFilter === "active" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("active")}
          >
            Active
          </button>
          <button
            className={`guided-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
        </div>
        <div>
          {/* <button className="add-video-btn">Add video</button> */}
          <ButtonForFunction
            func={videoAndQuizFor}
            className={"btn btn-uapp-add "}
            name={"Add Video"}
            permission={6}
          />
        </div>
      </div>
      <div className="separator mb-4"></div>
      <VideoList />
    </div>
  );
};

export default Index;
