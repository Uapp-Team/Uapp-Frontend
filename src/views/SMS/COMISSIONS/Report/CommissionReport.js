import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card, CardBody, Modal, ModalBody } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TargetData from "./TargetData";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Pagination from "../../Pagination/Pagination";
import TagButton from "../../../../components/buttons/TagButton";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Filter from "../../../../components/Dropdown/Filter";
import { Link } from "react-router-dom";
import Select from "react-select";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import Typing from "../../../../components/form/Typing";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { AdminUsers } from "../../../../components/core/User";

const CommissionReport = () => {
  const ConsultantPerformancePaging = JSON.parse(
    sessionStorage.getItem("ConsultantPerformance")
  );
  const [searchStr, setSearchStr] = useState(
    ConsultantPerformancePaging?.searchStr
      ? ConsultantPerformancePaging?.searchStr
      : ""
  );
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [currPromoteData, setCurrPromoteData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [demoteModal, setDemoteModal] = useState(false);
  const [promoteModal, setPromoteModal] = useState(false);
  const [bonusModal, setBonusModal] = useState(false);
  const [targetData, settargetData] = useState();
  const [nextData, setNextData] = useState();
  const [currentPage, setCurrentPage] = useState(
    ConsultantPerformancePaging?.currentPage
      ? ConsultantPerformancePaging?.currentPage
      : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    ConsultantPerformancePaging?.dataPerPage
      ? ConsultantPerformancePaging?.dataPerPage
      : 15
  );
  const [entity, setEntity] = useState(0);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState(
    ConsultantPerformancePaging?.branchLabel
      ? ConsultantPerformancePaging?.branchLabel
      : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    ConsultantPerformancePaging?.branchValue
      ? ConsultantPerformancePaging?.branchValue
      : 0
  );
  const [promoteData, setPromoteData] = useState(false);
  const [intakeLable, setintakeLable] = useState(
    ConsultantPerformancePaging?.intakeLable
      ? ConsultantPerformancePaging?.intakeLable
      : "Intake Range"
  );
  const [intakeValue, setintakeValue] = useState(
    ConsultantPerformancePaging?.intakeValue
      ? ConsultantPerformancePaging?.intakeValue
      : 0
  );
  const [conTypeLable, setconTypeLable] = useState(
    ConsultantPerformancePaging?.conTypeLable
      ? ConsultantPerformancePaging?.conTypeLable
      : "Consultant Type"
  );
  const [conTypeValue, setconTypeValue] = useState(
    ConsultantPerformancePaging?.conTypeValue
      ? ConsultantPerformancePaging?.conTypeValue
      : 0
  );
  const [designation, setDesignation] = useState([]);
  const [designationLable, setDesignationLable] = useState(
    ConsultantPerformancePaging?.designationLable
      ? ConsultantPerformancePaging?.designationLable
      : "Designation"
  );
  const [designationValue, setDesignationValue] = useState(
    ConsultantPerformancePaging?.designationValue
      ? ConsultantPerformancePaging?.designationValue
      : 0
  );

  const showBy = [
    {
      name: "Show Eligible",
      id: 1,
    },
    {
      name: "Show All",
      id: 2,
    },
  ];

  const [showByLable, setShowByLable] = useState(
    ConsultantPerformancePaging?.showByLable
      ? ConsultantPerformancePaging?.showByLable
      : "Show Eligible"
  );
  const [showByValue, setShowByValue] = useState(
    ConsultantPerformancePaging?.showByValue
      ? ConsultantPerformancePaging?.showByValue
      : 1
  );

  const [orderLabel, setOrderLabel] = useState(
    ConsultantPerformancePaging?.orderLabel
      ? ConsultantPerformancePaging?.orderLabel
      : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    ConsultantPerformancePaging?.orderValue
      ? ConsultantPerformancePaging?.orderValue
      : 0
  );

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
  };

  // user select order
  const orderArr = [
    {
      label: "Higest Target",
      value: 1,
    },
    {
      label: "Lowest Target",
      value: 2,
    },
  ];
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    setOrderLabel(label);
    setOrderValue(value);
  };

  useEffect(() => {
    sessionStorage.setItem(
      "ConsultantPerformance",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        designationLable: designationLable && designationLable,
        designationValue: designationValue && designationValue,
        conTypeValue: conTypeValue && conTypeValue,
        conTypeLable: conTypeLable && conTypeLable,
        intakeLable: intakeLable && intakeLable,
        intakeValue: intakeValue && intakeValue,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        showByLable: showByLable && showByLable,
        showByValue: showByValue && showByValue,
        searchStr: searchStr && searchStr,
      })
    );
  }, [
    currentPage,
    designationLable,
    designationValue,
    conTypeValue,
    conTypeLable,
    intakeLable,
    intakeValue,
    branchLabel,
    branchValue,
    dataPerPage,
    orderLabel,
    orderValue,
    showByLable,
    showByValue,
    searchStr,
  ]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      if (res.length === 1) {
        setBranchValue(res[0]?.id);
        setBranchLabel(res[0]?.name);
      }
    });
    get("accountIntake/getcurrentaccountintake").then((res) => {
      setintakeValue(res?.id);
      setintakeLable(res?.intakeName);
    });
  }, []);

  useEffect(() => {
    if (branchValue !== 0 && conTypeValue !== 0) {
      get(
        `DesignationDD/ByBranchAndType?branchid=${branchValue}&typeid=${conTypeValue}`
      ).then((res) => {
        setDesignation(res);
      });
    }
  }, [branchValue, conTypeValue]);

  useEffect(() => {
    get(`Designation/GetDesignation/${designationValue}`).then((res) => {
      settargetData(res);
    });
    get(`Designation/NextDesingation/${designationValue}`).then((res) => {
      setNextData(res);
    });
  }, [designationValue]);
  console.log("nextData", nextData);
  useEffect(() => {
    if (!isTyping) {
      get(
        `ConsultantDesignation/Report?page=${currentPage}&pagesize=${dataPerPage}&designation=${designationValue}&intakerange=${intakeValue}&query=${searchStr}&consultanttype=${conTypeValue}&show=${showByValue}&sortby=${orderValue}`
      ).then((res) => {
        console.log(searchStr, res?.models);
        setDataList(res?.models);
        setEntity(res?.totalEntity);
      });
    }
  }, [
    success,
    currentPage,
    dataPerPage,
    designationValue,
    intakeValue,
    searchStr,
    conTypeValue,
    showByValue,
    orderValue,
    isTyping,
  ]);

  const handleClearSearch = () => {
    setCurrentPage(1);
    branch.length > 1 && setBranchValue(0);
    branch.length > 1 && setBranchLabel("Select Branch");
    setintakeValue(0);
    setintakeLable("Intake Range");
    setconTypeValue(0);
    setconTypeLable("Consultant Type");
    setDesignationValue(0);
    setDesignationLable("Designation");
    setDesignation([]);
    setSearchStr("");
    setDataList([]);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePromote = (data) => {
    get(
      `ConsultantDesignation/CheckPromote/${data?.designationId}/${data.consultantId}`
    ).then((res) => {
      setPromoteData(res);
    });
    setCurrPromoteData(data);
    setPromoteModal(true);
  };
  const handleBonus = (data) => {
    setCurrPromoteData(data);
    setBonusModal(true);
  };

  const handleDemote = (data) => {
    setCurrPromoteData(data);
    setDemoteModal(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
    }
  };

  const handlePromoteData = () => {
    put(
      `ConsultantDesignation/Promote/${currPromoteData?.consultantId}/${intakeValue}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setPromoteModal(false);
      }
    });
  };

  const handleBonusData = () => {
    put(
      `ConsultantDesignation/PayBonus/${currPromoteData?.consultantId}/${intakeValue}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setBonusModal(false);
      }
    });
  };

  const handleDemoteData = () => {
    put(
      `ConsultantDesignation/demote/${currPromoteData?.consultantId}/${intakeValue}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setDemoteModal(false);
      }
    });
  };

  return (
    <div>
      <BreadCrumb title="Consultant Performance" backTo="" path="/" />

      <Card className="zindex-100">
        <CardBody>
          <div className="row">
            {AdminUsers() && branch.length > 1 && (
              <div className="col-md-3 col-sm-12 mb-1">
                <Filter
                  data={branch}
                  label={branchLabel}
                  setLabel={setBranchLabel}
                  value={branchValue}
                  setValue={setBranchValue}
                  action={() => {}}
                />
              </div>
            )}

            <div className="col-md-3 col-sm-12 mb-1">
              <DefaultDropdown
                label={conTypeLable}
                setLabel={setconTypeLable}
                value={conTypeValue}
                setValue={setconTypeValue}
                url="ConsultantTypeDD/Index"
                name="consultant"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>

            <div className="col-md-3 col-sm-12 mb-1">
              <DefaultDropdown
                label={intakeLable}
                setLabel={setintakeLable}
                value={intakeValue}
                setValue={setintakeValue}
                url="AccountIntakeDD/index"
                name="intake"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>

            <div className="col-md-3 col-sm-12 mb-1">
              <Filter
                data={designation}
                label={designationLable}
                setLabel={setDesignationLable}
                value={designationValue}
                setValue={setDesignationValue}
                action={() => {}}
                isDisabled={conTypeValue === 0 && true}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-3 col-sm-12 mb-1">
              <Filter
                data={showBy}
                label={showByLable}
                setLabel={setShowByLable}
                value={showByValue}
                setValue={setShowByValue}
                action={() => {}}
              />
            </div>

            <div className="col-md-3 col-sm-12 mb-1">
              <Typing
                name="search"
                placeholder="Name"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="d-flex justify-content-start mt-3">
            <div className="d-flex mt-1">
              {AdminUsers() && branch.length > 1 && branchValue !== 0 ? (
                <TagButton
                  label={branchLabel}
                  setValue={() => setBranchValue(0)}
                  setLabel={() => setBranchLabel("Select Branch")}
                ></TagButton>
              ) : (
                ""
              )}

              {intakeValue !== 0 ? (
                <TagButton
                  label={intakeLable}
                  setValue={() => setintakeValue(0)}
                  setLabel={() => setintakeLable("Intake Range")}
                />
              ) : (
                ""
              )}
              {conTypeValue !== 0 ? (
                <TagButton
                  label={conTypeLable}
                  setValue={() => setconTypeValue(0)}
                  setLabel={() => setconTypeLable("Consultant Type")}
                />
              ) : (
                ""
              )}
              {conTypeValue !== 0 && designationValue !== 0 ? (
                <TagButton
                  label={designationLable}
                  setValue={() => setDesignationValue(0)}
                  setLabel={() => setDesignationLable("Designation")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="mt-1 mx-1 d-flex btn-clear">
              {(AdminUsers() && branch.length > 1 && branchValue !== 0) ||
              intakeValue !== 0 ||
              conTypeValue !== 0 ||
              designationValue !== 0 ? (
                <button className="tag-clear" onClick={handleClearSearch}>
                  Clear All
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <Row>
        <Col md={9}>
          {dataList?.length > 0 && (
            <div className="custom-card-border p-4 mb-30px">
              <div className="d-flex justify-content-between">
                <div>
                  R.B. : Remaining for Bonus <br />
                  R.P. : Remaining for Promote
                </div>
                <div className="d-flex justify-content-end">
                  <div className="me-3 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="mr-2">Order By :</div>
                      <div className="ddzindex">
                        <Select
                          className="mr-2"
                          options={orderName}
                          value={{ label: orderLabel, value: orderValue }}
                          onChange={(opt) => selectOrder(opt.label, opt.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mr-3">
                    <div className="d-flex align-items-center">
                      <div className="mr-2">Showing :</div>
                      <div className="ddzindex">
                        <Select
                          options={dataSizeName}
                          value={{ label: dataPerPage, value: dataPerPage }}
                          onChange={(opt) => selectDataSize(opt.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive fixedhead mb-3">
                <Table className="table-bordered">
                  <thead className="tablehead">
                    <tr>
                      <th>Consultant</th>
                      <th>Progress</th>
                      <th>R.B.</th>
                      <th>R.P.</th>
                      <th>Bonus</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList?.length > 0 &&
                      dataList?.map((item, i) => (
                        <tr key={i} className="border-buttom">
                          <td>
                            <Link
                              className="text-id hover"
                              to={`/consultantProfile/${item?.consultantId}`}
                            >
                              {item?.consultantName}
                            </Link>
                            <br />({item?.designation}) <br />
                            <b> {item?.type}</b>
                          </td>

                          <td>
                            <li className="designation-commission-list">
                              <span>Student </span>
                              <b>{item?.studentTarget}</b>
                            </li>

                            <li className="designation-commission-list">
                              <span className="text-left">
                                {item?.bonusDesignation}{" "}
                              </span>
                              <b>{item?.consultantTarget}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Team </span>
                              <b>{item?.teamTarget}</b>
                            </li>
                          </td>
                          <td>
                            <li className="designation-commission-list">
                              <span>Student </span>
                              <b>{item?.studentRemaining}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span className="text-left">
                                {item?.bonusDesignation}{" "}
                              </span>
                              <b>{item?.consultantRemaining}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Team </span>
                              <b>{item?.teamRemaining}</b>
                            </li>
                          </td>
                          <td>
                            <li className="designation-commission-list">
                              <span>Student </span>
                              <b>{item?.studentRemainingForPromotion}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span className="text-left">
                                {item?.designation}{" "}
                              </span>
                              <b>{item?.consultantRemainingForPromotion}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Team </span>
                              <b>{item?.teamRemainingForPromotion}</b>
                            </li>
                          </td>
                          <td>
                            <li className="designation-commission-list">
                              <span>Personal </span>
                              <b> {item?.personalBonus}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Team </span>
                              <b> {item?.teamBonus}</b>
                            </li>
                          </td>

                          <td>
                            {item?.isDemote ? (
                              <>
                                <p
                                  className="text-info pointer"
                                  onClick={() => handleDemote(item)}
                                >
                                  Demote
                                </p>
                              </>
                            ) : (
                              <>
                                {item?.isPromotable === true ? (
                                  <>
                                    {permissions?.includes(
                                      permissionList.Change_Consultant_designation
                                    ) && (
                                      <span
                                        className="text-info pointer"
                                        onClick={() => handlePromote(item)}
                                      >
                                        Promote
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span>Not Eligible</span>
                                )}
                                <br />
                                {item?.isBonusPaid === false ? (
                                  <>
                                    {permissions?.includes(
                                      permissionList.Pay_Designation_Bonus
                                    ) && (
                                      <span
                                        className="text-info pointer"
                                        onClick={() => handleBonus(item)}
                                      >
                                        Pay Bonus
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span>Not Eligible</span>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </Col>

        <Col md={3}>
          {conTypeValue !== 0 && designationValue !== 0 && targetData && (
            <>
              <div className="custom-card-border p-4 mb-3">
                <p>
                  To be promoted to the <b>{nextData?.title}</b>, they should
                  target the following below
                </p>
                <p>
                  <b>Target</b>
                </p>
                <TargetData
                  text="Student"
                  value={nextData?.personalStudentTarget}
                />
                <TargetData
                  text={nextData?.targetDesignation}
                  value={nextData?.consultantTarget}
                />
                <TargetData text="Team" value={nextData?.studentFromTeam} />
              </div>

              <div className="custom-card-border p-4 mb-3">
                <p>
                  To sustain their current position as{" "}
                  <b>{targetData?.title}</b>
                  {", "}
                  They should maintain the following conditions
                </p>

                <p>
                  <b>Target</b>
                </p>
                <TargetData
                  text="Student"
                  value={targetData?.personalStudentTarget}
                />
                <TargetData
                  text={targetData?.targetDesignation}
                  value={targetData?.consultantTarget}
                />
                <TargetData text="Team" value={targetData?.studentFromTeam} />

                <hr />
                <p>
                  <b>Bonus</b>
                </p>
                <TargetData text="Personal" value={targetData?.personalBonus} />
                <TargetData text="Team" value={targetData?.teamBonus} />
              </div>
            </>
          )}
        </Col>
      </Row>

      <ConfirmModal
        text={`Are you sure to demote ${currPromoteData?.consultantName}? `}
        isOpen={demoteModal}
        toggle={() => setDemoteModal(!demoteModal)}
        cancel={() => setDemoteModal(false)}
        confirm={handleDemoteData}
      />

      <Modal
        isOpen={bonusModal}
        toggle={() => setBonusModal(!bonusModal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <div>
            <p>
              <b>
                Are you sure to pay bonus {currPromoteData?.consultantName}?
              </b>
            </p>

            <div className="mb-3">
              <li className="designation-commission-list">
                <span>Team Bonus</span>
                <b>{currPromoteData?.teamBonus}</b>
              </li>
              <li className="designation-commission-list">
                <span>Personal Bonus</span>
                <b>{currPromoteData?.personalBonus}</b>
              </li>
              <hr />
              <li className="designation-commission-list">
                <span>Total Bonus</span>
                <b>
                  {currPromoteData?.teamBonus + currPromoteData?.personalBonus}
                </b>
              </li>
            </div>
            <b>
              {` £${
                currPromoteData?.teamBonus + currPromoteData?.personalBonus
              }  will be deposit to ${
                currPromoteData?.consultantName
              } account. `}
            </b>
            <br />
            <span className="text-yellow">
              Note: This process cannot be reversed
            </span>
          </div>

          <div>
            <CancelButton text="No" cancel={() => setBonusModal(false)} />
            <SaveButton text="Yes" action={handleBonusData} />
          </div>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={promoteModal}
        toggle={() => setPromoteModal(!promoteModal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <div>
            <p>
              <b>
                {!promoteData?.alreadyHighest
                  ? `Promote ${currPromoteData?.consultantName} to ${promoteData?.promoteTo}? `
                  : `${currPromoteData?.consultantName} is already in the highest designation`}
              </b>
            </p>

            {!promoteData?.alreadyHighest && (
              <p>
                Are you promote <b> {currPromoteData?.consultantName} </b>
                form <b>{currPromoteData?.designation}</b> to{" "}
                <b>{promoteData?.promoteTo}</b> ?
              </p>
            )}
            {!promoteData?.alreadyHighest && !currPromoteData?.isBonusPaid && (
              <span className="text-yellow">
                Note: The designation bonus is not paid to the consultant yet.
                If you want to pay bonus then make the transaction first and
                then promote. After promotion, you will not be able to pay
                bonus.
              </span>
            )}
          </div>

          <div className={promoteData?.alreadyHighest && "text-center"}>
            <CancelButton
              text={promoteData?.alreadyHighest ? "Ok" : "No"}
              cancel={() => setPromoteModal(false)}
            />
            {!promoteData?.alreadyHighest && (
              <SaveButton text="Yes" action={handlePromoteData} />
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CommissionReport;
