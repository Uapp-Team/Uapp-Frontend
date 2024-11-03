import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/core/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastProvider } from "react-toast-notifications";
import "./assets/CoustomStyle/style.css";
import "./assets/CoustomStyle/pageView.css";
import AdmissionGetData from "./views/Test/AdmissionGetData";
import { permissionList } from "./constants/AuthorizationConstant";
import { userTypes } from "./constants/userTypeConstant";
import AssociateApplication from "./views/SMS/APPLICATION/Applications/Component/AssociateApplication.js";
import Navigation from "./views/SMS/Affiliate/AffiliateInformations/NavigationAndRegistration/Navigation.js";
// import CommissionSetting from "./views/SMS/Comission/CommisionSetting/CommissionSetting";

// Authentication Checking
const token = localStorage.getItem("token");
const permissions = JSON.parse(localStorage.getItem("permissions"));
const isAuth = token != null ? true : false;
const permission = JSON.parse(localStorage.getItem("current_user"));
const userTypeId = localStorage.getItem("userType");

// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);

const Roles = lazy(() => import("./views/SMS/Configuration/Roles/Roles.jsx"));
const Menu = lazy(() => import("./views/SMS/Configuration/Menu/Menu.jsx"));

const UnderProcessRolePermission = lazy(() =>
  import("./views/SMS/Configuration/Permissions/UnderProcessRolePermission")
);

const RoleMenu = lazy(() =>
  import("./views/SMS/Configuration/Menu/RoleMenu.jsx")
);
const EmployeeType = lazy(() =>
  import("./views/SMS/AllStaffs/StaffsType/Index.js")
);

// Role Categories
const RoleItems = lazy(() => import("./views/SMS/RoleCategories/RoleItems"));
const AddRole = lazy(() => import("./views/SMS/RoleCategories/AddRole"));
const EditRole = lazy(() => import("./views/SMS/RoleCategories/EditRole"));

// Provider Compliance

const ProviderComplianceRegistration = lazy(() =>
  import(
    "./views/SMS/AllStaffs/ProviderCompliance/StaffsAllInformation/NavigationAndRegister/StaffRegister"
  )
);

const ProviderComplianceGeneralInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/ProviderCompliance/StaffsAllInformation/GeneralInformation/Index"
  )
);

const ProviderCompliancePersonalInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/ProviderCompliance/StaffsAllInformation/PersonalInformation/Index"
  )
);

const ProviderComplianceContactInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/ProviderCompliance/StaffsAllInformation/ContactInformation/Index"
  )
);

const ProviderComplianceList = lazy(() =>
  import("./views/SMS/AllStaffs/ProviderCompliance/StaffsList/Index.js")
);
const ProviderComplianceProfile = lazy(() =>
  import("./views/SMS/AllStaffs/ProviderCompliance/StaffProfile/Index.js")
);

// Staff Pages

const StaffRegistration = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/NavigationAndRegister/StaffRegister"
  )
);

const StaffGeneralInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/GeneralInformation/Index"
  )
);

const StaffPersonalInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/PersonalInformation/Index"
  )
);

const StaffContactInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/ContactInformation/Index"
  )
);

const StaffEmergencyInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/EmergencyInformation/Index"
  )
);

const StaffEligibility = lazy(() =>
  import(
    "./views/SMS/AllStaffs/Staffs/StaffsAllInformation/EligibilityInformation/Index"
  )
);

const EmployeeList = lazy(() =>
  import("./views/SMS/AllStaffs/Staffs/StaffsList/Index.js")
);
const EmployeeProfile = lazy(() =>
  import("./views/SMS/AllStaffs/Staffs/StaffProfile/Index.js")
);
const AddUniversityType = lazy(() =>
  import("./views/SMS/SETTINGS/UniversityTypes/AddUniversityType.jsx")
);
const AddUniversityCountry = lazy(() =>
  import("./views/SMS/SETTINGS/UniversityCountries/AddUniversityCountry.jsx")
);
const AddUniversityState = lazy(() =>
  import("./views/SMS/University/AddUniversityState.jsx")
);
const AddUniversity = lazy(() =>
  import("./views/SMS/University/UniversityInformation/AddUniversity.js")
);
const AddUniversityRecruitmentType = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/AddUniversityRecruitmentType"
  )
);
const AddProviderUniversity = lazy(() =>
  import("./views/SMS/University/ProviderUniversity/AddProviderUniversity")
);
const AddProviderUniversityCampus = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityCampus"
  )
);
const AddProviderUniversityFinancial = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityFinancial"
  )
);
const AddProviderUniversityFeatures = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityFeatures"
  )
);
const AddProviderUniversityGallery = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityGallery"
  )
);
const AddProviderUniversityApplicationDocument = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityApplicationDocument"
  )
);
const AddProviderUniversityTemplateDocument = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityTemplateDocument"
  )
);
const AddProviderUniversityCommission = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityCommission"
  )
);

const AddProviderUniversityTestScore = lazy(() =>
  import(
    "./views/SMS/University/ProviderUniversity/AddProviderUniversityTestScore"
  )
);

const AddUniversityCampus = lazy(() =>
  import("./views/SMS/University/UniversityInformation/AddUniversityCampus.js")
);
const EditDepartment = lazy(() =>
  import("./views/SMS/UniversitySubjects/EditDepartment")
);
const EditSubDepartment = lazy(() =>
  import("./views/SMS/UniversitySubjects/EditSubDepartment")
);
const AddUniversityFinancial = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/AddUniversityFinancial.js"
  )
);
const AddUniversityFeaturesGallery = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/AddUniversityFeaturesGallery.js"
  )
);
const UniversityList = lazy(() =>
  import("./views/SMS/University/UniversityList.js")
);

const UniversityListForSharingFAQ = lazy(() =>
  import(
    "./views/SMS/UniversityInformationSharing&FAQ/UniversityListForSharingFAQ.js"
  )
);
const UniversityInformationDocumentsFAQ = lazy(() =>
  import(
    "./views/SMS/UniversityInformationSharing&FAQ/UniversityInformationDocumentsFAQ.js"
  )
);

const UsersAnswerForFAQ = lazy(() =>
  import(
    "./views/SMS/UniversityInformationSharing&FAQ/UsersAnswerForFaq/UsersAnswerForFAQ.js"
  )
);

const UniversityDetails = lazy(() =>
  import("./views/SMS/University/UniversityDetails.jsx")
);
const UniversityProfile = lazy(() =>
  import("./views/SMS/University/UniversityProfile/UniversityProfile")
);
const CampusList = lazy(() =>
  import("./views/SMS/University/Campus/CampusList.jsx")
);
const AddCampus = lazy(() =>
  import("./views/SMS/University/Campus/AddCampus.jsx")
);
const CampusInformation = lazy(() =>
  import("./views/SMS/University/Campus/CampusInformation/CampusInformation")
);
const CampusAssignSubject = lazy(() =>
  import("./views/SMS/University/Campus/CampusInformation/CampusAssignSubject")
);
const CampusSubjectIntake = lazy(() =>
  import("./views/SMS/University/Campus/CampusInformation/CampusSubjectIntake")
);
const CampusGallery = lazy(() =>
  import("./views/SMS/University/Campus/CampusInformation/CampusGallery")
);
const CampusDetails = lazy(() =>
  import("./views/SMS/University/CampusDetails/CampusDetails.jsx")
);
const AssignMultipleSubject = lazy(() =>
  import("./views/SMS/University/AssignMultipleSubject")
);
const CampusSubjectList = lazy(() =>
  import("./views/SMS/University/CampusSubjectList.jsx")
);
const AddUniversityGallery = lazy(() =>
  import("./views/SMS/University/UniversityInformation/AddUniversityGallery.js")
);
const AddUniversityTemplateDocument = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/AddUniversityTemplateDocument"
  )
);
const AddUniversityApplicationDocument = lazy(() =>
  import("./views/SMS/University/Extra/AddUniversityApplicationDocument")
);
const UniversityRecquiredDocument = lazy(() =>
  import("./views/SMS/University/UniversityRecquiredDocument")
);

// UNiversity Course Test Score
const AddUniversitySubjectTestScore = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectTestScore")
);

const AddUniversitySubjectIntake = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectIntake")
);

//Copy UNiversity Course Test Score
const CopyUniversitySubjectTestScore = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectTestScore"
  )
);
const CopyUniversitySubjectIntake = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectIntake"
  )
);

// intake
const Intake = lazy(() => import("./views/SMS/University/Intakes/Intake.js"));
const AddNewIntakes = lazy(() =>
  import("./views/SMS/University/Intakes/Component/AddNewIntakes.jsx")
);
const UpdateIntake = lazy(() =>
  import("./views/SMS/University/UpdateIntake.jsx")
);

// consultant

const Viewlogs = lazy(() =>
  import("./views/SMS/Dashboard/Pages/Consultant/Overview/Viewlogs")
);

const ConsultantLevel = lazy(() =>
  import("./views/SMS/ConsultantsAndTypes/ConsultantLevel/ConsultantLevel.js")
);

const GeneralInformationRegistration = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/NavigationAndRegistration/ConsultantRegistration"
  )
);
const GeneralInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/GeneralInformation/Index"
  )
);
const ConsultantPersonalInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/PersonalInformation/Index"
  )
);
const ConsultantContactInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/ContactInformation/Index"
  )
);
const ConsultantEmergencyInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/EmergencyInformation/Index"
  )
);
const EligibilityInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/EligibilityInformation/EligibilityInformation"
  )
);
const ConsultantBankDetails = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/ConsultantBankInformation/Index"
  )
);

const ConsultantRecruitmentInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/RecruitmentInformation/Index"
  )
);

const ConsultantCommissionInfo = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/CommissionInformation/Index"
  )
);

const ConsultantTermsInformation = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantAllInformation/TermsAndCondition/Index"
  )
);

const ConsultantNewDeclaration = lazy(() =>
  import("./views/SMS/ConsultantsAndTypes/ConsultantNewDeclaration.js")
);

const ConsultantList = lazy(() =>
  import("./views/SMS/ConsultantsAndTypes/ConsultantList/Index")
);

const BranchConsultantList = lazy(() =>
  import("./views/SMS/Branches/Branch/BranchConsultantList/Index.js")
);

const ConsultantDashboard = lazy(() =>
  import("./views/SMS/Consultant/ConsultantDashboard")
);

const ConsultantProfile = lazy(() =>
  import("./views/SMS/ConsultantsAndTypes/ConsultantProfile/Index")
);
const ParentConsultantProfile = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantProfile/ConsultantForParentProfile"
  )
);
const AdmissionManagerProfile = lazy(() =>
  import("./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerProfile/Index")
);

const AssociateDetails = lazy(() =>
  import(
    "./views/SMS/ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ConsultantDetails/AssociateDetails"
  )
);

const AssociateSelfProfile = lazy(() =>
  import("./views/SMS/Consultant/Associate/AssociateSelfProfile")
);

const ConsultantDetails = lazy(() =>
  import("./views/SMS/Consultant/ConsultantDetails")
);

const AdmissionManagerDetails = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerProfile/Components/AdmissionManagerDetailsAndTerms/Component/AdmissionManagerDetails"
  )
);

const TermsAndConditions = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/TermsAndCondition/Index.js"
  )
);

const AdmissionManagerTermsAndConditions = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerProfile/Components/AdmissionManagerDetailsAndTerms/Component/AdmissionManagerTermsAndConditions"
  )
);

const ConsultantTermAndConditionDetails = lazy(() =>
  import("./views/SMS/Consultant/ConsultantTermAndConditionDetails")
);
const AssociateProfile = lazy(() =>
  import("./views/SMS/Consultant/AssociateProfile")
);

const AddAssociate = lazy(() =>
  import("./views/SMS/Consultant/Associate/AssociateRegister")
);
const AddConsultantType = lazy(() =>
  import("./views/SMS/ConsultantsAndTypes/ConsultantTypes/Index")
);

const UpdateAssociateBankDetails = lazy(() =>
  import("./views/SMS/Consultant/UpdateAssociateBankDetails")
);

const UpdateAssociateCommission = lazy(() =>
  import("./views/SMS/Consultant/UpdateAssociateCommission")
);

