import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Filter from "../../../../components/Dropdown/Filter";
import {
  deliveryMethods,
  deliverySchedules,
  studyMode,
} from "../../../../constants/presetData";
import "../SearchAndApply.css";
import CustomToolTip from "./CustomToolTip";
import { Student } from "../../../../components/core/User";
import { rootUrl } from "../../../../constants/constants";

const ApplyModal = ({
  open,
  onClose,
  studentName,
  applyEligibility,
  quickViewData,
  handleSubmit,
}) => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const [programCard, setProgramCard] = useState(true);
  const [selectedStudyModeId, setSelectedStudyModeId] = useState();
  const [selectedCampusLabel, setSelectedCampusLabel] =
    useState("Select Campus");
  const [selectedCampusValue, setSelectedCampusValue] = useState("");
  const [selectedDurationsLabel, setSelectedDurationLabel] =
    useState("Select Duration");
  const [selectedDurationsValue, setSelectedDurationValue] = useState("");
  const [selectedDeliveryPatternId, setSelectedDeliveryPatternId] =
    useState("");
  const [selectedDeliveryScheduleId, setSelectedDeliveryScheduleId] =
    useState("");
  const [selectedIntakeId, setSelectedIntakeId] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("Select Intake");

  const isApplyDisabled = !(
    selectedIntakeId &&
    selectedCampusValue &&
    selectedDurationsValue &&
    selectedStudyModeId &&
    selectedDeliveryPatternId &&
    selectedDeliveryScheduleId
  );

  const handleHideProgramCard = () => {
    setProgramCard(!programCard);
  };

  useEffect(() => {
    if (open) {
      setSelectedIntakeId("");
      setSelectedCampusValue("");
      setSelectedCampusLabel("Select Campus");
      setSelectedDurationValue("");
      setSelectedDurationLabel("Select Duration");
      setSelectedStudyModeId("");
      setSelectedDeliveryPatternId("");
      setSelectedDeliveryScheduleId("");
    }
  }, [open]);
  return (
    <>
      <Modal isOpen={open} toggle={onClose} className="modal-lg">
        <div
          className="d-flex justify-content-between py-3 px-4"
          style={{
            background: "#F9FBFB",
          }}
        >
          <span className="fs-20px fw-600 text-515151">
            Apply For New Application
          </span>
          <CloseBtn action={onClose} />
        </div>
        <ModalBody className="p-4 modal-overflow">
          <div className="apply-modal">
            <div className="apply-modal-card">
              <div className="apply-modal__header">
                <img
                  className="h-48px w-48px mr-2"
                  src={rootUrl + quickViewData?.universityLogoUrl}
                  alt=""
                />
                <div className="d-flex flex-column">
                  <span className="fw-600 fs-14px">
                    {quickViewData?.universityName}
                  </span>
                  <span className="fw-400 fs-12px">
                    {quickViewData?.campusNames?.split(",")[0].trim()}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Row className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Course
                  </Col>
                  <Col xs={8} md={10} className="fw-600">
                    {quickViewData?.subjectName}
                  </Col>
                </Row>
                <Row className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Student
                  </Col>
                  <Col xs={8} md={10}>
                    {Student() ? current_user?.displayName : studentName}
                  </Col>
                </Row>
                <Row className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Intake{" "}
                    <InfoCircleOutlined
                      style={{
                        fontSize: "12px",
                        color: "#5D5D5D",
                        cursor: "pointer",
                      }}
                    />
                  </Col>
                  <Col xs={8} md={10}>
                    {selectedIntake}
                  </Col>
                </Row>
                <div className="dashed-hr"></div>
              </div>
              <div className="apply-modal-study">
                <div className="apply-modal-study__info">
                  <img className="h-24px w-24px " src={Tuition} alt="" />
                  <div className="fs-12px">Tution fees</div>
                  <div className="fs-14px">
                    £{quickViewData?.localTutionFee}
                  </div>
                </div>
                <div className="apply-modal-study__info">
                  <img className="h-24px w-24px" src={mortarboard} alt="" />
                  <div className="fs-12px">Scholarship</div>
                  <div className="fs-14px">10% or £5000</div>
                </div>
                <div className="apply-modal-study__info">
                  <img className="h-24px w-24px " src={Application} alt="" />
                  <div className="fs-12px">Application fees</div>
                  <div className="fs-14px">
                    £{quickViewData?.avarageApplicationFee}
                  </div>
                </div>
              </div>
              <div className="dashed-hr"></div>
              <div className="program-modal__info">
                <div className="program-modal__deadline">
                  Application deadline{" "}
                  <strong>{quickViewData?.applicationDeadLine}</strong>
                </div>
                <div className="program-modal__start">
                  Course Start Date <strong>25 Mar 2025</strong>
                </div>
                <div className="program-modal__duration">
                  <CiTimer className="mr-2" />
                  Duration{" "}
                  <CustomToolTip
                    methodIds={quickViewData?.durationNames}
                    title="Duration"
                  />
                </div>
              </div>
            </div>

            <Row className="program-modal__requirements">
              <div className="px-4">
                <div className="program-modal__eligibility">
                  <div className="program-modal__badge">You are eligible</div>
                  <div
                    className="cursor-pointer"
                    onClick={handleHideProgramCard}
                  >
                    Hide {programCard ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
              </div>
              {programCard && (
                <div className="program-modal__card">
                  <div className="program-modal__list">
                    <h4>Admission Requirements</h4>
                    {applyEligibility?.admissionRequirements?.length > 0 ? (
                      applyEligibility?.admissionRequirements?.map(
                        (item, index) => (
                          <ul key={index}>
                            <li>
                              {item?.isEligible === true ? (
                                <IoCheckmark
                                  fill="green"
                                  color="green"
                                  className="mr-2"
                                />
                              ) : (
                                <RxCross1
                                  fill="red"
                                  color="red"
                                  className="mr-2"
                                />
                              )}
                              {item?.details}
                            </li>
                          </ul>
                        )
                      )
                    ) : (
                      <ul>
                        <li>No Required qualification</li>
                      </ul>
                    )}
                  </div>
                  <div>
                    <div>
                      <h4>Student Qualification</h4>
                      {applyEligibility?.studentQualifications?.length > 0 ? (
                        applyEligibility?.studentQualifications?.map(
                          (item, index) => (
                            <ul key={index}>
                              <li>
                                {item?.isEligible === true ? (
                                  <IoCheckmark
                                    fill="green"
                                    color="green"
                                    className="mr-2"
                                  />
                                ) : (
                                  <RxCross1
                                    fill="red"
                                    color="red"
                                    className="mr-2"
                                  />
                                )}
                                {item}
                              </li>
                            </ul>
                          )
                        )
                      ) : (
                        <ul>
                          {" "}
                          <li>No Required qualification</li>{" "}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Row>

            {/* Dropdown & Selects */}
            <Row className="program-modal__intake my-3">
              <div className="fs-14px d-flex">
                <SlCalender className="mr-2 mt-1" />
                <p>Intake</p>
              </div>
              <div className="d-flex flex-wrap">
                {quickViewData?.intakes?.map((intake) => (
                  <span
                    key={intake.id}
                    className={`filter-button mr-2 mb-2 pointer ${
                      selectedIntakeId === intake.id
                        ? "filter-button-clicked"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedIntake(intake.name);
                      setSelectedIntakeId(intake.id);
                    }}
                  >
                    {intake.name}
                  </span>
                ))}
              </div>
            </Row>

            <Row className="program-modal__form-group">
              <label htmlFor="campus">Campus City</label>
              <Filter
                data={quickViewData?.campuses?.map((campus) => ({
                  name: campus.name,
                  id: campus.id,
                }))}
                label={selectedCampusLabel}
                setLabel={setSelectedCampusLabel}
                value={selectedCampusValue}
                setValue={setSelectedCampusValue}
                onChange={(label, value) => {
                  setSelectedCampusLabel(label);
                  setSelectedCampusValue(value);
                }}
              />
            </Row>

            <Row className="program-modal__form-group">
              <label htmlFor="duration">Course Durations</label>
              <Filter
                data={quickViewData?.durations?.map((duration) => ({
                  name: duration.name,
                  id: duration.id,
                }))}
                label={selectedDurationsLabel}
                setLabel={setSelectedDurationLabel}
                value={selectedDurationsValue}
                setValue={setSelectedDurationValue}
                onChange={(label, value) => {
                  setSelectedDurationLabel(label);
                  setSelectedDurationValue(value);
                }}
              />
            </Row>

            <Row className="program-modal__form-group">
              <label>Study Mode</label>
              <div className="program-modal__radio-group">
                {quickViewData?.studyModes
                  ?.split(",")
                  .map((id) => {
                    const method = studyMode.find(
                      (m) => m.id === parseInt(id.trim(), 10)
                    );
                    return method;
                  })
                  .filter(Boolean)
                  .map((method, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="mode"
                        value={method.id}
                        checked={selectedStudyModeId === method.id.toString()}
                        onChange={(e) => setSelectedStudyModeId(e.target.value)}
                      />
                      <span>{method.name}</span>
                    </label>
                  ))}
              </div>
            </Row>

            <Row className="program-modal__form-group">
              <label>Delivery Pattern</label>
              <div className="program-modal__radio-group">
                {quickViewData?.deliveryMethods
                  ?.split(",")
                  .map((id) => {
                    const method = deliveryMethods.find(
                      (m) => m.id === parseInt(id.trim(), 10)
                    );
                    return method;
                  })
                  .filter(Boolean)
                  .map((method, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="deliveryPattern"
                        value={method.id}
                        checked={
                          selectedDeliveryPatternId === method.id.toString()
                        }
                        onChange={(e) =>
                          setSelectedDeliveryPatternId(e.target.value)
                        }
                      />
                      <span>{method.name}</span>
                    </label>
                  ))}
              </div>
            </Row>

            <Row className="program-modal__form-group">
              <label>Delivery Schedule</label>
              <div className="program-modal__radio-group">
                {quickViewData?.deliverySchedules
                  ?.split(",")
                  .map((id) => {
                    const method = deliverySchedules.find(
                      (m) => m.id === parseInt(id.trim(), 10)
                    );
                    return method;
                  })
                  .filter(Boolean)
                  .map((method, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="deliverySchedule"
                        value={method.id}
                        checked={
                          selectedDeliveryScheduleId === method.id.toString()
                        }
                        onChange={(e) =>
                          setSelectedDeliveryScheduleId(e.target.value)
                        }
                      />
                      <span>{method.name}</span>
                    </label>
                  ))}
              </div>
            </Row>

            {/* Footer */}
            <Row className="program-modal__confirmation mb-3">
              <label>
                <input type="checkbox" className="mr-2" />
                Are you sure you want to apply this program?
              </label>
            </Row>
            <Row className="program-condition">
              <p className="pl-2">
                You can apply maximum 3 applications at a time for free.
              </p>
            </Row>

            <Row className="program-modal__footer">
              <button className="program-modal__cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                onClick={() =>
                  handleSubmit(
                    selectedCampusValue,
                    selectedStudyModeId,
                    selectedDeliveryPatternId,
                    selectedDeliveryScheduleId,
                    selectedDurationsValue,
                    selectedIntakeId
                  )
                }
                className={`apply-btn ${isApplyDisabled ? "disabled" : ""}`}
                disabled={isApplyDisabled}
              >
                Apply →
              </button>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ApplyModal;
