const videoPlayer = document.querySelector('video');

if (videoPlayer) {
  let lastTime = 0;  
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

  setInterval(updateUrlAndRefresh, 50000);

  videoPlayer.onended = () => {
    clearInterval(updateUrlAndRefresh);  
  };
} else {
  console.error("Video element not found.");
}