const AssociateInformation = lazy(() =>
  import("./views/SMS/Consultant/AssociateInformation")
);
const AssociateList = lazy(() =>
  import("./views/SMS/Consultant/ConsultantByConsultant")
);
const ConsultantByAffiliate = lazy(() =>
  import("./views/SMS/Consultant/ConsultantByAffiliate")
);
const ConsultantByCompanion = lazy(() =>
  import("./views/SMS/Consultant/ConsultantByCompanion")
);
const AssociateAddSuccess = lazy(() =>
  import("./views/SMS/Consultant/AssociateAddSuccess")
);
const AffiliateAddSuccess = lazy(() =>
  import("./views/SMS/Consultant/AffiliateAddSuccess.js")
);
const CompanionAddSuccess = lazy(() =>
  import("./views/SMS/Consultant/CompanionAddSuccess.js")
);

// Documentnp
const DocumentList = lazy(() =>
  import("./views/SMS/SETTINGS/DocumentList/DocumentList.js")
);
const DocumentCategoryList = lazy(() =>
  import("./views/SMS/SETTINGS/DocumentCategoryList/DocumentCategoryList.js")
);

// Report
const AgentReport = lazy(() => import("./views/SMS/Report/AgentReport"));
const DailyReport = lazy(() => import("./views/SMS/Report/DailyReport"));
const IntakeRangeReport = lazy(() => import("./views/SMS/Report/Index"));
const ApplicationReport = lazy(() =>
  import("./views/SMS/Report/ApplicationReport")
);
const ProviderDailyReport = lazy(() =>
  import("./views/SMS/Report/ProviderDailyReport")
);

// Common Profile Component
const CommonProfile = lazy(() =>
  import("./views/SMS/CommonProfile/CommonProfile")
);

//Subject
const AddDepartment = lazy(() =>
  import("./views/SMS/UniversitySubjects/Department.jsx")
);

const Programs = lazy(() => import("./views/SMS/University/Programs/Programs"));

const ManageIntakes = lazy(() =>
  import("./views/SMS/University/ManageIntakes/ManageIntakes")
);

const AddSubDepartment = lazy(() =>
  import("./views/SMS/UniversitySubjects/SubDepartment.jsx")
);

const SubjectList = lazy(() =>
  import("./views/SMS/UniversitySubjects/SubjectList.jsx")
);
const DocumentGroup = lazy(() =>
  import("./views/SMS/SETTINGS/DocumentGroup/DocumentGroup.js")
);

const SubjectIntake = lazy(() =>
  import("./views/SMS/UniversitySubjects/SubjectIntake.jsx")
);
const SubjectProfile = lazy(() =>
  import("./views/SMS/UniversitySubjects/SubjectProfile.js")
);

// Settings
const Settings = lazy(() => import("./views/SMS/UserSettings/Settings"));

// university subject
const UniversitySubjectList = lazy(() =>
  import("./views/SMS/University/Subjects/UniversitySubjectList")
);
const AddUniversitySubject = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubject")
);
const AddUniversitySubjectFee = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectFee")
);
const AddUniversitySubjectDeliveryPattern = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectDeliveryPattern")
);
const AddUniversitySubjectRequirements = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectRequirements")
);
const AddUniversitySubjectDocumentRequirement = lazy(() =>
  import(
    "./views/SMS/University/Subjects/AddUniversitySubjectDocumentRequirement"
  )
);
const Subjectprofile = lazy(() =>
  import("./views/SMS/University/Subjects/Subjectprofile/Subjectprofile")
);
const AddUniversitySubjectAssignToCampus = lazy(() =>
  import("./views/SMS/University/Subjects/AddUniversitySubjectAssignToCampus")
);

// copy and save university subject
const CopyUniversitySubject = lazy(() =>
  import("./views/SMS/University/Subjects/CopySubject/CopyUniversitySubject")
);
const CopyUniversitySubjectFee = lazy(() =>
  import("./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectFee")
);
const CopyUniversitySubjectDeliveryPattern = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectDeliveryPattern"
  )
);
const CopyUniversitySubjectRequirements = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectRequirements"
  )
);
const CopyUniversitySubjectDocumentRequirement = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectDocumentRequirement"
  )
);
const CopyUniversitySubjectAssignToCampus = lazy(() =>
  import(
    "./views/SMS/University/Subjects/CopySubject/CopyUniversitySubjectAssignToCampus"
  )
);

// university profile subject
const AddUniProfileSubject = lazy(() =>
  import("./views/SMS/University/Extra/AddUniProfileSubject")
);
const AddUniProfileSubjectFee = lazy(() =>
  import("./views/SMS/University/Extra/AddUniProfileSubjectFee")
);
const AddUniProfileSubjectDeliveryPattern = lazy(() =>
  import("./views/SMS/University/Extra/AddUniProfileSubjectDeliveryPattern")
);
const AddUniProfileSubjectRequirements = lazy(() =>
  import("./views/SMS/University/Extra/AddUniProfileSubjectRequirements.js")
);
const AddUniProfileSubjectDocumentRequirement = lazy(() =>
  import("./views/SMS/University/Extra/AddUniProfileSubjectDocumentRequirement")
);

// country List
const AddCountry = lazy(() =>
  import("./views/SMS/SETTINGS/Country/AddCountry")
);

// State List
const AddState = lazy(() => import("./views/SMS/State/AddState"));

// City List
const AddCity = lazy(() => import("./views/SMS/SETTINGS/Cities/AddCity.js"));

// file upload
const FileUpload = lazy(() =>
  import("./views/SMS/UniversitySubjects/FileUpload.js")
);

// Applications
const Applications = lazy(() =>
  import("./views/SMS/APPLICATION/Applications/Applications.js")
);
const AssociatesApplications = lazy(() =>
  import(
    "./views/SMS/APPLICATION/Applications/Component/AssociateApplication.js"
  )
);

const BranchApplications = lazy(() =>
  import("./views/SMS/Branches/Branch/BranchApplicationList/Applications.js")
);

const ApplicationDetails = lazy(() =>
  import("./views/SMS/APPLICATION/ApplicationDetails/ApplicationDetails.js")
);

// const Pagination = lazy(() => import("./views/SMS/Pagination/Pagination.jsx"))

// const Login = lazy(() => import("./views/SMS/Login/Login.jsx"))

// Session Timeout Page
const SessionTimeOut = lazy(() => import("./views/SMS/Error/SessionTimeOut"));

const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);

const VerifyEmail = lazy(() =>
  import("./views/pages/authentication/VerifyEmail.js")
);

const lockScreen = lazy(() =>
  import("./views/pages/authentication/LockScreen")
);

const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword.js")
);

const StudentRegister = lazy(() =>
  import("./views/pages/authentication/register/StudentRegister")
);

const StudentAccountCreateSuccessfully = lazy(() =>
  import(
    "./views/pages/authentication/register/StudentAccountCreateSuccessfully"
  )
);
const ProviderAccountCreateSuccessfully = lazy(() =>
  import(
    "./views/pages/authentication/register/ProviderAccountCreateSuccessfully"
  )
);

const ConsultantAccountCreateSuccessfully = lazy(() =>
  import(
    "./views/pages/authentication/register/ConsultantAccountCreateSuccessfully"
  )
);

const AffiliateAccountCreateSuccessfully = lazy(() =>
  import(
    "./views/pages/authentication/register/AffiliateAccountCreateSuccessfully.js"
  )
);

const CompanionAccountCreateSuccessfully = lazy(() =>
  import(
    "./views/pages/authentication/register/CompanionAccountCreateSuccessfully.js"
  )
);

const ConsultantRegister = lazy(() =>
  import("./views/pages/authentication/register/ConsultantRegister")
);
const AffiliateRegister = lazy(() =>
  import("./views/pages/authentication/register/AffiliateRegister.js")
);
const CompanionRegister = lazy(() =>
  import("./views/pages/authentication/register/CompanionRegister.js")
);

const ProviderRegister = lazy(() =>
  import("./views/pages/authentication/register/ProviderRegister")
);
const accessControl = lazy(() =>
  import("./extensions/access-control/AccessControl")
);
const notFound = lazy(() => import("./views/pages/misc/error/404"));
const BadRequest = lazy(() => import("./views/pages/misc/error/400"));

const InternalServerError = lazy(() => import("./views/pages/misc/error/500"));

const NotAuthorized = lazy(() => import("./views/pages/misc/NotAuthorized"));

const Post = lazy(() => import("./views/SMS/CRUD/Post/Post"));
const Get = lazy(() => import("./views/SMS/CRUD/Get/Get"));
const Put = lazy(() => import("./views/SMS/CRUD/PUT/Put"));
const Delete = lazy(() => import("./views/SMS/CRUD/Delete/Delete"));
const ProviderForm = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAllInformation/ProviderRegistrationAndNavigation/ProviderForm.js"
  )
);

const ProviderAdminGeneralInfoReg = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderAdminRegistrationAndNavigation/ProviderAdminRegistration.js"
  )
);
const ProviderAdminGeneralInfo = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderGeneralInfo/ProviderGeneralInfo.js"
  )
);

const ProviderAdminPersonalInfo = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderAdminPersonalInfo/ProviderAdminPersonalInfo"
  )
);

const ProviderAdminContactInfo = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderAdminContactInfo/ProviderAdminContactInfo"
  )
);

const ProviderAdminEligibilityInfo = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderAdminEligibilityInfo/ProviderAdminEligibilityInfo"
  )
);

const ProviderAdminTermsAndCondition = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/DesignatedPersonAllInformation/ProviderAdminTermsAndCondition/ProviderAdminTermsAndCondition"
  )
);

const Login = lazy(() => import("./views/pages/authentication/login/Login"));

// const SessionExpired = lazy(() =>
//   import("./views/pages/authentication/login/SessionExpired")
// );

const MenuInfo = lazy(() => import("./views/SMS/Configuration/Menu/MenuInfo"));

const ProviderList = lazy(() => import("./views/SMS/Provider/ProviderList"));

const ProviderAdminProfileInfo = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAdmin/ProviderAdminProfile/ProviderAdminProfileInfo"
  )
);

const ProviderDetails = lazy(() =>
  import("./views/SMS/Provider/ProviderDetails/ProviderDetails")
);
const ProviderDashboard = lazy(() =>
  import("./views/SMS/Provider/ProviderDashboard")
);
const AssignUniversity = lazy(() =>
  import("./views/SMS/Provider/AssignUniversity")
);
const AssignOfficerUniversity = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/AssignOfficerUniversity"
  )
);
const UpdateProvider = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAllInformation/ProviderInformation/UpdateProvider"
  )
);

const AdminInformation = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAllInformation/AdminInformation/AdminInformation"
  )
);
const ProviderAddress = lazy(() =>
  import(
    "./views/SMS/Provider/ProviderAllInformation/ProviderAddress/ProviderAddress"
  )
);

const Branch = lazy(() => import("./views/SMS/Branches/Branch/Branch"));

const BranchManager = lazy(() =>
  import("./views/SMS/Branches/Manager/BranchManager")
);
const BranchManagerProfile = lazy(() =>
  import("./views/SMS/Branches/BranchManager/BranchManagerProfile")
);
const AddBranchManager = lazy(() =>
  import("./views/SMS/Branches/Manager/AddBranchManager")
);
const UpdateBranch = lazy(() =>
  import("./views/SMS/Branches/Branch/UpdateBranch")
);
const BranchList = lazy(() => import("./views/SMS/Branches/Branch/BranchList"));
const UpdateBranchManager = lazy(() =>
  import("./views/SMS/Branches/Manager/UpdateBranchManager")
);
const BranchProfile = lazy(() =>
  import("./views/SMS/Branches/Branch/BranchProfile")
);
const BranchEmployee = lazy(() =>
  import("./views/SMS/Branches/Employee/BranchEmployee")
);
const BranchManagerInformation = lazy(() =>
  import("./views/SMS/Branches/BranchManager/BranchManagerInformation")
);
const BranchTeamEmployeeInformation = lazy(() =>
  import("./views/SMS/Branches/BranchManager/BranchTeamEmployeeInformation")
);

const BranchConsultantRegistration = lazy(() =>
  import("./views/SMS/Branches/BranchConsultant/BranchConsultantRegistration")
);

// Compliance Officer
const ComplianceOfficerList = lazy(() =>
  import("./views/SMS/Branches/ComplianceOfficer/ComplianceOfficerList")
);
const AddComplianceOfficer = lazy(() =>
  import("./views/SMS/Branches/ComplianceOfficer/AddComplianceOfficer")
);
const ComplianceOfficerProfile = lazy(() =>
  import("./views/SMS/Branches/ComplianceOfficer/ComplianceOfficerProfile")
);

// Admission Manager

