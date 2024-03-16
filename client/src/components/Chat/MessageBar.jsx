import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import EmojiPicker from "emoji-picker-react";

function MessageBar() {
  const emojiPickerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  console.log(showEmojiPicker);

  useEffect(() => {
    const closeEmojiModal = (event) => {
      if (event.target.id !== "emoji-opener") {
        console.log("event.target.id", event.target.id);
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          console.log("emojiPickerRef.current", emojiPickerRef.current);
          console.log(
            "emojiPickerRef.current.contains(event.target)",
            emojiPickerRef.current.contains(event.target)
          );
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", closeEmojiModal);
    return () => {
      document.removeEventListener("click", closeEmojiModal);
    };
  }, []);

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

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
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: { ...data.message },
        fromSelf: true,
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
            id="emoji-opener"
            onClick={handleEmojiModal}
            className="text-panel-header-icon cursor-pointer text-xl"
          />
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-24 left-16 z-40"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
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
