import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Userchat({ userinfo }) {
  
  
  
  const nav = useNavigate()
  return (
    <div
      onClick={() => {
        nav(`/chat/${userinfo.id}`);
      }}
      className="each-chat"
    >
      <div className="user-det">
        <div className="user-logo"></div>
        <div className="user-info">{userinfo && userinfo.name}</div>
      </div>
    </div>
  );
}
