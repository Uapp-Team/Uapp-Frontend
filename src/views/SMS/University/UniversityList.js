import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../Pagination/Pagination.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import uapploader from "../../../assets/img/Uapp_fav.png";
import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import remove from "../../../helpers/remove.js";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
// import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import Loader from "../Search/Loader/Loader.js";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ToggleSwitch from "../Components/ToggleSwitch.js";
import put from "../../../helpers/put.js";
import { tableIdList } from "../../../constants/TableIdConstant.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import TagButton from "../../../components/buttons/TagButton.js";
import ConfirmModal from "../../../components/modal/ConfirmModal.js";
import { Link } from "react-router-dom";
import ColumnUniversity from "../TableColumn/ColumnUniversity.js";
import Typing from "../../../components/form/Typing.js";
import Filter from "../../../components/Dropdown/Filter.js";

const UniversityList = (props) => {
  const UniversityPaging = JSON.parse(sessionStorage.getItem("university"));
  const { counId, univerTypeId, provideId } = useParams();
  const location = useLocation();
  const currentRoute = location.pathname;
  const history = useHistory();
  const [universityList, setUniversityList] = useState([]);
  const [entity, setEntity] = useState(0);
  // const [callApi, setCallApi] = useState(false);
  // const [serialNum, setSerialNum] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [currentPage, setCurrentPage] = useState(
    UniversityPaging?.currentPage ? UniversityPaging?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    UniversityPaging?.dataPerPage ? UniversityPaging?.dataPerPage : 15
  );
  const [orderLabel, setOrderLabel] = useState(
    UniversityPaging?.orderLabel ? UniversityPaging?.orderLabel : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    UniversityPaging?.orderValue ? UniversityPaging?.orderValue : 0
  );
  const [searchStr, setSearchStr] = useState(
    UniversityPaging?.searchStr ? UniversityPaging?.searchStr : ""
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  // const [stateList, setstateList] = useState([0]);
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversityTypes] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [ulist, setUList] = useState([]);

  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  // const univerSList = props.univerSityDropDownList[0];

  // const [stateByCountry, setStateByCountry] = useState(0);

  const [uniTypeLabel, setUniTypeLabel] = useState(
    UniversityPaging?.uniTypeLabel ? UniversityPaging?.uniTypeLabel : "Type"
  );
  const [uniTypeValue, setUniTypeValue] = useState(
    UniversityPaging?.uniTypeValue ? UniversityPaging?.uniTypeValue : 0
  );
  const [uniCountryLabel, setUniCountryLabel] = useState(
    UniversityPaging?.uniCountryLabel
      ? UniversityPaging?.uniCountryLabel
      : "Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(
    UniversityPaging?.uniCountryValue ? UniversityPaging?.uniCountryValue : 0
  );
  const [uniStateLabel, setUniStateLabel] = useState(
    UniversityPaging?.uniStateLabel ? UniversityPaging?.uniStateLabel : "State"
  );
  const [unistateValue, setUniStateValue] = useState(
    UniversityPaging?.unistateValue ? UniversityPaging?.unistateValue : 0
  );
  const [providerLabel, setProviderLabel] = useState(
    UniversityPaging?.providerLabel
      ? UniversityPaging?.providerLabel
      : "Provider"
  );
  const [providerValue, setProviderValue] = useState(
    UniversityPaging?.providerValue ? UniversityPaging?.providerValue : 0
  );

  const [branchLabel, setBranchLabel] = useState(
    UniversityPaging?.branchLabel
      ? UniversityPaging?.branchLabel
      : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    UniversityPaging?.branchValue ? UniversityPaging?.branchValue : 0
  );

  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  // const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log(tableData, "tableData");

  const [delData, setDelData] = useState({});
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // const providerData = useSelector(
  //   (state) => state?.universityProviderDataReducer?.universityProviders
  // );
  // const providerDataResult = providerData?.models;
  //
  const userType = localStorage.getItem("userType");
  // const referenceId = localStorage.getItem("referenceId");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const tableColumnUniversity = JSON.parse(
      localStorage.getItem("ColumnUniversity")
    );
    tableColumnUniversity && setTableData(tableColumnUniversity);
    !tableColumnUniversity &&
      localStorage.setItem(
        "ColumnUniversity",
        JSON.stringify(ColumnUniversity)
      );
    !tableColumnUniversity && setTableData(ColumnUniversity);
  }, []);

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });
  }, [setBranchLabel, setBranchValue]);

  useEffect(() => {
    sessionStorage.setItem(
      "university",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        uniTypeLabel: uniTypeLabel && uniTypeLabel,
        uniTypeValue: uniTypeValue && uniTypeValue,
        uniCountryLabel: uniCountryLabel && uniCountryLabel,
        uniCountryValue: uniCountryValue && uniCountryValue,
        uniStateLabel: uniStateLabel && uniStateLabel,
        unistateValue: unistateValue && unistateValue,
        providerLabel: providerLabel && providerLabel,
        providerValue: providerValue && providerValue,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [
    currentPage,
    uniTypeLabel,
    uniTypeValue,
    uniCountryLabel,
    uniCountryValue,
    uniStateLabel,
    unistateValue,
    providerLabel,
    providerValue,
    orderLabel,
    orderValue,
    searchStr,
    dataPerPage,
    branchLabel,
    branchValue,
  ]);

  useEffect(() => {
    get(`ProviderDD/Index/${branchValue}`).then((res) => {
      setProviderList(res);
    });

    get(`UniversityCountryDD/Index`).then((res) => {
      setUniverSityCountries(res);
    });

    get(`UniversityTypeDD/Index`).then((res) => {
      setUniversityTypes(res);
    });
  }, [branchValue]);

  useEffect(() => {
    if (provideId) {
      const result = providerList?.find(
        (ans) => ans?.id.toString() === provideId
      );
      setProviderLabel(result?.name);
    }
  }, [provideId, providerList]);

  useEffect(() => {
    if (counId) {
      const result = univerSityCountries?.find(
        (ans) => ans?.id.toString() === counId
      );
      setUniCountryLabel(result?.name);
    }
  }, [counId, univerSityCountries]);

  useEffect(() => {
    if (!isTyping) {
      setLoading(true);
      if (counId !== undefined) {
        get(
          `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${counId}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}&branchid=${branchValue}`
        ).then((action) => {
          setUniversityList(action?.models);

          setLoading(false);
          setEntity(action?.totalEntity);
          // setSerialNum(action?.firstSerialNumber);
        });
      } else if (univerTypeId !== undefined) {
        get(
          `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${univerTypeId}&search=${searchStr}&orderId=${orderValue}&branchid=${branchValue}`
        ).then((action) => {
          setUniversityList(action?.models);

          setLoading(false);
          setEntity(action?.totalEntity);
          // setSerialNum(action?.firstSerialNumber);
        });
      } else if (provideId !== undefined) {
        get(
          `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${provideId}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}&branchid=${branchValue}`
        ).then((action) => {
          setUniversityList(action?.models);
          setLoading(false);
          setEntity(action?.totalEntity);
          // setSerialNum(action?.firstSerialNumber);
        });
      } else {
        get(
          `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}&branchid=${branchValue}`
        ).then((action) => {
          console.log("action", action);
          setUniversityList(action?.models);
          setLoading(false);
          setEntity(action?.totalEntity);
          // setSerialNum(action?.firstSerialNumber);
        });
      }
    }
  }, [
    counId,
    provideId,
    univerTypeId,
    currentPage,
    dataPerPage,
    searchStr,
    uniCountryValue,
    uniTypeValue,
    unistateValue,
    orderValue,
    providerValue,
    success,
    isTyping,
    branchValue,
  ]);

  const searchStateByCountry = (countryValue) => {
    get(`UniversityStateDD/Index/${countryValue}`).then((res) => {
      // dispatch(StoreUniversityStateData(res));
      setUniversityStates(res);
    });
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    // setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  // user select order
  const orderArr = [
    {
      label: "Newest",
      value: 1,
    },
    {
      label: "Oldest",
      value: 2,
    },
    {
      label: "A-Z",
      value: 3,
    },
    {
      label: "Z-A",
      value: 4,
    },
  ];
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    // setCallApi((prev) => !prev);
  };

  const selectOrder = (label, value) => {
    //
    setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    // setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setCallApi((prev) => !prev);
  };

  // add university handler
  const handleAddUniversity = () => {
    provideId
      ? history.push(`/addUniversityByprovideId/${provideId}`)
      : history.push("/addUniversity");
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));
  const universityTypeName = universityTypes?.map((uniType) => ({
    label: uniType.name,
    value: uniType.id,
  }));
  // select University Type

  const providerlist = providerList?.map((prov) => ({
    label: prov.name,
    value: prov.id,
  }));
  //

  const selectUniType = (label, value) => {
    setUniTypeLabel(label);
    setUniTypeValue(value);
    handleSearch();
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("State");
    setUniStateValue(0);
    searchStateByCountry(value);
    handleSearch();
  };

  //

  // select University State
  const selectUniState = (label, value) => {
    setUniStateLabel(label);
    setUniStateValue(value);
    handleSearch();
  };

  const redirectToAdManagerList = (data) => {
    history.push(`/universityAdmissionManagers/${data}`);
  };

  const redirectToAdOfficerList = (data) => {
    history.push(`/universityAdmissionOfficers/${data}`);
  };

  const selectProviderState = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setBranchLabel("Select branch");
    setBranchValue(0);
    setUniStateLabel("State");
    setUniStateValue(0);
    setUniversityStates([]);
    setUniTypeLabel("Type");
    setUniTypeValue(0);
    setUniCountryLabel("Country");
    setUniCountryValue(0);
    setSearchStr("");
    setProviderLabel("Provider");
    setProviderValue(0);
    setCurrentPage(1);
    // setCallApi((prev) => !prev);
  };

  // useEffect(() => {
  //   handleClearSearch();
  // }, [currentRoute]);

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      // setCallApi((prev) => !prev);
    }
  };

  // redirect to campus list
  const redirectToCampusList = (id) => {
    localStorage.setItem("universityId", id);
    history.push({
      pathname: `/campusList/${id}`,
      id,
    });
  };

  // deleteing university

  const handleDeleteUniversity = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`University/Delete/${delData?.id}`).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setSuccess(!success);
        setDeleteModal(false);
        setProgress(false);
      } else {
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setDeleteModal(false);
        setSuccess(!success);
        setProgress(false);
      }
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // deleting university end

  const handleEdit = (data) => {
    history.push(`/addUniversity/${data?.id}`);
  };

  // const handleExportXLSX = () => {
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(universityList);
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };

  const componentRef = useRef();

  const redirectToApplications = (universityId, universityName) => {
    history.push({
      pathname: `/applicationsFromUniversity/${universityId}`,
      universityIdFromUniList: universityId,
      universityName: universityName,
    });
  };

  const redirectToUniprofile = (uniId) => {
    history.push(`/universityDetails/${uniId}`);
  };

  const handleUpdateStatus = (data) => {
    put(`University/UpdateStatus/${data?.id}`).then((res) => {
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
    });
  };

  // for hide/unhide column

  // for hide/unhide column
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnUniversity", JSON.stringify(values));
  };

  return (
    <div>
      <div>
        <BreadCrumb
          title="University List"
          backTo={
            counId !== undefined
              ? "University Countries"
              : univerTypeId !== undefined
              ? "University Types"
              : provideId !== undefined
              ? " Provider List"
              : ""
          }
          path={
            counId !== undefined
              ? "/admissionManagerList"
              : univerTypeId !== undefined
              ? "/UniversityTypes"
              : provideId !== undefined
              ? "/providerList"
              : "/"
          }
        />

        <Card className="uapp-employee-search zindex-100">
          <CardBody className="search-card-body">
            <div className="test-score-div-1-style mt-1 mb-4">
              <div>
                This page contains the list of all universities, you can view
                and edit any information of each university from here.
              </div>
            </div>

            <Row>
              {branch.length > 1 && (
                <Col lg="2" md="3" sm="6" xs="6">
                  <Filter
                    data={branch}
                    label={branchLabel}
                    setLabel={setBranchLabel}
                    value={branchValue}
                    setValue={setBranchValue}
                    action={() => {
                      setProviderValue(0);
                      setProviderLabel("Provider");
                    }}
                  />
                </Col>
              )}

              <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                <Select
                  options={universityTypeName}
                  value={{ label: uniTypeLabel, value: uniTypeValue }}
                  onChange={(opt) => selectUniType(opt.label, opt.value)}
                  name="UniversityTypeId"
                  id="UniversityTypeId"
                  isDisabled={univerTypeId !== undefined ? true : false}
                />
              </Col>

              <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                <Select
                  options={universityCountryName}
                  value={{ label: uniCountryLabel, value: uniCountryValue }}
                  onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                  name="UniversityCountryId"
                  id="UniversityCountryId"
                  isDisabled={counId !== undefined ? true : false}
                />
              </Col>

              <Col lg="2" md="3" sm="6" xs="6" className="mb-2">
                <Select
                  options={universityStateName}
                  value={{ label: uniStateLabel, value: unistateValue }}
                  onChange={(opt) => selectUniState(opt.label, opt.value)}
                  name="UniversityStateId"
                  id="UniversityStateId"
                />
              </Col>
              {!(
                userType === userTypes?.Provider ||
                userType === userTypes?.ProviderAdmin ||
                userType === userTypes?.AdmissionOfficer ||
                userType === userTypes?.AdmissionManager
              ) ? (
                <Col lg="2" md="3" sm="6" xs="6">
                  <Select
                    options={providerlist}
                    value={{ label: providerLabel, value: providerValue }}
                    onChange={(opt) =>
                      selectProviderState(opt.label, opt.value)
                    }
                    name="providerId"
                    id="providerId"
                    isDisabled={provideId !== undefined ? true : false}
                  />
                </Col>
              ) : null}

              <Col lg="2" md="3" sm="6" xs="6">
                <Typing
                  name="search"
                  placeholder="Name, Short Name"
                  value={searchStr}
                  setValue={setSearchStr}
                  setIsTyping={setIsTyping}
                  onKeyDown={handleKeyDown}
                />
              </Col>
            </Row>

            <Row className="">
              <Col lg="12" md="12" sm="12" xs="12">
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <div className="d-flex mt-1">
                    {(userType === userTypes?.SystemAdmin &&
                      branchValue !== 0) ||
                    uniTypeValue !== 0 ||
                    uniCountryValue !== 0 ||
                    unistateValue !== 0 ||
                    providerValue !== 0
                      ? ""
                      : ""}
                    {userType === userTypes?.SystemAdmin &&
                    branchValue !== 0 ? (
                      <TagButton
                        label={branchLabel}
                        setValue={() => setBranchValue(0)}
                        setLabel={() => setBranchLabel("Select Branch")}
                      ></TagButton>
                    ) : (
                      ""
                    )}

                    {uniTypeValue !== 0 ? (
                      <TagButton
                        label={uniTypeLabel}
                        setValue={() => setUniTypeValue(0)}
                        setLabel={() => setUniTypeLabel("Type")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {uniTypeValue !== 0 &&
                      (uniCountryValue !== 0 ||
                      unistateValue !== 0 ||
                      providerValue !== 0
                        ? ""
                        : "")}
                    {uniCountryValue !== 0 ? (
                      <TagButton
                        label={uniCountryLabel}
                        setValue={() => setUniCountryValue(0)}
                        setLabel={() => setUniCountryLabel("Country")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {uniCountryValue !== 0 &&
                      (unistateValue !== 0 || providerValue !== 0 ? "" : "")}
                    {unistateValue !== 0 ? (
                      <TagButton
                        label={uniStateLabel}
                        setValue={() => setUniStateValue(0)}
                        setLabel={() => setUniStateLabel("State")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {unistateValue !== 0 && providerValue !== 0 ? "" : ""}
                    {providerValue !== 0 ? (
                      <TagButton
                        label={providerLabel}
                        setValue={() => setProviderValue(0)}
                        setLabel={() => setProviderLabel("Provider")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-1 mx-1 d-flex btn-clear">
                    {(userType === userTypes?.SystemAdmin &&
                      branchValue !== 0) ||
                    uniTypeValue !== 0 ||
                    uniCountryValue !== 0 ||
                    unistateValue !== 0 ||
                    providerValue !== 0 ? (
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
          </CardBody>
        </Card>

        {/* this portion is saved in text-file in desktop */}
        <Card className="uapp-employee-search">
          <CardBody>
            <Row className="mb-3">
              <Col lg="5" md="5" sm="12" xs="12">
                {permissions?.includes(permissionList.Add_University) ? (
                  <ButtonForFunction
                    func={handleAddUniversity}
                    className={"btn btn-uapp-add "}
                    icon={<i className="fas fa-plus"></i>}
                    name={" Add University"}
                    permission={6}
                  />
                ) : null}
              </Col>

              <Col lg="7" md="7" sm="12" xs="12">
                <div className="d-flex flex-wrap justify-content-end">
                  <div className="me-3 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="mr-2">Order By :</div>
                      <div className="ddzindex">
                        <Select
                          className="mr-md-2 mr-sm-0"
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

                  <div className="mr-3">
                    <Dropdown
                      className="uapp-dropdown"
                      style={{ float: "right" }}
                      isOpen={dropdownOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle caret>
                        <i className="fas fa-print fs-7"></i>
                      </DropdownToggle>
                      <DropdownMenu className="bg-dd-4">
                        <div className="d-flex justify-content-around align-items-center mt-2">
                          <div className="cursor-pointer">
                            <ReactTableConvertToXl
                              id="test-table-xls-button"
                              table="table-to-xls"
                              filename="tablexls"
                              sheet="tablexls"
                              icon={<i className="fas fa-file-excel"></i>}
                            />
                          </div>
                          {/* <div className="cursor-pointer">
                            <ReactToPrint
                              trigger={() => (
                                <p>
                                  <i className="fas fa-file-pdf"></i>
                                </p>
                              )}
                              content={() => componentRef.current}
                            />
                          </div> */}
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide starts here */}

                  <div className="">
                    <Dropdown
                      className="uapp-dropdown"
                      style={{ float: "right" }}
                      isOpen={dropdownOpen1}
                      toggle={toggle1}
                    >
                      <DropdownToggle caret>
                        <i className="fas fa-bars"></i>
                      </DropdownToggle>
                      <DropdownMenu className="bg-dd-1">
                        {tableData?.map((table, i) => (
                          <div key={i}>
                            {i === 5 ? (
                              <>
                                {permissions?.includes(
                                  permissionList?.AdmissionManager_Assign_University
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}
                              </>
                            ) : i === 6 ? (
                              <>
                                {" "}
                                {permissions?.includes(
                                  permissionList?.AdmissionOfficer_Assign_University
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}{" "}
                              </>
                            ) : i === 7 ? (
                              <>
                                {" "}
                                {permissions?.includes(
                                  permissionList.View_University
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}{" "}
                              </>
                            ) : i === 8 ? (
                              <>
                                {" "}
                                {permissions?.includes(
                                  permissionList.View_Application_List
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}{" "}
                              </>
                            ) : i === 9 ? (
                              <>
                                {permissions?.includes(
                                  permissionList.View_Subject_List
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}
                              </>
                            ) : i === 10 ? (
                              <>
                                {" "}
                                {permissions?.includes(
                                  permissionList?.Change_University_Status
                                ) && (
                                  <div className="d-flex justify-content-between">
                                    <Col md="8" className="">
                                      <p className="">{table?.title}</p>
                                    </Col>

                                    <Col md="4" className="text-center">
                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id=""
                                          name="isAcceptHome"
                                          onChange={(e) => {
                                            handleChecked(e, i);
                                          }}
                                          defaultChecked={table?.isActive}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </div>
                                )}{" "}
                              </>
                            ) : (
                              <div className="d-flex justify-content-between">
                                <Col md="8" className="">
                                  <p className="">{table?.title}</p>
                                </Col>

                                <Col md="4" className="text-center">
                                  <FormGroup check inline>
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id=""
                                      name="isAcceptHome"
                                      onChange={(e) => {
                                        handleChecked(e, i);
                                      }}
                                      defaultChecked={table?.isActive}
                                    />
                                  </FormGroup>
                                </Col>
                              </div>
                            )}
                          </div>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide ends here */}
                </div>
              </Col>
            </Row>

            {loading ? (
              <Loader />
            ) : universityList?.length === 0 ? (
              <h3 className="text-center my-4">No data Found</h3>
            ) : (
              <>
                <div className="table-responsive fixedhead" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Logo</th> : null}

                        {tableData[1]?.isActive ? <th>Name</th> : null}
                        {tableData[2]?.isActive ? <th>Provider</th> : null}

                        {tableData[3]?.isActive ? <th>Type</th> : null}

                        {tableData[4]?.isActive ? <th>Country</th> : null}

                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_University
                        ) ? (
                          <>{tableData[5]?.isActive ? <th>ADM</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList?.AdmissionOfficer_Assign_University
                        ) ? (
                          <>{tableData[6]?.isActive ? <th>ADO</th> : null}</>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_University
                        ) ? (
                          <>
                            {" "}
                            {tableData[7]?.isActive ? <th>Campus</th> : null}
                          </>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_Application_List
                        ) ? (
                          <>
                            {tableData[8]?.isActive ? (
                              <th>Applications</th>
                            ) : null}
                          </>
                        ) : null}

                        {permissions?.includes(
                          permissionList.View_Subject_List
                        ) ? (
                          <>
                            {" "}
                            {tableData[9]?.isActive ? <th>Courses</th> : null}
                          </>
                        ) : null}

                        {tableData[10]?.isActive ? <th>Branch</th> : null}

                        {permissions?.includes(
                          permissionList?.Change_University_Status
                        ) ? (
                          <>
                            {tableData[11]?.isActive ? <th>Status</th> : null}
                          </>
                        ) : null}

                        {tableData[12]?.isActive ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {universityList?.map((university, i) => (
                        <tr
                          key={university?.id}
                          style={{ textAlign: "center" }}
                        >
                          {tableData[0]?.isActive ? (
                            <td>
                              {university?.universityLogo == null ? (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image bg-white"
                                    src={uapploader}
                                    alt="university_logo"
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img
                                    className="Uapp-c-image"
                                    src={
                                      rootUrl +
                                      university?.universityLogo?.thumbnailUrl
                                    }
                                    alt="university_logo"
                                  />
                                </>
                              )}
                            </td>
                          ) : null}

                          {tableData[1]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <Link
                                className="text-id hover"
                                to={`/universityDetails/${university?.id}`}
                              >
                                {university?.name}{" "}
                                {university?.shortName &&
                                  `(${university?.shortName})`}
                              </Link>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <Link
                                className="text-id hover"
                                to={`/providerDetails/${university?.providerId}`}
                              >
                                {university?.providerName}
                              </Link>
                            </td>
                          ) : null}

                          {tableData[3]?.isActive ? (
                            <td>{university?.universityType?.name}</td>
                          ) : null}

                          {tableData[4]?.isActive ? (
                            <td>
                              {university?.universityCountry?.name} (
                              {university?.universityState?.name})
                            </td>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_University
                          ) ? (
                            <>
                              {tableData[5]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() =>
                                        redirectToAdManagerList(university?.id)
                                      }
                                      className="Count-fifth"
                                    >
                                      View
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionOfficer_Assign_University
                          ) ? (
                            <>
                              {tableData[6]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() =>
                                        redirectToAdOfficerList(university?.id)
                                      }
                                      className="Count-fourth"
                                    >
                                      View
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_University
                          ) ? (
                            <>
                              {" "}
                              {tableData[7]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() =>
                                        redirectToCampusList(university?.id)
                                      }
                                      className="Count-first"
                                    >
                                      {university?.totalCampus}
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Application_List
                          ) ? (
                            <>
                              {tableData[8]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    {university?.totalApplication > 0 ? (
                                      <span
                                        onClick={() =>
                                          redirectToApplications(
                                            university?.id,
                                            university?.name
                                          )
                                        }
                                        className="Count-second"
                                      >
                                        {university?.totalApplication}
                                      </span>
                                    ) : (
                                      <span className="Count-second noPointer">
                                        {university?.totalApplication}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {/* <td onClick={()=>handleRedirectToSubList(university?.id)}> */}

                          {permissions?.includes(
                            permissionList.View_Subject_List
                          ) ? (
                            <>
                              {" "}
                              {tableData[9]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/university-courses/${university?.id}`
                                        );
                                      }}
                                      className="Count-third"
                                    >
                                      {university?.totalSubject}
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[10]?.isActive ? (
                            <td>{university?.branchName}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.Change_University_Status
                          ) ? (
                            <>
                              {tableData[11]?.isActive ? (
                                <td>
                                  <ToggleSwitch
                                    defaultChecked={university?.isActive}
                                    onChange={() =>
                                      handleUpdateStatus(university)
                                    }
                                  />
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[12]?.isActive ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {permissions?.includes(
                                  permissionList.View_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      redirectToUniprofile(university?.id)
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {permissions?.includes(
                                  permissionList.Edit_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleEdit(university)}
                                    color={"warning"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-edit"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {/* </Link> */}

                                {permissions?.includes(
                                  permissionList.Delete_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() => toggleDanger(university)}
                                    color={"danger"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                ) : null}
                              </ButtonGroup>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* modal for delete */}
                  <ConfirmModal
                    text="Do You Want To Delete This University ? Once Deleted it can't be Undone "
                    // ${delData?.name}
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    cancel={closeDeleteModal}
                    buttonStatus={buttonStatus}
                    progress={progress}
                    confirm={handleDeleteUniversity}
                  />
                </div>
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
    </div>
  );
};

export default UniversityList;
