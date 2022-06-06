import React from "react";
import Logo from "./logo.png";

export default function TwitterHead(){
    return(
    <header className="twitterHead">
<img src={Logo} alt="logo"/>
    </header>
    );
}