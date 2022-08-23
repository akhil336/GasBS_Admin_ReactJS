import "../App.css";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { db } from "../firebase";
import { update, ref, onValue } from "firebase/database";
import PriceUpdateModal from "./PriceUpdateModal";

function LpgPrice() {
  
    const [oldPrice, setOldPrice] = useState("Loading..");
    const [newPrice, setNewPrice] = useState("Loading..");

    let Props = {
      oldPrice:{oldPrice}, 
      newPrice:{newPrice}
      }

    const fetchPriceAPI=async()=>
    { 
          checkCookie();    
    }

    const fetchPriceDB=async()=>{
        onValue(ref(db,'/LpgPrice'), (snapshot) => {
            setOldPrice("");
            const data = snapshot.val();
            if (data !== null) {
              setOldPrice(data.price);
            }
          });
    }
    
    useEffect(() => {
        fetchPriceDB();
      fetchPriceAPI();
    }, []);

    function setCookie(cname,cvalue,exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    
    const checkCookie=async()=> {
      let LPGprice = getCookie("LPGprice");
      if (LPGprice != "") 
      {
        setNewPrice(LPGprice);
      }
      else 
      {
       try{
        const response=await axios('http://localhost:8081/priceMangaluru');
        console.log("LPG PRICE FETCHED FROM API : "+response.data);
        if(response!=null)
        {
          setCookie("LPGprice", response.data, 1);//sets cookie(key,value,expiryDate("1"DayHere))
          setNewPrice(response.data);
        }
        //for testing:
          // fetch('https://reqres.in/api/users/2')
          // .then((response) => response.json())
          // .then((data) => LPGprice=data.data.first_name);
            // LPGprice = prompt("Please enter your name:","");
        }
        catch(err)
        {
          console.log(err);
          setNewPrice("Failed to get market price");
        }
    }
  }


  return (
    <>
    <div class="flex flex-col bg-yellow-500 rounded-lg p-4">
        <div>LPG Price in our Database : <div className="bg-green-300 text-red-900 font-bold">{oldPrice}</div></div>
        
        <div>Market LPG Price : <div className="bg-green-300 text-red-900 font-bold">{newPrice}</div></div>
        
        <div> <PriceUpdateModal {...Props}/> </div>
    </div>
    </>
  );
}

export default LpgPrice;