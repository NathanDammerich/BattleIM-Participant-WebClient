import moment from "moment";

const getMonthDayString = (date) => {
  console.log(date);
  if (date) {
    moment.utc();
    return moment(date).format("MMMM DD");
  }
  return "TBA";
};
const getTimeslotString = (timeslot) => {
  if (Array.isArray(timeslot)) {
    const currSlot = timeslot[0];
    return `${currSlot.day} ${moment(currSlot.timeStart).format(
      "h:mma"
    )}-${moment(currSlot.timeEnd).format("h:mma")}`;
  }
  return timeslot;
};

export { getMonthDayString, getTimeslotString };
