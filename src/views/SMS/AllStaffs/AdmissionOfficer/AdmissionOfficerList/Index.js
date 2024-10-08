import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import { tableIdList } from "../../../../../constants/TableIdConstant";
import remove from "../../../../../helpers/remove";
import put from "../../../../../helpers/put";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Select from "react-select";
import loader from "../../../../../assets/img/load.gif";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import Pagination from "../../../Pagination/Pagination.jsx";
import AdmissionOfficerColumnHide from "./Component/AdmissionOfficerColumnHide";
import PrintCard from "./Component/PrintCard";
import AddmissionOfficerTable from "./Component/AddmissionOfficerTable";
import SelectAndClear from "./Component/SelectAndClear";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const Index = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [managerDD, setManagerDD] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [officerList, setOfficerList] = useState([]);
  const [officerName, setOfficerName] = useState("");
  const [officerId, setOfficerId] = useState(0);
  const [deleteData, setDeleteData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [providerDD, setProviderDD] = useState([]);
  const [managerDDForm, setManagerDDForm] = useState([]);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();
  const { providerId, managerId } = useParams();
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtonStatus] = useState(false);
  const [proLabel, setProLabel] = useState("Select Provider");
  const [proValue, setProValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [manager, setManager] = useState([]);
  const { admissionManagerId } = useParams();
  const [mId, setMId] = useState(0);

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
    });
  }, []);

  useEffect(() => {
    get(`TableDefination/Index/${tableIdList?.Admission_officer_List}`).then(
      (res) => {
        setTableData(res);
        console.log(res, "table data");
      }
    );
  }, [success]);

  useEffect(() => {
    if (admissionManagerId) {
      get("AdmissionManagerDD/index").then((res) => {
        setManager(res);
        const result = res.find((r) => r?.id === admissionManagerId);
        setManagerLabel(result?.name);
        setManagerValue(result?.id);
      });
    } else {
      get("ConsultantDD/index").then((res) => {
        setManager(res);
      });
    }
  }, [admissionManagerId]);

  useEffect(() => {
    if (providerId) {
      get("ProviderDD/Index").then((res) => {
        setProviderDD(res);
        const result = res?.find((ans) => ans?.id == providerId);
        setProLabel(result?.name);
      });
      get(`AdmissionManagerDD/Index/${providerId}`).then((res) => {
        setManagerDDForm(res);
        if (managerId) {
          const result = res?.find((ans) => ans?.id == managerId);

          setManagerLabel(result?.name);
        }
      });
    } else {
      get("ProviderDD/Index").then((res) => {
        setProviderDD(res);
      });
    }
    if (providerId !== undefined && managerId !== undefined) {
      get(
        `AdmissionOfficer/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&providerId=${providerId}&admissionmanagerId=${managerId}&search=${searchStr}`
      ).then((res) => {
        setOfficerList(res?.models);
        setEntity(res?.totalEntity);
        setSerialNum(res?.firstSerialNumber);
        setLoading(false);
      });
    } else {
      get(
        `AdmissionOfficer/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&providerId=${proValue}&admissionmanagerId=${managerValue}&search=${searchStr}`
      ).then((res) => {
        setOfficerList(res?.models);
        setEntity(res?.totalEntity);
        setSerialNum(res?.firstSerialNumber);
        setLoading(false);
      });
    }
  }, [
    providerId,
    managerId,
    currentPage,
    dataPerPage,
    managerValue,
    searchStr,
    success,
    proValue,
  ]);

  useEffect(() => {
    if (userType === userTypes?.AdmissionManager) {
      get(`AddmissionManagerProfile/Provider/${referenceId}`).then((res) => {
        setManagerValue(referenceId);
        setProValue(res?.id);
      });
    }

    if (userType === userTypes?.ProviderAdmin) {
      get(`ProviderAdmin/Get/${referenceId}`).then((res) => {
        setProValue(res?.id);
        get("ProviderDD/Index").then((proRes) => {
          setProviderDD(proRes);
          const result = proRes?.filter((ans) => ans?.id == res?.id);

          setProLabel(result[0]?.name);
        });
        get(`AdmissionManagerDD/Index/${res?.id}`).then((res) => {
          console.log(res);
          setManagerDD(res);
        });
      });

      get(
        `Provideradmin/GetProviderId/${localStorage.getItem("referenceId")}`
      ).then((res) => {
        setMId(res);
      });

      get(
        `AdmissionManagerDD/Index/${localStorage.getItem("referenceId")}`
      ).then((res) => {
        setManagerDDForm(res);
      });
    }
  }, []);

  console.log(managerDD);

  const managerMenu = managerDD.map((manager) => ({
    label: manager?.name,
    value: manager?.id,
  }));

  const selectManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
  };

  const providerMenu = providerDD?.map((provider) => ({
    label: provider?.name,
    value: provider?.id,
  }));

  const selectProviders = (label, value) => {
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setProLabel(label);
    setProValue(value);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setManagerDD(res);
    });
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const componentRef = useRef();

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setProLabel("Select Provider");
    setProValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    history.replace({
      universityId: null,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setOfficerId(0);
    setOfficerName("");
    setDeleteData({});
  };

  const handleDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`AdmissionOfficer/Delete/${deleteData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setDeleteModal(false);
      setOfficerId(0);
      setOfficerName("");
      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const handleAccountStatus = (e, officerId) => {
    // setChecked(e.target.checked);

    const subData = {
      id: officerId,
    };

    put(`AdmissionOfficer/UpdateAccountStatus/${officerId}`, subData).then(
      (res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const redirectToAssignPage = (providerId, managerId) => {
    history.push({
      pathname: `/assignOfficerUniversity/${providerId}/${managerId}`,
      managerList: "managerList",
    });
  };

  const redirectToSubjectPage = (data) => {
    history.push(`/admissionOfficerAssignedSubjects/${data}`);
  };

  const toggleDanger = (officer) => {
    setOfficerId(officer?.id);
    setOfficerName(officer?.firstName);
    setDeleteData(officer);
    setDeleteModal(true);
  };

  const handlRedirectToAdmissionofficerDetails = (officerId) => {
    history.push(`/admissionOfficerDetails/${officerId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    // setCheckSlNo(e.target.checked);
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Admission_officer_List}/${columnId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        setSuccess(!success);
      } else {
      }
    });
  };

  const redirectEdit = (officerId) => {
    history.push(`/admissionOfficerGeneralInfo/${officerId}`);
  };

  const handleAddNewOfficer = () => {
    history.push("/addAdmissionOfficerReg");
  };
  const handleAssignAdmissionOffer = () => {
    history.push(`/admissionManagersOfficerInformation/${managerId}`);
  };
  return (
    <div>
      {loading ? (
        <div className="text-center">
          <img src={loader} alt="" className="img-fluid" />
        </div>
      ) : (
        <div>
          <BreadCrumb
            title="Admission Officer List"
            backTo={
              providerId !== undefined && managerId !== undefined
                ? "Admission Manager List"
                : ""
            }
            path="/admissionManagerList"
          />

          <SelectAndClear
            userType={userType}
            providerMenu={providerMenu}
            proLabel={proLabel}
            proValue={proValue}
            selectProviders={selectProviders}
            providerId={providerId}
            managerMenu={managerMenu}
            managerLabel={managerLabel}
            managerValue={managerValue}
            selectManager={selectManager}
            managerId={managerId}
            searchStr={searchStr}
            searchValue={searchValue}
            handleKeyDown={handleKeyDown}
            handleClearSearch={handleClearSearch}
            setManagerLabel={setManagerLabel}
            setManagerValue={setManagerValue}
            setProLabel={setProLabel}
            setProValue={setProValue}
          ></SelectAndClear>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col
                  lg="5"
                  md="5"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(
                    permissionList.Add_AdmissionOfficer
                  ) ? (
                    <ButtonForFunction
                      func={handleAddNewOfficer}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add Admission Officer"}
                      permission={6}
                    />
                  ) : null}

                  {managerId !== undefined ? (
                    <>
                      {permissions?.includes(
                        permissionList.AdmissionManager_Assign_AdmissionOfficer
                      ) ? (
                        <ButtonForFunction
                          func={handleAssignAdmissionOffer}
                          className={"ml-3 btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Assign Admission Officer"}
                          permission={6}
                        />
                      ) : null}
                    </>
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
                  <div className="d-flex justify-content-md-end justify-content-sm-start">
                    {/* Dropdown number start */}
                    <div className="mr-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div className="mr-2">
                          <Select
                            options={dataSizeName}
                            value={{ label: dataPerPage, value: dataPerPage }}
                            onChange={(opt) => selectDataSize(opt.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Dropdown number end */}

                    <PrintCard
                      dropdownOpen={dropdownOpen}
                      toggle={toggle}
                      componentRef={componentRef}
                    ></PrintCard>

                    <AdmissionOfficerColumnHide
                      dropdownOpen1={dropdownOpen1}
                      toggle1={toggle1}
                      tableData={tableData}
                      handleChecked={handleChecked}
                    ></AdmissionOfficerColumnHide>
                  </div>
                </Col>
              </Row>

              <AddmissionOfficerTable
                componentRef={componentRef}
                tableData={tableData}
                permissions={permissions}
                permissionList={permissionList}
                officerList={officerList}
                history={history}
                redirectToAssignPage={redirectToAssignPage}
                redirectToSubjectPage={redirectToSubjectPage}
                handleAccountStatus={handleAccountStatus}
                handlRedirectToAdmissionofficerDetails={
                  handlRedirectToAdmissionofficerDetails
                }
                redirectEdit={redirectEdit}
                toggleDanger={toggleDanger}
                deleteModal={deleteModal}
                closeDeleteModal={closeDeleteModal}
                officerName={officerName}
                handleDelete={handleDelete}
                buttonStatus={buttonStatus}
                progress={progress}
              />

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
