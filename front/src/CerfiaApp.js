import React, { useEffect, useState } from "react";
import axios from 'axios';
import CarteTwitter from "./CarteTwitter";
import './App.scss';

export default function CerfiaApp(){
    const [data, setData] = useState([])
    const [dataProfile, setData2] = useState([])

     useEffect(() => {
        (async () => {
            const data1 = await axios.get('http://127.0.0.1:8000/api/tweet/Cerfia')
            const data2 = await axios.get('http://127.0.0.1:8000/api/profile/Cerfia')
            setData(data1.data);
            setData2(data2.data);
        })()
    }, [])
  return (
    <div className="tweetsZone">
       {data.slice(0,5).map(item =>(
         <div className="twitterCube">
         <img src={dataProfile.profile_image_url} alt="profile Cerfia"/>
         <div className="cardZone">
         <div className="twitterName">
        <p>{dataProfile.name}</p><span>@{dataProfile.username}</span>
         </div>
         <CarteTwitter key={item.id} tweets={item} />
         </div>
         </div>
        ))}
    </div>
  );
};
