import React from "react";
// style profile.css

export default function UserInfo() {
  return (
    <div className="user-info-box">
      <div className="user-pic"></div>
      <div className="user-details">
        <div className="username">
          <div>Shashank</div>
        <div>THis is my bio</div>
          <div>@shashank</div>
        <div></div>
        <div>Following:10</div>
        <div>Followers:10</div>
        </div>
      </div>
          <div className="user-other-details">
              Create post
      </div>
    </div>
  );
}
