interface TimeDisplay {
  value: number;
  unit: string;
}

export const computedTimeDifference = (time: number): string => {
  const relativeTime = getRelativeTime(time);
  return `${relativeTime.value} ${relativeTime.unit} ago`;
};

/**
 * Converts a timestamp into a relative time string (e.g., "2 hours ago", "3 days ago")
 * @param time - Unix timestamp in seconds
 * @returns Object containing the numeric value and unit of time
 */
export function getRelativeTime(time: number): TimeDisplay {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const differenceInSeconds = currentTime - time;

  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // Find the appropriate time unit
  if (differenceInSeconds < intervals.minute) {
    return {
      value: differenceInSeconds,
      unit: differenceInSeconds === 1 ? 'second' : 'seconds',
    };
  }

  if (differenceInSeconds < intervals.hour) {
    const minutes = Math.floor(differenceInSeconds / intervals.minute);
    return { value: minutes, unit: minutes === 1 ? 'minute' : 'minutes' };
  }

  if (differenceInSeconds < intervals.day) {
    const hours = Math.floor(differenceInSeconds / intervals.hour);
    return { value: hours, unit: hours === 1 ? 'hour' : 'hours' };
  }

  if (differenceInSeconds < intervals.week) {
    const days = Math.floor(differenceInSeconds / intervals.day);
    return { value: days, unit: days === 1 ? 'day' : 'days' };
  }

  if (differenceInSeconds < intervals.month) {
    const weeks = Math.floor(differenceInSeconds / intervals.week);
    return { value: weeks, unit: weeks === 1 ? 'week' : 'weeks' };
  }

  if (differenceInSeconds < intervals.year) {
    const months = Math.floor(differenceInSeconds / intervals.month);
    return { value: months, unit: months === 1 ? 'month' : 'months' };
  }

  const years = Math.floor(differenceInSeconds / intervals.year);
  return { value: years, unit: years === 1 ? 'year' : 'years' };
}
