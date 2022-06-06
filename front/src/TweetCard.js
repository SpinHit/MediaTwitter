import React from "react";
import Moment from "react-moment";
import "moment-timezone";

const TweetCard = ({ tweets }) => {
  console.log(typeof tweets.public_matrics);
  return (
    <div class="bg-purple-300 hover:bg-purple-400 shadow-xl rounded-xl p-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <ul>
        <li class="text-xl font-bold ">
          Time:
          <Moment parse="YYYY-MM-DD HH:mm">{tweets.created_at}</Moment>
        </li>
        <li class=" text-xl font-medium">
          Tweet: <span>{tweets.text}</span>
        </li>
      </ul>
    </div>
  );
};

export default TweetCard;
