import React, { useEffect, useRef } from "react";
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
  applicationType,
  intakeList,
  setIntakeList,
  studyLevelList,
  setStudyLevelList,
  courseDurationsList,
  setCourseDurationsList,
}) => {
  const divRef = useRef(null);

  useEffect(() => {
    const list = [];
    intakeList.map((item) => list.push(item.value));
    setIntakeId(list);
  }, [setIntakeId, intakeList]);

  useEffect(() => {
    const studyLevelListId = [];
    studyLevelList.map((item) => studyLevelListId.push(item.value));
    setStudyLevelId(studyLevelListId);
  }, [setStudyLevelId, studyLevelList]);

  useEffect(() => {
    const list = [];
    courseDurationsList.map((item) => list.push(item.value));
    setCourseDurations(list);
  }, [setCourseDurations, courseDurationsList]);

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

  const handleChange = (e) => {
    let id = parseInt(e.target.value);
    let val = e.target.checked;

    if (applicationTypeIds) {
      if (val === true) {
        if (!applicationTypeIds.includes(id)) {
          setApplicationTypeIds([...applicationTypeIds, id]);
        }
      } else {
        const newD = id;
        const res = applicationTypeIds.filter((c) => c !== newD);

        setApplicationTypeIds(res);
      }
    }
  };

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
                    onChange={(e) => setTuitionFee(e.target.value)}
                    value={tuitionFee}
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
            <div className="border rounded p-16px mb-3 bg-white">
              <p className="mb-1 fw-500">Application Type </p>

              {applicationType.map((item, i) => (
                <p key={i} className="mb-0">
                  <input
                    id={`AppType-${i}`}
                    value={item.id}
                    type="checkbox"
                    onClick={handleChange}
                    checked={applicationTypeIds?.includes(item.id)}
                  />
                  <label
                    htmlFor={`AppType-${i}`}
                    className="fs-14px mx-2 pointer"
                  >
                    {item.name}
                  </label>
                </p>
              ))}
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
