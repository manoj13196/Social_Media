import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatPage from './ChatPage'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Chatters from './pages/Chatters'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Post from './pages/Post'
import Search from './pages/Search'
import CreatePost from './pages/CreatePost'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(
  "dsd"
)},[])
  return (
    <>
      <Routes>
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Post />} />

        <Route path="/search" element={<Search />} />

        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App
