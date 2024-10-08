import moment from "moment";

export const currentDate = moment(new Date()).format("YYYY-MM-DD");

export const dateFormate = (e) => {
  let format =
    new Date(e).getDate() +
    "-" +
    (new Date(e).getMonth() + 1) +
    "-" +
    new Date(e).getFullYear();

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
