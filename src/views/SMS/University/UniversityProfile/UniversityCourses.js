import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Col, Row } from "reactstrap";

import { Link } from "react-router-dom/cjs/react-router-dom";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import { userTypes } from "../../../../constants/userTypeConstant";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { useToasts } from "react-toast-notifications";
import UniversityProgram from "./UniversityProgram";
import TagButton from "../../../../components/buttons/TagButton";

const UniversityCourses = ({ id, UniversityId }) => {
  const [deptLabel, setDeptLabel] = useState("Department");
  const [deptValue, setDeptValue] = useState(0);
  const [subDeptLabel, setSubDeptLabel] = useState("Sub Department");
  const [subDeptValue, setSubDeptValue] = useState(0);
  const [eduLabel, setEduLabel] = useState("Education Level");
  const [eduValue, setEduValue] = useState(0);
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [showLocal, setShowLocal] = useState(true);
  const [showEU, setShowEU] = useState(true);
  const [showInt, setShowInt] = useState(true);
  const [studentDataValue, setStudentDataValue] = useState(
    userType === userTypes?.Student.toString()
      ? localStorage.getItem("referenceId")
      : 0
  );
  const [departmentList, setDepartmentList] = useState([]);
  const [subDeptList, setSubDeptList] = useState([]);
  const [eduLevelList, setEduLevelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(20);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const { addToast } = useToasts();
  const [campusValue, setCampusValue] = useState(0);

  const [intakeValue, setIntakeValue] = useState(0);
  const [programValue, setProgramValue] = useState(0);

  const [departmentValue, setDepartmentValue] = useState(0);
  const [subValue, setSubValue] = useState(0);
  const [dataSizeLabel, setDataSizeLabel] = useState("20");
  const [dataSizeValue, setDataSizeValue] = useState(20);
  const [sortLabel, setSortLabel] = useState("A-Z");
  const [sortValue, setSortValue] = useState(1);
  const [checkActiveTab, setCheckActiveTab] = useState(true);
  const [programName, setProgramName] = useState("");
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalIntake, setModalIntake] = useState([]);
  const [modalIntakeLabel, setModalIntakeLabel] = useState("Select Intake");
  const [modalIntakeValue, setModalIntakeValue] = useState(0);
  const [modalDeliveryPattern, setModalDeliveryPattern] = useState([]);
  const [modalDeliveryPatternLabel, setModalDeliveryPatternLabel] = useState(
    "Select Delivery Pattern"
  );
  const [modalDeliveryPatternValue, setModalDeliveryPatternValue] = useState(0);
  const [modalCampusLabel, setModalCampusLabel] = useState("Select Campus");
  const [modalCampusValue, setModalCampusValue] = useState(0);
  const [currentData, setCurrentData] = useState({});

  const [modalCampus, setModalCampus] = useState([]);
  const [primaryCampus, setPrimaryCampus] = useState({});
  const [applicationCount, setApplicationCount] = useState(0);
  const [eligibleModal, setEligibleModal] = useState(false);
  const [elans, setElAns] = useState({});
  const [eligibilityWhileAppying, setEligibilityWhileApplying] = useState({});
  const [elStatus, setElStatus] = useState({});
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    get(`DepartmentDD/index`).then((res) => {
      console.log("department", res);
      setDepartmentList(res);
    });

    get(`EducationLevelDD/index`).then((res) => {
      console.log("eduLevel", res);
      setEduLevelList(res);
    });
  }, []);

  useEffect(() => {
    get(
      `Subject/ProfileTableShowPaged?page=${currentPage}&pageSize=${dataPerPage}&educationLevelId=${eduValue}&universityId=${id}&departmentId=${deptValue}&subdepartmentid=${subDeptValue}`
    ).then((res) => {
      setCourseList(res?.models);
      setEntity(res?.totalEntity);
    });
  }, [currentPage, dataPerPage, eduValue, deptValue, subDeptValue]);

  const deptDD = departmentList?.map((dept) => ({
    label: dept?.name,
    value: dept?.id,
  }));

  const selectDept = (label, value) => {
    setDeptLabel(label);
    setDeptValue(value);
    setSubDeptLabel("Sub Department");
    setSubDeptValue(0);
    get(`SubDepartmentDD/index/${value}`).then((res) => {
      console.log("Subdepartment", res);
      setSubDeptList(res);
    });
  };

  const subDeptDD = subDeptList?.map((subDept) => ({
    label: subDept?.name,
    value: subDept?.id,
  }));

  const selectSubDept = (label, value) => {
    setSubDeptLabel(label);
    setSubDeptValue(value);
  };

  const eduDD = eduLevelList?.map((edu) => ({
    label: edu?.name,
    value: edu?.id,
  }));

  const selectEdu = (label, value) => {
    setEduLabel(label);
    setEduValue(value);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setDeptLabel("Department");
    setDeptValue(0);
    setSubDeptLabel("Sub Department");
    setSubDeptValue(0);
    setSubDeptList([]);
    setEduLabel("Education Level");
    setEduValue(0);
    setCallApi((prev) => !prev);
  };

  const addToWishList = (data) => {
    get(
      `wishlist/add/${
        userType === userTypes?.Student
          ? localStorage.getItem("referenceId")
          : studentDataValue
      }/${data?.subjectId}`
    ).then((res) => {
      if (res == null) {
        addToast("Course already exists in wishlist", {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (res === true) {
        addToast("Added to your wishlist", {
          appearance: "success",
          autoDismiss: true,
        });
      } else if (res === false) {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
  const toggleModal = (data, data2) => {
    console.log(data2);
    setModalCampus(data?.campuses);
    setModalIntake(data?.intakes);
    setModalDeliveryPattern(data?.deliveryPatterns);
    setCurrentData(data);
    setPrimaryCampus(data?.campuses.find((s) => s.campusId === campusValue));
    checkEligibilityWhileApplying(data2, data);

    setModal(true);
  };

  const checkEligibilityWhileApplying = (info, subjectInfo) => {
    get(
      `Eligibility/CheckEligibility/${info?.universityId}/${
        subjectInfo?.subjectId
      }/${localStorage.getItem("referenceId")}`
    ).then((res) => {
      setEligibilityWhileApplying(res);
    });

    get(
      `Eligibility/ShowEligibility/${info?.universityId}/${subjectInfo?.subjectId}`
    ).then((res) => {
      setElStatus(res);
    });
  };

  const handleReset = () => {
    setSubDeptValue(0);
    setSubDeptLabel("Select Department");
    setDeptValue(0);
    setDeptLabel("Department");
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  return (
    <>
      {/* <div className="courseFilterCard">
              <div style={{paddingTop: "28px"}} className="row justify-content-center">
              <div className="col-12 col-md-2">
                <span className="courseFilterCardHeader">Courses</span>
              </div>
              <div className="col-12 col-md-3">
                <Select
                  
                  value={{ label: subjectLabel, value: subjectValue }}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  value={{ label: studyLevelLabel, value: studyLevelValue }}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                />
              </div>
              <div className="col-12 col-md-3">
                <Select
                  value={{ label: intakeLabel, value: intakeValue }}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                />
              </div>
            </div>
            </div> */}

      <div className="uapp-employee-search mt-4 mb-10px">
        <div className="custom-card-border p-4">
          <>
            {" "}
            <div className="row">
              <div className="col-12 col-md-4 my-1">
                <Select
                  options={deptDD}
                  value={{ label: deptLabel, value: deptValue }}
                  onChange={(opt) => selectDept(opt.label, opt.value)}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                  // isDisabled={univerTypeId !== undefined ? true : false}
                />
              </div>
              <div className="col-12 col-md-4 my-1">
                <Select
                  options={subDeptDD}
                  value={{ label: subDeptLabel, value: subDeptValue }}
                  onChange={(opt) => selectSubDept(opt.label, opt.value)}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                  // isDisabled={univerTypeId !== undefined ? true : false}
                />
              </div>
              <div className="col-12 col-md-4 my-1">
                <Select
                  options={eduDD}
                  value={{ label: eduLabel, value: eduValue }}
                  onChange={(opt) => selectEdu(opt.label, opt.value)}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                  // isDisabled={univerTypeId !== undefined ? true : false}
                />
              </div>
            </div>
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <div className="mt-1 mx-1" style={{ display: "flex" }}>
                    {deptValue !== 0 || subDeptValue !== 0 || eduValue !== 0
                      ? ""
                      : ""}
                    {deptValue !== 0 ? (
                      <TagButton
                        label={deptLabel}
                        setValue={() => setDeptValue(0)}
                        setLabel={() => setDeptLabel("Department")}
                      ></TagButton>
                    ) : (
                      ""
                    )}{" "}
                    {deptValue !== 0 &&
                      (subDeptValue !== 0 || eduValue !== 0 ? "" : "")}
                    {subDeptValue !== 0 ? (
                      <TagButton
                        label={subDeptLabel}
                        setValue={() => setSubDeptValue(0)}
                        setLabel={() => setSubDeptLabel("Sub Department")}
                      />
                    ) : (
                      ""
                    )}
                    {subDeptValue !== 0 && eduValue !== 0 ? "" : ""}
                    {eduValue !== 0 ? (
                      <TagButton
                        label={eduLabel}
                        setValue={() => setEduValue(0)}
                        setLabel={() => setEduLabel("Education Level")}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mt-1 mx-0 d-flex btn-clear">
                    {deptValue !== 0 || subDeptValue !== 0 || eduValue !== 0 ? (
                      <button className="tag-clear" onClick={handleClearSearch}>
                        Clear All
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </>
          <>
            <UniversityProgram
              courseList={courseList}
              UniversityId={UniversityId}
              userType={userType}
              userTypes={userTypes}
              permissions={permissions}
              permissionList={permissionList}
              showLocal={showLocal}
              showEU={showEU}
              showInt={showInt}
              addToWishList={addToWishList}
              studentDataValue={studentDataValue}
              toggleModal={toggleModal}
            />
          </>
          <>
            {" "}
            <Pagination
              dataPerPage={dataPerPage}
              totalData={entity}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        </div>
      </div>

      {/* <UniversityProgram
          subjectInfo={subjectInfo}
          i={i}
          courseList={courseList}
          UniversityId={UniversityId}
          userType={userType}
          userTypes={userTypes}
          permissions={permissions}
          permissionList={permissionList}
          showLocal={showLocal}
          showEU={showEU}
          showInt={showInt}
          studentDataValue={studentDataValue}
          addToWishList={() => addToWishList(subjectInfo)}
          toggleModal={() => toggleModal(subjectInfo, courseList)}
        /> */}
    </>
  );
};

export default UniversityCourses;
