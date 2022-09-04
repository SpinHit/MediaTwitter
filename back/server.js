const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
var mysql = require('mysql');
const { json } = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8000;
const BEARER_TOKEN = '';
const get = util.promisify(request.get);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "twittermedia"
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

function database(text, nombre_retweets, nombre_likes, nombre_partage, nombre_commentaires, date_de_creation_tweet, id_tweet, id_user, photo, username) {
  //var sql = "INSERT INTO tweets (text, nombre_retweets, nombre_likes, nombre_partage, nombre_commentaires, date_de_creation_tweet, id_tweet, id_user, photo, username) VALUES ('"+texting+"', 0, 0, 0, 0, 'date', 12, 13, 'photo', 'username')";
  var sql2 = "INSERT INTO tweets (text, nombre_retweets, nombre_likes, nombre_partage, nombre_commentaires, date_de_creation_tweet, id_tweet, id_user, photo, username) SELECT * FROM (SELECT " + text + " AS text, " + nombre_retweets + " AS nombre_retweets, " + nombre_likes + " AS nombre_likes, " + nombre_partage + " AS nombre_partage, " + nombre_commentaires + " AS nombre_commentaires,'" + date_de_creation_tweet + "' AS date_de_creation_tweet, " + id_tweet + " AS id_tweet, " + id_user + " AS id_user,'" + photo + "' AS photo, '" + username + "' AS username) AS temp WHERE NOT EXISTS ( SELECT id_tweet FROM tweets WHERE id_tweet = " + id_tweet + ") LIMIT 1;"

  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}


function validate(item) {
  if (item == null) {
    return null;
  } else {
    return "'" + item.replaceAll("'", "''") + "'";
  }
}
function interogation(item) {
  if (item == null) {
    return null;
  } else {
    return item.split('?').join('');

  }
}


//CORS is adde as dependancy and allowed response from all origin
// Allowed access control from all origin in the header
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Method", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, charset=utf-8'"
  );
  next();
});

let getTweetv2 = async (req, res, id) => {

  const streamURL = new URL(
    "https://api.twitter.com/2/users/by/username/" + id + "?user.fields=profile_image_url"
  );

  const requestConfig = {
    url: streamURL,
    auth: {
      bearer: BEARER_TOKEN,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      throw new Error(response.body.error.message);
    }

    const streamURL2 = new URL(
      "https://api.twitter.com/2/users/" + response.body.data.id + "/tweets?max_results=30&tweet.fields=created_at,public_metrics"
    );

    const requestConfig2 = {
      url: streamURL2,
      auth: {
        bearer: BEARER_TOKEN,
      },
      json: true,
    };

    const response2 = await get(requestConfig2);

    if (response2.statusCode !== 200) {
      throw new Error(response2.body.error.message);
    }

    var image = { image: response.body.data };
    var text = { text: response2.body.data };
    var textAndImage = Object.assign(image, text);

    //database(texting);

    for (var key in text.text) {
      if (text.text.hasOwnProperty(key)) {

        database(validate(text.text[key].text), text.text[key].public_metrics.retweet_count, text.text[key].public_metrics.like_count, text.text[key].public_metrics.reply_count, text.text[key].public_metrics.quote_count, text.text[key].created_at, text.text[key].id, image.image.id, image.image.profile_image_url, image.image.username);
      }
    }
    res.send(textAndImage);


  } catch (err) {
    res.send(err);
  }
};

let getComment = async (req, res, id) => {

  const streamURL = new URL(
    "https://api.twitter.com/2/users/by/username/" + id + "?user.fields=profile_image_url"
  );

  const requestConfig = {
    url: streamURL,
    auth: {
      bearer: BEARER_TOKEN,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      throw new Error(response.body.error.message);
    }

    const streamURL2 = new URL(
      "https://api.twitter.com/2/users/" + response.body.data.id + "/tweets?max_results=30&tweet.fields=created_at,public_metrics"
    );

    const requestConfig2 = {
      url: streamURL2,
      auth: {
        bearer: BEARER_TOKEN,
      },
      json: true,
    };

    const response2 = await get(requestConfig2);

    if (response2.statusCode !== 200) {
      throw new Error(response2.body.error.message);
    }

    var image = { image: response.body.data };
    var text = { text: response2.body.data };
    var textAndImage = Object.assign(image, text);

    //database(texting);

    for (var key in text.text) {
      if (text.text.hasOwnProperty(key)) {

        database(validate(text.text[key].text), text.text[key].public_metrics.retweet_count, text.text[key].public_metrics.like_count, text.text[key].public_metrics.reply_count, text.text[key].public_metrics.quote_count, text.text[key].created_at, text.text[key].id, image.image.id, image.image.profile_image_url, image.image.username);
      }
    }
    res.send(textAndImage);


  } catch (err) {
    res.send(err);
  }
};

app.get('/api/Tweet/:id', (req, res) => {
  const { id } = req.params;
  getTweetv2(req, res, id);
});

app.get('/api/LocalTweets', (req, res) => {
  var sql = "SELECT * FROM tweets ORDER BY date_de_creation_tweet DESC";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var data = [];
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        data[key] = { text: interogation(result[key].text), id: result[key].id, nombre_retweets: result[key].nombre_retweets, nombre_likes: result[key].nombre_likes, nombre_partage: result[key].nombre_partage, nombre_commentaires: result[key].nombre_commentaires, date_de_creation_tweet: result[key].date_de_creation_tweet, id_tweet: result[key].id_tweet, id_user: result[key].id_user, photo: result[key].photo, username: result[key].username };
      }
    }
    res.send(data);

  });
});



app.use((req, res) => res.status(404).type("txt").send("🤷‍♂️"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
