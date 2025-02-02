/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import Download from "../../../../../components/buttons/Download.js";
import Filter from "../../../../../components/Dropdown/Filter.js";
import DateRange from "../../../../../components/form/DateRange.js";
import Typing from "../../../../../components/form/Typing.js";
import ConfirmModal from "../../../../../components/modal/ConfirmModal.js";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import { userTypes } from "../../../../../constants/userTypeConstant.js";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import LinkButton from "../../../Components/LinkButton.js";
import PaginationOnly from "../../../Pagination/PaginationOnly.jsx";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import Loader from "../../../Search/Loader/Loader";
import ColumnApplicationCommon from "../../../TableColumn/ColumnApplicationCommon.js";
import MessageHistoryCardApplicationDetailsPage from "../../ApplicationDetails/Component/RightSide/MessageHistoryCardApplicationDetailsPage.js";
import ConditionForText from "./ConditionForText.js";

const ApplicationsCommon = () => {
  const { addToast } = useToasts();
  const componentRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const parameters = history?.location?.state?.state;
  const {
    affiliateId,
    admId,
    adoId,
    branchId,
    consultantId,
    universityId,
    status,
    selector,
    intake,
    providerId,
    companionId,
    courseId,
  } = useParams();

  console.log(parameters);
  // Previous states get from session storage
  const application = JSON.parse(sessionStorage.getItem("application"));

  // permission get from localStorage
  const permissions = JSON?.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  const [currentPage, setCurrentPage] = useState(
    application?.currentPage ? application?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    application?.dataPerPage ? application?.dataPerPage : 15
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [orderLabel, setOrderLabel] = useState(
    application?.orderLabel ? application?.orderLabel : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    application?.orderValue ? application?.orderValue : 0
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
  const [affiliateDD, setAffiliateDD] = useState([]);
  const [companionDD, setCompanionDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);

  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState(
    application?.branchLabel ? application?.branchLabel : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    branchId
      ? branchId
      : application?.branchValue
      ? application?.branchValue
      : 0
  );

  // state for common
  const [commonUappIdDD, setCommonUappIdDD] = useState([]);
  const [commonUniDD, setCommonUniDD] = useState([]);
  const [consultantTypeDD, setConsultantTypeDD] = useState([]);
  const [commonConsultantDD, setCommonConsultantDD] = useState([]);
  const [commonStdDD, setCommonStdDD] = useState([]);

  const [applicationId, setApplicationId] = useState(
    application?.applicationId ? application?.applicationId : ""
  );

  const [commonUappIdLabel, setCommonUappIdLabel] = useState(
    application?.commonUappIdLabel ? application?.commonUappIdLabel : "UAPP ID"
  );
  const [commonUappIdValue, setCommonUappIdValue] = useState(
    application?.commonUappIdValue ? application?.commonUappIdValue : 0
  );
  const [commonUniLabel, setCommonUniLabel] = useState(
    application?.commonUniLabel
      ? application?.commonUniLabel
      : "University Name"
  );
  const [commonUniValue, setCommonUniValue] = useState(
    universityId
      ? universityId
      : application?.commonUniValue
      ? application?.commonUniValue
      : 0
  );
  const [consultantTypeLabel, setConsultantTypeLabel] = useState(
    application?.consultantTypeLabel
      ? application?.consultantTypeLabel
      : "Consultant Type"
  );
  const [consultantTypeValue, setConsultantTypeValue] = useState(
    parameters?.consultantTypeId
      ? parameters?.consultantTypeId
      : application?.consultantTypeValue
      ? application?.consultantTypeValue
      : 0
  );
  const [consultantLabel, setConsultantLabel] = useState(
    application?.consultantLabel ? application?.consultantLabel : "Consultant"
  );
  const [consultantValue, setConsultantValue] = useState(
    consultantId > 0
      ? consultantId
      : application?.consultantValue
      ? application?.consultantValue
      : 0
  );

  const [commonStdLabel, setCommonStdLabel] = useState(
    application?.commonStdLabel ? application?.commonStdLabel : "Name"
  );
  const [commonStdValue, setCommonStdValue] = useState(
    application?.commonStdValue ? application?.commonStdValue : 0
  );

  // state for all
  const [applicationLabel, setApplicationLabel] = useState(
    application?.applicationLabel ? application?.applicationLabel : "Status"
  );
  const [applicationValue, setApplicationValue] = useState(
    status > 0
      ? status
      : parameters?.applicationStatusId
      ? parameters?.applicationStatusId
      : application?.applicationValue
      ? application?.applicationValue
      : 0
  );
  const [applicationSubLabel, setApplicationSubLabel] = useState(
    application?.applicationSubLabel
      ? application?.applicationSubLabel
      : "Sub Status"
  );
  const [applicationSubValue, setApplicationSubValue] = useState(
    selector > 0
      ? selector
      : parameters?.applicationSubStatusId
      ? parameters?.applicationSubStatusId
      : application?.applicationSubValue
      ? application?.applicationSubValue
      : 0
  );
  const [offerLabel, setOfferLabel] = useState(
    application?.offerLabel ? application?.offerLabel : "Offer"
  );
  const [offerValue, setOfferValue] = useState(
    application?.offerValue ? application?.offerValue : 0
  );
  const [enrollLabel, setEnrollLabel] = useState(
    application?.enrollLabel ? application?.enrollLabel : "Enrolment Status"
  );
  const [enrollValue, setEnrollValue] = useState(
    application?.enrollValue ? application?.enrollValue : 0
  );

  const [intakeLabel, setIntakeLabel] = useState(
    application?.intakeLabel ? application?.intakeLabel : "Intake"
  );
  const [intakeValue, setIntakeValue] = useState(
    parameters?.intakeId
      ? parameters?.intakeId
      : application?.intakeValue
      ? application?.intakeValue
      : 0
  );
  const [intakeRngLabel, setIntakeRngLabel] = useState(
    application?.intakeRngLabel ? application?.intakeRngLabel : "Intake Range"
  );
  const [intakeRngValue, setIntakeRngValue] = useState(
    intake
      ? intake
      : parameters?.intakeRangeId
      ? parameters?.intakeRangeId
      : application?.intakeRngValue
      ? application?.intakeRngValue
      : 0
  );
  const [interviewLabel, setInterviewLabel] = useState(
    application?.interviewLabel ? application?.interviewLabel : "Interview"
  );
  const [interviewValue, setInterviewValue] = useState(
    application?.interviewValue ? application?.interviewValue : 0
  );
  const [elptLabel, setElptLabel] = useState(
    application?.elptLabel ? application?.elptLabel : "ELPT"
  );
  const [elptValue, setElptValue] = useState(
    application?.elptValue ? application?.elptValue : 0
  );
  const [affiliateLabel, setAffiliateLabel] = useState(
    application?.affiliateLabel ? application?.affiliateLabel : "Affiliate"
  );
  const [affiliateValue, setAffiliateValue] = useState(
    affiliateId ? affiliateId : 0
  );
  // const [affiliateValue, setAffiliateValue] = useState(
  //   application?.affiliateValue ? application?.affiliateValue : 0
  // );
  const [companionLabel, setCompanionLabel] = useState(
    application?.companionLabel ? application?.companionLabel : "Companion"
  );
  const [companionValue, setCompanionValue] = useState(
    companionId ? companionId : 0
  );
  const [financeLabel, setFinanceLabel] = useState(
    application?.financeLabel ? application?.financeLabel : "SLCs"
  );
  const [financeValue, setFinanceValue] = useState(
    application?.financeValue ? application?.financeValue : 0
  );
  const [branchManagerLabel, setBranchManagerLabel] = useState("Branch Admin");
  const [branchManagerValue, setBranchManagerValue] = useState(0);
  const [admissionManagerDD, setAdmissionManagerDD] = useState([]);
  const [admissionManagerLabel, setAdmissionManagerLabel] = useState(
    application?.admissionManagerLabel
      ? application?.admissionManagerLabel
      : "Admission Manager"
  );
  // const [admissionManagerValue, setAdmissionManagerValue] = useState(
  //   admId
  //     ? admId
  //     : application?.admissionManagerValue
  //     ? application?.admissionManagerValue
  //     : 0
  // );
  const [admissionManagerValue, setAdmissionManagerValue] = useState(
    admId ? admId : 0
  );
  const [admissionOfficerDD, setAdmissionOfficerDD] = useState([]);
  const [admissionOfficerLabel, setAdmissionOfficerLabel] = useState(
    application?.admissionManagerLabel
      ? application?.admissionManagerLabel
      : "Admission Officer"
  );

  const [admissionOfficerValue, setAdmissionOfficerValue] = useState(
    adoId ? adoId : 0
  );
  const [proLabel, setProLabel] = useState(
    application?.proLabel ? application?.proLabel : "Select Provider"
  );
  const [proValue, setProValue] = useState(
    providerId ? providerId : application?.proValue ? application?.proValue : 0
  );

  const [documentStatusLabel, setdocumentStatusLabel] = useState(
    application?.documentStatusLabel
      ? application?.documentStatusLabel
      : "Select Document Status"
  );
  const [documentStatusValue, setdocumentStatusValue] = useState(
    application?.documentStatusValue ? application?.documentStatusValue : 0
  );

  const [percentageLabel, setPercentageLabel] = useState(
    parameters?.percentage
      ? `${parameters?.percentage}%`
      : application?.percentageLabel
      ? application?.percentageLabel
      : "Assesment percentage"
  );
  const [percentageValue, setPercentageValue] = useState(
    parameters?.percentage
      ? parameters?.percentage
      : application?.percentageValue
      ? application?.percentageValue
      : 0
  );
  const [selectedDates, setSelectedDates] = useState(
    parameters?.fromApplicationDate && parameters?.toApplicationDate
      ? [parameters?.fromApplicationDate, parameters?.toApplicationDate]
      : application?.selectedDates
      ? application?.selectedDates
      : []
  );
  console.log("selectedDates: ", selectedDates);
  // state for  application list
  const [applicationList, setApplicationList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [providerDD, setProviderDD] = useState([]);
  const [isHide, setIsHide] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // table column data get from localstorage or initial set
  useEffect(() => {
    const tableColumnApplicationCommon = JSON.parse(
      localStorage.getItem("ColumnApplicationCommon")
    );
    tableColumnApplicationCommon && setTableData(tableColumnApplicationCommon);
    !tableColumnApplicationCommon &&
      localStorage.setItem(
        "ColumnApplicationCommon",
        JSON.stringify(ColumnApplicationCommon)
      );
    !tableColumnApplicationCommon && setTableData(ColumnApplicationCommon);
  }, []);

  // set page states at sessionStorage for next time use
  useEffect(() => {
    sessionStorage.setItem(
      "application",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        commonUappIdLabel: commonUappIdLabel && commonUappIdLabel,
        commonUappIdValue: commonUappIdValue && commonUappIdValue,
        commonStdLabel: commonStdLabel && commonStdLabel,
        commonStdValue: commonStdValue && commonStdValue,
        offerLabel: selector !== "2" && offerLabel && offerLabel,
        offerValue: selector !== "2" && offerValue && offerValue,
        applicationId: applicationId && applicationId,
        consultantTypeLabel: consultantTypeLabel && consultantTypeLabel,
        consultantTypeValue: consultantTypeValue && consultantTypeValue,
        consultantLabel: consultantLabel && consultantLabel,
        consultantValue: consultantValue && consultantValue,
        applicationLabel:
          selector !== "1" && applicationLabel && applicationLabel,
        applicationValue:
          selector !== "1" && applicationValue && applicationValue,
        applicationSubLabel: applicationSubLabel && applicationSubLabel,
        applicationSubValue: applicationSubValue && applicationSubValue,
        enrollLabel: selector !== "3" && enrollLabel && enrollLabel,
        enrollValue: selector !== "3" && enrollValue && enrollValue,
        intakeLabel: intakeLabel && intakeLabel,
        intakeValue: intakeValue && intakeValue,
        intakeRngLabel: !intake && intakeRngLabel && intakeRngLabel,
        intakeRngValue: !intake && intakeRngValue && intakeRngValue,
        interviewLabel: interviewLabel && interviewLabel,
        interviewValue: interviewValue && interviewValue,
        elptLabel: elptLabel && elptLabel,
        elptValue: elptValue && elptValue,
        affiliateLabel: !affiliateId && affiliateLabel && affiliateLabel,
        affiliateValue: !affiliateId && affiliateValue && affiliateValue,
        companionLabel: !companionId && companionLabel && companionLabel,
        companionValue: !companionId && companionValue && companionValue,
        financeLabel: financeLabel && financeLabel,
        financeValue: financeValue && financeValue,
        commonUniLabel: commonUniLabel && commonUniLabel,
        commonUniValue: commonUniValue && commonUniValue,
        proLabel: !providerId && proLabel && proLabel,
        proValue: !providerId && proValue && proValue,
        admissionManagerLabel:
          !admId && admissionManagerLabel && admissionManagerLabel,
        admissionManagerValue:
          !admId && admissionManagerValue && admissionManagerValue,
        admissionOfficerLabel:
          !adoId && admissionOfficerLabel && admissionOfficerLabel,
        admissionOfficerValue:
          !adoId && admissionOfficerValue && admissionOfficerValue,
        branchLabel: !branchId && branchLabel && branchLabel,
        branchValue: !branchId && branchValue && branchValue,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        documentStatusLabel: documentStatusLabel && documentStatusLabel,
        documentStatusValue: documentStatusValue && documentStatusValue,
        percentageLabel: percentageLabel && percentageLabel,
        percentageValue: percentageValue && percentageValue,
        selectedDates: selectedDates && selectedDates,
      })
    );
  }, [
    currentPage,
    commonUappIdLabel,
    commonUappIdValue,
    commonStdLabel,
    commonStdValue,
    offerLabel,
    offerValue,
    applicationId,
    consultantTypeLabel,
    consultantTypeValue,
    consultantLabel,
    consultantValue,
    applicationLabel,
    applicationValue,
    applicationSubLabel,
    applicationSubValue,
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
    affiliateValue,
    affiliateLabel,
    companionLabel,
    companionValue,
    financeLabel,
    financeValue,
    commonUniLabel,
    commonUniValue,
    proLabel,
    proValue,
    admissionManagerLabel,
    admissionManagerValue,
    admissionOfficerLabel,
    admissionOfficerValue,
    branchLabel,
    branchValue,
    dataPerPage,
    orderLabel,
    orderValue,
    selector,
    intake,
    providerId,
    companionId,
    affiliateId,
    admId,
    adoId,
    branchId,
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
  const affiliateMenu = affiliateDD.map((affiliate) => ({
    label: affiliate?.name,
    value: affiliate?.id,
  }));
  const companionMenu = companionDD.map((companion) => ({
    label: companion?.name,
    value: companion?.id,
  }));

  const admissionManagerMenu = admissionManagerDD.map((admissionManager) => ({
    label: admissionManager?.name,
    value: admissionManager?.id,
  }));

  const admissionOfficerMenu = admissionOfficerDD.map((admissionOfficer) => ({
    label: admissionOfficer?.name,
    value: admissionOfficer?.id,
  }));

  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));

  // for common
  const commonUappIdMenu = commonUappIdDD.map((UappId) => ({
    label: UappId?.name,
    value: UappId?.id,
  }));
  const commonUniMenu = commonUniDD.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));
  const commonConsultantMenu = commonConsultantDD.map((consultant) => ({
    label: consultant?.name,
    value: consultant?.id,
  }));
  const commonStdMenu = commonStdDD.map((student) => ({
    label: student?.name,
    value: student?.id,
  }));

  const providerMenu = providerDD?.map((provider) => ({
    label: provider?.name,
    value: provider?.id,
  }));

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
    setLoading(true);
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

  const selectAffiliateDD = (label, value) => {
    setAffiliateLabel(label);
    setAffiliateValue(value);
  };
  const selectCompanionDD = (label, value) => {
    setCompanionLabel(label);
    setCompanionValue(value);
  };

  const selectAdmissionManagerDD = (label, value) => {
    setAdmissionManagerLabel(label);
    setAdmissionManagerValue(value);
  };
  const selectAdmissionOfficerDD = (label, value) => {
    setAdmissionOfficerLabel(label);
    setAdmissionOfficerValue(value);
  };

  const selectProviders = (label, value) => {
    setProLabel(label);
    setProValue(value);
    setAdmissionManagerLabel("Admission Manager");
    setAdmissionManagerValue(0);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setAdmissionManagerDD(res);
    });
  };

  const selectFinanceDD = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };
  const selectUappIdDD = (label, value) => {
    setCommonUappIdLabel(label);
    setCommonUappIdValue(value);
  };
  const selectUniDD = (label, value) => {
    setCommonUniLabel(label);
    setCommonUniValue(value);
  };
  const selectConsultantDD = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };
  const selectStudentDD = (label, value) => {
    setCommonStdLabel(label);
    setCommonStdValue(value);
  };
  // Filter Dropdown data setState action function end here

  // Filter Dropdown data API calling
  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      if (branchId) {
        const result = res?.find((ans) => ans?.id.toString() === branchId);

        setBranchLabel(result?.name);
      }
    });

    get("ProviderDD/Index").then((res) => {
      setProviderDD(res);
      if (providerId) {
        const result = res?.find((ans) => ans?.id.toString() === providerId);
        setProLabel(result?.name);
      }
    });

    get(`AdmissionManagerDD/Index`).then((res) => {
      setAdmissionManagerDD(res);
      if (admId) {
        const result = res?.find((ans) => ans.id.toString() === admId);
        setAdmissionManagerLabel(result?.name);
      }
    });
    get(`AdmissionOfficerDD/Index`).then((res) => {
      setAdmissionOfficerDD(res);
      if (adoId) {
        const result = res?.find((ans) => ans.id.toString() === adoId);
        setAdmissionOfficerLabel(result?.name);
      }
    });

    get("ApplicationStatusDD/Index").then((res) => {
      setApplicationDD(res);
      if (status) {
        const result = res?.find((ans) => ans?.id.toString() === status);
        setApplicationLabel(result?.name);
      } else if (parameters?.applicationStatusId) {
        const result = res?.find(
          (ans) => ans?.id.toString() === parameters?.applicationStatusId
        );
        setApplicationLabel(result?.name);
      }
    });

    get("OfferStatusDD/Index").then((res) => {
      setOfferDD(res);
    });

    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
    });

    get("IntakeDD/Index").then((res) => {
      setIntakeDD(res);
      if (parameters?.intakeId) {
        const filterData = res.filter((status) => {
          return status.id === parameters?.intakeId;
        });
        setIntakeLabel(filterData[0]?.name);
      }
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

    get("InterviewStatusDD/Index").then((res) => {
      setInterviewDD(res);
    });

    get("ElptStatusDD/Index").then((res) => {
      setElptDD(res);
    });

    get("affiliateDD").then((res) => {
      setAffiliateDD(res);
      if (affiliateId) {
        const result = res?.find((ans) => ans.id.toString() === affiliateId);
        setAffiliateLabel(result?.name);
      }
    });
    get("companionDD").then((res) => {
      setCompanionDD(res);
      if (companionId) {
        const result = res?.find((ans) => ans.id.toString() === companionId);
        setCompanionLabel(result?.name);
      }
    });

    get("StudentFinanceStatusDD/Index").then((res) => {
      setFinanceDD(res);
    });
    // for common
    get("CommonApplicationFilterDD/UappId").then((res) => {
      setCommonUappIdDD(res);
    });
    get("CommonApplicationFilterDD/University").then((res) => {
      setCommonUniDD(res);
      if (universityId) {
        const result = res?.find((ans) => ans?.id.toString() === universityId);
        setCommonUniLabel(result?.name);
      }
    });

    get("CommonApplicationFilterDD/Consultant").then((res) => {
      setCommonConsultantDD(res);

      if (consultantId) {
        const result = res?.find((ans) => ans?.id.toString() === consultantId);
        setConsultantLabel(result?.name);
      }
    });
    get("CommonApplicationFilterDD/Student").then((res) => {
      setCommonStdDD(res);
    });
  }, [
    branchId,
    intake,
    consultantId,
    universityId,
    status,
    selector,
    affiliateId,
    companionId,
    admId,
    adoId,
    success,
    providerId,
    parameters,
  ]);

  useEffect(() => {
    get(`AdmissionManagerDD/Index/${proValue}`).then((res) => {
      setAdmissionManagerDD(res);

      if (admId) {
        const result = res?.find((ans) => ans.id.toString() === admId);
        setAdmissionManagerLabel(result?.name);
      }
    });
  }, [proValue, admId, success]);

  useEffect(() => {
    get(`ApplicationSubStatus/GetAll/${applicationValue}`).then((res) => {
      setApplicationSubDD(res);
      if (selector) {
        const result = res?.find((ans) => ans?.id.toString() === selector);
        result?.length > 0 && setApplicationSubLabel(result[0]?.name);
      } else if (parameters?.applicationSubStatusId) {
        const result = res?.find(
          (ans) => ans?.id.toString() === parameters?.applicationSubStatusId
        );
        result?.length > 0 && setApplicationSubLabel(result[0]?.name);
      }
    });
  }, [applicationValue, parameters]);

  useEffect(() => {
    get(`ConsultantTypeDD/Index`).then((res) => {
      setConsultantTypeDD(res);
      if (parameters?.consultantTypeId) {
        const filterData = res.filter((status) => {
          return status.id === parameters?.consultantTypeId;
        });
        setConsultantTypeLabel(filterData[0]?.name);
      }
    });
  }, [parameters]);

  // Api calling for Application List
  useEffect(() => {
    if (!isTyping) {
      setLoading(true);
      get(
        `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${branchValue}&intakerangeid=${intakeRngValue}&branchManagerId=${branchManagerValue}&admissionManagerId=${admissionManagerValue}&providerId=${proValue}&documentStatus=${documentStatusValue}&percentage=${
          percentageValue ? percentageValue : 0
        }&adoId=${admissionOfficerValue}&affiliateId=${affiliateValue}&companionId=${companionValue}&courseId=${
          courseId ? courseId : 0
        }&consultantTypeId=${consultantTypeValue}&fromApplicationDate=${
          selectedDates[0] ? selectedDates[0] : ""
        }&toApplicationDate=${
          selectedDates[1] ? selectedDates[1] : ""
        }&applicationSubStatusId=${applicationSubValue}`
      ).then((res) => {
        setLoading(false);
        setApplicationList(res?.models);
        setEntity(res?.totalEntity);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    applicationId,
    commonStdValue,
    commonUappIdValue,
    commonUniValue,
    consultantValue,
    applicationValue,
    offerValue,
    enrollValue,
    intakeValue,
    intakeRngValue,
    interviewValue,
    elptValue,
    affiliateValue,
    companionValue,
    financeValue,
    orderValue,
    success,
    consultantId,
    universityId,
    status,
    selector,
    branchValue,
    branchManagerValue,
    admissionManagerValue,
    admissionOfficerValue,
    proValue,
    documentStatusValue,
    isTyping,
    percentageValue,
    courseId,
    consultantTypeValue,
    selectedDates,
    applicationSubValue,
  ]);

  // Delete Button Click Action
  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  // Table Data dropdown
  const tableDataDD = () => {
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

  // Applications Delete function
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
    selector !== "1" && setApplicationLabel("Status");
    selector !== "1" && setApplicationValue(0);
    selector !== "2" && setOfferLabel("Offer");
    selector !== "2" && setOfferValue(0);
    selector !== "3" && setEnrollLabel("Enrolment Status");
    selector !== "3" && setEnrollValue(0);
    !intake && setIntakeRngLabel("Intake Range");
    !intake && setIntakeRngValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setCommonUappIdLabel("UAPP ID");
    setCommonUappIdValue(0);
    setCommonUniLabel("University Name");
    setCommonUniValue(0);
    setConsultantTypeLabel("Consultant Type");
    setConsultantTypeValue(0);
    !consultantId && setConsultantLabel("Consultant");
    !consultantId && setConsultantValue(0);
    setCommonStdLabel("Name");
    setCommonStdValue(0);
    setApplicationId("");
    !branchId && setBranchLabel("Select Branch");
    !branchId && setBranchValue(0);
    setBranchManagerLabel("Branch Admin");
    setBranchManagerValue(0);
    !providerId && setProLabel("Select Provider");
    !providerId && setProValue(0);
    !admId && setAdmissionManagerLabel("Admission Manager");
    !admId && setAdmissionManagerValue(0);
    !affiliateId && setAffiliateLabel("Affiliate");
    !affiliateId && setAffiliateValue(0);
    !companionId && setCompanionLabel("Companion");
    !companionId && setCompanionValue(0);
    !adoId && setAdmissionOfficerLabel("Admission Officer");
    !adoId && setAdmissionOfficerValue(0);
    setdocumentStatusValue(0);
    setdocumentStatusLabel("Select Document Status");
    setCurrentPage(1);
    // document.getElementById("app").placeholder = "Application Id";
    // document.getElementById("app").value = null;
  };

  // table column data update localStorage for next time use
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationCommon", JSON.stringify(values));
  };

  // Chat option open
  const [chatapp, setchatapp] = useState(null);
  const isChatOpen = () => {
    setChatOpen(!chatOpen);
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
            ? "/universityList"
            : location.consultantIdFromConsultantList !== undefined
            ? "/consultantList"
            : "/"
        }
      />

      {/*Filter Dropdown Area starts here */}
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={commonUappIdMenu}
                value={{ label: commonUappIdLabel, value: commonUappIdValue }}
                onChange={(opt) => selectUappIdDD(opt.label, opt.value)}
                placeholder="UAPP ID"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={commonStdMenu}
                value={{ label: commonStdLabel, value: commonStdValue }}
                onChange={(opt) => selectStudentDD(opt.label, opt.value)}
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
              />
            </Col> */}

            {/* 
            {userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                <Select
                  options={branchManagerMenu}
                  value={{
                    label: branchManagerLabel,
                    value: branchManagerValue,
                  }}
                  onChange={(opt) =>
                    selectBranchManagerDD(opt.label, opt.value)
                  }
                  name="name"
                  id="id"
                />
              </Col>
            ) : null} */}

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
                  <Filter
                    data={consultantTypeDD}
                    label={consultantTypeLabel}
                    setLabel={setConsultantTypeLabel}
                    value={consultantTypeValue}
                    setValue={setConsultantTypeValue}
                    action={() => {}}
                    className="mr-2"
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={commonConsultantMenu}
                    value={{ label: consultantLabel, value: consultantValue }}
                    onChange={(opt) => selectConsultantDD(opt.label, opt.value)}
                    placeholder="Consultant"
                    name="name"
                    id="id"
                    isDisabled={consultantId !== undefined ? true : false}
                  />
                </Col>

                {/* <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={enrollMenu}
                    value={{ label: enrollLabel, value: enrollValue }}
                    onChange={(opt) => selectEnrollDD(opt.label, opt.value)}
                    placeholder="Enrolment st..."
                    name="name"
                    id="id"
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
                    options={commonUniMenu}
                    value={{ label: commonUniLabel, value: commonUniValue }}
                    onChange={(opt) => selectUniDD(opt.label, opt.value)}
                    placeholder="University N..."
                    name="name"
                    id="id"
                    isDisabled={universityId !== undefined ? true : false}
                  />
                </Col>

                {userType !== userTypes?.AdmissionManager &&
                  userType !== userTypes?.ProviderAdmin &&
                  userType !== userTypes?.AdmissionOfficer && (
                    <>
                      {branch.length > 1 && (
                        <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                          <Filter
                            data={branch}
                            label={branchLabel}
                            setLabel={setBranchLabel}
                            value={branchValue}
                            setValue={setBranchValue}
                            action={() => {}}
                            isDisabled={branchId ? true : false}
                          />
                        </Col>
                      )}
                    </>
                  )}
                {userType === userTypes?.SystemAdmin ||
                userType === userTypes?.Admin ? (
                  <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                    <Select
                      options={providerMenu}
                      value={{ label: proLabel, value: proValue }}
                      onChange={(opt) => selectProviders(opt.label, opt.value)}
                      name="admissionmanagerId"
                      id="admissionmanagerId"
                      isDisabled={providerId ? true : false}
                    />
                  </Col>
                ) : null}

                {userType === userTypes?.SystemAdmin ||
                userType === userTypes?.Admin ||
                userType === userTypes?.ProviderAdmin ? (
                  <>
                    {" "}
                    <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                      <Select
                        options={admissionManagerMenu}
                        value={{
                          label: admissionManagerLabel,
                          value: admissionManagerValue,
                        }}
                        onChange={(opt) =>
                          selectAdmissionManagerDD(opt.label, opt.value)
                        }
                        name="name"
                        id="id"
                        isDisabled={admId ? true : false}
                      />
                    </Col>
                    <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                      <Select
                        options={admissionOfficerMenu}
                        value={{
                          label: admissionOfficerLabel,
                          value: admissionOfficerValue,
                        }}
                        onChange={(opt) =>
                          selectAdmissionOfficerDD(opt.label, opt.value)
                        }
                        name="name"
                        id="id"
                        isDisabled={adoId ? true : false}
                      />
                    </Col>
                  </>
                ) : null}

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
                  <Select
                    options={affiliateMenu}
                    value={{ label: affiliateLabel, value: affiliateValue }}
                    onChange={(opt) => selectAffiliateDD(opt.label, opt.value)}
                    placeholder="Affiliate"
                    name="name"
                    id="id"
                    isDisabled={affiliateId ? true : false}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={companionMenu}
                    value={{ label: companionLabel, value: companionValue }}
                    onChange={(opt) => selectCompanionDD(opt.label, opt.value)}
                    placeholder="companion"
                    name="name"
                    id="id"
                    isDisabled={companionId ? true : false}
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
                  selector={selector}
                  branchId={branchId}
                  branchLabel={branchLabel}
                  setBranchLabel={setBranchLabel}
                  branchValue={branchValue}
                  setBranchValue={setBranchValue}
                  providerId={providerId}
                  proLabel={proLabel}
                  setProLabel={setProLabel}
                  proValue={proValue}
                  setProValue={setProValue}
                  branchManagerLabel={branchManagerLabel}
                  setBranchManagerLabel={setBranchManagerLabel}
                  branchManagerValue={branchManagerValue}
                  setBranchManagerValue={setBranchManagerValue}
                  admissionManagerLabel={admissionManagerLabel}
                  setAdmissionManagerLabel={setAdmissionManagerLabel}
                  admissionManagerValue={admissionManagerValue}
                  setAdmissionManagerValue={setAdmissionManagerValue}
                  admId={admId}
                  affiliateLabel={affiliateLabel}
                  setAffiliateLabel={setAffiliateLabel}
                  affiliateValue={affiliateValue}
                  setAffiliateValue={setAffiliateValue}
                  affiliateId={affiliateId}
                  companionLabel={companionLabel}
                  setCompanionLabel={setCompanionLabel}
                  companionValue={companionValue}
                  setCompanionValue={setCompanionValue}
                  companionId={companionId}
                  commonUappIdValue={commonUappIdValue}
                  commonStdValue={commonStdValue}
                  consultantTypeValue={consultantTypeValue}
                  consultantValue={consultantValue}
                  applicationValue={applicationValue}
                  offerValue={offerValue}
                  enrollValue={enrollValue}
                  intakeValue={intakeValue}
                  intake={intake}
                  intakeRngValue={intakeRngValue}
                  interviewValue={interviewValue}
                  elptValue={elptValue}
                  financeValue={financeValue}
                  commonUniValue={commonUniValue}
                  commonUappIdLabel={commonUappIdLabel}
                  commonStdLabel={commonStdLabel}
                  consultantTypeLabel={consultantTypeLabel}
                  consultantLabel={consultantLabel}
                  applicationLabel={applicationLabel}
                  offerLabel={offerLabel}
                  enrollLabel={enrollLabel}
                  intakeLabel={intakeLabel}
                  intakeRngLabel={intakeRngLabel}
                  interviewLabel={interviewLabel}
                  elptLabel={elptLabel}
                  financeLabel={financeLabel}
                  commonUniLabel={commonUniLabel}
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
                  setCommonUappIdLabel={setCommonUappIdLabel}
                  setCommonUappIdValue={setCommonUappIdValue}
                  setCommonUniLabel={setCommonUniLabel}
                  setCommonUniValue={setCommonUniValue}
                  setConsultantTypeLabel={setConsultantTypeLabel}
                  setConsultantLabel={setConsultantLabel}
                  setConsultantTypeValue={setConsultantTypeValue}
                  setConsultantValue={setConsultantValue}
                  consultantId={consultantId}
                  setCommonStdLabel={setCommonStdLabel}
                  setCommonStdValue={setCommonStdValue}
                  setApplicationId={setApplicationId}
                  documentStatusLabel={documentStatusLabel}
                  setdocumentStatusLabel={setdocumentStatusLabel}
                  documentStatusValue={documentStatusValue}
                  setdocumentStatusValue={setdocumentStatusValue}
                  percentageLabel={percentageLabel}
                  setPercentageLabel={setPercentageLabel}
                  percentageValue={percentageValue}
                  setPercentageValue={setPercentageValue}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                ></ConditionForText>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {commonUappIdValue !== 0 ||
                  commonStdValue !== 0 ||
                  (selector !== "1" && applicationValue !== 0) ||
                  (selector !== "2" && offerValue !== 0) ||
                  (selector !== "3" && enrollValue !== 0) ||
                  intakeValue !== 0 ||
                  (!consultantId && consultantValue !== 0) ||
                  (!intake && intakeRngValue !== 0) ||
                  interviewValue !== 0 ||
                  elptValue !== 0 ||
                  financeValue !== 0 ||
                  (!branchId && branchValue !== 0) ||
                  commonUniValue !== 0 ||
                  branchManagerValue !== 0 ||
                  documentStatusValue !== 0 ||
                  (!providerId && proValue !== 0) ||
                  (!admId && admissionManagerValue !== 0) ||
                  (!affiliateId && affiliateValue !== 0) ||
                  (!adoId && admissionOfficerValue !== 0) ||
                  (!companionId && companionValue !== 0) ? (
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
          <Row className="mb-3 align-items-center">
            <Col lg="5" md="5" sm="12" xs="12" className="d-flex">
              <h5 className="text-orange fw-700">Total {entity} items</h5>
              <Download
                url={`Application/GetReport?page=${currentPage}&pagesize=${9999999}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${branchValue}&intakerangeid=${intakeRngValue}&branchManagerId=${branchManagerValue}&admissionManagerId=${admissionManagerValue}&providerId=${proValue}&documentStatus=${documentStatusValue}`}
                className="mx-2"
                fileName="Applications.xlsx"
              />
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
                    toggle={tableDataDD}
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
              {loading ? (
                <Loader />
              ) : (
                <>
                  {applicationList?.length === 0 ? (
                    <h4 className="text-center my-4">No Data Found</h4>
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
                          className="table-responsive fixedhead mb-3"
                          style={{ fontSize: "12px" }}
                          ref={componentRef}
                        >
                          <Table
                            id="table-to-xls"
                            style={{ verticalAlign: "middle" }}
                            className="table-sm table-bordered-application"
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
                                    Branch
                                  </th>
                                ) : null}
                                {tableData[5]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    University
                                  </th>
                                ) : null}
                                {tableData[6]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Campus
                                  </th>
                                ) : null}
                                {tableData[7]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Courses
                                  </th>
                                ) : null}
                                {tableData[8]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Intake
                                  </th>
                                ) : null}
                                {tableData[9]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Application Date
                                  </th>
                                ) : null}
                                {tableData[10]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Status
                                  </th>
                                ) : null}

                                {tableData[11]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Document Status
                                  </th>
                                ) : null}

                                {tableData[12]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Assessment
                                  </th>
                                ) : null}
                                {tableData[13]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Offer
                                  </th>
                                ) : null}
                                {tableData[14]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Interview
                                  </th>
                                ) : null}
                                {tableData[15]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Manager
                                  </th>
                                ) : null}
                                {tableData[16]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Enrolment Status
                                  </th>
                                ) : null}
                                {tableData[17]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    SLCs
                                  </th>
                                ) : null}

                                {tableData[18]?.isActive ? (
                                  <th style={{ verticalAlign: "middle" }}>
                                    Consultant
                                  </th>
                                ) : null}
                                {tableData[19]?.isActive ? (
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
                                      className="cursor-pointer hyperlink-hover"
                                      style={{ verticalAlign: "middle" }}
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
                                      <Link
                                        className="text-id hover"
                                        to={`/studentProfile/${app?.studentId}`}
                                      >
                                        {app?.uappId}
                                      </Link>
                                    </td>
                                  ) : null}

                                  {tableData[2]?.isActive ? (
                                    <td
                                      style={{ verticalAlign: "middle" }}
                                      className="cursor-pointer hyperlink-hover"
                                    >
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
                                      {app?.studentPhone && "+"}
                                      {app?.studentPhone} <br />
                                      {app?.studentEmail}
                                    </td>
                                  ) : null}
                                  {tableData[4]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.branchName}
                                    </td>
                                  ) : null}

                                  {tableData[5]?.isActive ? (
                                    <td
                                      style={{ verticalAlign: "middle" }}
                                      className="cursor-pointer hyperlink-hover"
                                    >
                                      <Link
                                        className="text-id hover"
                                        to={`/universityDetails/${app?.universityId}`}
                                      >
                                        {app?.universityName}
                                      </Link>
                                    </td>
                                  ) : null}

                                  {tableData[6]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.campusName}
                                    </td>
                                  ) : null}

                                  {tableData[7]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.subjectName}
                                    </td>
                                  ) : null}

                                  {tableData[8]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.intakeName}
                                    </td>
                                  ) : null}

                                  {tableData[9]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.createdOn}
                                    </td>
                                  ) : null}

                                  {tableData[10]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.applicationStatusName}
                                    </td>
                                  ) : null}

                                  {tableData[11]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.documentStatus}
                                    </td>
                                  ) : null}

                                  {tableData[12]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.assesmentPercentage}%
                                    </td>
                                  ) : null}

                                  {tableData[13]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.offerStatusName}
                                    </td>
                                  ) : null}

                                  {tableData[14]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.interviewStatusName}
                                    </td>
                                  ) : null}

                                  {tableData[15]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.managerName}
                                    </td>
                                  ) : null}

                                  {tableData[16]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.enrollmentStatusName}
                                    </td>
                                  ) : null}

                                  {tableData[17]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.studentFinanceName}
                                    </td>
                                  ) : null}

                                  {tableData[18]?.isActive ? (
                                    <td style={{ verticalAlign: "middle" }}>
                                      {app?.consultantName}
                                    </td>
                                  ) : null}

                                  {tableData[19]?.isActive ? (
                                    <td
                                      style={{ width: "8%" }}
                                      className="text-center my-auto"
                                    >
                                      <div>
                                        {/* Application Details page link Button */}
                                        {permissions?.includes(
                                          permissionList.View_Application_Details
                                        ) ? (
                                          <LinkButton
                                            url={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                            color="primary"
                                            className={"mx-1 btn-sm mt-2"}
                                            icon={
                                              <i className="fas fa-eye"></i>
                                            }
                                          />
                                        ) : null}

                                        {/* Chat Button */}
                                        <Button
                                          onClick={() => {
                                            setChatOpen(true);
                                            setchatapp(app);
                                          }}
                                          className="button-chat mx-1 btn-sm mt-2"
                                        >
                                          <i
                                            className="fas fa-comment"
                                            style={{
                                              paddingLeft: "1.8px",
                                              paddingRight: "1.8px",
                                            }}
                                          >
                                            <span className="badge-chat py-1 px-1">
                                              {app?.messageCount}
                                            </span>
                                          </i>
                                        </Button>
                                        {/* <ButtonForFunction
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
                                    /> */}

                                        {/* Delete Button */}
                                        {permissions.includes(
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

export default ApplicationsCommon;
