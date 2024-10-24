import { userTypes } from "../../constants/userTypeConstant";

const userType = localStorage.getItem("userType");

export const referenceId = localStorage.getItem("referenceId");

export const SystemAdmin = () => {
  const result = userType === userTypes?.SystemAdmin;
  return result;
};

export const Admin = () => {
  const result = userType === userTypes?.Admin;
  return result;
};

export const AdminUsers = () => SystemAdmin() || Admin();

export const AdmissionManager = () => {
  const result = userType === userTypes?.AdmissionManager;
  return result;
};

export const Provider = () => {
  const result = userType === userTypes?.Provider;
  return result;
};

export const BranchManager = () => {
  const result = userType === userTypes?.BranchManager;
  return result;
};

export const Student = () => {
  const result = userType === userTypes?.Student;
  return result;
};

export const AccountManager = () => {
  const result = userType === userTypes?.AccountManager;
  return result;
};

export const Editor = () => {
  const result = userType === userTypes?.Editor;
  return result;
};

export const FinanceManager = () => {
  const result = userType === userTypes?.FinanceManager;
  return result;
};

export const AccountOfficer = () => {
  const result = userType === userTypes?.AccountOfficer;
  return result;
};

export const ComplianceManager = () => {
  const result = userType === userTypes?.ComplianceManager;
  return result;
};

export const ProviderAdmin = () => {
  const result = userType === userTypes?.ProviderAdmin;
  return result;
};

export const Consultant = () => {
  const result = userType === userTypes?.Consultant;
  return result;
};

export const AdmissionOfficer = () => {
  const result = userType === userTypes?.AdmissionOfficer;
  return result;
};

export const ComplianceOfficer = () => {
  const result = userType === userTypes?.ComplianceOfficer;
  return result;
};

export const ProviderCompliance = () => {
  const result = userType === userTypes?.ProviderCompliance;
  return result;
};

export const AdmissionCompliance = () => {
  const result = userType === userTypes?.AdmissionCompliance;
  return result;
};
