export default function formatDuration(min: string): string {
  const minutes = parseInt(min.split("min")[0]);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursString = hours > 0 ? hours + "hr" : "";
  const minutesString = remainingMinutes > 0 ? remainingMinutes + "min" : "";

  if (hoursString && minutesString) {
    return hoursString + " " + minutesString;
  } else {
    return hoursString + minutesString;
  }
}
