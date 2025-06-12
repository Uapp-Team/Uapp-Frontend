import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
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
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import LinkButton from "../../../Components/LinkButton.js";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import PaginationOnly from "../../../Pagination/PaginationOnly.jsx";
import ConditionForText from "./ConditionForText.js";
import Filter from "../../../../../components/Dropdown/Filter.js";
import MessageHistoryCardApplicationDetailsPage from "../../ApplicationDetails/Component/RightSide/MessageHistoryCardApplicationDetailsPage.js";
import { Link } from "react-router-dom";
import ColumnApplicationConsultant from "../../../TableColumn/ColumnApplicationConsultant.js";
import ConfirmModal from "../../../../../components/modal/ConfirmModal.js";
import ContactNumber from "../../../../../components/ui/ContactNumber.js";
import DateRange from "../../../../../components/form/DateRange.js";

const ConsultantApplication = ({ currentUser }) => {
  const { addToast } = useToasts();
  const componentRef = useRef();
  const history = useHistory();
  const parameters = history?.location?.state?.state;
  const { status, selector, universityId, intake } = useParams();

  // Previous states get from session storage
  const applicationConsultant = JSON.parse(
    sessionStorage.getItem("applicationConsultant")
  );

  // permission get from localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // all states for this page
  const [currentPage, setCurrentPage] = useState(
    applicationConsultant?.currentPage ? applicationConsultant?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    applicationConsultant?.dataPerPage ? applicationConsultant?.dataPerPage : 15
  );
  const [orderLabel, setOrderLabel] = useState(
    applicationConsultant?.orderLabel
      ? applicationConsultant?.orderLabel
      : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    applicationConsultant?.orderValue ? applicationConsultant?.orderValue : 0
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [applicationDD, setApplicationDD] = useState([]);
  const [applicationSubDD, setApplicationSubDD] = useState([]);
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [confidenceLevelDD, setConfidenceLevelDD] = useState([]);
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);

  // for consultant
  const [consultantUappIdDD, setConsultantUappIdDD] = useState([]);
  const [consUappIdLabel, setConsUappIdLabel] = useState(
    applicationConsultant?.consUappIdLabel
      ? applicationConsultant?.consUappIdLabel
      : "UAPP ID"
  );
  const [consUappIdValue, setConsUappIdValue] = useState(
    applicationConsultant?.consUappIdValue
      ? applicationConsultant?.consUappIdValue
      : 0
  );
  const [consultantStdDD, setConsultantStdDD] = useState([]);
  const [consStdLabel, setConsStdLabel] = useState(
    applicationConsultant?.consStdLabel
      ? applicationConsultant?.consStdLabel
      : "Name"
  );
  const [consStdValue, setConsStdValue] = useState(
    applicationConsultant?.consStdValue
      ? applicationConsultant?.consStdValue
      : 0
  );

  const [consultantUniDD, setConsultantUniDD] = useState([]);
  const [consUniLabel, setConsUniLabel] = useState(
    applicationConsultant?.consUniLabel
      ? applicationConsultant?.consUniLabel
      : "University Name"
  );
  const [consUniValue, setConsUniValue] = useState(
    universityId
      ? universityId
      : applicationConsultant?.consUniValue
      ? applicationConsultant?.consUniValue
      : 0
  );

  const [consultantPhnDD, setConsultantPhnDD] = useState([]);
  const [consPhnLabel, setConsPhnLabel] = useState(
    applicationConsultant?.consPhnLabel
      ? applicationConsultant?.consPhnLabel
      : "Phone No."
  );
  const [consPhnValue, setConsPhnValue] = useState(
    applicationConsultant?.consPhnValue
      ? applicationConsultant?.consPhnValue
      : 0
  );

  // for all
  const [applicationLabel, setApplicationLabel] = useState(
    applicationConsultant?.applicationLabel
      ? applicationConsultant?.applicationLabel
      : "Status"
  );

  const [applicationValue, setApplicationValue] = useState(
    status > 0
      ? status
      : applicationConsultant?.applicationValue
      ? applicationConsultant?.applicationValue
      : 0
  );
  const [applicationSubLabel, setApplicationSubLabel] = useState(
    applicationConsultant?.applicationSubLabel
      ? applicationConsultant?.applicationSubLabel
      : "Sub Status"
  );
  const [applicationSubValue, setApplicationSubValue] = useState(
    selector > 0
      ? selector
      : applicationConsultant?.applicationSubValue
      ? applicationConsultant?.applicationSubValue
      : 0
  );

  const [offerLabel, setOfferLabel] = useState(
    applicationConsultant?.offerLabel
      ? applicationConsultant?.offerLabel
      : "Offer"
  );
  const [offerValue, setOfferValue] = useState(
    applicationConsultant?.offerValue ? applicationConsultant?.offerValue : 0
  );
  const [enrollLabel, setEnrollLabel] = useState(
    applicationConsultant?.enrollLabel
      ? applicationConsultant?.enrollLabel
      : "Enrolment Status"
  );
  const [enrollValue, setEnrollValue] = useState(
    applicationConsultant?.enrollValue ? applicationConsultant?.enrollValue : 0
  );
  const [intakeLabel, setIntakeLabel] = useState(
    applicationConsultant?.intakeLabel
      ? applicationConsultant?.intakeLabel
      : "Intake"
  );
  const [intakeValue, setIntakeValue] = useState(
    parameters?.intakeId
      ? parameters?.intakeId
      : applicationConsultant?.intakeValue
      ? applicationConsultant?.intakeValue
      : 0
  );
  const [intakeRngLabel, setIntakeRngLabel] = useState(
    applicationConsultant?.intakeRngLabel
      ? applicationConsultant?.intakeRngLabel
      : "Intake Range"
  );
  const [intakeRngValue, setIntakeRngValue] = useState(
    intake
      ? intake
      : parameters?.intakeRangeId
      ? parameters?.intakeRangeId
      : applicationConsultant?.intakeRngValue
      ? applicationConsultant?.intakeRngValue
      : 0
  );
  const [interviewLabel, setInterviewLabel] = useState(
    applicationConsultant?.interviewLabel
      ? applicationConsultant?.interviewLabel
      : "Interview"
  );
  const [interviewValue, setInterviewValue] = useState(
    applicationConsultant?.interviewValue
      ? applicationConsultant?.interviewValue
      : 0
  );
  const [elptLabel, setElptLabel] = useState(
    applicationConsultant?.elptLabel ? applicationConsultant?.elptLabel : "ELPT"
  );
  const [elptValue, setElptValue] = useState(
    applicationConsultant?.elptValue ? applicationConsultant?.elptValue : 0
  );
  const [financeLabel, setFinanceLabel] = useState(
    applicationConsultant?.financeLabel
      ? applicationConsultant?.financeLabel
      : "SLCs"
  );
  const [financeValue, setFinanceValue] = useState(
    applicationConsultant?.financeValue
      ? applicationConsultant?.financeValue
      : 0
  );

  const [documentStatusLabel, setdocumentStatusLabel] = useState(
    applicationConsultant?.documentStatusLabel
      ? applicationConsultant?.documentStatusLabel
      : "Select Document Status"
  );
  const [documentStatusValue, setdocumentStatusValue] = useState(
    applicationConsultant?.documentStatusValue
      ? applicationConsultant?.documentStatusValue
      : 0
  );

  const [confidenceLevel, setConfidenceLevel] = useState(
    applicationConsultant?.confidenceLevel
      ? applicationConsultant?.confidenceLevel
      : "Confidence Level"
  );
  const [confidenceValue, setConfidenceValue] = useState(
    parameters?.confidenceLevel?.toString()
      ? parameters?.confidenceLevel?.toString()
      : applicationConsultant?.confidenceValue
      ? applicationConsultant?.confidenceValue
      : ""
  );

  const [percentageLabel, setPercentageLabel] = useState(
    parameters?.percentage
      ? `${parameters?.percentage}%`
      : applicationConsultant?.percentageLabel
      ? applicationConsultant?.percentageLabel
      : "Assesment percentage"
  );
  const [percentageValue, setPercentageValue] = useState(
    parameters?.percentage
      ? parameters?.percentage
      : applicationConsultant?.percentageValue
      ? applicationConsultant?.percentageValue
      : 0
  );
  const [selectedDates, setSelectedDates] = useState(
    parameters?.fromApplicationDate && parameters?.toApplicationDate
      ? [parameters?.fromApplicationDate, parameters?.toApplicationDate]
      : applicationConsultant?.selectedDates
      ? applicationConsultant?.selectedDates
      : []
  );

  const [chatOpen, setChatOpen] = useState(false);

  const [chatapp, setchatapp] = useState(null);

  const isChatOpen = () => {
    setChatOpen(!chatOpen);
  };

  // application list
  const [applicationList, setApplicationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const [tableData, setTableData] = useState([]);

  // table column data get from localstorage or initial set
  useEffect(() => {
    const tableColumnApplicationConsultant = JSON.parse(
      localStorage.getItem("ColumnApplicationConsultant")
    );
    tableColumnApplicationConsultant &&
      setTableData(tableColumnApplicationConsultant);
    !tableColumnApplicationConsultant &&
      localStorage.setItem(
        "ColumnApplicationConsultant",
        JSON.stringify(ColumnApplicationConsultant)
      );
    !tableColumnApplicationConsultant &&
      setTableData(ColumnApplicationConsultant);
  }, []);

  // set page states at sessionStorage for next time use
  useEffect(() => {
    sessionStorage.setItem(
      "applicationConsultant",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        consUappIdLabel: consUappIdLabel && consUappIdLabel,
        consUappIdValue: consUappIdValue && consUappIdValue,
        consStdLabel: consStdLabel && consStdLabel,
        consStdValue: consStdValue && consStdValue,
        // offerLabel: selector !== "2" && offerLabel && offerLabel,
        // offerValue: selector !== "2" && offerValue && offerValue,
        applicationLabel: status > 0 && applicationLabel && applicationLabel,
        applicationValue: status > 0 && applicationValue && applicationValue,
        applicationSubLabel:
          selector > 0 && applicationSubLabel && applicationSubLabel,
        applicationSubValue:
          selector > 0 && applicationSubValue && applicationSubValue,
        // enrollLabel: selector !== "3" && enrollLabel && enrollLabel,
        // enrollValue: selector !== "3" && enrollValue && enrollValue,
        // enrollLabel: selector !== "3" && enrollLabel && enrollLabel,
        // enrollValue: selector !== "3" && enrollValue && enrollValue,
        intakeLabel: intakeLabel && intakeLabel,
        intakeValue: intakeValue && intakeValue,
        intakeRngLabel: !intake && intakeRngLabel && intakeRngLabel,
        intakeRngValue: !intake && intakeRngValue && intakeRngValue,
        interviewLabel: interviewLabel && interviewLabel,
        interviewValue: interviewValue && interviewValue,
        elptLabel: elptLabel && elptLabel,
        elptValue: elptValue && elptValue,
        financeLabel: financeLabel && financeLabel,
        financeValue: financeValue && financeValue,
        consUniLabel: consUniLabel && consUniLabel,
        consUniValue: consUniValue && consUniValue,
        consPhnLabel: consPhnLabel && consPhnLabel,
        consPhnValue: consPhnValue && consPhnValue,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        documentStatusLabel: documentStatusLabel && documentStatusLabel,
        documentStatusValue: documentStatusValue && documentStatusValue,
        percentageLabel: percentageLabel && percentageLabel,
        percentageValue: percentageValue && percentageValue,
        confidenceValue:
          (confidenceValue?.toString() === "0" || confidenceValue > 0) &&
          confidenceValue.toString(),
        confidenceLevel: confidenceLevel && confidenceLevel,
        selectedDates: selectedDates && selectedDates,
      })
    );
  }, [
    currentPage,
    consUappIdLabel,
    consUappIdValue,
    consStdLabel,
    consStdValue,
    offerLabel,
    offerValue,
    applicationLabel,
    applicationValue,
    enrollLabel,
    enrollValue,
    intakeLabel,
    intakeValue,
    intakeRngLabel,
    intakeRngValue,
    interviewLabel,
    interviewValue,
    elptLabel,
    elptValue,
    financeLabel,
    financeValue,
    consUniLabel,
    consUniValue,
    consPhnLabel,
    consPhnValue,
    dataPerPage,
    orderLabel,
    orderValue,
    selector,
    intake,
    documentStatusLabel,
    documentStatusValue,
    status,
    applicationSubLabel,
    applicationSubValue,
    percentageLabel,
    percentageValue,
    confidenceValue,
    confidenceLevel,
    selectedDates,
  ]);

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
  ];

  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    setOrderLabel(label);
    setOrderValue(value);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
  };

  // Filter Dropdown data setState action function start here
  const selectAppliDD = (label, value) => {
    setApplicationLabel(label);
    setApplicationValue(value);
    setApplicationSubLabel("Sub Status");
    setApplicationSubValue(0);
  };
  const selectOfferDD = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
  };
  const selectEnrollDD = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
  };
  const selectIntakeDD = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };
  const selectInterviewDD = (label, value) => {
    setInterviewLabel(label);
    setInterviewValue(value);
  };
  const selectElptDD = (label, value) => {
    setElptLabel(label);
    setElptValue(value);
  };
  const selectFinanceDD = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };
  const selectConsUappId = (label, value) => {
    setConsUappIdLabel(label);
    setConsUappIdValue(value);
  };
  const selectConsStd = (label, value) => {
    setConsStdLabel(label);
    setConsStdValue(value);
  };
  const selectConsUni = (label, value) => {
    setConsUniLabel(label);
    setConsUniValue(value);
  };
  const selectConsPhn = (label, value) => {
    setConsPhnLabel(label);
    setConsPhnValue(value);
  };
  // Filter Dropdown data setState action function end here

  // Filter Dropdown data API calling

  useEffect(() => {
    get(`ApplicationConfidence/SelectList`).then((res) => {
      setConfidenceLevelDD(res);
      if (
        parameters?.confidenceLevel?.toString() === "0" ||
        parameters?.confidenceLevel > 0
      ) {
        const filterData = res.filter((status) => {
          return status.id === parameters?.confidenceLevel;
        });
        setConfidenceLevel(filterData[0]?.name);
      }
    });
  }, [parameters]);

  useEffect(() => {
    get("ApplicationStatusDD/Index").then((res) => {
      setApplicationDD(res);
      if (status > 0) {
        const result = res?.find((ans) => ans?.id.toString() === status);
        setApplicationLabel(result?.name);
        setApplicationValue(res?.id);
      } else if (parameters?.applicationStatusId) {
        const result = res?.find(
          (ans) => ans?.id === parameters?.applicationStatusId
        );
        setApplicationLabel(result?.name);
      }
    });

    // get("OfferStatusDD/Index").then((res) => {
    //   setOfferDD(res);
    //   if (selector === "2") {
    //     const result = res?.find((ans) => ans?.id.toString() === status);
    //     setOfferLabel(result?.name);
    //     setOfferValue(res?.id);
    //   }
    // });

    // get("EnrollmentStatusDD/Index").then((res) => {
    //   setEnrollDD(res);
    //   console.log(res, "hahaha");
    //   if (selector === "3") {
    //     const result = res?.find((ans) => ans?.id.toString() === status);
    //     setEnrollLabel(result?.name);
    //     setEnrollValue(res?.id);
    //   }
    // });

    get("IntakeDD/Index").then((res) => {
      setIntakeDD(res);
      if (parameters?.intakeId) {
        const filterData = res.filter((status) => {
          return status.id === parameters?.intakeId;
        });
        setIntakeLabel(filterData[0]?.name);
      }
    });

    get("InterviewStatusDD/Index").then((res) => {
      setInterviewDD(res);
    });

    get("ElptStatusDD/Index").then((res) => {
      setElptDD(res);
    });
    get("StudentFinanceStatusDD/Index").then((res) => {
      setFinanceDD(res);
    });

    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);

      if (intake) {
        const filterData = res.filter((status) => {
          return status.id.toString() === intake;
        });
        setIntakeRngLabel(filterData[0]?.name);
      } else if (parameters?.intakeRangeId) {
        const filterData = res.filter((status) => {
          return status.id === parameters?.intakeRangeId;
        });
        setIntakeRngLabel(filterData[0]?.name);
      }
    });

    // for consultant
    if (currentUser !== undefined) {
      get(`CommonApplicationFilterDD/UappId`).then((res) => {
        setConsultantUappIdDD(res);
      });
      get(`CommonApplicationFilterDD/Student`).then((res) => {
        setConsultantStdDD(res);
      });
      get(`CommonApplicationFilterDD/University`).then((res) => {
        setConsultantUniDD(res);
        if (universityId) {
          const result = res?.find(
            (ans) => ans?.id.toString() === universityId
          );
          setConsUniLabel(result?.name);
          setConsUniValue(result?.id);
        }
      });
      get(`CommonApplicationFilterDD/PhoneNumber`).then((res) => {
        setConsultantPhnDD(res);
      });
    }
  }, [currentUser, intake, selector, status, parameters, universityId]);

  useEffect(() => {
    get(`ApplicationSubStatus/GetAll/${applicationValue}`).then((res) => {
      setApplicationSubDD(res);
      if (selector > 0) {
        const result = res?.filter((ans) => ans?.id.toString() === selector);
        setApplicationSubLabel(result[0]?.name);
      } else if (parameters?.applicationSubStatusId) {
        const result = res?.filter(
          (ans) => ans?.id === parameters?.applicationSubStatusId
        );
        console.log(result, "sub status");
        setApplicationSubLabel(result[0]?.name);
      }
    });
  }, [applicationValue, parameters, selector]);

  // Api calling for Application List
  useEffect(() => {
    if (currentUser !== undefined) {
      get(
        `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${consUappIdValue}&studentId=${consStdValue}&universityId=${consUniValue}&uappPhoneId=${consPhnValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}&percentage=${
          percentageValue ? percentageValue : 0
        }&fromApplicationDate=${
          selectedDates[0] ? selectedDates[0] : ""
        }&toApplicationDate=${
          selectedDates[1] ? selectedDates[1] : ""
        }&applicationSubStatusId=${applicationSubValue}&confidenceLevel=${
          confidenceValue ? confidenceValue : ""
        }`
      ).then((res) => {
        setLoading(false);
        setApplicationList(res?.models);
        setEntity(res?.totalEntity);
        // setSerialNumber(res?.firstSerialNumber);
      });
    }
  }, [
    applicationValue,
    consPhnValue,
    consStdValue,
    consUappIdValue,
    consUniValue,
    currentPage,
    currentUser,
    dataPerPage,
    elptValue,
    enrollValue,
    financeValue,
    intakeRngValue,
    intakeValue,
    interviewValue,
    offerValue,
    orderValue,
    universityId,
    documentStatusValue,
    confidenceValue,
    selectedDates,
    percentageValue,
    applicationSubValue,
  ]);

  // for all dropdown
  const applicationMenu = applicationDD.map((application) => ({
    label: application?.name,
    value: application?.id,
  }));
  const offerMenu = offerDD.map((offer) => ({
    label: offer?.name,
    value: offer?.id,
  }));
  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));
  const intakeMenu = intakeDD.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));
  const interviewMenu = interviewDD.map((interview) => ({
    label: interview?.name,
    value: interview?.id,
  }));
  const elptMenu = elptDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));
  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));

  // for consultant
  const consUappIdMenu = consultantUappIdDD.map((uappId) => ({
    label: uappId?.name,
    value: uappId?.id,
  }));
  const consStdMenu = consultantStdDD.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));
  const consUniMenu = consultantUniDD.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));
  const consPhnMenu = consultantPhnDD.map((phn) => ({
    label: phn?.name,
    value: phn?.id,
  }));

  // function for application delete modal open
  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function for application delete
  const handleDeleteData = () => {
    setProgress(true);
    remove(`Application/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
      setDelData({});
    });
  };

  // handle clear all search function
  const handleClearSearch = () => {
    !status && setApplicationLabel("Status");
    !status && setApplicationValue(0);
    !selector && setApplicationSubLabel("Sub Status");
    !selector && setApplicationSubValue(0);
    !intake && setIntakeRngLabel("Intake Range");
    !intake && setIntakeRngValue(0);
    setConfidenceLevel("Confidence Level");
    setConfidenceValue("");
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setConsUappIdLabel("UAPP ID");
    setConsUappIdValue(0);
    setConsStdLabel("Name");
    setConsStdValue(0);
    setConsUniLabel("University Name");
    setConsUniValue(0);
    setConsPhnLabel("Phone No.");
    setConsPhnValue(0);
    setdocumentStatusValue(0);
    setdocumentStatusLabel("Select Document Status");
    setPercentageLabel("All");
    setPercentageValue(0);
    setSelectedDates([]);
    setCurrentPage(1);
  };

  // table column data update localStorage for next time use
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationConsultant", JSON.stringify(values));
  };

  return (
    <>
      {/* BreadCrumb */}
      <BreadCrumb title="Applications" backTo="" path="" />

      {/*Filter Dropdown Area starts here */}
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={consUappIdMenu}
                value={{ label: consUappIdLabel, value: consUappIdValue }}
                onChange={(opt) => selectConsUappId(opt.label, opt.value)}
                placeholder="UAPP ID"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={consStdMenu}
                value={{ label: consStdLabel, value: consStdValue }}
                onChange={(opt) => selectConsStd(opt.label, opt.value)}
                placeholder="Name"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={applicationMenu}
                value={{ label: applicationLabel, value: applicationValue }}
                onChange={(opt) => selectAppliDD(opt.label, opt.value)}
                placeholder="Status"
                name="name"
                id="id"
                isDisabled={status > 0 ? true : false}
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Filter
                data={applicationSubDD}
                label={applicationSubLabel}
                setLabel={setApplicationSubLabel}
                value={applicationSubValue}
                setValue={setApplicationSubValue}
                action={() => {}}
                className="mr-2"
                isDisabled={selector > 0 ? true : false}
              />
            </Col>

            {/* <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={offerMenu}
                value={{ label: offerLabel, value: offerValue }}
                onChange={(opt) => selectOfferDD(opt.label, opt.value)}
                placeholder="Offer"
                name="name"
                id="id"
                isDisabled={selector === "2" ? true : false}
              /> 
            </Col>*/}

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <div className="mt-2">
                <span
                  className="more-filters pointer"
                  onClick={() => setIsHide(!isHide)}
                >
                  {isHide ? <> Hide Filters</> : <>More Filters</>}
                </span>
              </div>
            </Col>
          </Row>
          <Row className="gy-3">
            {isHide ? (
              <>
                {/* <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={applicationMenu}
                    value={{ label: applicationLabel, value: applicationValue }}
                    onChange={(opt) => selectAppliDD(opt.label, opt.value)}
                    placeholder="Status"
                    name="name"
                    id="id"
                    isDisabled={selector === "1" ? true : false}
                  />
                </Col> */}
                {/* <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={enrollMenu}
                    value={{ label: enrollLabel, value: enrollValue }}
                    onChange={(opt) => selectEnrollDD(opt.label, opt.value)}
                    placeholder="Enrolment st..."
                    name="name"
                    id="id"
                    isDisabled={selector === "3" ? true : false}
                  />
                </Col> */}
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={intakeMenu}
                    value={{ label: intakeLabel, value: intakeValue }}
                    onChange={(opt) => selectIntakeDD(opt.label, opt.value)}
                    placeholder="Intake"
                    name="name"
                    id="id"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Filter
                    data={intakeRngDD}
                    label={intakeRngLabel}
                    setLabel={setIntakeRngLabel}
                    value={intakeRngValue}
                    setValue={setIntakeRngValue}
                    action={() => {}}
                    isDisabled={intake ? true : false}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={interviewMenu}
                    value={{ label: interviewLabel, value: interviewValue }}
                    onChange={(opt) => selectInterviewDD(opt.label, opt.value)}
                    placeholder="Interview"
                    name="name"
                    id="id"
                  />
                </Col>

                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={elptMenu}
                    value={{ label: elptLabel, value: elptValue }}
                    onChange={(opt) => selectElptDD(opt.label, opt.value)}
                    placeholder="ELPT"
                    name="name"
                    id="id"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={financeMenu}
                    value={{ label: financeLabel, value: financeValue }}
                    onChange={(opt) => selectFinanceDD(opt.label, opt.value)}
                    placeholder="SLCs"
                    name="name"
                    id="id"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={consUniMenu}
                    value={{ label: consUniLabel, value: consUniValue }}
                    onChange={(opt) => selectConsUni(opt.label, opt.value)}
                    placeholder="University N..."
                    name="name"
                    id="id"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={consPhnMenu}
                    value={{ label: consPhnLabel, value: consPhnValue }}
                    onChange={(opt) => selectConsPhn(opt.label, opt.value)}
                    placeholder="Phone No."
                    name="name"
                    id="id"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Filter
                    data={[
                      {
                        id: 0,
                        name: "All",
                      },
                      {
                        id: 1,
                        name: "Approved",
                      },
                      {
                        id: 2,
                        name: "In Review",
                      },
                      {
                        id: 3,
                        name: "Missing",
                      },
                    ]}
                    label={documentStatusLabel}
                    setLabel={setdocumentStatusLabel}
                    value={documentStatusValue}
                    setValue={setdocumentStatusValue}
                    action={() => {}}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Filter
                    data={[
                      {
                        id: 0,
                        name: "All",
                      },
                      {
                        id: 20,
                        name: "20%",
                      },
                      {
                        id: 40,
                        name: "40%",
                      },
                      {
                        id: 60,
                        name: "60%",
                      },
                      {
                        id: 80,
                        name: "80%",
                      },
                      {
                        id: 100,
                        name: "100%",
                      },
                    ]}
                    label={percentageLabel}
                    setLabel={setPercentageLabel}
                    value={percentageValue}
                    setValue={setPercentageValue}
                    action={() => {}}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Filter
                    data={confidenceLevelDD}
                    label={confidenceLevel}
                    setLabel={setConfidenceLevel}
                    value={confidenceValue}
                    setValue={setConfidenceValue}
                    action={() => {}}
                    className="mr-2"
                    isDisabled={selector > 0 ? true : false}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <DateRange
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                  />
                </Col>
              </>
            ) : null}
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <ConditionForText
                  status={status}
                  selector={selector}
                  // branchLabel={branchLabel}
                  // setBranchLabel={setBranchLabel}
                  branchValue={0}
                  // setBranchValue={setBranchValue}
                  commonUappIdValue={consUappIdValue}
                  commonStdValue={consStdValue}
                  consultantValue={0}
                  applicationValue={applicationValue}
                  offerValue={offerValue}
                  enrollValue={enrollValue}
                  intakeValue={intakeValue}
                  intake={intake}
                  intakeRngValue={intakeRngValue}
                  interviewValue={interviewValue}
                  elptValue={elptValue}
                  financeValue={financeValue}
                  commonUniValue={consUniValue}
                  commonUappIdLabel={consUappIdLabel}
                  commonStdLabel={consStdLabel}
                  // consultantLabel={consultantLabel}
                  applicationLabel={applicationLabel}
                  offerLabel={offerLabel}
                  enrollLabel={enrollLabel}
                  intakeLabel={intakeLabel}
                  intakeRngLabel={intakeRngLabel}
                  interviewLabel={interviewLabel}
                  elptLabel={elptLabel}
                  financeLabel={financeLabel}
                  commonUniLabel={consUniLabel}
                  setApplicationLabel={setApplicationLabel}
                  setApplicationValue={setApplicationValue}
                  setOfferLabel={setOfferLabel}
                  setOfferValue={setOfferValue}
                  setEnrollLabel={setEnrollLabel}
                  setEnrollValue={setEnrollValue}
                  setIntakeLabel={setIntakeLabel}
                  setIntakeValue={setIntakeValue}
                  setIntakeRngLabel={setIntakeRngLabel}
                  setIntakeRngValue={setIntakeRngValue}
                  setInterviewLabel={setInterviewLabel}
                  setInterviewValue={setInterviewValue}
                  setElptLabel={setElptLabel}
                  setElptValue={setElptValue}
                  setFinanceLabel={setFinanceLabel}
                  setFinanceValue={setFinanceValue}
                  setCommonUappIdLabel={setConsUappIdLabel}
                  setCommonUappIdValue={setConsUappIdValue}
                  setCommonUniLabel={setConsUniLabel}
                  setCommonUniValue={setConsUniValue}
                  // setConsultantLabel={setConsultantLabel}
                  // setConsultantValue={setConsultantValue}
                  setCommonStdLabel={setConsStdLabel}
                  setCommonStdValue={setConsStdValue}
                  branchManagerValue={0}
                  admissionManagerValue={0}
                  proValue={0}
                  documentStatusLabel={documentStatusLabel}
                  setdocumentStatusLabel={setdocumentStatusLabel}
                  documentStatusValue={documentStatusValue}
                  setdocumentStatusValue={setdocumentStatusValue}
                  applicationSubValue={applicationSubValue}
                  applicationSubLabel={applicationSubLabel}
                  setApplicationSubLabel={setApplicationSubLabel}
                  setApplicationSubValue={setApplicationSubValue}
                  percentageLabel={percentageLabel}
                  setPercentageLabel={setPercentageLabel}
                  percentageValue={percentageValue}
                  setPercentageValue={setPercentageValue}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  confidenceLevel={confidenceLevel}
                  setConfidenceLevel={setConfidenceLevel}
                  confidenceValue={confidenceValue}
                  setConfidenceValue={setConfidenceValue}
                ></ConditionForText>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {consUappIdValue !== 0 ||
                  consStdValue !== 0 ||
                  (!status && applicationValue !== 0) ||
                  (!selector && applicationSubValue !== 0) ||
                  // (selector !== "2" && offerValue !== 0) ||
                  // (selector !== "3" && enrollValue !== 0) ||
                  intakeValue !== 0 ||
                  (!intake && intakeRngValue !== 0) ||
                  interviewValue !== 0 ||
                  elptValue !== 0 ||
                  financeValue !== 0 ||
                  documentStatusValue !== 0 ||
                  consUniValue !== 0 ||
                  confidenceValue !== "" ||
                  percentageValue !== 0 ||
                  selectedDates?.length > 0 ? (
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
      {/*Filter Dropdown Area end here */}

      <Card className="uapp-employee-search">
        <CardBody>
          {/* Filter Page number and column hide Area starts here*/}

          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <h5 className="text-orange fw-700">Total {entity} items</h5>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
                <div className="mr-3 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div className="ddzindex">
                      <Select
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
                      {tableData.map((table, i) => (
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
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>
          {/*Filter Page number and column hide Area ends here*/}

          {/* Table Data Showing Area starts here*/}
          {permissions?.includes(permissionList.View_Application_List) && (
            <>
              {applicationList?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <>
                  {loading ? (
                    <div className="d-flex justify-content-center mb-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="table-responsive mb-3 fixedhead"
                      ref={componentRef}
                    >
                      <Table
                        id="table-to-xls"
                        style={{ fontSize: "12px" }}
                        className="table-sm table-bordered"
                      >
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                APP ID
                              </th>
                            ) : null}
                            {tableData[1]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                UAPP ID
                              </th>
                            ) : null}
                            {tableData[2]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Applicant
                              </th>
                            ) : null}
                            {tableData[3]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Contact
                              </th>
                            ) : null}
                            {tableData[4]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                University
                              </th>
                            ) : null}
                            {tableData[5]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Campus
                              </th>
                            ) : null}
                            {tableData[6]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Course
                              </th>
                            ) : null}
                            {tableData[7]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Intake
                              </th>
                            ) : null}
                            {tableData[8]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Application Date
                              </th>
                            ) : null}
                            {tableData[9]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Status
                              </th>
                            ) : null}

                            {tableData[10]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Document Status
                              </th>
                            ) : null}

                            {tableData[11]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Assessment
                              </th>
                            ) : null}

                            {tableData[12]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Interview
                              </th>
                            ) : null}
                            {tableData[13]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>ELPT</th>
                            ) : null}

                            {tableData[14]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>SLCs</th>
                            ) : null}

                            {tableData[15]?.isActive ? (
                              <th
                                style={{ verticalAlign: "middle" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {applicationList?.map((app, i) => (
                            <tr key={i}>
                              {tableData[0]?.isActive ? (
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="cursor-pointer hyperlink-hover"
                                >
                                  <Link
                                    className="text-id hover"
                                    to={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                  >
                                    {app?.applicationViewId}
                                  </Link>
                                </td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="cursor-pointer hyperlink-hover"
                                >
                                  <span
                                    onClick={() => {
                                      history.push(
                                        `/studentProfile/${app?.studentId}`
                                      );
                                    }}
                                  >
                                    {app?.uappId}
                                  </span>
                                </td>
                              ) : null}

                              {tableData[2]?.isActive ? (
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="cursor-pointer hyperlink-hover"
                                >
                                  <span
                                    onClick={() => {
                                      history.push(
                                        `/studentProfile/${app?.studentId}`
                                      );
                                    }}
                                  >
                                    {app?.studentName}
                                  </span>
                                </td>
                              ) : null}

                              {tableData[3]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <ContactNumber data={app?.studentPhone} />
                                  <br />
                                  {app?.studentEmail}
                                </td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="cursor-pointer hyperlink-hover"
                                >
                                  <span
                                    onClick={() => {
                                      history.push(
                                        `/universityDetails/${app?.universityId}`
                                      );
                                    }}
                                  >
                                    {app?.universityName}
                                  </span>
                                </td>
                              ) : null}

                              {tableData[5]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.campusName}
                                </td>
                              ) : null}

                              {tableData[6]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.subjectName}
                                </td>
                              ) : null}

                              {tableData[7]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.intakeName}
                                </td>
                              ) : null}

                              {tableData[8]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.createdOn}
                                </td>
                              ) : null}

                              {tableData[9]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.applicationStatusName} <br />
                                  {app?.ApplicationSubStatusName}
                                </td>
                              ) : null}

                              {tableData[10]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.documentStatus}
                                </td>
                              ) : null}

                              {tableData[11]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.assesmentPercentage}%
                                </td>
                              ) : null}

                              {tableData[12]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.interviewStatusName}
                                </td>
                              ) : null}

                              {tableData[13]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.elptStatusName}
                                </td>
                              ) : null}

                              {tableData[14]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.studentFinanceName}
                                </td>
                              ) : null}

                              {tableData[15]?.isActive ? (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  {/* Application Details page link Button */}
                                  <div className="d-flex justify-content-center">
                                    {permissions?.includes(
                                      permissionList.View_Application_Details
                                    ) ? (
                                      <LinkButton
                                        url={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                        color="primary"
                                        className={"mx-1 btn-sm mt-2"}
                                        icon={<i className="fas fa-eye"></i>}
                                      />
                                    ) : null}

                                    {/* Chat Button */}
                                    <ButtonForFunction
                                      icon={
                                        <i
                                          className="fas fa-comment"
                                          style={{
                                            paddingLeft: "1.8px",
                                            paddingRight: "1.8px",
                                          }}
                                        ></i>
                                      }
                                      color={"info"}
                                      className={"mx-1 btn-sm mt-2"}
                                      func={() => {
                                        setChatOpen(true);
                                        setchatapp(app);
                                      }}
                                    />

                                    {/* Delete Button */}
                                    {permissions?.includes(
                                      permissionList.Delete_Application_Details
                                    ) ? (
                                      <ButtonForFunction
                                        icon={
                                          <i
                                            className="fas fa-trash-alt"
                                            style={{
                                              paddingLeft: "1.8px",
                                              paddingRight: "1.8px",
                                            }}
                                          ></i>
                                        }
                                        color={"danger"}
                                        className={"mx-1 btn-sm mt-2"}
                                        func={() => toggleDanger(app)}
                                      />
                                    ) : null}
                                  </div>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}{" "}
                </>
              )}
            </>
          )}
          {/* Table Data Showing Area starts here*/}

          {/* Pagination */}
          <PaginationOnly
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      {/* Chat Action Component  */}
      {chatOpen === true && (
        <div className="messanger">
          <MessageHistoryCardApplicationDetailsPage
            applicationSubStatusId={chatapp.applicationSubStatusId}
            applicationId={`${chatapp.id}`}
            viewId={`${chatapp.applicationViewId}`}
            chatOpen={chatOpen}
            close={() => {
              isChatOpen();
              setchatapp(null);
            }}
            attach={false}
            user={false}
          />
        </div>
      )}

      {/* Application Delete models  */}
      <ConfirmModal
        text="Do You Want To Delete This Application ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        progress={progress}
      />
    </>
  );
};

export default ConsultantApplication;
