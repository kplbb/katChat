import React from 'react'
import styled from "styled-components";
import WelcomeDog from "../assets/welcome_dog.gif"
import MovingComponent from 'react-moving-text'
export default function Welcome({ currentUser}) {
    return (
        <>
        <div className="row m-auto d-flex justify-content-center text-center">
            <img className="w-50 pb-3" src={WelcomeDog} alt="ROBOT"/>
            <h1> WELCOME, 
                <MovingComponent
                type="fadeInFromBottom"
                duration="2000ms"
                delay="2s"
                direction="normal"
                timing="ease"
                iteration="50"
                fillMode="none">
                {currentUser.username}             
                </MovingComponent>
            </h1>
        </div>
        </>
    )
}  
