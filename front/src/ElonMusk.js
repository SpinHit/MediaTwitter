import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import TweetCard from "./TweetCard";

const ElonMusk = () => {
  const { tweet, setTweet } = useContext(AppContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tweet/musk")
      .then((res) => res.json())
      .then((data) => {
        setTweet(data);
      });
  }, [setTweet]);

  return (
    <div class="mx-10 lg:mx-60 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {tweet.map((t) => {
        return <TweetCard key={t.id} tweets={t} />;
      })}
    </div>
  );
};

export default ElonMusk;
