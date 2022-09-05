import React, { useEffect, useState } from "react";
import axios from 'axios';
import CarteTwitter from "./CarteTwitter";
import './App.scss';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function TweetApp(props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const [data, setData] = useState([])
  const [dataProfile, setData2] = useState([])

  useEffect(() => {
    (async () => {
      const data1 = await axios.get('http://127.0.0.1:8000/api/Tweet/' + props.nom);
      console.log(data1.data)
      setData(data1.data.text);
      setData2(data1.data.image);
    })()
  }, [])

  useEffect(() => {

    const endOffset = itemOffset + itemsPerPage;
    if (data != undefined) {
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    } else {
      toast.error("Ce pseudo n'existe pas", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {/*Toast pour avoir la pop up en ha*/}
      <ToastContainer />
      <div className="midle">
        {/*on map les tweets pour avoir les liste des tweets*/}
        {currentItems.map(item => (
          <div className="twitterCube">
            <img src={dataProfile.profile_image_url} alt={"profile" + props.nom} />
            <div className="cardZone">
              <div className="twitterName">
                <p>{dataProfile.name}</p><span>@{dataProfile.username}</span>
              </div>
              <CarteTwitter key={item.id} tweets={item} />
            </div>
          </div>
        ))}

        {/*Parametres de pagination*/}
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








