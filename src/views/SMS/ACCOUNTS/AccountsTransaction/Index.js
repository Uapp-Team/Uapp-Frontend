import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
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
import { useHistory, useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import { userTypes } from "../../../../constants/userTypeConstant";
import Pagination from "../../Pagination/Pagination";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import { transactionTypes } from "../../../../constants/TransactionConstant";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import { tableIdList } from "../../../../constants/TableIdConstant";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../../components/buttons/TagButton";
import Branch from "../../../../components/Dropdown/Filter";

const Index = () => {
  const history = useHistory();
  const { consultantId } = useParams();
  const userType = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantType, setConsultantType] = useState([]);
  const [consultantLabelType, setConsultantLabelType] = useState(
    "Select Consultant Type"
  );
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [consultantValueType, setConsultantValueType] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] = useState(
    "Select Transaction Type"
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [transactionValue, setTransactionValue] = useState(0);
  const [status, setStatus] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [transactionCode, setTransactionCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [inflowConsultantError, setInflowConsultantError] = useState("");
  const [inflowTransactionError, setInflowTransactionError] = useState("");
  const { addToast } = useToasts();
  const [bonusTransaction, setBonusTransaction] = useState([]);
  const [bonusTransactionLabel, setBonusTransactionLabel] = useState(
    "Select Transaction Type"
  );
  const [bonusTransactionValue, setBonusTransactionValue] = useState(0);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal2Open, setModal2Open] = useState(false);
  const [label2, setLabel2] = useState("Select Consultant");
  const [value2, setValue2] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [amountInputError, setAmountInputError] = useState("");
  const [inflowAmount, setInflowAmount] = useState("");
  const [inflowAmountError, setInflowAmountError] = useState("");

  const [tError, setTError] = useState("");
  const [tLabel, setTLabel] = useState("Select Transaction Type");
  const [tValue, setTValue] = useState(0);
  const [reference, setReference] = useState("");
  const [referenceError, setReferenceError] = useState("");
  const [inflowReference, setInflowReference] = useState("");
  const [inflowReferenceError, setInflowReferenceError] = useState("");
  const [inflowNote, setInflowNote] = useState("");
  const [inflowNoteError, setInflowNoteError] = useState("");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [cError, setCError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  // for hide/unhide column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [ser, setSer] = useState(1);

  const customStyles2 = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "34px",
    }),

    // valueContainer: (provided, state) => ({
    //   ...provided,
    //   height: '30px',
    //   padding: '0 6px'
    // }),

    // input: (provided, state) => ({
    //   ...provided,
    //   margin: '0px',
    // }),
    // indicatorSeparator: state => ({
    //   display: 'none',
    // }),
    // indicatorsContainer: (provided, state) => ({
    //   ...provided,
    //   height: '30px',
    // }),
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "33px",
      height: "33px",
      boxShadow: state.isFocused ? null : null,
    }),

    // menu: () => ({

    //   overflowY: 'auto'

    // }),
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [disabledSelect, setDisabledSelect] = useState(false);

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const selectConsultant2 = (label, value) => {
    setCError("");
    setLabel2(label);
    setValue2(value);
    get(`Balance/ConsultantBalance/${value}`).then((res) => {
      setAmount(res);
    });
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const closeModal = () => {
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setBonusTransactionLabel("Select Transaction Type");
    setBonusTransactionValue(0);
    setAgree(false);
    setInflowTransactionError("");
    setModalOpen(false);
  };

  const closeModal2 = () => {
    setLabel2("Select Consyltant");
    setValue2(0);
    setTLabel("Select Transaction Type");
    setTValue(0);
    setTError("");
    setAmount(0);
    setAmountInput("");
    setNote("");
    setReference("");
    setModal2Open(false);
  };

  const componentRef = useRef();

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });
    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
      if (consultantId) {
        const result = res?.find((ans) => ans?.id == consultantId);
        setConsultantLabel(result?.name);
        setConsultantValue(res?.id);
        setDisabledSelect(true);
      }
    });

    get(`ConsultantTypeDD/Index`).then((res) => {
      setConsultantType(res);
    });
    get(`PaymentTypeDD/Index`).then((res) => {
      setTransaction(res);
    });

    get(`TransactionStatusDD/Index`).then((res) => {
      setStatus(res);
    });

    get(`TableDefination/Index/${tableIdList?.Account_Transaction_List}`).then(
      (res) => {
        console.log("table data", res);
        setTableData(res);
      }
    );

    if (consultantId) {
      get(
        `AccountTransaction/Index?page=${currentPage}&pageSize=${dataPerPage}&consultanttypeid=${consultantValueType}&consultantid=${consultantId}&typeid=${transactionValue}&transactionStatusId=${statusValue}&code=${
          transactionCode === "" ? "emptystring" : transactionCode
        }&branchid=${branchValue}`
      ).then((res) => {
        setEntity(res?.totalEntity);
        setData(res?.models);
        setLoading(false);
        setSer(res?.firstSerialNumber);
      });
    } else {
      get(
        `AccountTransaction/Index?page=${currentPage}&pageSize=${dataPerPage}&consultanttypeid=${consultantValueType}&consultantid=${consultantValue}&typeid=${transactionValue}&transactionStatusId=${statusValue}&code=${
          transactionCode === "" ? "emptystring" : transactionCode
        }&branchid=${branchValue}`
      ).then((res) => {
        setEntity(res?.totalEntity);
        setData(res?.models);
        setLoading(false);
        setSer(res?.firstSerialNumber);
      });
    }

    get(`BonusTransactionTypeDD/Index`).then((res) => {
      setBonusTransaction(res);
    });
  }, [
    consultantId,
    success,
    consultantValue,
    transactionValue,
    statusValue,
    transactionCode,
    bonusTransactionValue,
    dataPerPage,
    callApi,
    currentPage,
    consultantValueType,
    branchValue,
  ]);

  const gotoDetailsPage = (data) => {
    if (data?.transactionTypeId == transactionTypes?.ApplicationTransaction) {
      window.open(
        `/applicationTransactiondetails/${data?.baseTransactionId}`,
        "_blank"
      );
    } else if (data?.transactionTypeId == transactionTypes?.BonusTransaction) {
      window.open(`/inFlow/details/${data?.baseTransactionId}`, "_blank");
    } else if (
      data?.transactionTypeId == transactionTypes?.WithDrawnTransaction
    ) {
      window.open(
        `/withdrawTransactionDetails/${data?.baseTransactionId}`,
        "_blank"
      );
    } else if (
      data?.transactionTypeId == transactionTypes?.CommissionTransaction
    ) {
      window.open(
        `/commissionTransactionDetails/${data?.baseTransactionId}`,
        "_blank"
      );
    }
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));
  const consultantTypeOptions = consultantType?.map((conType) => ({
    label: conType?.name,
    value: conType?.id,
  }));

  const selectConsultantType = (label, value) => {
    setInflowConsultantError("");
    setConsultantLabelType(label);
    setConsultantValueType(value);
  };
  const selectConsultant = (label, value) => {
    setInflowConsultantError("");
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const transactionOptions = transaction?.map((trn) => ({
    label: trn?.name,
    value: trn?.id,
  }));

  const outflowTransactionOptions = transaction?.map((trn) => ({
    label: trn?.name,
    value: trn?.id,
  }));

  const selectTransaction = (label, value) => {
    setInflowTransactionError("");
    setTransactionLabel(label);
    setTransactionValue(value);
  };
  const selectOutflowTransaction = (label, value) => {
    setTError("");
    setTLabel(label);
    setTValue(value);
  };

  const bonusTransactionOptions = bonusTransaction?.map((trn) => ({
    label: trn?.name,
    value: trn?.id,
  }));

  const selectBonusTransaction = (label, value) => {
    setInflowTransactionError("");
    setBonusTransactionLabel(label);
    setBonusTransactionValue(value);
  };

  const statusOptions = status?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
  };

  const handleReset = () => {
    setTransactionCode("");
    setConsultantLabel("Select Consultant");
    setConsultantValue(0);
    setConsultantLabelType("Select Consultant Type");
    setConsultantValueType(0);
    setStatusLabel("Select Status");
    setStatusValue(0);
    setTransactionLabel("Select Transaction Type");
    setTransactionValue(0);
    setBranchLabel("Select Branch");
    setBranchValue(0);
  };

  const handleInflowAmount = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setInflowAmount(newValue);

    if (!newValue) {
      setInflowAmountError("Amount is required");
    } else if (!isNumeric) {
      setInflowAmountError("Input must contain only numbers.");
    } else {
      setInflowAmountError("");
    }
  };

  const handleInflowNote = (e) => {
    setInflowNote(e.target.value);
    if (e.target.value === "") {
      setInflowNoteError("Note is required");
    } else {
      setInflowNoteError("");
    }
  };

  const handleInflowReference = (e) => {
    setInflowReference(e.target.value);
    if (e.target.value === "") {
      setInflowReferenceError("Reference is required");
    } else {
      setInflowReferenceError("");
    }
  };

  const validateInflowForm = () => {
    var isFormValid = true;

    if (consultantValue === 0) {
      isFormValid = false;
      setInflowConsultantError("Consultant Must be Selected");
    }

    if (bonusTransactionValue === 0) {
      isFormValid = false;
      setInflowTransactionError("Transaction Type Must be Selected");
    }

    if (!/^\d+$/.test(inflowAmount)) {
      isFormValid = false;
      setInflowAmountError("Input must contain only numbers.");
    }

    if (!inflowAmount) {
      isFormValid = false;
      setInflowAmountError("Amount is required");
    }
    if (!inflowReference) {
      isFormValid = false;
      setInflowReferenceError("Reference is required");
    }
    if (!inflowNote) {
      isFormValid = false;
      setInflowNoteError("Note is required");
    }

    return isFormValid;
  };

  const handleInflowSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateInflowForm(subData);
    if (formIsValid) {
      setProgress(true);
      setButtonStatus(true);
      post(`BonusTransaction/Create`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setConsultantValue(0);
          setConsultantLabel("Select Consultant");
          setBonusTransactionValue(0);
          setBonusTransactionLabel("Select TransactionType");
          setAgree(false);
          setModalOpen(false);
        }
      });
    }
  };

  ////////////////////////////

  const handleWithdrawAmount = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setAmountInput(newValue);

    if (!newValue) {
      setAmountInputError("Amount is required");
    } else if (!isNumeric) {
      setAmountInputError("Input must contain only numbers.");
    } else {
      setAmountInputError("");
    }
  };

  const handleWithDrawReference = (e) => {
    setReference(e.target.value);
    if (e.target.value === "") {
      setReferenceError("Reference is required");
    } else {
      setReferenceError("");
    }
  };

  const handleWithdrawNote = (e) => {
    setNote(e.target.value);
    if (e.target.value === "") {
      setNoteError("Note is required");
    } else {
      setNoteError("");
    }
  };

  const validateWithdrawForm = () => {
    var isFormValid = true;

    if (value2 === 0) {
      isFormValid = false;
      setCError("Consultant is required");
    }

    if (tValue === 0) {
      isFormValid = false;
      setTError("Transaction type is required");
    }

    if (!/^\d+$/.test(amountInput)) {
      isFormValid = false;
      setInflowAmountError("Input must contain only numbers.");
    }

    if (!amountInput) {
      isFormValid = false;
      setInflowAmountError("Amount is required");
    }
    if (!reference) {
      isFormValid = false;
      setReferenceError("Reference is required");
    }

    if (!note) {
      isFormValid = false;
      setNoteError("Note is required");
    }

    return isFormValid;
  };

  const submitWithdrawRequest = (event) => {
    event.preventDefault();

    const subData = {
      consultantId: value2,
      amount: amountInput,
      transactionNote: note,
      paymentTypeId: tValue,
      reference: reference,
    };

    var formIsValid = validateWithdrawForm(subData);

    if (formIsValid) {
      setProgress1(true);
      setButtonStatus(true);
      post(`WithdrawTransaction/Create`, subData).then((res) => {
        setProgress1(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setModal2Open(false);
          setLabel2("Select Consultant");
          setValue2(0);
          setTLabel("Select Transaction Type");
          setTValue(0);
          setAmount(0);
          setAmountInput("");
          setReference("");
          setNote("");
          setSuccess(!success);
          setModal2Open(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Account_Transaction_List}/${columnId}`
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
          {/* Outflow Modal */}
          <Modal
            isOpen={modal2Open}
            toggle={closeModal2}
            className="uapp-modal2"
          >
            <ModalHeader>Create Withdraw Request</ModalHeader>
            <ModalBody>
              <Form onSubmit={submitWithdrawRequest}>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Select Consultant <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      styles={customStyles}
                      options={consultantOptions}
                      value={{ label: label2, value: value2 }}
                      onChange={(opt) =>
                        selectConsultant2(opt.label, opt.value)
                      }
                      name="consultantId"
                      id="consultantId"
                    />
                    <span className="text-danger">{cError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount Available to Pay{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input type="text" value={amount} disabled required />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount<span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleWithdrawAmount(e);
                      }}
                      value={amountInput}
                      placeholder="Enter Amount"
                    />
                    <span className="text-danger">{amountInputError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Select Payment Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      styles={customStyles}
                      options={outflowTransactionOptions}
                      value={{ label: tLabel, value: tValue }}
                      onChange={(opt) =>
                        selectOutflowTransaction(opt.label, opt.value)
                      }
                    />
                    <span className="text-danger">{tError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Ref/Invoice<span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      value={reference}
                      placeholder="Enter Ref/Invoice"
                      onChange={(e) => {
                        handleWithDrawReference(e);
                      }}
                    />
                    <span className="text-danger">{referenceError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Note<span className="text-danger">*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="textarea"
                      value={note}
                      onChange={(e) => {
                        handleWithdrawNote(e);
                      }}
                      rows={2}
                      placeholder="Enter Note"
                    />
                    <span className="text-danger">{noteError}</span>
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-end">
                  <FormGroup className="has-icon-left position-relative">
                    <Button
                      color="primary"
                      className="mr-1 mt-3"
                      disabled={
                        amountInput < 50 ||
                        amountInput > amount ||
                        amountInput == isNaN(amountInput) ||
                        buttonStatus
                          ? true
                          : false
                      }
                    >
                      {progress1 ? <ButtonLoader /> : "Submit"}
                    </Button>
                  </FormGroup>
                </div>
              </Form>
              <ul>
                <li>
                  <span style={{ fontWeight: "500" }}>
                    Minimum Amount limit is &#xA3; 50{" "}
                  </span>
                </li>
              </ul>
            </ModalBody>
          </Modal>

          {/* Inflow Modal */}
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Inflow Transaction</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleInflowSubmit}>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Select Consultant <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      styles={customStyles2}
                      options={consultantOptions}
                      value={{ label: consultantLabel, value: consultantValue }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                      name="consultantId"
                      id="consultantId"
                      isDisabled={consultantId ? true : false}
                    />
                    <span className="text-danger">{inflowConsultantError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Transaction Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      styles={customStyles2}
                      options={bonusTransactionOptions}
                      value={{
                        label: bonusTransactionLabel,
                        value: bonusTransactionValue,
                      }}
                      onChange={(opt) =>
                        selectBonusTransaction(opt.label, opt.value)
                      }
                      name="transactionTypeId"
                      id="transactionTypeId"
                    />
                    <span className="text-danger">
                      {inflowTransactionError}
                    </span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Amount <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      placeholder="Enter Amount"
                      name="amount"
                      id="amount"
                      onChange={(e) => {
                        handleInflowAmount(e);
                      }}
                    />
                    <span className="text-danger">{inflowAmountError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Reference <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      placeholder="Enter Reference"
                      onChange={(e) => {
                        handleInflowReference(e);
                      }}
                      name="reference"
                      id="reference"
                    />
                    <span className="text-danger">{inflowReferenceError}</span>
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Note <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="textarea"
                      rows={2}
                      placeholder="Enter Note"
                      name="transactionNote"
                      id="transactionNote"
                      onChange={(e) => {
                        handleInflowNote(e);
                      }}
                    />
                    <span className="text-danger">{inflowNoteError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="12">
                    <span>
                      <span className="text-danger">
                        <b>Note:</b>
                      </span>{" "}
                      Adding any inflow will add amount directly to the
                      withdrawal balance.
                    </span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="12">
                    <div className="d-flex flex-wrap ml-3 pl-1">
                      <Input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <span>I acknowledge and understand the process.</span>
                    </div>
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-end">
                  <FormGroup className="has-icon-left position-relative">
                    <Button.Ripple
                      color="primary"
                      className="mr-1 mt-3"
                      disabled={!agree || buttonStatus}
                    >
                      {progress ? <ButtonLoader /> : "Submit"}
                    </Button.Ripple>
                  </FormGroup>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          <BreadCrumb title="Accounts Transaction List" backTo="" path="/" />

          <Card>
            <CardBody>
              <div className="row g-2">
                <div className="col-md-10">
                  <div className="row mb-3">
                    {userType !== userTypes?.Consultant ? (
                      <div className="col-md-3 mb-2">
                        <Select
                          options={consultantTypeOptions}
                          value={{
                            label: consultantLabelType,
                            value: consultantValueType,
                          }}
                          onChange={(opt) =>
                            selectConsultantType(opt.label, opt.value)
                          }
                        />
                      </div>
                    ) : null}

                    {userType !== userTypes?.Consultant ? (
                      <div className="col-md-3 mb-2">
                        <>
                          <Select
                            options={consultantOptions}
                            value={{
                              label: consultantLabel,
                              value: consultantValue,
                            }}
                            onChange={(opt) =>
                              selectConsultant(opt.label, opt.value)
                            }
                            isDisabled={consultantId ? true : false}
                          />
                        </>
                      </div>
                    ) : null}

                    <div className="col-md-3 mb-2">
                      <Select
                        options={transactionOptions}
                        value={{
                          label: transactionLabel,
                          value: transactionValue,
                        }}
                        onChange={(opt) =>
                          selectTransaction(opt.label, opt.value)
                        }
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <Select
                        options={statusOptions}
                        value={{ label: statusLabel, value: statusValue }}
                        onChange={(opt) => selectStatus(opt.label, opt.value)}
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

                    <div className="col-md-3 mb-2">
                      <Input
                        className="mb-2 transaction-code"
                        type="text"
                        placeholder="Enter Transaction Code"
                        value={transactionCode}
                        onChange={(e) => setTransactionCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {userType === userTypes?.Consultant ? null : (
                  <div className="col-md-2">
                    <div className="d-flex flex-column">
                      {permissions?.includes(
                        permissionList.Add_Inflow_Transaction
                      ) ? (
                        <button
                          className="mb-1 acc-tran-btn-style"
                          onClick={() => setModalOpen(true)}
                        >
                          Inflow
                        </button>
                      ) : null}
                      {permissions?.includes(
                        permissionList.Add_Outflow_Transaction
                      ) ? (
                        <button
                          className="mt-1 acc-tran-btn-style"
                          onClick={() => setModal2Open(true)}
                        >
                          Outflow
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-12 d-flex justify-content-start">
                  <div className="d-flex mt-1">
                    {consultantValueType !== 0 ||
                    consultantValue !== 0 ||
                    transactionValue !== 0 ||
                    statusValue !== 0
                      ? ""
                      : ""}
                    {consultantValueType !== 0 ? (
                      <TagButton
                        label={consultantLabelType}
                        setValue={() => setConsultantValueType(0)}
                        setLabel={() =>
                          setConsultantLabelType("Select Consultant Type")
                        }
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {(consultantValueType !== 0 && consultantValue !== 0) ||
                    transactionValue !== 0 ||
                    statusValue !== 0
                      ? ""
                      : ""}
                    {consultantValue !== 0 ? (
                      <TagButton
                        label={consultantLabel}
                        setValue={() => setConsultantValue(0)}
                        setLabel={() => setConsultantLabel("Select consultant")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {(consultantValue !== 0 && transactionValue !== 0) ||
                    statusValue !== 0
                      ? ""
                      : ""}
                    {transactionValue !== 0 ? (
                      <TagButton
                        label={transactionLabel}
                        setValue={() => setTransactionValue(0)}
                        setLabel={() =>
                          setTransactionLabel("Select Transaction Type")
                        }
                      ></TagButton>
                    ) : (
                      ""
                    )}

                    {transactionValue !== 0 && statusValue !== 0 ? "" : ""}
                    {statusValue !== 0 ? (
                      <TagButton
                        label={statusLabel}
                        setValue={() => setStatusValue(0)}
                        setLabel={() => setStatusLabel("Select Status")}
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
                  <div className="mt-1 mx-1 d-flex btn-clear">
                    {consultantValueType !== 0 ||
                    consultantValue !== 0 ||
                    transactionValue !== 0 ||
                    branchValue !== 0 ||
                    statusValue !== 0 ? (
                      <button className="tag-clear" onClick={handleReset}>
                        Clear All
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12 d-flex justify-content-start">
                  <div className="d-flex mt-1">
                    {consultantValueType !== 0 ||
                    consultantValue !== 0 ||
                    transactionValue !== 0 ||
                    statusValue !== 0
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
                    (transactionValue !== 0 || statusValue !== 0)
                      ? ""
                      : ""}
                    {transactionValue !== 0 ? (
                      <TagButton
                        label={transactionLabel}
                        setValue={() => setTransactionValue(0)}
                        setLabel={() =>
                          setTransactionLabel("Select Transaction Type")
                        }
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {transactionValue !== 0 && statusValue !== 0 ? "" : ""}
                    {statusValue !== 0 ? (
                      <TagButton
                        label={statusLabel}
                        setValue={() => setStatusValue(0)}
                        setLabel={() => setStatusLabel("Select Status")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-1 mx-1 d-flex btn-clear">
                    {consultantValue !== 0 ||
                    transactionValue !== 0 ||
                    statusValue !== 0 ? (
                      <button className="tag-clear" onClick={handleReset}>
                        Clear All
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div> */}
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              <div className=" row mb-3">
                <div className="col-lg-7 col-md-7 col-sm-8 col-xs-4">
                  <span className="mr-2">
                    <b>CB: </b>Created By.
                  </span>
                  <span className="mr-2">
                    <b>LUO: </b>Last Updated On.
                  </span>
                  <span className="mr-2">
                    <b>LUB: </b>Last Updated By.
                  </span>
                  <span>
                    <b>ATW: </b>Available To Withdraw.
                  </span>
                </div>

                <div className="col-lg-5 col-md-7 col-sm-4 col-xs-8">
                  <div className="d-flex justify-content-end flex-wrap">
                    <div className="ml-3">
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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}
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
                              {i === 11 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.View_Account_Transaction_Details
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

              {permissions?.includes(
                permissionList.View_Account_Transactions
              ) ? (
                <div className="table-responsive">
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr className="text-center">
                        {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                        {tableData[1]?.isActive ? <th>Date</th> : null}
                        {tableData[2]?.isActive ? <th>Consultant</th> : null}
                        {tableData[3]?.isActive ? (
                          <th>Transaction Code/Type</th>
                        ) : null}
                        {tableData[4]?.isActive ? <th>Details</th> : null}
                        {tableData[5]?.isActive ? <th>Inflow/Credit</th> : null}
                        {tableData[6]?.isActive ? <th>Outflow/Debit</th> : null}
                        {tableData[7]?.isActive ? <th>Balance</th> : null}
                        {tableData[8]?.isActive ? <th>Status</th> : null}
                        {tableData[9]?.isActive ? <th>Branch</th> : null}
                        {tableData[10]?.isActive ? <th>Log</th> : null}

                        {permissions?.includes(
                          permissionList.View_Account_Transaction_Details
                        ) ? (
                          <>
                            {tableData[11]?.isActive ? <th>Action</th> : null}{" "}
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((ls, i) => (
                        <tr key={i} className="text-center">
                          {tableData[0]?.isActive ? (
                            <th scope="row">{i + ser}</th>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td>{ls?.transactionDate}</td>
                          ) : null}
                          {tableData[2]?.isActive ? (
                            <td>{ls?.consultantName}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>
                              <b>{ls?.transactionCode}</b>
                              <br />
                              {ls?.transactionType}
                            </td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>{ls?.details}</td>
                          ) : null}
                          {tableData[5]?.isActive ? (
                            <td>£{ls?.credit}</td>
                          ) : null}
                          {tableData[6]?.isActive ? (
                            <td>£ {ls?.debit}</td>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <td>
                              Total: £ {ls?.balance}
                              <br />
                              ATW: £{ls?.withdrawBalance}
                            </td>
                          ) : null}
                          {tableData[8]?.isActive ? (
                            <td>{ls?.status}</td>
                          ) : null}
                          {tableData[9]?.isActive ? (
                            <td>{ls?.branchName}</td>
                          ) : null}
                          {tableData[10]?.isActive ? (
                            <td>
                              CB: {ls?.createdBy} LUO: {ls?.updatedOn} LUB:{" "}
                              {ls?.updatedBy}{" "}
                            </td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.View_Account_Transaction_Details
                          ) ? (
                            <>
                              {" "}
                              {tableData[11]?.isActive ? (
                                <td className="text-center">
                                  <ButtonGroup variant="text">
                                    <Button
                                      className="me-1 btn-sm"
                                      color="primary"
                                      onClick={() => gotoDetailsPage(ls)}
                                    >
                                      Details
                                    </Button>
                                  </ButtonGroup>
                                </td>
                              ) : null}
                            </>
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
        </div>
      )}
    </div>
  );
};

export default Index;
