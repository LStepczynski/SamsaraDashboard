export const convertIsoToReadableDate = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
};

export const convertMsToHHMMSS = (milliseconds: number): string => {
  // Calculate total hours, rounding down
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));

  // Calculate the remaining minutes, rounding down
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  // Calculate the remaining seconds, rounding down
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  // Format hours, minutes, and seconds to ensure two digits (e.g., "01", "05")
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Return the formatted string in "hh:mm:ss" format
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
