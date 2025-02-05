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
import { useLocation, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import LinkButton from "../../../Components/LinkButton.js";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import ConditionForText from "./ConditionForText.js";
import PaginationOnly from "../../../Pagination/PaginationOnly.jsx";
import Filter from "../../../../../components/Dropdown/Filter.js";
import MessageHistoryCardApplicationDetailsPage from "../../ApplicationDetails/Component/RightSide/MessageHistoryCardApplicationDetailsPage.js";
import { Link } from "react-router-dom";
import ColumnApplicationManager from "../../../TableColumn/ColumnApplicationManager.js";
import ConfirmModal from "../../../../../components/modal/ConfirmModal.js";
import Download from "../../../../../components/buttons/Download.js";
import Typing from "../../../../../components/form/Typing.js";

const AdmissionManagerApplication = ({ currentUser }) => {
  const componentRef = useRef();
  const { addToast } = useToasts();
  const location = useLocation();
  const { status, selector, universityId, consultantId, intake } = useParams();

  // Previous states get from session storage
  const AdmissionManagerApplicationPaging = JSON.parse(
    sessionStorage.getItem("admissionManagerApplication")
  );

  // Dropdown Filter states
  const [isHide, setIsHide] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [applicationId, setApplicationId] = useState(
    AdmissionManagerApplicationPaging?.applicationId
      ? AdmissionManagerApplicationPaging?.applicationId
      : ""
  );

  const [currentPage, setCurrentPage] = useState(
    AdmissionManagerApplicationPaging?.currentPage
      ? AdmissionManagerApplicationPaging?.currentPage
      : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    AdmissionManagerApplicationPaging?.dataPerPage
      ? AdmissionManagerApplicationPaging?.dataPerPage
      : 15
  );
  const [orderLabel, setOrderLabel] = useState(
    AdmissionManagerApplicationPaging?.orderLabel
      ? AdmissionManagerApplicationPaging?.orderLabel
      : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    AdmissionManagerApplicationPaging?.orderValue
      ? AdmissionManagerApplicationPaging?.orderValue
      : 0
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [applicationDD, setApplicationDD] = useState([]);
  const [applicationSubDD, setApplicationSubDD] = useState([]);
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [chatOpen, setChatOpen] = useState(false);

  const [chatapp, setchatapp] = useState(null);

  const isChatOpen = () => {
    setChatOpen(!chatOpen);
  };

  // states for admission manager
  const [managerUappIdDD, setManagerUappIdDD] = useState([]);
  const [managerUappIdLabel, setmanagerUappIdLabel] = useState(
    AdmissionManagerApplicationPaging?.managerUappIdLabel
      ? AdmissionManagerApplicationPaging?.managerUappIdLabel
      : "UAPP ID"
  );
  const [managerUappIdValue, setmanagerUappIdValue] = useState(
    AdmissionManagerApplicationPaging?.managerUappIdValue
      ? AdmissionManagerApplicationPaging?.managerUappIdValue
      : 0
  );

  const [managerStdDD, setManagerStdDD] = useState([]);
  const [managerStdLabel, setManagerStdLabel] = useState(
    AdmissionManagerApplicationPaging?.managerStdLabel
      ? AdmissionManagerApplicationPaging?.managerStdLabel
      : "Name"
  );
  const [managerStdValue, setManagerStdValue] = useState(
    AdmissionManagerApplicationPaging?.managerStdValue
      ? AdmissionManagerApplicationPaging?.managerStdValue
      : 0
  );

  const [managerConsDD, setManagerConsDD] = useState([]);
  const [managerConsLabel, setManagerConsLabel] = useState(
    AdmissionManagerApplicationPaging?.managerConsLabel
      ? AdmissionManagerApplicationPaging?.managerConsLabel
      : "Consultant"
  );
  const [managerConsValue, setManagerConsValue] = useState(
    consultantId
      ? consultantId
      : AdmissionManagerApplicationPaging?.managerConsValue
      ? AdmissionManagerApplicationPaging?.managerConsValue
      : 0
  );

  const [managerUniDD, setManagerUniDD] = useState([]);
  const [managerUniLabel, setManagerUniLabel] = useState(
    AdmissionManagerApplicationPaging?.managerUniLabel
      ? AdmissionManagerApplicationPaging?.managerUniLabel
      : "University Name"
  );
  const [managerUniValue, setManagerUniValue] = useState(
    universityId
      ? universityId
      : AdmissionManagerApplicationPaging?.managerUniValue
      ? AdmissionManagerApplicationPaging?.managerUniValue
      : 0
  );

  const [managerPhnDD, setManagerPhoneDD] = useState([]);
  const [managerPhnLabel, setManagerPhnLabel] = useState(
    AdmissionManagerApplicationPaging?.managerPhnLabel
      ? AdmissionManagerApplicationPaging?.managerPhnLabel
      : "Phone No."
  );
  const [managerPhnValue, setManagerPhnValue] = useState(
    AdmissionManagerApplicationPaging?.managerPhnValue
      ? AdmissionManagerApplicationPaging?.managerPhnValue
      : 0
  );

  const [documentStatusLabel, setdocumentStatusLabel] = useState(
    AdmissionManagerApplicationPaging?.documentStatusLabel
      ? AdmissionManagerApplicationPaging?.documentStatusLabel
      : "Select Document Status"
  );
  const [documentStatusValue, setdocumentStatusValue] = useState(
    AdmissionManagerApplicationPaging?.documentStatusValue
      ? AdmissionManagerApplicationPaging?.documentStatusValue
      : 0
  );

  // states for all common state
  const [applicationLabel, setApplicationLabel] = useState(
    AdmissionManagerApplicationPaging?.applicationLabel
      ? AdmissionManagerApplicationPaging?.applicationLabel
      : "Status"
  );
  const [applicationValue, setApplicationValue] = useState(
    status > 0
      ? status
      : AdmissionManagerApplicationPaging?.applicationValue
      ? AdmissionManagerApplicationPaging?.applicationValue
      : 0
  );
  const [applicationSubLabel, setApplicationSubLabel] = useState(
    AdmissionManagerApplicationPaging?.applicationSubLabel
      ? AdmissionManagerApplicationPaging?.applicationSubLabel
      : "Sub Status"
  );
  const [applicationSubValue, setApplicationSubValue] = useState(
    selector > 0
      ? selector
      : AdmissionManagerApplicationPaging?.applicationSubValue
      ? AdmissionManagerApplicationPaging?.applicationSubValue
      : 0
  );
  const [offerLabel, setOfferLabel] = useState(
    AdmissionManagerApplicationPaging?.offerLabel
      ? AdmissionManagerApplicationPaging?.offerLabel
      : "Offer"
  );
  const [offerValue, setOfferValue] = useState(
    AdmissionManagerApplicationPaging?.offerValue
      ? AdmissionManagerApplicationPaging?.offerValue
      : 0
  );
  const [enrollLabel, setEnrollLabel] = useState(
    AdmissionManagerApplicationPaging?.enrollLabel
      ? AdmissionManagerApplicationPaging?.enrollLabel
      : "Enrolment Status"
  );
  const [enrollValue, setEnrollValue] = useState(
    AdmissionManagerApplicationPaging?.enrollValue
      ? AdmissionManagerApplicationPaging?.enrollValue
      : 0
  );
  const [intakeLabel, setIntakeLabel] = useState(
    AdmissionManagerApplicationPaging?.intakeLabel
      ? AdmissionManagerApplicationPaging?.intakeLabel
      : "Intake"
  );
  const [intakeValue, setIntakeValue] = useState(
    AdmissionManagerApplicationPaging?.intakeValue
      ? AdmissionManagerApplicationPaging?.intakeValue
      : 0
  );
  const [intakeRngLabel, setIntakeRngLabel] = useState(
    AdmissionManagerApplicationPaging?.intakeRngLabel
      ? AdmissionManagerApplicationPaging?.intakeRngLabel
      : "Intake Range"
  );
  const [intakeRngValue, setIntakeRngValue] = useState(
    intake
      ? intake
      : AdmissionManagerApplicationPaging?.intakeRngValue
      ? AdmissionManagerApplicationPaging?.intakeRngValue
      : 0
  );
  const [interviewLabel, setInterviewLabel] = useState(
    AdmissionManagerApplicationPaging?.intakeRngValue
      ? AdmissionManagerApplicationPaging?.intakeRngValue
      : "Interview"
  );
  const [interviewValue, setInterviewValue] = useState(
    AdmissionManagerApplicationPaging?.interviewValue
      ? AdmissionManagerApplicationPaging?.interviewValue
      : 0
  );
  const [elptLabel, setElptLabel] = useState(
    AdmissionManagerApplicationPaging?.elptLabel
      ? AdmissionManagerApplicationPaging?.elptLabel
      : "ELPT"
  );
  const [elptValue, setElptValue] = useState(
    AdmissionManagerApplicationPaging?.elptValue
      ? AdmissionManagerApplicationPaging?.elptValue
      : 0
  );
  const [financeLabel, setFinanceLabel] = useState(
    AdmissionManagerApplicationPaging?.financeLabel
      ? AdmissionManagerApplicationPaging?.financeLabel
      : "SLCs"
  );
  const [financeValue, setFinanceValue] = useState(
    AdmissionManagerApplicationPaging?.financeValue
      ? AdmissionManagerApplicationPaging?.financeValue
      : 0
  );

  const [percentageLabel, setPercentageLabel] = useState(
    AdmissionManagerApplicationPaging?.percentageLabel
      ? AdmissionManagerApplicationPaging?.percentageLabel
      : "Assesment percentage"
  );

  const [percentageValue, setPercentageValue] = useState(
    AdmissionManagerApplicationPaging?.percentageValue
      ? AdmissionManagerApplicationPaging?.percentageValue
      : 0
  );

  // application list
  const [applicationList, setApplicationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  // for hide/unhide column
  const [tableData, setTableData] = useState([]);

  // table column data get from localstorage or initial set
  useEffect(() => {
    const tableColumnAdmissionManager = JSON.parse(
      localStorage.getItem("ColumnApplicationManager")
    );
    tableColumnAdmissionManager && setTableData(tableColumnAdmissionManager);
    !tableColumnAdmissionManager &&
      localStorage.setItem(
        "ColumnApplicationManager",
        JSON.stringify(ColumnApplicationManager)
      );
    !tableColumnAdmissionManager && setTableData(ColumnApplicationManager);
  }, []);

  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  // set page states at sessionStorage for next time use
  useEffect(() => {
    sessionStorage.setItem(
      "admissionManagerApplication",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        managerUappIdLabel: managerUappIdLabel && managerUappIdLabel,
        managerUappIdValue: managerUappIdValue && managerUappIdValue,
        managerStdLabel: managerStdLabel && managerStdLabel,
        managerStdValue: managerStdValue && managerStdValue,
        // offerLabel: selector !== "2" && offerLabel && offerLabel,
        // offerValue: selector !== "2" && offerValue && offerValue,
        managerConsLabel: managerConsLabel && managerConsLabel,
        managerConsValue: managerConsValue && managerConsValue,
        applicationLabel: status > 0 && applicationLabel && applicationLabel,
        applicationValue: status > 0 && applicationValue && applicationValue,
        applicationSubLabel:
          selector > 0 && applicationSubLabel && applicationSubLabel,
        applicationSubValue:
          selector > 0 && applicationSubValue && applicationSubValue,
        // enrollLabel: selector !== "3" && enrollLabel && enrollLabel,
        // enrollValue: selector !== "3" && enrollValue && enrollValue,
        applicationId: applicationId && applicationId,
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
        managerUniLabel: managerUniLabel && managerUniLabel,
        managerUniValue: managerUniValue && managerUniValue,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        documentStatusLabel: documentStatusLabel && documentStatusLabel,
        documentStatusValue: documentStatusValue && documentStatusValue,
        percentageLabel: percentageLabel && percentageLabel,
        percentageValue: percentageValue && percentageValue,
      })
    );
  }, [
    currentPage,
    managerUappIdLabel,
    managerUappIdValue,
    managerStdLabel,
    managerStdValue,
    offerLabel,
    offerValue,
    managerConsLabel,
    managerConsValue,
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
    managerUniLabel,
    managerUniValue,
    dataPerPage,
    orderLabel,
    orderValue,
    selector,
    intake,
    applicationId,
    documentStatusLabel,
    documentStatusValue,
    percentageLabel,
    percentageValue,
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

  // for admission manager dropdown
  const managerUappIdMenu = managerUappIdDD.map((manager) => ({
    label: manager?.name,
    value: manager?.id,
  }));
  const managerStdMenu = managerStdDD.map((student) => ({
    label: student?.name,
    value: student?.id,
  }));
  const managerConsMenu = managerConsDD.map((consultant) => ({
    label: consultant?.name,
    value: consultant?.id,
  }));
  const managerUniMenu = managerUniDD.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));
  const managerPhnMenu = managerPhnDD.map((phone) => ({
    label: phone?.name,
    value: phone?.id,
  }));

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
  const selectUappId = (label, value) => {
    setmanagerUappIdLabel(label);
    setmanagerUappIdValue(value);
  };
  const selectManagerStd = (label, value) => {
    setManagerStdLabel(label);
    setManagerStdValue(value);
  };
  const selectManagerCons = (label, value) => {
    setManagerConsLabel(label);
    setManagerConsValue(value);
  };
  const selectUniMenu = (label, value) => {
    setManagerUniLabel(label);
    setManagerUniValue(value);
  };
  const selectManagerPhn = (label, value) => {
    setManagerPhnLabel(label);
    setManagerPhnValue(value);
  };

  // handle clear all search function
  const handleClearSearch = () => {
    setCurrentPage(1);
    !status && setApplicationLabel("Status");
    !status && setApplicationValue(0);
    !selector && setApplicationSubLabel("Sub Status");
    !selector && setApplicationSubValue(0);
    setOfferLabel("Offer");
    setOfferValue(0);
    setEnrollLabel("Enrolment Status");
    setEnrollValue(0);
    setIntakeRngLabel("Intake Range");
    setIntakeRngValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setmanagerUappIdLabel("UAPP ID");
    setmanagerUappIdValue(0);
    setManagerStdLabel("Name");
    setManagerStdValue(0);
    setManagerConsLabel("Consultant");
    setManagerConsValue(0);
    setManagerUniLabel("University Name");
    setManagerUniValue(0);
    setManagerPhnLabel("Phone No.");
    setManagerPhnValue(0);
    setdocumentStatusValue(0);
    setdocumentStatusLabel("Select Document Status");
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

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);

      if (intake) {
        const filterData = res.filter((status) => {
          return status.id.toString() === intake;
        });
        setIntakeRngLabel(filterData[0]?.name);
      }
    });

    get("ApplicationStatusDD/Index").then((res) => {
      setApplicationDD(res);
      if (status > 0) {
        const result = res?.find((ans) => ans?.id.toString() === status);
        setApplicationLabel(result?.name);
        setApplicationValue(res?.id);
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
    //   if (selector === "3") {
    //     const result = res?.find((ans) => ans?.id.toString() === status);
    //     setEnrollLabel(result?.name);
    //     setEnrollValue(res?.id);
    //   }
    // });

    get("IntakeDD/Index").then((res) => {
      setIntakeDD(res);
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

    // for admission manager
    if (currentUser !== undefined) {
      get(`CommonApplicationFilterDD/UappId`).then((res) => {
        setManagerUappIdDD(res);
      });
      get(`CommonApplicationFilterDD/Student`).then((res) => {
        setManagerStdDD(res);
      });
      get(`CommonApplicationFilterDD/Consultant`).then((res) => {
        setManagerConsDD(res);
        if (consultantId) {
          const result = res?.find(
            (ans) => ans?.id.toString() === consultantId
          );
          setManagerConsLabel(result?.name);
          setManagerConsValue(result?.id);
        }
      });
      get(`CommonApplicationFilterDD/University`).then((res) => {
        setManagerUniDD(res);
        if (universityId) {
          const result = res?.find(
            (ans) => ans?.id.toString() === universityId
          );
          setManagerUniLabel(result?.name);
          setManagerUniValue(result?.id);
        }
      });
      get(`CommonApplicationFilterDD/PhoneNumber`).then((res) => {
        setManagerPhoneDD(res);
      });
    }
  }, [consultantId, currentUser, intake, selector, status, universityId]);

  useEffect(() => {
    get(`ApplicationSubStatus/GetAll/${applicationValue}`).then((res) => {
      setApplicationSubDD(res);
      if (selector > 0) {
        const result = res?.filter((ans) => ans?.id.toString() === selector);
        setApplicationSubLabel(result[0]?.name);
      }
    });
  }, [applicationValue]);

  useEffect(() => {
    if (!isTyping) {
      if (currentUser !== undefined) {
        get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${managerUappIdValue}&studentId=${managerStdValue}&consultantId=${managerConsValue}&universityId=${managerUniValue}&uappPhoneId=${managerPhnValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}&percentage=${percentageValue}&appId=${applicationId}&applicationSubStatusId=${applicationSubValue}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);
          setEntity(res?.totalEntity);
          // setSerialNumber(res?.firstSerialNumber);
        });
      }
    }
  }, [
    currentUser,
    currentPage,
    dataPerPage,
    applicationValue,
    offerValue,
    enrollValue,
    intakeValue,
    interviewValue,
    elptValue,
    financeValue,
    orderValue,
    intake,
    success,
    managerUappIdValue,
    managerStdValue,
    managerConsValue,
    managerUniValue,
    managerPhnValue,
    universityId,
    consultantId,
    status,
    selector,
    intakeRngValue,
    documentStatusValue,
    percentageValue,
    applicationId,
    isTyping,
  ]);

  // Function for open delete modal
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

  // Function for delete application
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

  // table column data update localStorage for next time use
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationManager", JSON.stringify(values));
  };

  return (
    <>
      {/* BreadCrumb */}
      <BreadCrumb
        title="Applications"
        backTo={
          location.universityIdFromUniList !== undefined
            ? "University List"
            : location.consultantIdFromConsultantList !== undefined
            ? "Consultant List"
            : ""
        }
        path={
          location.universityIdFromUniList !== undefined
            ? "universityList"
            : location.consultantIdFromConsultantList !== undefined
            ? "consultantList"
            : "/"
        }
      />

      {/*Filter Dropdown Area starts here */}
      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={managerUappIdMenu}
                value={{ label: managerUappIdLabel, value: managerUappIdValue }}
                onChange={(opt) => selectUappId(opt.label, opt.value)}
                placeholder="UAPP ID"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={managerStdMenu}
                value={{ label: managerStdLabel, value: managerStdValue }}
                onChange={(opt) => selectManagerStd(opt.label, opt.value)}
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
            </Col> */}
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Typing
                // id="app"
                name="search"
                placeholder="Application Id"
                value={applicationId}
                setValue={setApplicationId}
                setIsTyping={setIsTyping}
              />
            </Col>
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
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={managerConsMenu}
                    value={{ label: managerConsLabel, value: managerConsValue }}
                    onChange={(opt) => selectManagerCons(opt.label, opt.value)}
                    placeholder="Consultant"
                    name="name"
                    id="id"
                    isDisabled={consultantId !== undefined ? true : false}
                  />
                </Col>
                {/* 
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
                  <Select
                    options={enrollMenu}
                    value={{ label: enrollLabel, value: enrollValue }}
                    onChange={(opt) => selectEnrollDD(opt.label, opt.value)}
                    placeholder="Enrolment st..."
                    name="name"
                    id="id"
                    isDisabled={selector > 0 ? true : false}
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
                    // isDisabled={intake ? true : false}
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
                    options={managerUniMenu}
                    value={{ label: managerUniLabel, value: managerUniValue }}
                    onChange={(opt) => selectUniMenu(opt.label, opt.value)}
                    placeholder="University N..."
                    name="name"
                    id="id"
                    isDisabled={universityId !== undefined ? true : false}
                  />
                </Col>

                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={managerPhnMenu}
                    value={{ label: managerPhnLabel, value: managerPhnValue }}
                    onChange={(opt) => selectManagerPhn(opt.label, opt.value)}
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
              </>
            ) : null}
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <ConditionForText
                  status={status}
                  selector={selector}
                  // branchId={branchId}
                  // branchLabel={branchLabel}
                  // setBranchLabel={setBranchLabel}
                  branchValue={0}
                  // setBranchValue={setBranchValue}
                  commonUappIdValue={managerUappIdValue}
                  commonStdValue={managerStdValue}
                  consultantValue={managerConsValue}
                  applicationValue={applicationValue}
                  offerValue={offerValue}
                  enrollValue={enrollValue}
                  intakeValue={intakeValue}
                  intakeRng={intake}
                  intakeRngValue={intakeRngValue}
                  interviewValue={interviewValue}
                  elptValue={elptValue}
                  financeValue={financeValue}
                  commonUniValue={managerUniValue}
                  commonUappIdLabel={managerUappIdLabel}
                  commonStdLabel={managerStdLabel}
                  consultantLabel={managerConsLabel}
                  applicationLabel={applicationLabel}
                  offerLabel={offerLabel}
                  enrollLabel={enrollLabel}
                  intakeLabel={intakeLabel}
                  intakeRngLabel={intakeRngLabel}
                  interviewLabel={interviewLabel}
                  elptLabel={elptLabel}
                  financeLabel={financeLabel}
                  commonUniLabel={managerUniLabel}
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
                  setCommonUappIdLabel={setmanagerUappIdLabel}
                  setCommonUappIdValue={setmanagerUappIdValue}
                  setCommonUniLabel={setManagerUniLabel}
                  setCommonUniValue={setManagerUniValue}
                  setConsultantLabel={setManagerConsLabel}
                  setConsultantValue={setManagerConsValue}
                  setCommonStdLabel={setManagerStdLabel}
                  setCommonStdValue={setManagerStdValue}
                  branchManagerValue={0}
                  admissionManagerValue={0}
                  proValue={0}
                  documentStatusValue={documentStatusValue}
                  setdocumentStatusValue={setdocumentStatusValue}
                  documentStatusLabel={documentStatusLabel}
                  setdocumentStatusLabel={setdocumentStatusLabel}
                  applicationSubValue={applicationSubValue}
                  applicationSubLabel={applicationSubLabel}
                  setApplicationSubLabel={setApplicationSubLabel}
                  setApplicationSubValue={setApplicationSubValue}
                  affiliateValue={0}
                  companionValue={0}
                ></ConditionForText>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {managerUappIdValue !== 0 ||
                  managerStdValue !== 0 ||
                  managerConsValue !== 0 ||
                  (!status && applicationValue !== 0) ||
                  (!selector && applicationSubValue !== 0) ||
                  // (selector !== "2" && offerValue !== 0) ||
                  // (selector !== "3" && enrollValue !== 0) ||
                  intakeValue !== 0 ||
                  intakeRngValue !== 0 ||
                  interviewValue !== 0 ||
                  elptValue !== 0 ||
                  financeValue !== 0 ||
                  documentStatusValue !== 0 ||
                  managerUniValue !== 0 ? (
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
            <Col lg="5" md="5" sm="12" xs="12" className="d-flex">
              <h5 className="text-orange fw-700">Total {entity} items</h5>
              <Download
                url={`Application/GetReport?page=${currentPage}&pagesize=${9999999}&uappStudentId=${managerUappIdValue}&studentId=${managerStdValue}&consultantId=${managerConsValue}&universityId=${managerUniValue}&uappPhoneId=${managerPhnValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}`}
                className="mx-2"
                fileName="Applications.xlsx"
              />
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
                <div className="mr-3 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div>
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
                    <div className="table-responsive mb-3" ref={componentRef}>
                      <Table
                        id="table-to-xls"
                        style={{ verticalAlign: "middle" }}
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
                              <th style={{ verticalAlign: "middle" }}>Offer</th>
                            ) : null}
                            {tableData[13]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Interview
                              </th>
                            ) : null}
                            {tableData[14]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>ELPT</th>
                            ) : null}
                            {tableData[15]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Enrolment Status
                              </th>
                            ) : null}
                            {tableData[16]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>SLCs</th>
                            ) : null}
                            {tableData[17]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Consultant
                              </th>
                            ) : null}
                            {tableData[18]?.isActive ? (
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
                                <td style={{ verticalAlign: "middle" }}>
                                  <Link
                                    className="text-id hover"
                                    to={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                  >
                                    {app?.applicationViewId}
                                  </Link>
                                </td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <Link
                                    className="text-id hover"
                                    to={`/studentProfile/${app?.studentId}`}
                                  >
                                    {app?.uappId}
                                  </Link>
                                </td>
                              ) : null}

                              {tableData[2]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <Link
                                    className="text-id hover"
                                    to={`/studentProfile/${app?.studentId}`}
                                  >
                                    {app?.studentName}
                                  </Link>
                                </td>
                              ) : null}

                              {tableData[3]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.studentPhone} <br />
                                  {app?.studentEmail}
                                </td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <Link
                                    className="text-id hover"
                                    to={`/universityDetails/${app?.universityId}`}
                                  >
                                    {app?.universityName}
                                  </Link>
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
                                  {app?.applicationStatusName}
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
                                  {app?.offerStatusName}
                                </td>
                              ) : null}

                              {tableData[13]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.interviewStatusName}
                                </td>
                              ) : null}

                              {tableData[14]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.elptStatusName}
                                </td>
                              ) : null}

                              {tableData[15]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.enrollmentStatusName}
                                </td>
                              ) : null}

                              {tableData[16]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.studentFinanceName}
                                </td>
                              ) : null}

                              {tableData[17]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.consultantName}
                                </td>
                              ) : null}

                              {tableData[18]?.isActive ? (
                                <td
                                  style={{
                                    width: "8%",
                                    verticalAlign: "middle",
                                  }}
                                  className="text-center"
                                >
                                  {/* Application Details page link Button */}
                                  <div className="d-flex">
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
                  )}
                </>
              )}
            </>
          )}
          {/* Table Data Showing Area end here*/}

          {/* Pagination */}
          <PaginationOnly
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      {/* Application Delete models  */}
      <ConfirmModal
        text="Are You Sure to Delete this ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        progress={progress}
      />

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
    </>
  );
};

export default AdmissionManagerApplication;
