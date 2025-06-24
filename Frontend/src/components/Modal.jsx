import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import Postboxshare from "./Postboxshare";
import Comments from "./Comments";
import axios from "axios";
export default function Modal({ moddetails = {} }) {
  return (
    <div className="modal-cont">
      <div className="modal-content">
        <div className="modal-stuff">
          <img
            className="modal-img"
            src={moddetails && moddetails.imageUrl}
            alt=""
          />
        </div>
        <Postboxshare postId={moddetails.id} />
      </div>
      <div className="modal-comments">
      {moddetails&&  <Comments postid={moddetails.id} />}
      </div>
    </div>
  );
}
