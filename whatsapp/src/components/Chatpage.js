import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "./miscelleneous/SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

function Chatpage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="d-flex justify-content-between w-100 h-75 pt-2">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
}

export default Chatpage;
