import React, { useState } from "react";
import "../styles/Search.css";
import Nav from "../components/Nav";
import Header from "../components/Header";
import axios from "axios";
import EachUser from "../components/EachUser";
import SugestedUsers from "../components/SugestedUsers";
export default function Search() {
  const [search, setsearch] = useState("");
  const [userData, setuserData] = useState([]);
  async function getsearch() {
    if (search.length>=3) {
      axios
        .get(`http://localhost:3000/user/search?query=${search}`)
        .then((data) => {
          setuserData(data.data);
          console.log(data.data,"hthihi");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      setuserData([])
    }
  }
  return (
    <div className="search-cont">
      <Nav />
      <div className="search-body">
        <Header />
        <div className="search-body-cont">
          <div className="search-butt">
            <input
              type="text"
              name=""
              id=""
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
            <button
              onClick={() => {
                getsearch();
              }}
            >
              Search
            </button>
          </div>
          <div className="search-user-box">
            {userData.length === 0 ? (
              <div style={{ color: "white" }}>NO users found</div>
            ) : (
              <SugestedUsers all_users={userData} />
            )}
            {/* {userData &&
              userData.map((data, ind) => (
                <div>
                  <EachUser userinfo={data} key={ind} />
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
