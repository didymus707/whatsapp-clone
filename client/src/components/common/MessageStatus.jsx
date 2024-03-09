import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus() {
  return (
    <>
      {MessageStatus.messageStatus === "sent" && (
        <BsCheck className="text-lg" />
      )}
      {MessageStatus.messageStatus === "delivered" && (
        <BsCheckAll className="text-lg" />
      )}
      {MessageStatus.messageStatus === "read" && (
        <BsCheckAll className="text-lg text-icon-ack" />
      )}
    </>
  );
}

export default MessageStatus;
