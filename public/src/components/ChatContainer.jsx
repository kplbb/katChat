

import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import Logout from './Logout';
import ChatInput from './ChatInput';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes';
import axios from 'axios';
import io from "socket.io-client";
export default function ChatContainer({currentChat, socket}) {
    const[messages, setMessages] = useState([]);
    const[arrivalMessage, setArrivalMessage] = useState(null);
    const[dataArriveMsg, setDataArriveMsg] = useState(null);

    let currentUser =  JSON.parse(localStorage.getItem("current_user"));
    const scrollRef = useRef()
    useEffect(() => {
        if (currentChat!== undefined) {
            const getAllMessages = async() => {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
            setMessages(response.data);
            }   
            getAllMessages();
        }   
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const data = currentUser;
        socket.emit("send_message", { 
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
            sender: currentUser._id,
    });
    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setDataArriveMsg(data);
        });
        if (dataArriveMsg) {
            if (dataArriveMsg.to == currentChat._id)
                setArrivalMessage({ fromSelf: false, message: dataArriveMsg.message });
            }
    }, []);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    return (
    <>
        {
        currentChat!=undefined && ( 
        <div className="w-100 overflow-auto" style={chatWrapper}>
            {/* <div className="chat-header w-100 position-absolute 
                            top-0 start-50 translate-middle-x">
                <div className="user-details row m-auto">
                    <div className="avatar col-3">
                        <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt="avatar"
                        /> 
                    </div>
                    <div className="username col-6">
                        <div className="bg-white">{currentChat.username}</div>
                    </div>
                    <div className="col-3">
                        <Logout socket={socket} />
                    </div> 
                </div>
            </div> */}
            {
                messages.map((message, index) => {
                    return (
                        <div className='d-flex flex-column mb-3"' key={index}>
                            <div className={`p-2
                                ${message.fromSelf? "text-end":"text-start"}`}  >
                                <div className=''
                                // "content"
                                style={chatContent}>
                                    {/* <p> */}
                                        {message.message}
                                        <div ref={messagesEndRef} />
                                        <br></br>
                                    {/* </p> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {arrivalMessage}
            <ChatInput handleSendMsg = {handleSendMsg}  />
        </div>
        )
    }
    </>
    )
}
const chatWrapper = {
    maxHeight: '450px'
}
const chatContent = {
    padding: '.5rem',
    fontSize: '1.2rem',
    borderRadius: '1rem',
    color: '#757575',
    font: '2rem',
}
