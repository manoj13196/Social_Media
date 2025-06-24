import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import EachUser from "../components/EachUser";
import { AuthContext } from "../api/AuthContext";
import "../styles/chat.css"
export default function Chatters() {
  const [all_users, set_allusers] = useState([]);
  const nav=useNavigate()
  const { user,logout } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/follow/following/${user.userId}`)
      .then((data) => {
        
        set_allusers(data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="chatter-cont">
        {all_users &&
          all_users.map((data, ind) => (
            <div key={ind}>
              {data.email === user.email ? <></> : <EachUser userinfo={data} />}
            </div>
          ))}
      

      {/* <button
        onClick={() => {
          logout();
          nav("/");
        }}
        className="logo-butt"
      >
        Logout
      </button> */}
    </div>
  );
}
