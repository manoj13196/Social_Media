import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles/Home.css";
import Postbox from "../components/Postbox";
import { AuthContext } from "../api/AuthContext";

import Header from "../components/Header";
import Userchat from "../components/Userchat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chatters from "./Chatters";
import SugestedUsers from "../components/SugestedUsers";
export default function Home() {
  const [all_users, set_allusers] = useState([]);
  const nav = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [posts, setposts] = useState([]);

  const [liked_posts, setliked_posts] = useState([]);
  function recentposts() {
    axios
      .get("http://localhost:3000/post")
      .then((data) => {
        setposts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    recentposts();
    getliked();
  }, []);
  function getliked() {
    axios
      .get(`http://localhost:3000/likes/liked/${user.userId}`)
      .then((data) => {
        console.log(data.data);
        setliked_posts(data.data.map((post) => post.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="home-cont">
      <Nav />
      <div className="home-body">
        <Header />
        <div className="home-body-cont">
          <div className="home-post-cont">
            {posts.map((data, ind) => (
              <Postbox
                key={ind}
                postdet={data}
                isliked={liked_posts.includes(data.id)}
              />
            ))}
          </div>
          <div className="home-chat">
            <div className="chat-title">
              <h1>Chats</h1>
            </div>
            <div className="chat-box">
              <Chatters />
              {/* <SugestedUsers/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
