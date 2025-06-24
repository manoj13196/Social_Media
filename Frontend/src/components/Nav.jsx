import React, { useContext } from 'react'
import "../styles/Nav.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../api/AuthContext';
export default function Nav() {
  const { logout } = useContext(AuthContext)
  const nav=useNavigate()
  return (
    <div className="Nav">
      <div className="logo">
        <div>Snapgram</div>
      </div>
      <div className="links">
        <div className="eachlink">
          <Link to={"/home"}>Home</Link>
        </div>
        {/* <div className="eachlink">
          <Link to={"/posts"}>Post</Link>
        </div> */}
        <div className="eachlink">
          <Link to={"/profile"}>Profile</Link>
        </div>
        <div className="eachlink">
          <Link to={"/search"}>Search</Link>
        </div>
        <div className="eachlink">
          <Link to={"/create"}>Create</Link>
        </div>
      </div>
      <div
        className="bottom"
        onClick={() => {
          logout();
          nav("/")
        }}
      >
        <div>Logout</div>
      </div>
    </div>
  );
}
