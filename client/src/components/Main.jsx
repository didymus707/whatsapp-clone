import React from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

function Main() {
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        <Empty />
      </div>
    </>
  );
}

export default Main;
