function validateText(value) {
  var isvalid = true;
  if (
    value === "" ||
    typeof value === undefined ||
    value === " " ||
    value.trim() === ""
  ) {
    isvalid = false;
  }
  return isvalid;
}
const regx = [];
export default validateText;
