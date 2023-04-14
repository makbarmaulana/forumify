export const postedAt = (date) => {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

  if (diffDays > 14) {
    return diffDate;
  }
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  }
  return 'just now';
};
