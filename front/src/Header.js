import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
const Header = () => {
  const { isFlipped, handleFlip } = useContext(AppContext);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Link to="/musk">
        <NameDiv onClick={handleFlip}>Joe Biden's Tweets</NameDiv>
      </Link>

      <Link to="/biden">
        <NameDiv onClick={handleFlip}>Elon Musk's Tweets</NameDiv>
      </Link>
    </ReactCardFlip>
  );
};

export default Header;

const NameDiv = styled.button`
  height: 100%;
  width: 100%;
  padding: 1.8rem 1.2rem;
  border: none;
  background-color: #867ae9;
  font-size: 2.5rem;
  color: #21094e;
  &:hover {
    transition: 0.7s ease-in-out;
    opacity: 0.85;
  }
  @media screen and (max-width: 800px) {
    &:hover {
      transition: none;
      transform: none;
    }
  }
`;
