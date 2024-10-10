import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavLink,
  NavItem,
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination";
import { userTypes } from "../../../constants/userTypeConstant";
import loader from "../../../assets/img/load.gif";
import { permissionList } from "../../../constants/AuthorizationConstant";
import { Drawer } from "antd";
import University from "./University";
import UniversityHead from "./UniversityHead";
import Filter from "./Filter";
import Apply from "./Apply";
import { useParams } from "react-router-dom";
import get from "../../../helpers/get";
import TagButton from "../../../components/buttons/TagButton";

const Search = () => {
  const { student, departmentId } = useParams();
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [showLocal, setShowLocal] = useState(true);
  const [showEU, setShowEU] = useState(true);
  const [showInt, setShowInt] = useState(true);
  const [activetab, setActivetab] = useState("1");
  const [fee, setFee] = useState({});
  const [unInfo, setUnInfo] = useState();

  const [studentTypeValue, setStudentTypeValue] = useState("0");
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Student Type"
  );
  const [campusValue, setCampusValue] = useState("0");

  const [intakeValue, setIntakeValue] = useState("0");
  const [programValue, setProgramValue] = useState("0");

  const [departmentValue, setDepartmentValue] = useState("0");
  const [subValue, setSubValue] = useState("0");
  const [dataSizeLabel, setDataSizeLabel] = useState("20");
  const [dataSizeValue, setDataSizeValue] = useState(20);
  const [sortLabel, setSortLabel] = useState("A-Z");
  const [sortValue, setSortValue] = useState(1);
  const [checkActiveTab, setCheckActiveTab] = useState(true);
  const [programName, setProgramName] = useState("");
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [entity, setEntity] = useState(0);
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
  const [intakeLabel, setIntakeLabel] = useState("Select Intakes");
  const [programLabel, setProgramLabel] = useState("Select Course Level");
  const [departmentLabel, setDepartmentLabel] = useState("Select Department");
  const [subLabel, setSubLabel] = useState("Select Sub Department Category");
  const [cityLabel, setCityLabel] = useState("Select City/Location");
  const [campusLabel, setCampusLabel] = useState("Select University Campus");
  const [universityCountryLabel, setUniversityCountryLabel] =
    useState("Select Country");
  const [modalCampusLabel, setModalCampusLabel] = useState("Select Campus");
  const [modalCampusValue, setModalCampusValue] = useState(0);
  const [currentData, setCurrentData] = useState({});
  const [universityLabel, setUniversityLabel] = useState("Select University");
  const [universityValue, setUniversityValue] = useState("0");
  const [universityTypeLabel, setUniversityTypeLabel] = useState(
    "Select University Type"
  );

  const [studentDataLabel, setStudentDataLabel] = useState("Select Student");
  const [studentDataValue, setStudentDataValue] = useState(
    userType === userTypes?.Student.toString()
      ? localStorage.getItem("referenceId")
      : "0"
  );
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [modalCampus, setModalCampus] = useState([]);
  const [primaryCampus, setPrimaryCampus] = useState({});
  const [applicationCount, setApplicationCount] = useState(0);
  const [eligibleModal, setEligibleModal] = useState(false);
  const [elans, setElAns] = useState({});
  const [eligibilityWhileAppying, setEligibilityWhileApplying] = useState({});
  const [elStatus, setElStatus] = useState({});
  const [universityCountryValue, setUniversityCountryValue] = useState("0");

  const [cityValue, setCityValue] = useState("0");

  const [universityTypeValue, setUniversityTypeValue] = useState("0");

  useEffect(() => {
    if (studentDataValue !== "0") {
      get(`StudentType/Student/${studentDataValue}`).then((res) => {
        setApplicationTypes(res);
      });
    }
  }, [studentDataValue]);

  // drawer code antd start

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // drawer code antd end

  //  change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const sortingOrder = [
    {
      name: "A-Z",
      id: 1,
    },
    {
      name: "Z-A",
      id: 2,
    },
  ];

  const showArray = [
    {
      name: "10",
      id: 10,
    },
    {
      name: "20",
      id: 20,
    },
    {
      name: "50",
      id: 50,
    },
    {
      name: "100",
      id: 100,
    },
  ];

  const handleClearSearch = () => {
    userType !== userTypes?.Student.toString() &&
      setStudentDataLabel("Select Student");
    userType !== userTypes?.Student.toString() && setStudentDataValue("0");
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

    setIntakeLabel("Select Intakes");
    setIntakeValue("0");
    setProgramLabel("Select Programme Level");
    setProgramValue("0");
    setDepartmentLabel("Select Department Category");
    setDepartmentValue("0");
    setSubLabel("Select SubDepartment Category");
    setSubValue("0");
  };

  const toggle1 = (tab) => {
    setActivetab(tab);
    setCheckActiveTab(true);
  };

  const toggle2 = (tab) => {
    setActivetab(tab);
    setCheckActiveTab(false);
  };

  const dataSizeName = showArray.map((dsn) => ({
    label: dsn?.name,
    value: dsn?.id,
  }));

  const sortSize = sortingOrder.map((srt) => ({
    label: srt?.name,
    value: srt?.id,
  }));

  const selectOrder = (label, value) => {
    setLoading(true);

    setDataSizeLabel(label);
    setDataSizeValue(value);
  };

  const selectSort = (label, value) => {
    setLoading(true);
    setSortLabel(label);
    setSortValue(value);
  };

  const closeModal = () => {
    setModalCampus([]);
    setModalIntake([]);
    setModalDeliveryPattern([]);
    setModalCampusLabel("Select Campus");
    setModalCampusValue(0);
    setModalDeliveryPatternLabel("Select Delivery Pattern");
    setModalDeliveryPatternValue(0);
    setModalIntakeLabel("Select Intake");
    setModalIntakeValue(0);
    setModal(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Student Eligibility modal */}
      <Modal
        isOpen={eligibleModal}
        toggle={() => {
          setEligibleModal(false);
        }}
        className="uapp-modal2"
      >
        <ModalHeader style={{ backgroundColor: "#1E98B0" }}>
          <p style={{ color: "white", fontWeight: "700" }}>Eligibility Check</p>
        </ModalHeader>

        <ModalBody>
          <p
            className={
              elans?.isEligible ? "text-center elg" : "text-center elg2"
            }
          >
            {elans?.message}
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setEligibleModal(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <div>
        {/* Modal For Apply Button Code Start */}

        <Modal
          size="lg"
          isOpen={modal}
          toggle={closeModal}
          className="uapp-modal2"
        >
          <Apply
            success={success}
            setSuccess={setSuccess}
            modalCampus={modalCampus}
            setModalCampus={setModalCampus}
            currentData={currentData}
            modalDeliveryPattern={modalDeliveryPattern}
            setModalDeliveryPattern={setModalDeliveryPattern}
            setModal={setModal}
            fee={fee}
            unInfo={unInfo}
            primaryCampus={primaryCampus}
            studentDataValue={studentDataValue}
            eligibilityWhileAppying={eligibilityWhileAppying}
            elStatus={elStatus}
            campusValue={campusValue}
            applicationCount={applicationCount}
            setModalCampusLabel={setModalCampusLabel}
            setModalCampusValue={setModalCampusValue}
            modalIntake={modalIntake}
            setModalIntake={setModalIntake}
            setModalIntakeLabel={setModalIntakeLabel}
            setModalIntakeValue={setModalIntakeValue}
            setModalDeliveryPatternLabel={setModalDeliveryPatternLabel}
            setModalDeliveryPatternValue={setModalDeliveryPatternValue}
            modalIntakeValue={modalIntakeValue}
            modalDeliveryPatternValue={modalDeliveryPatternValue}
            modalCampusValue={modalCampusValue}
            modalCampusLabel={modalCampusLabel}
            modalIntakeLabel={modalIntakeLabel}
            modalDeliveryPatternLabel={modalDeliveryPatternLabel}
          />
        </Modal>

        {/* Tabs */}
        <div className="searchnav">
          <div
            className="row d-flex align-items-center justify-content-between mb-3"
            style={{
              width: "100%",
              margin: "0 auto",
              padding: "0 5px",
            }}
          >
            <div className="d-flex justify-content-start">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activetab === "1"}
                    style={{ background: "none" }}
                    onClick={() => toggle1("1")}
                  >
                    Courses
                  </NavLink>
                </NavItem>
              </Nav>
              {/* </div> */}

              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activetab === "2"}
                    style={{ background: "none" }}
                    onClick={() => toggle2("2")}
                  >
                    University
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <div className="d-flex align-items-center justify-content-end ddzindex">
              <div className="d-flex align-items-center mx-3">
                <div className="mr-2">Order By :</div>

                <Select
                  className="ms-1"
                  options={sortSize}
                  value={{ label: sortLabel, value: sortValue }}
                  onChange={(opt) => selectSort(opt.label, opt.value)}
                />
              </div>

              <div className="d-flex align-items-center justify-content-around">
                <div className="mr-2">Showing :</div>

                <Select
                  className="ms-1"
                  options={dataSizeName}
                  value={{ label: dataSizeLabel, value: dataSizeValue }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
              </div>
            </div>
            <div className="col-md-3 mb-2 mt-4 left-max-button">
              <Button color="primary" onClick={showDrawer}>
                Show Filters
              </Button>

              <Drawer
                title="Filters"
                placement="left"
                onClose={onClose}
                open={open}
              >
                <Filter
                  studentId={student}
                  success={success}
                  setSuccess={setSuccess}
                  setData={setData}
                  setEntity={setEntity}
                  setLoading={setLoading}
                  page={page}
                  dataSizeValue={dataSizeValue}
                  sortValue={sortValue}
                  setApplicationCount={setApplicationCount}
                  setShowInt={setShowInt}
                  setShowLocal={setShowLocal}
                  setShowEU={setShowEU}
                  studentDataValue={studentDataValue}
                  setStudentDataValue={setStudentDataValue}
                  intakeValue={intakeValue}
                  setIntakeValue={setIntakeValue}
                  setModalIntakeValue={setModalIntakeValue}
                  studentTypeValue={studentTypeValue}
                  setStudentTypeValue={setStudentTypeValue}
                  programValue={programValue}
                  setProgramValue={setProgramValue}
                  campusValue={campusValue}
                  setCampusValue={setCampusValue}
                  departmentValue={departmentValue}
                  setDepartmentValue={setDepartmentValue}
                  subValue={subValue}
                  setSubValue={setSubValue}
                  programName={programName}
                  setProgramName={setProgramName}
                  onClose={onClose}
                  open={open}
                  studentDataLabel={studentDataLabel}
                  setStudentDataLabel={setStudentDataLabel}
                  universityLabel={universityLabel}
                  setUniversityLabel={setUniversityLabel}
                  universityTypeLabel={universityTypeLabel}
                  setUniversityTypeLabel={setUniversityTypeLabel}
                  campusLabel={campusLabel}
                  setCampusLabel={setCampusLabel}
                  universityCountryLabel={universityCountryLabel}
                  setUniversityCountryLabel={setUniversityCountryLabel}
                  cityLabel={cityLabel}
                  setCityLabel={setCityLabel}
                  intakeLabel={intakeLabel}
                  setIntakeLabel={setIntakeLabel}
                  programLabel={programLabel}
                  setProgramLabel={setProgramLabel}
                  departmentLabel={departmentLabel}
                  setDepartmentLabel={setDepartmentLabel}
                  setSubLabel={setSubLabel}
                  subLabel={subLabel}
                  setUniversityValue={setUniversityValue}
                  universityValue={universityValue}
                  universityCountryValue={universityCountryValue}
                  setUniversityCountryValue={setUniversityCountryValue}
                  cityValue={cityValue}
                  setCityValue={setCityValue}
                  universityTypeValue={universityTypeValue}
                  setUniversityTypeValue={setUniversityTypeValue}
                  setStudentTypeLabel={setStudentTypeLabel}
                  studentTypeLabel={studentTypeLabel}
                />
              </Drawer>
            </div>
          </div>
        </div>

        {/* Modal For Apply Button Code End */}

        <div className="row searchbody">
          {/* <div className="col-md-3 mb-2 left-max-button">
            <Button color="primary" onClick={showDrawer}>
              Show Filters
            </Button>

            <Drawer
              title="Filters"
              placement="left"
              onClose={onClose}
              open={open}
            >
              <Filter
                studentId={student}
                success={success}
                setSuccess={setSuccess}
                setData={setData}
                setEntity={setEntity}
                setLoading={setLoading}
                page={page}
                dataSizeValue={dataSizeValue}
                sortValue={sortValue}
                setApplicationCount={setApplicationCount}
                setShowInt={setShowInt}
                setShowLocal={setShowLocal}
                setShowEU={setShowEU}
                studentDataValue={studentDataValue}
                setStudentDataValue={setStudentDataValue}
                intakeValue={intakeValue}
                setIntakeValue={setIntakeValue}
                setModalIntakeValue={setModalIntakeValue}
                studentTypeValue={studentTypeValue}
                setStudentTypeValue={setStudentTypeValue}
                programValue={programValue}
                setProgramValue={setProgramValue}
                campusValue={campusValue}
                setCampusValue={setCampusValue}
                departmentValue={departmentValue}
                setDepartmentValue={setDepartmentValue}
                subValue={subValue}
                setSubValue={setSubValue}
                programName={programName}
                setProgramName={setProgramName}
                onClose={onClose}
                open={open}
              />
            </Drawer>
          </div> */}

          <div
            className="col-md-3 mb-5 left-max-height"
            style={{ position: "relative", top: "10px", marginBottom: "20px" }}
          >
            <div
              className="custom-webkit-scrollbar"
              style={{
                position: "fixed",
                width: "20%",
                height: "calc(100vh - 180px)",
                overflowY: "scroll",
              }}
            >
              <Filter
                studentId={student}
                success={success}
                setSuccess={setSuccess}
                setData={setData}
                setEntity={setEntity}
                setLoading={setLoading}
                page={page}
                dataSizeValue={dataSizeValue}
                sortValue={sortValue}
                setApplicationCount={setApplicationCount}
                setShowInt={setShowInt}
                setShowLocal={setShowLocal}
                setShowEU={setShowEU}
                studentDataValue={studentDataValue}
                setStudentDataValue={setStudentDataValue}
                intakeValue={intakeValue}
                setIntakeValue={setIntakeValue}
                setModalIntakeValue={setModalIntakeValue}
                studentTypeValue={studentTypeValue}
                setStudentTypeValue={setStudentTypeValue}
                programValue={programValue}
                setProgramValue={setProgramValue}
                campusValue={campusValue}
                setCampusValue={setCampusValue}
                departmentValue={departmentValue}
                setDepartmentValue={setDepartmentValue}
                subValue={subValue}
                setSubValue={setSubValue}
                programName={programName}
                setProgramName={setProgramName}
                onClose={onClose}
                open={open}
                studentDataLabel={studentDataLabel}
                setStudentDataLabel={setStudentDataLabel}
                universityLabel={universityLabel}
                setUniversityLabel={setUniversityLabel}
                universityTypeLabel={universityTypeLabel}
                setUniversityTypeLabel={setUniversityTypeLabel}
                campusLabel={campusLabel}
                setCampusLabel={setCampusLabel}
                universityCountryLabel={universityCountryLabel}
                setUniversityCountryLabel={setUniversityCountryLabel}
                cityLabel={cityLabel}
                setCityLabel={setCityLabel}
                intakeLabel={intakeLabel}
                setIntakeLabel={setIntakeLabel}
                programLabel={programLabel}
                setProgramLabel={setProgramLabel}
                departmentLabel={departmentLabel}
                setDepartmentLabel={setDepartmentLabel}
                setSubLabel={setSubLabel}
                subLabel={subLabel}
                setUniversityValue={setUniversityValue}
                universityValue={universityValue}
                universityCountryValue={universityCountryValue}
                setUniversityCountryValue={setUniversityCountryValue}
                cityValue={cityValue}
                setCityValue={setCityValue}
                universityTypeValue={universityTypeValue}
                setUniversityTypeValue={setUniversityTypeValue}
                setStudentTypeLabel={setStudentTypeLabel}
                studentTypeLabel={studentTypeLabel}
              />
            </div>
          </div>

          {/* {loading ? (
            <div className="col-md-9">
              <div className="text-center">
                <img className="img-fluid" src={loader} alt="loader" />
              </div>
            </div>
          ) : ( */}
          <div className="col-md-9 mt-3">
            {/* Showing University Course Start */}

            <>
              {(userType !== userTypes?.Student.toString() &&
                studentDataValue !== "0") ||
              studentTypeValue !== "0" ||
              universityValue !== "0" ||
              universityTypeValue !== "0" ||
              universityCountryValue !== "0" ||
              cityValue !== "0" ||
              campusValue !== "0" ||
              intakeValue !== "0" ||
              programValue !== "0" ||
              (!departmentId && departmentValue !== "0") ||
              subValue !== "0" ? (
                <div className="custom-card-border py-4 px-4 mb-3 searchfiltertags">
                  <Row>
                    <Col lg="12" md="12" sm="12">
                      <div className="scroll-x">
                        {userType !== userTypes?.Student.toString() &&
                        studentDataValue !== "0" ? (
                          <TagButton
                            label={studentDataLabel}
                            setValue={() => setStudentDataValue("0")}
                            setLabel={() =>
                              setStudentDataLabel("Select Student")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {studentTypeValue !== "0" ? (
                          <TagButton
                            label={studentTypeLabel}
                            setValue={() => setStudentTypeValue("0")}
                            setLabel={() =>
                              setStudentTypeLabel("Select Student Type")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {universityValue !== "0" ? (
                          <TagButton
                            label={universityLabel}
                            setValue={() => setUniversityValue("0")}
                            setLabel={() =>
                              setUniversityLabel("Select University")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {universityTypeValue !== "0" ? (
                          <TagButton
                            label={universityTypeLabel}
                            setValue={() => setUniversityTypeValue("0")}
                            setLabel={() =>
                              setUniversityTypeLabel("Select University Type")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {universityCountryValue !== "0" ? (
                          <TagButton
                            label={universityCountryLabel}
                            setValue={() => setUniversityCountryValue("0")}
                            setLabel={() =>
                              setUniversityCountryLabel("Select Country")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {cityValue !== "0" ? (
                          <TagButton
                            label={cityLabel}
                            setValue={() => setCityValue("0")}
                            setLabel={() =>
                              setCityLabel("Select City/Location")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {campusValue !== "0" ? (
                          <TagButton
                            label={campusLabel}
                            setValue={() => setCampusValue("0")}
                            setLabel={() =>
                              setCampusLabel("Select University Campus")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {intakeValue !== "0" ? (
                          <TagButton
                            label={intakeLabel}
                            setValue={() => setIntakeValue("0")}
                            setLabel={() => setIntakeLabel("Select Intakes")}
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {programValue !== "0" ? (
                          <TagButton
                            label={programLabel}
                            setValue={() => setProgramValue("0")}
                            setLabel={() =>
                              setProgramLabel("Select Course Level")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {!departmentId && departmentValue !== "0" ? (
                          <TagButton
                            label={departmentLabel}
                            setValue={() => setDepartmentValue("0")}
                            setLabel={() =>
                              setDepartmentLabel("Select Department Category")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {subValue !== "0" ? (
                          <TagButton
                            label={subLabel}
                            setValue={() => setSubValue("0")}
                            setLabel={() =>
                              setSubLabel("Select Sub Department Category")
                            }
                          ></TagButton>
                        ) : (
                          ""
                        )}

                        {(userType !== userTypes?.Student.toString() &&
                          studentDataValue !== "0") ||
                        studentTypeValue !== "0" ||
                        universityValue !== "0" ||
                        universityTypeValue !== "0" ||
                        universityCountryValue !== "0" ||
                        cityValue !== "0" ||
                        campusValue !== "0" ||
                        intakeValue !== "0" ||
                        programValue !== "0" ||
                        (!departmentId && departmentValue !== "0") ||
                        subValue !== "0" ? (
                          <button
                            className="tag-clear"
                            onClick={handleClearSearch}
                          >
                            Clear All
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </>

            <div
              className={
                (userType !== userTypes?.Student.toString() &&
                  studentDataValue !== "0") ||
                studentTypeValue !== "0" ||
                universityValue !== "0" ||
                universityTypeValue !== "0" ||
                universityCountryValue !== "0" ||
                cityValue !== "0" ||
                campusValue !== "0" ||
                intakeValue !== "0" ||
                programValue !== "0" ||
                (!departmentId && departmentValue !== "0") ||
                subValue !== "0"
                  ? "uniProgramm"
                  : ""
              }
            >
              {loading ? (
                <>
                  {" "}
                  <div className="text-center">
                    <img className="img-fluid" src={loader} alt="loader" />
                  </div>
                </>
              ) : (
                <>
                  {checkActiveTab ? (
                    <>
                      {!loading ? (
                        <>
                          {data?.map((info, i) => (
                            <University
                              info={info}
                              i={i}
                              userType={userType}
                              userTypes={userTypes}
                              permissions={permissions}
                              permissionList={permissionList}
                              showLocal={showLocal}
                              showEU={showEU}
                              showInt={showInt}
                              studentDataValue={studentDataValue}
                              setModalCampus={setModalCampus}
                              setModalIntake={setModalIntake}
                              setModalDeliveryPattern={setModalDeliveryPattern}
                              setCurrentData={setCurrentData}
                              setPrimaryCampus={setPrimaryCampus}
                              campusValue={campusValue}
                              setFee={setFee}
                              setUnInfo={setUnInfo}
                              setEligibilityWhileApplying={
                                setEligibilityWhileApplying
                              }
                              setElStatus={setElStatus}
                              setModal={setModal}
                              setEligibleModal={setEligibleModal}
                              setElAns={setElAns}
                              programName={programName}
                              studentTypeValue={studentTypeValue}
                              departmentValue={departmentValue}
                              setDepartmentValue={setDepartmentValue}
                              subValue={subValue}
                              programValue={programValue}
                              intakeValue={intakeValue}
                              applicationTypes={applicationTypes}
                              // setIntakeValue={setIntakeValue}
                            />
                          ))}

                          {/* pagination */}

                          <div className="mb-130px">
                            <Card className="pt-2 px-1">
                              <Pagination
                                dataPerPage={dataSizeValue}
                                totalData={entity}
                                paginate={paginate}
                                currentPage={page}
                              />
                            </Card>
                          </div>
                        </>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <>
                        {data?.length < 1 ? (
                          <div class="text-center">
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            {data?.map((info, i) => (
                              <div key={i} className=" mb-3">
                                <UniversityHead
                                  info={info}
                                  className="university-name-extra"
                                />
                              </div>
                            ))}

                            {/* pagination */}

                            <div className="mb-80px">
                              <Card className="pt-2 px-1">
                                <Pagination
                                  dataPerPage={dataSizeValue}
                                  totalData={entity}
                                  paginate={paginate}
                                  currentPage={page}
                                />
                              </Card>
                            </div>
                          </>
                        )}
                      </>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Showing University Course End */}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Search;
