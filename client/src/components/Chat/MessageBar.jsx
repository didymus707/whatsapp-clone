import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-panel-header-background relative h-20 px-4 flex items-center gap-6">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            title="Emoji"
            className="text-panel-header-icon cursor-pointer text-xl"
          />
          <ImAttachment
            title="Attach File"
            className="text-panel-header-icon cursor-pointer text-xl"
          />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            value={message}
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button>
            <MdSend
              title="send message"
              onClick={sendMessage}
              className={`text-panel-header-icon text-xl ${
                message ? "cursor-pointer" : "pointer-events-none"
              }`}
            />
            {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
