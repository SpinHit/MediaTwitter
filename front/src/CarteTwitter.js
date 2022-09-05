import React from "react";
import Linkify from 'react-linkify';
import like from './images/like1.svg';
import retweet from './images/retweet.svg';
import comment from './images/comment.svg';
import Moment from 'react-moment';
import 'moment/locale/fr';

// Carte Twitter template
export default function ({ tweets }) {

  return (
    <div className="carteTwitter">
      <ul>
        <li className="twitterDate">
          {/* La librairie moment va faire en sorte d'afficher "Il y a X temps" en lui donnant la date comme entrée */}
          <p><Moment fromNow>{tweets.created_at}</Moment></p>

        </li>
        <li className="twitterText">
          {/* on fait passer l'enssemble du texte dans le Linkify de sorte a ce que si il y a un lien il va etre autmatiquement cliquable. */}
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

