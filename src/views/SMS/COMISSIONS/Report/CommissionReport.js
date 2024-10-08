import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card, CardBody } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import TargetData from "./TargetData";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Pagination from "../../Pagination/Pagination";
import TagButton from "../../../../components/buttons/TagButton";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Filter from "../../../../components/Dropdown/Filter";

const CommissionReport = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [promoteModal, setPromoteModal] = useState(false);
  const [currPromoteData, setCurrPromoteData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [bonusModal, setBonusModal] = useState(false);
  const [targetData, settargetData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = "20";
  const [entity, setEntity] = useState(0);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [promoteData, setPromoteData] = useState(false);
  const [intakeValue, setintakeValue] = useState(0);
  const [intakeLable, setintakeLable] = useState("Intake Range");
  const [conTypeValue, setconTypeValue] = useState(0);
  const [conTypeLable, setconTypeLable] = useState("Consultant Type");
  const [designation, setDesignation] = useState([]);
  const [designationValue, setDesignationValue] = useState(0);
  const [designationLable, setDesignationLable] = useState("Designation");

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      if (res.length === 1) {
        setBranchValue(res[0]?.id);
        setBranchLabel(res[0]?.name);
      }
    });
    get("accountIntake/getcurrentaccountintake").then((res) => {
      console.log(res);
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
    get(`Designation/Get/${designationValue}`).then((res) => {
      settargetData(res);
    });
    get(`Designation/Next/${designationValue}`).then((res) => {
      setPromoteData(res);
    });
  }, [designationValue]);

  useEffect(() => {
    get(
      `ConsultantDesignation/Report?page=${currentPage}&pagesize=${dataPerPage}&designation=${designationValue}&intakerange=${intakeValue}`
    ).then((res) => {
      console.log(res);
      setDataList(res?.models);
      setEntity(res?.totalEntity);
    });
  }, [success, currentPage, dataPerPage, designationValue, intakeValue]);

  const handleClearSearch = () => {
    setBranchValue(0);
    setBranchLabel("Select Branch");
    setintakeValue(0);
    setintakeLable("Intake Range");
    setconTypeValue(0);
    setconTypeLable("Consultant Type");
    setDesignationValue(0);
    setDesignationLable("Designation");
    setDesignation([]);
    setDataList();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePromote = (data) => {
    setCurrPromoteData(data);
    setPromoteModal(true);
  };
  const handleBonus = (data) => {
    setCurrPromoteData(data);
    setBonusModal(true);
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

  return (
    <div>
      <BreadCrumb title="Consultant Performance" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="row">
            {branch.length > 1 && (
              <div className="col-md-3 col-sm-12">
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

            <div className="col-md-3 col-sm-12">
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

            <div className="col-md-3 col-sm-12">
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
            <div className="col-md-3 col-sm-12">
              {designation.length > 0 && (
                <Filter
                  data={designation}
                  label={designationLable}
                  setLabel={setDesignationLable}
                  value={designationValue}
                  setValue={setDesignationValue}
                  action={() => {}}
                />
              )}
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3">
            <div className="d-flex mt-1">
              {branchValue !== 0 ? (
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
              {designationValue !== 0 ? (
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
              {branchValue !== 0 ||
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
              <Table responsive>
                <thead className="tablehead">
                  <tr>
                    <th>Consultant</th>
                    <th>Target</th>
                    <th>Bonus</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 &&
                    dataList?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td>{item?.consultantName}</td>

                        <td>
                          <li className="designation-commission-list">
                            <span>Student target</span>
                            <b>{item?.studentTarget}</b>
                          </li>
                          <li className="designation-commission-list">
                            <span>Consultant target</span>
                            <b>{item?.consultantTarget}</b>
                          </li>
                          <li className="designation-commission-list">
                            <span>Team target </span>
                            <b>{item?.teamTarget}</b>
                          </li>
                        </td>

                        <td>
                          <li className="designation-commission-list">
                            <span>Team Bonus </span>
                            <b>{item?.teamBonus}</b>
                          </li>
                          <li className="designation-commission-list">
                            <span>Personal Bonus</span>
                            <b>{item?.personalBonus}</b>
                          </li>
                        </td>

                        <td>
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

                          <ConfirmModal
                            text="Are you sure to pay bonus?"
                            text2={`Consultant will get ${
                              item?.teamBonus + item?.personalBonus
                            } £ directly to his/her account. `}
                            isOpen={bonusModal}
                            toggle={() => setBonusModal(!bonusModal)}
                            confirm={handleBonusData}
                            cancel={() => setBonusModal(false)}
                          ></ConfirmModal>

                          <ConfirmModal
                            text="Are you sure promote?"
                            text2={
                              promoteData
                                ? `${designationLable} ${currPromoteData?.consultantName} to ${promoteData?.title}`
                                : "Consultant is already in the highest designation"
                            }
                            isOpen={promoteModal}
                            toggle={() => setPromoteModal(!promoteModal)}
                            confirm={handlePromoteData}
                            cancel={() => setPromoteModal(false)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
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
          {targetData && (
            <div className="custom-card-border p-4">
              {targetData?.personalStudentTarget > 0 && (
                <>
                  <TargetData
                    text="Student target"
                    value={targetData?.personalStudentTarget}
                  />
                  <hr />
                </>
              )}
              {targetData?.studentFromTeam > 0 && (
                <>
                  <TargetData
                    text="Team target"
                    value={targetData?.studentFromTeam}
                  />
                  <hr />
                </>
              )}

              <TargetData
                text="Consultant"
                value={targetData?.consultantTarget}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CommissionReport;
