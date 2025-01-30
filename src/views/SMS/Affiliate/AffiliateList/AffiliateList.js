import React, { useEffect, useRef, useState } from "react";
import TagButton from "../../../../components/buttons/TagButton";
import { Card, CardBody, Col, Row } from "reactstrap";
import Typing from "../../../../components/form/Typing";
import Select from "react-select";
import icon_info from "../../../../assets/img/icons/icon_info.png";
import LinkButton from "../../Components/LinkButton";
import PrintFile from "./PrintFile";
import AffiliateColumnHide from "./AffiliateColumnHide";
import AffiliateTable from "./AffiliateTable";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { userTypes } from "../../../../constants/userTypeConstant";
import put from "../../../../helpers/put";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import Pagination from "../../Pagination/Pagination";
import Uget from "../../../../helpers/Uget";
import Uremove from "../../../../helpers/Uremove";
import Loader from "../../Search/Loader/Loader";
import Filter from "../../../../components/Dropdown/Filter";

const AffiliateList = () => {
  const userType = localStorage.getItem("userType");
  const userTypeId = localStorage.getItem("referenceId");
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Status");
  const [statusValue, setStatusValue] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(
    userType === userTypes?.Consultant.toString() ? userTypeId : 0
  );
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [dataPerPage, setDataPerPage] = useState(15);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const componentRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [affiliateList, setAffiliateList] = useState({});
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchValue, setBranchValue] = useState(0);
  const [branchLabel, setBranchLabel] = useState("Select branch");

  const [entity, setEntity] = useState(0);

  const [serialNum, setSerialNum] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [delData, setDelData] = useState({});
  const history = useHistory();

  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const consultantName = consultant?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectConsultant = (label, value) => {
    setconsultantLabel(label);
    setConsultantValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });

    get(`ConsultantDD/ByBranch/${branchValue}`).then((res) => {
      setConsultant(res);
    });

    get("AccountStatusDD/index").then((res) => {
      setStatusType(res);
    });
  }, [branchValue]);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `Affiliate/paginated-list?&status=${statusValue}&searchstring=${searchStr}&page=${currentPage}&pageSize=${dataPerPage}&consultantid=${consultantValue}&branchid=${branchValue}`
      ).then((res) => {
        console.log(res);
        setAffiliateList(res?.items);
        setSerialNum(res?.from);
        setEntity(res?.totalFiltered);
        setLoading(false);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    statusValue,
    loading,
    success,
    isTyping,
    consultantValue,
    branchValue,
  ]);

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
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
    localStorage.setItem("ColumnAffiliate", JSON.stringify(values));
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      setPassError("Confirm your password");
    } else {
      setPassError("");
    }
    if (pass && e.target.value !== pass) {
      setPassError("Passwords doesn't match.");
    } else {
      setPassError("");
    }
  };

  const submitModalForm = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pass)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setProgress(true);
      put(`Password/ChangePasswordForAffiliate`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res.data?.isSuccess == true) {
          addToast(res?.data?.title, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
          setPass("");
          setCPass("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  const passValidate = (e) => {
    setPass(e.target.value);
    if (e.target.value === "") {
      setError("Provide a valid password");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setError("");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const redirectToConsultantDashboard = (id) => {
    history.push(`/affiliate-dashboard/${id}`);
  };

  const redirectToConsultantProfile = (id) => {
    history.push(`/affiliate-profile/${id}`);
  };

  const handleUpdate = (data) => {
    put(`Affiliate/toggle-block-status/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.title, {
          autoDismiss: true,
          appearance: "success",
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.title, {
          autoDismiss: true,
          appearance: "error",
        });
      }
    });
  };

  const handleReset = () => {
    setBranchLabel("Select branch");
    setBranchValue(0);
    setStatusLabel("Status");
    setStatusValue(0);
    setconsultantLabel("Select Consultant");
    setConsultantValue(0);
    setSearchStr("");
    setCurrentPage(1);
  };

  const handleEdit = (data) => {
    history.push(`/affiliatePersonalInfo/${data?.id}`);
  };

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    Uremove(`Affiliate/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <BreadCrumb title="Affiliate List" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <Row>
            {branch.length > 1 && (
              <Col className="uapp-mb mb-2" md="3" sm="12">
                <Filter
                  data={branch}
                  label={branchLabel}
                  setLabel={setBranchLabel}
                  value={branchValue}
                  setValue={setBranchValue}
                  action={() => {
                    setConsultantValue(0);
                    setconsultantLabel("Select Consultant");
                  }}
                />
              </Col>
            )}

            {adminPermission && (
              <Col className="uapp-mb mb-2" md="3" sm="12">
                <Select
                  options={consultantName}
                  value={{
                    label: consultantLabel,
                    value: consultantValue,
                  }}
                  onChange={(opt) => selectConsultant(opt.label, opt.value)}
                  name="consultantId"
                  id="consultantId"
                />
              </Col>
            )}

            <Col className="uapp-mb mb-2" md="3" sm="12">
              <Select
                options={statusTypeMenu}
                value={{
                  label: statusLabel,
                  value: statusValue,
                }}
                onChange={(opt) => selectStatusType(opt.label, opt.value)}
                name="consultantTypeId"
                id="consultantTypeId"
                // isDisabled={type ? true : false}
              />
            </Col>

            <Col className="uapp-mb mb-2" md="3" sm="12">
              <Typing
                name="search"
                placeholder="Name, Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={handleKeyDown}
              />

              <div className="mt-1 d-flex justify-between ">
                <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                <div className="pl-2" style={{ paddingTop: "2px" }}>
                  <span>Name should not include title.</span>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div className="d-flex justify-between-start">
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {userType === userTypes?.SystemAdmin && branchValue !== 0 ? (
                    <TagButton
                      label={branchLabel}
                      setValue={() => setBranchValue(0)}
                      setLabel={() => setBranchLabel("Select branch")}
                    />
                  ) : (
                    ""
                  )}
                  {adminPermission && consultantValue !== 0 ? (
                    <TagButton
                      label={consultantLabel}
                      setValue={() => setConsultantValue(0)}
                      setLabel={() => setconsultantLabel("Select Consultant")}
                    ></TagButton>
                  ) : (
                    ""
                  )}

                  {consultantValue !== 0 && statusValue !== 0 ? "" : ""}
                  {statusValue !== 0 ? (
                    <TagButton
                      label={statusLabel}
                      setValue={() => setStatusValue(0)}
                      setLabel={() => setStatusLabel("Status")}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear mb-2">
                  {(userType === userTypes?.SystemAdmin && branchValue !== 0) ||
                  (adminPermission && consultantValue !== 0) ||
                  statusValue !== 0 ? (
                    <button className="tag-clear" onClick={handleReset}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {/* {permissions?.includes(permissionList?.Add_Consultant) ? ( */}
              <LinkButton
                url={"/affiliate-registration"}
                className={"btn btn-uapp-add "}
                name={"Add Affiliate"}
                icon={<i className="fas fa-plus"></i>}
              />
              {/* ) : null} */}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex justify-content-end">
                {/* Dropdown number start */}
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
                {/* Dropdown number end */}

                <PrintFile
                  dropdownOpen={dropdownOpen}
                  toggle={toggle}
                  componentRef={componentRef}
                ></PrintFile>

                <AffiliateColumnHide
                  dropdownOpen1={dropdownOpen1}
                  toggle1={toggle1}
                  tableData={tableData}
                  setTableData={setTableData}
                  handleChecked={handleChecked}
                ></AffiliateColumnHide>
              </div>
            </Col>
          </Row>

          {permissions?.includes(permissionList?.View_Consultant_list) && (
            <>
              {affiliateList?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <>
                  {loading ? (
                    <Loader />
                  ) : (
                    <AffiliateTable
                      componentRef={componentRef}
                      tableData={tableData}
                      permissions={permissions}
                      permissionList={permissionList}
                      userTypeId={userTypeId}
                      userTypes={userTypes}
                      affiliateList={affiliateList}
                      serialNum={serialNum}
                      history={history}
                      handlePass={handlePass}
                      passModal={passModal}
                      handleToggle={handleToggle}
                      passData={passData}
                      submitModalForm={submitModalForm}
                      passValidate={passValidate}
                      setError={setError}
                      error={error}
                      verifyPass={verifyPass}
                      confirmPassword={confirmPassword}
                      setPassModal={setPassModal}
                      progress={progress}
                      passError={passError}
                      handleDate={handleDate}
                      handleUpdate={handleUpdate}
                      redirectToConsultantProfile={redirectToConsultantProfile}
                      userType={userType}
                      redirectToConsultantDashboard={
                        redirectToConsultantDashboard
                      }
                      handleEdit={handleEdit}
                      toggleDanger={toggleDanger}
                      deleteModal={deleteModal}
                      setDeleteModal={setDeleteModal}
                      handleDeleteData={handleDeleteData}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </>
              )}
            </>
          )}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AffiliateList;
