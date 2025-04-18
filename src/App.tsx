// import "./App.scss";
// import img from "./assets/bg.jpg";
// import { Nav } from "./components";
// import { AlertContextProvider, AuthProvider } from "./providers";
// import { Router } from "./router";
// function App() {
//   return (
//     <AlertContextProvider>
//       <AuthProvider>
//         <Nav />
//         <Router />
//         <div
//           className="fixed h-screen w-screen left-0 top-0 bg-black opacity-50"
//           style={{ zIndex: -49 }}
//         />
//         <img
//           src={img}
//           className="fixed h-screen w-screen left-0 top-0 "
//           style={{ zIndex: -50 }}
//         />
//       </AuthProvider>
//     </AlertContextProvider>
//   );
// }

// export default App;



import "./App.scss";
import img from "./assets/bg.jpg";
import { Nav } from "./components";
import { AlertContextProvider, AuthProvider } from "./providers";
import { Router } from "./router";
import GazeVote from "./components/GazeVote"; // 👈 Import the gaze voting component

function App() {
  // Function to handle vote result (you can link this to Firebase later)
  const handleVote = (choice: string) => {
    console.log("User voted via eye-tracking:", choice);
    // Example: save to Firebase or update state
  };

  return (
    <AlertContextProvider>
      <AuthProvider>
        <Nav />
        <Router />

        {/* 👁️ Eye-tracking voting component */}
        <GazeVote onVote={handleVote} />

        {/* Background elements (unchanged) */}
        <div
          className="fixed h-screen w-screen left-0 top-0 bg-black opacity-50"
          style={{ zIndex: -49 }}
        />
        <img
          src={img}
          className="fixed h-screen w-screen left-0 top-0"
          style={{ zIndex: -50 }}
        />
      </AuthProvider>
    </AlertContextProvider>
  );
}

export default App;


// import "./App.scss";
// import img from "./assets/bg.jpg";
// import { Nav } from "./components";
// import { AlertContextProvider, AuthProvider } from "./providers";
// import { Router } from "./router";
// import GazeVote from "./components/GazeVote"; // 👁️ Eye-tracking voting component
// import SignLanguageVoting from "./src/SignLanguageVoting"; // ✋ Sign Language Voting

// function App() {
//   // Function to handle vote result (you can link this to Firebase later)
//   const handleVote = (choice: string) => {
//     console.log("User voted via eye-tracking:", choice);
//     // Example: save to Firebase or update state
//   };

//   return (
//     <AlertContextProvider>
//       <AuthProvider>
//         <Nav />
//         <Router />

//         {/* 👁️ Eye-tracking voting component */}
//         <GazeVote onVote={handleVote} />

//         {/* ✋ Sign Language voting component */}
//         <SignLanguageVoting />

//         {/* Background elements (unchanged) */}
//         <div
//           className="fixed h-screen w-screen left-0 top-0 bg-black opacity-50"
//           style={{ zIndex: -49 }}
//         />
//         <img
//           src={img}
//           className="fixed h-screen w-screen left-0 top-0"
//           style={{ zIndex: -50 }}
//         />
//       </AuthProvider>
//     </AlertContextProvider>
//   );
// }

// export default App;
