import React, { useEffect, useState } from "react";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { useHistory } from "react-router";
import VideoList from "./VideoList";
import Pagination from "../../../Pagination/Pagination";
import Uget from "../../../../../helpers/Uget";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("active");
  const [isActive, setIsActive] = useState(true);

  const history = useHistory();
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [videoList, setVideoList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [checkBac, setCheckBac] = useState(false);

  const videoAndQuizFor = () => {
    history.push("/videoAndQuizFor");
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    let url = `ConsultantOnboarding/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}`;

    if (activeFilter === "active") {
      url += `&isActive=true`;
    }
    // For "all" filter, no isActive parameter is added
    Uget(url).then((res) => {
      setVideoList(res?.data);
      setEntity(res?.totalEntity);
    });
  }, [currentPage, dataPerPage, activeFilter]);

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
      <VideoList videoList={videoList} />
      <Pagination
        dataPerPage={dataPerPage}
        totalData={entity}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Index;
