const shareLink = async ({ title, threadId }) => {
  if (!navigator.share) {
    alert('Web Share API not supported');
    return;
  }

  try {
    await navigator.share({
      title,
      url: `${window.location.origin}/threads/${threadId}`,
    });
  } catch (error) {
    alert('Error sharing:', error);
  }
};

export default shareLink;
