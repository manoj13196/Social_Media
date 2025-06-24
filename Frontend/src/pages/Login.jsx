import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom"; // optional
import { AuthContext } from "../api/AuthContext";
import "../styles/login.css";
function Login() {
  const [sign, setsign] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [email, setemail] = useState("");
  const nav = useNavigate();
  async function handleSubmit(username, password) {
    try {
      const response = await axios.post(
        "http://localhost:3000/authentication/login",
        {
          email: username,
          password: password,
        },
        {
          withCredentials: true, // for cookie-based JWT
        }
      );

      const userData = {
        userId: response.data.auth_user.userId,
        email: response.data.auth_user.email,
        name: response.data.auth_user.name,
      };

      const token = response.data.auth_user.accessToken;
      // console.log(userData,token)
      // 👉 Call the login function from context
      login({ user: userData, token: token });
      nav("/home");
    } catch (err) {
      alert("login failed ")
      console.log(err);
    }
  }
  async function handleregister(username, password, email) {
    try {
      const response = await axios.post(
        "http://localhost:3000/authentication/register",
        {
          email: email,
          password: password,
          message: `This is ${username}`,
          name: username,
        }
      );


      setPassword("")
      setemail("")
      setUsername("")
  
      nav("/");
    } catch (err) {
      alert("Login failed")
      console.log(err);
    }
  }

  return (
    <div className="logincont">
      <div className="loginform">
        <div className="logintitle">
          <div
            className="loginname"
            onClick={() => {
              setsign(true);
            }}
            style={{
              height: "8vh",
              width: "10vw",
              borderRadius: "10px",
              background: sign ? "white" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // textAlign: "center",
            }}
          >
            {" "}
            Signup
          </div>

          <div
            className="loginname"
            onClick={() => {
              setsign(false);
            }}
            style={{
              height: "8vh",
              width: "10vw",
              borderRadius: "10px",
              background: sign ? "none" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Login
          </div>
        </div>
        <div className="login-box">
          <div className="sign-up" style={{ display: sign ? "flex" : "none" }}>
            <div className="opts">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="opts">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="opts">
              <label>New Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                handleregister(username, password, email);
              }}
            >
              SignUp
            </button>
          </div>
          <div className="login" style={{ display: sign ? "none" : "flex" }}>
            <div className="opts">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="opts">
              <label>Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                handleSubmit(username, password);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {/* <div className="guest">
        <Link to={"/home"}>
          <button>Guest</button>
        </Link>
      </div> */}
    </div>
  );
}

export default Login;
