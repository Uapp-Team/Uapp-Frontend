import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SessionStorage = () => {
  const location = useLocation();
  const StaffPaging = JSON.parse(sessionStorage.getItem("staff"));
  const student = JSON.parse(sessionStorage.getItem("student"));
  const UniversityPaging = JSON.parse(sessionStorage.getItem("university"));
  const CampusPaging = JSON.parse(sessionStorage.getItem("Campus"));
  const CoursePaging = JSON.parse(sessionStorage.getItem("Course"));
  const consultant = JSON.parse(sessionStorage.getItem("consultant"));
  const associates = JSON.parse(sessionStorage.getItem("associates"));
  const appTransaction = JSON.parse(sessionStorage.getItem("appTransaction"));
  const accountTransactionPaging = JSON.parse(
    sessionStorage.getItem("accountTransaction")
  );
  const ConsultantPerformancePaging = JSON.parse(
    sessionStorage.getItem("ConsultantPerformance")
  );

  const withdrawTransactionPaging = JSON.parse(
    sessionStorage.getItem("withdrawTransaction")
  );

  const withdrawRequestPaging = JSON.parse(
    sessionStorage.getItem("withdrawRequestList")
  );

  const application = JSON.parse(sessionStorage.getItem("application"));
  const AdmissionsPipeline = JSON.parse(
    sessionStorage.getItem("applicationPipeline")
  );
  const AdmissionManagerApplicationPaging = JSON.parse(
    sessionStorage.getItem("admissionManagerApplication")
  );

  const applicationConsultantPaging = JSON.parse(
    sessionStorage.getItem("applicationConsultant")
  );
  const ProviderPaging = JSON.parse(sessionStorage.getItem("provider"));
  const AdmissionManagerPaging = JSON.parse(
    sessionStorage.getItem("admissionManager")
  );
  const AdmissionOfficerPaging = JSON.parse(
    sessionStorage.getItem("admissionOfficer")
  );

  const UniversitySubjectList = JSON.parse(
    sessionStorage.getItem("UniversitySubjects")
  );

  const path = location.pathname;

  useEffect(() => {
    if (StaffPaging) {
      if (
        !path.includes(`staffList`) &&
        !path.includes(`staffProfile`) &&
        !path.includes(`staff`) &&
        !path.includes(`staf`) &&
        !path.includes(`staffRegistration`)
      ) {
        sessionStorage.removeItem("staff");
      }
    }

    if (AdmissionManagerPaging) {
      if (
        !path.includes(`admissionManagerList`) &&
        !path.includes(`admissionManagerProfile`) &&
        !path.includes(`assignUniversity`) &&
        !path.includes(`admissionManager`) &&
        !path.includes(`admissionManagerAssignedSubjects`) &&
        !path.includes(`admissionOfficerListFromAdmissionManagerList`) &&
        !path.includes(`admission-manager-applications`) &&
        !path.includes(`ApplicationListByAdmissionmanager`) &&
        !path.includes(`addAdmissionManager`)
      ) {
        sessionStorage.removeItem("admissionManager");
      }
    }
    if (AdmissionOfficerPaging) {
      if (
        !path.includes(`addAdmissionOfficerReg`) &&
        !path.includes(`admissionOfficerList`) &&
        !path.includes(`admissionOfficerDetails`) &&
        !path.includes(`assignOfficerUniversity`) &&
        !path.includes(`admissionOfficerAssignedSubjects`) &&
        !path.includes(`admission-manager-applications`) &&
        !path.includes(`ApplicationListByAdmissionmanager`) &&
        !path.includes(`admissionOfficer`) &&
        !path.includes(`addAdmissionManager`)
      ) {
        sessionStorage.removeItem("admissionOfficer");
      }
    }

    if (student) {
      if (
        !path.includes(`studentProfile`) &&
        !path.includes(`addStudent`) &&
        !path.includes(`sourceofFund`) &&
        !path.includes(`addTestScore`) &&
        !path.includes(`addExperience`) &&
        !path.includes(`addReference`) &&
        !path.includes(`addPersonalStatement`) &&
        !path.includes(`addOtherInformation`) &&
        !path.includes(`uploadDocument`) &&
        !path.includes(`studentDeclaration`) &&
        !path.includes(`consultantProfile`) &&
        !path.includes(`branchProfile`) &&
        !path.includes(`studentList`)
      ) {
        sessionStorage.removeItem("student");
      }
    }

    if (UniversityPaging) {
      if (
        !path.includes(`universityDetails`) &&
        !path.includes(`addUniversity`) &&
        !path.includes(`providerDetails`) &&
        !path.includes(`campusList`) &&
        !path.includes(`university-courses`) &&
        !path.includes(`universityList`)
      ) {
        sessionStorage.removeItem("university");
      }
    }

    if (CampusPaging) {
      if (
        !path.includes(`campusList`) &&
        !path.includes(`campusSubjectList`) &&
        !path.includes(`campusDetails`) &&
        !path.includes(`Campus`) &&
        !path.includes(`AddCampus`)
      ) {
        sessionStorage.removeItem("Campus");
      }
    }

    if (CoursePaging) {
      if (
        !path.includes(`courses`) &&
        !path.includes(`subjectProfile`) &&
        !path.includes(`add-University-course`) &&
        !path.includes(`add-university-course`)
      ) {
        sessionStorage.removeItem("Course");
      }
    }

    if (consultant) {
      if (
        !path.includes(`consultantProfile`) &&
        !path.includes(`studentByConsultant`) &&
        !path.includes(`applicationsFromConsultant`) &&
        !path.includes(`associates`) &&
        !path.includes(`consultantDashboard`) &&
        !path.includes(`consultantInformation`) &&
        !path.includes(`consultantPersonalInformation`) &&
        !path.includes(`consultantContactInformation`) &&
        !path.includes(`consultantEmergencyInformation`) &&
        !path.includes(`consultantEligibilityInformation`) &&
        !path.includes(`consultantBankInformation`) &&
        !path.includes(`consultantRecruitmentInformation`) &&
        !path.includes(`consultantCommissionInformation`) &&
        !path.includes(`consultantTermsInformation`) &&
        !path.includes(`addConsultant`) &&
        !path.includes(`consultantList`)
      ) {
        sessionStorage.removeItem("consultant");
      }
    }

    if (associates) {
      if (
        !path.includes(`associateDetails`) &&
        !path.includes(`associateList`) &&
        !path.includes(`studentByConsultant`) &&
        !path.includes(`applicationsFromAssociate`) &&
        !path.includes(`associates`)
      ) {
        sessionStorage.removeItem("associates");
      }
    }

    if (UniversitySubjectList) {
      if (
        !path.includes(`university-courses`) &&
        !path.includes(`subjectProfile`) &&
        !path.includes(`add-University-course`) &&
        !path.includes(`add-university-course`)
      ) {
        sessionStorage.removeItem("UniversitySubjects");
      }
    }

    if (ConsultantPerformancePaging) {
      if (
        !path.includes(`consultantProfile`) &&
        !path.includes(`studentByConsultant`) &&
        !path.includes(`applicationsFromConsultant`) &&
        !path.includes(`associates`) &&
        !path.includes(`consultantDashboard`) &&
        !path.includes(`consultantInformation`) &&
        !path.includes(`consultantPersonalInformation`) &&
        !path.includes(`consultantContactInformation`) &&
        !path.includes(`consultantEmergencyInformation`) &&
        !path.includes(`consultantEligibilityInformation`) &&
        !path.includes(`consultantBankInformation`) &&
        !path.includes(`consultantRecruitmentInformation`) &&
        !path.includes(`consultantCommissionInformation`) &&
        !path.includes(`consultantTermsInformation`) &&
        !path.includes(`addConsultant`) &&
        !path.includes(`designationsReport`) &&
        !path.includes(`consultantList`)
      ) {
        sessionStorage.removeItem("ConsultantPerformance");
      }
    }

    if (application) {
      if (
        !path.includes(`applicationDetails`) &&
        !path.includes(`studentProfile`) &&
        !path.includes(`universityDetails`) &&
        !path.includes(`applications`)
      ) {
        sessionStorage.removeItem("application");
      }
    }
    if (AdmissionsPipeline) {
      if (!path.includes(`applications`)) {
        sessionStorage.removeItem("applicationPipeline");
      }
    }

    if (applicationConsultantPaging) {
      if (
        !path.includes(`applicationDetails`) &&
        !path.includes(`studentProfile`) &&
        !path.includes(`universityDetails`) &&
        !path.includes(`applicationsFromAssociate`) &&
        !path.includes(`applications`)
      ) {
        sessionStorage.removeItem("applicationConsultant");
      }
    }

    if (AdmissionManagerApplicationPaging) {
      if (
        !path.includes(`applicationDetails`) &&
        !path.includes(`studentProfile`) &&
        !path.includes(`universityDetails`) &&
        !path.includes(`applications`)
      ) {
        sessionStorage.removeItem("admissionManagerApplication");
      }
    }

    if (appTransaction) {
      if (
        !path.includes(`applicationTransactionDetails`) &&
        !path.includes(`consultantProfile`) &&
        !path.includes(`studentProfile`) &&
        !path.includes(`universityDetails`) &&
        !path.includes(`applicationTransaction`)
      ) {
        sessionStorage.removeItem("appTransaction");
      }
    }
    if (accountTransactionPaging) {
      if (
        !path.includes(`consultantProfile`) &&
        !path.includes(`withdrawTransactionDetails`) &&
        !path.includes(`commissionTransactionDetails`) &&
        !path.includes(`inFlow`) &&
        !path.includes(`applicationTransactiondetails`) &&
        !path.includes(`accountTransaction`)
      ) {
        sessionStorage.removeItem("accountTransaction");
      }
    }

    if (withdrawTransactionPaging) {
      if (
        !path.includes(`consultantProfile`) &&
        !path.includes(`withdrawTransaction`)
      ) {
        sessionStorage.removeItem("withdrawTransaction");
      }
    }

    if (withdrawRequestPaging) {
      if (
        !path.includes(`withdrawRequestList`) &&
        !path.includes(`createWithdrawRequest`)
      ) {
        sessionStorage.removeItem("withdrawRequestList");
      }
    }

    if (ProviderPaging) {
      if (
        !path.includes(`providerDetails`) &&
        !path.includes(`universityListFromProviderList`) &&
        !path.includes(`provider-applications`) &&
        !path.includes(`providerForm`) &&
        !path.includes(`updateProvider`) &&
        !path.includes(`providerAddress`) &&
        !path.includes(`adminInformation`) &&
        !path.includes(`providerDashboard`) &&
        !path.includes(`providerList`)
      ) {
        sessionStorage.removeItem("provider");
      }
    }
  }, [path]);

  return null;
};

export default SessionStorage;
