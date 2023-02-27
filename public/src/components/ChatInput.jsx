
import React, {useState} from 'react';
import styled from "styled-components";
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
import Picker from 'emoji-picker-react';

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const[msg, setMsg] = useState("");

    const handleEmojiPickerDisplay = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }
    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0) 
            handleSendMsg(msg);
            setMsg("");
    }
  return (
    <Container>
      <>
        <div className='row m-auto' style={inputStyle}>
          <div className="button-container col-1 d-flex justify-content-center align-items-center">
              <div className="emoji" style={emoji_btn_icon}>
                  <BsEmojiSmileFill  onClick={handleEmojiPickerDisplay}/>
                  {
                      showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                  }
              </div>
          </div>
          <div className="col-11">
            <form className='input-container row m-auto' onSubmit={(e)=>sendChat(e)}>
              <div className="col-9">
                <input type="text" placeholder="Type in your message here..." 
                      value={msg} onChange={(e)=>setMsg(e.target.value)} 
                      className='w-100 p-1 text-black'/>
                </div>
                <div className="col-auto align-content-end">
                <button className='submit'>
                    <IoMdSend/>
                </button>
                </div>
            </form>
          </div>
        </div>
      </>
    </Container>
  );
}

const inputStyle = {
  width: '215%'
}
const emoji_btn_icon = {
  backgroundColor: '#1f1b31',
  borderRadius: '5rem'
}
const Container = styled.div`
  position: absolute;
  bottom: 0;
    .button-container {
      .emoji {
        position: relative;
        svg {
          font-size: 1.5rem;
          color: #ffff00c8;
          cursor: pointer;
        }
        .emoji-picker-react {
          position: absolute;
          top: -350px;
          // background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;
          .emoji-scroll-wrapper::-webkit-scrollbar {
            // background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
          .emoji-categories {
            button {
              filter: contrast(0);
              opacity: 1;
            }
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }

        }
      }
    }
    .input-container {
      width: 100%;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: #ffffff34;
      input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        border-radius: 2rem;
        border: 2px solid #9a86f3;
        &::selection {
          background-color: #9a86f3;
        }
        &:focus {
          outline: none;
        }
      }
      button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          padding: 0.3rem 1rem;
          svg {
            font-size: 1rem;
          }
        }
        svg {
          font-size: 2rem;
          color: white;
        }
      }
  }
`;
