import React from "react";
import Linkify from 'react-linkify';
import like from './images/like1.svg';
import retweet from './images/retweet.svg';
import comment from './images/comment.svg';
import Moment from 'react-moment';
import 'moment/locale/fr';


export default function ({ tweets }) {

  return (
    <div className="carteTwitter">
      <ul>
        <li className="twitterDate">
          <p><Moment fromNow>{tweets.created_at}</Moment></p>

        </li>
        <li className="twitterText">

          <Linkify >{tweets.text}</Linkify>

          <div className="likes">

            <img src={like} alt="likes" />
            {tweets.public_metrics.like_count}

            <img src={retweet} alt="retweets" />
            {tweets.public_metrics.retweet_count}

            <img src={comment} alt="commentaires" />
            {tweets.public_metrics.quote_count}

          </div>

        </li>
      </ul>
    </div>
  );
};

