import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../styles/Comments.css";
import { AuthContext } from "../api/AuthContext";
export default function Comments({ postid = null }) {
  const [modcomments, setmodcomments] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [inpcom, setinpcom] = useState("");
  function getmodcomments() {
    axios
      .get(`http://localhost:3000/comments/post/${postid}`)
      .then((data) => {
        setmodcomments(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (postid) {
      getmodcomments();
    }
  }, []);
  function handlecomment() {
    if (!inpcom.length > 5 || !postid) {
      return;
    }
    axios
      .post(
        "http://localhost:3000/comments",
     {text:inpcom,postId:postid},
        {
          headers: {
            Authorization: `Bearer ${token}`, // optional auth header
          },
        }
      )
      .then((data) => {
        
        setinpcom("");
        setmodcomments((prev) => [
          ...prev,
          {
            author: { name: user.name, id: user.userId },
            text: inpcom,
            post: postid,
            createdAt: new Date(),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div className="comments-cont">
      <div className="comment-title">Comments</div>
      <div className="comment-body">
        {modcomments &&
          modcomments.map((data, ind) => {
            return (
              <div key={ind} className="each-coom">
                {data.author.name + ":" + data.text}
              </div>
            );
          })}
      </div>
      <div className="comment-board">
        <textarea
          value={inpcom}
          onChange={(e) => setinpcom(e.target.value)}
          placeholder="Type message..."
          className="chat-input"
          rows={1}
        />
        <button
          onClick={() => {
            handlecomment();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
