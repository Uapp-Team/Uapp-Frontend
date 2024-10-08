import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import { userTypes } from "../../../../constants/userTypeConstant";
import { useToasts } from "react-toast-notifications";
import Assets from "../../../../assets/img/Asset 12Icon.svg";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import * as Icon from "react-feather";
import { tableIdList } from "../../../../constants/TableIdConstant";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../../components/buttons/TagButton";
import Branch from "../../../../components/Dropdown/Filter";

const Index = () => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] = useState(
    "Select Transaction Status"
  );
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [transactionValue, setTransactionValue] = useState(0);
  const [payment, setPayment] = useState([]);
  const [paymentLabel, setPaymentLabel] = useState("Select Payment Status");
  const [paymentValue, setPaymentValue] = useState(0);
  const [transactionCode, setTransactionCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currData, setCurrData] = useState({});
  const [currData2, setCurrData2] = useState({});
  const [modalTLabel, setModalTLabel] = useState("Select Transaction Status");
  const [modalTValue, setModalTValue] = useState(0);
  const [mTError, setMTerror] = useState("");
  const [mPError, setMPerror] = useState("");
  const { addToast } = useToasts();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalPLabel, setModalPLabel] = useState("Select Payment Status");
  const [modalPValue, setModalPValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [pdfData, setPdfData] = useState("");
  const userType = localStorage.getItem("userType");

  // for hide/unhide column
  const [check, setCheck] = useState(true);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });

    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    get(`TransactionStatusDD/Index`).then((res) => {
      setTransaction(res);
      console.log(res, "transaction");
    });

    get(`PaymentStatusDD/Index`).then((res) => {
      setPayment(res);
    });

    get(
      `WithdrawRequest/Index?page=${currentPage}&pagesize=${dataPerPage}&consultantid=${consultantValue}&transactionStatus=${transactionValue}&paymentStatuas=${paymentValue}&code=${transactionCode}&branchid=${branchValue}`
    ).then((res) => {
      setData(res?.models);

      setEntity(res?.totalEntity);
      setLoading(false);
      console.log(res, "data");
    });

    get(`TableDefination/Index/${tableIdList?.Withdraw_request_List}`).then(
      (res) => {
        console.log("table data", res);
        setTableData(res);
      }
    );
  }, [
    currentPage,
    dataPerPage,
    consultantValue,
    transactionValue,
    paymentValue,
    success,
    transactionCode,
    branchValue,
  ]);

  const printData = (data) => {
    setPdfData(data);
  };

  const handleAddWithdrawRequest = () => {
    history.push("/createWithdrawRequest");
  };

  const closeModal = () => {
    setModalTLabel("Select Transaction Status");
    setModalTValue(0);
    setModalOpen(false);
  };

  const closeModal2 = () => {
    setModalPLabel("Select Payment Status");
    setModalPValue(0);
    setModalOpen2(false);
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const transactionOptions = transaction?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectTransaction = (label, value) => {
    setTransactionLabel(label);
    setTransactionValue(value);
  };

  const selectTransaction2 = (label, value) => {
    setMTerror("");
    setModalTLabel(label);
    setModalTValue(value);
  };

  const handleUpdate = (data) => {
    setCurrData(data);
    setModalTLabel(data?.transactionStatus);
    setModalTValue(data?.transactionStatusId);
    setModalOpen(true);
  };

  const handleUpdate2 = (data) => {
    setCurrData2(data);
    setModalPLabel(data?.paymentStatus);
    setModalPValue(data?.paymentStatusId);
    setModalOpen2(true);
  };

  const paymentOptions = payment?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectPayment = (label, value) => {
    setPaymentLabel(label);
    setPaymentValue(value);
  };

  const selectPayment2 = (label, value) => {
    setModalPLabel(label);
    setModalPValue(value);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // search handler

  const componentRef = useRef();
  const componentRef2 = useRef();

  const handleClear = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setTransactionLabel("Select Transaction Status");
    setTransactionValue(0);
    setPaymentLabel("Select Payment Status");
    setPaymentValue(0);
    setTransactionCode("");
    setBranchLabel("Select Branch");
    setBranchValue(0);
  };

  const handleTransactionStatusChange = (event) => {
    event.preventDefault();

    if (modalTValue === 0) {
      setMTerror("Transaction status is required");
    } else {
      setButtonStatus(true);
      setProgress(true);
      get(
        `WithdrawRequest/TransactionStatus/${currData?.id}/${modalTValue}`
      ).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res === true) {
          addToast("Status changed successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          closeModal();
          setCurrData({});
          setSuccess(!success);
        } else {
          addToast("Something went wrong", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handlePaymentStatusChange = (event) => {
    event.preventDefault();

    if (modalPValue === 0) {
      setMPerror("Transaction status is required");
    } else {
      setButtonStatus(true);
      setProgress1(true);
      get(`WithdrawRequest/PaymentStatus/${currData2?.id}/${modalPValue}`).then(
        (res) => {
          setButtonStatus(false);
          setProgress1(false);
          if (res === true) {
            addToast("Status changed successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            closeModal2();
            setCurrData2({});
            setSuccess(!success);
          } else {
            addToast("Something went wrong", {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      );
    }
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Withdraw_request_List}/${columnId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        setSuccess(!success);
      } else {
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Update withdraw request status modal selected Transaction Status  */}

          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Update Withdraw Request Status</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleTransactionStatusChange}>
                <input type="hidden" value={currData?.id} />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available To Pay{" "}
                      <span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={transactionOptions}
                      value={{ label: modalTLabel, value: modalTValue }}
                      onChange={(opt) =>
                        selectTransaction2(opt.label, opt.value)
                      }
                    />
                  </Col>
                </FormGroup>

                <span className="text-danger">
                  <b>Note:</b>
                </span>
                <span className="ml-1">
                  By authorizing transaction, account officer will be able to
                  make payment
                </span>

                <div className="d-flex justify-content-between mt-3">
                  <Button color="danger" onClick={closeModal}>
                    Cancel
                  </Button>

                  <Button color="primary">
                    {progress ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          {/* 2md modal to update */}

          <Modal
            isOpen={modalOpen2}
            toggle={closeModal2}
            className="uapp-modal2"
          >
            <ModalHeader>Update Payment Status</ModalHeader>
            <ModalBody>
              <Form onSubmit={handlePaymentStatusChange}>
                <input type="hidden" value={currData2?.id} />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available To Pay{" "}
                      <span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={paymentOptions}
                      value={{ label: modalPLabel, value: modalPValue }}
                      onChange={(opt) => selectPayment2(opt.label, opt.value)}
                    />
                  </Col>
                </FormGroup>

                <span className="text-danger">
                  <b>Note:</b>
                </span>
                <span className="ml-1">
                  Make sure that the withdraw request is paid or rejected
                </span>

                <div className="d-flex justify-content-between mt-3">
                  <Button color="danger" onClick={closeModal2}>
                    Cancel
                  </Button>

                  <Button color="primary" type="submit">
                    {progress1 ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          <BreadCrumb title="Withdraw Request List" backTo="" path="/" />

          <Card>
            <CardBody>
              <div className="row">
                {userType !== userTypes?.Consultant ? (
                  <div className="col-md-3 mb-2">
                    <Select
                      options={consultantOptions}
                      value={{ label: consultantLabel, value: consultantValue }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                    />
                  </div>
                ) : null}

                <div className="col-md-3 mb-2">
                  <Select
                    options={transactionOptions}
                    value={{ label: transactionLabel, value: transactionValue }}
                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
                  />
                </div>

                <div className="col-md-3 mb-2">
                  <Select
                    options={paymentOptions}
                    value={{ label: paymentLabel, value: paymentValue }}
                    onChange={(opt) => selectPayment(opt.label, opt.value)}
                  />
                </div>
                {branch.length > 1 && (
                  <div className="col-md-3 mb-2">
                    <Branch
                      data={branch}
                      label={branchLabel}
                      setLabel={setBranchLabel}
                      value={branchValue}
                      setValue={setBranchValue}
                      name=""
                      error={() => {}}
                      setError={() => {}}
                      action={() => {}}
                    />
                  </div>
                )}
                <div className="col-md-3">
                  <Input
                    style={{ height: "38px" }}
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Transaction Code"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-start">
                    <div className="mt-1 mx-1" style={{ display: "flex" }}>
                      {consultantValue !== 0 ||
                      transactionValue !== 0 ||
                      paymentValue !== 0
                        ? ""
                        : ""}
                      {consultantValue !== 0 ? (
                        <TagButton
                          label={consultantLabel}
                          setValue={() => setConsultantValue(0)}
                          setLabel={() =>
                            setConsultantLabel("Select Consultant")
                          }
                        ></TagButton>
                      ) : (
                        ""
                      )}
                      {consultantValue !== 0 &&
                        (transactionValue !== 0 || paymentValue !== 0
                          ? ""
                          : "")}
                      {transactionValue !== 0 ? (
                        <TagButton
                          label={transactionLabel}
                          setValue={() => setTransactionValue(0)}
                          setLabel={() =>
                            setTransactionLabel("Select Transaction Status")
                          }
                        ></TagButton>
                      ) : (
                        ""
                      )}
                      {transactionValue !== 0 && paymentValue !== 0 ? "" : ""}
                      {paymentValue !== 0 ? (
                        <TagButton
                          label={paymentLabel}
                          setValue={() => setPaymentValue(0)}
                          setLabel={() =>
                            setPaymentLabel("Select Payment Status")
                          }
                        ></TagButton>
                      ) : (
                        ""
                      )}
                      {branchValue !== 0 ? (
                        <TagButton
                          label={branchLabel}
                          setValue={() => setBranchValue(0)}
                          setLabel={() => setBranchLabel("Select Branch")}
                        ></TagButton>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className=" btn-clear mt-1 mx-1 d-flex">
                      {consultantValue !== 0 ||
                      transactionValue !== 0 ||
                      branchValue !== 0 ||
                      paymentValue !== 0 ? (
                        <button className="tag-clear" onClick={handleClear}>
                          Clear All
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              <div className=" row mb-3">
                <div
                  className="col-lg-5 col-md-5 col-sm-4 col-xs-4"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(
                    permissionList.Add_Widthdraw_Request
                  ) ? (
                    <Button color="primary" onClick={handleAddWithdrawRequest}>
                      <i className="fas fa-plus"></i>
                      <span> Add Withdraw Request</span>
                    </Button>
                  ) : null}
                </div>

                <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8">
                  <div className="d-flex justify-content-end flex-wrap">
                    <div className="me-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div>
                          <Select
                            className="mr-2"
                            options={dataSizeName}
                            value={{ label: dataPerPage, value: dataPerPage }}
                            onChange={(opt) => selectDataSize(opt.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mr-2">
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
                              {i === 7 ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.Update_Withdraw_Request_Authorize_Status
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
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.Update_Withdraw_Request_Payment_Status
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
                </div>
              </div>

              {permissions?.includes(permissionList.View_Widthdraw_Request) ? (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr className="text-center">
                        {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                        {tableData[1]?.isActive ? <th>Request Date</th> : null}
                        {tableData[2]?.isActive ? (
                          <th>Consultant Name</th>
                        ) : null}
                        {tableData[3]?.isActive ? (
                          <th>Transaction Code</th>
                        ) : null}
                        {tableData[4]?.isActive ? <th>Amount</th> : null}
                        {tableData[5]?.isActive ? <th>Payment Type</th> : null}
                        {tableData[6]?.isActive ? <th>Payment Date</th> : null}
                        {permissions?.includes(
                          permissionList.Update_Withdraw_Request_Authorize_Status
                        ) ? (
                          <>{tableData[7]?.isActive ? <th>Status</th> : null}</>
                        ) : null}
                        {tableData[8]?.isActive ? <th>Branch</th> : null}

                        {permissions?.includes(
                          permissionList.Update_Withdraw_Request_Payment_Status
                        ) ? (
                          <>
                            {" "}
                            {tableData[9]?.isActive ? (
                              <th>Payment Status</th>
                            ) : null}
                          </>
                        ) : null}
                        {tableData[10]?.isActive ? <th>Invoice</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((ls, i) => (
                        <tr key={i} className="text-center">
                          {tableData[0]?.isActive ? <td>{i + 1}</td> : null}
                          {tableData[1]?.isActive ? (
                            <td>{ls?.transactionDate}</td>
                          ) : null}
                          {tableData[2]?.isActive ? (
                            <td>{ls?.consultantName}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{ls?.transactionCode}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>£ {ls?.amount}</td>
                          ) : null}
                          {tableData[5]?.isActive ? (
                            <td>{ls?.paymentType}</td>
                          ) : null}
                          {tableData[6]?.isActive ? (
                            <td>{ls?.transactionDate}</td>
                          ) : null}
                          {permissions?.includes(
                            permissionList.Update_Withdraw_Request_Authorize_Status
                          ) ? (
                            <>
                              {tableData[7]?.isActive ? (
                                <td>
                                  {ls?.transactionStatus}
                                  {!(ls?.paymentStatusId == 2) &&
                                    current_user?.userTypeId ==
                                      userTypes?.SystemAdmin && (
                                      <Button
                                        color="warning"
                                        className="ml-2 btn-sm"
                                        onClick={() => handleUpdate(ls)}
                                        disabled={buttonStatus}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                    )}
                                </td>
                              ) : null}
                            </>
                          ) : null}
                          {tableData[8]?.isActive ? (
                            <td>{ls?.branchName}</td>
                          ) : null}
                          {permissions?.includes(
                            permissionList.Update_Withdraw_Request_Payment_Status
                          ) ? (
                            <>
                              {" "}
                              {tableData[9]?.isActive ? (
                                <td>
                                  {ls?.paymentStatus}
                                  {ls?.transactionStatusId == 2 &&
                                    !(ls?.paymentStatusId == 2) &&
                                    current_user?.userTypeId ==
                                      userTypes?.SystemAdmin && (
                                      <Button
                                        color="warning"
                                        className="ml-2 btn-sm"
                                        onClick={() => handleUpdate2(ls)}
                                        disabled={buttonStatus}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                    )}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[10]?.isActive ? (
                            <td className="text-center">
                              <ButtonGroup variant="text">
                                <ReactToPrint
                                  trigger={() => (
                                    <Button
                                      className="me-1 btn-sm"
                                      color="primary"
                                      onClick={printData(ls)}
                                    >
                                      Download
                                    </Button>
                                  )}
                                  content={() => componentRef2.current}
                                />
                              </ButtonGroup>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>

          {/* invoice pdf start */}

          <div style={{ display: "none" }}>
            <div ref={componentRef2} style={{ marginTop: "100px" }}>
              <div className="invoice-winthdraw-request-style">
                <img height={70} src={Assets} alt="" />
                <h1>Remittance Advice</h1>
              </div>

              <div style={{ marginTop: "100px" }}>
                <hr />
              </div>

              <div style={{ marginTop: "100px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <div>
                      <span
                        className="inv-span-styles"
                        style={{ color: "#1e98b0", fontWeight: "500" }}
                      >
                        {pdfData?.transactionCode}
                      </span>
                    </div>
                    <br />
                    <br />
                    <div>
                      <span>
                        <Icon.PhoneCall color="#1e98b0" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        +442072658478
                      </span>
                    </div>
                    <div>
                      <span>
                        <Icon.Search color="#1e98b0" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        finance@uapp.uk
                      </span>
                    </div>
                    <div>
                      <span>
                        <Icon.Map color="#1e98b0" />
                      </span>
                      <span
                        style={{ marginLeft: "10px" }}
                        className="inv-span-styles"
                      >
                        80-82 Nelson Street London E1 2DY
                      </span>
                    </div>
                    <div>
                      <span className="inv-span-styles">
                        TC Date {pdfData?.transactionDate}
                      </span>
                    </div>
                    <div>
                      <span className="inv-span-styles">
                        Transaction Status: {pdfData?.transactionStatus}
                      </span>
                    </div>
                    {pdfData?.transactionStatus !== "Pending" ? (
                      <>
                        <div>
                          <span className="inv-span-styles">
                            Authorized Date: {pdfData?.authorizationDate}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div>
                    <div>
                      <div>
                        <span
                          className="inv-span-styles"
                          style={{ color: "#1e98b0", fontWeight: "500" }}
                        >
                          Date : {pdfData?.transactionDate}
                        </span>
                      </div>
                      <br />
                      <br />
                      <div>
                        <span className="inv-span-styles">
                          Consultant Name :{pdfData?.consultantName}
                        </span>
                      </div>

                      <div>
                        <span className="inv-span-styles">
                          Consultant ID : {pdfData?.consultantId}
                        </span>
                      </div>
                      <div>
                        <span className="inv-span-styles">
                          Payment Type : {pdfData?.paymentType}
                        </span>
                      </div>
                      <div>
                        <span className="inv-span-styles">
                          Payment Status : {pdfData?.paymentStatus}
                        </span>
                      </div>
                      <div>
                        <span className="inv-span-styles">Reference No :</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "100px",
                  width: "80%",
                  marginLeft: "100px",
                }}
              >
                <table style={{ width: "100%" }}>
                  <thead className="tablehead">
                    <tr>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Quantity</span>
                      </th>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Description</span>
                      </th>
                      <th style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">Amount</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">1</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">
                          Recruitment & Enrollment Support
                        </span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">£ 200.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black" }}>
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">Net Amount</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">£ 200.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black" }}>
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">Deductions</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">£ 0</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black" }}>
                        <span></span>
                      </td>
                      <td style={{ borderBottom: "1px solid black" }}>
                        <span className="inv-span-styles">Total Amount</span>
                      </td>
                      <td style={{ border: "1px solid black" }}>
                        <span className="inv-span-styles">£ 200.00</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "100px", marginLeft: "100px" }}>
                <div>
                  <span className="inv-span-styles text-blue">
                    Bank Details
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">
                    Account Name : M G PORCISTEANU
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">
                    Account Number : 31882007
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">Short code : 402310</span>
                </div>
                <div>
                  <span className="inv-span-styles">Bank Name : HSBC</span>
                </div>
              </div>

              <div style={{ marginTop: "100px", textAlign: "center" }}>
                <span className="inv-span-styles">
                  I will be solely responsible for all my tax returns and
                  payments required by HMRC / Tax office.
                </span>
              </div>
            </div>
          </div>

          {/* invoice pdf end */}
        </>
      )}
    </div>
  );
};

export default Index;
