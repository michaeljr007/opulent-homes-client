import React from "react";

const GetDate = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  const date = today.getDate();
  const monthName = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateWithSuffix = `${date}${getOrdinalSuffix(date)}`;
  const formattedDate = `${dayName}, ${dateWithSuffix} ${monthName} ${year}`;

  return <h4>{formattedDate}</h4>;
};

export default GetDate;
