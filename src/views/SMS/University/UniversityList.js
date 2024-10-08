import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../Pagination/Pagination.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import uapploader from "../../../assets/img/Uapp_fav.png";
import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { StoreUniversityStateData } from "../../../redux/actions/SMS/UniversityAction/UniversityStateAction.js";
import { Link } from "react-router-dom";
import remove from "../../../helpers/remove.js";
import { StoreUniversityListData } from "../../../redux/actions/SMS/UniversityAction/UniversityListAction";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import LinkSpanButton from "../Components/LinkSpanButton.js";
import SpanButton from "../Components/SpanButton.js";
import LinkButton from "../Components/LinkButton.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { Axios } from "axios";
import Loader from "../Search/Loader/Loader.js";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import ToggleSwitch from "../Components/ToggleSwitch.js";
import put from "../../../helpers/put.js";
import { tableIdList } from "../../../constants/TableIdConstant.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import TagButton from "../../../components/buttons/TagButton.js";
import ConfirmModal from "../../../components/modal/ConfirmModal.js";

const UniversityList = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [universityList, setUniversityList] = useState([]);
  console.log(universityList, "vairevai");

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [orderLabel, setOrderLabel] = useState("Order By");
  const [orderValue, setOrderValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateList, setstateList] = useState([0]);
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversityTypes] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ulist, setUList] = useState([]);

  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const univerSList = props.univerSityDropDownList[0];

  const [stateByCountry, setStateByCountry] = useState(0);

  const [uniTypeLabel, setUniTypeLabel] = useState("Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryLabel, setUniCountryLabel] = useState("Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState("State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [delData, setDelData] = useState({});
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const providerData = useSelector(
    (state) => state?.universityProviderDataReducer?.universityProviders
  );
  const providerDataResult = providerData?.models;
  //
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const { counId, univerTypeId, provideId } = useParams();

  useEffect(() => {
    provideId
      ? get(`ProviderDD/Index`).then((res) => {
          setProviderList(res);

          const result = res?.find((ans) => ans?.id == provideId);
          setProviderLabel(result?.name);
        })
      : get(`ProviderDD/Index`).then((res) => {
          setProviderList(res);
        });

    counId
      ? get(`UniversityCountryDD/Index`).then((res) => {
          setUniverSityCountries(res);

          const result = res?.find((ans) => ans?.id == counId);
          setUniCountryLabel(result?.name);

          get(`UniversityStateDD/Index/${counId}`).then((res) => {
            setUniversityStates(res);
          });
        })
      : get(`UniversityCountryDD/Index`).then((res) => {
          setUniverSityCountries(res);
        });

    univerTypeId
      ? get(`UniversityTypeDD/Index`).then((res) => {
          setUniversityTypes(res);

          const result = res?.find((ans) => ans?.id == univerTypeId);
        })
      : get(`UniversityTypeDD/Index`).then((res) => {
          setUniversityTypes(res);
        });
  }, [providerValue, uniCountryValue, uniTypeValue]);

  useEffect(() => {
    if (counId !== undefined) {
      get(
        `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${counId}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}`
      ).then((action) => {
        setUniversityList(action?.models);

        setLoading(false);
        setEntity(action?.totalEntity);
        setSerialNum(action?.firstSerialNumber);
        setLoading(false);
      });
    } else if (univerTypeId !== undefined) {
      get(
        `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${univerTypeId}&search=${searchStr}&orderId=${orderValue}`
      ).then((action) => {
        setUniversityList(action?.models);

        setLoading(false);
        setEntity(action?.totalEntity);
        setSerialNum(action?.firstSerialNumber);
        setLoading(false);
      });
    } else if (provideId !== undefined) {
      get(
        `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${provideId}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}`
      ).then((action) => {
        setUniversityList(action?.models);
        setLoading(false);
        setEntity(action?.totalEntity);
        setSerialNum(action?.firstSerialNumber);
        setLoading(false);
      });
    } else {
      get(
        `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${providerValue}&universityCountryId=${uniCountryValue}&universityStateId=${unistateValue}&universityTypeId=${uniTypeValue}&search=${searchStr}&orderId=${orderValue}`
      ).then((action) => {
        console.log("action", action);
        setUniversityList(action?.models);
        setLoading(false);
        setEntity(action?.totalEntity);
        setSerialNum(action?.firstSerialNumber);
        setLoading(false);
      });
    }

    get(`TableDefination/Index/${tableIdList?.University_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    uniCountryValue,
    uniTypeValue,
    unistateValue,
    orderValue,
    providerValue,
    success,
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
    setCallApi((prev) => !prev);
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
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const selectOrder = (label, value) => {
    //
    setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add university handler
  const handleAddUniversity = () => {
    history.push("/addUniversity");
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    if (counId != undefined) {
      history.push("/UniversityCountry");
    } else if (univerTypeId != undefined) {
      history.push("/UniversityTypes");
    } else if (provideId != undefined) {
      history.push("/providerList");
    } else {
      history.push("/");
    }
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
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
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
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(universityList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleRedirectToSubList = (id) => {
    localStorage.setItem("uniIdForSubList", id);
    history.push("/subjectList");
  };

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
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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

  const handleChecked = (e, columnId) => {
    // setCheckSlNo(e.target.checked);
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.University_List}/${columnId}`
    ).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        // addToast(res?.data?.message, {
        //   appearance: "success",
        //   autoDismiss: true,
        // });
        setSuccess(!success);
      } else {
        // addToast(res?.data?.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
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

          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <div className="test-score-div-1-style mt-1 mb-4">
                <div>
                  This page contains the list of all universities, you can view
                  and edit any information of each university from here.
                </div>
              </div>

              <Row>
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
                  userType == userTypes?.Provider ||
                  userType == userTypes?.ProviderAdmin ||
                  userType == userTypes?.AdmissionOfficer ||
                  userType == userTypes?.AdmissionManager
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

                <Col lg="4" md="4" sm="6" xs="6">
                  <Input
                    style={{ height: "2.7rem" }}
                    type="text"
                    name="search"
                    value={searchStr}
                    id="search"
                    placeholder="Name ,Short Name"
                    onChange={searchValue}
                    onKeyDown={handleKeyDown}
                  />
                </Col>
              </Row>

              <Row className="">
                <Col lg="12" md="12" sm="12" xs="12">
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <div className="d-flex mt-1">
                      {uniTypeValue !== 0 ||
                      uniCountryValue !== 0 ||
                      unistateValue !== 0 ||
                      providerValue !== 0
                        ? ""
                        : ""}
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
                      {uniTypeValue !== 0 ||
                      uniCountryValue !== 0 ||
                      unistateValue !== 0 ||
                      providerValue !== 0 ? (
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
                        <div>
                          <Select
                            className="mr-md-2 mr-sm-0"
                            options={orderName}
                            value={{ label: orderLabel, value: orderValue }}
                            onChange={(opt) =>
                              selectOrder(opt.label, opt.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mr-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div>
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
                            <div className="cursor-pointer">
                              <ReactToPrint
                                trigger={() => (
                                  <p>
                                    <i className="fas fa-file-pdf"></i>
                                  </p>
                                )}
                                content={() => componentRef.current}
                              />
                            </div>
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
                          {tableData.map((table, i) => (
                            <div key={i}>
                              {i === 5 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList?.AdmissionManager_Assign_University
                                  ) && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="isAcceptHome"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
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
                                    <p className="">{table?.collumnName}</p>
                                  </Col>

                                  <Col md="4" className="text-center">
                                    <FormGroup check inline>
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id=""
                                        name="isAcceptHome"
                                        onChange={(e) => {
                                          handleChecked(e, table?.id);
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
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>SL/NO</th> : null}

                        {tableData[1]?.isActive ? <th>Logo</th> : null}

                        {tableData[2]?.isActive ? <th>Name</th> : null}

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

                        {permissions?.includes(
                          permissionList?.Change_University_Status
                        ) ? (
                          <>
                            {tableData[10]?.isActive ? <th>Status</th> : null}
                          </>
                        ) : null}

                        {tableData[11]?.isActive ? (
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
                            <th scope="row">{serialNum + i}</th>
                          ) : null}

                          {tableData[1]?.isActive ? (
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
                                  />{" "}
                                </>
                              )}
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  history.push(
                                    `/universityDetails/${university?.id}`
                                  );
                                }}
                              >
                                {university?.name} ({university?.shortName})
                              </span>
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
                                  <span
                                    className="badge badge-secondary"
                                    onClick={() =>
                                      redirectToAdManagerList(university?.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    View
                                  </span>
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
                                  <span
                                    className="badge badge-secondary"
                                    onClick={() =>
                                      redirectToAdOfficerList(university?.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    View
                                  </span>
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
                                  <SpanButton
                                    func={() =>
                                      redirectToCampusList(university?.id)
                                    }
                                    className={"badge badge-secondary"}
                                    style={{ cursor: "pointer" }}
                                    data={`View (${university?.totalCampus})`}
                                    permission={6}
                                  />
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
                                  {university?.totalApplication > 0 ? (
                                    <SpanButton
                                      func={() =>
                                        redirectToApplications(
                                          university?.id,
                                          university?.name
                                        )
                                      }
                                      className={"badge badge-secondary"}
                                      style={{ cursor: "pointer" }}
                                      data={`View (${university?.totalApplication})`}
                                      permission={6}
                                    />
                                  ) : (
                                    <SpanButton
                                      className={"badge badge-secondary"}
                                      data={university?.totalApplication}
                                      permission={6}
                                    />
                                  )}
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
                                  <span
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <LinkSpanButton
                                      className={"text-decoration-none"}
                                      url={`/university-courses/${university?.id}`}
                                      data={`View (${university?.totalSubject})`}
                                      permission={6}
                                    />
                                  </span>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.Change_University_Status
                          ) ? (
                            <>
                              {tableData[10]?.isActive ? (
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

                          {tableData[11]?.isActive ? (
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
                              ></ConfirmModal>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
  univerSityDropDownList: state.universityListReducer.universityList,
});
export default connect(mapStateToProps)(UniversityList);
