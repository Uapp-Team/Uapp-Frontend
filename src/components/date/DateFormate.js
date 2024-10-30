const date = new Date();

const day = (d) => {
  return new Date(d).getDate() < 10
    ? 0 + new Date(d).getDate().toString()
    : new Date(d).getDate();
};

const month = (d) => {
  return new Date(d).getMonth() + 1 < 10
    ? 0 + (new Date(d).getMonth() + 1).toString()
    : new Date(d).getMonth() + 1;
};

const year = (d) => {
  return new Date(d).getFullYear();
};

export const currentDate = year(date) + "-" + month(date) + "-" + day(date);

export const firstDateMonth = year(date) + "-" + month(date) + "-01";

export const dateYMD = (d) => {
  let format = year(d) + "-" + month(d) + "-" + day(d);
  return format;
};

export const dateDMY = (d) => {
  let format = day(d) + "/" + month(d) + "/" + year(d);
  return format;
};

export const timeAmPm = (d) => {
  const timeArray = d.split(":");

  const hour =
    timeArray[0] === "00"
      ? 12
      : timeArray[0] > 12
      ? timeArray[0] - 12
      : timeArray[0];
  const minute = timeArray[1];
  const meridiem = timeArray[0] > 11 ? "PM" : "AM";

  return hour + ":" + minute + " " + meridiem;
};

// Time Conversion
// const timeConversion = (time) => {
//   const [timeWithoutPeriod, period] = time.split(" ");
//   let [hours, minutes, seconds] = timeWithoutPeriod.split(":");
//   if (period === "PM" && hours !== "12") {
//     hours = String(Number(hours) + 12);
//   }
//   if (period === "AM" && hours === "12") {
//     hours = "00";
//   }
//   return `${hours}:${minutes}:${seconds}`;
// };
// // Example usage
// const inputTime = "08:30:45PM";
// const convertedTime = timeConversion(inputTime);

// const hour = (d) => {
//   return new Date(d).getHours();
// };
// const minute = (d) => {
//   return new Date(d).getMinutes();
// };
