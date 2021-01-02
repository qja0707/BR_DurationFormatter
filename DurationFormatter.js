// The resulting expression is made of components like '4 seconds', '1 year', etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.
// The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", just like it would be written in English.
// A more significant units of time will occur before than a least significant one. Therefore, "1 second and 1 year" is not correct, but "1 year and 1 second" is.
// Different components have different unit of times. So there is not repeated units like in "5 seconds and 1 second".
// A component will not appear at all if its value happens to be zero. Hence, "1 minute and 0 seconds" is not valid, but it should be just "1 minute".
// A unit of time must be used "as much as possible". It means that the function should not return "61 seconds", but "1 minute and 1 second" instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

function DurationFormatter(time) {
  if (time < 0) {
    return;
  }
  if (time == 0) {
    return "now";
  }
  let YEARS = 60 * 60 * 24 * 365;
  let DAYS = 60 * 60 * 24;
  let HOURS = 60 * 60;
  let MIN = 60;

  let remain = time;
  let timeArr = [];

  let year = Math.floor(remain / YEARS);
  remain = remain % YEARS;
  if (year > 0) {
    timeArr.push({ format: "year", value: year });
  }

  let day = Math.floor(remain / DAYS);
  remain = remain % DAYS;
  if (day > 0) {
    timeArr.push({ format: "day", value: day });
  }

  let hour = Math.floor(remain / HOURS);
  remain = remain % HOURS;
  if (hour > 0) {
    timeArr.push({ format: "hour", value: hour });
  }

  let min = Math.floor(remain / MIN);
  remain = remain % MIN;
  if (min > 0) {
    timeArr.push({ format: "minute", value: min });
  }

  let sec = remain;
  if (sec > 0) {
    timeArr.push({ format: "second", value: sec });
  }

  let result = "";
  timeArr.map((item, index, array) => {
    result = result + `${item.value} ${item.format}`;
    if (item.value > 1) {
      result = result + "s";
    }
    if (array.length == 1) {
      // do nothing
    } else if (index + 1 == array.length - 1) {
      // add 'and'
      result = result + " and ";
    } else if (index != array.length - 1) {
      // add ,
      result = result + ", ";
    }
  });
  return result;
}

let random = Math.floor(Math.random() * 100000000);
console.log(random, DurationFormatter(random));
