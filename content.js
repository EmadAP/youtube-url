const videoPlayer = document.querySelector('video');

if (videoPlayer) {
  let lastTime = 0;
  let intervalId = null; // Store the interval ID to manage it properly

  function updateUrlAndRefresh() {
    const currentTime = Math.floor(videoPlayer.currentTime);
    if (currentTime >= lastTime + 50) {
      lastTime = currentTime;
      const url = new URL(window.location.href);
      const newTime = `${currentTime}s`;
      url.searchParams.set("t", newTime);
      window.location.href = url.toString();
    }
  }

  function startInterval() {
    if (!intervalId) {
      intervalId = setInterval(updateUrlAndRefresh, 50000);
    }
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Start the interval when the video is playing
  videoPlayer.addEventListener('play', startInterval);

  // Stop the interval when the video is paused
  videoPlayer.addEventListener('pause', stopInterval);

  // Ensure the interval is cleared when the video ends
  videoPlayer.addEventListener('ended', stopInterval);

  // Automatically start the interval if the video is already playing
  if (!videoPlayer.paused) {
    startInterval();
  }
} else {
  console.error("Video element not found.");
}
