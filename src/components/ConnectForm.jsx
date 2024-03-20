import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectForm = () => {
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("main");
  const [invalidInputMsg, setInvalidInputMsg] = useState("");

  const handleConnect = (e) => {
    // trim spaces
    const trimmedChannelName = channelName.trim();

    // validate input: make sure channelName is not empty
    if (trimmedChannelName === "") {
      e.preventDefault(); // keep the page from reloading on form submission
      setInvalidInputMsg("Channel name can't be empty."); // show warning
      setChannelName(""); // resets channel name value in case user entered blank spaces
      return;
    }

    navigate(`/${channelName}`);
  };

  return (
    <form
      onSubmit={handleConnect}
      className="flex flex-col items-center gap-4 p-4"
    >
      <h1 className="text-5xl font-semibold py-4">Join the Room</h1>
      <input
        className="bg-gray-800 text-white border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        type="text"
        value={channelName}
        placeholder="Channel Name"
        onChange={(e) => {
          setChannelName(e.target.value);
          setInvalidInputMsg(""); // clear the error message
        }}
        disabled
      />
      <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
        Join
      </button>
      {invalidInputMsg && (
        <p className="text-red-500 mt-2">{invalidInputMsg}</p>
      )}
    </form>
  );
};

export default ConnectForm;
