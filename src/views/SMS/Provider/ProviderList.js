import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get.js";
import { Link } from "react-router-dom";
import remove from "../../../helpers/remove.js";
import { useDispatch } from "react-redux";
import { StoreUniversityProviderData } from "../../../redux/actions/SMS/Provider/UniversityProvider.js";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import Loader from "../Search/Loader/Loader.js";
import put from "../../../helpers/put.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { tableIdList } from "../../../constants/TableIdConstant.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import TagButton from "../../../components/buttons/TagButton.js";
import ConfirmModal from "../../../components/modal/ConfirmModal.js";
import PopOverText from "../../../components/PopOverText.js";
import SaveButton from "../../../components/buttons/SaveButton.js";
import CancelButton from "../../../components/buttons/CancelButton.js";
import icon_info from "../../../assets/img/icons/icon_info.png";
import Pagination from "../Pagination/Pagination.jsx";
import ColumnProvider from "../TableColumn/ColumnProvider.js";
import Typing from "../../../components/form/Typing.js";
import Filter from "../../../components/Dropdown/Filter.js";
import ChangePassword from "../../../components/password/ChangePassword.js";

const ProviderList = () => {
  const ProviderPaging = JSON.parse(sessionStorage.getItem("provider"));
  const history = useHistory();
  // const [callApi, setCallApi] = useState(false);
  const [providerList, setProviderList] = useState([]);
  const [searchStr, setSearchStr] = useState(
    ProviderPaging?.searchStr ? ProviderPaging?.searchStr : ""
  );
  const [currentPage, setCurrentPage] = useState(
    ProviderPaging?.currentPage ? ProviderPaging?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    ProviderPaging?.dataPerPage ? ProviderPaging?.dataPerPage : 15
  );
  const [orderLabel, setOrderLabel] = useState(
    ProviderPaging?.orderLabel ? ProviderPaging?.orderLabel : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    ProviderPaging?.orderValue ? ProviderPaging?.orderValue : 0
  );
  const [providerLabel, setProviderLabel] = useState(
    ProviderPaging?.providerLabel
      ? ProviderPaging?.providerLabel
      : "Provider Type"
  );
  const [providerValue, setProviderValue] = useState(
    ProviderPaging?.providerValue ? ProviderPaging?.providerValue : 0
  );
  const [uappIdLabel, setUappIdLabel] = useState(
    ProviderPaging?.uappIdLabel ? ProviderPaging?.uappIdLabel : "UAPP ID"
  );
  const [uappIdValue, setUappIdValue] = useState(
    ProviderPaging?.uappIdValue ? ProviderPaging?.uappIdValue : 0
  );
  const [branch, setBranch] = useState([]);

  const [branchLabel, setBranchLabel] = useState(
    ProviderPaging?.branchLabel ? ProviderPaging?.branchLabel : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    ProviderPaging?.branchValue ? ProviderPaging?.branchValue : 0
  );
  const userType = localStorage.getItem("userType");
  const [callApi, setCallApi] = useState(false);
  // const [serialNum, setSerialNum] = useState(0);
  const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);
  // for hide/unhide table column
  // const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { addToast } = useToasts();
  const [providerType, setProviderType] = useState([]);
  const [uappIdDD, setUappIdDD] = useState([]);
  const [delData, setDelData] = useState({});
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [PasswordEye, setPasswordEye] = useState(false);

  useEffect(() => {
    const tableColumnProvider = JSON.parse(
      localStorage.getItem("ColumnProvider")
    );
    tableColumnProvider && setTableData(tableColumnProvider);
    !tableColumnProvider &&
      localStorage.setItem("ColumnProvider", JSON.stringify(ColumnProvider));
    !tableColumnProvider && setTableData(ColumnProvider);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "provider",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        providerLabel: providerLabel && providerLabel,
        providerValue: providerValue && providerValue,
        uappIdLabel: uappIdLabel && uappIdLabel,
        uappIdValue: uappIdValue && uappIdValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
      })
    );
  }, [
    currentPage,
    providerLabel,
    providerValue,
    uappIdLabel,
    uappIdValue,
    searchStr,
    dataPerPage,
    orderValue,
    orderLabel,
    branchLabel,
    branchValue,
  ]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });

    get(`ProviderType/GetAll`).then((res) => {
      setProviderType(res);
    });

    get(`ProviderDD/UappId`).then((res) => {
      setUappIdDD(res);
    });
  }, []);

  useEffect(() => {
    const providerTypeId = 0;
    // const pageSize = 15;
    if (!isTyping) {
      get(
        `Provider/Index?page=${currentPage}&pagesize=${dataPerPage}&providerTypeId=${
          providerTypeId ? providerTypeId : providerValue
        }&uappId=${uappIdValue}&searchstring=${searchStr}&sortby=${orderValue}&branchid=${branchValue}`
      ).then((action) => {
        setProviderList(action?.models);
        setLoading(false);
        setEntity(action?.totalEntity);
        // setSerialNum(action?.firstSerialNumber);
      });
    }
  }, [
    providerValue,
    uappIdValue,
    searchStr,
    currentPage,
    success,
    callApi,
    dataPerPage,
    orderValue,
    isTyping,
    branchValue,
  ]);

  const toggleDeleteProvider = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // useEffect(() => {
  //   get(`Provider/Index`).then((res) => {
  //     dispatch(StoreUniversityProviderData(res));
  //   });
  // }, [dispatch]);

  const deleteProvider = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Provider/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  //
  const providertype = providerType.map((list) => ({
    label: list.name,
    value: list.id,
  }));
  //

  // select University State

  const selectProviderTypeState = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);
    handleSearch();
  };

  const uappIdOptions = uappIdDD.map((list) => ({
    label: list.name,
    value: list.id,
  }));

  const selectUappIdDD = (label, value) => {
    setUappIdLabel(label);
    setUappIdValue(value);
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
    setSearchStr("");
    setProviderLabel("Provider Type");
    setProviderValue(0);
    setUappIdLabel("UAPP ID");
    setUappIdValue(0);
    setCurrentPage(1);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      // setCallApi((prev) => !prev);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  const redirectToProviderDetails = (providerId) => {
    history.push(`/providerDetails/${providerId}`);
  };

  const redirectToProviderDashboard = (providerId) => {
    history.push(`/providerDashboard/${providerId}`);
  };

  const redirectToUpdateProvider = (providerId) => {
    history.push(`/updateProvider/${providerId}`);
  };

  const handleAccountStatus = (e, providerId) => {
    const subData = {
      id: providerId,
    };

    put(`Provider/UpdateStatus/${providerId}`, subData).then((res) => {
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

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnProvider", JSON.stringify(values));
  };

  const userTypeId = localStorage.getItem("userType");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [passData, setPassData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [resetButtonStatus, setResetButtonStatus] = useState(false);

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
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
      setResetButtonStatus(true);
      put(`Password/ChangePasswordForProviderAdmin`, subData).then((res) => {
        setResetButtonStatus(false);
        if (res?.status === 200 && res.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setPassData({});
          setPassModal(false);
          setPass("");
          setCPass("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    // setCallApi((prev) => !prev);
  };

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
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    setOrderLabel(label);
    setOrderValue(value);
    // setCallApi((prev) => !prev);
  };
  return (
    <div>
      <BreadCrumb title="Providers List" backTo="" path="/" />
      <>
        <Card className="uapp-employee-search zindex-100">
          <CardBody>
            <Row>
              {branch.length > 1 && (
                <Col lg="3" md="6" sm="12" xs="12" className="mb-2">
                  <Filter
                    data={branch}
                    label={branchLabel}
                    setLabel={setBranchLabel}
                    value={branchValue}
                    setValue={setBranchValue}
                  />
                </Col>
              )}
              <Col lg="3" md="6" sm="12" xs="12" className="mb-2">
                <Select
                  options={providertype}
                  value={{ label: providerLabel, value: providerValue }}
                  onChange={(opt) =>
                    selectProviderTypeState(opt.label, opt.value)
                  }
                  name="providerTypeId"
                  id="providerTypeId"
                />
              </Col>

              <Col lg="3" md="6" sm="12" xs="12" className="mb-2">
                <Select
                  options={uappIdOptions}
                  value={{ label: uappIdLabel, value: uappIdValue }}
                  onChange={(opt) => selectUappIdDD(opt.label, opt.value)}
                  name="uappId"
                  id="uappId"
                />
              </Col>

              <Col lg="3" md="6" sm="12" xs="12">
                <Typing
                  name="searchstring"
                  id="searchstring"
                  placeholder="Name, Email"
                  value={searchStr}
                  setValue={setSearchStr}
                  setIsTyping={setIsTyping}
                  onKeyDown={handleKeyDown}
                />

                <div className="mt-1 d-flex justify-between">
                  <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                  <div className="pl-2" style={{ paddingTop: "2px" }}>
                    <span>Name should not include title.</span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="">
              <Col lg="12" md="12" sm="12" xs="12">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <div className="d-flex mt-1">
                    {(userType === userTypes?.SystemAdmin &&
                      branchValue !== 0) ||
                    providerValue !== 0 ||
                    uappIdValue !== 0
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

                    {providerValue !== 0 ? (
                      <TagButton
                        label={providerLabel}
                        setValue={() => setProviderValue(0)}
                        setLabel={() => setProviderLabel("Provider Type")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {providerValue !== 0 && uappIdValue !== 0 ? "" : ""}
                    {uappIdValue !== 0 ? (
                      <TagButton
                        label={uappIdLabel}
                        setValue={() => setUappIdValue(0)}
                        setLabel={() => setUappIdLabel("UAPP ID")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-1 mx-1 d-flex btn-clear">
                    {(userType === userTypes?.SystemAdmin &&
                      branchValue !== 0) ||
                    providerValue !== 0 ||
                    uappIdValue !== 0 ? (
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

        <Card className="uapp-employee-search">
          <CardBody>
            <Row className="mb-3">
              <Col
                lg="6"
                md="6"
                sm="12"
                xs="12"
                style={{ marginBottom: "10px" }}
              >
                {permissions?.includes(permissionList?.Add_Provider) ? (
                  <LinkButton
                    url={"/providerForm"}
                    className={"btn btn-uapp-add "}
                    icon={<i className="fas fa-plus"></i>}
                    name={" Add Provider"}
                    permission={6}
                  />
                ) : null}
              </Col>

              <Col lg="6" md="6" sm="12" xs="12">
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
                        {/* <DropdownItem> */}
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
                            {i === 2 ? (
                              <>
                                {permissions?.includes(
                                  permissionList.Staff_Password_Change
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
                                          name="check"
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
                            ) : i === 5 ? (
                              <>
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
                                          name="check"
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
                                {permissions?.includes(
                                  permissionList.View_University_List
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
                                          name="check"
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
                                      name="check"
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
                        ))}{" "}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide ends here */}
                </div>
              </Col>
            </Row>

            {loading ? (
              <Loader />
            ) : (
              <>
                {providerList?.length === 0 ? (
                  <h2 className="text-center">No Data Found</h2>
                ) : (
                  <div
                    className="table-responsive fixedhead"
                    ref={componentRef}
                  >
                    <Table
                      id="table-to-xls"
                      className="table-sm table-bordered"
                    >
                      <thead className="tablehead">
                        <tr style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                          {tableData[1]?.isActive ? <th>Name</th> : null}
                          {permissions?.includes(
                            permissionList.Staff_Password_Change
                          ) ? (
                            <>
                              {userTypeId === userTypes?.SystemAdmin ||
                              userTypeId === userTypes?.Admin ||
                              userTypeId === userTypes?.BranchAdmin ? (
                                <>
                                  {tableData[2]?.isActive ? (
                                    <th>Password</th>
                                  ) : null}
                                </>
                              ) : null}
                            </>
                          ) : null}
                          {tableData[3]?.isActive ? <th>Email</th> : null}
                          {tableData[4]?.isActive ? <th>Contact</th> : null}
                          {permissions?.includes(
                            permissionList.View_Application_List
                          ) ? (
                            <>
                              {" "}
                              {tableData[5]?.isActive ? (
                                <th>Applications</th>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_University_List
                          ) ? (
                            <>
                              {" "}
                              {tableData[6]?.isActive ? (
                                <th>University Count</th>
                              ) : null}
                            </>
                          ) : null}

                          {/* {permissions?.includes(
                          permissionList?.Change_Provider_Account_Status
                        ) ? (
                          <>
                            {tableData[6]?.isActive ? (
                              <th>Account Status</th>
                            ) : null}
                          </>
                        ) : null} */}
                          {tableData[7]?.isActive ? <th>Branch</th> : null}
                          {tableData[8]?.isActive ? (
                            <th style={{ width: "8%" }} className="text-center">
                              Action
                            </th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {providerList?.map((prov, i) => (
                          <tr key={prov.id} style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? (
                              <td className="cursor-pointer hyperlink-hover">
                                <Link
                                  className="text-id hover"
                                  to={`/providerDetails/${prov?.id}`}
                                >
                                  {prov?.providerViewId}
                                </Link>
                              </td>
                            ) : null}

                            {tableData[1]?.isActive ? (
                              <td className="cursor-pointer hyperlink-hover">
                                <Link
                                  className="text-id hover"
                                  to={`/providerDetails/${prov?.id}`}
                                >
                                  {prov?.nameTittle?.name} {prov?.name}
                                </Link>
                              </td>
                            ) : null}

                            {permissions?.includes(
                              permissionList.Staff_Password_Change
                            ) ? (
                              <>
                                {userTypeId === userTypes?.SystemAdmin ||
                                userTypeId === userTypes?.Admin ||
                                userTypeId === userTypes?.BranchAdmin ? (
                                  <>
                                    {tableData[2]?.isActive ? (
                                      <td>
                                        <Link onClick={() => handlePass(prov)}>
                                          Change
                                        </Link>
                                      </td>
                                    ) : null}
                                  </>
                                ) : null}
                              </>
                            ) : null}

                            {tableData[3]?.isActive ? (
                              <td>{prov?.loginEmail}</td>
                            ) : null}
                            {tableData[4]?.isActive ? (
                              <td>
                                <div className="d-flex justify-content-center">
                                  <PopOverText
                                    value={
                                      prov?.phoneNumber &&
                                      prov?.phoneNumber.includes("+")
                                        ? prov?.phoneNumber
                                        : prov?.phoneNumber &&
                                          !prov?.phoneNumber.includes("+")
                                        ? "+" + prov?.phoneNumber
                                        : null
                                    }
                                    btn={<i class="fas fa-phone"></i>}
                                    popoverOpen={popoverOpen}
                                    setPopoverOpen={setPopoverOpen}
                                  />
                                  <PopOverText
                                    value={prov?.email}
                                    btn={<i className="far fa-envelope"></i>}
                                    popoverOpen={popoverOpen}
                                    setPopoverOpen={setPopoverOpen}
                                  />
                                </div>
                              </td>
                            ) : null}

                            {permissions?.includes(
                              permissionList.View_Application_List
                            ) ? (
                              <>
                                {" "}
                                {tableData[5]?.isActive ? (
                                  <td>
                                    <div style={{ marginTop: "5px" }}>
                                      <span
                                        onClick={() => {
                                          history.push(
                                            `/provider-applications/${prov?.id}`
                                          );
                                        }}
                                        className="Count-first"
                                      >
                                        {prov?.applicationCount}
                                      </span>
                                    </div>
                                  </td>
                                ) : null}
                              </>
                            ) : null}

                            {permissions?.includes(
                              permissionList.View_University_List
                            ) ? (
                              <>
                                {tableData[6]?.isActive ? (
                                  <td>
                                    <div style={{ marginTop: "5px" }}>
                                      <span
                                        onClick={() => {
                                          history.push(
                                            `/universityListFromProviderList/${prov?.id}`
                                          );
                                        }}
                                        className="Count-second"
                                      >
                                        {prov?.universityCount}
                                      </span>
                                    </div>

                                    {/* 
                                  <Link
                                    to={{
                                      pathname: `/universityListFromProviderList/${prov?.id}`,
                                      providerName: prov?.name,
                                      providervalue: prov?.id,
                                    }}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span className="badge badge-pill badge-secondary">
                                      {" "}
                                      {`View (${prov?.universityCount})`}{" "}
                                    </span>
                                  </Link> */}
                                  </td>
                                ) : null}
                              </>
                            ) : null}

                            {/* {permissions?.includes(
                            permissionList?.Change_Provider_Account_Status
                          ) ? (
                            <>
                              {tableData[6]?.isActive ? (
                                <td>
                                  <ToggleSwitch
                                    defaultChecked={
                                      prov?.isActive === false ? false : true
                                    }
                                    onChange={(e) => {
                                      handleAccountStatus(e, prov?.id);
                                    }}
                                  />
                                </td>
                              ) : null}
                            </>
                          ) : null} */}

                            {tableData[7]?.isActive ? (
                              <td>{prov?.branchName}</td>
                            ) : null}

                            {tableData[8]?.isActive ? (
                              <td
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                <ButtonGroup variant="text">
                                  {permissions?.includes(
                                    permissionList?.View_Provider
                                  ) ? (
                                    <ButtonForFunction
                                      color={"primary"}
                                      func={() =>
                                        redirectToProviderDetails(prov?.id)
                                      }
                                      className={"mx-1 btn-sm"}
                                      icon={<i className="fas fa-eye"></i>}
                                      permission={6}
                                    />
                                  ) : null}

                                  {userType ===
                                    userTypes?.SystemAdmin.toString() ||
                                  userType === userTypes?.Admin.toString() ||
                                  userType ===
                                    userTypes?.ComplianceManager.toString() ? (
                                    <>
                                      {permissions?.includes(
                                        permissionList?.View_Provider
                                      ) ? (
                                        <ButtonForFunction
                                          color={"primary"}
                                          func={() =>
                                            redirectToProviderDashboard(
                                              prov?.id
                                            )
                                          }
                                          className={"mx-1 btn-sm"}
                                          icon={
                                            <i className="fas fa-tachometer-alt-fast"></i>
                                          }
                                          permission={6}
                                        />
                                      ) : null}
                                    </>
                                  ) : null}

                                  {permissions?.includes(
                                    permissionList.Edit_Provider
                                  ) ? (
                                    <>
                                      <ButtonForFunction
                                        color={"warning"}
                                        func={() =>
                                          redirectToUpdateProvider(prov?.id)
                                        }
                                        className={"mx-1 btn-sm"}
                                        icon={<i className="fas fa-edit"></i>}
                                        permission={6}
                                      />
                                    </>
                                  ) : null}

                                  {permissions?.includes(
                                    permissionList?.Delete_Provider
                                  ) ? (
                                    <>
                                      <ButtonForFunction
                                        color={"danger"}
                                        func={() => toggleDeleteProvider(prov)}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    </>
                                  ) : null}
                                </ButtonGroup>
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </>
            )}

            <Pagination
              dataPerPage={dataPerPage}
              totalData={entity}
              paginate={paginate}
              currentPage={currentPage}
            />
            {/* <div className="d-flex justify-content-end mt-3 mb-2">
                <h5>Total Results Found: {providerList.length}</h5>
              </div> */}
          </CardBody>
        </Card>
      </>

      <ConfirmModal
        text="Do You Want To Delete This Provider ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={deleteProvider}
        cancel={() => setDeleteModal(false)}
      />
      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>
            Change password for {passData?.nameTittle?.name} {passData?.name}
          </h5>
          <ChangePassword
            submitModalForm={submitModalForm}
            PasswordEye={PasswordEye}
            setPasswordEye={setPasswordEye}
            passValidation={passValidate}
            password={pass}
            passError={error}
            ConPasswordEye={confirmPasswordEye}
            setConPasswordEye={setConfirmPasswordEye}
            ConPassValidation={confirmPassword}
            conPassword={cPass}
            conPassError={passError}
            handleToggle={handleToggle}
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProviderList;
