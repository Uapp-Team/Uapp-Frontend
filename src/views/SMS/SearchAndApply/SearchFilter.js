import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineLeft,
} from "react-icons/ai";
import DefaultDropdown from "../../../components/Dropdown/DefaultDropdown";
import { Input } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import CheckBoxByObj from "../../../components/form/CheckBoxByObj";
import MultiSelectU from "../../../components/form/MultiSelectU";
import CheckSwitch from "../../../components/form/CheckSwitch";
import {
  deliveryMethods,
  deliverySchedules,
  studyMode,
} from "../../../constants/presetData";
import MultiSelect from "../../../components/form/MultiSelect";

const SearchFilter = ({
  closeModal,
  isSearch,
  setIsSearch,
  institutionId,
  setInstitutionId,
  studyLevelId,
  setStudyLevelId,
  intakeId,
  setIntakeId,
  countryId,
  setCountryId,
  cityId,
  setCityId,
  tuitionFee,
  setTuitionFee,
  applicationTypeIds,
  setApplicationTypeIds,
  loans,
  setLoans,
  courseDurations,
  setCourseDurations,
  isScholarships,
  setIsScholarships,
  isAvailableCourses,
  setIsAvailableCourses,
  isWorkPlacement,
  setIsWorkPlacement,
  studyModes,
  setStudyModes,
  deliveryPattern,
  setDeliveryPattern,
  deliverySchedule,
  setDeliverySchedule,
  studyLevelQuery,
  setStudyLevelQuery,
  institutionName,
  setInstitutionName,
  countryName,
  setCountryName,
  cityName,
  setCityName,
  applicationTypelist,
  applicationType,
  setApplicationType,
  applicationTypeSelected,
  intakeList,
  setIntakeList,
  studyLevelList,
  setStudyLevelList,
  courseDurationsList,
  setCourseDurationsList,
}) => {
  const divRef = useRef(null);

  const [loanList, setLoanList] = useState([]);
  const isMobileDevice =
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    const checkHome = applicationTypeSelected.filter(
      (item) => item.name === "Home/UK"
    );
    const checkEu = applicationTypeSelected.filter(
      (item) => item.name === "EU/EEA"
    );
    const checkInt = applicationTypeSelected.filter(
      (item) => item.name === "International"
    );
    const checkLoan =
      checkHome?.length === 1 || checkEu?.length === 1
        ? [
            { id: 1, name: "Government Loan" },
            { id: 2, name: "Private Loan" },
          ]
        : checkHome?.length === 0 &&
          checkEu?.length === 0 &&
          checkInt?.length === 1
        ? [{ id: 2, name: "Private Loan" }]
        : null;

    setLoanList(checkLoan);
    loans.length > 0 && setLoans([]);
  }, [applicationTypeSelected]);

  useEffect(() => {
    const list = [];
    intakeList.map((item) => list.push(item.value));
    isMobileDevice && intakeId.length !== list.length && setIntakeId(list);
  }, [setIntakeId, intakeList, intakeId, isMobileDevice]);

  useEffect(() => {
    const list = [];
    applicationType.map((item) => list.push(item.value));
    applicationTypeIds.length !== list.length && setApplicationTypeIds(list);
  }, [applicationType, applicationTypeIds, setApplicationTypeIds]);

  useEffect(() => {
    const list = [];
    courseDurationsList.map((item) => list.push(item.value));
    courseDurations.length !== list.length && setCourseDurations(list);
  }, [setCourseDurations, courseDurationsList, courseDurations]);

  useEffect(() => {
    const list = [];
    studyLevelList.map((item) => list.push(item.value));
    isMobileDevice &&
      studyLevelId.length !== list.length &&
      setStudyLevelId(list);
  }, [isMobileDevice, setStudyLevelId, studyLevelId, studyLevelList]);

  useEffect(() => {
    const studyLevelListQuery = [];
    studyLevelId.map((item) =>
      studyLevelListQuery.push(`educationlevels=${item}`)
    );
    const converttostring = studyLevelListQuery.toString();
    const noSpaces = converttostring.replace(/ /g, "");
    const converted = noSpaces.replace(/,/g, "&");
    setStudyLevelQuery(converted);
  }, [setStudyLevelQuery, studyLevelId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsSearch(false);
      } else setIsSearch(true);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearch]);

  return (
    <>
      <div
        ref={divRef}
        className="right-side-modal overflowY"
        style={{
          width: isSearch ? "315px" : "32px",
          transition: "width 1s",
          background: isSearch
            ? "white"
            : "linear-gradient(90deg, rgba(242, 242, 242, 0.00) 0%, rgba(4, 93, 94, 0.20) 100%)",
          padding: isSearch ? "16px" : "1px",
        }}
      >
        {isSearch ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-30px">
              <h3>Filters</h3>
              <AiOutlineClose
                size={24}
                onClick={() => {
                  closeModal();
                }}
                className="pointer"
              />
            </div>

            <div className="mb-3">
              <p className="fw-500">Country</p>
              <DefaultDropdown
                label={countryName}
                setLabel={setCountryName}
                value={countryId}
                setValue={setCountryId}
                selectAll={true}
                all="All Country"
                url="UniversityCountry/Index"
              />
            </div>

            <div className="mb-3 d-block d-md-none">
              <p className="fw-500">Institution</p>
              <DefaultDropdown
                label={institutionName}
                setLabel={setInstitutionName}
                value={institutionId}
                setValue={setInstitutionId}
                selectAll={true}
                all="All Institution"
                url="UniversityDD/Index"
              />
            </div>
            <div className="mb-3 d-block d-md-none">
              <p className="fw-500">Study Level</p>

              <MultiSelect
                placeholder="Select Study Level"
                url="SearchFilter/EducationLevels"
                value={studyLevelList}
                setValue={setStudyLevelList}
              />
            </div>
            <div className="mb-3 d-block d-md-none">
              <p className="fw-500">Intake</p>

              <MultiSelect
                placeholder="Select Intake"
                url="SearchFilter/Intakes"
                value={intakeList}
                setValue={setIntakeList}
              />
            </div>

            <div className="mb-3">
              <p className="fw-500">Campus City</p>
              <DefaultDropdown
                label={cityName}
                setLabel={setCityName}
                value={cityId}
                setValue={setCityId}
                selectAll={true}
                all="All Campus"
                url={`UniversityCityDD/Index/${countryId}`}
              />
            </div>
            <div className="mb-3">
              <p className="fw-500">Tuition Fee (Max)</p>
              <Row className="align-items-center">
                <Col xs={5}>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setTuitionFee(e.target.value > 0 ? e.target.value : 0)
                    }
                    value={tuitionFee}
                    min={0}
                  />
                </Col>
                <Col xs={7}>
                  <Input
                    type="range"
                    className="custom-slider"
                    min={0}
                    max={100000}
                    value={tuitionFee}
                    onChange={(e) => setTuitionFee(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3">
              <p className="fw-500">Application Type </p>

              <MultiSelect
                placeholder="Select Application Type"
                dataList={applicationTypelist}
                value={applicationType}
                setValue={setApplicationType}
              />
            </div>

            <div className="border rounded p-16px mb-3 bg-white">
              <p className="fw-500">Loan available </p>

              <CheckBoxByObj
                register={() => {}}
                name="loans"
                list={loanList}
                defaultValue={loans}
                action={setLoans}
                className="mb-0"
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
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

              <MultiSelectU
                placeholder="Select Course Durations"
                url={
                  studyLevelId?.length > 0
                    ? `Duration/ByEducationLevels?${studyLevelQuery}`
                    : "Duration/Index"
                }
                value={courseDurationsList}
                setValue={setCourseDurationsList}
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
              <CheckSwitch
                register={() => {}}
                label="Scholarships Available"
                name=""
                defaultValue={isScholarships}
                action={() => setIsScholarships(!isScholarships)}
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
              <CheckSwitch
                register={() => {}}
                label="Show Available Courses Only"
                name=""
                defaultValue={isAvailableCourses}
                action={() => setIsAvailableCourses(!isAvailableCourses)}
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
              <CheckSwitch
                register={() => {}}
                label="Work Placement Options"
                name=""
                defaultValue={isWorkPlacement}
                action={() => setIsWorkPlacement(!isWorkPlacement)}
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
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

              <CheckBoxByObj
                register={() => {}}
                name="studyMode"
                list={studyMode}
                defaultValue={studyModes}
                action={setStudyModes}
                className="mb-0"
                colSize="col-6"
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
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

              <CheckBoxByObj
                register={() => {}}
                name="deliveryMethods"
                list={deliveryMethods}
                defaultValue={deliveryPattern}
                action={setDeliveryPattern}
                className="mb-0"
                colSize={["col-12", "col-6", "col-6"]}
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
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
              <CheckBoxByObj
                register={() => {}}
                name="deliverySchedules"
                list={deliverySchedules}
                defaultValue={deliverySchedule}
                action={setDeliverySchedule}
                className="mb-0"
                colSize={["col-6", "col-6", "col-6", "col-6", "col-12"]}
              />
            </div>
          </>
        ) : (
          <>
            <div className="pointer h-100">
              <AiOutlineLeft size={30} className="right-icon" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchFilter;
