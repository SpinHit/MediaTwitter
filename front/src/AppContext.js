import React, { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);

  const [tweet, setTweet] = useState([]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <AppContext.Provider
      value={{
        toggle,
        setToggle,
        handleToggle,
        tweet,
        setTweet,
        isFlipped,
        setIsFlipped,
        handleFlip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
