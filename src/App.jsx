import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectForm from "./components/ConnectForm";
import VideoRoom from "./components/VideoRoom";

function App() {
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  ); // Initialize Agora Client

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectForm />} />
        <Route
          path="/:channelName"
          element={
            <AgoraRTCProvider client={agoraClient}>
              <VideoRoom />
            </AgoraRTCProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
