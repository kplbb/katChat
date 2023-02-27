import React from 'react'
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {BiPowerOff} from 'react-icons/bi';
import io from "socket.io-client";

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        let currentUser =  JSON.parse(localStorage.getItem("current_user"));
        localStorage.clear();
        navigate("/login");
    };
    return (
        <>
            <Button onClick={handleLogout} className='float-end m-4 p-3'> 
                <BiPowerOff/>
            </Button>
        </>
    );
}
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
    font-size: 1.3rem;
    color: #ebe7ff;
}
`;
