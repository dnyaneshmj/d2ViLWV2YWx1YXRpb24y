/*
 * Write a function that will take a date and compare with today date and return text:
 * - Today: same year, same month, same date
 * - Yesterday: date = today - 1
 * - This week: today - 7 < date < today - 1
 * - Last week: today - 14 < date <= today - 7
 * - This month: same year, same month, date <= today - 14
 * - Last month: month = current month - 1
 * - This year: same year
 * - last year: year = current year - 1
 * - Long time ago: everything else
 *
 * Lastly, please write a unit test for calculateRelativeDate function
 * */

const calculateRelativeDate = (inputDate) => {
  const currentDate = new Date();
  const selectedDate = new Date(inputDate);
  let message = "";

  const yearDiff = currentDate.getYear() - selectedDate.getYear();

  if (yearDiff == 0) {
    const mnthDiff = currentDate.getMonth() - selectedDate.getMonth();

    if (mnthDiff == 0) {
      const dateDiff = currentDate.getDate() - selectedDate.getDate();

      if (dateDiff == 0) {
        message = "Today";
      } else if (7 <= dateDiff && dateDiff < 14) {
        message = "Last Week";
      } else if (1 <= dateDiff && dateDiff < 7) {
        message = "This week";
      } else {
        message = "This Month";
      }
    } else if (mnthDiff == 1) {
      message = "Last month";
    } else {
      message = "Long time ago";
    }
  } else if (yearDiff == 1) {
    message = "Last year";
  } else {
    message = "Long time ago";
  }

  return message;
};

const View = {
  init: () => {
    document
      .getElementById("relative-date-btn")
      .addEventListener("click", () => {
        const msgElement = document.getElementById("relative-date-msg");
        const inputDateElem = document.getElementById("relative-date-input");
        msgElement.textContent = calculateRelativeDate(inputDateElem.value);
      });
  },
};

document.addEventListener("DOMContentLoaded", View.init);
export { calculateRelativeDate };
