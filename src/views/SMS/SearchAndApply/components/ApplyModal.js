import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Col, Modal, ModalBody } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import { Student } from "../../../../components/core/User";
import Filter from "../../../../components/Dropdown/Filter";
import { rootUrl } from "../../../../constants/constants";
import {
  currency,
  deliveryMethods,
  deliverySchedules,
  studyMode,
} from "../../../../constants/presetData";
import "../SearchAndApply.css";
import CustomToolTip from "./CustomToolTip";
import { ArrowRightIcon, CalenderIcon, TimerIcon } from "./icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ApplyModal = ({
  open,
  onClose,
  studentName,
  applyEligibility,
  quickViewData,
  handleSubmit,
}) => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    isCheckboxChecked &&
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
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleApplyClick = async () => {
    setIsLoading(true);
    try {
      await handleSubmit(
        selectedCampusValue,
        selectedStudyModeId,
        selectedDeliveryPatternId,
        selectedDeliveryScheduleId,
        selectedDurationsValue,
        selectedIntakeId
      );
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
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
                <div className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Course
                  </Col>
                  <Col xs={8} md={10} className="fw-600">
                    {quickViewData?.subjectName}
                  </Col>
                </div>
                <div className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Student
                  </Col>
                  <Col xs={8} md={10}>
                    {Student() ? current_user?.displayName : studentName}
                  </Col>
                </div>
                <div className="apply-modal-details">
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
                </div>
                <div className="dashed-hr"></div>
              </div>
              <div className="apply-modal-study">
                <div className="apply-modal-study__info">
                  <img className="h-24px w-24px " src={Tuition} alt="" />
                  <div className="fs-12px">Tution fees</div>
                  <div className="fs-14px">
                    {currency(quickViewData.localTutionFeeCurrencyId)}
                    {quickViewData?.localTutionFee}
                  </div>
                </div>
                {quickViewData?.scholarshipDetails && (
                  <div className="apply-modal-study__info">
                    <img className="h-24px w-24px" src={mortarboard} alt="" />
                    <div className="fs-12px">Scholarship</div>
                    <div className="fs-14px">
                      {quickViewData?.scholarshipDetails}
                    </div>
                  </div>
                )}
                <div className="apply-modal-study__info">
                  <img className="h-24px w-24px " src={Application} alt="" />
                  <div className="fs-12px">Application fees</div>
                  <div className="fs-14px">
                    {currency(quickViewData.avarageApplicationFeeCurrencyId)}
                    {quickViewData?.avarageApplicationFee}
                  </div>
                </div>
              </div>
              <div className="dashed-hr"></div>
              <div className="program-modal__info">
                <div className="program-modal__deadline">
                  <strong>Application deadline </strong>
                  {selectedIntake !== "Select Intake"
                    ? quickViewData?.applicationDeadLine
                    : "Not Selected"}
                </div>
                <div className="line-vr"></div>
                {quickViewData?.classStartDate && (
                  <>
                    <div className="program-modal__start">
                      Course Start Date{" "}
                      <strong>{quickViewData?.classStartDate}</strong>
                    </div>
                    <div className="line-vr"></div>
                  </>
                )}
                <div className="program-modal__duration">
                  <span className="mr-2">
                    <TimerIcon />
                  </span>
                  <span className="mr-2">Duration </span>
                  <CustomToolTip
                    methodIds={quickViewData?.durationNames}
                    title="Duration"
                  />
                </div>
              </div>
            </div>

            <div className="program-modal__requirements">
              <div className="px-4">
                <div className="program-modal__eligibility">
                  <div className="program-modal__badge">You are eligible</div>
                  <div
                    className="cursor-pointer"
                    onClick={handleHideProgramCard}
                  >
                    {programCard ? (
                      <div className="d-flex align-items-center">
                        <span className="mr-2">Hide</span> <IoIosArrowUp />
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <span className="mr-2">Show</span> <IoIosArrowDown />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {programCard && (
                <div className="program-modal__card">
                  <div className="program-modal__list">
                    <div className="fw-600 mb-1">Admission Requirements</div>
                    {applyEligibility?.admissionRequirements?.length > 0 ? (
                      applyEligibility?.admissionRequirements?.map(
                        (item, index) => (
                          <div key={index}>
                            <span>
                              {item?.isEligible === true ? (
                                <IoCheckmark
                                  size={16}
                                  fill="green"
                                  color="green"
                                  className="mr-2"
                                />
                              ) : (
                                <RxCross1
                                  size={16}
                                  fill="red"
                                  color="red"
                                  className="mr-2"
                                />
                              )}
                              {item?.details}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <div>
                        <span>No Required qualification</span>
                      </div>
                    )}
                  </div>

                  <div className="line-vr"></div>

                  <div className="program-modal__list">
                    <div className="fw-600 mb-1">Student Qualification</div>
                    {applyEligibility?.studentQualifications?.length > 0 ? (
                      applyEligibility?.studentQualifications?.map(
                        (item, index) => (
                          <div key={index}>
                            <span>
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
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <div>
                        {" "}
                        <span>No Required qualification</span>{" "}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown & Selects */}
            <div className="program-modal__intake my-3">
              <div className="fs-14px d-flex">
                <div className="mr-1">
                  <CalenderIcon />
                </div>
                <p>Select Intake</p>
              </div>
              <div className="d-flex flex-wrap justify-centent-between align-item-center">
                {quickViewData?.intakes?.map((intake) => (
                  <span
                    key={intake.id}
                    className={`filter-button mr-2 mb-2 pointer ${
                      selectedIntakeId === intake.id
                        ? "filter-button-clicked"
                        : ""
                    }`}
                    onClick={() => {
                      if (selectedIntakeId === intake.id) {
                        // Deselect the intake if it's already selected
                        setSelectedIntake("Select Intake");
                        setSelectedIntakeId("");
                      } else {
                        // Select the intake
                        setSelectedIntake(intake.name);
                        setSelectedIntakeId(intake.id);
                      }
                    }}
                  >
                    <span>{intake.name}</span>
                    <span>
                      {selectedIntakeId === intake.id && (
                        <RxCross1
                          className="ml-2 pointer"
                          onClick={() => {
                            setSelectedIntake("Select Intake");
                            setSelectedIntakeId("");
                          }}
                        />
                      )}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="program-modal__form-group">
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
            </div>

            <div className="program-modal__form-group">
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
            </div>

            <div className="program-modal__form-group">
              <label>Study Mode</label>
              <div className="program-modal__radio-group">
                {Array.from(
                  new Set(
                    (quickViewData?.durations || []).map((duration) =>
                      Number(duration.studyMode)
                    )
                  )
                )
                  .map((id) => studyMode.find((mode) => mode.id === id))
                  .filter(Boolean)
                  .map((method) => (
                    <label key={method.id}>
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
            </div>

            <div className="program-modal__form-group">
              <label htmlFor="duration">Course Durations</label>
              <Filter
                data={(quickViewData?.durations || [])
                  .filter(
                    (duration) => duration.studyMode === selectedStudyModeId
                  )
                  .map((duration) => ({
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
            </div>

            <div className="program-modal__form-group">
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
            </div>

            {/* Footer */}
            <div className="program-modal__confirmation mb-3">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                />
                Are you sure you want to apply this program?
              </label>
            </div>
            <div className="program-condition">
              <p className="pl-2">
                You can apply maximum 3 applications at a time for free.
              </p>
            </div>

            <div className="program-modal__footer">
              <button className="program-modal__cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                onClick={handleApplyClick}
                className={`apply-btn ${
                  isApplyDisabled || isLoading ? "disabled" : ""
                }`}
                disabled={isApplyDisabled || isLoading}
              >
                {isLoading ? (
                  <Spin indicator={antIcon} size="small" />
                ) : (
                  <span className="fw-600">
                    Apply <ArrowRightIcon />
                  </span>
                )}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ApplyModal;
