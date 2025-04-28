import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
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
  intakeList,
  setIntakeList,
  studyLevelList,
  setStudyLevelList,
  courseDurationsList,
  setCourseDurationsList,
}) => {
  const divRef = useRef(null);

  const [loanList, setLoanList] = useState([]);
  console.log(applicationTypelist);
  const multiOption = (list) =>
    list?.map((item) => ({
      name: item?.label,
      id: item?.value,
    }));

  useEffect(() => {
    const listData =
      applicationType.length > 0
        ? multiOption(applicationType)
        : applicationTypelist;

    const checkHome = listData.filter((item) => item.name === "Home/UK");
    const checkEu = listData.filter((item) => item.name === "EU/EEA");
    const checkInt = listData.filter((item) => item.name === "International");
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
    setLoans([]);
    // loans.length > 0 && setLoans([]);
    // loans.length !== loanList.length && setLoans([]);
  }, [applicationType, applicationTypelist]);

  // useEffect(() => {
  //   const filteredArray = loanList.filter((item) => loans.includes(item.id));
  //   console.log(filteredArray);
  //   filteredArray.length > 0 ? setLoans(filteredArray) : setLoans([]);
  // }, [loanList, loans, setLoans]);

  useEffect(() => {
    const list = [];
    intakeList.map((item) => list.push(item.value));
    intakeId.length !== list.length && setIntakeId(list);
  }, [setIntakeId, intakeList, intakeId]);

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
    studyLevelId.length !== list.length && setStudyLevelId(list);
  }, [setStudyLevelId, studyLevelId, studyLevelList]);

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
          width: isSearch ? "315px" : "30px",
          transition: "width 1s",
          backgroundColor: isSearch ? "white" : "#B3B3B3",
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

            <div className="mb-3 d-block d-md-none">
              <p className="mb-1 fw-500">Country</p>
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
              <p className="mb-1 fw-500">Institution</p>
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
              <p className="mb-1 fw-500">Study Level</p>

              <MultiSelect
                placeholder="Select Study Level"
                url="SearchFilter/EducationLevels"
                value={studyLevelList}
                setValue={setStudyLevelList}
              />
            </div>
            <div className="mb-3 d-block d-md-none">
              <p className="mb-1 fw-500">Intake</p>

              <MultiSelect
                placeholder="Select Intake"
                url="SearchFilter/Intakes"
                value={intakeList}
                setValue={setIntakeList}
              />
            </div>

            <div className="mb-3">
              <p className="mb-1 fw-500">Campus City</p>
              <DefaultDropdown
                label={cityName}
                setLabel={setCityName}
                value={cityId}
                setValue={setCityId}
                url={`UniversityCityDD/Index/${countryId}`}
              />
            </div>
            <div className="mb-3">
              <p className="mb-1 fw-500">Tuition Fee (Max)</p>
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
              <p className="mb-1 fw-500">Application Type </p>

              <MultiSelect
                placeholder="Select Application Type"
                dataList={applicationTypelist}
                value={applicationType}
                setValue={setApplicationType}
              />
            </div>

            <div className="border rounded p-16px mb-3 bg-white">
              <p className="mb-1 fw-500">Loan available </p>

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
              <p className="mb-1 fw-500">Course durations </p>

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
              <p className="mb-1 fw-500">Study Mode  </p>
              <CheckBoxByObj
                register={() => {}}
                name="studyMode"
                list={studyMode}
                defaultValue={studyModes}
                action={setStudyModes}
                className="mb-0"
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
              <p className="mb-1 fw-500">Delivery Pattern </p>
              <CheckBoxByObj
                register={() => {}}
                name="deliveryMethods"
                list={deliveryMethods}
                defaultValue={deliveryPattern}
                action={setDeliveryPattern}
                className="mb-0"
              />
            </div>
            <div className="border rounded p-16px mb-3 bg-white">
              <p className="mb-1 fw-500">Delivery Schedule </p>
              <CheckBoxByObj
                register={() => {}}
                name="deliverySchedules"
                list={deliverySchedules}
                defaultValue={deliverySchedule}
                action={setDeliverySchedule}
                className="mb-0"
              />
            </div>
          </>
        ) : (
          <>
            <div className="right-icon pointer">
              <AiOutlineArrowLeft size={20} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchFilter;
