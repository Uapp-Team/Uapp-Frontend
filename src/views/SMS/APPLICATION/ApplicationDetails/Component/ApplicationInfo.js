import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Table,
  Modal,
  h4,
  ModalBody,
  FormGroup,
  Form,
  Row,
} from "reactstrap";
import { Upload } from "antd";
import get from "../../../../../helpers/get";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import SpanButton from "../../../Components/SpanButton";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ApplicationStatus from "./Status/ApplicationStatus";
import uploadBtn from "../../../../../assets/img/upload.png";
import moment from "moment";
import AddButton from "../../../../../components/buttons/AddButton";
import { currentDate } from "../../../../../components/date/calenderFormate";
import { rootUrl } from "../../../../../constants/constants";

const ApplicationInfo = ({
  handleScroll,
  applicationInfo,
  intakeDD,
  deliveryDD,
  id,
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
  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const userType = localStorage.getItem("userType");
  const [statusDD, setStatusDD] = useState([]);
  const [applicationSubStatus, setApplicationSubStatus] = useState([]);

  const [statusLabel, setStatusLabel] = useState("");
  const [statusValue, setStatusvalue] = useState(0);
  console.log(statusValue, "statusValue");
  const [subStatusLabel, setSubStatusLabel] = useState(
    "Select Additional Status"
  );
  const [subStatusValue, setSubStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [subStatusError, setSubStatusError] = useState(false);
  const [statusDate, setDateStatus] = useState(currentDate);
  const [file, setFile] = useState([]);
  // console.log(applicationInfo?.universityApplicationDate);
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
  // const [uniAppDateModalOpen, setUniAppDateModalOpen] = useState(false);

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
  // const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress5, setProgress5] = useState(false);
  // const [progress6, setProgress6] = useState(false);
  const [progress7, setProgress7] = useState(false);
  const [progress8, setProgress8] = useState(false);
  const [progress9, setProgress9] = useState(false);
  const [progress10, setProgress10] = useState(false);
  // const [progress11, setProgress11] = useState(false);

  const [minuteError, setMinuteError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [timeError1, setTimeError1] = useState("");
  const [zone, setZone] = useState([]);
  const [intSts, setIntSts] = useState([]);
  const [hours, setHour] = useState("");
  const [hourError, setHourError] = useState("");
  const [min, setMin] = useState("");
  const [minError, setMinError] = useState("");

  const { addToast } = useToasts();

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  //   const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDateStatus(
      moment(new Date(applicationInfo?.universityApplicationDate)).format(
        "YYYY-MM-DD"
      )
    );
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
    //     console.log("intakeDD", res);
    //   });
    // }
    get("StudentFinanceStatusDD/Index").then((res) => {
      setFinanceDD(res);
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
    get(`InterviewStatusDD/Index`).then((res) => {
      setIntSts(res);
    });
    get(`ApplicationInterview/GetByApplication/${id}`).then((res) => {
      // console.log("interview data", res);
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

  const [minuteLabel, setMinuteLabel] = useState("Select Minute");
  const [minuteValue, setMinuteValue] = useState(0);

  const selectMinute = (label, value) => {
    setMinuteError("");
    setMinuteLabel(label);
    setMinuteValue(value);
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
      setSubStatusValue(subStatus?.applicationStatusId);
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
    // setAssesmentModalOpen(false);
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
    // setUniAppDateModalOpen(false);
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
    console.log(fileList);
    setFile(fileList);
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

  // const handleEditUniAppDate = (id) => {
  //   setUniAppDateModalOpen(true);
  // };

  // const handleUniAppDateSubmit = (e) => {
  //   e.preventDefault();
  //   const subData = new FormData(e.target);
  //   setProgress6(true);
  //   put(`Application/UpdateUniversityApplicationDate`, subData).then(
  //     (action) => {
  //       setProgress6(false);
  //       setSuccess(!success);
  //       setUniAppDateModalOpen(false);
  //       addToast(action?.data?.message, {
  //         appearance: "success",
  //         autoDismiss: true,
  //       });
  //     }
  //   );
  // };

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
      // setIntData(res);
      setUpIntData(res);
      setHour(res?.hour);
      setMin(res?.minute);

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
    setIntDate(undefined);
    setDateError(false);
    setHourError("");
    setTimeError1("");
    setMinError("");
    setIntStsError("");
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
    if (minuteValue === 0) {
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

  const handleHour = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setHour(newValue);

    if (!newValue) {
      setHourError("Hour is required");
    } else if (!isNumeric) {
      setHourError("Input only numbers.");
    } else {
      setHourError("");
    }
  };

  const handleMin = (e) => {
    const newValue = e.target.value;
    const isNumeric = /^\d+$/.test(newValue);
    setMin(newValue);

    if (!newValue) {
      setMinError("Minute is required");
    } else if (!isNumeric) {
      setMinError("Input only numbers.");
    } else {
      setMinError("");
    }
  };

  const validateInterviewForm = () => {
    var isFormValid = true;
    if (intDate === "") {
      isFormValid = false;
      setDateError("Date of Interview is required");
    }

    if (!/^\d+$/.test(hours)) {
      isFormValid = false;
      setHourError("Input only numbers.");
    }

    if (!hours) {
      isFormValid = false;
      setHourError("Hour is required");
    }

    if (!/^\d+$/.test(min)) {
      isFormValid = false;
      setMinError("Input only numbers.");
    }

    if (!min) {
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
          setIntStsLabel("Status");
          setIntStsValue(0);
          setTimeLabel1("Time Zone");
          setTimeValue1(0);
          setUpIntData({});
          setIntDate(undefined);
          setSuccess(!success);
          // setElptStatusValue(0);
        });
      }
    }
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-3 ">
        <div>
          <h3>
            {applicationInfo?.student?.nameTittle?.name}{" "}
            {applicationInfo?.student?.firstName}{" "}
            {applicationInfo?.student?.lastName}
          </h3>
          <hr />
        </div>
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Application Status</b>
            </td>
            <td className="border-0"></td>
          </thead>
          <tbody>
            <tr>
              <td>Status</td>

              <td>
                <div className="d-flex justify-content-between">
                  {applicationInfo?.applicationStatus?.name}

                  {applicationInfo?.applicationStatusId > 2 &&
                    applicationInfo?.applicationStatusId < 13 && (
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
                                  {file.length < 1 ? (
                                    <img src={uploadBtn} alt="" />
                                  ) : (
                                    ""
                                  )}
                                </Upload>
                              </FormGroup>
                            ) : null}
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
              </td>
            </tr>

            <tr>
              <td>Enrolment Status</td>

              <td>
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

                  {applicationInfo?.applicationStatusId !== 2 &&
                  applicationInfo.applicationStatusId === 6 &&
                  applicationInfo.applicationStatusId !== 13 ? (
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
              <td>Student Finance Status</td>

              <td>
                <div className="d-flex justify-content-between">
                  {applicationInfo?.studentFinanceStatus?.name}
                  {applicationInfo?.applicationStatusId !== 2 &&
                    applicationInfo.applicationStatusId !== 13 && (
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
              <td>Application Id</td>

              <td>{applicationInfo?.applicationViewId}</td>
            </tr>

            <tr>
              <td>Delivery Pattern</td>

              <td>
                <div className="d-flex justify-content-between">
                  {applicationInfo?.deliveryPattern?.name}

                  {applicationInfo?.applicationStatusId !== 2 &&
                    applicationInfo.applicationStatusId !== 13 && (
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
              <td>Application Type</td>

              <td>{applicationInfo?.student?.studentType?.name}</td>
            </tr>

            <tr>
              <td>Uapp Application date</td>

              <td>
                {applicationInfo?.applicationTime ? (
                  <>{handleDate(applicationInfo?.applicationTime)}</>
                ) : null}
              </td>
            </tr>

            <tr>
              <td>University Student Id</td>

              <td>
                <div className="d-flex justify-content-between">
                  <div>{applicationInfo?.universityStudentId}</div>

                  {applicationInfo?.applicationStatusId !== 2 &&
                    applicationInfo?.applicationStatusId === 4 &&
                    applicationInfo.applicationStatusId !== 13 && (
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
              <td>University Application Date</td>

              <td>
                {/* <div className="d-flex justify-content-between"> */}
                <div>
                  {applicationInfo?.universityApplicationDate ? (
                    <>
                      {handleDate(applicationInfo?.universityApplicationDate)}
                    </>
                  ) : null}
                </div>
                {/* {permissions?.includes(
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
                  ) : null} */}

                {/* <Modal
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
                                defaultValue={handleDate(
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
                  </Modal> */}
                {/* </div> */}
              </td>
            </tr>

            <tr>
              <td>University Name</td>

              <td>{applicationInfo?.university?.name}</td>
            </tr>

            <tr>
              <td>Campus Name</td>

              <td>{applicationInfo?.campus?.name}</td>
            </tr>

            <tr>
              <td>Education level</td>

              <td>{applicationInfo?.subject?.educationLevel?.name}</td>
            </tr>

            <tr>
              <td>Courses Name</td>

              <td>{applicationInfo?.subject?.name}</td>
            </tr>

            <tr>
              <td>Intake</td>

              <td>
                <div className="d-flex justify-content-between">
                  <div>{applicationInfo?.intake?.name}</div>

                  {applicationInfo?.applicationStatusId !== 2 &&
                    applicationInfo?.applicationStatusId === 7 &&
                    applicationInfo.applicationStatusId !== 13 && (
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
              <td>Additional Message</td>
              <td>{applicationInfo?.additionalMessage}</td>
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
              {applicationInfo?.applicationStatusId !== 2 &&
                applicationInfo.applicationStatusId !== 13 && (
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

                        <Input
                          type="text"
                          name="hour"
                          id="hour"
                          min="1"
                          max="24"
                          placeholder="Enter Hour"
                          value={hours}
                          onChange={(e) => {
                            handleHour(e);
                          }}
                        />
                        <span className="text-danger">{hourError}</span>
                      </div>

                      <div className="col-md-4 col-sm-12">
                        <span>
                          Minute <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="text"
                          name="minute"
                          id="minute"
                          min="0"
                          max="59"
                          placeholder="Enter Minute"
                          value={min}
                          onChange={(e) => {
                            handleMin(e);
                          }}
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
                      {applicationInfo?.applicationStatusId !== 2 &&
                        applicationInfo.applicationStatusId !== 13 && (
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
                      <td>Interview Date</td>

                      <td>{handleDate(intr?.interviewDate)}</td>
                    </tr>

                    <tr>
                      <td>Interview Time</td>

                      <td>
                        {`${intr?.hour} : ${intr?.minute}`} <br />
                        {intr?.timeZones?.name}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>Status</td>

                      <td>{intr?.applicationInterviewStatus?.name}</td>
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
                  {applicationInfo?.applicationStatusId !== 2 &&
                    applicationInfo.applicationStatusId !== 13 && (
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
                {applicationInfo?.applicationStatusId !== 2 &&
                  applicationInfo.applicationStatusId !== 13 && (
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
                <td>Status</td>

                <td>{applicationInfo?.elpt?.elptStatus?.name}</td>
              </tr>
              <tr>
                <td>Date</td>

                <td>
                  {applicationInfo?.elpt?.elptDate ? (
                    <>{handleDate(applicationInfo?.elpt?.elptDate)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>Time</td>

                <td>
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
                <td>ETA</td>

                <td>
                  {applicationInfo?.elpt?.eta ? (
                    <>{handleDate(applicationInfo?.elpt?.eta)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>ETA Deadline</td>

                <td>
                  {applicationInfo?.elpt?.etaDeadline ? (
                    <>{handleDate(applicationInfo?.elpt?.etaDeadline)}</>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>Reading</td>

                <td>{applicationInfo?.elpt?.reading}</td>
              </tr>
              <tr>
                <td>Writting</td>

                <td>{applicationInfo?.elpt?.writting}</td>
              </tr>
              <tr>
                <td>Listening</td>

                <td>{applicationInfo?.elpt?.listening}</td>
              </tr>
              <tr>
                <td>Speaking</td>

                <td>{applicationInfo?.elpt?.speaking}</td>
              </tr>
              <tr>
                <td>Overall</td>

                <td>{applicationInfo?.elpt?.overall}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>

      {applicationInfo.applicationStatusId !== 13 && (
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
