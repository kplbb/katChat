import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import io from "socket.io-client";
import Logout from '../components/Logout';

const socket = io.connect("http://localhost:5000");

function Chat() {
  // const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined); 
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

  let current_User =  JSON.parse(localStorage.getItem("current_user"));

  useEffect(()=> {
    const getCurrentUser = async () => {
    if (!localStorage.getItem("current_user"))  {
        navigate("/login");
      } else {
        setCurrentUser (await JSON.parse(localStorage.getItem("current_user")));
        setCurrentUserLoaded(true);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getContacts = async() => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);    
          setContacts(data.data); 
        } else {
          navigate("/setAvatar");    
        }
      }
    }
    getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    // join chat room by socket.
    if (currentChat) 
      socket.current = io(host);
      socket.current.emit("join_room", {
        to: chat._id, 
        from: currentUser._id
      });
    };


  return (
    <>
      <Logout/>
      <div className="d-flex justify-content-center align-items-center vh-100"> 
        <div className='container px-0 py-4 bg-light' > 
          <div className='row m-auto' style={container_style}>
            <div className='col-3 position-relative mh-100'>
              <Contacts contacts={contacts} 
                currentUser={currentUser} 
                changeChat={handleChatChange}
                />
              </div>
            <div className="col-9 d-flex justify-content-center mh-100 position-relative">
            {
              currentUserLoaded === true &&
              currentChat === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
              )
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const container_style = {
  height: '500px',
}

export default Chat






