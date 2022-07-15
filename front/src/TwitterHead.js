import React from "react";
import Logo from "./images/logo.png";

export default function TwitterHead() {
    return (
        <header className="twitterHead">
            <img src={Logo} alt="logo" />
        </header>
    );
}