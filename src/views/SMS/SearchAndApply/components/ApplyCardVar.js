import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { CiBag1, CiLocationOn, CiTimer } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import { Col, Row } from "reactstrap";
import BellIcon from "../../../../assets/icon/Bell.svg";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";
import get from "../../../../helpers/get";
import "../SearchAndApply.css";
import ApplyModal from "./ApplyModal";
import CustomToolTip from "./CustomToolTip";
import QuickViewModal from "./QuickViewModal";

const ApplyCardVar = ({ data, handleFavourite }) => {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [quickViewData, setQuickViewData] = React.useState({});
  const [eligibility, setEligibility] = React.useState({});
  const [openApplyModal, setOpenApplyModal] = React.useState(true);

  const handleQuickView = async (subjectId, universityId) => {
    const quickViewData = data.filter(
      (item) =>
        item.subjectId === subjectId && item.universityId === universityId
    );
    const eligibilityData = await get(
      `Eligibility/ShowEligibility/${universityId}/${subjectId}`
    );
    setEligibility(eligibilityData);
    setQuickViewData(quickViewData[0]);
    setOpen(true);
    setLoading(true);
  };
  const handleApply = () => {
    setOpenApplyModal(true);
  };
  return (
    <>
      <Row className="mt-3">
        {data?.length > 0 &&
          data?.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <div className="mb-3">
                <div className="card-container-vertical">
                  {item.intakeStatusId !== 1 && (
                    <span className="tbc">
                      TBC
                      <Tooltip
                        title={<span>To Be Continue</span>}
                        placement="top"
                        overlayClassName="custom-tooltip"
                      >
                        <InfoCircleOutlined
                          style={{
                            fontSize: "12px",
                            color: "#fff",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                        />
                      </Tooltip>
                    </span>
                  )}
                  <div className="card-header-vertical">
                    <span className="card-date">
                      <img src={BellIcon} alt="" /> {item.applicationDeadLine}
                    </span>
                    <div className="d-flex">
                      <div className="d-flex ml-4 align-items-center justify-content-center mx-2">
                        <LuSettings2 className="mr-3 cursor-pointer" />
                        <LuShare2 className="mr-3" />
                        {userType == 6 ? (
                          item.isFavorite ? (
                            <LuHeart
                              onClick={() =>
                                handleFavourite(item.subjectId, index)
                              }
                              color="red"
                              fill="red"
                              className="cursor-pointer"
                            />
                          ) : (
                            <LuHeart
                              onClick={() =>
                                handleFavourite(item.subjectId, index)
                              }
                              className="cursor-pointer"
                            />
                          )
                        ) : (
                          <div>
                            {item.intakeStatusId ? (
                              <img src={online} alt="" />
                            ) : (
                              <img src={offline} alt="" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-body-vertical">
                    <div className="card-content-vertical">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          className="h-48px w-48px mr-2"
                          src={
                            "https://localtest.uapp.uk/" +
                            item.universityLogoUrl
                          }
                          alt=""
                        />
                        <div className="d-flex flex-column">
                          <span className="fw-600 fs-14px">
                            {item.universityName}
                          </span>
                          <span className="fw-400 fs-12px">
                            {item.campusNames.split(",")[0].trim()}
                          </span>
                        </div>
                      </div>
                      <h3 className="card-title-vertical fw-700 fs-20px">
                        {item.subjectName}
                      </h3>
                      {/* <div className="tags">
                  <span className="card-tag fast-track">Fast Track</span>
                </div> */}
                      <div className="dashed-hr"></div>
                      <div>
                        <ul className="card-details-vertical">
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiLocationOn className="mr-2" />
                              <span>Location</span>
                            </span>
                            <CustomToolTip methodIds={item.campusNames} />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <MdPriceCheck className="mr-2" />
                              <span>Tuition (1st year)</span>
                            </span>
                            £{item.localTutionFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiBag1 className="mr-2" />
                              <span>Deposit</span>
                            </span>
                            £{item.depositFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <BiDonateBlood className="mr-2" />
                              <span>Application fee</span>
                            </span>
                            £{item.avarageApplicationFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiTimer className="mr-2" />
                              <span>Duration</span>
                            </span>
                            <CustomToolTip methodIds={item.durationNames} />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <FaPeopleGroup className="mr-2" />
                              <span>Study Mode</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.studyModes}
                              methods={studyMode}
                              title="Study Mode"
                            />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <VscFeedback className="mr-2" />
                              <span>Delivery Pattern</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.deliveryMethods}
                              methods={deliveryMethods}
                              title="Devlivery Pattern"
                            />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <SlCalender className="mr-2" />
                              <span>Intake</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.intakeNames}
                              title="Intakes"
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="dashed-hr"></div>
                      <div className="tags my-3">
                        {item.isWorkPlacementAvailable && (
                          <span className="card-tag work-placement mr-1">
                            Work Placement
                          </span>
                        )}
                        {item.isScholarshipAvailable && (
                          <span className="card-tag scholarship-available">
                            Scholarship Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      {userType == 13 && (
                        <div className="gross-vertical my-3">
                          <p className="d-flex flex-column">
                            <span className="fs-12px">Gross Earning</span>{" "}
                            <span className="fw-600">
                              £{item.commissionAmount}
                            </span>
                          </p>
                        </div>
                      )}
                      {/* <button className="probability-vertical">
                        Probability:{" "}
                        <Progress
                          type="circle"
                          percent={80}
                          width={35}
                          strokeColor="#FFAD0D"
                        />
                      </button> */}
                    </div>

                    <div className="card-action-vertical">
                      <button
                        className="quick-btn-vertical"
                        onClick={() =>
                          handleQuickView(item.subjectId, item.universityId)
                        }
                      >
                        Quick view
                      </button>
                      <button
                        className="apply-btn-vertical"
                        onClick={() => handleApply()}
                      >
                        Apply Now <RiArrowRightSLine />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      <QuickViewModal
        open={open}
        onClose={() => setOpen(false)}
        quickViewData={quickViewData}
        eligibility={eligibility}
      />
      <ApplyModal
        open={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
      />
    </>
  );
};

export default ApplyCardVar;
