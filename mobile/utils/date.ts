export const enumerateDaysBetweenDates = function (
  startDate: moment.Moment,
  endDate: moment.Moment,
) {
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("YYYY-MM-DD"));
    now.add(1, "days");
  }

  return dates;
};
