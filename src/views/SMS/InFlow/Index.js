import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  UncontrolledTooltip,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import get from "../../../helpers/get";
import { userTypes } from "../../../constants/userTypeConstant";
import Pagination from "../Pagination/Pagination";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import { permissionList } from "../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";

const Index = () => {
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState([]);

  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkTransCode, setCheckTransCode] = useState(true);
  const [checkNote, setCheckNote] = useState(true);
  const [checkCons, setCheckCons] = useState(true);
  const [checkAmount, setCheckAmount] = useState(true);
  const [checkTransType, setCheckTransType] = useState(true);
  const [checkTransDate, setCheckTransDate] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const handleClearSearch = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  useEffect(() => {
    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    get(
      `BonusTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${consultantValue}`
    ).then((res) => {
      setEntity(res?.totalEntity);
      setData(res?.models);
    });
  }, [success, currentPage, dataPerPage, consultantValue]);

  const backToDashboard = () => {
    history.push("/");
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const redirect = (data) => {
    window.open(`/inFlow/details/${data?.id}`, "_blank");
  };

  const redirectForEdit = (data) => {
    history.push(`/inFlow/Update/${data?.id}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedTransDate = (e) => {
    setCheckTransDate(e.target.checked);
  };
  const handleCheckedTransCode = (e) => {
    setCheckTransCode(e.target.checked);
  };
  const handleCheckedNote = (e) => {
    setCheckNote(e.target.checked);
  };
  const handleCheckedCons = (e) => {
    setCheckCons(e.target.checked);
  };
  const handleCheckedAmount = (e) => {
    setCheckAmount(e.target.checked);
  };
  const handleCheckedTransType = (e) => {
    setCheckTransType(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <BreadCrumb title="Inflow Transaction List" backTo="" path="" />
      <Card className="uapp-employee-search">
        <CardBody>
          <div className="row">
            <div className="col-md-12">
              {userType !== userTypes?.Consultant ? (
                <Select
                  // styles={customStyles2}
                  options={consultantOptions}
                  value={{ label: consultantLabel, value: consultantValue }}
                  onChange={(opt) => selectConsultant(opt.label, opt.value)}
                />
              ) : null}
            </div>
          </div>

          {/* Clear Button */}
          <div className="row">
            <div className="col-12 d-flex justify-content-start mt-1">
              <div className="mt-1">
                {consultantValue !== 0 && (
                  <TagButton
                    label={consultantLabel}
                    setValue={() => setConsultantValue(0)}
                    setLabel={() => setConsultantLabel("Select Consultant")}
                  ></TagButton>
                )}
              </div>
              <div
                className="mt-1 mx-1 d-flex btn-clear"
                onClick={handleClearSearch}
              >
                {consultantValue !== 0 ? (
                  <button className="tag-clear">Clear All</button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Clear Button */}

          {/* <div
                  className="mt-1 mx-1 d-flex justify-content-end btn-clear"
                  onClick={handleClearSearch}
                >
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div> */}
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4"></div>

            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8">
              <div className="d-flex justify-content-end flex-wrap">
                <div className="me-3">
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

                <div className="ml-2">
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
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
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

                <div className="ml-2">
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
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id=""
                              name="isAcceptHome"
                              onChange={(e) => {
                                handleCheckedSLNO(e);
                              }}
                              defaultChecked={checkSlNo}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Transaction Date</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedTransDate(e);
                              }}
                              defaultChecked={checkTransDate}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Consultant Name</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCons(e);
                              }}
                              defaultChecked={checkCons}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Transaction Code</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedTransCode(e);
                              }}
                              defaultChecked={checkTransCode}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Amount</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAmount(e);
                              }}
                              defaultChecked={checkAmount}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Transaction Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedTransType(e);
                              }}
                              defaultChecked={checkTransType}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Transaction Note</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedNote(e);
                              }}
                              defaultChecked={checkNote}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Action</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAction(e);
                              }}
                              defaultChecked={checkAction}
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </div>
          </div>

          <Table id="table-to-xls" className="table-sm table-bordered">
            <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                {/* {checkSlNo ? <th>SL/NO</th> : null} */}
                {checkTransDate ? <th>Transaction Date</th> : null}
                {checkCons ? <th>Consultant Name</th> : null}
                {checkTransCode ? <th>Transaction Code</th> : null}
                {checkAmount ? <th>Amount</th> : null}
                {checkTransType ? <th>Transaction Type</th> : null}
                {checkNote ? <th>Transaction Note</th> : null}
                {checkAction ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {data.map((ls, i) => (
                <tr key={i} style={{ textAlign: "center" }}>
                  {/* {checkSlNo ? <td>{i + 1}</td> : null} */}
                  {checkTransDate ? <td>{ls?.transactionDate}</td> : null}
                  {checkCons ? <td>{ls?.consultant}</td> : null}
                  {checkTransCode ? <td>{ls?.transactionCode}</td> : null}

                  {checkAmount ? <td>{ls?.amount}</td> : null}
                  {checkTransType ? <td>{ls?.transactionType}</td> : null}
                  {checkNote ? <td>{ls?.transactionNote}</td> : null}

                  {checkAction ? (
                    <td className="text-center">
                      <ButtonGroup variant="text">
                        {permissions?.includes(
                          permissionList.View_Inflow_Transaction
                        ) ? (
                          <Button
                            className="mr-1 btn-sm"
                            color="primary"
                            onClick={() => redirect(ls)}
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                        ) : null}

                        {permissions?.includes(
                          permissionList.Add_Inflow_Transaction
                        ) ? (
                          <Button
                            color="warning"
                            className="ml-1 btn-sm"
                            onClick={() => redirectForEdit(ls)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        ) : null}
                      </ButtonGroup>
                    </td>
                  ) : null}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default Index;
