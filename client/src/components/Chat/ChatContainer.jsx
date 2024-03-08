import { useStateProvider } from "@/context/StateContext";
import React, { useContext } from "react";

function ChatContainer() {
  const [{ messages, currentChatuser, userInfo }] = useStateProvider();
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`${
                message.senderId === currentChatuser?.id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              {message.type === "text" && (
                <div
                  className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                    message.senderId === currentChatuser?.id
                      ? "bg-incoming-background"
                      : "bg-outgoing-background"
                  }`}
                >
                  <span className="break-all">{message.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
