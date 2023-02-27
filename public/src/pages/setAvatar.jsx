import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import MovingComponent from 'react-moving-text'

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const[isLoading, setIsLoading] = useState((true));
    const[selectedAvatar, setSelectedAvatar] = useState((undefined));
    const toastOptions = {        
        position: toast.POSITION.BOTTOM_RIGHT, 
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true, 
        theme: 'dark'
    };

    const setProfilePic = async ()=> {
        if(selectedAvatar===undefined) {
            toast.error("Please select an avatar.", toastOptions)
        }
        const user = await JSON.parse(localStorage.getItem("current_user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
        }); 
        if(data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("current_user", JSON.stringify(user));
            navigate('/chat');
        } else {
            toast.error("Try again later.", toastOptions)
        }
    };      

    useEffect(()=> {
        if (!localStorage.getItem("current_user"))
            navigate("/login");
    }, []);

    useEffect(() => {
        const getAvatars = async() => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        getAvatars();
    }, []);

    return(
        <>
            {
                isLoading? 
                    <Container className='vh-100 d-flex justify-content-center align-items-center '>
                    <div className="text-center"> 

                        <iframe src="https://giphy.com/embed/IzVwOO8xZsfks" width="480" height="360" className='pb-5'/>
                        <MovingComponent
                            type="bounce"
                            duration="2000ms"
                            delay="2s"
                            direction="normal"
                            timing="ease"
                            iteration="50"
                            fillMode="none">
                            <h1>Loading</h1>              
                        </MovingComponent>
                        </div>
                    </Container> : (
                    <Container>
                <div className="d-flex justify-content-center align-items-center vh-100 bg-light"> 
                    <div className='container px-0 py-4 d-flex justify-content-center align-items-center' >
                        <div className="text-center">
                            <h1>select your avatar</h1>
                            <div className="  row d-flex py-5">{
                                avatars.map((avatar, index)=> {
                                    return(
                                        <div className='col d-inline d-flex justify-content-center'>
                                            <img
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt="avatar"
                                                key={avatar}
                                                className={` w-50  ${selectedAvatar === index ? "selected" : ""}`}
                                                onClick={() => setSelectedAvatar(index)}
                                                />
                                        </div>
                                    );
                                })}
                            </div>
                            <button className='submit-btn' onClick={setProfilePic}>Set as Profile Picture</button>
                        </div>
                        </div>
                        </div>
                    </Container>
                    )
            }
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
.selected {
    border-bottom: 0.4rem solid  #9a86f3;
    transition: 0.5s ease-in-out;
    // width:30px;
}
.submit-btn {
    background-color: #F8F9FA;
    color: black;
    padding: 0.3rem 2rem;
    border-style: #FFFFFF 1px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
        background-color: #9a86f3;
        color: white;
        border-style: #9a86f3 1px;
    }
}
`;
