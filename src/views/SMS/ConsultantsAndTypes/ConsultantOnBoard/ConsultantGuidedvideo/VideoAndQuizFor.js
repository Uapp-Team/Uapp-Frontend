import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Select from "react-select";
import get from "../../../../../helpers/get";
import QuizAnswers from "./QuizAnswers";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import YourConsultantForm from "./YourConsultantForm";
import VideoQuizForm from "./VideoQuizForm";
import post from "../../../../../helpers/post";
import axios from "axios";
import { rootUrl } from "../../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router-dom";
import Uget from "../../../../../helpers/Uget";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";

const VideoAndQuizFor = () => {
  const history = useHistory();
  const { id } = useParams();
  const { addToast } = useToasts();
  const [guidedVideoData, setGuidedVideoData] = useState({});
  const [success, setSuccess] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const [consultantModal, setConsultantModal] = useState(false);
  const [videoQuizModal, setVideoQuizModal] = useState(false);
  const [activeStep, setActiveStep] = useState("consultant");
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoTitleError, setVideoTitleError] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileError, setVideoFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [FileList1, setFileList1] = useState([]);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [error, setError] = useState("");

  // Question and Answer states
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [isQuestionEditing, setIsQuestionEditing] = useState(false);
  const [answers, setAnswers] = useState([
    { id: 1, text: "", isCorrect: false, isEditing: false },
    { id: 2, text: "", isCorrect: false, isEditing: false },
    { id: 3, text: "", isCorrect: false, isEditing: false },
  ]);
  const [detailedAnswer, setDetailedAnswer] = useState("");
  const [detailedAnswerError, setDetailedAnswerError] = useState("");
  const [isDetailedAnswerExpanded, setIsDetailedAnswerExpanded] =
    useState(false);
  const [isDetailedAnswerEditing, setIsDetailedAnswerEditing] = useState(false);

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(true);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [blobUrl, setBlobUrl] = useState(null);

  const [statsData, setStatsData] = useState({
    questionCount: 0,
    isAcceptEU_UK: false,
    isAcceptHome: false,
    isAcceptInternational: false,
    isActive: false,
    branchName: "",
    branchId: 0,
    countryId: 0,
    videoTitle: "",
    countryName: "",
    videoImage: "",
    blobUrl: "",
  });
  console.log(statsData, "imad bro");

  const FORM_DATA_KEY = "consultantGuidedVideoFormData";

  useEffect(() => {
    Uget(`ConsultantOnboarding/GetVideoByQuizId/${id}`).then((res) => {
      setGuidedVideoData(res?.data);

      // Set stats data from API response
      if (res) {
        setStatsData({
          questionCount: res.data?.questionCount || 0,
          isAcceptEU_UK: res.data?.isAcceptEU_UK || false,
          isAcceptHome: res.data?.isAcceptHome || false,
          isAcceptInternational: res.data?.isAcceptInternational || false,
          isActive: res.data?.isActive || false,
          branchName: res.data?.branchName || "",
          branchId: res.data?.branchId || "",
          countryId: res.data?.countryId || "",
          countryName: res.data?.countryName || "",
          videoImage: res.data?.videoImage || "",
          blobUrl: res.data?.blobUrl || "",
        });

        console.log("Stats data set:", {
          questionCount: res.data?.questionCount || 0,
          isAcceptEU_UK: res.data?.isAcceptEU_UK || false,
          isAcceptHome: res.data?.isAcceptHome || false,
          isAcceptInternational: res.data?.isAcceptInternational || false,
          isActive: res.data?.isActive || false,
          branchName: res.data?.branchName || "",
          branchId: res.data?.branchId || "",
          countryId: res.data?.countryId || "",
          countryName: res.data?.countryName || "",
          videoImage: res.data?.videoImage || "",
          blobUrl: res.data?.blobUrl || "",
        });
      }

      console.log("Full API response:", res);
    });
  }, [success, id]);

  const toggleConsultantModal = () => setConsultantModal(!consultantModal);
  const toggleVideoQuizModal = () => setVideoQuizModal(!videoQuizModal);

  const handleStepClick = (step) => {
    setActiveStep(step);
    if (step === "consultant") {
      toggleConsultantModal();
    } else if (step === "videoQuiz") {
      toggleVideoQuizModal();
    }
  };

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    loadSavedFormData();
  }, []);

  // Additional effect to ensure clean form state when no saved data exists
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (!savedData) {
      // No saved data, ensure form is in clean state
      clearAllFormData();
    }
  }, []);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Clear form data when component unmounts to prevent stale data
      clearSavedFormData();
    };
  }, []);

  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const savedData = localStorage.getItem(FORM_DATA_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Restore form state from saved data
        if (parsedData.branchLabel) setBranchLabel(parsedData.branchLabel);
        if (parsedData.branchValue) setBranchValue(parsedData.branchValue);
        if (parsedData.countryLabel) setCountryLabel(parsedData.countryLabel);
        if (parsedData.countryValue) setCountryValue(parsedData.countryValue);
        if (parsedData.homeAccept !== undefined)
          setHomeAccept(parsedData.homeAccept);
        if (parsedData.ukAccept !== undefined) setUkAccept(parsedData.ukAccept);
        if (parsedData.intAccept !== undefined)
          setIntAccept(parsedData.intAccept);
        if (parsedData.videoTitle) setVideoTitle(parsedData.videoTitle);
        if (parsedData.blobUrl) setBlobUrl(parsedData.blobUrl);
        if (parsedData.question) setQuestion(parsedData.question);
        if (parsedData.answers) setAnswers(parsedData.answers);
        if (parsedData.detailedAnswer)
          setDetailedAnswer(parsedData.detailedAnswer);
        if (parsedData.savedQuestions)
          setSavedQuestions(parsedData.savedQuestions);
        if (parsedData.currentQuestionNumber)
          setCurrentQuestionNumber(parsedData.currentQuestionNumber);

        // Set form visibility based on whether there are saved questions
        if (parsedData.savedQuestions && parsedData.savedQuestions.length > 0) {
          setShowQuestionForm(false);
        }

        console.log("Form data loaded from localStorage:", parsedData);
      } else {
        // No saved data found, ensure form is in clean state
        clearAllFormData();
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
      // If there's an error loading data, clear the form
      clearAllFormData();
    }
  };

  // Save form data to localStorage
  const saveFormDataToMemory = () => {
    try {
      const formData = {
        branchLabel,
        branchValue,
        countryLabel,
        countryValue,
        homeAccept,
        ukAccept,
        intAccept,
        videoTitle,
        question,
        answers,
        detailedAnswer,
        savedQuestions,
        currentQuestionNumber,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
      console.log("Form data saved to localStorage:", formData);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  // Clear saved form data
  const clearSavedFormData = () => {
    try {
      localStorage.removeItem(FORM_DATA_KEY);
      console.log("Saved form data cleared");
    } catch (error) {
      console.error("Error clearing saved form data:", error);
    }
  };

  // Clear all form data and reset to initial state
  const clearAllFormData = () => {
    // Reset all state variables to initial values
    setBranchLabel("London office");
    setBranchValue(1);
    setBranchError(false);
    setConsultantModal(false);
    setVideoQuizModal(false);
    setActiveStep("consultant");
    setHomeAccept(false);
    setUkAccept(false);
    setIntAccept(false);
    setAcceptError(false);
    setCountryLabel("Country");
    setCountryValue(0);
    setCountryError(false);
    setVideoTitle("");
    setVideoTitleError("");
    setVideoFile(null);
    setVideoFileError("");
    setUploadProgress(0);
    setIsUploading(false);
    setVideoUrl(null);
    setShowVideoPlayer(false);
    setFileList1([]);
    setPreviewImage1("");
    setPreviewTitle1("");
    setPreviewVisible1(false);
    setError("");

    // Reset question and answer states
    setQuestion("");
    setQuestionError("");
    setIsQuestionEditing(false);
    setAnswers([
      { id: 1, text: "", isCorrect: false, isEditing: false },
      { id: 2, text: "", isCorrect: false, isEditing: false },
      { id: 3, text: "", isCorrect: false, isEditing: false },
    ]);
    setDetailedAnswer("");
    setDetailedAnswerError("");
    setIsDetailedAnswerExpanded(false);
    setIsDetailedAnswerEditing(false);

    // Reset saved questions and form visibility
    setSavedQuestions([]);
    setShowQuestionForm(true);
    setCurrentQuestionNumber(1);
    setBlobUrl(null);

    // Clear localStorage
    clearSavedFormData();

    console.log("All form data cleared and reset to initial state");
  };

  // Function to reset form manually (can be called from UI)
  const handleResetForm = () => {
    clearAllFormData();
    addToast("Form has been reset to initial state", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  // Handle continue button click for consultant form
  const handleConsultantContinue = () => {
    // Save form data to memory
    saveFormDataToMemory();

    // Navigate to video and quiz step
    setActiveStep("videoQuiz");

    // Show success message or toast
    console.log(
      "Consultant form data saved and navigating to Video & Quiz step"
    );
  };

  // Handle continue button click for video quiz form
  const handleVideoQuizContinue = () => {
    // Save form data to memory
    saveFormDataToMemory();

    // Navigate to consultant step (or wherever you want to go next)
    // setActiveStep("consultant");

    // Show success message or toast
    console.log("Video Quiz form data saved and navigating to Consultant step");
  };

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
      // res?.length === 1 && setBranchValue(res[0].id);
    });
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });
  }, []);

  // Cleanup video URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleFirstNameChange = (e) => {
    let data = e.target.value.trimStart();
    setVideoTitle(data);
    if (data === "") {
      setVideoTitleError("Video title is required");
    } else {
      setVideoTitleError("");
    }
  };

  // Question handlers
  const handleQuestionClick = () => {
    setIsQuestionEditing(true);
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    if (value.length > 150) {
      setQuestionError("Question cannot exceed 150 characters");
    } else {
      setQuestionError("");
    }
  };

  const handleQuestionKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsQuestionEditing(false);
      if (question.trim() === "") {
        setQuestionError("Question is required");
      } else {
        setQuestionError("");
      }
    }
  };

  const handleQuestionBlur = () => {
    setIsQuestionEditing(false);
    if (question.trim() === "") {
      setQuestionError("Question is required");
    } else {
      setQuestionError("");
    }
  };

  // Answer handlers
  const handleAnswerClick = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, isEditing: true } : answer
      )
    );
  };

  const handleAnswerChange = (answerId, value) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, text: value } : answer
      )
    );
  };

  const handleAnswerKeyPress = (e, answerId) => {
    if (e.key === "Enter") {
      const currentAnswer = answers.find((a) => a.id === answerId);
      if (currentAnswer && currentAnswer.text.trim() !== "") {
        // Save current answer
        setAnswers((prev) =>
          prev.map((answer) =>
            answer.id === answerId ? { ...answer, isEditing: false } : answer
          )
        );

        // Add new answer if this is the last one
        const lastAnswer = answers[answers.length - 1];
        if (answerId === lastAnswer.id) {
          const newAnswerId = lastAnswer.id + 1;
          setAnswers((prev) => [
            ...prev,
            {
              id: newAnswerId,
              text: "",
              isCorrect: false,
              isEditing: false,
            },
          ]);
        }
      }
    }
  };

  const handleAnswerBlur = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, isEditing: false } : answer
      )
    );
  };

  const handleCorrectAnswerChange = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) => ({
        ...answer,
        isCorrect: answer.id === answerId,
      }))
    );
  };

  const handleDetailedAnswerChange = (e) => {
    setDetailedAnswer(e.target.value);
    setDetailedAnswerError("");
  };

  const handleDetailedAnswerKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsDetailedAnswerEditing(false);
      if (detailedAnswer.trim() === "") {
        setDetailedAnswerError("Answer is required");
      } else {
        setDetailedAnswerError("");
      }
    }
  };

  const handleDetailedAnswerBlur = () => {
    setIsDetailedAnswerEditing(false);
    if (detailedAnswer.trim() === "") {
      setDetailedAnswerError("Answer is required");
    } else {
      setDetailedAnswerError("");
    }
  };

  const handleDetailedAnswerClick = () => setIsDetailedAnswerEditing(true);

  // New functions for managing questions
  const handleSaveQuestion = () => {
    // Validate question and answers
    if (!question.trim()) {
      setQuestionError("Question is required");
      return;
    }

    const hasCorrectAnswer = answers.some((answer) => answer.isCorrect);
    if (!hasCorrectAnswer) {
      alert("Please select a correct answer");
      return;
    }

    const hasAnswers = answers.some((answer) => answer.text.trim());
    if (!hasAnswers) {
      alert("Please provide at least one answer");
      return;
    }

    // Create new question object
    const newQuestion = {
      id: Date.now(),
      number: currentQuestionNumber,
      question: question,
      answers: answers.filter((answer) => answer.text.trim()),
      detailedAnswer: detailedAnswer,
      timestamp: new Date().toISOString(),
    };

    // Add to saved questions
    setSavedQuestions((prev) => [...prev, newQuestion]);

    // Reset form
    setQuestion("");
    setAnswers([
      { id: 1, text: "", isCorrect: false, isEditing: false },
      { id: 2, text: "", isCorrect: false, isEditing: false },
      { id: 3, text: "", isCorrect: false, isEditing: false },
    ]);
    setDetailedAnswer("");
    setQuestionError("");
    setIsQuestionEditing(false);
    setIsDetailedAnswerEditing(false);

    // Hide question form
    setShowQuestionForm(false);

    // Increment question number for next question
    setCurrentQuestionNumber((prev) => prev + 1);

    // Save to localStorage
    saveFormDataToMemory();
  };

  const handleAddMoreQuestion = () => {
    // Show question form again
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (questionId) => {
    setSavedQuestions((prev) => prev.filter((q) => q.id !== questionId));
    // Reorder question numbers
    setSavedQuestions((prev) =>
      prev.map((q, index) => ({ ...q, number: index + 1 }))
    );
    setCurrentQuestionNumber((prev) => Math.max(1, prev - 1));
    saveFormDataToMemory();
  };

  const handleVideoFileChange = (event) => {
    console.log(event.target.files, "event");

    const file = event.target.files[0];
    setVideoFile(file);
    setShowVideoPlayer(false);
    setVideoUrl(null);

    if (!file) {
      setVideoFileError("Video file is required");
    } else {
      // Check file type - only allow MP4 as that's what the server supports
      const allowedTypes = ["video/mp4"];
      const allowedExtensions = [".mp4"];

      // Check both MIME type and file extension
      const hasValidType = allowedTypes.includes(file.type);
      const hasValidExtension = allowedExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      );

      if (!hasValidType || !hasValidExtension) {
        setVideoFileError(
          "Please select a valid MP4 video file (.mp4 extension required)"
        );
        console.log("File validation failed:", {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          hasValidType,
          hasValidExtension,
        });
      } else {
        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
          setVideoFileError("Video file size should be less than 200MB");
        } else {
          setVideoFileError("");

          // Create video URL but don't show player yet
          const url = URL.createObjectURL(file);

          setVideoUrl(url);
          // Start actual video upload
          uploadVideo(file);
        }
      }
    }
  };

  const AuthStr = localStorage.getItem("token");

  const uploadVideo = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowVideoPlayer(false);
    const formData = new FormData();
    formData.append("VideoFile", file);

    axios
      .post(`${rootUrl}OnboardingVideo/UploadVideo`, formData, {
        headers: {
          authorization: AuthStr,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then((res) => {
        setUploadProgress(100);
        setIsUploading(false);
        setShowVideoPlayer(true);

        // Extract blobUrl from the API response
        if (res.data && res.data.data && res.data.data.blobUrl) {
          setBlobUrl(res.data.data.blobUrl);
          console.log("Blob URL extracted:", res.data.data.blobUrl);
        } else {
          console.warn("No blobUrl found in response:", res.data);
        }

        console.log("Video uploaded successfully:", res);
      })
      .catch((error) => {
        setIsUploading(false);

        if (error.response?.status === 415) {
          setVideoFileError(
            "Server rejected video format. Please ensure you're uploading an MP4 file."
          );
        } else {
          setVideoFileError("Failed to upload video. Please try again.");
        }
      });
  };
  const ValidateFormQuizFor = () => {
    var isValid = true;

    // if (
    //   userTypeId !== userTypes?.Consultant &&
    //   homeAccept === false &&
    //   ukAccept === false &&
    //   intAccept === false
    // ) {
    //   isValid = false;
    //   setAcceptError(true);
    // }

    if (!videoTitle.trim()) {
      setVideoTitleError("Video title is required");
      isValid = false;
    }

    if (!videoFile) {
      setVideoFileError("Video file is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmitQuizFor = (event) => {
    event.preventDefault();

    if (ValidateFormQuizFor()) {
      // Save form data to memory and navigate
      handleVideoQuizContinue();
      event.preventDefault();
      const subData = new FormData(event.target);
      subData.append("BranchId", branchValue);
      subData.append("CountryId", countryValue);
      subData.append("VideoTitle", videoTitle);
      if (blobUrl) {
        subData.append("BlobUrl", blobUrl);
      }
      subData.append("ImageFile", FileList1[0]?.originFileObj);
      subData.append("IsAcceptHome", homeAccept);
      subData.append("IsAcceptEU_UK", ukAccept);
      subData.append("IsAcceptInternational", intAccept);

      // Add quiz questions and answers to FormData
      if (savedQuestions && savedQuestions.length > 0) {
        savedQuestions.forEach((question, questionIndex) => {
          // Add question text and order
          subData.append(`Questions[${questionIndex}].text`, question.question);
          subData.append(`Questions[${questionIndex}].order`, question.number);

          // Add question options/answers
          if (question.answers && question.answers.length > 0) {
            question.answers.forEach((answer, answerIndex) => {
              subData.append(
                `Questions[${questionIndex}].options[${answerIndex}].text`,
                answer.text
              );
              subData.append(
                `Questions[${questionIndex}].options[${answerIndex}].order`,
                answerIndex + 1
              );
              subData.append(
                `Questions[${questionIndex}].options[${answerIndex}].isCorrect`,
                answer.isCorrect
              );
            });
          }
        });
      }

      post("ConsultantOnboarding/Submit", subData).then((res) => {
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });

        // Clear form data from localStorage after successful submission
        if (res?.data?.isSuccess === true) {
          clearSavedFormData();
          console.log("Form data cleared after successful submission");
        }

        history.push(`/consultantOnBoard`);
      });
    }
  };

  const ValidateFormVideoFor = () => {
    var isValid = true;

    // if (
    //   userTypeId !== userTypes?.Consultant &&
    //   homeAccept === false &&
    //   ukAccept === false &&
    //   intAccept === false
    // ) {
    //   isValid = false;
    //   setAcceptError(true);
    // }

    return isValid;
  };
  const handleSubmitVideoFor = (event) => {
    event.preventDefault();

    if (ValidateFormVideoFor()) {
      // Save form data to memory and navigate
      handleConsultantContinue();
    }
  };

  return (
    <div className="p-4">
      {/* Steps */}
      {/* <Form onSubmit={handleAllPart}>
      
      </Form> */}
      <Row>
        <Col md="3" sm="12">
          <h5 className="fw-bold mb-3">Consultant Guided video</h5>
          {/* Your Consultant Step */}
          <div
            className={`d-flex align-items-center p-4 cursor-pointer ${
              activeStep === "consultant" ? "click-bg-shadow" : ""
            }`}
            style={{
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleStepClick("consultant")}
          >
            {activeStep === "consultant" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "#0D9596",
                }}
              ></div>
            )}
            <div
              className={`d-flex align-items-center justify-content-center me-3 ${
                activeStep === "consultant" ? "text-black" : "text-muted"
              }`}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border:
                  activeStep === "consultant"
                    ? "2px solid black"
                    : "2px solid #dee2e6",
              }}
            >
              {activeStep === "consultant" ? (
                <i className="fas fa-check" style={{ fontSize: "12px" }}></i>
              ) : (
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#dee2e6",
                  }}
                ></div>
              )}
            </div>
            <h5
              className="fw-bold mt-1 ml-2"
              style={{
                color: activeStep === "consultant" ? "black" : "#6c757d",
              }}
            >
              Your Consultant
            </h5>
          </div>
          {/* Video and Quiz Step */}
          <div
            className={`d-flex align-items-center p-4 cursor-pointer ${
              activeStep === "videoQuiz" ? "click-bg-shadow" : ""
            }`}
            style={{
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleStepClick("videoQuiz")}
          >
            {activeStep === "videoQuiz" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "#0D9596",
                }}
              ></div>
            )}
            <div
              className={`d-flex align-items-center justify-content-center me-3 ${
                activeStep === "videoQuiz" ? "text-black" : "text-muted"
              }`}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border:
                  activeStep === "videoQuiz"
                    ? "2px solid black"
                    : "2px solid #dee2e6",
              }}
            >
              {activeStep === "videoQuiz" ? (
                <i className="fas fa-check" style={{ fontSize: "12px" }}></i>
              ) : (
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#dee2e6",
                  }}
                ></div>
              )}
            </div>
            <h5
              className="fw-bold mt-1 ml-2"
              style={{
                color: activeStep === "videoQuiz" ? "black" : "#6c757d",
              }}
            >
              Video and Quiz
            </h5>
          </div>
        </Col>
        <Col md="9" sm="12">
          {activeStep === "consultant" && (
            <YourConsultantForm
              handleSubmitVideoFor={handleSubmitVideoFor}
              branchOptions={branchOptions}
              branchLabel={branchLabel}
              branchValue={branchValue}
              selectBranch={selectBranch}
              branchError={branchError}
              countryName={countryName}
              countryLabel={countryLabel}
              countryValue={countryValue}
              selectCountry={selectCountry}
              countryError={countryError}
              homeAccept={homeAccept}
              setAcceptError={setAcceptError}
              setHomeAccept={setHomeAccept}
              intAccept={intAccept}
              setIntAccept={setIntAccept}
              ukAccept={ukAccept}
              setUkAccept={setUkAccept}
              acceptError={acceptError}
            />
          )}
          {activeStep === "videoQuiz" && (
            <VideoQuizForm
              handleSubmitQuizFor={handleSubmitQuizFor}
              handleFirstNameChange={handleFirstNameChange}
              videoTitle={videoTitle}
              videoTitleError={videoTitleError}
              handleVideoFileChange={handleVideoFileChange}
              videoFile={videoFile}
              videoFileError={videoFileError}
              showVideoPlayer={showVideoPlayer}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
              videoUrl={videoUrl}
              question={question}
              setQuestion={setQuestion}
              setIsQuestionEditing={setIsQuestionEditing}
              questionError={questionError}
              setQuestionError={setQuestionError}
              answers={answers}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              handleAnswerChange={handleAnswerChange}
              handleAnswerKeyPress={handleAnswerKeyPress}
              handleAnswerBlur={handleAnswerBlur}
              handleAnswerClick={handleAnswerClick}
              isDetailedAnswerEditing={isDetailedAnswerEditing}
              detailedAnswer={detailedAnswer}
              detailedAnswerError={detailedAnswerError}
              handleDetailedAnswerChange={handleDetailedAnswerChange}
              handleDetailedAnswerKeyPress={handleDetailedAnswerKeyPress}
              handleDetailedAnswerBlur={handleDetailedAnswerBlur}
              handleDetailedAnswerClick={handleDetailedAnswerClick}
              isQuestionEditing={isQuestionEditing}
              handleQuestionChange={handleQuestionChange}
              handleQuestionKeyPress={handleQuestionKeyPress}
              handleQuestionClick={handleQuestionClick}
              handleQuestionBlur={handleQuestionBlur}
              savedQuestions={savedQuestions}
              handleSaveQuestion={handleSaveQuestion}
              showQuestionForm={showQuestionForm}
              handleAddMoreQuestion={handleAddMoreQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
              currentQuestionNumber={currentQuestionNumber}
              FileList1={FileList1}
              setFileList1={setFileList1}
              previewImage1={previewImage1}
              setPreviewImage1={setPreviewImage1}
              setPreviewTitle1={setPreviewTitle1}
              previewTitle1={previewTitle1}
              previewVisible1={previewVisible1}
              setPreviewVisible1={setPreviewVisible1}
              error={error}
              setError={setError}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoAndQuizFor;
