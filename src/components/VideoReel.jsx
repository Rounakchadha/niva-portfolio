import { motion } from 'framer-motion';

// Infinite auto-scrolling row of silent, looping clips — no play button,
// never pauses. The item list is duplicated so the track can animate from
// 0% to -50% and loop seamlessly back to 0% with no visible seam.
export default function VideoReel({ videos }) {
  const track = [...videos, ...videos];

  return (
    <div className="video-reel">
      <motion.div
        className="video-reel-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: videos.length * 5, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((video, i) => (
          <div className="video-reel-item" key={`${video.id}-${i}`}>
            <video
              className="video-reel-video"
              src={video.videoSrc}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            />
            {video.title && <span className="video-reel-title">{video.title}</span>}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
