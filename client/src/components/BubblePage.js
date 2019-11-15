import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const axiosWithAuth = ()=>{
    return axios.create({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  }

  useEffect(()=>{
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then((response)=>{
        setColorList(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })
  },[]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
