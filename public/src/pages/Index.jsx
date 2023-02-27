import React from 'react'
import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:5000");

export default function Index({ }) {
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("index_join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("index_send_message", { message, room });
        setMessageReceived(message);
    };

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         setMessageReceived(data.message);
    //     });
    // }, [socket]);

    return (
    <>
        <input
        placeholder="Room Number..."
        onChange={(event) => {
            setRoom(event.target.value);
        }}
        />
        <button onClick={joinRoom}> Join Room</button>
        <input
        placeholder="Message..."
        onChange={(event) => {
            setMessage(event.target.value);
        }}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1> Message:</h1>
        {messageReceived}
    </>
    )
}  

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
    height: 20rem;
}
span {
    color: #4e0eff;
}
`;
