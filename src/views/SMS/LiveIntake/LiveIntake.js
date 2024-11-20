import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import LiveIntakeDropdownAndSearch from "./LiveIntakeDropdownAndSearch";
import get from "../../../helpers/get";
import LiveIntakeTable from "./LiveIntakeTable";
import Uget from "../../../helpers/Uget";

const LiveIntake = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callApi, setCallApi] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [dataPerPage, setDataPerPage] = useState(15);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const componentRef = useRef();
  const [deliveryPatternDD, setDeliveryPatternDD] = useState([]);
  const [deliveryPatternLabel, setDeliveryPatternLabel] =
    useState("Delivery Pattern");
  const [deliveryPatternValue, setDeliveryPatternValue] = useState(0);
  const [recruitmentDD, setRecruitmentDD] = useState([
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "Eu/Uk",
    },
    {
      id: 3,
      name: "International",
    },
  ]);

  const [recruitmentLabel, setRecruitmentLabel] = useState("Recruitment");
  const [recruitmentValue, setRecruitmentValue] = useState(0);

  const [campusDD, setCampusDD] = useState([]);
  const [campusLabel, setCampusLabel] = useState("Campus");
  const [campusValue, setCampusValue] = useState(0);
  const [universityDD, setUniversityDD] = useState([]);
  const [universityLabel, setUniversityLabel] = useState("University");
  const [universityValue, setUniversityValue] = useState(0);
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const [intake, setIntake] = useState({});
  const [liveIntakeList, setLiveIntakeList] = useState([]);
  const [intakeDataList, setIntakeDataList] = useState([]);

  const [entity, setEntity] = useState(0);

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  useEffect(() => {
    get(`UniversityCampus/GetByUniversity/${universityValue}`).then((res) => {
      setCampusDD(res);
    });
  }, [universityValue]);

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });
    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, [setIntake, setIntakeRngDD]);

  useEffect(() => {
    Uget(
      `LiveIntake/paginated-list?page=${currentPage}&pageSize=${dataPerPage}&accountIntakeId=${intakeRngValue}&universityId=${universityValue}&campusId=${campusValue}&deliveryPatternId=${deliveryPatternValue}&recruitmentTypeId=${
        recruitmentValue ? recruitmentValue : 0
      }&searchText=${searchStr}`
    ).then((res) => {
      setLiveIntakeList(res?.items);
      setEntity(res?.total);
    });
  }, [
    campusValue,
    currentPage,
    dataPerPage,
    deliveryPatternValue,
    intakeRngValue,
    searchStr,
    universityValue,
    recruitmentValue,
  ]);

  useEffect(() => {
    const filterData = intakeRngDD.filter((status) => {
      return status.id === intake?.id;
    });
    setIntakeRngValue(filterData[0]?.id);
    setIntakeRngLabel(filterData[0]?.name);
  }, [intakeRngDD, intake, setIntakeRngValue, setIntakeRngLabel]);

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAdmissionManager", JSON.stringify(values));
  };

  const handleReset = () => {
    setUniversityLabel("University");
    setUniversityValue(0);
    setCampusLabel("Campus");
    setCampusValue(0);
    setRecruitmentLabel("Recruitment");
    setRecruitmentValue(0);
    setDeliveryPatternLabel("Delivery Pattern");
    setDeliveryPatternValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  return (
    <div>
      <BreadCrumb title="Live Intake" backTo="" path="/" />
      <LiveIntakeDropdownAndSearch
        setIsTyping={setIsTyping}
        setSearchStr={setSearchStr}
        searchStr={searchStr}
        handleKeyDown={handleKeyDown}
        intakeRngDD={intakeRngDD}
        setIntakeRngDD={setIntakeRngDD}
        setIntakeRngLabel={setIntakeRngLabel}
        intakeRngLabel={intakeRngLabel}
        setIntakeRngValue={setIntakeRngValue}
        intakeRngValue={intakeRngValue}
        intake={intake}
        setIntake={setIntake}
        universityDD={universityDD}
        universityLabel={universityLabel}
        universityValue={universityValue}
        setUniversityLabel={setUniversityLabel}
        setUniversityValue={setUniversityValue}
        campusDD={campusDD}
        campusLabel={campusLabel}
        campusValue={campusValue}
        setCampusLabel={setCampusLabel}
        setCampusValue={setCampusValue}
        recruitmentDD={recruitmentDD}
        recruitmentLabel={recruitmentLabel}
        recruitmentValue={recruitmentValue}
        setRecruitmentLabel={setRecruitmentLabel}
        setRecruitmentValue={setRecruitmentValue}
        deliveryPatternDD={deliveryPatternDD}
        deliveryPatternLabel={deliveryPatternLabel}
        deliveryPatternValue={deliveryPatternValue}
        setDeliveryPatternLabel={setDeliveryPatternLabel}
        setDeliveryPatternValue={setDeliveryPatternValue}
        handleReset={handleReset}
      />
      <LiveIntakeTable
        loading={loading}
        dataSizeName={dataSizeName}
        dataPerPage={dataPerPage}
        selectDataSize={selectDataSize}
        dropdownOpen={dropdownOpen}
        toggle={toggle}
        componentRef={componentRef}
        dropdownOpen1={dropdownOpen1}
        toggle1={toggle1}
        tableData={tableData}
        handleChecked={handleChecked}
        entity={entity}
        paginate={paginate}
        currentPage={currentPage}
        liveIntakeList={liveIntakeList}
      />
    </div>
  );
};

export default LiveIntake;
