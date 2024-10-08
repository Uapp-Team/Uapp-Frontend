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
import ToggleSwitch from "../Components/ToggleSwitch";
import put from "../../../helpers/put.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { tableIdList } from "../../../constants/TableIdConstant.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import TagButton from "../../../components/buttons/TagButton.js";
import ConfirmModal from "../../../components/modal/ConfirmModal.js";

const ProviderList = () => {
  const history = useHistory();
  const [providerList, setProviderList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [providerLabel, setProviderLabel] = useState("Provider Type");
  const [providerValue, setProviderValue] = useState(0);
  const [uappIdLabel, setUappIdLabel] = useState("UAPP ID");
  const [uappIdValue, setUappIdValue] = useState(0);
  const userType = localStorage.getItem("userType");
  // const [callApi, setCallApi] = useState(false);
  // const [serialNum, setSerialNum] = useState(0);
  // const [entity, setEntity] = useState(0);
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

  useEffect(() => {
    const providerTypeId = 0;
    // const pageSize = 15;
    get(
      `Provider/Index?providerTypeId=${
        providerTypeId ? providerTypeId : providerValue
      }&uappId=${uappIdValue}&searchstring=${searchStr}`
    ).then((action) => {
      console.log(action, "asif");
      setProviderList(action?.models);
      setLoading(false);
      // setEntity(action?.totalEntity);
      // setSerialNum(action?.firstSerialNumber);
    });

    get(`ProviderType/GetAll`).then((res) => {
      setProviderType(res);
    });

    get(`ProviderDD/UappId`).then((res) => {
      setUappIdDD(res);
    });

    get(`TableDefination/Index/${tableIdList?.Provider_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [providerValue, uappIdValue, searchStr, currentPage, success]);

  const toggleDeleteProvider = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    get(`Provider/Index`).then((res) => {
      dispatch(StoreUniversityProviderData(res));
    });
  }, []);

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
    // setCallApi((prev) => !prev);
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
    setSearchStr("");
    setProviderLabel("Provider Type");
    setProviderValue(0);
    setUappIdLabel("UAPP ID");
    setUappIdValue(0);
    // setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      // setCallApi((prev) => !prev);
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

  const handleChecked = (e, columnId) => {
    // setCheck(e.target.checked);
    put(
      `TableDefination/Update/${tableIdList?.Provider_List}/${columnId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        setSuccess(!success);
      }
    });
  };
  console.log(providerList);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb title="Providers List" backTo="" path="/" />
          <Card className="uapp-employee-search">
            <CardBody>
              <Row>
                <Col lg="4" md="4" sm="12" xs="12" className="mb-2">
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

                <Col lg="4" md="4" sm="12" xs="12" className="mb-2">
                  <Select
                    options={uappIdOptions}
                    value={{ label: uappIdLabel, value: uappIdValue }}
                    onChange={(opt) => selectUappIdDD(opt.label, opt.value)}
                    name="uappId"
                    id="uappId"
                  />
                </Col>

                <Col lg="4" md="4" sm="12" xs="12">
                  <Input
                    style={{ height: "2.7rem" }}
                    type="text"
                    name="searchstring"
                    value={searchStr}
                    id="searchstring"
                    placeholder="Name, Email"
                    onChange={searchValue}
                    onKeyDown={handleKeyDown}
                  />
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
                      {providerValue !== 0 || uappIdValue !== 0 ? "" : ""}
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
                      {providerValue !== 0 || uappIdValue !== 0 ? (
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
                              {i === 6 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.View_University_List
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
                                            name="check"
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
                                        name="check"
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
                          ))}{" "}
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
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                        {tableData[1]?.isActive ? <th>Name</th> : null}
                        {tableData[2]?.isActive ? <th>Email</th> : null}
                        {tableData[3]?.isActive ? <th>Login Email</th> : null}

                        {tableData[4]?.isActive ? <th>Phone No</th> : null}
                        {tableData[5]?.isActive ? <th>Applications</th> : null}
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

                        {tableData[7]?.isActive ? (
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
                              {" "}
                              <span
                                onClick={() => {
                                  history.push(`/providerDetails/${prov?.id}`);
                                }}
                              >
                                {prov?.providerViewId}
                              </span>
                            </td>
                          ) : null}

                          {tableData[1]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  history.push(`/providerDetails/${prov?.id}`);
                                }}
                              >
                                {prov?.nameTittle?.name} {prov?.name}
                              </span>
                            </td>
                          ) : null}
                          {tableData[2]?.isActive ? (
                            <td>{prov?.email}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{prov?.loginEmail}</td>
                          ) : null}

                          {tableData[4]?.isActive ? (
                            <td>{prov?.phoneNumber}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Application_List
                          ) ? (
                            <>
                              {" "}
                              {tableData[5]?.isActive ? (
                                <td>
                                  <span className="badge badge-secondary">
                                    {prov?.applicationCount}
                                  </span>
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
                                  </Link>
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
                            <td style={{ width: "8%" }} className="text-center">
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
                                          redirectToProviderDashboard(prov?.id)
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
                              <ConfirmModal
                                text="Do You Want To Delete This Provider ? Once Deleted it can't be Undone!"
                                isOpen={deleteModal}
                                toggle={() => setDeleteModal(!deleteModal)}
                                confirm={deleteProvider}
                                cancel={() => setDeleteModal(false)}
                              />
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              <div className="d-flex justify-content-end mt-3 mb-2">
                <h5>Total Results Found: {providerList.length}</h5>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProviderList;
