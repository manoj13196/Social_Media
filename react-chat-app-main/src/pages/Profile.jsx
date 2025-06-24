import React, { useContext, useEffect, useState } from "react";
import "../styles/Profile.css";
import Nav from "../components/Nav";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import axios from "axios";

import { AuthContext } from "../api/AuthContext";
import Postbox from "../components/Postbox";
export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [allposts, setallposts] = useState([]);
  function getprevpost() {
    axios
      .get(`http://localhost:3000/post/${user.userId}`)
      .then((data) => {
        console.log(data.data);
        setallposts(data.data);
      })
      .catch();
  }
  useEffect(() => {
    getprevpost();
  }, []);

  return (
    <div className="profile-cont">
      <Nav />

      <div className="profile-body">
        <Header />
        <div className="user-deto">
          <div className="user-prev-post">
            {allposts &&
              allposts.map((data, ind) => <div key={ind}><Postbox postdet={data}/> </div>)}
          </div>
          <UserInfo />
        </div>
      </div>
    </div>
  );
}