const AdmissionManagerRegister = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/NavigationAndRegister/AdmissionManagerRegister"
  )
);

const AdmissionManagerGeneralInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/GeneralInforamation/Index.js"
  )
);

const AdmissionManagerPersonalInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/PersonalInformation/Index.js"
  )
);

const AdmissionManagerContactInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/ContactInformation/Index.js"
  )
);

const AdmissionManagerEmergencyInformation = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/EmergencyInformation/Index.js"
  )
);

const AdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/AdmissionOfficer/Index.js"
  )
);

const AdmissionManagerEligibility = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionManager/AdmissionManagerAllInformation/EligibilityInformation/Index.js"
  )
);

const AdmissionManagerList = lazy(() =>
  import("./views/SMS/AllStaffs/AdmissionManager/AsmissionManagerList/Index.js")
);

const UniversityWiseAdmissionManager = lazy(() =>
  import("./views/SMS/Provider/AdmissionManager/UniversityWiseAdmissionManager")
);

const UniversityWiseAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/UniversityWiseAdmissionOfficer"
  )
);

const AdmissionManagerSubjects = lazy(() =>
  import("./views/SMS/Provider/AdmissionManager/AdmissionManagerSubjects")
);

const AdmissionOfficerSubjects = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/AdmissionOfficerWiseSubject"
  )
);

const AddNewAdmissionOfficerPage = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/AddNewAdmissionOfficerPage"
  )
);

const AdmissionOfficerAssignedSubjects = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/AdmissionOfficerWiseAssignedSubject"
  )
);

const AdmissionManagerAssignedSubjects = lazy(() =>
  import(
    "./views/SMS/Provider/AdmissionManager/AdmissionManagerWiseAssignedSubject"
  )
);

// Lead APP

const LeadDashboard = lazy(() =>
  import("./views/SMS/LeadApp/Dashboard/Dashboard.js")
);
const LeadList = lazy(() => import("./views/SMS/LeadApp/List/LeadList.js"));
const LeadSettings = lazy(() =>
  import("./views/SMS/LeadApp/Settings/Settings.js")
);
const LeadProfile = lazy(() =>
  import("./views/SMS/LeadApp/Profile/Profile.js")
);
const LeadConsultant = lazy(() =>
  import("./views/SMS/LeadApp/Consultant/Consultant.js")
);

// Student

const StudentList = lazy(() =>
  import("./views/SMS/STUDENT/StudentList/StudentList")
);
const LeadStudentList = lazy(() =>
  import("./views/SMS/LeadList/LeadStudentList.js")
);

const BranchStudentList = lazy(() =>
  import("./views/SMS/Branches/Branch/BranchStudentList/StudentList.js")
);

const StudentProfile = lazy(() =>
  import("./views/SMS/STUDENT/StudentProfile/StudentProfile")
);
const PersonalInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentPersonalInformation/PersonalInformation"
  )
);
const StudentCountryInformation = lazy(() =>
  import("./views/SMS/STUDENT/ExtraInformation/StudentCountryInformation")
);
const ContactInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentsContactInformation/ContactInformation"
  )
);
const EmergencyInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/EmergencyInformation/Index"
  )
);
const ApplicationInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentApplicationInformation/StudentApplicationInformation"
  )
);
const EducationalInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentEducationalInformation/EducationalInformation"
  )
);
const AddStudentRegister = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentNavigationAndRegister/StudentRegister"
  )
);
const AddExperience = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentExperienceInformation/Experience"
  )
);
const AddReference = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentReferenceInformation/Reference"
  )
);
const AddPersonalStatement = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentPersonalStatementInformation/PersonalStatement"
  )
);
const AddOtherInformation = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentOtherInformation/OtherInformation"
  )
);

const AddTestScore = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentTestScore/TestScore"
  )
);

const StudentNewDeclaration = lazy(() =>
  import("./views/SMS/STUDENT/StudentsAllInformation/StudentNewDeclaration.js")
);
const BulkCommissionGroup = lazy(() =>
  import("./views/SMS/COMISSIONS/BulkCommisionGroup/BulkCommissionGroup.js")
);

const StudentByConsultant = lazy(() =>
  import("./views/SMS/STUDENT/ExtraInformation/StudentByConsultant")
);

const StudentDashboard = lazy(() =>
  import("./views/SMS/Content/StudentDashboard.js")
);

// Education Level

const EducationLevelList = lazy(() =>
  import("./views/SMS/SETTINGS/EducationLevel/EducationLevelList")
);
// const AddEducationLevel = lazy(() => import("./views/SMS/EducationLevel/AddEducationLevel"))

// Degree

const DegreeList = lazy(() =>
  import("./views/SMS/SETTINGS/Degrees/DegreeList")
);
// const AddDegree = lazy(() => import("./views/SMS/Degree/AddDegree"))

// Seed Data

const SeedData = lazy(() => import("./views/SMS/Configuration/SeedData/Index"));

// Guidelines for newcomers to the website

const GuideLine = lazy(() => import("./views/SMS/Guideline/GuideLine"));

const UploadDocument = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentUploadDocuments/DocumentUpload"
  )
);

const ExamTestType = lazy(() =>
  import("./views/SMS/SETTINGS/ExamTestType/ExamTestType")
);

const UpdateUniversityInformation = lazy(() =>
  import("./views/SMS/University/UpdateUniversityInformation")
);

const StudentType = lazy(() =>
  import("./views/SMS/STUDENT/StudentType/StudentType.js")
);

// country

const CountryList = lazy(() =>
  import("./views/SMS/Configuration/Country/Country.js")
);

// Search

const Search = lazy(() => import("./views/SMS/Search/Search"));

// Comission
const AccountIntake = lazy(() =>
  import("./views/SMS/COMISSIONS/AccountIntake/AccountIntake")
);

const ComissionGroup = lazy(() =>
  import("./views/SMS/COMISSIONS/CommissionGroup/ComissionGroup")
);

const CommissionPriceList = lazy(() =>
  import("./views/SMS/COMISSIONS/CommissionPrice/CommissionPriceList")
);

const CommissionSetting = lazy(() =>
  import("./views/SMS/COMISSIONS/CommisionSetting/CommissionSetting")
);

const DesignationsCommissionList = lazy(() =>
  import("./views/SMS/COMISSIONS/Designations/DesignationsCommissionList")
);
const CommissionReport = lazy(() =>
  import("./views/SMS/COMISSIONS/Report/CommissionReport")
);
const DesignationReport = lazy(() =>
  import("./views/SMS/COMISSIONS/Report/DesignationReport")
);

// practice

const UpdateUser = lazy(() => import("./views/Test/UpdateUser"));

// Consultant Conscent

const AssociateConsent = lazy(() =>
  import("./views/SMS/Consultant/AssociateConsent")
);

// Student Declaration
const StudentDeclaration = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentTerms&ConditionsInformation/StudentDeclaration"
  )
);

// Branch Employee Profile Page
const BranchEmployeeProfile = lazy(() =>
  import("./views/SMS/Branches/Employee/EmployeeProfile")
);

const Nationality = lazy(() =>
  import("./views/SMS/SETTINGS/Nationality/Nationality")
);

const AdmissionManagerConditionalProfile = lazy(() =>
  import(
    "./views/SMS/Provider/AdmissionManager/AdmissionManagerConditionalProfile"
  )
);

const PromotionalCommissionList = lazy(() =>
  import(
    "./views/SMS/COMISSIONS/PromotionalCommissionList/PromotionalCommissionList"
  )
);

const DistributionLevelSetting = lazy(() =>
  import("./views/SMS/COMISSIONS/DistributionLevelSetting/Index")
);

const ApplicationTransaction = lazy(() =>
  import("./views/SMS/ACCOUNTS/ApplicationTransaction/Index")
);
const ApplicationTransactionDetails = lazy(() =>
  import("./views/SMS/ACCOUNTS/ApplicationTransaction/Details")
);

const InFlow = lazy(() => import("./views/SMS/InFlow/Index"));

const InFlowDetails = lazy(() => import("./views/SMS/InFlow/Details"));

const InFlowUpdate = lazy(() => import("./views/SMS/InFlow/Update"));

const AccountTransactionList = lazy(() =>
  import("./views/SMS/ACCOUNTS/AccountsTransaction/Index")
);

const CreateWithdrawRequest = lazy(() =>
  import("./views/SMS/ACCOUNTS/WithdrawRequest/Create")
);
const WithdrawRequestList = lazy(() =>
  import("./views/SMS/ACCOUNTS/WithdrawRequest/Index")
);
const ExportWithdrawRequestPdf = lazy(() =>
  import("./views/SMS/ACCOUNTS/WithdrawRequest/ExportWithdrawRequestPdf")
);

const WithdrawTransaction = lazy(() =>
  import("./views/SMS/ACCOUNTS/WithdrawTransaction/Index")
);
const WithdrawTransactionDetails = lazy(() =>
  import("./views/SMS/ACCOUNTS/WithdrawTransaction/Details")
);

// Comission Transaction Details
const ComissionTransactionDetails = lazy(() =>
  import(
    "./views/SMS/COMISSIONS/CommissionTransactionDetails/ComissionTransactionDetails"
  )
);

// admission officer
const AdmissionOfficerList = lazy(() =>
  import("./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerList/Index.js")
);

const AdmissionOfficerProfile = lazy(() =>
  import("./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerProfile/Index")
);

const AdmissionOfficerDetailsInfo = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerProfile/Component/AdmissionOfficerDetailsAndTerms/Component/AdmissionOfficerDetailsInfo"
  )
);

const AdmissionOfficerDetailsTermsAndCondition = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerProfile/Component/AdmissionOfficerDetailsAndTerms/Component/AdmissionOfficerDetailsTermsAndCondition"
  )
);

const UpdateAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/UpdateAdmissionOfficer.js"
  )
);
const AddAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/ExtraThings/AddAdmissionOfficer"
  )
);
const AddAdmissionOfficerReg = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/NavigationAndRegister/AddAdmissionOfficerReg"
  )
);
const AddAdmissionOfficerGeneralInfo = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/GeneralInformation/Index.js"
  )
);
const PersonalInfoAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/PersonalInformation/Index"
  )
);
const ContactInfoAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/ContactInformation/Index"
  )
);

const EmergencyInfoAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/EmergencyInformation/Index"
  )
);

const EligibilityAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/EligibilityInformation/Index"
  )
);
const TermsAndConditionAdmissionOfficer = lazy(() =>
  import(
    "./views/SMS/AllStaffs/AdmissionOfficer/AdmissionOfficerAllInformation/TermsAndConditon/Index"
  )
);

// Student Create Forms
const StudentApplicationForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentApplicationForm")
);

const SourceofFundForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/SourceofFundForm")
);

const SourceOfFund = lazy(() =>
  import(
    "./views/SMS/STUDENT/StudentsAllInformation/StudentFundingInformation/SourceOfFund"
  )
);

const StudentPersonalForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentPersonalForm")
);

const StudentContactForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentContactForm")
);

const StudentEducationForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentEducationForm")
);

const StudentTestScoreForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentTestScoreForm")
);

const StudentExperienceForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentExperienceForm")
);

const StudentReferenceForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentReferenceForm")
);

const StudentPersonalStatementForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentPersonalStatementForm")
);

const StudentOtherInformationForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentOtherInformationForm")
);

const StudentDeclarationForm = lazy(() =>
  import("./views/SMS/STUDENT/CreateForms/StudentDeclarationForm")
);

const UniversityCommission = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/UniversityCommission/UniversityCommission"
  )
);

const AddUniversityCountryWiseCommission = lazy(() =>
  import("./views/SMS/University/Components/AddUniversityCountryWiseCommission")
);

const UniversityCommissionForm = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/UniversityCommission/Component/CommissionForm"
  )
);
const UniversityCommissionFormInt = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/UniversityCommission/Component/CommissionFormInt"
  )
);
const UniversityFunding = lazy(() =>
  import("./views/SMS/University/UniversityInformation/UniversityFunding")
);
const UniversityRequirements = lazy(() =>
  import("./views/SMS/University/UniversityInformation/UniversityRequirements")
);
const UniversityEnglishRequirements = lazy(() =>
  import(
    "./views/SMS/University/UniversityInformation/UniversityEnglishRequirements"
  )
);
const UniversityTestScore = lazy(() =>
  import("./views/SMS/University/UniversityTestScore")
);

