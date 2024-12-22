import React from "react";
import video from './assets/iconic/video.mp4'

const VideoBackground = () => {
  return (
    <div className="video-container">
      {/* Video Background */}
      <video className="video-background" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

  
    </div>
  );
};

export default VideoBackground;