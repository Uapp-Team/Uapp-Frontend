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
import Pagination from "../../../../Pagination/Pagination.jsx";

import ReactTableConvertToXl from "../../../../ReactTableConvertToXl/ReactTableConvertToXl.js";
import ReactToPrint from "react-to-print";
import ConditionForText from "./ConditionForText.js";
import Branch from "../../../../../../components/Dropdown/Filter.js";

import get from "../../../../../../helpers/get.js";
import { tableIdList } from "../../../../../../constants/TableIdConstant.js";
import remove from "../../../../../../helpers/remove.js";
import put from "../../../../../../helpers/put.js";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb.js";
import { userTypes } from "../../../../../../constants/userTypeConstant.js";
import { permissionList } from "../../../../../../constants/AuthorizationConstant.js";
import ButtonForFunction from "../../../../Components/ButtonForFunction.js";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal.js";
import LinkButton from "../../../../Components/LinkButton.js";
import MessageHistoryCardApplicationDetailsPage from "../../../../APPLICATION/ApplicationDetails/Component/RightSide/MessageHistoryCardApplicationDetailsPage.js";

const ApplicationsCommon = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [chatOpen, setChatOpen] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [orderLabel, setOrderLabel] = useState("Order By");
  const [orderValue, setOrderValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [applicationDD, setApplicationDD] = useState([]);
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);

  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);

  // for common
  const [commonUappIdDD, setCommonUappIdDD] = useState([]);
  const [commonUniDD, setCommonUniDD] = useState([]);
  const [commonConsultantDD, setCommonConsultantDD] = useState([]);
  const [commonStdDD, setCommonStdDD] = useState([]);

  const [applicationId, setApplicationId] = useState("");

  // for common
  const [commonUappIdLabel, setCommonUappIdLabel] = useState("UAPP ID");
  const [commonUappIdValue, setCommonUappIdValue] = useState(0);
  const [commonUniLabel, setCommonUniLabel] = useState("University Name");
  const [commonUniValue, setCommonUniValue] = useState(0);
  const [consultantLabel, setConsultantLabel] = useState("Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [commonStdLabel, setCommonStdLabel] = useState("Name");
  const [commonStdValue, setCommonStdValue] = useState(0);

  // for all
  const [applicationLabel, setApplicationLabel] = useState("Status");
  const [applicationValue, setApplicationValue] = useState(0);
  const [offerLabel, setOfferLabel] = useState("Offer");
  const [offerValue, setOfferValue] = useState(0);
  const [enrollLabel, setEnrollLabel] = useState("Enrolment Status");
  const [enrollValue, setEnrollValue] = useState(0);
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [interviewLabel, setInterviewLabel] = useState("Interview");
  const [interviewValue, setInterviewValue] = useState(0);
  const [elptLabel, setElptLabel] = useState("ELPT");
  const [elptValue, setElptValue] = useState(0);
  const [financeLabel, setFinanceLabel] = useState("SLCs");
  const [financeValue, setFinanceValue] = useState(0);

  // application list
  const [applicationList, setApplicationList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  // for hide/unhide column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const { consultantId, universityId, status, selector, id } = useParams();
  console.log(id, "fsfdsf");

  const permissions = JSON?.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

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
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    // setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const selectAppliDD = (label, value) => {
    // setLoading(true);
    setApplicationLabel(label);
    setApplicationValue(value);
    // handleSearch();
  };
  const selectOfferDD = (label, value) => {
    // setLoading(true);
    setOfferLabel(label);
    setOfferValue(value);
    // handleSearch();
  };
  const selectEnrollDD = (label, value) => {
    // setLoading(true);
    setEnrollLabel(label);
    setEnrollValue(value);
    // handleSearch();
  };
  const selectIntakeDD = (label, value) => {
    // setLoading(true);
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };
  const selectInterviewDD = (label, value) => {
    // setLoading(true);
    setInterviewLabel(label);
    setInterviewValue(value);
    // handleSearch();
  };
  const selectElptDD = (label, value) => {
    // setLoading(true);
    setElptLabel(label);
    setElptValue(value);
    // handleSearch();
  };
  const selectFinanceDD = (label, value) => {
    // setLoading(true);
    setFinanceLabel(label);
    setFinanceValue(value);
    // handleSearch();
  };
  const selectUappIdDD = (label, value) => {
    // setLoading(true);
    setCommonUappIdLabel(label);
    setCommonUappIdValue(value);
    // handleSearch();
  };
  const selectUniDD = (label, value) => {
    // setLoading(true);
    setCommonUniLabel(label);
    setCommonUniValue(value);
    // handleSearch();
  };
  const selectConsultantDD = (label, value) => {
    // setLoading(true);
    setConsultantLabel(label);
    setConsultantValue(value);
    // handleSearch();
  };
  const selectStudentDD = (label, value) => {
    // setLoading(true);
    setCommonStdLabel(label);
    setCommonStdValue(value);
    // handleSearch();
  };

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      if (id) {
        const result = res?.find((ans) => ans?.id == id);
        setBranchLabel(result?.name);
      }
      setBranch(res);
    });

    get("ApplicationStatusDD/Index").then((res) => {
      setApplicationDD(res);

      if (selector == 1) {
        const result = res?.find((ans) => ans?.id == status);

        setApplicationLabel(result?.name);
      }
    });

    get("OfferStatusDD/Index").then((res) => {
      setOfferDD(res);
      if (selector == 2) {
        const result = res?.find((ans) => ans?.id == status);

        setOfferLabel(result?.name);
      }
    });

    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
      if (selector == 3) {
        const result = res?.find((ans) => ans?.id == status);

        setEnrollLabel(result?.name);
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
    // for common
    get("CommonApplicationFilterDD/UappId").then((res) => {
      setCommonUappIdDD(res);
    });
    get("CommonApplicationFilterDD/University").then((res) => {
      setCommonUniDD(res);
      const result = res?.find((ans) => ans?.id == universityId);
      if (universityId) {
        setCommonUniLabel(result?.name);
      }
    });
    get("CommonApplicationFilterDD/Consultant").then((res) => {
      setCommonConsultantDD(res);

      if (consultantId) {
        const result = res?.find((ans) => ans?.id == consultantId);
        setConsultantLabel(result?.name);
      }
    });
    get("CommonApplicationFilterDD/Student").then((res) => {
      setCommonStdDD(res);
    });

    consultantId !== undefined
      ? get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantId}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        })
      : universityId !== undefined
      ? get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${universityId}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        })
      : selector == 1
      ? get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${status}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        })
      : selector == 2
      ? get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${status}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        })
      : selector == 3
      ? get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${status}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        })
      : get(
          `Application/GetPaginated?page=${currentPage}&pagesize=${dataPerPage}&uappStudentId=${commonUappIdValue}&studentId=${commonStdValue}&consultantId=${consultantValue}&universityId=${commonUniValue}&appId=${applicationId}&applicationStatusId=${applicationValue}&offerStatusId=${offerValue}&enrollmentId=${enrollValue}&intakeId=${intakeValue}&interviewId=${interviewValue}&elptId=${elptValue}&studentFinanceId=${financeValue}&orderId=${orderValue}&branchid=${id}`
        ).then((res) => {
          setLoading(false);
          setApplicationList(res?.models);

          setEntity(res?.totalEntity);
        });

    get(`TableDefination/Index/${tableIdList?.Application_List}`).then(
      (res) => {
        setTableData(res);
      }
    );
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
    interviewValue,
    elptValue,
    financeValue,
    orderValue,
    success,
    consultantId,
    universityId,
    status,
    selector,
    branchValue,
    id,
  ]);

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
    setCallApi((prev) => !prev);
  };

  const componentRef = useRef();

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

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

  // on clear
  const handleClearSearch = () => {
    setApplicationLabel("Status");
    setApplicationValue(0);
    setOfferLabel("Offer");
    setOfferValue(0);
    setEnrollLabel("Enrolment Status");
    setEnrollValue(0);
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
    setConsultantLabel("Consultant");
    setConsultantValue(0);
    setCommonStdLabel("Name");
    setCommonStdValue(0);
    setApplicationId("");
    !id && setBranchLabel("Select Branch");
    !id && setBranchValue(0);
    document.getElementById("app").placeholder = "Application Id";
    document.getElementById("app").value = null;
    setCurrentPage(1);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    // setCheckSlNo(e.target.checked);
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Application_List}/${columnId}`
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

  const [chatapp, setchatapp] = useState(null);

  const isChatOpen = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div>
      <BreadCrumb
        title="Applications"
        backTo={
          location.universityIdFromUniList != undefined
            ? "University List"
            : location.consultantIdFromConsultantList != undefined
            ? "Consultant List"
            : ""
        }
        path={
          location.universityIdFromUniList != undefined
            ? "/universityList"
            : location.consultantIdFromConsultantList != undefined
            ? "/consultantList"
            : "/"
        }
      />

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="gy-3">
            {userType === userTypes?.Student.toString() ? null : (
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
            )}

            {userType === userTypes?.Student.toString() ? null : (
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
            )}

            {userType === userTypes?.Student.toString() ? null : (
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
            )}

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Select
                options={applicationMenu}
                value={{ label: applicationLabel, value: applicationValue }}
                onChange={(opt) => selectAppliDD(opt.label, opt.value)}
                placeholder="Status"
                name="name"
                id="id"
                isDisabled={selector == 1 ? true : false}
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
                isDisabled={selector == 2 ? true : false}
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
                isDisabled={selector == 3 ? true : false}
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
                        isDisabled={id ? true : false}
                      />
                    </Col>
                  )}
                </>
              )}

            <Col lg="2" md="3" sm="6" xs="6" className="p-2">
              <Input
                style={{ height: "38px" }}
                placeholder="Application Id"
                type="text"
                id="app"
                onChange={(e) => setApplicationId(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <ConditionForText
                  branchLabel={branchLabel}
                  setBranchLabel={setBranchLabel}
                  branchValue={branchValue}
                  setBranchValue={setBranchValue}
                  commonUappIdValue={commonUappIdValue}
                  commonStdValue={commonStdValue}
                  consultantValue={consultantValue}
                  applicationValue={applicationValue}
                  offerValue={offerValue}
                  enrollValue={enrollValue}
                  intakeValue={intakeValue}
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
                  setApplicationId={setApplicationId}
                ></ConditionForText>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {commonUappIdValue !== 0 ||
                  commonStdValue !== 0 ||
                  consultantValue !== 0 ||
                  applicationValue !== 0 ||
                  offerValue !== 0 ||
                  enrollValue !== 0 ||
                  intakeValue !== 0 ||
                  interviewValue !== 0 ||
                  elptValue !== 0 ||
                  financeValue !== 0 ||
                  branchValue !== 0 ||
                  commonUniValue !== 0 ? (
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
            <Col lg="5" md="5" sm="12" xs="12"></Col>

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
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {permissions?.includes(permissionList.View_Application_List) && (
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
                          <th style={{ verticalAlign: "middle" }}>APP ID</th>
                        ) : null}
                        {tableData[1]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>UAPP ID</th>
                        ) : null}
                        {tableData[2]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Applicant</th>
                        ) : null}
                        {tableData[3]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Contact</th>
                        ) : null}
                        {tableData[4]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Branch</th>
                        ) : null}
                        {tableData[5]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>
                            University
                          </th>
                        ) : null}
                        {tableData[6]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Campus</th>
                        ) : null}
                        {tableData[7]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Courses</th>
                        ) : null}
                        {tableData[8]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Intake</th>
                        ) : null}
                        {tableData[9]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>
                            Application Date
                          </th>
                        ) : null}
                        {tableData[10]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Status</th>
                        ) : null}
                        {tableData[11]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Offer</th>
                        ) : null}
                        {tableData[12]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Interview</th>
                        ) : null}
                        {tableData[13]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>Manager</th>
                        ) : null}
                        {tableData[14]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>
                            Enrolment Status
                          </th>
                        ) : null}
                        {tableData[15]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>SLCs</th>
                        ) : null}

                        {tableData[16]?.isActive ? (
                          <th style={{ verticalAlign: "middle" }}>
                            Consultant
                          </th>
                        ) : null}
                        {tableData[17]?.isActive ? (
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
                              <span
                                onClick={() => {
                                  history.push(
                                    `/applicationDetails/${app?.id}/${app?.studentId}`
                                  );
                                }}
                              >
                                {app?.applicationViewId}
                              </span>
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
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.branchName}
                            </td>
                          ) : null}

                          {tableData[5]?.isActive ? (
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
                              {app?.offerStatusName}
                            </td>
                          ) : null}

                          {tableData[12]?.isActive ? (
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.interviewStatusName}
                            </td>
                          ) : null}

                          {tableData[13]?.isActive ? (
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.managerName}
                            </td>
                          ) : null}

                          {tableData[14]?.isActive ? (
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.enrollmentStatusName}
                            </td>
                          ) : null}

                          {tableData[15]?.isActive ? (
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.studentFinanceName}
                            </td>
                          ) : null}

                          {tableData[16]?.isActive ? (
                            <td style={{ verticalAlign: "middle" }}>
                              {app?.consultantName}
                            </td>
                          ) : null}

                          {tableData[17]?.isActive ? (
                            <td
                              style={{ width: "8%" }}
                              className="text-center my-auto"
                            >
                              <div>
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
                                    // isChatOpen();
                                    setChatOpen(true);
                                    setchatapp(app);
                                  }}
                                />

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
                              {/* </ButtonGroup> */}
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
        </CardBody>
      </Card>

      {chatOpen === true && (
        <div className="messanger">
          <MessageHistoryCardApplicationDetailsPage
            applicationStatusId={chatapp.applicationStatusId}
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

      <ConfirmModal
        text="Do You Want To Delete This Application ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        progress={progress}
      />
    </div>
  );
};

export default ApplicationsCommon;
