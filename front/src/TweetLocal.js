import React, { useEffect, useState } from "react";
import axios from 'axios';
import CarteTwitter from "./CarteTwitter";
import './App.scss';
import ReactPaginate from 'react-paginate';


export default function TweetApp() {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const data1 = await axios.get('http://127.0.0.1:8000/api/LocalTweets');
      setData(data1.data);
    })()
  }, [])

  useEffect(() => {

    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="midle">
        {currentItems.map(item => (

          <div className="twitterCube">
            { }
            <img src={item.photo} alt={"profile"} />
            <div className="cardZone">
              <div className="twitterName">
                <p>{item.username}</p><span>@{item.username}</span>
              </div>
              <CarteTwitter key={item.id} tweets={{ text: item.text, created_at: item.date_de_creation_tweet, public_metrics: { like_count: item.nombre_likes, retweet_count: item.nombre_retweets, quote_count: item.nombre_partage } }} />
            </div>
          </div>
        ))}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>

    </>
  );
}