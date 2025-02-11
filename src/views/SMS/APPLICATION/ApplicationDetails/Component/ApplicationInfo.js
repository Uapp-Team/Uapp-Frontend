import { Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap";
import AddButton from "../../../../../components/buttons/AddButton";
import CancelButton from "../../../../../components/buttons/CancelButton";
import DownloadButton from "../../../../../components/buttons/DownloadButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import UploadButton from "../../../../../components/buttons/UploadButton";
import {
  currentDate,
  dateFormate,
} from "../../../../../components/date/calenderFormate";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../../constants/constants";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import SpanButton from "../../../Components/SpanButton";
import ApplicationStatus from "./Status/ApplicationStatus";
import { userTypes } from "../../../../../constants/userTypeConstant";

const ApplicationInfo = ({
  handleScroll,
  applicationInfo,
  intakeDD,
  deliveryDD,
  id,
  sId,
  elptDate,
  setElptDate,
  setEtaDeadLine,
  setEtaDate,
  etaDate,
  elptReading,
  setElptReading,
  eatDeadLine,
  setSuccess,
  success,
  elptListening,
  setElptListening,
  elptWritting,
  setElptWritting,
  elptSpeaking,
  setElptSpeaking,
  elptOverall,
  setElptOverall,
}) => {
  console.log(applicationInfo, "applicationInfo");
  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  // const userType = localStorage.getItem("userType");
  const [statusDD, setStatusDD] = useState([]);
  console.log(statusDD, "status DD");

  const [applicationSubStatus, setApplicationSubStatus] = useState([]);

  const [statusLabel, setStatusLabel] = useState("");
  const [statusValue, setStatusvalue] = useState(0);

  const [campusDD, setCampusDD] = useState([]);
  const [campusLabel, setCampusLabel] = useState("");
  const [campusValue, setCampusvalue] = useState(0);

  const [subStatusLabel, setSubStatusLabel] = useState(
    "Select Additional Status"
  );
  const [subStatusValue, setSubStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [subStatusError, setSubStatusError] = useState(false);
  const [statusDate, setDateStatus] = useState(currentDate);
  const [file, setFile] = useState([]);
  const [rejectionFile, setRejectionFile] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [elptDateError, setElptDateError] = useState(false);
  const [etaDateError, setEtatDateError] = useState(false);
  const [etaDeadLIneError, setEtaDeadLineError] = useState(false);
  const [elptReadingError, setElptReadingError] = useState("");
  const [elptListeningError, setElptListeningError] = useState("");
  const [elptSpeakingError, setElptLSpeakingError] = useState("");
  const [elptOverallError, setElptOverallError] = useState("");
  const [elptWrittingError, setElptWrittingError] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // const [deliveryDD, setDeliveryDD] = useState([]);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [deliveryLabel, setDeliveryLabel] = useState("");
  const [deliveryValue, setDeliveryValue] = useState(0);

  const [financeDD, setFinanceDD] = useState([]);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeLabel, setFinanceLabel] = useState("");
  const [financeValue, setFinanceValue] = useState(0);
  const [confidenceDD, setConfidenceDD] = useState([]);
  const [confidenceModalOpen, setConfidenceModalOpen] = useState(false);
  const [confidenceLabel, setConfidenceLabel] = useState("");
  const [confidenceValue, setConfidenceValue] = useState(0);

  // const [assesmentDD, setAssesmentDD] = useState([]);
  // const [assessmentModalOpen, setAssesmentModalOpen] = useState(false);
  // const [assesmentValue, setAssesmentValue] = useState(0);
  // const [assesmentLabel, setAssesmentLabel] = useState("");

  const [enrollDD, setEnrollDD] = useState([]);
  const [enrollLabel, setEnrollLabel] = useState("");
  const [enrollValue, setEnrollValue] = useState(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  // const [offerDD, setOfferDD] = useState([]);
  // const [offerLabel, setOfferLabel] = useState("");
  // const [offerValue, setOfferValue] = useState(0);
  // const [offerModalOpen, setOfferModalOpen] = useState(false);

  const [uniStdIdModalOpen, setUniStdIdModalOpen] = useState(false);
  const [CampusModalOpen, setCampusModalOpen] = useState(false);
  const [uniAppDateModalOpen, setUniAppDateModalOpen] = useState(false);

  const [intakeModal, setIntakeModal] = useState(false);
  const [intakeLabel, setIntakeLabel] = useState("");
  const [intakeValue, setIntakeValue] = useState(0);
  // const [intakeDD, setIntakeDD] = useState([]);

  const [elptModalOpen, setElptModalOpen] = useState(false);
  const [elptModalOpen1, setElptModalOpen1] = useState(false);
  const [elptStatusLabel, setElptStatusLabel] = useState("Select ELPT status");
  const [elptStatusValue, setElptStatusValue] = useState(0);
  const [elptStatusError, setElptStatusError] = useState(false);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [intStsLabel, setIntStsLabel] = useState("Status");
  const [intStsValue, setIntStsValue] = useState(0);
  const [intStsError, setIntStsError] = useState("");

  // const [intData, setIntData] = useState({});
  const [upIntData, setUpIntData] = useState({});
  const [intDate, setIntDate] = useState("");
  const [intDataList, setIntDataList] = useState([]);

  const [elptStatusDD, setElptStatusDD] = useState([]);

  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [progress6, setProgress6] = useState(false);
  const [progress7, setProgress7] = useState(false);
  const [progress8, setProgress8] = useState(false);
  const [progress9, setProgress9] = useState(false);
  const [progress10, setProgress10] = useState(false);
  // const [progress11, setProgress11] = useState(false);
  const [progress12, setProgress12] = useState(false);

  const [minuteError, setMinuteError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [timeError1, setTimeError1] = useState("");
  const [zone, setZone] = useState([]);
  const [intSts, setIntSts] = useState([]);
  const [hoursInterviewValue, setHoursInterviewValue] = useState(0);
  const [hoursInterviewLabel, setHoursInterviewLabel] = useState("Select Hour");

  const [hourError, setHourError] = useState("");
  const [minuteLabelInterview, setMinuteLabelInterview] =
    useState("Select Minute");
  const [minuteValueInterview, setMinuteValueInterview] = useState("");
  const [minError, setMinError] = useState("");
  const [applicationData, setApplicationData] = useState({});
  const [applicationProfileData, setApplicationProfileData] = useState({});

  const { addToast } = useToasts();

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  //   const [success, setSuccess] = useState(false);
  const usersType = localStorage.getItem("userType");

  useEffect(() => {
    get(`ApplicationInfo/Overview/${sId}`).then((res) => {
      setApplicationData(res);
    });

    get(`ApplicationInfo/GetByStudentId/${sId}`).then((res) => {
      setApplicationProfileData(res);
    });
  }, [sId]);

  useEffect(() => {
    if (applicationInfo?.universityApplicationDate) {
      setDateStatus(
        moment(new Date(applicationInfo?.universityApplicationDate)).format(
          "YYYY-MM-DD"
        )
      );
    }
  }, [applicationInfo]);

  useEffect(() => {
    // get(`Application/Get/${id}`).then((res) => {
    //   setApplicationInfo(res);
    //   setElptDate(handleDate(res?.elpt?.elptDate));
    //   setEtaDate(handleDate(res?.elpt?.eta));
    //   setEtaDeadLine(handleDate(res?.elpt?.etaDeadline));
    // });

    // if(applicationInfo?.subjectId !== undefined){
    //   get(`DeliveryPatternDD/Subject/${applicationInfo?.subjectId}`).then((res) => {
    //     setDeliveryDD(res);
    //   });
    //   get(`IntakeDD/Intake/${applicationInfo?.subjectId}`).then((res) => {
    //     setIntakeDD(res);
    //   });
    // }
    get("StudentFinanceStatusDD/Index").then((res) => {
      setFinanceDD(res);
    });
    get("ApplicationConfidence/SelectList").then((res) => {
      setConfidenceDD(res);
    });
    // get("ApplicationAssesmentStatusDD/Index").then((res) => {
    //   setAssesmentDD(res);
    // });

    get(`ApplicationStatusDD/IndexByApplicationId/${id}`).then((res) => {
      setStatusDD(res);
    });
    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
    });
    // get("OfferStatusDD/Index").then((res) => {
    //   setOfferDD(res);
    // });
    get("ElptStatusDD/Index").then((res) => {
      setElptStatusDD(res);
    });

    get(`timeZoneDD/Index`).then((res) => {
      setZone(res);
    });
    get(`UniversityCampus/ByApplication/${id}`).then((res) => {
      setCampusDD(res);
    });
    get(`InterviewStatusDD/Index`).then((res) => {
      setIntSts(res);
    });
    get(`ApplicationInterview/GetByApplication/${id}`).then((res) => {
      setIntDataList(res);
      // setIntSts(res);
    });
  }, [id, success]);

  const timeZoneName = (data) => {
    const result = zone?.find((ans) => ans?.id === data?.timeZoneId);
    return result?.name;
  };

  const hour = [];

  for (let i = 1; i <= 24; i++) {
    const hourObj = {
      id: i,
      name: `${i}`,
    };
    hour.push(hourObj);
  }

  const hourOptions = hour?.map((hr) => ({
    label: hr?.name,
    value: hr?.id,
  }));

  const hourOptionsInterview = hour?.map((hr) => ({
    label: hr?.name,
    value: hr?.id,
  }));

  const intStsOptions = intSts.map((sts) => ({
    label: sts?.name,
    value: sts?.id,
  }));

  const selectIntSts = (label, value) => {
    setIntStsLabel(label);
    setIntStsValue(value);
    setIntStsError(false);
  };

  const [hourLabel, setHourLabel] = useState("Select Hour");
  const [hourValue, setHourValue] = useState(0);

  const selectHour = (label, value) => {
    setHourError("");
    setHourLabel(label);
    setHourValue(value);
  };

  const selectHourInterview = (label, value) => {
    setHourError("");
    setHoursInterviewLabel(label);
    setHoursInterviewValue(value);
  };

  const minute = [];
  for (let i = 0; i <= 59; i++) {
    const minObj = {
      id: i,
      name: `${i}`,
    };
    minute.push(minObj);
  }

  const minuteOptions = minute?.map((min) => ({
    label: min?.name,
    value: min?.id,
  }));

  const minuteOptionsInterview = minute?.map((min) => ({
    label: min?.name,
    value: min?.id,
  }));

  const [minuteLabel, setMinuteLabel] = useState("Select Minute");
  const [minuteValue, setMinuteValue] = useState("");

  const selectMinute = (label, value) => {
    setMinuteError("");
    setMinuteLabel(label);
    setMinuteValue(value);
  };

  const selectMinuteInterview = (label, value) => {
    setMinError("");
    setMinuteLabelInterview(label);
    setMinuteValueInterview(value);
  };

  const [timeLabel, setTimeLabel] = useState("Select TimeZone");
  const [timeValue, setTimeValue] = useState(0);

  const [timeLabel1, setTimeLabel1] = useState("Time Zone");
  const [timeValue1, setTimeValue1] = useState(0);

  // const selectTimeZone = (label, value) => {
  //   setTimeError("");
  //   setTimeLabel(label);
  //   setTimeValue(value);
  // };

  const zoneOptions = zone?.map((z) => ({
    label: z?.name,
    value: z?.id,
  }));

  const zoneOptions1 = zone?.map((z) => ({
    label: z?.name,
    value: z?.id,
  }));

  const selectZone = (label, value) => {
    setTimeError("");
    setTimeLabel(label);
    setTimeValue(value);
  };

  const selectZone1 = (label, value) => {
    setTimeError1("");
    setTimeLabel1(label);
    setTimeValue1(value);
  };

  const handleApplicationEdit = (name, id, subStatus) => {
    setStatusLabel(name);
    setStatusvalue(id);

    get(`ApplicationSubStatus/SelectList/${id}`).then((res) => {
      setApplicationSubStatus(res);
    });

    if (subStatus !== null) {
      setSubStatusLabel(subStatus?.name);
      setSubStatusValue(subStatus?.id);
    } else {
      setSubStatusLabel("Select Additional Status");
      setSubStatusValue(0);
    }

    setStatusModalOpen(true);
  };

  const statusMenu = statusDD.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectStatus = (label, value) => {
    setSubStatusLabel("Select Additional Status");
    setSubStatusValue(0);
    setStatusLabel(label);
    setStatusvalue(value);
    get(`ApplicationSubStatus/SelectList/${value}`).then((res) => {
      setApplicationSubStatus(res);
    });
  };

  const campusMenu = campusDD.map((campus) => ({
    label: campus?.name,
    value: campus?.id,
  }));

  const selectCampus = (label, value) => {
    // setSubStatusLabel("Select Campus");
    // setSubStatusValue(0);
    setCampusLabel(label);
    setCampusvalue(value);
    // get(`ApplicationSubStatus/SelectList/${value}`).then((res) => {
    //   setApplicationSubStatus(res);
    // });
  };

  const subStatusOptions = applicationSubStatus?.map((sub) => ({
    label: sub?.name,
    value: sub?.id,
  }));

  const selectApplicationSubStatus = (label, value) => {
    setSubStatusLabel(label);
    setSubStatusValue(value);
  };

  // const offerMenu = offerDD.map((offer) => ({
  //   label: offer?.name,
  //   value: offer?.id,
  // }));

  // const selectOffer = (label, value) => {
  //   setOfferLabel(label);
  //   setOfferValue(value);
  // };

  const elptStatusMenu = elptStatusDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));

  const selectElpt = (label, value) => {
    setElptStatusLabel(label);
    setElptStatusValue(value);
    setElptStatusError(false);
  };

  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));

  const selectEnroll = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
  };

  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));
  const selectFinance = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
  };

  const confidenceMenu = confidenceDD.map((confidence) => ({
    label: confidence?.name,
    value: confidence?.id,
  }));
  const selectConfidence = (label, value) => {
    setConfidenceLabel(label);
    setConfidenceValue(value);
  };

  // const selectAssesment = (label, value) => {
  //   setAssesmentLabel(label);
  //   setAssesmentValue(value);
  // };

  // const assessmentMenu = assesmentDD.map((assesment) => ({
  //   label: assesment?.name,
  //   value: assesment?.id,
  // }));

  const deliveryMenu = deliveryDD.map((delivery) => ({
    label: delivery?.name,
    value: delivery?.id,
  }));

  const intakeMenu = intakeDD.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const selectDelivery = (label, value) => {
    setDeliveryLabel(label);
    setDeliveryValue(value);
  };

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  // const handleOfferEdit = (name, id) => {
  //   setOfferLabel(name);
  //   setOfferValue(id);
  //   setOfferModalOpen(true);
  // };

  const handleEditEnrol = (name, id) => {
    setEnrollLabel(name);
    setEnrollValue(id);
    setEnrollModalOpen(true);
  };
  // const handleEditAssesment = (name, id) => {
  //   setAssesmentLabel(name);
  //   setAssesmentValue(id);
  //   setAssesmentModalOpen(true);
  // };

  const handleEditFinance = (name, id) => {
    setFinanceLabel(name);
    setFinanceValue(id);
    setFinanceModalOpen(true);
  };
  const handleEditConfidence = (name, id) => {
    setConfidenceLabel(name);
    setConfidenceValue(id);
    setConfidenceModalOpen(true);
  };

  const handleEditDeliveryPattern = (name, id) => {
    setDeliveryLabel(name);
    setDeliveryValue(id);
    setDeliveryModalOpen(true);
  };

  const handleEditUniStdId = (id) => {
    setUniStdIdModalOpen(true);
  };

  const handleUpdateIntake = (value, label) => {
    setIntakeModal(true);
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  // on Close Modal
  const closeModal = () => {
    setSubStatusLabel("Select Additional Status");
    setSubStatusValue(0);
    setDeliveryModalOpen(false);
    setDeliveryLabel("");
    setDeliveryValue(0);
    setFinanceLabel("");
    // setAssesmentLabel("");
    setFinanceValue(0);
    // setAssesmentValue(0);
    setFinanceModalOpen(false);
    setConfidenceLabel("");

    setConfidenceValue(0);

    setConfidenceModalOpen(false);
    setStatusLabel("");
    setStatusvalue(0);
    setStatusModalOpen(false);
    setEnrollLabel("");
    setEnrollValue(0);
    setEnrollModalOpen(false);
    // setOfferLabel("");
    // setOfferValue(0);
    // setOfferModalOpen(false);
    setUniStdIdModalOpen(false);
    setUniAppDateModalOpen(false);
    setCampusModalOpen(false);
    setIntakeModal(false);
    setIntakeLabel("");
    setIntakeValue(0);
  };

  const handleApplicationUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append(
      "offerLetterFile",
      file.length === 0 ? null : file[0]?.originFileObj
    );
    subData.append(
      "RejectionFile",
      rejectionFile.length === 0 ? null : rejectionFile[0]?.originFileObj
    );
    if (statusValue === 0) {
      setStatusError(true);
    } else if (applicationSubStatus?.length !== 0 && subStatusValue === 0) {
      setSubStatusError(true);
    } else if (statusValue === 4 && statusDate === null) {
      setDateError(true);
    } else {
      setProgress(true);
      put(`Application/UpdateApplicationStatus`, subData).then((action) => {
        setProgress(false);
        setSuccess(!success);
        setStatusModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setStatusLabel("");
        setStatusvalue(0);
      });
    }
  };

  const handleFile = ({ fileList }) => {
    setFile(fileList);
  };
  const handleRejectionFile = ({ fileList }) => {
    setRejectionFile(fileList);
  };

  // const handleOfferUpdateSubmit = (e) => {
  //   e.preventDefault();
  //   const subData = new FormData(e.target);
  //   setProgress1(true);
  //   put(`Application/UpdateOfferStatus`, subData).then((action) => {
  //     setProgress1(false);
  //     setSuccess(!success);
  //     setOfferModalOpen(false);
  //     addToast(action?.data?.message, {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //     setOfferLabel("");
  //     setEnrollValue(0);
  //   });
  // };

  const handleEnrollUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress2(true);
    put(`Application/UpdateEnrollmentStatus`, subData).then((action) => {
      setProgress2(false);
      setSuccess(!success);
      setEnrollModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setEnrollLabel("");
      setEnrollValue(0);
    });
  };

  // const handleAssesmentUpdateSubmit = (e) => {
  //   e.preventDefault();
  //   const subData = new FormData(e.target);
  //   setProgress11(true);
  //   put(`Application/UpdateAssesment`, subData).then((action) => {
  //     setProgress11(false);
  //     setSuccess(!success);
  //     setAssesmentModalOpen(false);
  //     addToast(action?.data?.message, {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //     setAssesmentLabel("");
  //     setAssesmentValue(0);
  //   });
  // };

  const handleFinanceUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress3(true);
    put(`Application/UpdateStudentFinance`, subData).then((action) => {
      setProgress3(false);
      setSuccess(!success);
      setFinanceModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setFinanceLabel("");
      setFinanceValue(0);
    });
  };

  const handleConfidenceUpdateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress12(true);
    post(`ApplicationConfidence`, subData).then((action) => {
      setProgress12(false);
      setSuccess(!success);
      setConfidenceModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setConfidenceLabel("");
      setConfidenceValue(0);
    });
  };

  const handleDeliveryPatternSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    setProgress4(true);
    put(`Application/UpdateDeliveryPattern`, subData).then((action) => {
      setProgress4(false);
      setSuccess(!success);
      setDeliveryModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setDeliveryLabel("");
      setDeliveryValue(0);
    });
  };

  const handleUniStdIdSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress5(true);
    put(`Application/UpdateUniversityStudentId`, subData).then((action) => {
      setProgress5(false);
      setSuccess(!success);
      setUniStdIdModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleUpdateIntakeSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress9(true);
    put(`Application/UpdateIntake`, subData).then((action) => {
      setProgress9(false);
      setSuccess(!success);
      setIntakeModal(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleEditUniAppDate = (id) => {
    setUniAppDateModalOpen(true);
  };

  const handleUniAppDateSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    setProgress6(true);
    put(`Application/UpdateUniversityApplicationDate`, subData).then(
      (action) => {
        setProgress6(false);
        setSuccess(!success);
        setUniAppDateModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    );
  };

  const handleEditCampusUpDate = (id) => {
    setCampusModalOpen(true);
    setCampusLabel(applicationInfo?.campus?.name);
  };

  const handleCampusSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    setProgress1(true);
    put(`Application/UpdateApplicationCampus`, subData).then((action) => {
      setProgress1(false);
      setSuccess(!success);
      setCampusModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const handleElptupdate = (e) => {
    setElptStatusLabel(applicationInfo?.elpt?.elptStatus?.name);
    setElptStatusValue(applicationInfo?.elpt?.elptStatus?.id);
    const minuteName = minute?.find(
      (data) => data?.id === applicationInfo?.elpt?.minute
    );
    setMinuteLabel(minuteName?.name);
    setMinuteValue(applicationInfo?.elpt?.minute);
    const hourTitle = hour?.find(
      (data) => data?.id === applicationInfo?.elpt?.hour
    );
    setHourLabel(hourTitle?.name);
    setHourValue(applicationInfo?.elpt?.hour);
    const zoneName = zone?.find(
      (data) => data?.id === applicationInfo?.elpt?.timeZoneId
    );
    setTimeLabel(zoneName?.name);
    setTimeValue(applicationInfo?.elpt?.timeZoneId);
    setElptModalOpen1(true);
  };

  const handleInterviewUpdate = (intId) => {
    setInterviewModalOpen(true);
    get(`ApplicationInterview/Get/${intId}`).then((res) => {
      console.log(res, "kisui bujteci na");
      // setIntData(res);
      setUpIntData(res);
      setHoursInterviewLabel(res?.hour);
      setHoursInterviewValue(res?.hour);
      setMinuteLabelInterview(res?.minute);
      setMinuteValueInterview(res?.minute);
      // setHour(res?.hour);
      // setMin(res?.minute);

      setIntDate(moment(new Date(res?.interviewDate)).format("YYYY-MM-DD"));
      setTimeLabel1(res?.timeZones?.name);
      setTimeValue1(res?.timeZones?.id);
      setIntStsLabel(res?.applicationInterviewStatus?.name);
      setIntStsValue(res?.applicationInterviewStatus?.id);
      // setIntSts(res);
    });
  };

  // on close ELPT modal
  const closeElptModal1 = () => {
    setElptModalOpen1(false);
    setElptStatusError(false);
  };

  const handleSubmitElptupdate = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    var formIsValid = validateELPTForm(subData);
    if (formIsValid) {
      setProgress8(true);
      put(`ELPT/Update`, subData).then((action) => {
        setProgress8(false);
        setSuccess(!success);
        setElptModalOpen1(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setElptStatusLabel("Select ELPT status");
        setElptStatusValue(0);
      });
    }
  };

  const handleOpenELPTModal = () => {
    setElptModalOpen(true);
  };

  const handleOpenInterviewModal = () => {
    setInterviewModalOpen(true);
  };

  // on close ELPT modal
  const closeElptModal = () => {
    setElptModalOpen(false);
    setElptDateError("");
    setHourError("");
    setMinuteError("");
    setTimeError("");
    setEtatDateError("");
    setEtaDeadLineError("");
    setElptLSpeakingError("");
    setElptReadingError("");
    setElptListeningError("");
    setElptOverallError("");
    setElptWrittingError("");
    setElptStatusError(false);
  };

  // on close Interview modal
  const closeInterviewModal = () => {
    setInterviewModalOpen(false);
    setUpIntData({});
    setIntDate("");
    setDateError(false);
    setHourError("");
    setTimeError1("");
    setMinError("");
    setIntStsError("");
    setHoursInterviewLabel("Select Hour");
    setHoursInterviewValue(0);
    setMinuteLabelInterview("Select Minute");
    setMinuteValueInterview("");
    setTimeLabel1("Time Zone");
    setTimeValue1(0);
  };

  const handleELPTDate = (e) => {
    setElptDate(e.target.value);
    if (e.target.value === "") {
      setElptDateError("Date of ELPT is required");
    } else {
      setElptDateError("");
    }
  };
  const handleETATDate = (e) => {
    setEtaDate(e.target.value);
    if (e.target.value === "") {
      setEtatDateError("Date of ETA is required");
    } else {
      setEtatDateError("");
    }
  };
  const handleETATDeadLIne = (e) => {
    setEtaDeadLine(e.target.value);
    if (e.target.value === "") {
      setEtaDeadLineError("Date of ETA DeadLine is required");
    } else {
      setEtaDeadLineError("");
    }
  };
  const handleElptReading = (e) => {
    setElptReading(e.target.value);
    if (e.target.value === "") {
      setElptReadingError("Elpt Reading is required");
    } else {
      setElptReadingError("");
    }
  };
  const handleElptListening = (e) => {
    setElptListening(e.target.value);
    if (e.target.value === "") {
      setElptListeningError("Elpt Listening is required");
    } else {
      setElptListeningError("");
    }
  };
  const handleElptSpeaking = (e) => {
    setElptSpeaking(e.target.value);
    if (e.target.value === "") {
      setElptLSpeakingError("Elpt Listening is required");
    } else {
      setElptLSpeakingError("");
    }
  };
  const handleElptOverall = (e) => {
    setElptOverall(e.target.value);
    if (e.target.value === "") {
      setElptOverallError("Elpt Listening is required");
    } else {
      setElptOverallError("");
    }
  };
  const handleElptWritting = (e) => {
    setElptWritting(e.target.value);
    if (e.target.value === "") {
      setElptWrittingError("Elpt Listening is required");
    } else {
      setElptWrittingError("");
    }
  };

  const validateELPTForm = () => {
    var isFormValid = true;

    if (!new Date(elptDate).getDate()) {
      isFormValid = false;
      setElptDateError("Date of ELPT is required");
    }
    if (hourValue === 0) {
      isFormValid = false;
      setHourError("Hour is required");
    }

    const minutesRegex = /^[0-5]?[0-9]$/;

    if (!minutesRegex.test(minuteValue)) {
      isFormValid = false;
      setMinuteError("Minute is required");
    }
    if (timeValue === 0) {
      isFormValid = false;
      setTimeError("Timezone is required");
    }
    if (!new Date(etaDate).getDate()) {
      isFormValid = false;
      setEtatDateError("Date of ETA is required");
    }

    if (!new Date(eatDeadLine).getDate()) {
      isFormValid = false;
      setEtaDeadLineError("Date of ETA Deadline is required");
    }
    if (!elptSpeaking) {
      isFormValid = false;
      setElptLSpeakingError("Elpt speaking is required");
    }
    if (!elptReading) {
      isFormValid = false;
      setElptReadingError("Elpt Reading is required");
    }
    if (!elptListening) {
      isFormValid = false;
      setElptListeningError("Elpt Listening is required");
    }
    if (!elptOverall) {
      isFormValid = false;
      setElptOverallError("Elpt Overall is required");
    }
    if (!elptWritting) {
      isFormValid = false;
      setElptWrittingError("Elpt Writting is required");
    }

    if (elptStatusValue === 0) {
      isFormValid = false;
      setElptStatusError(true);
    }
    return isFormValid;
  };

  const handleSubmitElpt = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    var formIsValid = validateELPTForm(subData);
    if (formIsValid) {
      setProgress7(true);
      post(`ELPT/Create`, subData).then((action) => {
        setProgress7(false);
        setSuccess(!success);
        // setOfferModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // setElptStatusLabel("Select ELPT status");
        // setElptStatusValue(0);
      });
    }
  };

  const handleInterviewDate = (e) => {
    setIntDate(e.target.value);
    if (e.target.value === "") {
      setDateError("Date of Interview is required");
    } else {
      setDateError("");
    }
  };

  // const handleHour = (e) => {
  //   const newValue = e.target.value;
  //   const isNumeric = /^\d+$/.test(newValue);
  //   setHour(newValue);

  //   if (!newValue) {
  //     setHourError("Hour is required");
  //   } else if (!isNumeric) {
  //     setHourError("Input only numbers.");
  //   } else {
  //     setHourError("");
  //   }
  // };

  // const handleMin = (e) => {
  //   const newValue = e.target.value;
  //   const isNumeric = /^\d+$/.test(newValue);
  //   setMin(newValue);

  //   if (!newValue) {
  //     setMinError("Minute is required");
  //   } else if (!isNumeric) {
  //     setMinError("Input only numbers.");
  //   } else {
  //     setMinError("");
  //   }
  // };

  const validateInterviewForm = () => {
    var isFormValid = true;
    if (intDate === "") {
      isFormValid = false;
      setDateError("Date of Interview is required");
    }

    // if (!/^\d+$/.test(hours)) {
    //   isFormValid = false;
    //   setHourError("Input only numbers.");
    // }

    if (hoursInterviewValue === 0) {
      isFormValid = false;
      setHourError("Hour is required");
    }

    // if (!/^\d+$/.test(min)) {
    //   isFormValid = false;
    //   setMinError("Input only numbers.");
    // }
    const minutesRegex = /^[0-5]?[0-9]$/;

    if (!minutesRegex.test(minuteValueInterview)) {
      isFormValid = false;
      setMinError("Minute is required");
    }

    if (timeValue1 === 0) {
      isFormValid = false;
      setTimeError1("Time zone is required");
    }
    if (intStsValue === 0) {
      isFormValid = false;
      setIntStsError("Interview status is required");
    }

    return isFormValid;
  };

  const handleSubmitInterview = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    const subData1 = new FormData(e.target);

    subData1.append("id", upIntData?.id);
    var formIsValid = validateInterviewForm(subData);

    if (formIsValid) {
      if (upIntData?.id === undefined) {
        setProgress10(true);
        post(`ApplicationInterview/Create`, subData).then((action) => {
          setProgress10(false);
          setSuccess(!success);
          setInterviewModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setIntDate("");
          setHoursInterviewLabel("Select Hour");
          setHoursInterviewValue(0);
          setMinuteLabelInterview("Select Minute");
          setMinuteValueInterview("");
          setIntStsLabel("Status");
          setIntStsValue(0);
          setTimeLabel1("Time Zone");
          setTimeValue1(0);
          // setElptStatusLabel("Select ELPT status");
          // setElptStatusValue(0);
        });
      } else {
        setProgress10(true);
        put(`ApplicationInterview/Update`, subData1).then((action) => {
          setProgress10(false);
          setInterviewModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setIntDate("");
          setHoursInterviewLabel("Select Hour");
          setHoursInterviewValue(0);
          setMinuteLabelInterview("Select Minute");
          setMinuteValueInterview("");
          setIntStsLabel("Status");
          setIntStsValue(0);
          setTimeLabel1("Time Zone");
          setTimeValue1(0);
          setUpIntData({});

          setSuccess(!success);
          // setElptStatusValue(0);
        });
      }
    }
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-3 ">
        <div className="d-flex">
          <Link to={`/studentProfile/${sId}/${1}`}>
            <h3>
              {applicationInfo?.student?.nameTittle?.name}{" "}
              {applicationInfo?.student?.firstName}{" "}
              {applicationInfo?.student?.lastName}
            </h3>
          </Link>
        </div>
        <hr />
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Application Status</b>
            </td>
            <td className="border-0"></td>
          </thead>
          <tbody>
            <tr>
              <td td className="w-50">
                Status
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  {applicationInfo?.applicationStatus?.name}

                  {applicationInfo?.applicationStatusId !== 1 &&
                    applicationInfo?.confidenceLevel > 0 &&
                    applicationInfo?.applicationSubStatusId !== 38 && (
                      <>
                        {permissions?.includes(
                          permissionList.Update_Application_Status
                        ) ? (
                          <SpanButton
                            icon={
                              <i
                                class="far fa-edit"
                                style={{ color: "#619bff", cursor: "pointer" }}
                              ></i>
                            }
                            func={() =>
                              handleApplicationEdit(
                                applicationInfo?.applicationStatus?.name,
                                applicationInfo?.applicationStatus?.id,
                                applicationInfo?.applicationSubStatus
                              )
                            }
                            permission={6}
                          />
                        ) : null}
                      </>
                    )}

                  <Modal
                    isOpen={statusModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Application Status</h4>
                      <Form onSubmit={handleApplicationUpdateSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="ApplicationId"
                            id="ApplicationId"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>
                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>
                                Application Status{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Select
                                options={statusMenu}
                                value={{
                                  label: statusLabel,
                                  value: statusValue,
                                }}
                                onChange={(opt) =>
                                  selectStatus(opt.label, opt.value)
                                }
                                name="statusId"
                                id="statusId"
                              />
                              {statusError ? (
                                <span className="text-danger">
                                  Status is required
                                </span>
                              ) : null}
                            </FormGroup>

                            {applicationSubStatus?.length < 1 ? (
                              <input
                                type="hidden"
                                name="subStatusId"
                                value={0}
                              />
                            ) : (
                              <FormGroup>
                                <span>
                                  {statusValue === 6
                                    ? " Offered Status"
                                    : " Additional Status"}
                                  <span className="text-danger">*</span>
                                </span>

                                <Select
                                  options={subStatusOptions}
                                  value={{
                                    label: subStatusLabel,
                                    value: subStatusValue,
                                  }}
                                  onChange={(opt) => {
                                    selectApplicationSubStatus(
                                      opt.label,
                                      opt.value
                                    );
                                    setSubStatusError(false);
                                  }}
                                  name="subStatusId"
                                  id="subStatusId"
                                />
                                {subStatusError ? (
                                  <span className="text-danger">
                                    Sub status is required
                                  </span>
                                ) : null}
                              </FormGroup>
                            )}
                            {statusValue === 6 ? (
                              <FormGroup>
                                <span>Offer Letter </span>
                                <br />

                                <Upload
                                  multiple={false}
                                  fileList={file}
                                  onChange={handleFile}
                                  beforeUpload={(file) => {
                                    return false;
                                  }}
                                >
                                  {file.length < 1 ? <UploadButton /> : ""}
                                </Upload>
                              </FormGroup>
                            ) : null}
                            {/* {statusValue === 12 ? (
                              <FormGroup>
                                <span>Rejection Document</span>
                                <br />

                                <Upload
                                  multiple={false}
                                  fileList={rejectionFile}
                                  onChange={handleRejectionFile}
                                  beforeUpload={(rejectionFile) => {
                                    return false;
                                  }}
                                >
                                  {rejectionFile.length < 1 ? (
                                    <UploadButton />
                                  ) : (
                                    ""
                                  )}
                                </Upload>
                              </FormGroup>
                            ) : null} */}
                            {statusValue === 4 ? (
                              <FormGroup>
                                <span>University Application Date </span>
                                <span className="text-danger">*</span>

                                <Input
                                  type="Date"
                                  value={statusDate}
                                  name="ApplicationDate"
                                  id="ApplicationDate"
                                  onChange={(e) => {
                                    setDateStatus(e.target.value);
                                    setDateError(false);
                                  }}
                                />
                                {dateError ? (
                                  <span className="text-danger">
                                    Date is required
                                  </span>
                                ) : null}
                              </FormGroup>
                            ) : null}
                            {statusValue !== 1 ? (
                              <FormGroup>
                                <span>Note</span>

                                <Input
                                  type="textarea"
                                  placeholder="Write note"
                                  name="note"
                                  id="note"
                                />
                              </FormGroup>
                            ) : (
                              <input type="hidden" name="note" value={null} />
                            )}

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />
                              <SaveButton text="Submit" progress={progress} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
                {applicationInfo?.applicationSubStatus !== null ? (
                  <div>
                    <div>
                      {" "}
                      <span style={{ color: "#1e98b0" }}>
                        <small>
                          {applicationInfo?.applicationSubStatus?.name}
                        </small>
                      </span>
                    </div>
                  </div>
                ) : null}

                {applicationInfo?.applicationStatus?.name === "Offer Issued" ? (
                  <div>
                    {applicationInfo?.offerLetterUrl ? (
                      <a
                        href={rootUrl + applicationInfo?.offerLetterUrl}
                        target="blank"
                        className="file-download"
                      >
                        Download Offer letter
                      </a>
                    ) : null}
                  </div>
                ) : null}
                {applicationInfo?.applicationStatus?.name ===
                "Student Rejected" ? (
                  <div>
                    {applicationInfo?.rejectionFile ? (
                      <a
                        href={rootUrl + applicationInfo?.rejectionFile}
                        target="blank"
                        className="file-download"
                      >
                        Download Rejection Document
                      </a>
                    ) : null}
                  </div>
                ) : null}
                {applicationInfo?.applicationStatusId === 13 && (
                  <span className="mt-1 fs-12px">
                    Note : {applicationInfo?.statusChangeNote}
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                Enrolment Status
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  {applicationInfo?.enrollmentStatus?.name === "Withdrawn" ? (
                    <>
                      <div className="d-flex flex-column">
                        {applicationInfo?.enrollmentStatus?.name}{" "}
                        <span style={{ color: "red" }}>
                          {applicationInfo?.withdrawnReason}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>{applicationInfo?.enrollmentStatus?.name}</>
                  )}

                  {applicationInfo.applicationStatusId === 9 ? (
                    <>
                      {permissions?.includes(
                        permissionList.Update_Application_Status
                      ) ? (
                        <SpanButton
                          icon={
                            <i
                              class="far fa-edit"
                              style={{ color: "#619bff", cursor: "pointer" }}
                            ></i>
                          }
                          func={() =>
                            handleEditEnrol(
                              applicationInfo?.enrollmentStatus?.name,
                              applicationInfo?.enrollmentStatus?.id
                            )
                          }
                          permission={6}
                        />
                      ) : null}
                    </>
                  ) : null}

                  <Modal
                    isOpen={enrollModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Enrolment Status</h4>
                      <Form onSubmit={handleEnrollUpdateSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>
                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>
                                Enrolment Status{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Select
                                isDisabled={
                                  applicationInfo?.enrollmentStatus?.name ===
                                  "Registered"
                                    ? true
                                    : false
                                }
                                options={enrollMenu}
                                value={{
                                  label: enrollLabel,
                                  value: enrollValue,
                                }}
                                onChange={(opt) =>
                                  selectEnroll(opt.label, opt.value)
                                }
                                name="statusId"
                                id="statusId"
                              />
                              {applicationInfo?.enrollmentStatus?.name ===
                              "Registered" ? (
                                <div className="text-danger">
                                  Once the enrolment status is changed to
                                  "Registered" it can't be changed again.
                                </div>
                              ) : null}
                            </FormGroup>

                            {enrollValue === 4 ? (
                              <FormGroup>
                                <span>
                                  Withdrwan Reason{" "}
                                  <span className="text-danger">*</span>{" "}
                                </span>

                                <Input
                                  type="text"
                                  defaultValue={
                                    applicationInfo?.withdrawnReason
                                  }
                                  name="withdrawnReason"
                                  id="withdrawnReason"
                                  placeholder="Write Withdrwan Reason"
                                />
                              </FormGroup>
                            ) : null}
                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />

                              <SaveButton
                                text="Submit"
                                progress={progress2}
                                buttonStatus={
                                  applicationInfo?.enrollmentStatus?.name ===
                                  "Registered"
                                    ? true
                                    : false
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td td className="w-50">
                Student Finance Status
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  {applicationInfo?.studentFinanceStatus?.name}
                  {applicationInfo?.applicationStatusId === 9 &&
                    applicationInfo?.student?.studentType?.name !==
                      "International" && (
                      <>
                        {permissions?.includes(
                          permissionList.Update_Application_Status
                        ) ? (
                          <SpanButton
                            icon={
                              <i
                                class="far fa-edit"
                                style={{ color: "#619bff", cursor: "pointer" }}
                              ></i>
                            }
                            func={() =>
                              handleEditFinance(
                                applicationInfo?.studentFinanceStatus?.name,
                                applicationInfo?.studentFinanceStatus?.id
                              )
                            }
                            permission={6}
                          />
                        ) : null}
                      </>
                    )}

                  <Modal
                    isOpen={financeModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Student Finance Status</h4>
                      <Form onSubmit={handleFinanceUpdateSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>
                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>
                                Status <span className="text-danger">*</span>{" "}
                              </span>

                              <Select
                                options={financeMenu}
                                value={{
                                  label: financeLabel,
                                  value: financeValue,
                                }}
                                onChange={(opt) =>
                                  selectFinance(opt.label, opt.value)
                                }
                                name="statusId"
                                id="statusId"
                              />
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />
                              <SaveButton text="Submit" progress={progress3} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>
            {usersType !== userTypes?.Student &&
              usersType !== userTypes?.Consultant &&
              usersType !== userTypes?.Affiliate &&
              usersType !== userTypes?.Companion && (
                <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td td className="w-50">
                    Confidence Level
                  </td>

                  <td td className="w-50">
                    <div className="d-flex justify-content-between">
                      {applicationInfo?.confidenceLevelName}
                      {applicationInfo?.confidenceLevel === 0 && (
                        <SpanButton
                          icon={
                            <i
                              class="far fa-edit"
                              style={{ color: "#619bff", cursor: "pointer" }}
                            ></i>
                          }
                          func={() =>
                            handleEditConfidence(
                              applicationInfo?.confidenceLevelName,
                              applicationInfo?.confidenceLevel
                            )
                          }
                          permission={6}
                        />
                      )}

                      <Modal
                        isOpen={confidenceModalOpen}
                        toggle={closeModal}
                        className="uapp-modal"
                      >
                        <ModalBody className="p-5">
                          <h4>Update Confidence Level</h4>
                          <Form onSubmit={handleConfidenceUpdateSubmit}>
                            <FormGroup row>
                              <input
                                type="hidden"
                                name="applicationId"
                                id="applicationId"
                                value={applicationInfo?.id}
                              />
                            </FormGroup>
                            <Row>
                              <Col md={7}>
                                <FormGroup>
                                  <span>
                                    Confidence Status{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>

                                  <Select
                                    options={confidenceMenu}
                                    value={{
                                      label: confidenceLabel,
                                      value: confidenceValue,
                                    }}
                                    onChange={(opt) =>
                                      selectConfidence(opt.label, opt.value)
                                    }
                                    name="confidenceLevel"
                                    id="ConfidenceLevel "
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <CancelButton
                                    text="Close"
                                    cancel={closeModal}
                                  />
                                  <SaveButton
                                    text="Submit"
                                    progress={progress3}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </div>
      <div className="custom-card-border p-4 mb-3 ">
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Application Information</b>
            </td>
            <td className="border-0"></td>
          </thead>
          <tbody>
            <tr>
              <td td className="w-50">
                Application Id
              </td>

              <td td className="w-50">
                {applicationInfo?.applicationViewId}
              </td>
            </tr>
            <tr>
              <td td className="w-50">
                Uapp Application date
              </td>

              <td td className="w-50">
                {applicationInfo?.applicationTime ? (
                  <>{dateFormate(applicationInfo?.applicationTime)}</>
                ) : null}
              </td>
            </tr>

            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Application Type</td>
              <td>{applicationData?.applicationInfo}</td>
            </tr>

            <>
              {" "}
              {applicationProfileData?.studentTypeId === 1 && (
                <>
                  {" "}
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Loan From Student Loans Company</td>
                    <td>
                      {applicationProfileData?.loanfromStudentLoansCompanyForHome ===
                      false
                        ? "No"
                        : "Yes"}
                    </td>
                  </tr>
                  {applicationProfileData?.loanfromStudentLoansCompanyForHome ===
                    true && (
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Loan Years</td>
                      <td>{applicationProfileData?.loanYearsForHome}</td>
                    </tr>
                  )}
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>
                      Undergraduate or Postgraduate Course of Higher Education
                      in Any Country Since Leaving School
                    </td>
                    <td>
                      {applicationProfileData?.havingUndergraduatePostgraduateCourseForHome ===
                      false
                        ? "No"
                        : "Yes"}
                    </td>
                  </tr>
                </>
              )}
            </>

            <>
              {applicationProfileData?.studentTypeId === 2 && (
                <>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>First Entry Date in UK</td>
                    <td>
                      {dateFormate(applicationProfileData?.dateOfMoveToUk)}
                    </td>
                  </tr>

                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Loan From Student Loans Company</td>
                    <td>
                      {applicationProfileData?.loanfromStudentLoansCompanyForEU ===
                      false
                        ? "No"
                        : "Yes"}
                    </td>
                  </tr>
                  {applicationProfileData?.loanfromStudentLoansCompanyForEU ===
                    true && (
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Loan Years</td>
                      <td>{applicationProfileData?.loanYearsForEU}</td>
                    </tr>
                  )}

                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Settled/Pre-settled status</td>
                    <td>
                      {applicationProfileData?.isHavePre_Settlementstatus ===
                      false
                        ? "No"
                        : applicationProfileData?.currentResidencyStatusForEU}
                    </td>
                  </tr>

                  {applicationProfileData?.isHavePre_Settlementstatus ===
                  false ? (
                    <>
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>Current Residency Status</td>
                        <td>
                          {applicationProfileData?.currentResidencyStatusForEU}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>
                          Undergraduate or Postgraduate Course of Higher
                          Education in Any Country Since Leaving School
                        </td>
                        <td>
                          {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                          false
                            ? "No"
                            : "Yes"}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>Valid Share Code</td>
                        <td>{applicationProfileData?.shareCode}</td>
                      </tr>

                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>Have You Been Resident For Last Three Years</td>
                        <td>
                          {applicationProfileData?.isStayedInsideInUkinLast3Years ===
                          false
                            ? "No"
                            : "Yes"}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td>
                          Undergraduate or Postgraduate Course of Higher
                          Education in Any Country Since Leaving School
                        </td>
                        <td>
                          {applicationProfileData?.havingUndergraduatePostgraduateCourseForEU ===
                          false
                            ? "No"
                            : "Yes"}
                        </td>
                      </tr>
                    </>
                  )}
                </>
              )}
            </>

            <>
              {applicationProfileData?.studentTypeId === 3 && (
                <>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td width="60%">Applying From Inside</td>
                    <td width="40%">
                      {applicationProfileData?.isApplyingFromInside === false
                        ? "No"
                        : "Yes"}
                    </td>
                  </tr>
                  {applicationProfileData?.isApplyingFromInside === false ? (
                    <>
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td width="60%">Applied For Uk Visa</td>
                        <td width="40%">
                          {applicationProfileData?.isAppliedForUkVisa === false
                            ? "No"
                            : "Yes"}
                        </td>
                      </tr>
                      {applicationProfileData?.isAppliedForUkVisa === true && (
                        <>
                          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                            <td width="60%">Apply visa Type</td>
                            <td width="40%">
                              {applicationProfileData?.visaType}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                            <td width="60%">Refused For UK Visa</td>
                            <td width="40%">
                              {applicationProfileData?.isRefusedForUKVisa ===
                              false
                                ? "No"
                                : "Yes"}
                            </td>
                          </tr>
                          {applicationProfileData?.refusalLetterForUKVisa
                            ?.fileUrl ? (
                            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td width="60%">Attach the refusal letter</td>
                              <td width="40%">
                                <a
                                  href={
                                    rootUrl +
                                    applicationProfileData
                                      ?.refusalLetterForUKVisa?.fileUrl
                                  }
                                  target="blank"
                                >
                                  <DownloadButton />
                                </a>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      )}
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td width="60%">Refused Visa to Any Other Country</td>
                        <td width="40%">
                          {applicationProfileData?.isRefusedForOtherVisa ===
                          false
                            ? "No"
                            : "Yes"}
                        </td>
                      </tr>
                      {applicationProfileData?.refusalLetterForOtherVisa
                        ?.fileUrl ? (
                        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                          <td width="60%">Attach the refusal letter</td>
                          <td width="40%">
                            <a
                              href={
                                rootUrl +
                                applicationProfileData
                                  ?.refusalLetterForOtherVisa?.fileUrl
                              }
                              target="blank"
                            >
                              <DownloadButton />
                            </a>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {" "}
                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td width="60%">Current Residency Status</td>
                        <td width="40%">
                          {
                            applicationProfileData?.currentResidencyStatusForInternational
                          }
                        </td>
                      </tr>{" "}
                    </>
                  )}
                </>
              )}
            </>

            <tr>
              <td td className="w-50">
                Delivery Pattern
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  {applicationInfo?.deliveryPattern?.name}

                  {applicationInfo?.applicationStatusId !== 1 &&
                    applicationInfo.applicationStatusId !== 12 &&
                    applicationInfo?.applicationSubStatusId !== 38 && (
                      <>
                        {permissions?.includes(
                          permissionList.Update_Application_Info
                        ) ? (
                          <SpanButton
                            icon={
                              <i
                                class="far fa-edit"
                                style={{ color: "#619bff", cursor: "pointer" }}
                              ></i>
                            }
                            func={() =>
                              handleEditDeliveryPattern(
                                applicationInfo?.deliveryPattern?.name,
                                applicationInfo?.deliveryPattern?.id
                              )
                            }
                            permission={6}
                          />
                        ) : null}
                      </>
                    )}

                  <Modal
                    isOpen={deliveryModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Delivery Pattern</h4>
                      <Form onSubmit={handleDeliveryPatternSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>
                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>
                                Delivery Pattern{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Select
                                options={deliveryMenu}
                                value={{
                                  label: deliveryLabel,
                                  value: deliveryValue,
                                }}
                                onChange={(opt) =>
                                  selectDelivery(opt.label, opt.value)
                                }
                                name="statusId"
                                id="statusId"
                              />
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />

                              <SaveButton text="Submit" progress={progress4} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                University Student Id
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  <div>{applicationInfo?.universityStudentId}</div>

                  {applicationInfo?.applicationStatusId === 4 && (
                    <>
                      {permissions?.includes(
                        permissionList.Update_Application_Info
                      ) ? (
                        <SpanButton
                          icon={
                            <i
                              class="far fa-edit"
                              style={{
                                color: "#619bff",
                                cursor: "pointer",
                              }}
                            ></i>
                          }
                          func={() =>
                            handleEditUniStdId(
                              applicationInfo?.universityStudentId
                            )
                          }
                          permission={6}
                        />
                      ) : null}
                    </>
                  )}

                  <Modal
                    isOpen={uniStdIdModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update University Student Id</h4>
                      <Form onSubmit={handleUniStdIdSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>

                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>University Student Id </span>

                              <Input
                                type="text"
                                defaultValue={
                                  applicationInfo?.universityStudentId
                                }
                                name="universityStudentId"
                                id="universityStudentId"
                              />
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />

                              <SaveButton text="Submit" progress={progress5} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                University Application Date
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  <div>
                    {applicationInfo?.universityApplicationDate ? (
                      <>
                        {dateFormate(
                          applicationInfo?.universityApplicationDate
                        )}
                      </>
                    ) : null}
                  </div>

                  {applicationInfo?.applicationStatusId === 4 && (
                    <>
                      {" "}
                      {permissions?.includes(
                        permissionList.Update_Application_Info
                      ) ? (
                        <SpanButton
                          icon={
                            <i
                              class="far fa-edit"
                              style={{ color: "#619bff", cursor: "pointer" }}
                            ></i>
                          }
                          func={() =>
                            handleEditUniAppDate(
                              applicationInfo?.universityApplicationDate
                            )
                          }
                          permission={6}
                        />
                      ) : null}
                    </>
                  )}

                  <Modal
                    isOpen={uniAppDateModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update </h4>
                      <Form onSubmit={handleUniAppDateSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>

                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>University Application Date </span>

                              <Input
                                type="Date"
                                defaultValue={dateFormate(
                                  applicationInfo?.universityApplicationDate
                                )}
                                name="universityApplicationDate"
                                id="universityApplicationDate"
                              />
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />
                              <SaveButton text="Submit" progress={progress6} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                University Name
              </td>

              <td td className="w-50">
                {applicationInfo?.university?.name}
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                Campus Name
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  <div> {applicationInfo?.campus?.name}</div>

                  {applicationInfo?.applicationStatusId !== 1 &&
                    applicationInfo?.applicationStatusId !== 9 &&
                    applicationInfo?.applicationStatusId !== 10 &&
                    applicationInfo.applicationStatusId !== 11 &&
                    applicationInfo.applicationStatusId !== 12 && (
                      <>
                        {permissions?.includes(
                          permissionList.Update_Application_Info
                        ) ? (
                          <SpanButton
                            icon={
                              <i
                                class="far fa-edit"
                                style={{
                                  color: "#619bff",
                                  cursor: "pointer",
                                }}
                              ></i>
                            }
                            func={() =>
                              handleEditCampusUpDate(
                                applicationInfo?.campus?.name
                              )
                            }
                            permission={6}
                          />
                        ) : null}
                      </>
                    )}

                  <Modal
                    isOpen={CampusModalOpen}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Campus Name</h4>
                      <Form onSubmit={handleCampusSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="applicationId"
                            id="applicationId"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>

                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span> Campus Name </span>

                              <Select
                                options={campusMenu}
                                value={{
                                  label: campusLabel,
                                  value: campusValue,
                                }}
                                onChange={(opt) =>
                                  selectCampus(opt.label, opt.value)
                                }
                                name="campusId"
                                id="campusId"
                              />

                              {/* <Input
                                type="text"
                                defaultValue={applicationInfo?.campus?.name}
                                name="universityStudentId"
                                id="universityStudentId"
                              /> */}
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />

                              <SaveButton text="Submit" progress={progress1} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                Education level
              </td>

              <td td className="w-50">
                {applicationInfo?.subject?.educationLevel?.name}
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                Courses Name
              </td>

              <td td className="w-50">
                {applicationInfo?.subject?.name}
              </td>
            </tr>

            <tr>
              <td td className="w-50">
                Intake
              </td>

              <td td className="w-50">
                <div className="d-flex justify-content-between">
                  <div>{applicationInfo?.intake?.name}</div>

                  {((applicationInfo?.applicationStatusId === 3 &&
                    applicationInfo?.applicationSubStatusId === 1) ||
                    (applicationInfo?.applicationStatusId === 6 &&
                      applicationInfo?.applicationSubStatusId === 20) ||
                    (applicationInfo?.applicationStatusId === 7 &&
                      applicationInfo?.applicationSubStatusId === 23) ||
                    (applicationInfo?.applicationStatusId === 8 &&
                      applicationInfo?.applicationSubStatusId === 26)) && (
                    <>
                      {permissions?.includes(
                        permissionList.Update_Application_Info
                      ) ? (
                        <SpanButton
                          icon={
                            <i
                              class="far fa-edit"
                              style={{
                                color: "#619bff",
                                cursor: "pointer",
                              }}
                            ></i>
                          }
                          func={() =>
                            handleUpdateIntake(
                              applicationInfo?.intake?.id,
                              applicationInfo?.intake?.name
                            )
                          }
                          permission={6}
                        />
                      ) : null}
                    </>
                  )}

                  <Modal
                    isOpen={intakeModal}
                    toggle={closeModal}
                    className="uapp-modal"
                  >
                    <ModalBody className="p-5">
                      <h4>Update Intake</h4>
                      <Form onSubmit={handleUpdateIntakeSubmit}>
                        <FormGroup row>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={applicationInfo?.id}
                          />
                        </FormGroup>
                        <Row>
                          <Col md={7}>
                            <FormGroup>
                              <span>Intake </span>

                              <Select
                                options={intakeMenu}
                                value={{
                                  label: intakeLabel,
                                  value: intakeValue,
                                }}
                                onChange={(opt) =>
                                  selectIntake(opt.label, opt.value)
                                }
                                name="intakeId"
                                id="intakeId"
                              />
                            </FormGroup>

                            <FormGroup>
                              <CancelButton text="Close" cancel={closeModal} />
                              <SaveButton text="Submit" progress={progress9} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td td className="w-50">
                Additional Message
              </td>
              <td td className="w-50">
                {applicationInfo?.additionalMessage}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="custom-card-border p-4 mb-3 ">
        <Table>
          <thead className="tablehead">
            <td className="border-0" style={{ paddingTop: "17px" }}>
              <b>Interview</b>{" "}
            </td>
            <td className="border-0 text-right">
              {applicationInfo?.applicationStatusId === 4 &&
                applicationInfo?.applicationSubStatusId === 7 && (
                  <>
                    {permissions?.includes(
                      permissionList.Add_ApplicationInterview
                    ) ? (
                      <AddButton action={handleOpenInterviewModal} />
                    ) : null}
                  </>
                )}
            </td>
          </thead>
        </Table>

        <Modal
          size="lg"
          isOpen={interviewModalOpen}
          toggle={closeInterviewModal}
        >
          <ModalBody className="p-5">
            <h4>Interview</h4>
            <Form onSubmit={handleSubmitInterview}>
              <FormGroup row>
                <Input
                  type="hidden"
                  id="applicationId"
                  name="applicationId"
                  value={id}
                />
              </FormGroup>

              <Row>
                <Col md={10}>
                  <FormGroup>
                    <span>
                      Interview Date <span className="text-danger">*</span>{" "}
                    </span>

                    <Input
                      type="date"
                      name="interviewDate"
                      id="interviewDate"
                      value={intDate}
                      onChange={(e) => {
                        handleInterviewDate(e);
                      }}
                    />
                    <span className="text-danger">{dateError}</span>
                  </FormGroup>

                  <FormGroup>
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <span>
                          Hour <span className="text-danger">*</span>{" "}
                        </span>
                        <Select
                          options={hourOptionsInterview}
                          value={{
                            label: hoursInterviewLabel,
                            value: hoursInterviewValue,
                          }}
                          onChange={(opt) =>
                            selectHourInterview(opt.label, opt.value)
                          }
                          name="hour"
                          id="hour"
                        />
                        <span className="text-danger">{hourError}</span>
                      </div>

                      <div className="col-md-4 col-sm-12">
                        <span>
                          Minute <span className="text-danger">*</span>{" "}
                        </span>
                        <Select
                          options={minuteOptionsInterview}
                          value={{
                            label: minuteLabelInterview,
                            value: minuteValueInterview,
                          }}
                          onChange={(opt) =>
                            selectMinuteInterview(opt.label, opt.value)
                          }
                          name="minute"
                          id="minute"
                        />
                        <span className="text-danger">{minError}</span>
                      </div>

                      <div className="col-md-4 col-sm-12">
                        <span>
                          Time Zone <span className="text-danger">*</span>{" "}
                        </span>

                        <Select
                          options={zoneOptions1}
                          value={{
                            label: timeLabel1,
                            value: timeValue1,
                          }}
                          onChange={(opt) => selectZone1(opt.label, opt.value)}
                          name="timeZoneId"
                          id="timeZoneId"
                        />
                        <span className="text-danger">{timeError1}</span>
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <span>
                      Status <span className="text-danger">*</span>{" "}
                    </span>

                    <Select
                      options={intStsOptions}
                      value={{
                        label: intStsLabel,
                        value: intStsValue,
                      }}
                      onChange={(opt) => selectIntSts(opt.label, opt.value)}
                      name="applicationInterviewStatusId"
                      id="applicationInterviewStatusId"
                    />
                    <span className="text-danger">{intStsError}</span>
                  </FormGroup>

                  <FormGroup>
                    <CancelButton text="Close" cancel={closeInterviewModal} />
                    <SaveButton text="Submit" progress={progress10} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
        {intDataList.length > 0 ? (
          <>
            <hr />
            {intDataList.map((intr, i) => (
              <>
                <Table>
                  <thead className="tablehead">
                    <td className="border-0">
                      <b>Attempt </b>
                      <span className="bg-orange text-white px-1 rounded-circle">
                        {i + 1}
                      </span>
                    </td>
                    <td className="border-0 text-right">
                      {applicationInfo?.applicationStatusId === 4 &&
                        applicationInfo?.applicationSubStatusId === 7 && (
                          <>
                            {permissions?.includes(
                              permissionList.Add_ApplicationInterview
                            ) ? (
                              <>
                                <SpanButton
                                  icon={
                                    <i className="far fa-edit pointer text-blue"></i>
                                  }
                                  func={() => handleInterviewUpdate(intr?.id)}
                                  permission={6}
                                />
                              </>
                            ) : null}
                          </>
                        )}
                    </td>
                  </thead>
                  <tbody>
                    <tr>
                      <td td className="w-50">
                        Interview Date
                      </td>

                      <td td className="w-50">
                        {dateFormate(intr?.interviewDate)}
                      </td>
                    </tr>

                    <tr>
                      <td td className="w-50">
                        Interview Time
                      </td>

                      <td td className="w-50">
                        {`${intr?.hour} : ${intr?.minute}`} <br />
                        {intr?.timeZones?.name}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td td className="w-50">
                        Status
                      </td>

                      <td td className="w-50">
                        {intr?.applicationInterviewStatus?.name}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ))}
          </>
        ) : null}
      </div>
      <div className="custom-card-border p-4 mb-3 ">
        {applicationInfo?.elpt === null ? (
          <>
            <Table>
              <thead className="tablehead">
                <td className="border-0" style={{ paddingTop: "17px" }}>
                  <b>ELPT</b>{" "}
                </td>
                <td className="border-0 text-right">
                  {applicationInfo?.applicationStatusId === 4 &&
                    applicationInfo?.applicationSubStatusId === 8 && (
                      <>
                        {permissions?.includes(
                          permissionList.Add_ApplicationELPT
                        ) ? (
                          <AddButton action={handleOpenELPTModal} />
                        ) : null}
                      </>
                    )}
                </td>
              </thead>
            </Table>

            <Modal size="lg" isOpen={elptModalOpen} toggle={closeElptModal}>
              <ModalBody className="p-5">
                <h4>Add ELPT</h4>
                <Form onSubmit={handleSubmitElpt}>
                  <FormGroup row>
                    <Input
                      type="hidden"
                      id="applicationId"
                      name="applicationId"
                      value={id}
                    />
                  </FormGroup>

                  <Row>
                    <Col md={10}>
                      <FormGroup>
                        <span>
                          <span className="text-danger">*</span>ELPT Date
                        </span>

                        <Input
                          type="date"
                          name="ElptDate"
                          id="ElptDate"
                          value={elptDate}
                          onChange={(e) => {
                            handleELPTDate(e);
                          }}
                        />
                        <span className="text-danger">{elptDateError}</span>
                      </FormGroup>

                      <FormGroup>
                        <span>
                          <b>ELPT Time</b>
                        </span>

                        <div className="row">
                          <div className="col-md-4 col-sm-12">
                            <p>
                              <span className="text-danger">*</span>Hour
                            </p>
                            <Select
                              options={hourOptions}
                              value={{
                                label: hourLabel,
                                value: hourValue,
                              }}
                              onChange={(opt) =>
                                selectHour(opt.label, opt.value)
                              }
                              name="hour"
                              id="hour"
                            />
                            <span className="text-danger">{hourError}</span>
                          </div>

                          <div className="col-md-4 col-sm-12">
                            <p>
                              <span className="text-danger">*</span>Minute
                            </p>
                            <Select
                              options={minuteOptions}
                              value={{
                                label: minuteLabel,
                                value: minuteValue,
                              }}
                              onChange={(opt) =>
                                selectMinute(opt.label, opt.value)
                              }
                              name="minute"
                              id="minute"
                            />
                            <span className="text-danger">{minuteError}</span>
                          </div>

                          <div className="col-md-4 col-sm-12">
                            <p>
                              <span className="text-danger">*</span>Zone
                            </p>
                            <Select
                              options={zoneOptions}
                              value={{
                                label: timeLabel,
                                value: timeValue,
                              }}
                              onChange={(opt) =>
                                selectZone(opt.label, opt.value)
                              }
                              name="timeZoneId"
                              id="timeZoneId"
                            />
                            <span className="text-danger">{timeError}</span>
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>ETA Date
                            </span>

                            <Input
                              type="date"
                              name="eta"
                              id="eta"
                              value={etaDate}
                              onChange={(e) => handleETATDate(e)}
                            />
                            <span className="text-danger">{etaDateError}</span>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>ETA Deadline
                            </span>

                            <Input
                              type="date"
                              name="etaDeadLine"
                              id="etaDeadLine"
                              value={eatDeadLine}
                              onChange={(e) => {
                                handleETATDeadLIne(e);
                              }}
                            />
                            <span className="text-danger">
                              {etaDeadLIneError}
                            </span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>Reading
                            </span>

                            <Input
                              type="text"
                              name="reading"
                              id="reading"
                              placeholder="Enter Reading Mark"
                              value={elptReading}
                              onChange={(e) => {
                                handleElptReading(e);
                              }}
                            />
                            <span className="text-danger">
                              {elptReadingError}
                            </span>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>Writting{" "}
                            </span>

                            <Input
                              type="text"
                              name="writting"
                              id="writting"
                              value={elptWritting}
                              onChange={(e) => {
                                handleElptWritting(e);
                              }}
                              placeholder="Enter Writting Mark"
                            />
                            <span className="text-danger">
                              {elptWrittingError}
                            </span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>Listening{" "}
                            </span>

                            <Input
                              type="text"
                              name="listening"
                              id="listening"
                              value={elptListening}
                              onChange={(e) => {
                                handleElptListening(e);
                              }}
                              placeholder="Enter Listening Mark"
                            />
                            <span className="text-danger">
                              {elptListeningError}
                            </span>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <span>
                              <span className="text-danger">*</span>Speaking{" "}
                            </span>

                            <Input
                              type="text"
                              name="speaking"
                              id="speaking"
                              placeholder="Enter Speaking Mark"
                              value={elptSpeaking}
                              onChange={(e) => {
                                handleElptSpeaking(e);
                              }}
                            />
                            <span className="text-danger">
                              {elptSpeakingError}
                            </span>
                          </div>
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <span>
                          <span className="text-danger">*</span>Overall{" "}
                        </span>

                        <Input
                          type="text"
                          name="overall"
                          id="overall"
                          value={elptOverall}
                          placeholder="Enter Overall Mark"
                          onChange={(e) => handleElptOverall(e)}
                        />
                        <span className="text-danger">{elptOverallError}</span>
                      </FormGroup>

                      <FormGroup>
                        <span>Result / Status </span>{" "}
                        <span className="text-danger">*</span>{" "}
                        <Select
                          options={elptStatusMenu}
                          value={{
                            label: elptStatusLabel,
                            value: elptStatusValue,
                          }}
                          onChange={(opt) => selectElpt(opt.label, opt.value)}
                          name="elptStatusId"
                          id="elptStatusId"
                        />
                        {elptStatusError ? (
                          <div className="text-danger">
                            ELPT status is required
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                        <CancelButton text="Close" cancel={closeElptModal} />
                        <SaveButton text="Submit" progress={progress7} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </>
        ) : (
          <Table>
            <thead className="tablehead">
              <td className="border-0" style={{ paddingTop: "17px" }}>
                <b>ELPT</b>{" "}
              </td>
              <td className="border-0 text-right">
                {applicationInfo?.applicationStatusId === 4 &&
                  applicationInfo?.applicationSubStatusId === 8 && (
                    <>
                      {permissions?.includes(
                        permissionList.Add_ApplicationELPT
                      ) ? (
                        <>
                          {applicationInfo?.elpt !== null ? (
                            <SpanButton
                              icon={
                                <i className="far fa-edit pointer text-blue"></i>
                              }
                              func={handleElptupdate}
                              permission={6}
                            />
                          ) : null}
                        </>
                      ) : null}
                    </>
                  )}

                <Modal
                  size="lg"
                  isOpen={elptModalOpen1}
                  toggle={closeElptModal1}
                >
                  <ModalBody className="p-5">
                    <h4>Update ELPT</h4>
                    <Form onSubmit={handleSubmitElptupdate}>
                      <FormGroup row>
                        <Input
                          type="hidden"
                          id="applicationId"
                          name="applicationId"
                          value={id}
                        />
                        <Input
                          type="hidden"
                          id="id"
                          name="id"
                          value={applicationInfo?.elpt?.id}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={10}>
                          <FormGroup>
                            <span>
                              <span className="text-danger">*</span>ELPT Date
                            </span>

                            <Input
                              type="date"
                              name="ElptDate"
                              id="ElptDate"
                              value={elptDate}
                              onChange={(e) => {
                                handleELPTDate(e);
                              }}
                            />
                            <span className="text-danger">{elptDateError}</span>
                          </FormGroup>

                          <FormGroup>
                            <span>ELPT Time</span>

                            <div className="row">
                              <div className="col-md-4 col-sm-12">
                                <p>
                                  <span className="text-danger">*</span>Hour
                                </p>
                                <Select
                                  options={hourOptions}
                                  value={{
                                    label: hourLabel,
                                    value: hourValue,
                                  }}
                                  onChange={(opt) =>
                                    selectHour(opt.label, opt.value)
                                  }
                                  name="hour"
                                  id="hour"
                                />

                                <span className="text-danger">{hourError}</span>
                              </div>

                              <div className="col-md-4 col-sm-12">
                                <p>
                                  <span className="text-danger">*</span>Minute
                                </p>
                                <Select
                                  options={minuteOptions}
                                  value={{
                                    label: minuteLabel,
                                    value: minuteValue,
                                  }}
                                  onChange={(opt) =>
                                    selectMinute(opt.label, opt.value)
                                  }
                                  name="minute"
                                  id="minute"
                                />
                                <span className="text-danger">
                                  {minuteError}
                                </span>
                              </div>

                              <div className="col-md-4 col-sm-12">
                                <p>
                                  <span className="text-danger">*</span>Zone
                                </p>
                                <Select
                                  options={zoneOptions}
                                  value={{
                                    label: timeLabel,
                                    value: timeValue,
                                  }}
                                  onChange={(opt) =>
                                    selectZone(opt.label, opt.value)
                                  }
                                  name="timeZoneId"
                                  id="timeZoneId"
                                />
                                <span className="text-danger">{timeError}</span>
                              </div>
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <span>ETA Date</span>

                                <Input
                                  type="date"
                                  name="eta"
                                  id="eta"
                                  value={etaDate}
                                  onChange={(e) => handleETATDate(e)}
                                />
                                <span className="text-danger">
                                  {etaDateError}
                                </span>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <span>ETA Deadline</span>

                                <Input
                                  type="date"
                                  name="etaDeadLine"
                                  id="etaDeadLine"
                                  value={eatDeadLine}
                                  onChange={(e) => {
                                    handleETATDeadLIne(e);
                                  }}
                                />
                                <span className="text-danger">
                                  {etaDeadLIneError}
                                </span>
                              </div>
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <span>
                                  <span className="text-danger">*</span>Reading
                                </span>
                                <Input
                                  type="text"
                                  name="reading"
                                  id="reading"
                                  value={elptReading}
                                  onChange={(e) => {
                                    handleElptReading(e);
                                  }}
                                  placeholder="Enter Reading Mark"
                                />
                                <span className="text-danger">
                                  {elptReadingError}
                                </span>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <span>Writting </span>

                                <Input
                                  type="text"
                                  name="writting"
                                  id="writting"
                                  value={elptWritting}
                                  onChange={(e) => {
                                    handleElptWritting(e);
                                  }}
                                  placeholder="Enter Writting Mark"
                                />
                                <span className="text-danger">
                                  {elptWrittingError}
                                </span>
                              </div>
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <span>
                                  <span className="text-danger">*</span>
                                  Listening{" "}
                                </span>

                                <Input
                                  type="text"
                                  name="listening"
                                  id="listening"
                                  value={elptListening}
                                  onChange={(e) => {
                                    handleElptListening(e);
                                  }}
                                  placeholder="Enter Listening Mark"
                                />
                                <span className="text-danger">
                                  {elptListeningError}
                                </span>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <span>
                                  <span className="text-danger">*</span>Speaking{" "}
                                </span>

                                <Input
                                  type="text"
                                  name="speaking"
                                  id="speaking"
                                  value={elptSpeaking}
                                  placeholder="Enter Speaking Mark"
                                  onChange={(e) => {
                                    handleElptSpeaking(e);
                                  }}
                                />
                                <span className="text-danger">
                                  {elptSpeakingError}
                                </span>
                              </div>
                            </div>
                          </FormGroup>

                          <FormGroup>
                            <span>
                              <span className="text-danger">*</span>Overall{" "}
                            </span>

                            <Input
                              type="text"
                              name="overall"
                              id="overall"
                              value={elptOverall}
                              placeholder="Enter Overall Mark"
                              onChange={(e) => handleElptOverall(e)}
                            />
                            <span className="text-danger">
                              {elptOverallError}
                            </span>
                          </FormGroup>

                          <FormGroup>
                            <span>Result / Status </span>{" "}
                            <span className="text-danger">*</span>{" "}
                            <Select
                              options={elptStatusMenu}
                              value={{
                                label: elptStatusLabel,
                                value: elptStatusValue,
                              }}
                              onChange={(opt) =>
                                selectElpt(opt.label, opt.value)
                              }
                              name="elptStatusId"
                              id="elptStatusId"
                            />
                            {elptStatusError ? (
                              <div className="text-danger">
                                Please provide ELPT status
                              </div>
                            ) : null}
                          </FormGroup>
                          <FormGroup>
                            <CancelButton
                              text="Close"
                              cancel={closeElptModal1}
                            />
                            <SaveButton text="Submit" progress={progress8} />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </td>
            </thead>
            <tbody>
              <tr>
                <td td className="w-50">
                  Status
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.elptStatus?.name}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Date
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.elptDate ? (
                    <>{dateFormate(applicationInfo?.elpt?.elptDate)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Time
                </td>

                <td td className="w-50">
                  <div>
                    {applicationInfo?.elpt?.hour < 10
                      ? "0" + applicationInfo?.elpt?.hour
                      : applicationInfo?.elpt?.hour}{" "}
                    :{" "}
                    {applicationInfo?.elpt?.minute < 10
                      ? "0" + applicationInfo?.elpt?.minute
                      : applicationInfo?.elpt?.minute}
                  </div>
                  <div>{timeZoneName(applicationInfo?.elpt)}</div>
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  ETA
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.eta ? (
                    <>{dateFormate(applicationInfo?.elpt?.eta)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  ETA Deadline
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.etaDeadline ? (
                    <>{dateFormate(applicationInfo?.elpt?.etaDeadline)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Reading
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.reading}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Writting
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.writting}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Listening
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.listening}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Speaking
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.speaking}
                </td>
              </tr>
              <tr>
                <td td className="w-50">
                  Overall
                </td>

                <td td className="w-50">
                  {applicationInfo?.elpt?.overall}
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>

      {applicationInfo?.applicationSubStatusId !== 38 && (
        <>
          {permissions?.includes(
            permissionList.Update_Application_Assesment
          ) ? (
            <ApplicationStatus
              id={applicationInfo?.id}
              success={success}
              setSuccess={setSuccess}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ApplicationInfo;
