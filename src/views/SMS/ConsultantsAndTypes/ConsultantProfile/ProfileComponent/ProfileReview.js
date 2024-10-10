import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Select from "react-select";
import { rootUrl } from "../../../../../constants/constants";
import get from "../../../../../helpers/get";
import StarRatings from "../../../Components/StarRatings";
import { userTypes } from "../../../../../constants/userTypeConstant";

const ProfileReview = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [ratingList, setRatingList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);
  const userId = localStorage.getItem("referenceId");
  const currentUser = localStorage.getItem("userType");

  // user select order
  const orderArr = [
    {
      label: "Most Recent",
      value: 1,
    },
    {
      label: "Most Relevant",
      value: 2,
    },
  ];
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber + 1);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    if (id !== undefined) {
      get(
        `ConsultantRating/GetByConsultant?page=${currentPage}&pageSize=${dataPerPage}&consultantid=${id}&orderby=${orderValue}`
      ).then((res) => {
        console.log("rating list", res);
        setRatingValue(res?.rating);
        setRatingList(res?.pagedModel?.models);
        setEntity(res?.pagedModel?.totalEntity);
      });
    } else {
      get(
        `ConsultantRating/GetByConsultant?page=${currentPage}&pageSize=${dataPerPage}&consultantid=${userId}&orderby=${orderValue}`
      ).then((res) => {
        console.log("rating list", res);
        setRatingValue(res?.rating);
        setRatingList(res?.pagedModel?.models);
        setEntity(res?.pagedModel?.totalEntity);
      });
    }
  }, [currentPage, id, callApi, orderValue, dataPerPage, userId]);

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <h5 className="d-flex align-items-center mr-3">
              <span className="mr-4">Reviews for this consultant</span>
              <i className="fas fa-star" style={{ color: "#FFB33E" }}></i>
              {/* <span className="mx-1"> 5</span> */}
              <span className="text-gray mx-1"> ({entity})</span>
            </h5>
          </div>
          {currentUser === userTypes?.Consultant.toString() ? null : (
            <div className="d-flex">
              <div>
                <Select
                  className="mr-md-2 mr-sm-0"
                  options={orderName}
                  value={{ label: orderLabel, value: orderValue }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="my-5">
          {ratingList?.map((rat, i) => (
            <div key={i} className="mb-5">
              <div className="d-flex">
                <div className="notice-image-style11">
                  <img src={rootUrl + rat?.imageUrl} alt="" />
                </div>
                <div className="ml-2">
                  <div className="d-flex flex-column mb-2">
                    <div>
                      <span className="notice-user-name">
                        {rat?.studentName}
                      </span>
                    </div>
                    <div className="d-flex">
                      <StarRatings
                        star={rat?.consultantRating?.overAllRating}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#707070",
                        }}
                      >
                        {rat?.time == "0" ? "Today" : rat?.time + "days ago"}
                      </span>
                    </div>
                  </div>

                  <span
                    className="notice-user-desc"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#495057",
                    }}
                  >
                    {rat?.consultantRating?.comment}
                    <br />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {ratingList?.totalEntity > 20 ? (
            <div
              onClick={() => paginate(currentPage)}
              className="text-center mt-5"
              style={{
                fontWeight: "400",
                fontSize: "14px",
                color: "#1e98b0",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              View more
            </div>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileReview;
