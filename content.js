const videoPlayer = document.querySelector('video');

if (videoPlayer) {
  let lastTime = 0;
  let intervalId = null; 

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

  
  videoPlayer.addEventListener('play', startInterval);

 
  videoPlayer.addEventListener('pause', stopInterval);

  
  videoPlayer.addEventListener('ended', stopInterval);


  if (!videoPlayer.paused) {
    startInterval();
  }
} else {
  console.error("Video not found.");
}
