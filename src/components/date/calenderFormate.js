import moment from "moment";

export const currentDate = moment(new Date()).format("YYYY-MM-DD");

export const dateFormate = (e) => {
  const date =
    new Date(e).getDate() < 10
      ? 0 + new Date(e).getDate().toString()
      : new Date(e).getDate();

  const month =
    new Date(e).getMonth() + 1 < 10
      ? 0 + (new Date(e).getMonth() + 1).toString()
      : new Date(e).getMonth() + 1;

  const year = new Date(e).getFullYear();

  let format = date + "/" + month + "/" + year;

  return format;
};

export const ymdateFormate = (e) => {
  let format =
    new Date(e).getFullYear() +
    "-" +
    (new Date(e).getMonth() + 1) +
    "-" +
    new Date(e).getDate();

  return format;
};
