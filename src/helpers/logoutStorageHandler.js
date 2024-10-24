export const logoutStorageHandler = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("date");
  window.localStorage.removeItem("permissions");
  window.localStorage.removeItem("current_user");
  window.localStorage.removeItem("userType");
  window.localStorage.removeItem("referenceId");
  window.localStorage.removeItem("IsLead");
  window.location.reload();
};
