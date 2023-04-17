export const shareHandler = async ({ title, id }) => {
  if (!navigator.share) {
    alert('Web Share API not supported');
    return;
  }

  try {
    await navigator.share({
      title,
      url: `${window.location.origin}/threads/${id}`,
    });
  } catch (error) {
    alert('Error sharing:', error);
  }
};
