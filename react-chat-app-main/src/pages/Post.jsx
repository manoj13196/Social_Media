import React, { useEffect, useRef, useState } from "react";

import "../styles/Allpost.css";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Post() {
  const gridItems = [
    100, 50, 80, 60, 80, 100, 70, 85, 50, 75, 80, 100, 70, 85, 50,
  ];
  const [modal, setmodal] = useState(false);

  return (
    <div className="All-post-cont">
      <Nav />
      <div className="All-post-body">
        <Header />
        <div className="grid-container">
          {" "}
          {gridItems.map((size, index) => (
            <div
              key={index}
              className="grid-item"
              style={{ width: `${size + 100}px`, height: `${size + 100}px` }}
              onClick={() => {
                setmodal(true);
              }}
            >
              {index + 1}
            </div>
          ))}
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
            display: modal ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ height: "100vh", width: "15vw" }}
            onClick={() => {
              setmodal(false);
            }}
          ></div>
          <Modal />

          <div
            style={{ height: "100vh", width: "15vw" }}
            onClick={() => {
              setmodal(false);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
