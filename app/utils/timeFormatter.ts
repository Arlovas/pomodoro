/**
 * Formats time from seconds to a string representation in the format "mm:ss".
 * @param {number} timeInSeconds - The time in seconds to be formatted.
 * @returns {string} The formatted time string in "mm:ss" format.
 */
export function formatTimeMinutes(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
}
