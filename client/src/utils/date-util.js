/**
 * Formats a date into a string representation.
 * If the date is today, returns the time in HH:MM format.
 * If the date is not today, returns the date and time in DD/MM/YYYY HH:MM format.
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export function formatDate(date) {
  const currentDate = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
