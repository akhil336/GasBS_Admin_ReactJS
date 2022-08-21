import "../App.css";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { db } from "../firebase";
import { update, ref, onValue } from "firebase/database";
import PriceUpdateModal from "./PriceUpdateModal";

const btncls="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-8 px-4 text-sm";

function LpgPrice() {
  
    const [price, setPrice] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const fetchPriceAPI=async()=>
    {
        
        try
        {  
            // const response=await axios('52.66.203.44:8080/pricemangaluru');
            const response=await axios('http://localhost:8081/priceMangaluru');
            if(response!=null)
            setNewPrice(response.data)
        }
        catch(err)
        {
            console.log(err);
            setNewPrice("Failed to get market price");
        }    
    }

    const fetchPriceDB=async()=>{
        onValue(ref(db,'/LpgPrice'), (snapshot) => {
            setPrice("");
            const data = snapshot.val();
            if (data !== null) {
              setPrice(data.price);
            }
          });
    }
    
    useEffect(() => {
        fetchPriceDB();
      fetchPriceAPI();
    }, []);

  return (
    <>
    <div class="flex flex-col bg-yellow-500 rounded-lg p-4">
        <div>LPG Price in our Database : <div className="bg-green-300 text-red-900 font-bold">{price}</div></div>
        
        <div>Market LPG Price : <div className="bg-green-300 text-red-900 font-bold">{newPrice}</div></div>
        
        {/* <button className={btncls}>Update price</button> */}
        <div> <PriceUpdateModal oldPrice={price} newPrice={newPrice}/> </div>
    </div>
    </>
  );
}

export default LpgPrice;