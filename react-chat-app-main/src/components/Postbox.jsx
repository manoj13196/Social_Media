import React, { useState } from "react";
import "../styles/Postbox.css";
import Postboxshare from "./Postboxshare";
import Modal from "./Modal";

export default function Postbox({isliked, postdet = {
  imageUrl: "",
  author:{name:""},id:null
} }) {
  console.log(postdet,"poooooooooooooooooooooooo")
  const[postmod,setpostmod]=useState(false)
  return (
    <div className="postbox-cont">
      <div className="post-user">
        <div className="user-det">
          <div className="user-logo"></div>
          <div className="user-info">
            {postdet && postdet != {} ? postdet.author.name : "User"}
          </div>
        </div>
      </div>
      <div
        className="post-content"
        onClick={() => {
          setpostmod(true);
        }}
      >
        <img src={postdet != {} ? postdet.imageUrl : "User"} alt="" />
      </div>
      <div className="post-share">
        {postdet.id && <Postboxshare postId={postdet.id}  />}
      </div>

      <div
        className="modal"
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          display: postmod ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ height: "100vh", width: "15vw" }}
          onClick={() => {
            setpostmod(false);
          }}
        ></div>
        <Modal moddetails={postdet} />

        <div
          style={{ height: "100vh", width: "15vw" }}
          onClick={() => {
            setpostmod(false);
          }}
        ></div>
      </div>
    </div>
  );
}
