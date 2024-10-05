class Helper {
  // Method to convert milliseconds to hh-mm-ss
  static convertMillisecondsToHHMMSS(milliseconds) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Format the result as hh-mm-ss
    const formatted = `${String(hours).padStart(2, "0")}-${String(
      minutes
    ).padStart(2, "0")}-${String(seconds).padStart(2, "0")}`;
    return formatted;
  }
}

// Export the Helper class for use in other files
module.exports = Helper;
