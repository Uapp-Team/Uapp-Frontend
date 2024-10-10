import React, { useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, Col, Row } from "reactstrap";
import AffiliateContentCard from "./AffiliateContentCard";
import SideModal from "./SideModal";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";

const AffiliateContent = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [userLable, setUserLable] = useState("Select user type");
  const [userValue, setUserValue] = useState(0);
  const [checkData, setCheckData] = useState([]);
  const [FileList, setFileList] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const changeHandler = (e) => {
    setFileList(e.target.files[0]);
    setDetailsModal(true);
    console.log(e.target.files);
  };

  return (
    <>
      <BreadCrumb title="Content" backTo="" path="/" />
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex justify-content-between mb-30px">
          <div>
            <span className="search-key">Promotional post</span>
            <span className="search-key">Social media cover</span>
            <span className="search-key">Email </span>
          </div>
          <div>
            <DefaultDropdownU
              label={userLable}
              setLabel={setUserLable}
              value={userValue}
              setValue={setUserValue}
              url="UserTypeDD/get-marketing-selects"
            />
            {/* <span className="search-key">
              {checkData.length} Download
              <i className="fas fa-arrow-down text-dark-green ml-2"></i>
            </span>
            <span className="search-key bg-orange-light mr-0">
              {checkData.length} Delete
              <i class="far fa-trash-alt ml-2"></i>
            </span> */}
          </div>
        </div>

        <Row>
          <Col xl={2} lg={3} md={4} sm={6}>
            <Card className="custom-card-border bg-theme">
              <label
                className="text-center pointer"
                style={{
                  margin: `82px 0`,
                }}
                htmlFor="content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M31.9997 21.3333V42.6666M42.6663 31.9999H21.333"
                    stroke="#367D7E"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M58.6663 31.9999C58.6663 17.2723 46.7271 5.33325 31.9997 5.33325C17.2721 5.33325 5.33301 17.2723 5.33301 31.9999C5.33301 46.7274 17.2721 58.6666 31.9997 58.6666C46.7271 58.6666 58.6663 46.7274 58.6663 31.9999Z"
                    stroke="#367D7E"
                    stroke-width="3.5"
                  />
                </svg>
              </label>
              <input
                name="content"
                id="content"
                type="file"
                hidden
                onChange={(e) => changeHandler(e)}
              />
            </Card>
          </Col>
          {data?.map((item, i) => (
            <Col xl={2} lg={3} md={4} sm={6} key={i}>
              <AffiliateContentCard
                item={item}
                i={i}
                checkData={checkData}
                setCheckData={setCheckData}
              />
            </Col>
          ))}
        </Row>
      </div>

      {detailsModal && FileList && (
        <SideModal
          title="Image Upload"
          closeModal={setDetailsModal}
          details={FileList}
          isDetails={false}
        />
      )}
    </>
  );
};

export default AffiliateContent;
