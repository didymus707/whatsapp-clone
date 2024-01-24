import axios from "axios";
import Empty from "./Empty";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import ChatList from "./Chatlist/ChatList";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.status) {
        router.push("/login");
      }
      console.log({ data: data });
      const {
        id,
        name,
        email,
        profilePicture: profileImage,
        status,
      } = data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: { id, name, email, profileImage, status },
      });
    }
  });

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {/* <Empty /> */}
        <Chat />
      </div>
    </>
  );
}

export default Main;
