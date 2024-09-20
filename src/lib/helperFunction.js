export const getMonth = () => {
  const month = [
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
    "December"
  ];
  let d = new Date();
  return month[d.getMonth()];
};
export const getYear = () => {
  let d = new Date();
  return d.getFullYear();
};
