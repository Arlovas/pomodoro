// 'use client';

// import React, { useState, useRef } from 'react';

// const AudioPlayer = () => {
// //   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleReset = () => {
//     audioRef.current.currentTime = 0;
//     if (!isPlaying) {
//       audioRef.current.pause();
//     }
//     setIsPlaying(false);
//   };

//   return (
//     <div>
//       <audio ref={audioRef} src="./finishSound.mp3" />
//       <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   );
// };

// export default AudioPlayer;
