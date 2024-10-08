export const expireDateHandler = () => {
  const currentDate = new Date();
  const expiryDate = new Date(localStorage.getItem("date"));
  // console.log("currentDate", currentDate);
  // console.log("expiryDate", expiryDate);
  if (expiryDate !== null || expiryDate !== undefined) {
    if (currentDate.getTime() > expiryDate.getTime()) {
      window.localStorage.clear();
      window.location.reload();
      window.location.href = "/sessionTimeOut";
    }
  } else {
    window.localStorage.clear();
    window.location.reload();
    window.location.href = "/sessionTimeOut";
  }
};
