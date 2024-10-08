import React, { useState } from "react";
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

const Search = () => {
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [showLocal, setShowLocal] = useState(true);
  const [showEU, setShowEU] = useState(true);
  const [showInt, setShowInt] = useState(true);
  const [activetab, setActivetab] = useState("1");
  const [fee, setFee] = useState({});
  const [unInfo, setUnInfo] = useState();

  const [studentTypeValue, setStudentTypeValue] = useState(0);
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
  const [modalCampusLabel, setModalCampusLabel] = useState("Select Campus");
  const [modalCampusValue, setModalCampusValue] = useState(0);
  const [currentData, setCurrentData] = useState({});
  const [studentDataValue, setStudentDataValue] = useState(
    userType === userTypes?.Student.toString()
      ? localStorage.getItem("referenceId")
      : "0"
  );
  const [modalCampus, setModalCampus] = useState([]);
  const [primaryCampus, setPrimaryCampus] = useState({});
  const [applicationCount, setApplicationCount] = useState(0);
  const [eligibleModal, setEligibleModal] = useState(false);
  const [elans, setElAns] = useState({});
  const [eligibilityWhileAppying, setEligibilityWhileApplying] = useState({});
  const [elStatus, setElStatus] = useState({});

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
          {/* <ModalHeader className="bg-white">
            <div className="px-3 pt-3 text-gray">
              Are You Sure You Want to Apply for This Course?
            </div>
          </ModalHeader> */}

          <ModalBody>
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
          </ModalBody>
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

            <div className="d-flex align-items-center justify-content-end">
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
          </div>
        </div>

        {/* Modal For Apply Button Code End */}

        <div className="row searchbody">
          <div className="col-md-3 mb-2 left-max-button">
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
              />
            </Drawer>
          </div>

          <div
            className="col-md-3 mb-5 left-max-height"
            style={{ position: "relative", top: "10px", marginBottom: "20px" }}
          >
            <div
              className="custom-webkit-scrollbar"
              style={{
                position: "fixed",
                width: "20%",
                height: "70vh",
                overflowY: "scroll",
              }}
            >
              <Filter
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
              />
            </div>
          </div>

          {loading ? (
            <div className="col-md-9">
              <div className="text-center">
                <img className="img-fluid" src={loader} alt="loader" />
              </div>
            </div>
          ) : (
            <div className="col-md-9 mt-3">
              {/* Showing University Course Start */}

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
                          <div key={i}>
                            <UniversityHead info={info} />
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

              {/* Showing University Course End */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
