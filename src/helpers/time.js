export function convertTime(inputTime) {
    // Remove leading spaces and any extra colons
    const cleanTime = inputTime.trim().replace(/:/g, ':');
  
    // Create a Date object from the formatted string
    const timeObj = new Date('0000-01-01 ' + cleanTime);
  
    // Get the hours and minutes and format them with leading zeros
    const hours = String(timeObj.getHours()).padStart(2, '0');
    const minutes = String(timeObj.getMinutes()).padStart(2, '0');
  
    // Return the formatted time
    return `${hours}:${minutes}`;
  }
