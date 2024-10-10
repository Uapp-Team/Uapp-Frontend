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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import { userTypes } from "../../../../constants/userTypeConstant";
import { useToasts } from "react-toast-notifications";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../../components/buttons/TagButton";
import Branch from "../../../../components/Dropdown/Filter";
import WithdrawPdf from "./WithdrawPdf";
import ColumnWithdrawTransaction from "../../TableColumn/ColumnWithdrawTransaction";
import Typing from "../../../../components/form/Typing";
import Filter from "../../../../components/Dropdown/Filter";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";

const Index = () => {
  const withdrawTransactionPaging = JSON.parse(
    sessionStorage.getItem("withdrawTransaction")
  );
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMarketing, setIsMarketing] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    withdrawTransactionPaging?.currentPage
      ? withdrawTransactionPaging?.currentPage
      : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    withdrawTransactionPaging?.dataPerPage
      ? withdrawTransactionPaging?.dataPerPage
      : 15
  );
  // const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [consultant, setConsultant] = useState([]);

  const [userTypeLabel, setUserTypeLabel] = useState(
    withdrawTransactionPaging?.userTypeLabel
      ? withdrawTransactionPaging?.userTypeLabel
      : "All"
  );
  const [userTypeValue, setUserTypeValue] = useState(
    withdrawTransactionPaging?.userTypeValue
      ? withdrawTransactionPaging?.userTypeValue
      : 0
  );
  const [affiliateLabel, setAffiliateLabel] = useState(
    withdrawTransactionPaging?.affiliateLabel
      ? withdrawTransactionPaging?.affiliateLabel
      : "Select Affiliate"
  );
  const [affiliateValue, setAffiliateValue] = useState(
    withdrawTransactionPaging?.affiliateValue
      ? withdrawTransactionPaging?.affiliateValue
      : 0
  );
  const [companionLabel, setCompanionLabel] = useState(
    withdrawTransactionPaging?.companionLabel
      ? withdrawTransactionPaging?.companionLabel
      : "Select Companion"
  );
  const [companionValue, setCompanionValue] = useState(
    withdrawTransactionPaging?.companionValue
      ? withdrawTransactionPaging?.companionValue
      : 0
  );

  const [consultantLabel, setConsultantLabel] = useState(
    withdrawTransactionPaging?.consultantLabel
      ? withdrawTransactionPaging?.consultantLabel
      : "Select Consultant"
  );
  const [consultantValue, setConsultantValue] = useState(
    withdrawTransactionPaging?.consultantValue
      ? withdrawTransactionPaging?.consultantValue
      : 0
  );
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] = useState(
    withdrawTransactionPaging?.transactionLabel
      ? withdrawTransactionPaging?.transactionLabel
      : "Select Transaction Status"
  );
  const [transactionValue, setTransactionValue] = useState(
    withdrawTransactionPaging?.transactionValue
      ? withdrawTransactionPaging?.transactionValue
      : 0
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [payment, setPayment] = useState([]);
  const [paymentLabel, setPaymentLabel] = useState(
    withdrawTransactionPaging?.paymentLabel
      ? withdrawTransactionPaging?.paymentLabel
      : "Select Payment Status"
  );
  const [paymentValue, setPaymentValue] = useState(
    withdrawTransactionPaging?.paymentValue
      ? withdrawTransactionPaging?.paymentValue
      : 0
  );
  const [transactionCode, setTransactionCode] = useState(
    withdrawTransactionPaging?.transactionCode
      ? withdrawTransactionPaging?.transactionCode
      : ""
  );
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currData, setCurrData] = useState({});
  const [currData2, setCurrData2] = useState({});
  const [modalTLabel, setModalTLabel] = useState("Select Transaction Status");
  const [modalTValue, setModalTValue] = useState(0);
  // const [mTError, setMTerror] = useState("");
  // const [mPError, setMPerror] = useState("");
  const { addToast } = useToasts();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalPLabel, setModalPLabel] = useState("Select Payment Status");
  const [modalPValue, setModalPValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [fromrequest, setfromrequest] = useState("");
  const [torequest, settorequest] = useState("");
  const [frompayment, setfrompayment] = useState("");
  const [topayment, settopayment] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const userType = localStorage.getItem("userType");

  // for hide/unhide column
  // const [check, setCheck] = useState(true);

  const [tableData, setTableData] = useState("");

  useEffect(() => {
    const tableColumnWithdrawTransaction = JSON.parse(
      localStorage.getItem("ColumnWithdrawTransaction")
    );
    tableColumnWithdrawTransaction &&
      setTableData(tableColumnWithdrawTransaction);

    !tableColumnWithdrawTransaction &&
      localStorage.setItem(
        "ColumnWithdrawTransaction",
        JSON.stringify(ColumnWithdrawTransaction)
      );
    !tableColumnWithdrawTransaction && setTableData(ColumnWithdrawTransaction);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "withdrawTransaction",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        fromrequest: fromrequest && fromrequest,
        torequest: torequest && torequest,
        frompayment: frompayment && frompayment,
        topayment: topayment && topayment,
        userTypeLabel: userTypeLabel && userTypeLabel,
        userTypeValue: userTypeValue && userTypeValue,
        affiliateLabel: affiliateLabel && affiliateLabel,
        affiliateValue: affiliateValue && affiliateValue,
        companionLabel: companionLabel && companionLabel,
        companionValue: companionValue && companionValue,
        consultantLabel: consultantLabel && consultantLabel,
        consultantValue: consultantValue && consultantValue,
        transactionLabel: transactionLabel && transactionLabel,
        transactionValue: transactionValue && transactionValue,
        paymentLabel: paymentLabel && paymentLabel,
        paymentValue: paymentValue && paymentValue,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        transactionCode: transactionCode && transactionCode,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [
    currentPage,
    fromrequest,
    torequest,
    frompayment,
    topayment,
    consultantLabel,
    consultantValue,
    transactionLabel,
    transactionValue,
    paymentLabel,
    paymentValue,
    branchLabel,
    branchValue,
    transactionCode,
    dataPerPage,
    userTypeLabel,
    userTypeValue,
    affiliateLabel,
    affiliateValue,
    companionLabel,
    companionValue,
  ]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });

    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    get(`TransactionStatusDD/Index`).then((res) => {
      setTransaction(res);
    });

    get(`PaymentStatusDD/Index`).then((res) => {
      setPayment(res);
    });
    get(`TransactionStatus/IsMarketing`).then((res) => {
      setIsMarketing(res);
    });
  }, [success]);

  useEffect(() => {
    if (!isTyping) {
      get(
        `WithdrawRequest/Transactions?page=${currentPage}&pagesize=${dataPerPage}&consultantId=${consultantValue}&payment=${paymentValue}&trcode=${transactionCode}&fromrequest=${fromrequest}&torequest=${torequest}&frompayment=${frompayment}&topayment=${topayment}&branchid=${branchValue}&affiliateid=${affiliateValue}&companionid=${companionValue}&type=${userTypeValue}`
      ).then((res) => {
        console.log(res);
        setData(res?.models);
        setEntity(res?.totalEntity);
        setLoading(false);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    consultantValue,
    transactionValue,
    paymentValue,
    success,
    transactionCode,
    fromrequest,
    torequest,
    frompayment,
    topayment,
    branchValue,
    isTyping,
    affiliateValue,
    companionValue,
    userTypeValue,
  ]);

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

  // const selectTransaction = (label, value) => {
  //   setTransactionLabel(label);
  //   setTransactionValue(value);
  // };

  const selectTransaction2 = (label, value) => {
    // setMTerror("");
    setModalTLabel(label);
    setModalTValue(value);
  };

  // const handleUpdate = (data) => {
  //   setCurrData(data);
  //   setModalTLabel(data?.transactionStatus);
  //   setModalTValue(data?.transactionStatusId);
  //   setModalOpen(true);
  // };

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
    setCurrentPage(1);
    setDataPerPage(value);
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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setCallApi((prev) => !prev);
  };

  // search handler

  const componentRef = useRef();

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
      // setMTerror("Transaction status is required");
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
      // setMPerror("Transaction status is required");
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

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnWithdrawTransaction", JSON.stringify(values));
  };

  const userTypeSelectAction = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setAffiliateLabel("Select Affiliate");
    setAffiliateValue(0);
    setCompanionLabel("Select Companion");
    setCompanionValue(0);
  };

  return (
    <div>
      <BreadCrumb title="Withdraw Transaction List" backTo="" path="/" />

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
                    onChange={(opt) => selectTransaction2(opt.label, opt.value)}
                  />
                </Col>
              </FormGroup>

              <span className="text-danger">
                <b>Note:</b>
              </span>
              <span className="ml-1">
                By authorizing transaction, account officer will be able to make
                payment
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

        <Modal isOpen={modalOpen2} toggle={closeModal2} className="uapp-modal2">
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

        <Card className="zindex-100">
          <CardBody>
            <div className="row">
              <div className="col-md-3 mb-2">
                <span>From Request</span>

                <Input
                  type="date"
                  onChange={(e) => {
                    setfromrequest(e.target.value);
                  }}
                  value={fromrequest}
                />
              </div>
              <div className="col-md-3 mb-2">
                <span>To Request</span>

                <Input
                  type="date"
                  onChange={(e) => {
                    settorequest(e.target.value);
                  }}
                  value={torequest}
                />
              </div>
              <div className="col-md-3 mb-2">
                <span>From Payment</span>

                <Input
                  type="date"
                  onChange={(e) => {
                    setfrompayment(e.target.value);
                  }}
                  value={frompayment}
                />
              </div>
              <div className="col-md-3 mb-2">
                <span>To Payment</span>

                <Input
                  type="date"
                  onChange={(e) => {
                    settopayment(e.target.value);
                  }}
                  value={topayment}
                />
              </div>
            </div>

            <div className="row">
              {isMarketing && (
                <div className="col-md-3 mb-2">
                  <Filter
                    data={[
                      { id: 0, name: "All" },
                      { id: 1, name: "Consultant" },
                      { id: 2, name: "Affiliate" },
                      { id: 3, name: "Companion" },
                    ]}
                    label={userTypeLabel}
                    setLabel={setUserTypeLabel}
                    value={userTypeValue}
                    setValue={setUserTypeValue}
                    action={userTypeSelectAction}
                  />
                </div>
              )}

              {userType !== userTypes?.Consultant &&
              (userTypeValue === 0 || userTypeValue === 1) ? (
                <div className="col-md-3 mb-2">
                  <Select
                    options={consultantOptions}
                    value={{ label: consultantLabel, value: consultantValue }}
                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                  />
                </div>
              ) : null}

              {isMarketing && (
                <>
                  {(userTypeValue === 0 || userTypeValue === 2) && (
                    <div className="col-md-3 mb-2">
                      <DefaultDropdown
                        label={affiliateLabel}
                        setLabel={setAffiliateLabel}
                        value={affiliateValue}
                        setValue={setAffiliateValue}
                        url="AffiliateDD"
                        name="status"
                        error={() => {}}
                        setError={() => {}}
                        action={() => {}}
                      />
                    </div>
                  )}
                  {(userTypeValue === 0 || userTypeValue === 3) && (
                    <div className="col-md-3 mb-2">
                      <DefaultDropdown
                        label={companionLabel}
                        setLabel={setCompanionLabel}
                        value={companionValue}
                        setValue={setCompanionValue}
                        url="CompanionDD"
                        name="status"
                        error={() => {}}
                        setError={() => {}}
                        action={() => {}}
                      />
                    </div>
                  )}
                </>
              )}

              {/* <div className="col-md-3 mb-2">
                  <Select
                    options={transactionOptions}
                    value={{ label: transactionLabel, value: transactionValue }}
                    onChange={(opt) => selectTransaction(opt.label, opt.value)}
                  />
                </div> */}

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
                <Typing
                  name=""
                  placeholder="Enter Transaction Code"
                  setValue={setTransactionCode}
                  setIsTyping={setIsTyping}
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
                        setLabel={() => setConsultantLabel("Select Consultant")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {consultantValue !== 0 &&
                      (transactionValue !== 0 || paymentValue !== 0 ? "" : "")}
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
        {loading ? (
          <Loader />
        ) : (
          <Card className="uapp-employee-search">
            <CardBody>
              <div className=" row mb-3">
                {/* <div
                  className="col-lg-5 col-md-5 col-sm-4 col-xs-4"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(
                    permissionList.Add_New_withdraw_request
                  ) ? (
                    <Button color="primary" onClick={handleAddWithdrawRequest}>
                      <i className="fas fa-plus"></i>
                      <span> Add Withdraw Request</span>
                    </Button>
                  ) : null}
                </div> */}

                {/* <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8"> */}
                <div className="col-12">
                  <div className="d-flex justify-content-end flex-wrap">
                    <div className="me-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div className="ddzindex">
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
                              {i === 6 ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.Update_Withdraw_Request_Authorize_Status
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
                                    permissionList.Update_Withdraw_Request_Payment_Status
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
                </div>
              </div>

              {data?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <div className="table-responsive fixedhead" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Request Date</th> : null}
                        {userType !== userTypes?.Consultant &&
                        tableData[1]?.isActive ? (
                          <th>Name</th>
                        ) : null}
                        {tableData[2]?.isActive ? (
                          <th>Transaction Code</th>
                        ) : null}
                        {tableData[3]?.isActive ? <th>Amount</th> : null}
                        {tableData[4]?.isActive ? <th>Payment Type</th> : null}
                        {tableData[5]?.isActive ? <th>Payment Date</th> : null}
                        {permissions?.includes(
                          permissionList.Update_Withdraw_Request_Authorize_Status
                        ) ? (
                          <>{tableData[6]?.isActive ? <th>Status</th> : null}</>
                        ) : null}

                        {tableData[7]?.isActive ? <th>Branch</th> : null}

                        {permissions?.includes(
                          permissionList.Update_Withdraw_Request_Payment_Status
                        ) ? (
                          <>
                            {" "}
                            {tableData[8]?.isActive ? (
                              <th>Payment Status</th>
                            ) : null}
                          </>
                        ) : null}
                        {tableData[9]?.isActive ? <th>Invoice</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((ls, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          {/* {tableData[0]?.isActive ? <td>{i + 1}</td> : null} */}
                          {tableData[0]?.isActive ? (
                            <td>{ls?.transactionDate}</td>
                          ) : null}

                          {userType !== userTypes?.Consultant &&
                          tableData[1]?.isActive ? (
                            <td>
                              {permissions?.includes(
                                permissionList?.View_Consultant
                              ) ? (
                                <Link
                                  className="text-body"
                                  to={`${
                                    ls?.consultantId
                                      ? `consultantProfile/${ls?.consultantId}`
                                      : ls?.affiliateId
                                      ? `affiliate-profile/${ls?.affiliateId}`
                                      : `companion-profile/${ls?.companionId}`
                                  }`}
                                >
                                  {ls?.consultantName}
                                </Link>
                              ) : (
                                <>{ls?.consultantName}</>
                              )}
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td>{ls?.transactionCode}</td>
                          ) : null}

                          {tableData[3]?.isActive ? (
                            <td>£{ls?.amount}</td>
                          ) : null}

                          {tableData[4]?.isActive ? (
                            <td>{ls?.paymentType}</td>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td>{ls?.paymentDate}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.Update_Withdraw_Request_Authorize_Status
                          ) ? (
                            <>
                              {tableData[6]?.isActive ? (
                                <td>
                                  {ls?.transactionStatus}
                                  <br />
                                  <b> {ls?.authorizationDate}</b>
                                  {/* {!(ls?.paymentStatusId == 2) &&
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
                                  )} */}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <td>{ls?.branchName}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.Update_Withdraw_Request_Payment_Status
                          ) ? (
                            <>
                              {" "}
                              {tableData[8]?.isActive ? (
                                <td>
                                  {ls?.paymentStatus}

                                  {/* {ls?.transactionStatus === 'Rejected' } */}

                                  {ls?.paymentStatusId !== 2 &&
                                    ls?.transactionStatus !== "Rejected" && (
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

                          {tableData[9]?.isActive ? (
                            <td className="text-center">
                              <WithdrawPdf pdfData={ls} />
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
        )}
      </>
    </div>
  );
};

export default Index;
