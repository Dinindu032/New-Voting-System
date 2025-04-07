import "./App.scss";
import img from "./assets/bg.jpg";
import { Nav } from "./components";
import { AlertContextProvider, AuthProvider } from "./providers";
import { Router } from "./router";
function App() {
  return (
    <AlertContextProvider>
      <AuthProvider>
        <Nav />
        <Router />
        <div
          className="fixed h-screen w-screen left-0 top-0 bg-black opacity-50"
          style={{ zIndex: -49 }}
        />
        <img
          src={img}
          className="fixed h-screen w-screen left-0 top-0 "
          style={{ zIndex: -50 }}
        />
      </AuthProvider>
    </AlertContextProvider>
  );
}

export default App;
