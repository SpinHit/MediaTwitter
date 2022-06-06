import React from "react";
import Linkify from 'react-linkify';
import like from './like3.svg';
import retweet from './retweet.svg';
import comment from './comment.svg';


export default function({ tweets }){
    var today = new Date();
    var dateDuTweet =  new Date(Date.parse(today)-Date.parse(tweets.created_at));

    return (
      <div className="carteTwitter">
        <ul>
          <li className="twitterDate">
            <p>{dateDuTweet.getHours()-1}h{dateDuTweet.getMinutes()}min</p>
          </li>
          <li className="twitterText">
          
          <Linkify >{tweets.text}</Linkify>
          
          <div className="likes">
            
            <img src={like} alt="likes"/>
            {tweets.public_metrics.like_count} 
            
            <img src={retweet} alt="retweets"/>
            {tweets.public_metrics.retweet_count}
            
            <img src={comment} alt="commentaires"/>
            {tweets.public_metrics.quote_count}
            
            </div>
            
          </li>
        </ul>
      </div>
    );
  };

