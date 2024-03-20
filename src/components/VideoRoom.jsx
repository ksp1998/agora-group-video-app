import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCopy,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { ImPhoneHangUp } from "react-icons/im";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

const appId = import.meta.env.VITE_AGORA_PROJECT_APP_ID;
const token = import.meta.env.VITE_AGORA_PROJECT_TOKEN;

const VideoRoom = () => {
  // const agoraEngine = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client
  const { channelName } = useParams(); // get the channel name from the param

  // set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(true);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // to leave the call
  const navigate = useNavigate();

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: channelName,
      token,
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  // remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());

  return (
    <section className="flex flex-col lg:flex-row p-4">
      <div className="w-full flex flex-wrap items-center gap-4">
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            className="w-[calc(50%-8px)] lg:w-[calc(25%-12px)] aspect-video rounded-lg overflow-hidden"
          >
            <RemoteUser user={user} />
          </div>
        ))}

        <div
          className={`w-full p-2 mt-12 flex items-center gap-4 ${
            remoteUsers.length ? "flex-row fixed bottom-2 left-4" : "flex-col"
          }`}
        >
          <h1
            className={`${remoteUsers.length ? "" : "text-3xl"} font-semibold`}
          >
            Copy the Link to Invite Users
          </h1>
          <p>
            Invite Link:{" "}
            <span
              className="bg-gray-800 inline-flex items-center gap-2 p-1.5 pl-3 rounded-md cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              {window.location.href}
              <FaCopy className="inline-block w-8 border-l-2 pl-1.5" />
            </span>
          </p>
        </div>
      </div>

      <div className="fixed right-6 bottom-6 m-0 w-1/2 max-w-[480px] min-w-80 aspect-video rounded-lg overflow-hidden">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={false}
          playVideo={cameraOn}
          className=""
        />

        <div className="absolute bottom-4 w-full flex justify-center gap-4 z-10">
          <button
            className={`${
              micOn ? "bg-gray-900" : "bg-red-600"
            } p-3 rounded-full transition-colors duration-300`}
            onClick={() => setMic(!micOn)}
          >
            {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>

          <button
            className={`${
              cameraOn ? "bg-gray-900" : "bg-red-600"
            } p-3 rounded-full transition-colors duration-300`}
            onClick={() => setCamera(!cameraOn)}
          >
            {cameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          <button
            className="bg-red-700 p-3 rounded-full transition-colors duration-300"
            onClick={() => {
              setActiveConnection(false);
              navigate("/");
            }}
          >
            <ImPhoneHangUp />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoRoom;
