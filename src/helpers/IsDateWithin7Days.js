export const isDateWithin7Days = (dateString) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);
  const diffInTime = targetDate.getTime() - currentDate.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays <= 7; // Check if within 7 days
};
