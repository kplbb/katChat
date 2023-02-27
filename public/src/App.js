import React from 'react'
import "./index.css"
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import SetAvatar from "./pages/setAvatar"
import Index from "./pages/Index"

export default function App() {
  return (
    <>
      {/* <div>IT'S KAT'S WORLD</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/setAvatar" element={<SetAvatar/>} />
          <Route path="/" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
  </>
  );
}
