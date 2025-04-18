// // import React, { useRef, useEffect } from 'react';
// // import Webcam from 'react-webcam';

// // function SignLanguageVoting() {
// //   const webcamRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   // Just show webcam for now
// //   return (
// //     <div>
// //       <h2>Sign Language Voting</h2>
// //       <Webcam
// //         ref={webcamRef}
// //         audio={false}
// //         mirrored={true}
// //         screenshotFormat="image/jpeg"
// //         width={640}
// //         height={480}
// //         style={{ borderRadius: '12px' }}
// //       />
// //       <canvas ref={canvasRef} style={{ display: 'none' }} />
// //     </div>
// //   );
// // }

// // export default SignLanguageVoting;


// import React, { useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import * as tf from '@tensorflow/tfjs';

// function SignLanguageVoting() {
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const runHandDetection = async () => {
//       const videoElement = webcamRef.current.video;

//       const hands = new window.Hands({
//         locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//       });

//       hands.setOptions({
//         maxNumHands: 1,
//         minDetectionConfidence: 0.7,
//         minTrackingConfidence: 0.7,
//       });

//       hands.onResults((results) => {
//         if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
//           console.log('✋ Detected Hand Landmarks:', results.multiHandLandmarks[0]);

//           // TODO: Call model to interpret gesture here
//         }
//       });

//       const camera = new window.Camera(videoElement, {
//         onFrame: async () => {
//           await hands.send({ image: videoElement });
//         },
//         width: 640,
//         height: 480,
//       });

//       camera.start();
//     };

//     if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//       runHandDetection();
//     } else {
//       setTimeout(runHandDetection, 1000); // wait if webcam not ready
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Sign Language Voting</h2>
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         mirrored={true}
//         screenshotFormat="image/jpeg"
//         width={640}
//         height={480}
//         style={{ borderRadius: '12px' }}
//       />
//     </div>
//   );
// }

// export default SignLanguageVoting;
