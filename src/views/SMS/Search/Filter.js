import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Button, Input } from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import { userTypes } from "../../../constants/userTypeConstant";
import Typing from "../../../components/form/Typing";
// import ToggleSwitch from "../Components/ToggleSwitch";
// import { permissionList } from "../../../constants/AuthorizationConstant";

const Filter = ({
  studentId,
  success,
  setSuccess,
  setData,
  setEntity,
  setLoading,
  page,
  dataSizeValue,
  sortValue,
  setApplicationCount,
  setShowInt,
  setShowLocal,
  setShowEU,
  studentDataValue,
  setStudentDataValue,
  intakeValue,
  setIntakeValue,
  studentTypeValue,
  setStudentTypeValue,
  programValue,
  setProgramValue,
  campusValue,
  setCampusValue,
  departmentValue,
  setDepartmentValue,
  subValue,
  setSubValue,
  programName,
  setProgramName,
  open,
  onClose,
  ///
  studentDataLabel,
  setStudentDataLabel,
  studentTypeLabel,
  setStudentTypeLabel,
  universityLabel,
  setUniversityLabel,
  universityTypeLabel,
  setUniversityTypeLabel,
  campusLabel,
  setCampusLabel,
  universityCountryLabel,
  setUniversityCountryLabel,
  cityLabel,
  setCityLabel,
  intakeLabel,
  setIntakeLabel,
  programLabel,
  setProgramLabel,
  departmentLabel,
  setDepartmentLabel,
  subLabel,
  setSubLabel,

  //////
  setUniversityValue,
  universityValue,
  universityCountryValue,
  setUniversityCountryValue,
  cityValue,
  setCityValue,
  universityTypeValue,
  setUniversityTypeValue,
}) => {
  const { departmentId } = useParams();

  const userType = localStorage.getItem("userType");
  // const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [universityType, setUniversityType] = useState([]);
  const [campus, setCampus] = useState([]);
  const [university, setUniversity] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [intake, setIntake] = useState([]);
  const [department, setDepartment] = useState([]);
  const [studentType, setStudentType] = useState([]);
  const [programLevel, setProgramLevel] = useState([]);
  const [SubDepartment, setSubDepartment] = useState([]);

  const [studentData, setStudentData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [eligibleonly, setEligibleonly] = useState(false);
  const handleCheckedChange = () => {
    setEligibleonly(!eligibleonly);
  };

  useEffect(() => {
    if (studentId) {
      const filterStudent = studentData.filter(
        (item) => item.id.toString() === studentId
      );
      // console.log(filterStudent[0].name);
      setStudentDataLabel(filterStudent[0]?.name);
      setStudentDataValue(filterStudent[0]?.id);
    }
  }, [studentId, studentData, setStudentDataLabel, setStudentDataValue]);

  useEffect(() => {
    if (departmentId && department.length > 0) {
      const filterData = department.filter((item) => {
        return item.id.toString() === departmentId;
      });
      setDepartmentValue(filterData[0].id);
      setDepartmentLabel(filterData[0].name);
    }
  }, [department, departmentId, setDepartmentLabel, setDepartmentValue]);

  useEffect(() => {
    get(`SearchFilter/Students`).then((res) => {
      setStudentData([{ id: "0", name: "Select Student" }, ...res]);
    });

    get(`SearchFilter/UniversityTypes`).then((res) => {
      setUniversityType([{ id: "0", name: "Select University Types" }, ...res]);
    });

    get(`SearchFilter/Campus/${universityValue}`).then((res) => {
      setCampus([{ id: "0", name: "Select University Campus" }, ...res]);
    });

    get(
      `SearchFilter/GetUniversities/${universityCountryValue}/${universityTypeValue}/${cityValue}`
    ).then((res) => {
      setUniversity([{ id: "0", name: "Select University" }, ...res]);
    });

    get(`SearchFilter/Countries`).then((res) => {
      setCountry([{ id: "0", name: "Select Country" }, ...res]);
    });

    get(`SearchFilter/Intakes`).then((res) => {
      setIntake([{ id: "0", name: "Select Intakes" }, ...res]);
    });

    get(`SearchFilter/Departments`).then((res) => {
      setDepartment([{ id: "0", name: "Select Departments" }, ...res]);
    });

    get(`SearchFilter/StudentTypes`).then((res) => {
      setStudentType([{ id: "0", name: "Select Student Types" }, ...res]);
    });

    get(`SearchFilter/EducationLevels`).then((res) => {
      setProgramLevel([{ id: "0", name: "Select Education Levels" }, ...res]);
    });

    get(`SearchFilter/SubDepartments/${departmentValue}`).then((res) => {
      setSubDepartment([{ id: "0", name: "Select Sub Departments" }, ...res]);
    });
  }, [
    universityValue,
    universityCountryValue,
    universityTypeValue,
    cityValue,
    departmentValue,
  ]);

  useEffect(() => {
    const programLevelName = programName === "" ? "null" : programName;

    setLoading(true);
    if (!isTyping) {
      get(
        `ApplyFilter/Index/${page}/${dataSizeValue}/${sortValue}/${studentDataValue}/${universityTypeValue}/${universityValue}/${campusValue}/${universityCountryValue}/${cityValue}/${studentTypeValue}/${departmentValue}/${subValue}/${programValue}/${intakeValue}/${0}/${programLevelName}/${eligibleonly}`
      ).then((res) => {
        setData(res?.models);
        setEntity(res?.totalEntity);
        setLoading(false);
      });
    }
  }, [
    success,
    page,
    dataSizeValue,
    sortValue,
    studentDataValue,
    universityTypeValue,
    universityValue,
    campusValue,
    universityCountryValue,
    cityValue,
    studentTypeValue,
    departmentValue,
    subValue,
    programValue,
    intakeValue,
    programName,
    eligibleonly,
    setData,
    setEntity,
    setLoading,
    isTyping,
  ]);

  const studentOptions = studentData?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudent = (label, value) => {
    setStudentDataLabel(label);
    setStudentDataValue(value);

    get(`Eligibility/StudentApplicationCount/${value}`).then((res) => {
      setApplicationCount(res);
    });

    // get(`StudentType/GetbyStudent/${value}`).then((res) => {
    //   if (res?.id === 2) {
    //     setShowInt(false);
    //     setShowLocal(false);
    //   } else if (res?.id === 1) {
    //     setShowEU(false);
    //     setShowInt(false);
    //   } else if (res?.id === 3) {
    //     setShowEU(false);
    //     setShowLocal(false);
    //   }
    //   const result = studentType?.filter((ans) => ans?.id === res?.id);
    //   setStudentTypeLabel(result?.name);
    //   setStudentTypeValue(result?.id);
    // });
  };

  const intakeOptions = intake?.map((ins) => ({
    label: ins?.name,
    value: ins?.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const uniTypeOptions = universityType?.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const campusOptions = campus?.map((cam) => ({
    label: cam?.name,
    value: cam?.id,
  }));

  const universityOptions = university?.map((un) => ({
    label: un?.name,
    value: un?.id,
  }));

  const countryOptions = country?.map((coun) => ({
    label: coun?.name,
    value: coun?.id,
  }));

  const stateOptions = state?.map((st) => ({ label: st?.name, value: st?.id }));

  const departmentOptions = department?.map((dept) => ({
    label: dept?.name,
    value: dept?.id,
  }));

  const studentTypeOptions = studentType?.map((stp) => ({
    label: stp?.name,
    value: stp?.id,
  }));

  const programLevelOptions = programLevel?.map((pgl) => ({
    label: pgl?.name,
    value: pgl?.id,
  }));

  const subDepartmentOptions = SubDepartment?.map((sub) => ({
    label: sub?.name,
    value: sub?.id,
  }));

  const customStyles2 = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),
  };

  const selectUniversity = (label, value) => {
    setLoading(true);
    setUniversityLabel(label);
    setUniversityValue(value);
    setCampusLabel("Select Campus");
    setCampusValue("0");
    get(`SearchFilter/Campus/${value}`).then((res) => {
      setCampus([{ id: "0", name: "Select Campus" }, ...res]);
    });
  };
  const selectCountry = (label, value) => {
    setLoading(true);
    setUniversityCountryLabel(label);
    setUniversityCountryValue(value);

    get(`SearchFilter/Cities/${value}`).then((res) => {
      setState([{ id: "0", name: "Select State" }, ...res]);
    });
    // get(`SearchFilter/States/${value}`).then((res) => {
    //   setState([{ id: "0", name: "Select State" }, ...res]);
    // });
    get(
      `SearchFilter/Universities/${value}/${universityTypeValue}/${cityValue}`
    ).then((res) => {
      setUniversity([{ id: "0", name: "Select University" }, ...res]);
    });
  };
  const selectState = (label, value) => {
    setLoading(true);
    setCityLabel(label);
    setCityValue(value);
  };

  const selectUniversityType = (label, value) => {
    setLoading(true);
    setUniversityTypeLabel(label);
    setUniversityTypeValue(value);
    get(
      `SearchFilter/Universities/${universityCountryValue}/${value}/${cityValue}`
    ).then((res) => {
      setUniversity([{ id: "0", name: "Select University" }, ...res]);
    });
  };

  const selectDepartment = (label, value) => {
    setLoading(true);
    setDepartmentLabel(label);
    setDepartmentValue(value);
    get(`SearchFilter/SubDepartments/${value}`).then((res) => {
      setSubDepartment([{ id: "0", name: "Select Sub Department" }, ...res]);
    });
  };

  const selectSubDepartment = (label, value) => {
    setLoading(true);
    setSubLabel(label);
    setSubValue(value);
  };

  const selectStudentType = (label, value) => {
    setLoading(true);
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  const selectProgramLevel = (label, value) => {
    setLoading(true);
    setProgramLabel(label);
    setProgramValue(value);
  };

  const selectCampus = (label, value) => {
    setLoading(true);
    setCampusLabel(label);
    setCampusValue(value);
  };

  const handleProgramName = (e) => {
    setLoading(true);
    setProgramName(e.target.value);
  };

  const clearAllDropdown = () => {
    setLoading(true);
    setStudentDataLabel("Select Student");
    setStudentDataValue("0");
    setStudentTypeLabel("Select Student Type");
    setStudentTypeValue("0");
    setCampusLabel("Select University Campus");
    setCampusValue("0");
    setUniversityCountryLabel("Select University Country");
    setUniversityCountryValue("0");
    setCityLabel("Select City/Location");
    setCityValue("0");
    setUniversityTypeLabel("Select University Type");
    setUniversityTypeValue("0");
    setUniversityLabel("Select University");
    setUniversityValue("0");
    setState([]);
    setIntakeLabel("Select Intakes");
    setIntakeValue("0");
    setProgramLabel("Select Programme Level");
    setProgramValue("0");
    setDepartmentLabel("Select Department Category");
    setDepartmentValue("0");
    setSubLabel("Select SubDepartment Category");
    setSubValue("0");
    setProgramName("");
    setShowLocal(true);
    setShowEU(true);
    setShowInt(true);
    setSuccess(!success);
  };

  return (
    <>
      <Card className="pb-2">
        <CardBody>
          {userType === userTypes?.Student.toString() ? (
            <input
              type="hidden"
              styles={customStyles2}
              value={studentDataValue}
              name="providerTypeId"
              id="providerTypeId"
            />
          ) : (
            <div className="mb-4">
              <div className="mb-2">
                <span className="search-card-title-1">Applying For</span>
              </div>

              <Select
                styles={customStyles2}
                options={studentOptions}
                value={{
                  label: studentDataLabel,
                  value: studentDataValue,
                }}
                onChange={(opt) => selectStudent(opt.label, opt.value)}
                name="providerTypeId"
                id="providerTypeId"
              />

              {studentDataValue === "0" ? (
                <Select
                  className="mt-3"
                  options={studentTypeOptions}
                  value={{
                    label: studentTypeLabel ? studentTypeLabel : "Select",
                    value: studentTypeValue,
                  }}
                  name="providerTypeId"
                  id="providerTypeId"
                  onChange={(opt) => selectStudentType(opt.label, opt.value)}
                />
              ) : null}
            </div>
          )}

          <div className="mb-3">
            <div className="mb-2">
              <span className="search-card-title-1">Search Course</span>
            </div>
            <Typing
              name="search"
              placeholder="Search Name"
              value={programName}
              setValue={setProgramName}
              setIsTyping={setIsTyping}
            />

            <Select
              className="mt-3"
              options={universityOptions}
              value={{ label: universityLabel, value: universityValue }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectUniversity(opt.label, opt.value)}
            />
          </div>
          {/* {studentDataValue !== 0 &&
          permissions?.includes(permissionList.Add_Application) ? (
            <div className="d-flex justify-content-between">
              <span className="search-card-title-1">
                Show all eligible programs
              </span>

              <ToggleSwitch
                defaultChecked={eligibleonly}
                onChange={(e) => {
                  handleCheckedChange(e);
                }}
              />
            </div>
          ) : null} */}
        </CardBody>
      </Card>

      <div>
        <Card>
          <CardBody>
            <span className="search-card-title-1"> Filter University</span>
            <span className="underline-span-style-1"></span>

            <Select
              className="mt-3"
              options={uniTypeOptions}
              value={{
                label: universityTypeLabel,
                value: universityTypeValue,
              }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectUniversityType(opt.label, opt.value)}
            />

            <Select
              className="mt-3"
              options={countryOptions}
              value={{
                label: universityCountryLabel,
                value: universityCountryValue,
              }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectCountry(opt.label, opt.value)}
            />

            <Select
              className="mt-3"
              options={stateOptions}
              value={{ label: cityLabel, value: cityValue }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectState(opt.label, opt.value)}
            />

            <Select
              className="mt-3"
              options={campusOptions}
              value={{ label: campusLabel, value: campusValue }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectCampus(opt.label, opt.value)}
              isDisabled={universityValue === "0" ? true : false}
            />
          </CardBody>
        </Card>
      </div>

      <div className="">
        <Card className="card-style-search">
          <CardBody>
            <span className="search-card-title-1"> Filter Program</span>
            <span className="underline-span-style-1"></span>

            <Select
              className="mt-3"
              options={intakeOptions}
              value={{ label: intakeLabel, value: intakeValue }}
              onChange={(opt) => selectIntake(opt.label, opt.value)}
              name="providerTypeId"
              id="providerTypeId"
            />

            <Select
              className="mt-3"
              options={programLevelOptions}
              value={{ label: programLabel, value: programValue }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectProgramLevel(opt.label, opt.value)}
            />

            <Select
              className="mt-3"
              options={departmentOptions}
              value={{ label: departmentLabel, value: departmentValue }}
              name="providerTypeId"
              id="providerTypeId"
              onChange={(opt) => selectDepartment(opt.label, opt.value)}
              isDisabled={departmentId}
            />

            <Select
              className="mt-3"
              options={subDepartmentOptions}
              value={{ label: subLabel, value: subValue }}
              onChange={(opt) => selectSubDepartment(opt.label, opt.value)}
              name="providerTypeId"
              id="providerTypeId"
            />

            <br />

            <div className="d-flex justify-content-end">
              <Button
                color="danger"
                className="mr-2"
                onClick={clearAllDropdown}
              >
                Clear
              </Button>
              <Button
                color="primary"
                onClick={onClose}
                className="filter-mobile-device"
              >
                Show Results
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Filter;
