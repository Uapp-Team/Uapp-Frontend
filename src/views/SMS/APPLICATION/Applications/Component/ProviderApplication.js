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
import { useHistory, useLocation, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import LinkButton from "../../../Components/LinkButton.js";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import Filter from "../../../../../components/Dropdown/Filter.js";
import ConditionForText from "./ConditionForText.js";
import PaginationOnly from "../../../Pagination/PaginationOnly.jsx";
import { Link } from "react-router-dom";
import ColumnApplicationProvider from "../../../TableColumn/ColumnApplicationProvider.js";
import ConfirmModal from "../../../../../components/modal/ConfirmModal.js";

const ProviderApplication = ({ currentUser }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const componentRef = useRef();
  const { admId, consultantId, universityId, status, selector, intake } =
    useParams();

  // Previous states get from session storage
  const application = JSON.parse(sessionStorage.getItem("application"));

  // permission get from localStorage
  const permissions = JSON?.parse(localStorage.getItem("permissions"));
  const userId = localStorage.getItem("referenceId");

  const [currentPage, setCurrentPage] = useState(
    application?.currentPage ? application?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    application?.dataPerPage ? application?.dataPerPage : 15
  );
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
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);

  // all states for provider admin
  const [commonUappIdDD, setCommonUappIdDD] = useState([]);
  const [commonUappIdLabel, setCommonUappIdLabel] = useState(
    application?.commonUappIdLabel ? application?.commonUappIdLabel : "UAPP ID"
  );
  const [commonUappIdValue, setCommonUappIdValue] = useState(
    application?.commonUappIdValue ? application?.commonUappIdValue : 0
  );

  const [commonStdDD, setCommonStdDD] = useState([]);
  const [commonStdLabel, setCommonStdLabel] = useState(
    application?.commonStdLabel ? application?.commonStdLabel : "Name"
  );
  const [commonStdValue, setCommonStdValue] = useState(
    application?.commonStdValue ? application?.commonStdValue : 0
  );

  const [commonConsultantDD, setCommonConsultantDD] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState(
    application?.consultantLabel ? application?.consultantLabel : "Consultant"
  );
  const [consultantValue, setConsultantValue] = useState(
    consultantId
      ? consultantId
      : application?.consultantValue
      ? application?.consultantValue
      : 0
  );

  const [commonUniDD, setCommonUniDD] = useState([]);
  const [commonUniLabel, setCommonUniLabel] = useState(
    application?.commonUniLabel
      ? application?.commonUniLabel
      : "University Name"
  );
  const [commonUniValue, setCommonUniValue] = useState(
    application?.commonUniValue ? application?.commonUniValue : 0
  );

  const [providerPhoneDD, setProviderPhoneDD] = useState([]);
  const [providerPhoneLabel, setproviderPhoneLabel] = useState("Phone No.");
  const [providerPhoneValue, setproviderPhoneValue] = useState(0);

  // for all common
  const [applicationLabel, setApplicationLabel] = useState(
    application?.applicationLabel ? application?.applicationLabel : "Status"
  );
  const [applicationValue, setApplicationValue] = useState(
    selector === "1"
      ? status
      : application?.applicationValue
      ? application?.applicationValue
      : 0
  );
  const [offerLabel, setOfferLabel] = useState(
    application?.offerLabel ? application?.offerLabel : "Offer"
  );
  const [offerValue, setOfferValue] = useState(
    selector === "2"
      ? status
      : application?.offerValue
      ? application?.offerValue
      : 0
  );
  const [enrollLabel, setEnrollLabel] = useState(
    application?.enrollLabel ? application?.enrollLabel : "Enrolment Status"
  );
  const [enrollValue, setEnrollValue] = useState(
    selector === "3"
      ? status
      : application?.enrollValue
      ? application?.enrollValue
      : 0
  );
  const [intakeLabel, setIntakeLabel] = useState(
    application?.intakeLabel ? application?.intakeLabel : "Intake"
  );
  const [intakeValue, setIntakeValue] = useState(
    application?.intakeValue ? application?.intakeValue : 0
  );
  const [intakeRngLabel, setIntakeRngLabel] = useState(
    application?.intakeRngLabel ? application?.intakeRngLabel : "Intake Range"
  );
  const [intakeRngValue, setIntakeRngValue] = useState(
    intake
      ? intake
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

  const [documentStatusLabel, setdocumentStatusLabel] = useState(
    application?.documentStatusLabel
      ? application?.documentStatusLabel
      : "Select Document Status"
  );
  const [documentStatusValue, setdocumentStatusValue] = useState(
    application?.documentStatusValue ? application?.documentStatusValue : 0
  );

  const [financeLabel, setFinanceLabel] = useState(
    application?.financeLabel ? application?.financeLabel : "SLCs"
  );
  const [financeValue, setFinanceValue] = useState(
    application?.financeValue ? application?.financeValue : 0
  );
  const [admissionManagerDD, setAdmissionManagerDD] = useState([]);
  const [admissionManagerLabel, setAdmissionManagerLabel] = useState(
    application?.admissionManagerLabel
      ? application?.admissionManagerLabel
      : "Admission Manager"
  );
  const [admissionManagerValue, setAdmissionManagerValue] = useState(
    admId
      ? admId
      : application?.admissionManagerValue
      ? application?.admissionManagerValue
      : 0
  );

  // state for  application list
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
    const tableColumnApplicationProvider = JSON.parse(
      localStorage.getItem("ColumnApplicationProvider")
    );
    tableColumnApplicationProvider &&
      setTableData(tableColumnApplicationProvider);

    !tableColumnApplicationProvider &&
      localStorage.setItem(
        "ColumnApplicationProvider",
        JSON.stringify(ColumnApplicationProvider)
      );
    !tableColumnApplicationProvider && setTableData(ColumnApplicationProvider);
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
        // applicationId: applicationId && applicationId,
        consultantLabel: consultantLabel && consultantLabel,
        consultantValue: consultantValue && consultantValue,
        applicationLabel:
          selector !== "1" && applicationLabel && applicationLabel,
        applicationValue:
          selector !== "1" && applicationValue && applicationValue,
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
        financeLabel: financeLabel && financeLabel,
        financeValue: financeValue && financeValue,
        commonUniLabel: commonUniLabel && commonUniLabel,
        commonUniValue: commonUniValue && commonUniValue,
        // proLabel: !providerId && proLabel && proLabel,
        // proValue: !providerId && proValue && proValue,
        admissionManagerLabel:
          !admId && admissionManagerLabel && admissionManagerLabel,
        admissionManagerValue:
          !admId && admissionManagerValue && admissionManagerValue,
        // branchLabel: !branchId && branchLabel && branchLabel,
        // branchValue: !branchId && branchValue && branchValue,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
        documentStatusLabel: documentStatusLabel && documentStatusLabel,
        documentStatusValue: documentStatusValue && documentStatusValue,
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
    consultantLabel,
    consultantValue,
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
    commonUniLabel,
    commonUniValue,
    admissionManagerLabel,
    admissionManagerValue,
    dataPerPage,
    orderLabel,
    orderValue,
    selector,
    intake,
    admId,
    documentStatusLabel,
    documentStatusValue,
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

  // for provide admin dropdown
  const providerUappIdMenu = commonUappIdDD.map((uappId) => ({
    label: uappId?.name,
    value: uappId?.id,
  }));
  const providerStdMenu = commonStdDD.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));
  const providerConsMenu = commonConsultantDD.map((consultant) => ({
    label: consultant?.name,
    value: consultant?.id,
  }));
  const providerUniMenu = commonUniDD.map((university) => ({
    label: university?.name,
    value: university?.id,
  }));
  const providerPhoneMenu = providerPhoneDD.map((phone) => ({
    label: phone?.name,
    value: phone?.id,
  }));

  const admissionManagerMenu = admissionManagerDD.map((admissionManager) => ({
    label: admissionManager?.name,
    value: admissionManager?.id,
  }));

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
  const selectFinanceDD = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };

  const selectUappId = (label, value) => {
    setCommonUappIdLabel(label);
    setCommonUappIdValue(value);
  };

  const selectProviderStd = (label, value) => {
    setCommonStdLabel(label);
    setCommonStdValue(value);
  };

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const selectProviderUni = (label, value) => {
    setCommonUniLabel(label);
    setCommonUniValue(value);
  };

  const selectProviderPhone = (label, value) => {
    setproviderPhoneLabel(label);
    setproviderPhoneValue(value);
  };

  const selectAdmissionManagerDD = (label, value) => {
    setAdmissionManagerLabel(label);
    setAdmissionManagerValue(value);
  };
  // Filter Dropdown data setState action function end here

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
    setCommonStdLabel("Name");
    setCommonStdValue(0);
    setConsultantLabel("Consultant");
    setConsultantValue(0);
    setCommonUniLabel("University Name");
    setCommonUniValue(0);
    setproviderPhoneLabel("Phone No.");
    setproviderPhoneValue(0);
    setCurrentPage(1);
    !admId && setAdmissionManagerLabel("Admission Manager");
    !admId && setAdmissionManagerValue(0);
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

  // Filter Dropdown data API calling
  useEffect(() => {
    get("ApplicationStatusDD/Index").then((res) => {
      setApplicationDD(res);
      if (selector === "1") {
        const ans = res?.find((a) => a?.id.toString() === status);

        setApplicationLabel(ans?.name);
        setApplicationValue(ans?.id);
      }
    });

    get(`AdmissionManagerDD/Index/${userId}`).then((res) => {
      setAdmissionManagerDD(res);
      if (admId) {
        const result = res?.find((ans) => ans.id.toString() === admId);
        setAdmissionManagerLabel(result?.name);
      }
      console.log(res, "Admission Manager");
    });

    get("OfferStatusDD/Index").then((res) => {
      setOfferDD(res);
      if (selector === "2") {
        const ans = res?.find((a) => a?.id.toString() === status);

        setOfferLabel(ans?.name);
        setOfferValue(ans?.id);
      }
    });

    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
      if (selector === "3") {
        const ans = res?.find((a) => a?.id.toString() === status);

        setEnrollLabel(ans?.name);
        setEnrollValue(ans?.id);
      }
    });

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

    // for provider admin
    get(`CommonApplicationFilterDD/UappId`).then((res) => {
      setCommonUappIdDD(res);
    });
    get(`CommonApplicationFilterDD/Student`).then((res) => {
      setCommonStdDD(res);
    });
    get(`CommonApplicationFilterDD/Consultant`).then((res) => {
      setCommonConsultantDD(res);
      if (consultantId) {
        const result = res?.find((ans) => ans?.id.toString() === consultantId);
        setConsultantLabel(result?.name);
        setConsultantValue(res?.id);
      }
    });
    get(`CommonApplicationFilterDD/University`).then((res) => {
      setCommonUniDD(res);
      if (universityId) {
        const result = res?.find((ans) => ans?.id.toString() === universityId);
        setCommonUniLabel(result?.name);
        setCommonUniValue(res?.id);
      }
    });
    get(`CommonApplicationFilterDD/PhoneNumber`).then((res) => {
      setProviderPhoneDD(res);
    });

    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);

      if (intake) {
        const filterData = res.filter((status) => {
          return status.id.toString() === intake;
        });
        setIntakeRngLabel(filterData[0]?.name);
      }
    });
  }, [admId, consultantId, intake, selector, status, universityId, userId]);

  // Api calling for Application List
  useEffect(() => {
    if (currentUser !== undefined) {
      if (consultantId !== undefined) {
        get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantId}universityId=${commonUniValue}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);
          setCurrentPage(1);
          setConsultantLabel(res.models[0]?.consultantName);
          setConsultantValue(consultantId);
          setEntity(res?.totalEntity);
          // setSerialNumber(res?.firstSerialNumber);
        });
      } else if (universityId !== undefined) {
        get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${universityId}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);
          setCurrentPage(1);
          setCommonUniLabel(res.models[0]?.universityName);
          setCommonUniValue(universityId);
          setEntity(res?.totalEntity);
          // setSerialNumber(res?.firstSerialNumber);
        });
      } else {
        get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&uappPhoneId=${providerPhoneValue}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&intakerangeid=${intakeRngValue}&documentStatus=${documentStatusValue}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);
          setEntity(res?.totalEntity);
          // setSerialNumber(res?.firstSerialNumber);
          setCurrentPage(1);
        });
      }
    }
  }, [
    applicationValue,
    commonStdValue,
    commonUappIdValue,
    commonUniValue,
    consultantId,
    consultantValue,
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
    providerPhoneValue,
    universityId,
    documentStatusValue,
  ]);

  // Delete Button Click Action
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

  // table column data update localStorage for next time use
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationAssociate", JSON.stringify(values));
  };

  return (
    <>
      {/* BreadCrumb */}
      <BreadCrumb
        title="Applications"
        backTo={
          location.universityIdFromUniList !== undefined
            ? " University"
            : location.consultantIdFromConsultantList !== undefined
            ? "Consultant"
            : ""
        }
        path={
          location.universityIdFromUniList !== undefined
            ? "/universityList"
            : location.consultantIdFromConsultantList !== undefined
            ? "/consultantList"
            : ""
        }
      />

      {/*Filter Dropdown Area starts here */}
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerUappIdMenu}
                value={{
                  label: commonUappIdLabel,
                  value: commonUappIdValue,
                }}
                onChange={(opt) => selectUappId(opt.label, opt.value)}
                placeholder="UAPP ID"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={providerStdMenu}
                value={{ label: commonStdLabel, value: commonStdValue }}
                onChange={(opt) => selectProviderStd(opt.label, opt.value)}
                placeholder="Name"
                name="name"
                id="id"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={offerMenu}
                value={{ label: offerLabel, value: offerValue }}
                onChange={(opt) => selectOfferDD(opt.label, opt.value)}
                placeholder="Offer"
                name="name"
                id="id"
                isDisabled={selector === "2" ? true : false}
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
                {" "}
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={providerConsMenu}
                    value={{
                      label: consultantLabel,
                      value: consultantValue,
                    }}
                    onChange={(opt) => selectConsultant(opt.label, opt.value)}
                    placeholder="Consultant"
                    name="name"
                    id="id"
                    // isDisabled={
                    //   location.consultantIdFromConsultantList ? true : false
                    // }
                    isDisabled={consultantId !== undefined ? true : false}
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
                    isDisabled={selector === "1" ? true : false}
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
                    isDisabled={selector === "3" ? true : false}
                  />
                </Col>
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
                    options={providerUniMenu}
                    value={{ label: commonUniLabel, value: commonUniValue }}
                    onChange={(opt) => selectProviderUni(opt.label, opt.value)}
                    placeholder="University N..."
                    name="name"
                    id="id"
                    // isDisabled={location.universityIdFromUniList ? true : false}
                    isDisabled={universityId !== undefined ? true : false}
                  />
                </Col>
                <Col lg="2" md="3" sm="6" xs="6" className="p-2">
                  <Select
                    options={providerPhoneMenu}
                    value={{
                      label: providerPhoneLabel,
                      value: providerPhoneValue,
                    }}
                    onChange={(opt) =>
                      selectProviderPhone(opt.label, opt.value)
                    }
                    placeholder="Phone No."
                    name="name"
                    id="id"
                  />
                </Col>
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
              </>
            ) : null}
          </Row>

          {/* <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >

                 <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>
              </div>
            </Col>
          </Row>  */}

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <ConditionForText
                  selector={selector}
                  proValue={0}
                  // branchLabel={branchLabel}
                  // setBranchLabel={setBranchLabel}
                  branchValue={0}
                  // setBranchValue={setBranchValue}
                  commonUappIdValue={commonUappIdValue}
                  commonStdValue={commonStdValue}
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
                  setConsultantLabel={setConsultantLabel}
                  setConsultantValue={setConsultantValue}
                  setCommonStdLabel={setCommonStdLabel}
                  setCommonStdValue={setCommonStdValue}
                  branchManagerValue={0}
                  admissionManagerLabel={admissionManagerLabel}
                  setAdmissionManagerLabel={setAdmissionManagerLabel}
                  admissionManagerValue={admissionManagerValue}
                  setAdmissionManagerValue={setAdmissionManagerValue}
                  admId={admId}
                  documentStatusLabel={documentStatusLabel}
                  setdocumentStatusLabel={setdocumentStatusLabel}
                  documentStatusValue={documentStatusValue}
                  setdocumentStatusValue={setdocumentStatusValue}
                ></ConditionForText>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {commonUappIdValue !== 0 ||
                  commonStdValue !== 0 ||
                  consultantValue !== 0 ||
                  applicationValue !== 0 ||
                  offerValue !== 0 ||
                  (selector !== "3" && enrollValue !== 0) ||
                  intakeValue !== 0 ||
                  (!intake && intakeRngValue !== 0) ||
                  interviewValue !== 0 ||
                  elptValue !== 0 ||
                  financeValue !== 0 ||
                  commonUniValue !== 0 ||
                  documentStatusValue !== 0 ||
                  (!admId && admissionManagerValue !== 0) ? (
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
                  {" "}
                  {loading ? (
                    <div className="d-flex justify-content-center mb-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="table-responsive fixedhead mb-3"
                      ref={componentRef}
                    >
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
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="hyperlink-hover cursor-pointer"
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
                                  {app?.studentPhone} <br />
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
                                  style={{ width: "8%" }}
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

export default ProviderApplication;