const TermsAndCondition = lazy(() =>
  import("./views/SMS/TermsAndCondition/TermsAndCondition.js")
);
const TandCDetails = lazy(() =>
  import("./views/SMS/TermsAndCondition/TandCDetails.js")
);

// All Notification Page
const Notifications = lazy(() =>
  import("./views/SMS/Notifications/Notifications")
);

// All Messages Page
const Messages = lazy(() => import("./views/SMS/Messages/Messages"));

const TrialNotification = lazy(() => import("./views/Test/Notification"));

// MAke Student a Consultant
const ConvertStudentIntoConsultantForm = lazy(() =>
  import(
    "./views/SMS/ConvertStudentIntoConsultant/ConvertStudentIntoConsultantForm"
  )
);

const Success = lazy(() =>
  import("./views/SMS/ConvertStudentIntoConsultant/Success")
);

// Login History
const LoginHistory = lazy(() => import("./views/SMS/LoginHistory/Index"));

const AllLoginHistory = lazy(() =>
  import("./views/SMS/LoginHistory/AllLoginHistory")
);

// Student Type Document
const StudentTypeDocument = lazy(() =>
  import("./views/SMS/SETTINGS/StudentTypeDocument/List")
);
//Notice
const Notice = lazy(() => import("./views/SMS/Dashboard/Notice/Notice.js"));

const NoticeList = lazy(() =>
  import("./views/SMS/Dashboard/Notice/NoticeList")
);
const UsersNoticeList = lazy(() =>
  import("./views/SMS/Dashboard/Notice/UsersNoticeList.js")
);
const NoticeDetails = lazy(() =>
  import("./views/SMS/Dashboard/Notice/NoticeDetails.js")
);
const UserNoticeDetails = lazy(() =>
  import("./views/SMS/Dashboard/Notice/UserNoticeDetails.js")
);

const UserContent = lazy(() =>
  import("./views/SMS/ContentForUser/ContentIndex.js")
);
const UserContentHub = lazy(() =>
  import("./views/SMS/ContentForUser/ContentHub.js")
);

// Affiliate path start
const AffiliateTransation = lazy(() =>
  import("./views/SMS/ACCOUNTS/Affiliate/AffiliateTransation.js")
);

const AffiliateInvitation = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateInvitation/AffiliateInvitation.js")
);
const AffiliateEarning = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateEarning/AffiliateEarning.js")
);
const AffiliateContent = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateContent/AffiliateContent.js")
);

const MyTeamList = lazy(() =>
  import("./views/SMS/Affiliate/MyTeam/MyTeamList.js")
);

const AffiliateTeamMemberListForSystem = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffilitateTeamMemberListForSystem/MyTeamList.js"
  )
);
const AffiliateCommissionSetting = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateCommissionSetting/Index.js")
);
const AffiliateList = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateList/AffiliateList.js")
);

const AffiliateListRegistration = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/NavigationAndRegistration/Registration.js"
  )
);
const AffiliateProfile = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateProfile/AffiliateProfile.js")
);
const AffiliateDashboard = lazy(() =>
  import("./views/SMS/Dashboard/Pages/Affiliate/Index.js")
);
const AffiliatePersonalInfo = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/PersonalInformation/Index.js"
  )
);
const AffiliateContactInfo = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/ContactInformation/Index.js"
  )
);
const AffiliateEmergencyInfo = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/EmergencyInformation/Index.js"
  )
);
const AffiliateEligibilityInfo = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/EligibilityInformation/EligibilityInformation.js"
  )
);
const AffiliateBankInfo = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateInformations/BankInformation/Index.js")
);
const AffiliateCommission = lazy(() =>
  import("./views/SMS/Affiliate/AffiliateInformations/Commission/Commission.js")
);
const AffiliateTerms = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/TermsAndCondition/Index.js"
  )
);

const AffiliateNewDeclaration = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInformations/TermsAndCondition/AffiliateNewDeclaration.js"
  )
);
// Affiliate path end

// Companion path start
const CompanionTransation = lazy(() =>
  import("./views/SMS/ACCOUNTS/Companion/CompanionTransation.js")
);

const CompanionLeadList = lazy(() =>
  import("./views/SMS/Companion/CompanionLeadList/CompanionLeadList.js")
);

const CompanionInvitation = lazy(() =>
  import("./views/SMS/Companion/CompanionInvitation/CompanionInvitation.js")
);

const CompanionInvitationListForSystem = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInvitationListForSystem/CompanionInvitation.js"
  )
);

const CompanionLeadListForSystem = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionLeadListForSystem/CompanionLeadList.js"
  )
);
const AffiliateLeadListForSystem = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateLeadListForSystem/AffiliateLeadList.js"
  )
);

const CompanionStudentListForSystem = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionStudentListForSystem/CompanionStudentList.js"
  )
);

const AffiliateStudentListForSystem = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateStudentListForSystem/AffiliateStudentList.js"
  )
);

const AffiliateInvitationListForSystem = lazy(() =>
  import(
    "./views/SMS/Affiliate/AffiliateInvitationListForSystem/AffiliateInvitation.js"
  )
);

const CompanionEarning = lazy(() =>
  import("./views/SMS/Companion/CompanionEarning/CompanionEarning.js")
);
const CompanionContent = lazy(() =>
  import("./views/SMS/Companion/CompanionContent/CompanionContent.js")
);

const CompanionMyTeamList = lazy(() =>
  import("./views/SMS/Companion/MyTeam/CompanionMyTeamList.js")
);
const CompanionTeamMemberListForSystem = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionTeamMemberListForSystem/CompanionMyTeamList.js"
  )
);
const CompanionCommissionSetting = lazy(() =>
  import("./views/SMS/Companion/CompanionCommissionSetting/Index.js")
);
const CompanionList = lazy(() =>
  import("./views/SMS/Companion/CompanionList/CompanionList.js")
);

const CompanionListRegistration = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/NavigationAndRegistration/Registration.js"
  )
);
const CompanionProfile = lazy(() =>
  import("./views/SMS/Companion/CompanionProfile/CompanionProfile.js")
);
const CompanionDashboard = lazy(() =>
  import("./views/SMS/Dashboard/Pages/Companion/Index.js")
);
const CompanionPersonalInfo = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/PersonalInformation/Index.js"
  )
);
const CompanionContactInfo = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/ContactInformation/Index.js"
  )
);
const CompanionEmergencyInfo = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/EmergencyInformation/Index.js"
  )
);
const CompanionEligibilityInfo = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/EligibilityInformation/EligibilityInformation.js"
  )
);
const CompanionBankInfo = lazy(() =>
  import("./views/SMS/Companion/CompanionInformations/BankInformation/Index.js")
);
const CompanionCommission = lazy(() =>
  import("./views/SMS/Companion/CompanionInformations/Commission/Commission.js")
);
const CompanionTerms = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/TermsAndCondition/Index.js"
  )
);
const CompanionNewDeclaration = lazy(() =>
  import(
    "./views/SMS/Companion/CompanionInformations/TermsAndCondition/CompanionNewDeclaration.js"
  )
);
// Companion path end

//  Recycle Bin path
const RecycleBin = lazy(() => import("./views/SMS/RecycleBin/RecycleBin.js"));
const RecycleStudent = lazy(() => import("./views/SMS/RecycleBin/Student.js"));
const RecycleConsultant = lazy(() =>
  import("./views/SMS/RecycleBin/Consultant.js")
);
const RecycleAffiliate = lazy(() =>
  import("./views/SMS/RecycleBin/Affiliate.js")
);

const RecycleCompanion = lazy(() =>
  import("./views/SMS/RecycleBin/Companion.js")
);
const RecycleApplication = lazy(() =>
  import("./views/SMS/RecycleBin/Application.js")
);

const RecycleUniversity = lazy(() =>
  import("./views/SMS/RecycleBin/University.js")
);
const RecycleSubjects = lazy(() =>
  import("./views/SMS/RecycleBin/Subjects.js")
);

const RecycleAccountsManager = lazy(() =>
  import("./views/SMS/RecycleBin/AccountsManager.js")
);
const RecycleAccountsOfficer = lazy(() =>
  import("./views/SMS/RecycleBin/AccountsOfficer.js")
);
const RecycleAdmin = lazy(() => import("./views/SMS/RecycleBin/Admin.js"));

const RecycleAdmissionManager = lazy(() =>
  import("./views/SMS/RecycleBin/AdmissionManager.js")
);

const RecycleAdmissionOfficer = lazy(() =>
  import("./views/SMS/RecycleBin/AdmissionOfficer.js")
);

const RecycleBranchManager = lazy(() =>
  import("./views/SMS/RecycleBin/BranchManager.js")
);

const RecycleComplianceManager = lazy(() =>
  import("./views/SMS/RecycleBin/ComplianceManager.js")
);

const RecycleComplianceOfficer = lazy(() =>
  import("./views/SMS/RecycleBin/ComplianceOfficer.js")
);

const RecycleEditor = lazy(() => import("./views/SMS/RecycleBin/Editor.js"));

const RecycleFinanceManager = lazy(() =>
  import("./views/SMS/RecycleBin/FinanceManager.js")
);

const RecycleProviderAdmin = lazy(() =>
  import("./views/SMS/RecycleBin/ProviderAdmin.js")
);

