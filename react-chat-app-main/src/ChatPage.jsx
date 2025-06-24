import React, { useContext, useEffect, useRef, useState } from "react";
// import socket from "./Socket";
import { AuthContext } from "./api/AuthContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./styles/chat.css";
import Chatters from "./pages/Chatters";
import Header from "./components/Header";
import Nav from "./components/Nav";
const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { user, logout, token } = useContext(AuthContext);

  const socketRef = useRef(null);

  const bottomRef = useRef(null);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/messages/${id}/${user.userId}`)
      .then((data) => {
        setChatLog(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (!user) {
      nav("/");
    }
  }, [user]);
   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

  useEffect(() => {
    const socket = io("http://localhost:3000/chat", {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socket;
    // Listen for incoming messages
    socket.on(`chat_${user.userId}`, (msg) => {
      console.log(msg);
      setChatLog((prev) => [...prev, msg]);
    });
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });


    return () => {
      socket.off(`chat_${user.userId}`);
    };
  }, [message]);

  const sendMessage = () => {

    socketRef.current.emit("send_message", {
      to: id, // receiver's userId
      content: message,
    });
    const newmsg = {
      senderId: user.userId,
      receiverId: id,
      content: message,
      createdAt: new Date().toISOString(),
    };
    setChatLog((prev) => [...prev, newmsg]); // Append to your own chat log
    setMessage("");
    
  };

  return (
    <div className="chat-cont">

      <div className="chat-body">
        <div className="chat-logo">
          <div className="ch-logo">Snapgram</div>
</div>
        <div className="other-users">
          <div
            className="back"
            style={{ marginRight: "auto" }}
            onClick={() => {
              nav("/home");
            }}
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.667 14L2.33366 14M2.33366 14L14.0003 25.6666M2.33366 14L14.0003 2.33329"
                stroke="white"
                stroke-width="3.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <Chatters />
        </div>
        <div className="curr-chat">
          <h2>Chat</h2>
          <div className="chatlog">
            {chatLog.map((msg, i) => (
              <div
                className="eachmsg"
                key={i}
                style={{
                  marginLeft: msg.senderId === user.userId ? "auto" : "1px",
                }}
              >
                <strong>{msg.senderId}:</strong> {msg.content}
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>
          <div className="typer">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type comment..."
              className="chat-input"
              rows={1}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
