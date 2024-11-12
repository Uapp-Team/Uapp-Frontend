import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import loadingImages from "../../../../../assets/img/data.svg";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
// import cardImage from "../../../../../assets/img/Group.png";
import moment from "moment";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import AllScoresCard from "./Component/AllScoresCard";
// import { Person } from "@material-ui/icons";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
// import icon_gmt from "../../../../../assets/img/icons/icon-gmt.png";
import { currentDate } from "../../../../../components/date/calenderFormate";
import { userTypes } from "../../../../../constants/userTypeConstant";
import GREScore from "./Component/GREScore";

const TestScore = () => {
  const userType = localStorage.getItem("userType");

  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
  const { applicationStudentId } = useParams();
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [eltName, setEltName] = useState("");
  const [progress, setProgress] = useState(false);
  // English Course Names
  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [ELqualificationLabel, setELQualificationLabel] = useState("Select");
  const [ELqualificationValue, ELsetQualificationValue] = useState(0);
  const { addToast } = useToasts();
  const [updateIelts, setUpdateIelts] = useState(false);
  const [ieltsSpeaking, setIeltsSpeaking] = useState(0);
  const [ieltsSpeakingError, setIeltsSpeakingError] = useState(false);
  const [ieltsReading, setIeltsReading] = useState(0);
  const [ieltsReadingError, setIeltsReadingError] = useState(false);
  const [ieltsWriting, setIeltsWriting] = useState(0);
  const [ieltsWritingError, setIeltsWritingError] = useState(false);
  const [ieltsListening, setIeltsListening] = useState(0);
  const [ieltsListeningError, setIeltsListeningError] = useState(false);
  const [ieltsOverall, setIeltsOverall] = useState(0);
  const [ieltsOverallError, setIeltsOverallError] = useState(false);
  const [duolingoLiteracy, setDuoLingoLiteracy] = useState(10);
  const [duolingoLiteracyError, setDuoLingoLiteracyError] = useState(false);
  const [duolingoComprehension, setDuoLingoComprehension] = useState(10);
  const [duolingoComprehensionError, setDuoLingoComprehensionError] =
    useState(false);
  const [duolingoConversation, setDuoLingoConversation] = useState(10);
  const [duolingoConversationError, setDuoLingoConversationError] =
    useState(false);
  const [duolingoProduction, setDuoLingoProduction] = useState(10);
  const [duolingoProductionError, setDuoLingoProductionError] = useState(false);
  const [duolingoOverall, setDuolingoOverall] = useState(10);
  const [duolingoOverallError, setDuolingoOverallError] = useState(false);
  const [updateDuolingo, setUpdateDuolingo] = useState(false);
  const [updateToefl, setUpdateToefl] = useState(false);
  const [updateFunctions, setUpdateFunctions] = useState(false);
  const [updateGcse, setUpdateGcse] = useState(false);
  const [updatePearson, setUpdatePearson] = useState(false);
  const [updateOther, setUpdateOther] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [testError, setTestError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isQualification, setIsQualifiacation] = useState(false);
  const [ieltsExamDate, setIeltsExamDate] = useState(null);
  const [ieltsExamDateError, setIeltsExamDateError] = useState(null);
  const [duolingoExamDate, setDuolingoExamDate] = useState(null);
  const [duolingoExamDateError, setDuolingoExamDateError] = useState(null);
  const [duolingoEquivalentScore, setDuolingoEquivalentScore] = useState(0);
  const [duolingoEquivalentScoreError, setDuolingoEquivalentScoreError] =
    useState(false);
  const [ToeflSpeaking, setToeflSpeaking] = useState(0);
  const [ToeflSpeakingError, setToeflSpeakingError] = useState(false);
  const [ToeflReading, setToeflReading] = useState(0);
  const [ToeflReadingError, setToeflReadingError] = useState(false);
  const [ToeflWriting, setToeflWriting] = useState(0);
  const [ToeflWritingError, setToeflWritingError] = useState(false);
  const [ToeflListening, setToeflListening] = useState(0);
  const [ToeflListeningError, setToeflListeningError] = useState(false);
  const [ToeflOverall, setToeflOverall] = useState(0);
  const [ToeflOverallError, setToeflOverallError] = useState(false);
  const [ToeflExamDate, setToeflExamDate] = useState(null);
  const [ToeflExamDateError, setToeflExamDateError] = useState(null);
  const [ToeflEquivalentScore, setToeflEquivalentScore] = useState(0);
  const [ToeflEquivalentScoreError, setToeflEquivalentScoreError] =
    useState(false);
  ///////////
  const [FunctionSkillsSpeaking, setFunctionSkillsSpeaking] = useState(0);
  const [FunctionSkillsSpeakingError, setFunctionSkillsSpeakingError] =
    useState(false);
  const [FunctionSkillsReading, setFunctionSkillsReading] = useState(0);
  const [FunctionSkillsReadingError, setFunctionSkillsReadingError] =
    useState(false);
  const [FunctionSkillsWriting, setFunctionSkillsWriting] = useState(0);
  const [FunctionSkillsWritingError, setFunctionSkillsWritingError] =
    useState(false);
  const [FunctionSkillsListening, setFunctionSkillsListening] = useState(0);
  const [FunctionSkillsListeningError, setFunctionSkillsListeningError] =
    useState(false);
  const [FunctionSkillsOverall, setFunctionSkillsOverall] = useState(0);
  const [FunctionSkillsOverallError, setFunctionSkillsOverallError] =
    useState(false);
  const [FunctionSkillsExamDate, setFunctionSkillsExamDate] = useState(null);
  const [FunctionSkillsExamDateError, setFunctionSkillsExamDateError] =
    useState(null);
  const [FunctionSkillsEquivalentScore, setFunctionSkillsEquivalentScore] =
    useState(0);
  const [
    FunctionSkillsEquivalentScoreError,
    setFunctionSkillsEquivalentScoreError,
  ] = useState(false);

  //////////////
  const [GCSEResult, setGCSEResult] = useState(1);
  const [GCSEResultError, setGCSEResultError] = useState(false);
  const [GCSEEquivalentScore, setGCSEEquivalentScore] = useState(0);
  const [GCSEEquivalentScoreError, setGCSEEquivalentScoreError] =
    useState(false);
  const [PEARSONResult, setPEARSONResult] = useState(10);
  const [PEARSONResultError, setPEARSONResultError] = useState(false);
  const [PEARSONEquivalentScore, setPEARSONEquivalentScore] = useState(0);
  const [PEARSONEquivalentScoreError, setPEARSONEquivalentScoreError] =
    useState(false);

  const [OthersTestName, setOthersTestName] = useState("");
  const [OthersTestNameError, setOthersTestNameError] = useState(false);
  const [OthersScoreOverall, setOthersScoreOverall] = useState(0);
  const [OthersScoreOverallError, setOthersScoreOverallError] = useState(false);
  const [OthersEquivalentScore, setOthersEquivalentScore] = useState(0);
  const [OthersEquivalentScoreError, setOthersEquivalentScoreError] =
    useState(false);

  const minDate = "1950-01-01";

  // Ielts validation

  const handleIeltsSpeaking = (e) => {
    let value = e.target.value;
    const regex = /^(?:[1-9](?:\.0|\.5)?)$/;
    if (regex.test(value)) {
      setIeltsSpeaking(value);
      setIeltsSpeakingError(false);
    } else {
      setIeltsSpeakingError(true);
    }
  };

  const handleIeltsReading = (e) => {
    const value = e.target.value;
    const regex = /^(?:[1-9](?:\.0|\.5)?)$/;
    if (regex.test(value)) {
      setIeltsReading(value);
      setIeltsReadingError(false);
    } else {
      setIeltsReadingError(true);
    }
  };

  const handleIeltsWriting = (e) => {
    const value = e.target.value;
    const regex = /^(?:[1-9](?:\.0|\.5)?)$/;
    if (regex.test(value)) {
      setIeltsWriting(value);
      setIeltsWritingError(false);
    } else {
      setIeltsWritingError(true);
    }
  };

  const handleIeltsListening = (e) => {
    const value = e.target.value;
    const regex = /^(?:[1-9](?:\.0|\.5)?)$/;
    if (regex.test(value)) {
      setIeltsListening(value);
      setIeltsListeningError(false);
    } else {
      setIeltsListeningError(true);
    }
  };

  const handleIeltsOverall = (e) => {
    const value = e.target.value;
    const regex = /^(?:[1-9](?:\.0|\.5)?)$/;
    if (regex.test(value)) {
      setIeltsOverall(value);
      setIeltsOverallError(false);
    } else {
      setIeltsOverallError(true);
    }
  };

  const handleIeltsExamDate = (e) => {
    const value = e.target.value;
    const yearValue = value.split("-")[0];
    setIeltsExamDate(value);
    if (value === null) {
      setIeltsExamDateError("Date is required");
    } else if (currentDate < value) {
      setIeltsExamDateError("Invalid Date");
    } else if (yearValue.length > 4) {
      setIeltsExamDateError("Invalid Date");
    } else {
      setIeltsExamDateError(null);
    }
  };
  // Ielts validation

  // duolingo validation

  const handleDuolingoLiteracy = (e) => {
    setDuoLingoLiteracy(e.target.value);
    if (e.target.value > 160 || e.target.value < 10) {
      setDuoLingoLiteracyError(true);
    } else {
      setDuoLingoLiteracyError(false);
    }
  };

  const handleDuolingoComprehension = (e) => {
    setDuoLingoComprehension(e.target.value);
    if (e.target.value > 160 || e.target.value < 10) {
      setDuoLingoComprehensionError(true);
    } else {
      setDuoLingoComprehensionError(false);
    }
  };

  const handleDuolingoConversation = (e) => {
    setDuoLingoConversation(e.target.value);
    if (e.target.value > 160 || e.target.value < 10) {
      setDuoLingoConversationError(true);
    } else {
      setDuoLingoConversationError(false);
    }
  };

  const handleDuolingoProduction = (e) => {
    setDuoLingoProduction(e.target.value);
    if (e.target.value > 160 || e.target.value < 10) {
      setDuoLingoProductionError(true);
    } else {
      setDuoLingoProductionError(false);
    }
  };

  const handleDuolingoExamDate = (e) => {
    const value = e.target.value;
    const yearValue = value.split("-")[0];
    setDuolingoExamDate(value);
    if (value === null) {
      setDuolingoExamDateError("Date of Exam is required");
    } else if (yearValue.length > 4) {
      setDuolingoExamDateError("Invalid Date");
    } else if (currentDate < value) {
      setDuolingoExamDateError("Invalid Date");
    } else {
      setDuolingoExamDateError(null);
    }
  };

  const handleDuolingoOverall = (e) => {
    setDuolingoOverall(e.target.value);
    if (e.target.value > 160 || e.target.value < 10) {
      setDuolingoOverallError(true);
    } else {
      setDuolingoOverallError(false);
    }
  };

  const handleDuolingoEquivalentScore = (e) => {
    setDuolingoEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setDuolingoEquivalentScoreError(true);
    } else {
      setDuolingoEquivalentScoreError(false);
    }
  };
  // duolingo validation

  // Toefl validation
  const handToeflSpeaking = (e) => {
    setToeflSpeaking(e.target.value);
    if (e.target.value > 30 || e.target.value === "") {
      setToeflSpeakingError(true);
    } else {
      setToeflSpeakingError(false);
    }
  };

  const handleToeflReading = (e) => {
    setToeflReading(e.target.value);
    if (e.target.value > 30 || e.target.value === "") {
      setToeflReadingError(true);
    } else {
      setToeflReadingError(false);
    }
  };

  const handleToeflWriting = (e) => {
    setToeflWriting(e.target.value);
    if (e.target.value > 30 || e.target.value === "") {
      setToeflWritingError(true);
    } else {
      setToeflWritingError(false);
    }
  };

  const handleToeflListening = (e) => {
    setToeflListening(e.target.value);
    if (e.target.value > 30 || e.target.value === "") {
      setToeflListeningError(true);
    } else {
      setToeflListeningError(false);
    }
  };

  const handleToeflOverall = (e) => {
    setToeflOverall(e.target.value);
    if (e.target.value > 120 || e.target.value === "") {
      setToeflOverallError(true);
    } else {
      setToeflOverallError(false);
    }
  };

  const handleToeflExamDate = (e) => {
    const value = e.target.value;
    const yearValue = value.split("-")[0];
    setToeflExamDate(value);
    if (value === null) {
      setToeflExamDateError("Exam date are required");
    } else if (yearValue.length > 4) {
      setToeflExamDateError("Invalid Date");
    } else if (currentDate < value) {
      setToeflExamDateError("Invalid Date");
    } else {
      setToeflExamDateError(null);
    }
  };

  const handleToeflEquivalentScore = (e) => {
    setToeflEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setToeflEquivalentScoreError(true);
    } else {
      setToeflEquivalentScoreError(false);
    }
  };
  // Toefl validation

  // FUNCTION SKILLS validation

  const handFunctionSkillsSpeaking = (e) => {
    setFunctionSkillsSpeaking(e.target.value);
    if (e.target.value > 90 || e.target.value === "") {
      setFunctionSkillsSpeakingError(true);
    } else {
      setFunctionSkillsSpeakingError(false);
    }
  };

  const handleFunctionSkillsReading = (e) => {
    setFunctionSkillsReading(e.target.value);
    if (e.target.value > 90 || e.target.value === "") {
      setFunctionSkillsReadingError(true);
    } else {
      setFunctionSkillsReadingError(false);
    }
  };

  const handleFunctionSkillsWriting = (e) => {
    setFunctionSkillsWriting(e.target.value);
    if (e.target.value > 90 || e.target.value === "") {
      setFunctionSkillsWritingError(true);
    } else {
      setFunctionSkillsWritingError(false);
    }
  };

  const handleFunctionSkillsListening = (e) => {
    setFunctionSkillsListening(e.target.value);
    if (e.target.value > 90 || e.target.value === "") {
      setFunctionSkillsListeningError(true);
    } else {
      setFunctionSkillsListeningError(false);
    }
  };

  const handleFunctionSkillsOverall = (e) => {
    setFunctionSkillsOverall(e.target.value);
    if (e.target.value > 90 || e.target.value === "") {
      setFunctionSkillsOverallError(true);
    } else {
      setFunctionSkillsOverallError(false);
    }
  };

  const handleFunctionSkillsExamDate = (e) => {
    const value = e.target.value;
    const yearValue = value.split("-")[0];
    setFunctionSkillsExamDate(value);
    if (value === null) {
      setFunctionSkillsExamDateError("Exam date are required");
    } else if (yearValue.length > 4) {
      setFunctionSkillsExamDateError("Invalid date");
    } else if (currentDate < value) {
      setFunctionSkillsExamDateError("Invalid date");
    } else {
      setFunctionSkillsExamDateError(null);
    }
  };

  const handleFunctionSkillsEquivalentScore = (e) => {
    setFunctionSkillsEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setFunctionSkillsEquivalentScoreError(true);
    } else {
      setFunctionSkillsEquivalentScoreError(false);
    }
  };

  // FUNCTION SKILLS validation

  // GCSE validation
  const handleGCSEResult = (e) => {
    setGCSEResult(e.target.value);
    if (e.target.value > 9 || e.target.value === "") {
      setGCSEResultError(true);
    } else {
      setGCSEResultError(false);
    }
  };

  const handleGCSEEquivalentScore = (e) => {
    setGCSEEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setGCSEEquivalentScoreError(true);
    } else {
      setGCSEEquivalentScoreError(false);
    }
  };

  // GCSE validation

  // PEARSON validation
  const handlePEARSONResult = (e) => {
    setPEARSONResult(e.target.value);
    if (e.target.value > 90 || e.target.value < 10) {
      setPEARSONResultError(true);
    } else {
      setPEARSONResultError(false);
    }
  };

  const handlePEARSONEquivalentScore = (e) => {
    setPEARSONEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setPEARSONEquivalentScoreError(true);
    } else {
      setPEARSONEquivalentScoreError(false);
    }
  };
  // PEARSON validation

  // Others validation
  const handleOthersTestName = (e) => {
    setOthersTestName(e.target.value);
    if (e.target.value === "") {
      setOthersTestNameError(true);
    } else {
      setOthersTestNameError(false);
    }
  };

  const handleScoreOverall = (e) => {
    setOthersScoreOverall(e.target.value);
    if (e.target.value === "") {
      setOthersScoreOverallError(true);
    } else {
      setOthersScoreOverallError(false);
    }
  };

  const handleOthersEquivalentScore = (e) => {
    setOthersEquivalentScore(e.target.value);
    if (e.target.value === "") {
      setOthersEquivalentScoreError(true);
    } else {
      setOthersEquivalentScoreError(false);
    }
  };
  // Others validation

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const testNameOptions = [
    {
      id: 1,
      name: "IELTS",
    },
    {
      id: 2,
      name: "DUOLINGO",
    },
    {
      id: 3,
      name: "TOEFL",
    },
    {
      id: 4,
      name: "FUNCTION SKILLS",
    },
    {
      id: 5,
      name: "GCSE",
    },
    {
      id: 6,
      name: "PEARSON",
    },
    {
      id: 7,
      name: "OTHER SCORE",
    },
  ];

  useEffect(() => {
    get(`Ielts/Index/${applicationStudentId}`).then((res) => {
      console.log(res);
      setIelts(res);
      setIeltsSpeaking(res?.speaking ? res?.speaking : 0);
      setIeltsReading(res?.reading ? res?.reading : 0);
      setIeltsWriting(res?.writing ? res?.writing : 0);
      setIeltsListening(res?.listening ? res?.listening : 0);
      res?.examDate
        ? setIeltsExamDate(moment(new Date(res?.examDate)).format("YYYY-MM-DD"))
        : setIeltsExamDate("");
      setLoading(false);
      setIeltsOverall(res?.overall ? res?.overall : 0);
      // setScoreInfo(res);
    });

    get(`Duolingo/Index/${applicationStudentId}`).then((res) => {
      setDuolingo(res);
      setLoading(false);
      setDuoLingoLiteracy(res?.leteracy ? res?.leteracy : 10);
      setDuoLingoComprehension(res?.comprehension ? res?.comprehension : 10);
      setDuoLingoConversation(res?.conversation ? res?.conversation : 10);
      setDuoLingoProduction(res?.production ? res?.production : 10);
      res?.examDate
        ? setDuolingoExamDate(
            moment(new Date(res?.examDate)).format("YYYY-MM-DD")
          )
        : setDuolingoExamDate(null);
      setDuolingoOverall(res?.overall ? res?.overall : 10);
      setDuolingoEquivalentScore(res?.ieltsEquivalent);
      // setScoreInfo(res);
    });

    get(`Toefl/Index/${applicationStudentId}`).then((res) => {
      setToefl(res);
      console.log(res, "oma");
      setLoading(false);
      setToeflSpeaking(res?.speaking ? res?.speaking : 0);
      setToeflReading(res?.reading ? res?.reading : 0);
      setToeflWriting(res?.writing ? res?.writing : 0);
      setToeflListening(res?.listening ? res?.listening : 0);
      res?.examDate
        ? setToeflExamDate(moment(new Date(res?.examDate)).format("YYYY-MM-DD"))
        : setToeflExamDate(null);
      setLoading(false);
      setToeflOverall(res?.overall ? res?.overall : 0);
      setToeflEquivalentScore(res?.ieltsEquivalent);
      // setScoreInfo(res);
    });

    get(`FunctionalSkill/Index/${applicationStudentId}`).then((res) => {
      setFunctions(res);
      setLoading(false);
      setFunctionSkillsSpeaking(res?.speaking ? res?.speaking : 0);
      setFunctionSkillsReading(res?.reading ? res?.reading : 0);
      setFunctionSkillsWriting(res?.writing ? res?.writing : 0);
      setFunctionSkillsListening(res?.listening ? res?.listening : 0);
      res?.examDate
        ? setFunctionSkillsExamDate(
            moment(new Date(res?.examDate)).format("YYYY-MM-DD")
          )
        : setFunctionSkillsExamDate(null);
      setLoading(false);
      setFunctionSkillsOverall(res?.overall ? res?.overall : 0);
      setFunctionSkillsEquivalentScore(res?.ieltsEquivalent);
    });

    get(`Gcse/Index/${applicationStudentId}`).then((res) => {
      setGcse(res);
      setLoading(false);
      setGCSEResult(res?.result ? res?.result : 1);
      setGCSEEquivalentScore(res?.ieltsEquivalent);
      // setScoreInfo(res);
    });

    get(`Pearson/Index/${applicationStudentId}`).then((res) => {
      setPearson(res);
      setLoading(false);
      setPEARSONResult(res?.result ? res?.result : 10);
      setPEARSONEquivalentScore(res?.ieltsEquivalent);
      // setScoreInfo(res);
    });

    get(`Other/Index/${applicationStudentId}`).then((res) => {
      setOthers(res);
      setLoading(false);
      // setScoreInfo(res);
      setOthersTestName(res?.testName);
      setOthersScoreOverall(res?.scoreOverall);
      setOthersEquivalentScore(res?.ieltsEquivalent);
    });
  }, [success, applicationStudentId]);

  const deleteEnglishTestScore = () => {
    if (value === 1) {
      setIelts({});
      setButtonStatus(true);
      setProgress(true);
      remove(`Ielts/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setUpdateIelts(false);
        setIelts({});
        setIeltsSpeaking(0);
        setIeltsSpeakingError(false);
        setIeltsReading(0);
        setIeltsReadingError(false);
        setIeltsWriting(0);
        setIeltsWritingError(false);
        setIeltsListening(0);
        setIeltsListeningError(false);
        setIeltsOverall(0);
        setIeltsOverallError(false);
        setDeleteModal(false);
      });
    } else if (value === 2) {
      setButtonStatus(true);
      setProgress(true);
      setDuolingo({});
      remove(`Duolingo/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDuolingo({});
        setUpdateDuolingo(false);
        setDuoLingoLiteracy(10);
        setDuoLingoLiteracyError(false);
        setDuoLingoComprehension(10);
        setDuoLingoComprehensionError(false);
        setDuoLingoConversation(10);
        setDuoLingoConversationError(false);
        setDuoLingoProduction(10);
        setDuoLingoProductionError(false);
        setDuolingoOverall(10);
        setDuolingoOverallError(false);
        setDeleteModal(false);
      });
    } else if (value === 3) {
      setProgress(true);
      setButtonStatus(true);
      remove(`Toefl/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setToefl({});
        setUpdateToefl(false);
        setDeleteModal(false);
        setSuccess(!success);
        setToeflSpeaking(0);
        setToeflSpeakingError(false);
        setToeflReading(0);
        setToeflReadingError(false);
        setToeflWriting(0);
        setToeflWritingError(false);
        setToeflListening(0);
        setToeflListeningError(false);
        setToeflOverall(0);
        setToeflOverallError(false);
      });
    } else if (value === 4) {
      setButtonStatus(true);
      setProgress(true);
      remove(`FunctionalSkill/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
        setFunctions({});
        setUpdateFunctions(false);
        setFunctionSkillsSpeaking(0);
        setFunctionSkillsSpeakingError(false);
        setFunctionSkillsReading(0);
        setFunctionSkillsReadingError(false);
        setFunctionSkillsWriting(0);
        setFunctionSkillsWritingError(false);
        setFunctionSkillsListening(0);
        setFunctionSkillsListeningError(false);
        setFunctionSkillsOverall(0);
        setFunctionSkillsOverallError(false);
      });
    } else if (value === 5) {
      setProgress(true);
      setButtonStatus(true);
      remove(`Gcse/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setGcse({});
        setUpdateGcse(false);
        setGCSEResult(1);
        setGCSEResultError(false);
        setGCSEEquivalentScore(0);
        setGCSEEquivalentScoreError(false);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value === 6) {
      setProgress(true);
      setButtonStatus(true);
      remove(`Pearson/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setPearson({});
        setUpdatePearson(false);
        setPEARSONResult(10);
        setPEARSONResultError(false);
        setPEARSONEquivalentScore(0);
        setPEARSONEquivalentScoreError(false);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value === 7) {
      setButtonStatus(true);
      setProgress(true);
      remove(`Other/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setOthers({});
        setUpdateOther(false);
        setOthersTestName("");
        setOthersTestNameError(false);
        setOthersScoreOverall(0);
        setOthersScoreOverallError(false);
        setOthersEquivalentScore(0);
        setOthersEquivalentScoreError(false);
        setDeleteModal(false);
        setSuccess(!success);
      });
    }
  };

  const addNewScore = () => {
    setIsQualifiacation(true);
    // setQualificationValue(1);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setSuccess(!success);
    setIsQualifiacation(false);
    setIeltsSpeaking(0);
    setIeltsSpeakingError(false);
    setIeltsReading(0);
    setIeltsReadingError(false);
    setIeltsWriting(0);
    setIeltsWritingError(false);
    setIeltsListening(0);
    setIeltsListeningError(false);
    setIeltsOverall(0);
    setIeltsOverallError(false);
    setDuoLingoLiteracy(10);
    setDuoLingoLiteracyError(false);
    setDuoLingoComprehension(10);
    setDuoLingoComprehensionError(false);
    setDuoLingoConversation(10);
    setDuoLingoConversationError(false);
    setDuoLingoProduction(10);
    setDuoLingoProductionError(false);
    setDuolingoOverall(10);
    setDuolingoOverallError(false);
    setToeflSpeaking(0);
    setToeflSpeakingError(false);
    setToeflReading(0);
    setToeflReadingError(false);
    setToeflWriting(0);
    setToeflWritingError(false);
    setToeflListening(0);
    setToeflListeningError(false);
    setToeflOverall(0);
    setToeflOverallError(false);
    setFunctionSkillsSpeaking(0);
    setFunctionSkillsSpeakingError(false);
    setFunctionSkillsReading(0);
    setFunctionSkillsReadingError(false);
    setFunctionSkillsWriting(0);
    setFunctionSkillsWritingError(false);
    setFunctionSkillsListening(0);
    setFunctionSkillsListeningError(false);
    setFunctionSkillsOverall(0);
    setFunctionSkillsOverallError(false);
    setGCSEResult(1);
    setGCSEResultError(false);
    setGCSEEquivalentScore(0);
    setGCSEEquivalentScoreError(false);
    setPEARSONResult(10);
    setPEARSONResultError(false);
    setPEARSONEquivalentScore(0);
    setPEARSONEquivalentScoreError(false);
    setOthersTestName("");
    setOthersTestNameError(false);
    setOthersScoreOverall(0);
    setOthersScoreOverallError(false);
    setOthersEquivalentScore(0);
    setOthersEquivalentScoreError(false);
  };

  const toggleDanger = (info, elt, number) => {
    setValue(number);
    console.log(number);
    console.log(info);
    setData(info);
    setEltName(elt);
    setDeleteModal(true);
    setModalOpen(false);
  };

  // const toggleDanger2 = (p) => {
  //   setDeleteModal2(true);
  // };

  // const toggleDanger3 = (p) => {
  //   setDeleteModal3(true);
  // };

  const qualificationOptions = testNameOptions?.map((qual) => ({
    label: qual.name,
    value: qual.id,
  }));

  //  select  Student type
  const selectQualification = (label, value) => {
    setTestError(false);
    setELQualificationLabel(label);
    ELsetQualificationValue(value);

    setModalOpen(true);
  };

  const handleEditIelts = (data) => {
    setModalOpen(true);
    setELQualificationLabel("IELTS");
    ELsetQualificationValue(1);
    setUpdateIelts(true);
  };

  const handleEditDuolingo = (data) => {
    setModalOpen(true);
    setELQualificationLabel("DUOLINGO");
    ELsetQualificationValue(2);
    setUpdateDuolingo(true);
  };

  const handleEditToefl = (data) => {
    setModalOpen(true);
    setELQualificationLabel("TOEFL");
    ELsetQualificationValue(3);
    setUpdateToefl(true);
  };

  const handleEditFunctions = (data) => {
    setModalOpen(true);
    setELQualificationLabel("FUNCTION SKILLS");
    ELsetQualificationValue(4);
    setUpdateFunctions(true);
  };

  const handleEditGcse = (data) => {
    setModalOpen(true);
    setELQualificationLabel("GCSE");
    ELsetQualificationValue(5);
    setUpdateGcse(true);
  };

  const handleEditPearson = (data) => {
    setModalOpen(true);
    setELQualificationLabel("PEARSON");
    ELsetQualificationValue(6);
    setUpdatePearson(true);
  };

  const handleEditOthers = (data) => {
    setModalOpen(true);
    setELQualificationLabel("OTHER SCORE");
    ELsetQualificationValue(7);
    setUpdateOther(true);
  };

  const FormIELTSValid = () => {
    var validation = true;
    if (ieltsSpeaking === "" || ieltsSpeaking <= 0 || ieltsSpeaking > 9) {
      validation = false;
      setIeltsSpeakingError(true);
    }
    if (ieltsReading === "" || ieltsReading <= 0 || ieltsReading > 9) {
      validation = false;
      setIeltsReadingError(true);
    }
    if (ieltsWriting === "" || ieltsWriting <= 0 || ieltsWriting > 9) {
      validation = false;
      setIeltsWritingError(true);
    }
    if (ieltsListening === "" || ieltsListening <= 0 || ieltsListening > 9) {
      validation = false;
      setIeltsListeningError(true);
    }

    if (!new Date(ieltsExamDate).getDate()) {
      validation = false;
      setIeltsExamDateError("Exam Date is required");
    }

    if (ieltsOverall === "" || ieltsOverall <= 0 || ieltsOverall > 9) {
      validation = false;
      setIeltsOverallError(true);
    }

    return validation;
  };

  const FormDuolingoValid = () => {
    var validation = true;
    if (duolingoLiteracy < 10 || duolingoLiteracy > 160) {
      validation = false;
      setDuoLingoLiteracyError(true);
    }
    if (duolingoComprehension < 10 || duolingoComprehension > 160) {
      validation = false;
      setDuoLingoComprehensionError(true);
    }
    if (duolingoConversation < 10 || duolingoConversation > 160) {
      validation = false;
      setDuoLingoConversationError(true);
    }
    if (duolingoProduction < 10 || duolingoProduction > 160) {
      validation = false;
      setDuoLingoProductionError(true);
    }
    if (!new Date(duolingoExamDate).getDate()) {
      validation = false;
      setDuolingoExamDateError("Date of Exam is required");
    }
    if (duolingoOverall < 10 || duolingoOverall > 160) {
      validation = false;
      setDuolingoOverallError(true);
    }
    if (!duolingoEquivalentScore) {
      validation = false;
      setDuolingoEquivalentScoreError(true);
    }
    return validation;
  };

  const FormToeflValid = () => {
    var validation = true;

    if (ToeflSpeaking < 0 || ToeflSpeaking > 30) {
      validation = false;
      setToeflSpeakingError(true);
    }
    if (ToeflReading < 0 || ToeflReading > 30) {
      validation = false;
      setToeflReadingError(true);
    }
    if (ToeflWriting < 0 || ToeflWriting > 30) {
      validation = false;
      setToeflWritingError(true);
    }
    if (ToeflListening < 0 || ToeflListening > 30) {
      validation = false;
      setToeflListeningError(true);
    }

    if (!new Date(ToeflExamDate).getDate()) {
      validation = false;
      setToeflExamDateError("Exam Date are required");
    }

    if (ToeflOverall < 0 || ToeflOverall > 120) {
      validation = false;
      setToeflOverallError(true);
    }

    if (!ToeflEquivalentScore) {
      validation = false;
      setToeflEquivalentScoreError(true);
    }

    return validation;
  };

  const FormFunctionSkillsValid = () => {
    var validation = true;

    if (FunctionSkillsSpeaking < 0 || FunctionSkillsSpeaking > 90) {
      validation = false;
      setFunctionSkillsSpeakingError(true);
    }
    if (FunctionSkillsReading < 0 || FunctionSkillsReading > 90) {
      validation = false;
      setFunctionSkillsReadingError(true);
    }
    if (FunctionSkillsWriting < 0 || FunctionSkillsWriting > 90) {
      validation = false;
      setFunctionSkillsWritingError(true);
    }
    if (FunctionSkillsListening < 0 || FunctionSkillsListening > 90) {
      validation = false;
      setToeflListeningError(true);
    }

    if (!new Date(FunctionSkillsExamDate).getDate()) {
      validation = false;
      setFunctionSkillsExamDateError(null);
    }

    if (FunctionSkillsOverall < 0 || FunctionSkillsOverall > 90) {
      validation = false;
      setFunctionSkillsOverallError(true);
    }

    if (!FunctionSkillsEquivalentScore) {
      validation = false;
      setFunctionSkillsEquivalentScoreError(true);
    }

    return validation;
  };

  const FormGCSEValid = () => {
    var validation = true;

    if (GCSEResult < 1 || GCSEResult > 9) {
      validation = false;
      setGCSEResultError(true);
    }
    if (!GCSEEquivalentScore) {
      validation = false;
      setGCSEEquivalentScoreError(true);
    }

    return validation;
  };

  const FormPEARSONValid = () => {
    var validation = true;

    if (PEARSONResult < 10 || PEARSONResult > 90) {
      validation = false;
      setPEARSONResultError(true);
    }
    if (!PEARSONEquivalentScore) {
      validation = false;
      setPEARSONEquivalentScoreError(true);
    }

    return validation;
  };

  const FormOthersValid = () => {
    var validation = true;

    if (!OthersTestName) {
      validation = false;
      setOthersTestNameError(true);
    }
    if (!OthersScoreOverall) {
      validation = false;
      setOthersScoreOverallError(true);
    }
    if (!OthersEquivalentScore) {
      validation = false;
      setOthersEquivalentScoreError(true);
    }

    return validation;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    // console.log(setData.get("speaking"));
    if (ELqualificationLabel === "IELTS") {
      const isValid = FormIELTSValid();
      if (isValid === true) {
        if (!updateIelts) {
          setButtonStatus(true);
          setProgress(true);
          post("Ielts/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);

            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Ielts/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateIelts(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "DUOLINGO") {
      const isValid = FormDuolingoValid();
      if (isValid === true) {
        if (!updateDuolingo) {
          setButtonStatus(true);
          setProgress(true);
          post("Duolingo/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Duolingo/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateDuolingo(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "TOEFL") {
      const isValid = FormToeflValid();
      if (isValid === true) {
        if (!updateToefl) {
          setButtonStatus(true);
          setProgress(true);
          post("Toefl/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Toefl/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateToefl(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "FUNCTION SKILLS") {
      const isValid = FormFunctionSkillsValid();
      if (isValid === true) {
        if (!updateFunctions) {
          setButtonStatus(true);
          setProgress(true);
          post("FunctionalSkill/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("FunctionalSkill/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateFunctions(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "GCSE") {
      const isValid = FormGCSEValid();
      if (isValid === true) {
        if (!updateGcse) {
          setButtonStatus(true);
          setProgress(true);
          post("Gcse/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Gcse/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateGcse(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "PEARSON") {
      const isValid = FormPEARSONValid();
      if (isValid === true) {
        if (!updatePearson) {
          setButtonStatus(true);
          setProgress(true);
          post("Pearson/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Pearson/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdatePearson(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else if (ELqualificationLabel === "OTHER SCORE") {
      const isValid = FormOthersValid();
      if (isValid === true) {
        if (!updateOther) {
          setButtonStatus(true);
          setProgress(true);
          post("Other/Create", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          setProgress(true);
          put("Other/Update", subData).then((res) => {
            setButtonStatus(false);
            setProgress(false);
            if (res?.status === 200 && res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setSuccess(!success);
              // setAdd(false);
              setELQualificationLabel("Select");
              // setQualificationValue(0);
              // setQualificationLabel("NO");
              // setQualificationValue(0);
              setModalOpen(false);
              setIsQualifiacation(false);
              setUpdateOther(false);
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        }
      }
    } else {
    }
  };

  // const testSignleOptions = testOptions?.map((test) => ({
  //   label: test.name,
  //   value: test.id,
  // }));

  // //  select  quakification type
  // const selectQualificationType = (label, value) => {
  //   setQualificationLabel(label);
  //   setQualificationValue(value);

  //   //
  // };

  // Gre data update

  return (
    <div>
      <BreadCrumb
        title="English Language & Test Score"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      <StudentNavigation
        activetab={"6"}
        studentid={applicationStudentId}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      {loading ? (
        <div className="text-center">
          <img src={loadingImages} alt="" />
        </div>
      ) : (
        <>
          <Card>
            <CardBody>
              <p className="section-title">English Test Score</p>
              {!(
                ielts !== null ||
                duolingo !== null ||
                toefl !== null ||
                functions !== null ||
                gcse !== null ||
                pearson !== null ||
                others !== null
              ) ? (
                <div>
                  <span>
                    {" "}
                    <span className="text-danger">*</span>
                    Do You Hold an English Language Qualification Such as GCSE
                    English Language, IELTS, Pearson etc ?
                  </span>
                </div>
              ) : null}

              {!(
                ielts !== null ||
                duolingo !== null ||
                toefl !== null ||
                functions !== null ||
                gcse !== null ||
                pearson !== null ||
                others !== null
              ) ? (
                <FormGroup>
                  <div className="d-flex m-1 align-items-center">
                    <input
                      type="radio"
                      value="Yes"
                      onClick={() => setIsQualifiacation(true)}
                      checked={isQualification === true && true}
                    />
                    <label className="mt-2 px-2">Yes</label>
                    <input
                      type="radio"
                      value="No"
                      onClick={() => setIsQualifiacation(false)}
                      checked={isQualification === false && true}
                    />
                    <label className="mt-2 px-2">No</label>
                  </div>
                </FormGroup>
              ) : null}

              <AllScoresCard
                addNewScore={addNewScore}
                eltName={eltName}
                isQualification={isQualification}
                ielts={ielts}
                handleEditDuolingo={handleEditDuolingo}
                handleEditFunctions={handleEditFunctions}
                handleEditGcse={handleEditGcse}
                handleEditIelts={handleEditIelts}
                handleEditPearson={handleEditPearson}
                toggleDanger={toggleDanger}
                handleDate={handleDate}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deleteEnglishTestScore={deleteEnglishTestScore}
                buttonStatus={buttonStatus}
                progress={progress}
                duolingo={duolingo}
                functions={functions}
                pearson={pearson}
                gcse={gcse}
                handleEditToefl={handleEditToefl}
                toefl={toefl}
                handleEditOthers={handleEditOthers}
                others={others}
              ></AllScoresCard>

              {isQualification === true ? (
                <>
                  <FormGroup>
                    <Row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>English Language
                          Qualification
                        </span>
                        <Select
                          className="form-mt"
                          options={qualificationOptions}
                          value={{
                            label: ELqualificationLabel,
                            value: ELqualificationValue,
                          }}
                          onChange={(opt) =>
                            selectQualification(opt.label, opt.value)
                          }
                          name="examType"
                          id="examType"
                          required
                        />
                        <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                          Please Select The Type Of English Language
                          Qualification
                        </span>

                        {testError && (
                          <span className="text-danger">
                            Enlish language test is required{" "}
                          </span>
                        )}
                      </Col>
                    </Row>
                  </FormGroup>
                </>
              ) : null}

              <br />

              {modalOpen === true && (
                <div>
                  <Form onSubmit={handleSubmit}>
                    <div>
                      {ELqualificationLabel === "IELTS" ? (
                        <p className="section-title">
                          English Test Score: IELTS
                        </p>
                      ) : ELqualificationLabel === "TOEFL" ? (
                        <p className="section-title">
                          English Test Score: TOEFL
                        </p>
                      ) : ELqualificationLabel === "DUOLINGO" ? (
                        <p className="section-title">
                          English Test Score: DUOLINGO
                        </p>
                      ) : ELqualificationLabel === "FUNCTION SKILLS" ? (
                        <p className="section-title">
                          English Test Score: FUNCTION SKILLS
                        </p>
                      ) : ELqualificationLabel === "GCSE" ? (
                        <p className="section-title">
                          English Test Score: GCSE
                        </p>
                      ) : ELqualificationLabel === "PEARSON" ? (
                        <p className="section-title">
                          English Test Score: PEARSON
                        </p>
                      ) : ELqualificationLabel === "OTHER SCORE" ? (
                        <p className="section-title">
                          English Test Score: OTHER SCORE
                        </p>
                      ) : ELqualificationLabel === "PTE SCORE" ? (
                        <p className="section-title">
                          English Test Score: PTE SCORE
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    {ELqualificationLabel === "IELTS" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateIelts ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={ielts?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Speaking
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="speaking"
                                id="speaking"
                                step="any"
                                onChange={(e) => {
                                  handleIeltsSpeaking(e);
                                }}
                                Value={ieltsSpeaking}
                                min="0"
                              />

                              {ieltsSpeakingError && (
                                <span className="text-danger">
                                  IELTS Speaking is required. Must be 0 to 9
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Reading
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="reading"
                                id="reading"
                                step="any"
                                onChange={(e) => {
                                  handleIeltsReading(e);
                                }}
                                defaultValue={ieltsReading}
                                min="0"
                              />
                              {ieltsReadingError && (
                                <span className="text-danger">
                                  IELTS Reading is required. Must be 0 to 9
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Writing
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="writing"
                                id="writing"
                                step="any"
                                onChange={(e) => {
                                  handleIeltsWriting(e);
                                }}
                                defaultValue={ieltsWriting}
                                // defaultValue={updateIelts ? ielts?.writing : ""}
                                min="0"
                              />
                              {ieltsWritingError && (
                                <span className="text-danger">
                                  IELTS Writing is required. Must be 0 to 9
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Listening
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="listening"
                                id="listening"
                                step="any"
                                onChange={(e) => {
                                  handleIeltsListening(e);
                                }}
                                defaultValue={ieltsListening}
                                min="0"
                              />
                              {ieltsListeningError && (
                                <span className="text-danger">
                                  IELTS Listening is required. Must be 0 to 9
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Exam Date
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="date"
                                name="examDate"
                                id="examDate"
                                onChange={(e) => {
                                  handleIeltsExamDate(e);
                                }}
                                defaultValue={ieltsExamDate}
                                min={minDate}
                              />
                              <span className="text-danger">
                                {ieltsExamDateError && (
                                  <span className="text-danger">
                                    {ieltsExamDateError}
                                  </span>
                                )}
                              </span>
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Overall
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="overall"
                                id="overall"
                                step="any"
                                defaultValue={ieltsOverall}
                                min="0"
                                onChange={(e) => {
                                  handleIeltsOverall(e);
                                }}
                              />
                              {ieltsOverallError && (
                                <span className="text-danger">
                                  IELTS Overall is required. Must be 5 to 9
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "TOEFL" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateToefl ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={toefl?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Speaking
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="speaking"
                                id="speaking"
                                step="any"
                                onChange={(e) => {
                                  handToeflSpeaking(e);
                                }}
                                value={ToeflSpeaking}
                                min="0"
                              />
                              {ToeflSpeakingError && (
                                <span className="text-danger">
                                  Toefl Speaking is required. Must be 0 to 30
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Reading
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="reading"
                                id="reading"
                                step="any"
                                onChange={(e) => {
                                  handleToeflReading(e);
                                }}
                                value={ToeflReading}
                                min="0"
                              />
                              {ToeflReadingError && (
                                <span className="text-danger">
                                  Toefl Reading is required. Must be 0 to 30
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Writing
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="writing"
                                id="writing"
                                step="any"
                                onChange={(e) => {
                                  handleToeflWriting(e);
                                }}
                                value={ToeflWriting}
                                min="0"
                              />
                              {ToeflWritingError && (
                                <span className="text-danger">
                                  Toefl Writing is required. Must be 0 to 30
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Listening
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="listening"
                                id="listening"
                                step="any"
                                onChange={(e) => {
                                  handleToeflListening(e);
                                }}
                                value={ToeflListening}
                                min="0"
                              />
                              {ToeflListeningError && (
                                <span className="text-danger">
                                  Toefl Listening is required. Must be 0 to 30
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Exam Date
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="date"
                                name="examDate"
                                id="examDate"
                                onChange={(e) => {
                                  handleToeflExamDate(e);
                                }}
                                value={ToeflExamDate}
                              />
                              <span className="text-danger">
                                {ToeflExamDateError && (
                                  <span className="text-danger">
                                    {ToeflExamDateError}
                                  </span>
                                )}
                              </span>
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Overall
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="overall"
                                id="overall"
                                step="any"
                                onChange={(e) => {
                                  handleToeflOverall(e);
                                }}
                                value={ToeflOverall}
                                min="0"
                              />
                              {ToeflOverallError && (
                                <span className="text-danger">
                                  Toefl Overall is required. Must be 0 to 120
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handleToeflEquivalentScore(e);
                                }}
                                value={ToeflEquivalentScore}
                                min="0"
                              />
                              {ToeflEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "FUNCTION SKILLS" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateFunctions ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={functions?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Speaking
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="speaking"
                                id="speaking"
                                step="any"
                                onChange={(e) => {
                                  handFunctionSkillsSpeaking(e);
                                }}
                                value={FunctionSkillsSpeaking}
                                min="0"
                              />
                              {FunctionSkillsSpeakingError && (
                                <span className="text-danger">
                                  Function Skills Speaking is required. Must be
                                  0 to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Reading
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="reading"
                                id="reading"
                                step="any"
                                onChange={(e) => {
                                  handleFunctionSkillsReading(e);
                                }}
                                value={FunctionSkillsReading}
                                min="0"
                              />
                              {FunctionSkillsReadingError && (
                                <span className="text-danger">
                                  Function Skills Reading is required. Must be 0
                                  to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Writing
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="writing"
                                id="writing"
                                step="any"
                                onChange={(e) => {
                                  handleFunctionSkillsWriting(e);
                                }}
                                value={FunctionSkillsWriting}
                                min="0"
                              />
                              {FunctionSkillsWritingError && (
                                <span className="text-danger">
                                  Function Skills Writing is required. Must be 0
                                  to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Listening
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="listening"
                                id="listening"
                                step="any"
                                onChange={(e) => {
                                  handleFunctionSkillsListening(e);
                                }}
                                value={FunctionSkillsListening}
                                min="0"
                              />
                              {FunctionSkillsListeningError && (
                                <span className="text-danger">
                                  Function Skills Listening is required. Must be
                                  0 to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Exam Date
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="date"
                                name="examDate"
                                id="examDate"
                                onChange={(e) => {
                                  handleFunctionSkillsExamDate(e);
                                }}
                                value={FunctionSkillsExamDate}
                              />
                              {FunctionSkillsExamDateError && (
                                <span className="text-danger">
                                  {FunctionSkillsExamDateError}
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Overall
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="overall"
                                id="overall"
                                step="any"
                                onChange={(e) => {
                                  handleFunctionSkillsOverall(e);
                                }}
                                value={FunctionSkillsOverall}
                                min="0"
                              />
                              {FunctionSkillsOverallError && (
                                <span className="text-danger">
                                  Function Skills Overall is required. Must be 0
                                  to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handleFunctionSkillsEquivalentScore(e);
                                }}
                                value={FunctionSkillsEquivalentScore}
                                min="0"
                              />
                              {FunctionSkillsEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "GCSE" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateGcse ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={gcse?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Result
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="result"
                                id="result"
                                step="any"
                                onChange={(e) => {
                                  handleGCSEResult(e);
                                }}
                                value={GCSEResult}
                                min="0"
                              />

                              {GCSEResultError && (
                                <span className="text-danger">
                                  GCSE result is required.Grade Must be 1 to 9
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handleGCSEEquivalentScore(e);
                                }}
                                value={GCSEEquivalentScore}
                                min="0"
                              />
                              {GCSEEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "PEARSON" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updatePearson ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={pearson?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Result
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="result"
                                id="result"
                                step="any"
                                onChange={(e) => {
                                  handlePEARSONResult(e);
                                }}
                                value={PEARSONResult}
                                min="0"
                              />
                              {PEARSONResultError && (
                                <span className="text-danger">
                                  PEARSON Result is required. Must be 10 to 90
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handlePEARSONEquivalentScore(e);
                                }}
                                value={PEARSONEquivalentScore}
                                min="0"
                              />
                              {PEARSONEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "DUOLINGO" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateDuolingo ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={duolingo?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Literacy
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="leteracy"
                                id="leteracy"
                                step="any"
                                defaultValue={duolingoLiteracy}
                                onChange={(e) => {
                                  handleDuolingoLiteracy(e);
                                }}
                              />
                              {duolingoLiteracyError && (
                                <span className="text-danger">
                                  Duolingo Literacy is required. Must be 10 to
                                  160
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Comprehension
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="comprehension"
                                id="comprehension"
                                step="any"
                                onChange={(e) => {
                                  handleDuolingoComprehension(e);
                                }}
                                defaultValue={duolingoComprehension}
                                min="0"
                              />
                              {duolingoComprehensionError && (
                                <span className="text-danger">
                                  Duolingo Comprehension is required. Must be 10
                                  to 160
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Conversation
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="conversation"
                                id="conversation"
                                step="any"
                                onChange={(e) => {
                                  handleDuolingoConversation(e);
                                }}
                                defaultValue={duolingoConversation}
                                min="0"
                              />
                              {duolingoConversationError && (
                                <span className="text-danger">
                                  Duolingo Conversation is required. Must be 10
                                  to 160
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Production
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="production"
                                id="production"
                                step="any"
                                onChange={(e) => {
                                  handleDuolingoProduction(e);
                                }}
                                defaultValue={duolingoProduction}
                              />
                              {duolingoProductionError && (
                                <span className="text-danger">
                                  Duolingo Production is required. Must be 10 to
                                  160
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Exam Date
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="date"
                                name="examDate"
                                id="examDate"
                                onChange={(e) => {
                                  handleDuolingoExamDate(e);
                                }}
                                defaultValue={duolingoExamDate}
                              />
                              <span className="text-danger">
                                {duolingoExamDateError}
                              </span>
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Overall
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="overall"
                                id="overall"
                                step="any"
                                onChange={(e) => {
                                  handleDuolingoOverall(e);
                                }}
                                value={duolingoOverall}
                              />
                              {duolingoOverallError && (
                                <span className="text-danger">
                                  Duolingo Overall is required. Must be 10 to
                                  160
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handleDuolingoEquivalentScore(e);
                                }}
                                value={duolingoEquivalentScore}
                                min="0"
                              />
                              {duolingoEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    {ELqualificationLabel === "OTHER SCORE" && (
                      <>
                        <input
                          type="hidden"
                          name="studentId"
                          id="studentId"
                          value={applicationStudentId}
                        />

                        {updateOther ? (
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={others?.id}
                          />
                        ) : null}

                        <Row>
                          <Col lg="6" md="8">
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Test Name
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="text"
                                name="testName"
                                id="testName"
                                onChange={(e) => {
                                  handleOthersTestName(e);
                                }}
                                value={OthersTestName}
                              />
                              {OthersTestNameError && (
                                <span className="text-danger">
                                  Test Name is required.
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                Score Overall
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="scoreOverall"
                                id="scoreOverall"
                                step="any"
                                onChange={(e) => {
                                  handleScoreOverall(e);
                                }}
                                value={OthersScoreOverall}
                                min="0"
                              />
                              {OthersScoreOverallError && (
                                <span className="text-danger">
                                  Score Overall is required.
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                {" "}
                                IELTS Equivalent Score
                                <span className="text-danger">*</span>{" "}
                              </span>

                              <Input
                                type="number"
                                name="ieltsEquivalent"
                                id="ieltsEquivalent"
                                step="any"
                                onChange={(e) => {
                                  handleOthersEquivalentScore(e);
                                }}
                                value={OthersEquivalentScore}
                                min="0"
                              />
                              {OthersEquivalentScoreError && (
                                <span className="text-danger">
                                  IELTS Equivalent Score is required.
                                </span>
                              )}
                            </FormGroup>
                            <FormGroup className="text-right">
                              <CancelButton cancel={closeModal} />
                              <SaveButton
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Form>
                </div>
              )}

              <hr />

              <GREScore applicationStudentId={applicationStudentId} />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default TestScore;