//  Recycle Bin path

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const AffiliateConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                {/* <Navigation /> */}
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);
const AffiliateRoute = connect(mapStateToProps)(AffiliateConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <>
        {/* SMS Client Routing */}
        {isAuth ? (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={analyticsDashboard} />

                  <AppRoute path="/content" component={UserContent} />
                  <AppRoute path="/contentHub" component={UserContentHub} />

                  {/* Affiliate paths */}
                  <AppRoute
                    path="/affiliate-transation"
                    component={AffiliateTransation}
                  />

                  <AppRoute
                    path="/affiliate-Invitation"
                    component={AffiliateInvitation}
                  />

                  <AppRoute
                    path="/affiliate-earning"
                    component={AffiliateEarning}
                  />
                  <AppRoute
                    path="/affiliate-content"
                    component={AffiliateContent}
                  />
                  <AppRoute
                    path="/affiliate-team-List/:affiliateId"
                    component={AffiliateTeamMemberListForSystem}
                  />

                  <AppRoute
                    path="/affiliate-team-List"
                    component={MyTeamList}
                  />

                  <AppRoute
                    path="/affiliate-commission-setting"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateCommissionSetting
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-List"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-registration"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateListRegistration
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-registrationby/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateListRegistration
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/affiliate-profile/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateProfile
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-dashboard/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateDashboard
                        : NotAuthorized
                    }
                  />

                  {/* <Route
                    path="/"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? Navigation
                        : NotAuthorized
                    }
                  >
                    <Route
                      path="/affiliatePersonalInfo/:id"
                      component={
                        permissions?.includes(permissionList?.View_Consultant)
                          ? AffiliatePersonalInfo
                          : NotAuthorized
                      }
                    />
                    <Route
                      path="/affiliateContactInfo/:id"
                      component={
                        permissions?.includes(permissionList?.View_Consultant)
                          ? AffiliateContactInfo
                          : NotAuthorized
                      }
                    />
                  </Route> */}
                  <AffiliateRoute
                    path="/affiliatePersonalInfo/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliatePersonalInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateContactInfo/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateContactInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateEmergencyInfo/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateEmergencyInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateEligibilityInfo/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateEligibilityInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateBankInfo/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateBankInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateCommission/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateCommission
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/affiliateTerms/:affiliateId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AffiliateTerms
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-declaration/:affiliateId?"
                    component={AffiliateNewDeclaration}
                  />

                  {/* Companion paths */}

                  <AppRoute
                    path="/companion-transation"
                    component={CompanionTransation}
                  />

                  <AppRoute
                    path="/companion-leads"
                    component={CompanionLeadList}
                  />
                  <AppRoute
                    path="/companion-lead-list/:companionId"
                    component={CompanionLeadListForSystem}
                  />
                  <AppRoute
                    path="/companion-student-list/:companionId"
                    component={CompanionStudentListForSystem}
                  />

                  <AppRoute
                    path="/companion-Invitation"
                    component={CompanionInvitation}
                  />

                  <AppRoute
                    path="/companion-Invitation-list/:companionId"
                    component={CompanionInvitationListForSystem}
                  />
                  <AppRoute
                    path="/affiliate-Invitation-list/:affiliateId"
                    component={AffiliateInvitationListForSystem}
                  />
                  <AppRoute
                    path="/affiliate-lead-list/:affiliateId"
                    component={AffiliateLeadListForSystem}
                  />
                  <AppRoute
                    path="/affiliate-student-list/:affiliateId"
                    component={AffiliateStudentListForSystem}
                  />

                  <AppRoute
                    path="/companion-earning"
                    component={CompanionEarning}
                  />
                  <AppRoute
                    path="/companion-content"
                    component={CompanionContent}
                  />

                  <AppRoute
                    path="/companion-team-List/:companionId"
                    component={CompanionTeamMemberListForSystem}
                  />
                  <AppRoute
                    path="/companion-team-List"
                    component={CompanionMyTeamList}
                  />

                  <AppRoute
                    path="/companion-commission-setting"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionCommissionSetting
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/companion-List"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/companion-registration"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionListRegistration
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/companion-registrationby/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionListRegistration
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/companion-profile/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionProfile
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/companion-dashboard/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionDashboard
                        : NotAuthorized
                    }
                  />

                  {/* <Route
                    path="/"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? Navigation
                        : NotAuthorized
                    }
                  >
                    <Route
                      path="/affiliatePersonalInfo/:id"
                      component={
                        permissions?.includes(permissionList?.View_Consultant)
                          ? AffiliatePersonalInfo
                          : NotAuthorized
                      }
                    />
                    <Route
                      path="/affiliateContactInfo/:id"
                      component={
                        permissions?.includes(permissionList?.View_Consultant)
                          ? AffiliateContactInfo
                          : NotAuthorized
                      }
                    />
                  </Route> */}
                  <AffiliateRoute
                    path="/companionPersonalInfo/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionPersonalInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionContactInfo/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionContactInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionEmergencyInfo/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionEmergencyInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionEligibilityInfo/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionEligibilityInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionBankInfo/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionBankInfo
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionCommission/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionCommission
                        : NotAuthorized
                    }
                  />
                  <AffiliateRoute
                    path="/companionTerms/:companionId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? CompanionTerms
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/companion-declaration/:companionId?"
                    component={CompanionNewDeclaration}
                  />

                  {/* Companion paths */}

                  {/* Admission manager project deadline paths */}

                  <AppRoute
                    path="/admissionManagerGeneralInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerGeneralInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerPersonalInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerPersonalInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerContactInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerContactInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerEmergencyInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerEmergencyInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagersOfficerInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.AdmissionManager_Assign_AdmissionOfficer
                      )
                        ? AdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerEligibilityInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerEligibility
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerTermsInformation/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? TermsAndConditions
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/AdmissionManager" component={permissions?.includes(602)? AdmissionManager  : NotAuthorized } /> */}

                  {/* <AppRoute  path="/AdmissionGetData" component={AdmissionGetData} /> */}

                  {/* <AppRoute  path="/updateUser/:id" component={UpdateUser} /> */}

                  {/* <AppRoute exact path="/addAdmissionManager/:id" component={permissions?.includes(permissionList.Add_New_Admission_manager)? AdmissionManager : NotAuthorized} /> */}

                  {/* <AppRoute exact path="/admissionManagerRegistration/:providerId?" component={permissions?.includes(permissionList.Add_New_Admission_manager)? AdmissionmanagerRegistration : NotAuthorized} />

         <AppRoute exact path="/addAdmissionManagerForm/:managerId/:providerId?" component={permissions?.includes(permissionList.Add_New_Admission_manager)? AddAdmissionManagerPage : NotAuthorized} /> */}

                  <AppRoute
                    exact
                    path="/admissionManagerList"
                    component={
                      permissions?.includes(
                        permissionList.View_AdmissionManager_list
                      )
                        ? AdmissionManagerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    exact
                    path="/admissionManagerList/:providerId"
                    component={
                      permissions?.includes(
                        permissionList.View_AdmissionManager_list
                      )
                        ? AdmissionManagerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    exact
                    // path="/addAdmissionManager/:providerId?"
                    path="/addAdmissionManager/:commonId?"
                    component={
                      permissions?.includes(
                        permissionList?.Add_AdmissionManager
                      )
                        ? AdmissionManagerRegister
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/updateAdmissionManager/:id/:id2" component={permissions?.includes(permissionList.Update_Admission_manager_info) ? UpdateAdmissionManager : NotAuthorized } /> */}

                  <AppRoute
                    path="/universityAdmissionManagers/:universityId"
                    component={
                      permissions?.includes(
                        permissionList.AdmissionManager_Assign_University
                      )
                        ? UniversityWiseAdmissionManager
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/universityAdmissionOfficers/:universityId"
                    component={
                      permissions?.includes(
                        permissionList.AdmissionOfficer_Assign_University
                      )
                        ? UniversityWiseAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/updateAdmissionOfficer/:officerId/:id"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? UpdateAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addAdmissionOfficer/:providerId"
                    component={
                      permissions?.includes(permissionList.Add_AdmissionOfficer)
                        ? AddAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerSubjects/:managerId/:universityId"
                    component={
                      permissions?.includes(
                        permissionList.AdmissionManager_Assign_Subject
                      )
                        ? AdmissionManagerSubjects
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerSubjects/:managerId/:universityId"
                    component={
                      permissions?.includes(permissionList.View_Subject_List)
                        ? AdmissionOfficerSubjects
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerAssignedSubjects/:officerId"
                    component={
                      permissions?.includes(
                        permissionList.AdmissionOfficer_Assign_Subject
                      )
                        ? AdmissionOfficerAssignedSubjects
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerAssignedSubjects/:managerId"
                    component={
                      permissions?.includes(
                        permissionList.AdmissionOfficer_Assign_Subject
                      )
                        ? AdmissionManagerAssignedSubjects
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addAdmissionOfficer"
                    component={
                      permissions?.includes(permissionList.Add_AdmissionOfficer)
                        ? AddNewAdmissionOfficerPage
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addAdmissionOfficerReg/:commonId?"
                    component={
                      permissions?.includes(permissionList.Add_AdmissionOfficer)
                        ? AddAdmissionOfficerReg
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerGeneralInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? AddAdmissionOfficerGeneralInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerPersonalInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? PersonalInfoAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerContactInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? ContactInfoAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerEmergencyInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? EmergencyInfoAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerEligibilityInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? EligibilityAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerTermsAndConditionInfo/:admissionOfficerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? TermsAndConditionAdmissionOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerTermsAndConditionDetailsInfo/:officerId"
                    component={
                      permissions?.includes(
                        permissionList.Update_AdmissionOfficer
                      )
                        ? AdmissionOfficerDetailsTermsAndCondition
                        : NotAuthorized
                    }
                  />

                  {/* admission officer */}
                  <AppRoute
                    path="/admissionOfficerList"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionOfficer_list
                      )
                        ? AdmissionOfficerList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/admissionOfficerListbyProvider/:providerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionOfficer_list
                      )
                        ? AdmissionOfficerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerListFromAdmissionManagerList/:providerId/:managerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionOfficer_list
                      )
                        ? AdmissionOfficerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerDetails/:officerId"
                    component={
                      permissions?.includes(
                        permissionList.View_AdmissionOfficer_Details
                      )
                        ? AdmissionOfficerProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionOfficerDetailsInfo/:officerId"
                    component={
                      permissions?.includes(
                        permissionList.View_AdmissionOfficer_Details
                      )
                        ? AdmissionOfficerDetailsInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/rolePermission"
                    component={
                      permissions?.includes(
                        permissionList?.Role_Permission_Configuration
                      )
                        ? UnderProcessRolePermission
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/underProcessRolePermission" component={permissions?.includes(permissionList?.View_Permission)? UnderProcessRolePermission : NotAuthorized} /> */}

                  <AppRoute
                    path="/roleMenu"
                    component={
                      permissions?.includes(
                        permissionList?.Role_Menu_Configuration
                      )
                        ? RoleMenu
                        : NotAuthorized
                    }
                  />

                  {/* Role Item paths */}
                  <AppRoute path="/roleItems" component={RoleItems} />
                  <AppRoute path="/addRole" component={AddRole} />
                  <AppRoute path="/editRole/:id" component={EditRole} />

                  {/* Provider Compliance */}
                  <AppRoute
                    path="/providerComplianceRegistration/:commonId?"
                    component={
                      permissions.includes(permissionList?.Add_Provider)
                        ? ProviderComplianceRegistration
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/providerComplianceGeneralInformation/:providerComplianceId"
                    component={
                      permissions.includes(permissionList?.Edit_Provider)
                        ? ProviderComplianceGeneralInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerCompliancePersonalInformation/:providerComplianceId"
                    component={
                      permissions.includes(permissionList?.Edit_Provider)
                        ? ProviderCompliancePersonalInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerComplianceContactInformation/:providerComplianceId"
                    component={
                      permissions.includes(permissionList?.Edit_Provider)
                        ? ProviderComplianceContactInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    exact
                    path="/providerComplianceList"
                    component={
                      permissions?.includes(permissionList?.View_Provider_List)
                        ? ProviderComplianceList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/providerComplianceProfile/:id"
                    component={
                      permissions?.includes(permissionList?.View_Provider)
                        ? ProviderComplianceProfile
                        : NotAuthorized
                    }
                  />

                  {/* staff paths */}

                  <AppRoute
                    path="/staffRegistration"
                    component={
                      permissions.includes(permissionList?.Add_Employee)
                        ? StaffRegistration
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffRegistrationByType/:type"
                    component={
                      permissions.includes(permissionList?.Add_Employee)
                        ? StaffRegistration
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/staffGeneralInformation/:staffId"
                    component={
                      permissions.includes(permissionList?.Update_Employee)
                        ? StaffGeneralInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffContactInformation/:staffId"
                    component={
                      permissions.includes(permissionList?.Update_Employee)
                        ? StaffContactInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/stafEmergencyInformation/:staffId"
                    component={
                      permissions.includes(permissionList?.Update_Employee)
                        ? StaffEmergencyInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffPersonalInformation/:staffId"
                    component={
                      permissions.includes(permissionList?.Update_Employee)
                        ? StaffPersonalInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffEligibility/:staffId"
                    component={
                      permissions.includes(permissionList?.Update_Employee)
                        ? StaffEligibility
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffType"
                    component={
                      permissions.includes(permissionList?.View_Staff_type_list)
                        ? EmployeeType
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffListByType/:type"
                    component={
                      permissions?.includes(permissionList?.View_Employee_list)
                        ? EmployeeList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/staffListByBranchType/:branchId/:type"
                    component={
                      permissions?.includes(permissionList?.View_Employee_list)
                        ? EmployeeList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    exact
                    path="/staffList"
                    component={
                      permissions?.includes(permissionList?.View_Employee_list)
                        ? EmployeeList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/staffProfile/:id"
                    component={
                      permissions?.includes(
                        permissionList?.View_Employee_Details
                      )
                        ? EmployeeProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/universityTypes"
                    component={AddUniversityType}
                  />

                  <AppRoute
                    path="/universityCountry"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityCountry
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/universityState"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityState
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversity/:univerId?"
                    component={
                      permissions?.includes(permissionList?.Add_University)
                        ? AddUniversity
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityByprovideId/:provideId?"
                    component={
                      permissions?.includes(permissionList?.Add_University)
                        ? AddUniversity
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityRecruitmentType/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityRecruitmentType
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversity/:providerProfileId/:univerId?"
                    component={
                      permissions?.includes(
                        permissionList?.Add_University ||
                          permissionList?.Edit_University
                      )
                        ? AddProviderUniversity
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addUniversityApplicationDocument/:univerId" component={permissions?.includes(permissionList?.Add_New_universityApplicationdocument || permissionList?.Update_universityApplicationdocument_info)? AddUniversityApplicationDocument: NotAuthorized} /> */}

                  <AppRoute
                    path="/addProviderUniversityApplicationDocument/:providerProfileId/:univerId"
                    component={AddProviderUniversityApplicationDocument}
                  />
                  <AppRoute
                    path="/addUniversityTemplateDocument/:univerId"
                    component={
                      permissions?.includes(
                        permissionList?.Add_University ||
                          permissionList?.Edit_University
                      )
                        ? AddUniversityTemplateDocument
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversityTemplateDocument/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(
                        permissionList?.Add_University ||
                          permissionList?.Edit_University
                      )
                        ? AddProviderUniversityTemplateDocument
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addProviderUniversityCommission/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(
                        permissionList?.Add_University ||
                          permissionList?.Edit_University
                      )
                        ? AddProviderUniversityCommission
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addUniversityRequiredDocument" component={UniversityRecquiredDocument} /> */}

                  {/* intake */}

                  <AppRoute
                    path="/intake"
                    component={
                      permissions?.includes(permissionList?.Configure_Intake)
                        ? Intake
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addNewIntakes"
                    component={
                      permissions?.includes(permissionList?.Configure_Intake)
                        ? AddNewIntakes
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/updateIntake/:id"
                    component={
                      permissions?.includes(permissionList?.Configure_Intake)
                        ? UpdateIntake
                        : NotAuthorized
                    }
                  />

                  {/* Country */}
                  <AppRoute
                    path="/country"
                    component={
                      permissions?.includes(permissionList?.Manage_Core_Data)
                        ? AddCountry
                        : NotAuthorized
                    }
                  />

                  {/* State */}
                  {/* <AppRoute  path="/state" component={permissions?.includes(permissionList?.View_State_List)? AddState: NotAuthorized} /> */}

                  {/* State also path not implemented yet */}
                  <AppRoute
                    path="/city"
                    component={
                      permissions?.includes(permissionList?.Manage_Core_Data)
                        ? AddCity
                        : NotAuthorized
                    }
                  />

                  {/* consultant */}
                  <AppRoute
                    path="/consultantList"
                    component={
                      permissions?.includes(
                        permissionList?.View_Consultant_list
                      )
                        ? ConsultantList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branch-consultantList/:id"
                    component={
                      permissions?.includes(
                        permissionList?.View_Consultant_list
                      )
                        ? BranchConsultantList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/parentConsultantProfile/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ParentConsultantProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantProfile/:id/:slug"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantProfile/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerProfile/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionManager_Details
                      )
                        ? AdmissionManagerProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantDetails/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagerDetails/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionManager_Details
                      )
                        ? AdmissionManagerDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/ConsultantDesignationHistory/:id"
                    component={Viewlogs}
                  />

                  <AppRoute
                    path="/admissionManagerTermsandConditions/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Update_AdmissionManager
                      )
                        ? AdmissionManagerTermsAndConditions
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associateDetails/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? AssociateSelfProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantTermsandConditions/:id"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantTermAndConditionDetails
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/associateProfile/:id"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? AssociateProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addAssociate"
                    component={
                      permissions?.includes(permissionList?.Add_Associate)
                        ? AddAssociate
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addConAssociate/:id"
                    component={
                      permissions?.includes(permissionList?.Add_Associate)
                        ? AddAssociate
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/affiliate-registrationByCons/:id"
                    component={
                      permissions?.includes(permissionList?.Add_Associate)
                        ? AffiliateListRegistration
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/companion-registrationByCons/:id"
                    component={
                      permissions?.includes(permissionList?.Add_Associate)
                        ? CompanionListRegistration
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/ConsultantLevel"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantLevel
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addConsultant"
                    component={
                      permissions?.includes(permissionList?.Add_Consultant)
                        ? GeneralInformationRegistration
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addConsultantByBranch/:branchId"
                    component={
                      permissions?.includes(permissionList?.Add_Consultant)
                        ? GeneralInformationRegistration
                        : NotAuthorized
                    }
                  />

                  {/* Branch consultant */}
                  <AppRoute
                    path="/addBranchConsultant/:branchId"
                    component={
                      permissions?.includes(permissionList?.Add_Consultant)
                        ? BranchConsultantRegistration
                        : NotAuthorized
                    }
                  />

                  {/* Report */}
                  <AppRoute path="/consultantreport" component={AgentReport} />
                  <AppRoute path="/dailyreport" component={DailyReport} />
                  <AppRoute
                    path="/intakeRangeReport"
                    component={IntakeRangeReport}
                  />
                  <AppRoute
                    path="/applicationreport"
                    component={ApplicationReport}
                  />
                  <AppRoute
                    path="/ProviderDailyReport"
                    component={ProviderDailyReport}
                  />

                  {/* permission not added */}
                  <AppRoute
                    path="/consultantType"
                    component={
                      permissions?.includes(
                        permissionList?.View_Consultant_type_List
                      )
                        ? AddConsultantType
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associateBankDetails/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Add_Consultant)
                        ? UpdateAssociateBankDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associateCommission/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Add_Consultant)
                        ? UpdateAssociateCommission
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? GeneralInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantPersonalInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantPersonalInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantContactInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantContactInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantEmergencyInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantEmergencyInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantEligibilityInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? EligibilityInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantBankInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantBankDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantRecruitmentInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantRecruitmentInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantCommissionInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantCommissionInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/consultantTermsInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Edit_Consultant)
                        ? ConsultantTermsInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/consultant-declaration/:consultantRegisterId?"
                    component={ConsultantNewDeclaration}
                  />

                  <AppRoute
                    path="/associateInformation/:consultantRegisterId"
                    component={
                      permissions?.includes(permissionList?.Add_Associate)
                        ? AssociateInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associates/:id"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? AssociateList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associateList"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? AssociateList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/ConsultantByAffiliate/:id"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? ConsultantByAffiliate
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/ConsultantByAffiliateList"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? ConsultantByAffiliate
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/ConsultantByCompanion/:id"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? ConsultantByCompanion
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/ConsultantByCompanionList"
                    component={
                      permissions?.includes(permissionList?.View_Associate)
                        ? ConsultantByCompanion
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/associateAddSuccess"
                    component={AssociateAddSuccess}
                  />
                  <AppRoute
                    path="/affiliateAddSuccess"
                    component={AffiliateAddSuccess}
                  />
                  <AppRoute
                    path="/companionAddSuccess"
                    component={CompanionAddSuccess}
                  />

                  <AppRoute
                    path="/addUniversityCampus/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityCampus
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversityCampus/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddProviderUniversityCampus
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityFinancial/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityFinancial
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversityFinancial/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddProviderUniversityFinancial
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityFeaturesGallery/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityFeaturesGallery
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversityFeatures/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddProviderUniversityFeatures
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityGallery/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddUniversityGallery
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addProviderUniversityGallery/:providerProfileId/:univerId"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddProviderUniversityGallery
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/universityList"
                    component={
                      permissions?.includes(
                        permissionList?.View_University_List
                      )
                        ? UniversityList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/universityListFromAddUniversityCountry/:counId"
                    component={
                      permissions?.includes(
                        permissionList?.View_University_List
                      )
                        ? UniversityList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/universityListFromUniversityTypes/:univerTypeId"
                    component={
                      permissions?.includes(
                        permissionList?.View_University_List
                      )
                        ? UniversityList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/universityListFromProviderList/:provideId"
                    component={
                      permissions?.includes(
                        permissionList?.View_University_List
                      )
                        ? UniversityList
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/universityDetails/:id" component={permissions?.includes(permissionList?.View_University)? UniversityDetails : NotAuthorized} /> */}

                  <AppRoute
                    path="/universityDetails/:id"
                    component={
                      permissions?.includes(permissionList?.View_University)
                        ? UniversityProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/campusList/:uniId?"
                    component={
                      permissions?.includes(permissionList?.View_University)
                        ? CampusList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/AddCampus/:uniId?"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AddCampus
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/CampusInformation/:uniId?/:campusId?"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? CampusInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/CampusAssignSubject/:uniId?/:campusId?"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? CampusAssignSubject
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/CampusSubjectIntake/:uniId?/:campusId?"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? CampusSubjectIntake
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/CampusGallery/:uniId?/:campusId?"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? CampusGallery
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/campusSubjectList/:camId"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? CampusSubjectList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/campusDetails/:id"
                    component={
                      permissions?.includes(permissionList?.View_University)
                        ? CampusDetails
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/assignMultipleSubject/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? AssignMultipleSubject
                        : NotAuthorized
                    }
                  />

                  {/* University For Sharing & FAQ starts here */}
                  <AppRoute
                    path="/universityList-sharing-faq"
                    component={UniversityListForSharingFAQ}
                  />

                  <AppRoute
                    path="/university-information-doc-faq"
                    component={UniversityInformationDocumentsFAQ}
                  />
                  <AppRoute
                    path="/university-information-doc-faq-by-id/:Uid"
                    component={UniversityInformationDocumentsFAQ}
                  />
                  <AppRoute
                    path="/users-answer-for-fAQ/:Uid"
                    component={UsersAnswerForFAQ}
                  />

                  {/* University For Sharing & FAQ starts here */}

                  {/* University Course starts here */}
                  <AppRoute
                    path="/subjectProfile/:subjId"
                    component={
                      permissions?.includes(permissionList?.View_Subject)
                        ? Subjectprofile
                        : NotAuthorized
                    }
                    // component={Subjectprofile}
                  />

                  <AppRoute
                    path="/university-courses/:id"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? UniversitySubjectList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/add-University-course/:id/:subjId?"
                    component={
                      permissions?.includes(permissionList?.Add_Subjects)
                        ? AddUniversitySubject
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/add-university-course-Fee/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? AddUniversitySubjectFee
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversitySubjectDeliveryPattern/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? AddUniversitySubjectDeliveryPattern
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/add-university-course-requirements/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? AddUniversitySubjectRequirements
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversitySubjectDocumentRequirement/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? AddUniversitySubjectDocumentRequirement
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/add-university-course-assign-to-campus/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? AddUniversitySubjectAssignToCampus
                        : NotAuthorized
                    }
                  />

                  {/* copy and add university subject */}
                  <AppRoute
                    path="/copyAndAddUniversitySubject/:id/:subjId/:newSubId?"
                    component={
                      permissions?.includes(permissionList?.Add_Subjects)
                        ? CopyUniversitySubject
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/copyAndAddUniversitySubjectFee/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectFee}
                  />

                  <AppRoute
                    path="/copyAndAddUniversitySubjectDeliveryPattern/:id/:subjId/:newSubId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? CopyUniversitySubjectDeliveryPattern
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/copyAndAddUniversitySubjectRequirements/:id/:subjId/:newSubId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? CopyUniversitySubjectRequirements
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/copyAndAddUniversitySubjectDocumentRequirement/:id/:subjId/:newSubId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? CopyUniversitySubjectDocumentRequirement
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/copyAddUniversitySubjectAssignToCampus/:id/:subjId/:newSubId"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? CopyUniversitySubjectAssignToCampus
                        : NotAuthorized
                    }
                  />

                  {/* University Course ends here */}

                  {/* university profile subject add starts here */}
                  {/* <AppRoute  path="/addUniProfileSubject/:id/:subjId?" component={permissions?.includes(permissionList?.Add_New_subject)? AddUniProfileSubject : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectFee/:id/:subjId" component={permissions?.includes(permissionList?.Add_New_subject_fee_structure)? AddUniProfileSubjectFee : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectDeliveryPattern/:id/:subjId" component={permissions?.includes(permissionList?.Add_New_Subject_Delivery_Pattern)? AddUniProfileSubjectDeliveryPattern : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectRequirements/:id/:subjId" component={permissions?.includes(permissionList?.Add_New_subject_requirement)? AddUniProfileSubjectRequirements : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectDocumentRequirement/:id/:subjId" component={permissions?.includes(permissionList?.Add_New_subject_requirement_document)? AddUniProfileSubjectDocumentRequirement : NotAuthorized} /> */}
                  {/* university profile subject add ends here */}

                  <AppRoute
                    path="/documentlist"
                    component={
                      permissions?.includes(permissionList?.Configure_Documents)
                        ? DocumentList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/documentCategoryList"
                    component={
                      permissions?.includes(permissionList?.Configure_Documents)
                        ? DocumentCategoryList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/subjectDocumentGroup"
                    component={
                      permissions?.includes(permissionList?.Configure_Documents)
                        ? DocumentGroup
                        : NotAuthorized
                    }
                  />

                  {/* Student type document group path */}

                  {/* discuss */}

                  <AppRoute
                    path="/studentTypeDocumentGroup"
                    component={
                      permissions?.includes(permissionList?.Configure_Documents)
                        ? StudentTypeDocument
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/courses"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? Programs
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/manageIntakes"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? ManageIntakes
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/department"
                    component={
                      permissions?.includes(permissionList?.Add_Departments)
                        ? AddDepartment
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/subDepartment"
                    component={
                      permissions?.includes(permissionList?.View_Departments)
                        ? AddSubDepartment
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addDepartment" component={permissions?.includes(permissionList?.Add_department)? AddDepartment : NotAuthorized} /> */}
                  <AppRoute
                    path="/addSubDepartment"
                    component={
                      permissions?.includes(permissionList?.View_Departments)
                        ? AddSubDepartment
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addSubject/:id?" component={permissions?.includes(permissionList?.Add_New_subject)? Course : NotAuthorized} /> */}

                  <AppRoute
                    path="/subjectList"
                    component={
                      permissions?.includes(permissionList?.View_Subject_List)
                        ? SubjectList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/subjectIntake/:camId/:subbId"
                    component={
                      permissions?.includes(permissionList?.View_Intakes)
                        ? SubjectIntake
                        : NotAuthorized
                    }
                  />
                  {/* <AppRoute
                    path="/subjectProfile/:subjId"
                    component={
                      permissions?.includes(permissionList?.View_subject_info)
                        ? SubjectProfile
                        : NotAuthorized
                    }
                  /> */}

                  {/* <AppRoute  path="/fileUpload" component={FileUpload} /> */}

                  {/* <AppRoute path="/subjectIntake" component={SubjectIntake} /> */}

                  {/* Session Time Out Path */}

                  {/* Applications */}
                  <AppRoute
                    path="/applications"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsbyintake/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsbyprovider/:providerId/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsByStatus/:status/:selector/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute
                    path="/applicationsByStatus/:status/:selector"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  /> */}

                  <AppRoute
                    path="/applicationsFromConsultant/:consultantId/:intake?"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/applicationsFromAssociate/:consultantId/:intake?"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? AssociateApplication
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsFromAssociates/:consultantId/:intake?"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? AssociatesApplications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsFromConsultantProfile/:consultantId/:status/:selector/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsFromUniversity/:universityId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branch-applications/:branchId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/provider-applications/:providerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admission-manager-applications/:status/:selector/:admId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/admission-officer-applications/:status/:selector/:adoId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/ApplicationListByAdmissionmanager/:admId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/ApplicationListByAdmissionOfficer/:adoId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsbybranch/:branchId/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationsByBranchStatus/:branchId/:status/:selector/:intake"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? Applications
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/applicationsByConsultant/:cId" component={permissions?.includes(permissionList?.View_Application_List)? Applications : NotAuthorized} /> */}

                  <AppRoute
                    path="/applicationDetails/:id/:stdId/:tab"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? ApplicationDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationDetails/:id/:stdId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Application_List
                      )
                        ? ApplicationDetails
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/newform" component={Post} /> */}
                  {/* <AppRoute  path="/showdata" component={Get} /> */}
                  {/* <AppRoute  path="/update/:id" component={Put} /> */}
                  {/* <AppRoute  path="/delete/:id" component={Delete} /> */}

                  <AppRoute
                    path="/providerForm"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderForm
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/adminProviderForm/:providerId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminGeneralInfoReg
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerAdminGeneralInfo/:providerId/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminGeneralInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerAdminPersonalInfo/:providerId/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminPersonalInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerAdminContactInfo/:providerId/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminContactInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerAdminEligibilityInfo/:providerId/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminEligibilityInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerAdminTermsAndConditionInfo/:providerId/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminTermsAndCondition
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/editDepartment/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_Departments)
                        ? EditDepartment
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/editSubDepartment/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_Departments)
                        ? EditSubDepartment
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerList"
                    component={
                      permissions?.includes(permissionList?.View_Provider_List)
                        ? ProviderList
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/providerAdminProfile/:providerAdminId" component={permissions?.includes(permissionList?.View_Provider_Admin_info)? ProviderAdminProfile : NotAuthorized} /> */}

                  <AppRoute
                    path="/providerAdminProfile/:providerAdminId"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAdminProfileInfo
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerDetails/:id"
                    component={
                      permissions?.includes(permissionList?.View_Provider)
                        ? ProviderDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/providerDashboard/:id"
                    component={
                      permissions?.includes(permissionList?.View_Provider)
                        ? ProviderDashboard
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/consultantDashboard/:consultantId"
                    component={
                      permissions?.includes(permissionList?.View_Consultant)
                        ? ConsultantDashboard
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/assignUniversity/:providerId/:managerId"
                    component={
                      permissions?.includes(
                        permissionList?.AdmissionManager_Assign_University
                      )
                        ? AssignUniversity
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/assignOfficerUniversity/:providerId/:officerId"
                    component={
                      permissions?.includes(
                        permissionList?.AdmissionOfficer_Assign_University
                      )
                        ? AssignOfficerUniversity
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/updateProvider/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? UpdateProvider
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/adminInformation/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? AdminInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/providerAddress/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_Provider)
                        ? ProviderAddress
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/branchInformation/:branchId?"
                    component={
                      permissions?.includes(permissionList?.Edit_Branch)
                        ? Branch
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addBranchManager/:branchId"
                    component={
                      permissions?.includes(permissionList?.Edit_Branch)
                        ? BranchManager
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branchManager/:branchId"
                    component={
                      permissions?.includes(permissionList?.Edit_Branch)
                        ? AddBranchManager
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branchManagerProfile/:branchManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.Add_Branch ||
                          permissionList?.Edit_Branch
                      )
                        ? BranchManagerProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branchEmployeeInformation/:branchId/:employeeId?"
                    component={
                      permissions?.includes(
                        permissionList?.Edit_Branch_Employee
                      )
                        ? BranchEmployee
                        : NotAuthorized
                    }
                  />
                  {/* <AppRoute path="/updateBranch/:id" component={UpdateBranch} /> */}
                  <AppRoute
                    path="/branchList"
                    component={
                      permissions?.includes(permissionList?.View_Branch_List)
                        ? BranchList
                        : NotAuthorized
                    }
                  />
                  {/* <AppRoute path="/updateBranchManager/:id" component={UpdateBranchManager} /> */}
                  <AppRoute
                    path="/branchProfile/:id"
                    component={
                      permissions?.includes(permissionList?.View_Branch)
                        ? BranchProfile
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/updateBranchManagerInformation/:branchId/:managerId"
                    component={
                      permissions?.includes(permissionList?.View_Branch)
                        ? BranchManagerInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/teamEmployee/:branchId/:teamId"
                    component={
                      permissions?.includes(permissionList?.View_Branch)
                        ? BranchTeamEmployeeInformation
                        : NotAuthorized
                    }
                  />

                  {/* compliance officer */}

                  <AppRoute
                    path="/complianceOfficerList"
                    component={
                      permissions?.includes(permissionList?.View_Employee_list)
                        ? ComplianceOfficerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/complianceOfficerInformation/:complianceOfficerId?"
                    component={
                      permissions?.includes(
                        permissionList?.Add_Employee ||
                          permissionList?.Update_Employee
                      )
                        ? AddComplianceOfficer
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/complianceOfficerProfile/:complianceOfficerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_Employee_Details
                      )
                        ? ComplianceOfficerProfile
                        : NotAuthorized
                    }
                  />

                  {/* Lead APP */}

                  <AppRoute path="/LeadDashboard" component={LeadDashboard} />
                  <AppRoute path="/LeadList" component={LeadList} />
                  <AppRoute path="/LeadSettings" component={LeadSettings} />
                  <AppRoute path="/lead/profile/:id" component={LeadProfile} />
                  <AppRoute path="/LeadConsultant" component={LeadConsultant} />

                  {/* Student  */}

                  <AppRoute
                    path="/studentList"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? StudentList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/lead-student-List"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? LeadStudentList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/branch-studentList/:id"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? StudentList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/studentListByType/:type"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? StudentList
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentListByConsultant/:cId"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? StudentList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/UniversityListByAdmissionofficer/:cId"
                    component={
                      permissions?.includes(
                        permissionList?.View_University_List
                      )
                        ? UniversityList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/admissionManagersOfficerList/:admissionManagerId"
                    component={
                      permissions?.includes(
                        permissionList?.View_AdmissionOfficer_list
                      )
                        ? AdmissionOfficerList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/studentProfile/:sId"
                    component={
                      permissions?.includes(permissionList?.View_Student)
                        ? StudentProfile
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addStudentInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? PersonalInformation
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addStudentCountryInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Update_Student_info)? StudentCountryInformation : NotAuthorized} /> */}

                  <AppRoute
                    path="/addStudentContactInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? ContactInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addStudentEmergencyInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? EmergencyInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addStudentApplicationInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? ApplicationInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addStudentEducationalInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? EducationalInformation
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addStudentRegister"
                    component={
                      permissions?.includes(permissionList?.Add_New_Student)
                        ? AddStudentRegister
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addStudentRegisterByConsultant/:consultantId"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddStudentRegister
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addExperience/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddExperience
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addReference/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddReference
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addPersonalStatement/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddPersonalStatement
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addOtherInformation/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddOtherInformation
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addTestScore/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? AddTestScore
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/studentByConsultant/:id"
                    component={
                      permissions?.includes(permissionList?.View_Student_list)
                        ? StudentByConsultant
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/uploadDocument/:applicationStudentId?/:update?"
                    component={
                      permissions?.includes(permissionList?.Edit_Student)
                        ? UploadDocument
                        : NotAuthorized
                    }
                  />

                  {/* Education Level paths */}

                  <AppRoute
                    path="/educationalLevelList"
                    component={
                      permissions?.includes(
                        permissionList?.Configure_Educationlevels
                      )
                        ? EducationLevelList
                        : NotAuthorized
                    }
                  />
                  {/* <AppRoute  path="/addEducationLevel/:name?/:description?/:levelValue?/:id?" component={permissions?.includes(permissionList?.Add_Education_Level)? AddEducationLevel : NotAuthorized} /> */}

                  {/* Degree Paths */}

                  {/* <AppRoute
                    path="/degreeList"
                    component={
                      permissions?.includes(permissionList?.View_degree_List)
                        ? DegreeList
                        : NotAuthorized
                    }
                  /> */}
                  {/* <AppRoute  path="/addDegree/:degreeName?/:eduLabel?/:educationId?/:id?" component={permissions?.includes(permissionList?.Add_degree)? AddDegree : NotAuthorized} /> */}

                  {/* <AppRoute
                    path="/examTestType"
                    component={
                      permissions?.includes(
                        permissionList?.View_Exam_test_type_List
                      )
                        ? ExamTestType
                        : NotAuthorized
                    }
                  /> */}

                  {/* permission not yet */}
                  <AppRoute
                    path="/add-university-course-test-score/:id/:subjId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? AddUniversitySubjectTestScore
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/add-university-course-intake/:id/:subjId"
                    component={AddUniversitySubjectIntake}
                  />
                  <AppRoute
                    path="/copyAndAddUniversitySubjectIntake/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectIntake}
                  />

                  <AppRoute
                    path="/copyAndAddUniversitySubjectTestScore/:id/:subjId/:newSubId"
                    component={
                      permissions?.includes(permissionList?.Edit_Subjects)
                        ? CopyUniversitySubjectTestScore
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/updateUniversityInformation/:id"
                    component={
                      permissions?.includes(permissionList?.Edit_University)
                        ? UpdateUniversityInformation
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute
                    path="/studentTypeList"
                    component={
                     StudentType
                      
                    }
                  /> */}

                  <AppRoute
                    path="/contentStudentDashboard"
                    component={StudentDashboard}
                  />

                  <AppRoute
                    path="/countryList"
                    component={
                      permissions?.includes(permissionList?.Manage_Core_Data)
                        ? CountryList
                        : NotAuthorized
                    }
                  />

                  {/* Notice part */}

                  <AppRoute path="/Notice" component={Notice} />
                  <AppRoute path="/NoticeList" component={NoticeList} />
                  <AppRoute path="/notices" component={UsersNoticeList} />
                  <AppRoute path="/NoticeDetails" component={NoticeDetails} />
                  <AppRoute
                    path="/view-notices"
                    component={UserNoticeDetails}
                  />

                  <AppRoute
                    path="/NoticeDetail/:id"
                    component={NoticeDetails}
                  />
                  <AppRoute
                    path="/view-notice/:id"
                    component={UserNoticeDetails}
                  />

                  {/* Comission paths */}
                  <AppRoute
                    path="/CommissionSetting"
                    component={CommissionSetting}
                  />

                  <AppRoute
                    path="/accountIntakeList"
                    component={
                      permissions?.includes(
                        permissionList?.View_Account_Intake_List
                      )
                        ? AccountIntake
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/commissionGroupList"
                    component={
                      permissions?.includes(
                        permissionList?.Configure_CommissionStucture
                      )
                        ? ComissionGroup
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/commissionPriceList/:id"
                    component={
                      permissions?.includes(
                        permissionList?.Configure_CommissionStucture
                      )
                        ? CommissionPriceList
                        : NotAuthorized
                    }
                  />

                  {/* Consultant Conscent Path */}

                  <AppRoute
                    path="/associateConsent/:consultantRegisterId"
                    component={AssociateConsent}
                  />

                  {/* Student Declaration Path */}
                  <AppRoute
                    path="/studentDeclaration/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentDeclaration
                        : NotAuthorized
                    }
                  />

                  {/* Branch Employee Profile path */}
                  <AppRoute
                    path="/branchEmployeeProfile/:branchId/:employeeId"
                    component={
                      permissions?.includes(permissionList.View_Branch_Employee)
                        ? BranchEmployeeProfile
                        : NotAuthorized
                    }
                  />

                  {/* nationality path */}
                  <AppRoute
                    path="/nationality"
                    component={
                      permissions?.includes(permissionList.Manage_Core_Data)
                        ? Nationality
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/promotionalCommissionList"
                    component={
                      permissions?.includes(
                        permissionList.Configure_CommissionStucture
                      )
                        ? PromotionalCommissionList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/designationsCommissionList"
                    component={
                      permissions?.includes(permissionList.View_DesignationList)
                        ? DesignationsCommissionList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/designationsReport"
                    component={
                      permissions?.includes(
                        permissionList.View_Commission_Structure
                      )
                        ? CommissionReport
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/designationReport"
                    component={
                      permissions?.includes(
                        permissionList.View_Commission_Structure
                      )
                        ? DesignationReport
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/distributionLevelSetting"
                    component={
                      permissions?.includes(
                        permissionList.Configure_CommissionStucture
                      )
                        ? DistributionLevelSetting
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationTransaction"
                    component={
                      permissions?.includes(
                        permissionList.View_Application_Transactions
                      )
                        ? ApplicationTransaction
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/applicationTransactionFromConsultant/:consultantId"
                    component={
                      permissions?.includes(
                        permissionList.View_Application_Transactions
                      )
                        ? ApplicationTransaction
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/applicationTransactionDetails/:id"
                    component={
                      permissions?.includes(
                        permissionList.View_Application_Transactions
                      )
                        ? ApplicationTransactionDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/inFlowTransaction"
                    component={
                      permissions?.includes(
                        permissionList.View_Inflow_Transaction
                      )
                        ? InFlow
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/inFlow/details/:id"
                    component={
                      permissions?.includes(
                        permissionList.View_Inflow_Transaction
                      )
                        ? InFlowDetails
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/inFlow/Update/:id"
                    component={
                      permissions?.includes(
                        permissionList.Add_Inflow_Transaction
                      )
                        ? InFlowUpdate
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/accountTransaction"
                    component={
                      permissions?.includes(
                        permissionList.View_Account_Transactions
                      )
                        ? AccountTransactionList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/accountTransactionByConsultant/:consultantId"
                    component={
                      permissions?.includes(
                        permissionList.View_Account_Transactions
                      )
                        ? AccountTransactionList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/createWithdrawRequest"
                    component={
                      permissions?.includes(
                        permissionList.Add_Widthdraw_Request
                      )
                        ? CreateWithdrawRequest
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/withdrawRequestList"
                    component={
                      permissions?.includes(
                        permissionList.View_Widthdraw_Request
                      )
                        ? WithdrawRequestList
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/withdrawTransaction"
                    component={
                      permissions?.includes(
                        permissionList.View_Widthdraw_Request
                      )
                        ? WithdrawTransaction
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/withdrawTransactionByConsultant/:consultantId"
                    component={
                      permissions?.includes(
                        permissionList.View_Widthdraw_Request
                      )
                        ? WithdrawTransaction
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/withdrawTransactionDetails/:id"
                    component={
                      permissions?.includes(
                        permissionList.View_Widthdraw_Request
                      )
                        ? WithdrawTransactionDetails
                        : NotAuthorized
                    }
                  />

                  {/* commission transaction details  */}
                  <AppRoute
                    path="/commissionTransactionDetails/:id"
                    component={
                      permissions?.includes(
                        permissionList.View_Account_Transaction_Details
                      )
                        ? ComissionTransactionDetails
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/exportPDF"
                    component={ExportWithdrawRequestPdf}
                  />

                  {/* Student Create Form Paths */}
                  <AppRoute
                    path="/studentApplication/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentApplicationForm
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/studentSourceofFund/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? SourceofFundForm
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/sourceofFund/:applicationStudentId/:update?"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? SourceOfFund
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/studentPersonal/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentPersonalForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentContact/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentContactForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentEducation/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentEducationForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentTestScore/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentTestScoreForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentExperience/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentExperienceForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentReference/:id"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentReferenceForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentPersonalStatement/:idVal"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentPersonalStatementForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentOtherInformation/:idVal"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentOtherInformationForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/studentDeclarations/:idVal"
                    component={
                      permissions?.includes(permissionList.Edit_Student)
                        ? StudentDeclarationForm
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/student-declaration/:applicationStudentId?"
                    component={StudentNewDeclaration}
                  />
                  <AppRoute
                    path="/bulk-commission-group"
                    component={BulkCommissionGroup}
                  />

                  <AppRoute
                    path="/addUniversityCommission/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityCommission
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityCountryWiseCommission/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? AddUniversityCountryWiseCommission
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityCommissionForm/:uniId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityCommissionForm
                        : NotAuthorized
                    }
                  />
                  <AppRoute
                    path="/addUniversityCommissionFormInt/:uniId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityCommissionFormInt
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityFunding/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityFunding
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityRequirements/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityRequirements
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityEnglishRequirements/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityEnglishRequirements
                        : NotAuthorized
                    }
                  />

                  <AppRoute
                    path="/addUniversityTestScore/:univerId"
                    component={
                      permissions?.includes(permissionList.Edit_University)
                        ? UniversityTestScore
                        : NotAuthorized
                    }
                  />

                  {/* <AppRoute  path="/addProviderUniversityTestScore/:providerProfileId/:univerId" component={permissions?.includes(permissionList.Add_New_University_Test_Requirement) ? AddProviderUniversityTestScore : NotAuthorized} /> */}

                  {/* Recycle Bin path */}

                  <AppRoute
                    path="/recycle/student"
                    component={RecycleStudent}
                  />
                  <AppRoute
                    path="/recycle/consultant"
                    component={RecycleConsultant}
                  />
                  <AppRoute
                    path="/recycle/affiliate"
                    component={RecycleAffiliate}
                  />
                  <AppRoute
                    path="/recycle/companion"
                    component={RecycleCompanion}
                  />

                  <AppRoute
                    path="/recycle/application"
                    component={RecycleApplication}
                  />

                  <AppRoute
                    path="/recycle/university"
                    component={RecycleUniversity}
                  />
                  <AppRoute
                    path="/recycle/subjects"
                    component={RecycleSubjects}
                  />

                  <AppRoute
                    path="/recycle/accountsManager"
                    component={RecycleAccountsManager}
                  />

                  <AppRoute
                    path="/recycle/accountsOfficer"
                    component={RecycleAccountsOfficer}
                  />

                  <AppRoute path="/recycle/admin" component={RecycleAdmin} />

                  <AppRoute
                    path="/recycle/admissionManager"
                    component={RecycleAdmissionManager}
                  />

                  <AppRoute
                    path="/recycle/admissionOfficer"
                    component={RecycleAdmissionOfficer}
                  />

                  <AppRoute
                    path="/recycle/branchManager"
                    component={RecycleBranchManager}
                  />
                  <AppRoute
                    path="/recycle/complianceManager"
                    component={RecycleComplianceManager}
                  />
                  <AppRoute
                    path="/recycle/complianceOfficer"
                    component={RecycleComplianceOfficer}
                  />
                  <AppRoute path="/recycle/editor" component={RecycleEditor} />

                  <AppRoute
                    path="/recycle/financeManager"
                    component={RecycleFinanceManager}
                  />

                  <AppRoute
                    path="/recycle/providerAdmin"
                    component={RecycleProviderAdmin}
                  />

                  <AppRoute path="/recycle" component={RecycleBin} />

                  {/* Recycle Bin path */}

                  {/* login history path */}

                  <AppRoute path="/loginHistory" component={LoginHistory} />
                  <AppRoute
                    path="/allUsersLoginHistory"
                    component={AllLoginHistory}
                  />

                  {/* common profile path */}
                  <AppRoute path="/profile" component={CommonProfile} />

                  {/* Account Settings Path */}
                  <AppRoute
                    path="/accountSettings/:userId"
                    component={Settings}
                  />

                  <AppRoute path="/search" component={Search} />
                  <AppRoute
                    path="/searchByStudent/:student"
                    component={Search}
                  />
                  <AppRoute
                    path="/searchBydepartment/:departmentId"
                    component={Search}
                  />

                  {/* Seed Data path */}
                  <AppRoute path="/seedData" component={SeedData} />

                  {/* All Notifications Path */}
                  <AppRoute
                    path="/allNotifications"
                    component={Notifications}
                  />
                  <AppRoute
                    path="/terms-condition"
                    component={TermsAndCondition}
                  />
                  <AppRoute
                    path="/terms-details/:id"
                    component={TandCDetails}
                  />

                  {/* All Message Path */}
                  <AppRoute path="/allMessages" component={Messages} />

                  {/* guideline path */}
                  <AppRoute path="/guideLines" component={GuideLine} />

                  <AppRoute path="/500" component={InternalServerError} />

                  <AppRoute path="/notAuthorized" component={NotAuthorized} />

                  {/* make student a consultant path */}
                  <AppRoute
                    path="/becomeConsultant"
                    component={ConvertStudentIntoConsultantForm}
                  />

                  <AppRoute path="/success" component={Success} />

                  {/* trial notification */}
                  {/* <AppRoute  path="/notification" component={TrialNotification} /> */}

                  <AppRoute path="/400" component={BadRequest} fullLayout />

                  <AppRoute
                    path="/verifyEmail/:email"
                    component={VerifyEmail}
                    fullLayout
                  />

                  <AppRoute
                    path="/pages/reset-password/:email"
                    component={resetPassword}
                    fullLayout
                  />

                  {/* Session Expired  */}
                  {/* <AppRoute path='/sessionExpired' component={SessionExpired} fullLayout /> */}

                  <AppRoute component={notFound} fullLayout />
                </Switch>
              </ToastProvider>
            </Router>
          </>
        ) : (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={Login} fullLayout />
                  <AppRoute
                    path="/studentAccountCreated"
                    component={StudentAccountCreateSuccessfully}
                    fullLayout
                  />
                  <AppRoute
                    path="/providerAccountCreated"
                    component={ProviderAccountCreateSuccessfully}
                    fullLayout
                  />
                  <AppRoute
                    path="/consultantAccountCreated"
                    component={ConsultantAccountCreateSuccessfully}
                    fullLayout
                  />

                  <AppRoute
                    path="/affiliateAccountCreated"
                    component={AffiliateAccountCreateSuccessfully}
                    fullLayout
                  />
                  <AppRoute
                    path="/companionAccountCreated"
                    component={CompanionAccountCreateSuccessfully}
                    fullLayout
                  />

                  <AppRoute
                    path="/studentRegister/:invitationcode?/:email?"
                    component={StudentRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/affiliate-Register/:invitationcode?"
                    component={AffiliateRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/companion-Register/:invitationcode?"
                    component={CompanionRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/consultantRegister/:invitationcode?"
                    component={ConsultantRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/providerRegister/:invitationcode?"
                    component={ProviderRegister}
                    fullLayout
                  />

                  <AppRoute
                    path="/pages/forgot-password"
                    component={forgotPassword}
                    fullLayout
                  />

                  <AppRoute
                    path="/verifyEmail/:email"
                    component={VerifyEmail}
                    fullLayout
                  />

                  <AppRoute
                    path="/pages/lock-screen"
                    component={lockScreen}
                    fullLayout
                  />
                  <AppRoute
                    path="/pages/reset-password/:email"
                    component={resetPassword}
                    fullLayout
                  />
                  <AppRoute
                    path="/sessionTimeOut"
                    component={SessionTimeOut}
                    fullLayout
                  />
                  <AppRoute
                    path="*"
                    exact
                    component={() => <Redirect to="/" />}
                  />
                </Switch>
              </ToastProvider>
            </Router>
          </>
        )}
      </>
    );
  }
}

export default AppRouter;
