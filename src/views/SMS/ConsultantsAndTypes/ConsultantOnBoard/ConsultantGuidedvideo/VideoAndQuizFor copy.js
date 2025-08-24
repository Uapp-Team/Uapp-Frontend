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
import put from "../../../../../helpers/put";
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
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);
  const [consultantModal, setConsultantModal] = useState(false);
  const [videoQuizModal, setVideoQuizModal] = useState(false);
  const [activeStep, setActiveStep] = useState("consultant");
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoTitleError, setVideoTitleError] = useState("");

  // Debug effect to track video title changes
  useEffect(() => {
    console.log("Video title state changed:", videoTitle);
  }, [videoTitle]);
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
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  console.log(currentQuestionNumber, "currentquestionnumber");
  const [blobUrl, setBlobUrl] = useState(null);
  const [blobName, setBlobName] = useState(null);

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
      setBranchLabel(res?.data?.branchName);
      setBranchValue(res?.data?.branchId);
      setCountryLabel(res?.data?.countryName);
      setCountryValue(res?.data?.countryId);
      setHomeAccept(res?.data?.isAcceptHome);
      setUkAccept(res?.data?.isAcceptEU_UK);
      setIntAccept(res?.data?.isAcceptInternational);

      // Ensure video title is properly set with fallback options
      const title = res?.data?.videoTitle || res?.data?.VideoTitle || "";
      if (title && title.trim()) {
        setVideoTitle(title);
        console.log("Setting video title from API:", title);
      } else {
        console.warn("No video title found in API response");
        // Don't clear existing video title if API doesn't have one
        if (!videoTitle || !videoTitle.trim()) {
          console.log("Current video title is empty, keeping it empty");
        }
      }

      // setVideoFile(res?.data?.blobUrl);
      setVideoUrl(res?.data?.blobUrl);
      setBlobName(res?.data?.blobName || "");

      // Load existing questions if editing (API response includes questions)
      if (res?.data?.questions && res.data.questions.length > 0) {
        console.log("Raw API questions:", res.data.questions);

        const formattedQuestions = res.data.questions.map((q, index) => {
          console.log(`Processing question ${index}:`, q);
          console.log(`Question ${index} options:`, q.options);

          const formattedQuestion = {
            id: Date.now() + index, // Local ID for UI
            originalId: q.id, // Preserve original ID from API for update
            number: q.order || index + 1,
            question: q.question || "",
            answers:
              q.answers?.map((answer) => ({
                id: answer.id,
                text: answer.text,
                isCorrect: answer.isCorrect,
                order: answer.order,
              })) || [],
            detailedAnswer: "",
            timestamp: new Date().toISOString(),
          };

          // Handle options/answers with better null checking
          if (q.options && Array.isArray(q.options) && q.options.length > 0) {
            formattedQuestion.answers = q.options.map((opt, optIndex) => {
              console.log(
                `Processing option ${optIndex} for question ${index}:`,
                opt
              );
              return {
                id: Date.now() + optIndex, // Local ID for UI
                originalId: opt.id, // Preserve original ID from API for update
                text: opt.text || "",
                isCorrect: opt.isCorrect || false,
                isEditing: false,
              };
            });
          } else {
            console.warn(
              `Question ${index} has no options or invalid options:`,
              q.options
            );
          }

          console.log(`Formatted question ${index}:`, formattedQuestion);
          return formattedQuestion;
        });

        console.log("Final formatted questions:", formattedQuestions);
        setSavedQuestions(formattedQuestions);
        setCurrentQuestionNumber(formattedQuestions.length);
        console.log(formattedQuestions.length, "currentquestionnumber");
      }

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
      console.log("Guided video data fields:", Object.keys(res?.data || {}));
      console.log(
        "Is edit mode:",
        !!(res?.data?.id || res?.data?.onboardingQuizId)
      );
    });
  }, [success, id]);

  useEffect(() => {
    if (guidedVideoData?.videoImageUrl) {
      setFileList1([
        {
          uid: "-1",
          name: "",
          status: "done",
          url: guidedVideoData?.videoImageUrl,
        },
      ]);
    }
  }, [guidedVideoData]);

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
    } else {
      // If there's saved data, don't clear the form - let the API data take precedence
      console.log("Saved data exists, not clearing form");
    }
  }, []);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Only clear form data when component unmounts if not in edit mode
      // In edit mode, we want to preserve the data
      if (
        !guidedVideoData ||
        !(guidedVideoData.id || guidedVideoData.onboardingQuizId)
      ) {
        clearSavedFormData();
      }
    };
  }, [guidedVideoData]);

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

        // Enhanced video title restoration with logging
        if (parsedData.videoTitle) {
          setVideoTitle(parsedData.videoTitle);
          console.log(
            "Video title restored from localStorage:",
            parsedData.videoTitle
          );
        } else {
          console.log("No video title found in localStorage");
        }

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

      // Ensure video title is included and log it
      console.log("Saving video title to localStorage:", videoTitle);

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
    setBranchLabel("Select Branch");
    setBranchValue(0);
    setBranchError(false);
    setConsultantModal(false);
    setVideoQuizModal(false);
    setActiveStep("consultant");
    setHomeAccept(false);
    setUkAccept(false);
    setIntAccept(false);
    setAcceptError(false);
    setCountryLabel("Select Country");
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
    setCurrentQuestionNumber(0);
    setBlobUrl(null);

    // Clear localStorage
    clearSavedFormData();

    console.log("All form data cleared and reset to initial state");
  };

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
    console.log("Video title changed to:", data);

    if (data === "") {
      setVideoTitleError("Video title is required");
    } else {
      setVideoTitleError("");
    }

    // Save to localStorage immediately to prevent loss
    saveFormDataToMemory();
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
      prev.map((answer) =>
        answer.id === answerId
          ? { ...answer, isCorrect: !answer.isCorrect }
          : answer
      )
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
      alert("Please select at least one correct answer");
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
      number: savedQuestions.length + 1, // Use actual count instead of currentQuestionNumber
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

    // Update currentQuestionNumber to match the new count
    setCurrentQuestionNumber((prev) => prev + 1);

    // Save to localStorage
    saveFormDataToMemory();
  };

  const handleAddMoreQuestion = () => {
    // Show question form again
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (questionId) => {
    setSavedQuestions((prev) => {
      const filteredQuestions = prev.filter((q) => q.id !== questionId);
      // Reorder question numbers to ensure they are sequential and unique
      const reorderedQuestions = filteredQuestions.map((q, index) => ({
        ...q,
        number: index + 1,
      }));

      // Update currentQuestionNumber to match the new count
      setCurrentQuestionNumber(reorderedQuestions.length + 1);

      return reorderedQuestions;
    });
    saveFormDataToMemory();
  };

  const handleEditQuestion = (questionId) => {
    const questionToEdit = savedQuestions.find((q) => q.id === questionId);
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setAnswers(questionToEdit.answers || []);
      setDetailedAnswer(questionToEdit.detailedAnswer || "");
      setIsQuestionEditing(true);
      setEditingQuestionId(questionId);
      setShowQuestionForm(true);
    }
  };

  const handleUpdateQuestion = () => {
    if (!question.trim()) {
      setQuestionError("Question is required");
      return;
    }

    const hasCorrectAnswer = answers.some((answer) => answer.isCorrect);
    if (!hasCorrectAnswer) {
      alert("Please select at least one correct answer");
      return;
    }

    const hasAnswers = answers.some((answer) => answer.text.trim());
    if (!hasAnswers) {
      alert("Please provide at least one answer");
      return;
    }

    const updatedQuestion = {
      id: editingQuestionId,
      number:
        savedQuestions.find((q) => q.id === editingQuestionId)?.number ||
        savedQuestions.length + 1,
      question: question,
      answers: answers.filter((answer) => answer.text.trim()),
      detailedAnswer: detailedAnswer,
      timestamp: new Date().toISOString(),
    };

    setSavedQuestions((prev) =>
      prev.map((q) => (q.id === editingQuestionId ? updatedQuestion : q))
    );

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
    setEditingQuestionId(null);

    // Hide question form
    setShowQuestionForm(false);

    // Update currentQuestionNumber to match the new count
    setCurrentQuestionNumber((prev) => prev + 1);

    // Save to localStorage
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
          setBlobName(res?.data?.data?.blobName);
          console.log("Blob URL extracted:", res.data.data.blobUrl);
          console.log("Blob URL extracted:", res.data.data.blobName);
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

    // Enhanced video title validation
    if (!videoTitle || !videoTitle.trim()) {
      setVideoTitleError("Video title is required");
      isValid = false;
      console.error("Video title validation failed:", {
        videoTitle,
        type: typeof videoTitle,
      });
    } else {
      setVideoTitleError("");
      console.log("Video title validation passed:", videoTitle);
    }

    // In edit mode, video file is not required if we already have a video
    const isEditMode =
      guidedVideoData &&
      (guidedVideoData.id || guidedVideoData.onboardingQuizId);
    if (!videoFile && !isEditMode) {
      setVideoFileError("Video file is required");
      isValid = false;
    }

    return isValid;
  };

  // Helper function to log question structure for debugging
  const logQuestionStructure = (questions, context) => {
    console.log(`=== ${context} ===`);
    questions.forEach((q, index) => {
      console.log(`Question ${index}:`, {
        id: q.originalId || "NEW",
        text: q.question,
        order: q.number,
        answersCount: q.answers?.length || 0,
        answers: q.answers?.map((a) => ({
          id: a.originalId || "NEW",
          text: a.text,
          isCorrect: a.isCorrect,
          order: a.order,
        })),
      });
    });
    console.log(`=== End ${context} ===`);
  };

  const handleSubmitQuizFor = (event) => {
    event.preventDefault();

    // Debug current state before validation
    console.log("Current state before validation:", {
      videoTitle,
      videoTitleType: typeof videoTitle,
      videoTitleLength: videoTitle ? videoTitle.length : 0,
      guidedVideoData,
      isEditMode: !!(
        guidedVideoData &&
        (guidedVideoData.id || guidedVideoData.onboardingQuizId)
      ),
    });

    if (ValidateFormQuizFor()) {
      // Save form data to memory and navigate
      handleVideoQuizContinue();
      event.preventDefault();

      // Check if this is an edit operation (guidedVideoData has an id or onboardingQuizId)
      const isEditMode =
        guidedVideoData &&
        (guidedVideoData.id || guidedVideoData.onboardingQuizId);

      if (isEditMode) {
        // Update operation - use PUT API
        handleUpdateQuizFor();
      } else {
        // Create operation - use POST API
        handleCreateQuizFor();
      }
    } else {
      console.error("Form validation failed");
    }
  };

  const handleCreateQuizFor = () => {
    const subData = new FormData();
    if (branchValue !== 0) {
      subData.append("BranchId", branchValue);
    }
    if (countryValue !== 0) {
      subData.append("CountryId", countryValue);
    }
    subData.append("VideoTitle", videoTitle);
    if (blobUrl) {
      subData.append("BlobUrl", blobName);
    }
    // Only append ImageFile if there's a new file
    if (FileList1[0]?.originFileObj) {
      subData.append("ImageFile", FileList1[0]?.originFileObj);
    }
    subData.append("IsAcceptHome", homeAccept.toString());
    subData.append("IsAcceptEU_UK", ukAccept.toString());
    subData.append("IsAcceptInternational", intAccept.toString());

    // Add quiz questions and answers to FormData
    if (savedQuestions && savedQuestions.length > 0) {
      // Validate questions before sending
      const validQuestions = savedQuestions.filter((question, index) => {
        if (!question.question || question.question.trim() === "") {
          console.warn(`Question ${index} has no text, skipping`);
          return false;
        }

        if (!question.answers || question.answers.length === 0) {
          console.warn(`Question ${index} has no answers, skipping`);
          return false;
        }

        // Check if at least one answer is marked as correct
        const hasCorrectAnswer = question.answers.some(
          (answer) => answer.isCorrect === true
        );
        if (!hasCorrectAnswer) {
          console.warn(`Question ${index} has no correct answer, skipping`);
          return false;
        }

        // Validate each answer
        const validAnswers = question.answers.filter((answer) => {
          if (!answer.text || answer.text.trim() === "") {
            console.warn(
              `Question ${index} has answer with no text, skipping answer`
            );
            return false;
          }
          return true;
        });

        if (validAnswers.length === 0) {
          console.warn(
            `Question ${index} has no valid answers, skipping question`
          );
          return false;
        }

        // Update the question with only valid answers
        question.answers = validAnswers;

        return true;
      });

      console.log(
        `Valid questions to send: ${validQuestions.length}/${savedQuestions.length}`
      );

      // Log the question structure for debugging
      logQuestionStructure(validQuestions, "CREATE REQUEST");

      if (validQuestions.length === 0) {
        addToast(
          "No valid questions to submit. Please ensure all questions have text and at least one correct answer.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
        return;
      }

      validQuestions.forEach((question, questionIndex) => {
        console.log(`Processing question ${questionIndex}:`, question);

        // Add question text and order
        subData.append(
          `Questions[${questionIndex}].text`,
          question.question.trim()
        );
        subData.append(
          `Questions[${questionIndex}].order`,
          question.number || questionIndex + 1
        );
        console.log(
          `Added question text: Questions[${questionIndex}].text = ${question.question.trim()}`
        );
        console.log(
          `Added question order: Questions[${questionIndex}].order = ${
            question.number || questionIndex + 1
          }`
        );

        // Add question options/answers
        if (question.answers && question.answers.length > 0) {
          question.answers.forEach((answer, answerIndex) => {
            console.log(
              `Processing answer ${answerIndex} for question ${questionIndex}:`,
              answer
            );

            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].text`,
              answer.text.trim()
            );
            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].order`,
              (answerIndex + 1).toString()
            );
            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].isCorrect`,
              answer.isCorrect.toString()
            );

            console.log(
              `Added answer: Questions[${questionIndex}].options[${answerIndex}].text = ${answer.text.trim()}`
            );
            console.log(
              `Added answer order: Questions[${questionIndex}].options[${answerIndex}].order = ${(
                answerIndex + 1
              ).toString()}`
            );
            console.log(
              `Added answer correctness: Questions[${questionIndex}].options[${answerIndex}].isCorrect = ${answer.isCorrect.toString()}`
            );
          });
        }
      });
    }

    // Log FormData contents for debugging
    console.log("FormData contents for create:");
    console.log("=== FormData Entries ===");
    for (let [key, value] of subData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("=== End FormData Entries ===");

    // Additional validation before sending
    const formDataEntries = Array.from(subData.entries());
    const questionFields = formDataEntries.filter(([key]) =>
      key.startsWith("Questions[")
    );

    console.log("Question fields being sent:", questionFields);

    if (questionFields.length === 0) {
      addToast("No question data found. Please check your form.", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    post("ConsultantOnboarding/Submit", subData)
      .then((res) => {
        console.log("Create API response:", res);

        if (res?.data?.isSuccess === true) {
          addToast(res?.data?.title || "Submission successful", {
            appearance: "success",
            autoDismiss: true,
          });

          // Clear form data from localStorage after successful submission
          clearSavedFormData();
          console.log("Form data cleared after successful submission");
          history.push(`/consultant-Onboardings`);
        } else {
          // Handle error case with more details
          console.error("Submission failed - Full response:", res);
          console.error("Submission failed - Response data:", res?.data);
          console.error("Submission failed - Status:", res?.status);
          console.error("Submission failed - Status text:", res?.statusText);

          const errorMessage =
            res?.data?.message || res?.data?.title || "Submission failed";
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((error) => {
        console.error("Create API error:", error);
        addToast("Submission failed due to network error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const normalizeQuestionOrder = (questions) => {
    return questions.map((question, index) => ({
      ...question,
      number: index + 1,
    }));
  };

  const handleUpdateQuizFor = () => {
    const subData = new FormData();
    subData.append("OnboardingQuizId", guidedVideoData?.id);
    if (branchValue !== null) {
      subData.append("BranchId", branchValue);
    }
    if (countryValue !== null) {
      subData.append("CountryId", countryValue);
    }
    subData.append("IsAcceptHome", homeAccept.toString());
    subData.append("IsAcceptEU_UK", ukAccept.toString());
    subData.append("IsAcceptInternational", intAccept.toString());
    subData.append("VideoTitle", guidedVideoData?.videoTitle);
    console.log(blobName, "last check blob");

    subData.append(
      "BlobUrl",
      blobName === null ? guidedVideoData?.blobName : blobName
    );
    subData.append("VideoImage", guidedVideoData.videoImage);
    if (FileList1[0]?.originFileObj) {
      subData.append("ImageFile", FileList1[0]?.originFileObj);
    }

    // Add quiz questions and answers to FormData
    // Since savedQuestions already contains both API questions and new questions, we can use them directly
    const allQuestions = [...(savedQuestions || [])];
    console.log("All questions to be sent:", allQuestions);

    // Debug: Check each question's answers
    allQuestions.forEach((q, index) => {
      console.log(`Question ${index} (ID: ${q.originalId}):`, {
        text: q.question,
        answersCount: q.answers ? q.answers.length : 0,
        answers: q.answers,
      });
    });

    // Validate questions before sending
    const validQuestions = allQuestions.filter((question, index) => {
      if (!question.question || question.question.trim() === "") {
        console.warn(`Question ${index} has no text, skipping`);
        return false;
      }

      if (!question.answers || question.answers.length === 0) {
        console.warn(`Question ${index} has no answers, skipping`);
        return false;
      }

      // Check if at least one answer is marked as correct
      const hasCorrectAnswer = question.answers.some(
        (answer) => answer.isCorrect === true
      );
      if (!hasCorrectAnswer) {
        console.warn(`Question ${index} has no correct answer, skipping`);
        return false;
      }

      // Validate each answer
      const validAnswers = question.answers.filter((answer) => {
        if (!answer.text || answer.text.trim() === "") {
          console.warn(
            `Question ${index} has answer with no text, skipping answer`
          );
          return false;
        }
        return true;
      });

      if (validAnswers.length === 0) {
        console.warn(
          `Question ${index} has no valid answers, skipping question`
        );
        return false;
      }

      // Update the question with only valid answers
      question.answers = validAnswers;

      return true;
    });

    // Normalize question order numbers to ensure they are unique and sequential
    const normalizedQuestions = normalizeQuestionOrder(validQuestions);

    console.log(
      `Valid questions to send: ${normalizedQuestions.length}/${allQuestions.length}`
    );

    // Log the question structure for debugging
    logQuestionStructure(normalizedQuestions, "UPDATE REQUEST");

    // Now append all valid questions to FormData
    if (normalizedQuestions && normalizedQuestions.length > 0) {
      normalizedQuestions.forEach((question, questionIndex) => {
        console.log(`Processing question ${questionIndex}:`, question);

        // Add question ID if it exists (for editing existing questions)
        if (question.originalId) {
          subData.append(`Questions[${questionIndex}].id`, question.originalId);
          console.log(
            `Added question ID: Questions[${questionIndex}].id = ${question.originalId}`
          );
        }

        // Add question text and order
        subData.append(
          `Questions[${questionIndex}].text`,
          question.question.trim()
        );
        subData.append(
          `Questions[${questionIndex}].order`,
          question.number // Use the normalized order number
        );
        console.log(
          `Added question text: Questions[${questionIndex}].text = ${question.question.trim()}`
        );
        console.log(
          `Added question order: Questions[${questionIndex}].order = ${question.number}`
        );

        // Add question options/answers
        if (question.answers && question.answers.length > 0) {
          question.answers.forEach((answer, answerIndex) => {
            console.log(
              `Processing answer ${answerIndex} for question ${questionIndex}:`,
              answer
            );

            // Add answer ID if it exists (for editing existing answers)
            if (answer.originalId) {
              subData.append(
                `Questions[${questionIndex}].options[${answerIndex}].id`,
                answer.originalId
              );
              console.log(
                `Added answer ID: Questions[${questionIndex}].options[${answerIndex}].id = ${answer.originalId}`
              );
            }

            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].text`,
              answer.text.trim()
            );
            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].order`,
              (answerIndex + 1).toString()
            );
            subData.append(
              `Questions[${questionIndex}].options[${answerIndex}].isCorrect`,
              answer.isCorrect.toString()
            );

            console.log(
              `Added answer: Questions[${questionIndex}].options[${answerIndex}].text = ${answer.text.trim()}`
            );
            console.log(
              `Added answer order: Questions[${questionIndex}].options[${answerIndex}].order = ${(
                answerIndex + 1
              ).toString()}`
            );
            console.log(
              `Added answer correctness: Questions[${questionIndex}].options[${answerIndex}].isCorrect = ${answer.isCorrect.toString()}`
            );
          });
        }
      });
    } else {
      addToast(
        "No valid questions to update. Please ensure all questions have text and at least one correct answer.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      return;
    }

    // Log FormData contents for debugging
    console.log("FormData contents for update:");
    console.log("=== FormData Entries ===");
    for (let [key, value] of subData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("=== End FormData Entries ===");

    // Additional validation before sending
    const formDataEntries = Array.from(subData.entries());
    const questionFields = formDataEntries.filter(([key]) =>
      key.startsWith("Questions[")
    );

    console.log("Question fields being sent:", questionFields);

    if (questionFields.length === 0) {
      addToast("No question data found. Please check your form.", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    put("ConsultantOnboarding/Update", subData)
      .then((res) => {
        console.log("Update API response:", res);

        if (res?.data?.isSuccess === true) {
          addToast(res?.data?.title || "Update successful", {
            appearance: "success",
            autoDismiss: true,
          });

          clearSavedFormData();
          console.log("Form data cleared after successful update");
          history.push(`/consultant-Onboardings`);
        } else {
          // Handle error case with more details
          console.error("Update failed - Full response:", res);
          console.error("Update failed - Response data:", res?.data);
          console.error("Update failed - Status:", res?.status);
          console.error("Update failed - Status text:", res?.statusText);

          const errorMessage =
            res?.data?.message || res?.data?.title || "Update failed";
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((error) => {
        console.error("Update API error:", error);
        addToast("Update failed due to network error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const ValidateFormVideoFor = () => {
    var isValid = true;

    // Validate branch selection
    if (branchLabel === "Select Branch") {
      isValid = false;
      setBranchError(true);
    }

    // Validate country selection
    if (countryLabel === "Select Country") {
      isValid = false;
      setCountryError(true);
    }

    // Validate recruitment type selection (at least one must be selected)
    if (homeAccept === false && ukAccept === false && intAccept === false) {
      isValid = false;
      setAcceptError(true);
    }

    // Clear all errors if validation passes
    if (isValid) {
      setBranchError(false);
      setCountryError(false);
      setAcceptError(false);
    }

    return isValid;
  };
  const handleSubmitVideoFor = (event) => {
    event.preventDefault();

    if (ValidateFormVideoFor()) {
      // Save form data to memory and navigate
      handleConsultantContinue();
    } else {
      // Show error message when validation fails
      addToast("Please fill in all required fields before continuing", {
        appearance: "error",
        autoDismiss: true,
      });
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
              setBranchLabel={setBranchLabel}
              branchValue={branchValue}
              setBranchValue={setBranchValue}
              selectBranch={selectBranch}
              branchError={branchError}
              setBranchError={setBranchError}
              countryName={countryName}
              countryLabel={countryLabel}
              countryValue={countryValue}
              setCountryError={setCountryError}
              setCountryValue={setCountryValue}
              setCountryLabel={setCountryLabel}
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
              blobUrl={blobUrl}
              blobName={blobName}
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
              existingThumbnail={guidedVideoData?.videoImage}
              apiQuestions={guidedVideoData?.questions}
              id={id}
              handleStepClick={handleStepClick}
              handleEditQuestion={handleEditQuestion}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoAndQuizFor;
