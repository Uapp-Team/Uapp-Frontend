import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Col, Modal, ModalBody, Row } from "reactstrap";
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
  const [programCard, setProgramCard] = useState(false);
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
  const [selectedIntake, setSelectedIntake] = useState("");
  const [selectedClassStartDate, setSelectedClassStartDate] = useState();
  const [selectedIntakeDeadLine, setSelectedIntakeDeadLine] = useState();

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

  useEffect(() => {
    if (open && quickViewData?.intakes?.length === 1) {
      setSelectedIntakeId(quickViewData?.intakes[0]?.id);
      setSelectedIntake(quickViewData?.intakes[0]?.name);
      setSelectedIntakeDeadLine(quickViewData?.intakes[0]?.applicationDeadLine);
      setSelectedClassStartDate(quickViewData?.intakes[0]?.classStartDate);
    }
  }, [open, quickViewData]);

  const handleClose = () => {
    setIsCheckboxChecked(false);
    setIsLoading(false);
    setProgramCard(false);
    setSelectedStudyModeId();
    setSelectedCampusLabel("Select Campus");
    setSelectedCampusValue("");
    setSelectedDurationLabel("Select Duration");
    setSelectedDurationValue("");
    setSelectedDeliveryPatternId("");
    setSelectedDeliveryScheduleId("");
    setSelectedIntakeId("");
    setSelectedIntake("");
    setSelectedClassStartDate();
    setSelectedIntakeDeadLine();
    onClose();
  };

  return (
    <>
      <Modal isOpen={open} toggle={handleClose} className="modal-lg">
        <div
          className="d-flex justify-content-between py-3 px-4"
          style={{
            background: "#F9FBFB",
          }}
        >
          <span className="fs-20px fw-600 text-515151">
            Apply For New Application
          </span>
          <CloseBtn action={handleClose} />
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
                  <Col
                    xs={8}
                    md={10}
                    className="apply-modal-details__title_ans"
                  >
                    {quickViewData?.subjectName}
                  </Col>
                </div>
                <div className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Student
                  </Col>
                  <Col
                    xs={8}
                    md={10}
                    className="apply-modal-details__title_ans"
                  >
                    {Student() ? current_user?.displayName : studentName}
                  </Col>
                </div>
                <div className="apply-modal-details">
                  <Col xs={4} md={2} className="apply-modal-details__title">
                    Intake{" "}
                    {quickViewData?.intakes?.length > 1 && (
                      <Tooltip
                        title={
                          <div className="custom-tooltip-content">
                            <span className="tooltip-method">
                              Please select intake first
                            </span>
                          </div>
                        }
                        placement="top"
                        overlayClassName="custom-tooltip"
                        color="white"
                      >
                        <InfoCircleOutlined
                          style={{
                            color: "#5D5D5D",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    )}
                  </Col>
                  <Col
                    xs={8}
                    md={10}
                    className="apply-modal-details__title_ans"
                  >
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
                {selectedIntakeId && (
                  <div className="program-modal__deadline">
                    <div className="d-flex">
                      <div className="mr-2">Application deadline </div>
                      <div>
                        {selectedIntakeDeadLine ? (
                          <strong>{selectedIntakeDeadLine}</strong>
                        ) : (
                          <strong>Not Found</strong>
                        )}
                      </div>
                    </div>
                    <div className="line-vr"></div>
                  </div>
                )}
                <div className="program-modal__start">Course Start Date </div>
                {selectedClassStartDate ? (
                  <>
                    <strong>{selectedClassStartDate}</strong>
                    <div className="line-vr"></div>
                  </>
                ) : (
                  <strong>Please select intake first</strong>
                )}
                <div className="line-vr"></div>
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
                <Row className="program-modal__card">
                  <Col className="program-modal__list">
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
                  </Col>

                  <div className="line-vr"></div>

                  <Col className="program-modal__list">
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
                  </Col>
                </Row>
              )}
            </div>

            {/* Dropdown & Selects */}
            <div className="program-modal__intake my-3">
              <p className="fw-500 d-flex align-items-center">
                <span className="mr-1">
                  <CalenderIcon />
                </span>
                <span> Select Intake</span>
              </p>

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
                        setSelectedIntakeDeadLine("");
                        setSelectedClassStartDate("");
                      } else {
                        // Select the intake
                        setSelectedIntake(intake.name);
                        setSelectedIntakeId(intake.id);
                        setSelectedIntakeDeadLine(intake.applicationDeadLine);
                        setSelectedClassStartDate(intake.classStartDate);
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

            {/* Campus City */}
            <div className="program-modal__form-group">
              <p className="fw-500">Campus City</p>
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

            {/* Study Mode */}
            <div className="program-modal__form-group">
              <p className="fw-500 d-flex align-items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.84961 4H15.152C15.6208 4 16.0008 4.38003 16.0008 4.84882V11.6275C16.0008 12.0963 15.6208 12.4763 15.152 12.4763H10"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.64897 7.50107C6.61577 7.50107 7.39951 6.71733 7.39951 5.75053C7.39951 4.78374 6.61577 4 5.64897 4C4.68218 4 3.89844 4.78374 3.89844 5.75053C3.89844 6.71733 4.68218 7.50107 5.64897 7.50107Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 9.02747C11.5 8.46001 11.04 8 10.4725 8H5.64893C4.18597 8 3 9.18596 3 10.6489V13H4.13525L4.51367 17H6.78418L7.65625 10.0549H10.4725C11.04 10.0549 11.5 9.59492 11.5 9.02747Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>Study Mode</span>
              </p>

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

            {/* Course Durations */}
            <div className="program-modal__form-group">
              <p className="fw-500 d-flex align-items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.3359 5.84668V10.9759L13.6699 12.6429"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.447 12.2585C17.5786 15.9345 14.2763 18.67 10.335 18.67C5.73171 18.67 2 14.9384 2 10.335C2 5.73171 5.73171 2 10.335 2C13.5507 2 16.3411 3.82102 17.7311 6.48808"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M18.6706 3.92383V7.1296H15.4648"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span> Course durations</span>
              </p>
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

            {/* Delivery Pattern */}
            <div className="program-modal__form-group">
              <p className="fw-500 d-flex align-items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3.48121 10.5327C4.11157 10.5327 4.62257 10.0217 4.62257 9.39137C4.62257 8.76101 4.11157 8.25 3.48121 8.25C2.85085 8.25 2.33984 8.76101 2.33984 9.39137C2.33984 10.0217 2.85085 10.5327 3.48121 10.5327Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.42578 13.4789C1.42941 13.1309 1.52119 12.7895 1.69253 12.4866C2.0536 11.8483 2.74706 11.443 3.48024 11.4414C4.21342 11.443 4.90688 11.8483 5.26795 12.4866C5.43929 12.7895 5.53106 13.1309 5.5347 13.4789"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5261 10.5327C11.1565 10.5327 11.6675 10.0217 11.6675 9.39137C11.6675 8.76101 11.1565 8.25 10.5261 8.25C9.89578 8.25 9.38477 8.76101 9.38477 9.39137C9.38477 10.0217 9.89578 10.5327 10.5261 10.5327Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.4707 13.4789C8.47434 13.1309 8.56611 12.7895 8.73745 12.4866C9.09852 11.8483 9.79198 11.443 10.5251 11.4414C11.2583 11.443 11.9518 11.8483 12.3128 12.4866C12.4842 12.7895 12.576 13.1309 12.5796 13.4789"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.999 4.04684C7.58741 4.04684 8.06441 3.56984 8.06441 2.98143C8.06441 2.39302 7.58741 1.91602 6.999 1.91602C6.41059 1.91602 5.93359 2.39302 5.93359 2.98143C5.93359 3.56984 6.41059 4.04684 6.999 4.04684Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.00781 6.71874C5.01134 6.38133 5.10032 6.05033 5.26645 5.75663C5.61655 5.13772 6.28893 4.7447 6.99982 4.74316C7.71071 4.7447 8.38309 5.13772 8.73319 5.75663C8.89932 6.05032 8.98831 6.38133 8.99183 6.71874"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.7818 0.544922H2.21823C1.82156 0.544922 1.5 0.866486 1.5 1.26315V6C1.5 6.39667 1.82156 6.71823 2.21823 6.71823H11.7818C12.1784 6.71823 12.5 6.39667 12.5 6V1.26315C12.5 0.866486 12.1784 0.544922 11.7818 0.544922Z"
                      stroke="#5D5D5D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span> Delivery Pattern</span>
              </p>

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

            {/* Delivery Schedule */}
            <div className="program-modal__form-group">
              <p className="fw-500 d-flex align-items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 6.66699V10.0003L11.25 11.2503"
                      stroke="#716F6E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.2885 13.7111C17.6522 14.4475 18.334 14.8157 18.334 15.4166C18.334 16.0176 17.6522 16.3858 16.2885 17.1221L15.3599 17.6236C14.3127 18.1891 13.7891 18.4719 13.5373 18.2663C12.9207 17.7628 13.8812 16.4634 14.1176 16.0031C14.3571 15.5366 14.3527 15.2882 14.1176 14.8302C13.8812 14.3699 12.9207 13.0705 13.5373 12.567C13.7891 12.3614 14.3127 12.6441 15.3599 13.2096L16.2885 13.7111Z"
                      stroke="#716F6E"
                      stroke-width="1.5"
                    />
                    <path
                      d="M10.8564 18.2903C10.5753 18.319 10.29 18.3337 10.0013 18.3337C5.39893 18.3337 1.66797 14.6027 1.66797 10.0003C1.66797 5.39795 5.39893 1.66699 10.0013 1.66699C14.6036 1.66699 18.3346 5.39795 18.3346 10.0003C18.3346 10.5711 18.2772 11.1285 18.168 11.667"
                      stroke="#716F6E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <span> Delivery Schedule</span>
              </p>
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
              <button className="program-modal__cancel" onClick={handleClose}>
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
