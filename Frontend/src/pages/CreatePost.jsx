import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../api/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "../styles/CreatePost.css"
function CreatePost() {
  const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const {token}=useContext(AuthContext)
const nav=useNavigate()
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("select a image")
      return
    }
        const formData = new FormData();
        formData.append("content", content); 
      formData.append("image", image);
        try {
          const response = await axios.post(
            "http://localhost:3000/post/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // optional auth header
              },
            }
          );

            console.log("Post created:", response.data);
            alert("post created")
            nav("/home")
        } catch (error) {
          console.error("Error creating post:", error);
        }

  };

  return (
    <div className="home-cont">
      <Nav/>
      <div className="home-body">
        <Header />
        <div className="create-body-cont">
          <form className="create-form"onSubmit={handlePostSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              name="cotent"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
