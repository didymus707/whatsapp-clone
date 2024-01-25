import List from "./List";
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import ContactsList from "./ContactsList";
import ChatListHeader from "./ChatListHeader";
import { useStateProvider } from "@/context/StateContext";

function ChatList() {
  const [{ contactsPage }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) setPageType("all-contacts");
    else setPageType("default");
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === "all-contacts" && (
        <>
          <ContactsList />
        </>
      )}
    </div>
  );
}

export default ChatList;
