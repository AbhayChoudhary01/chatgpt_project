import React from "react"
//import ChatGPTdiv from '../components/ChatGPTdiv.js'
import '../css/LandingPage.css'

export default function LandingPage() {
    return (
        <div className="global-body">
            
            <div className="sidebar">
                <hr/>
                <a href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>

            <div className="content">
                {/* <ChatGPTdiv/> */}
            </div>

        </div>
    )
}