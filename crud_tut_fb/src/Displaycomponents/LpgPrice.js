import "../App.css";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { db } from "../firebase";
import { update, ref, onValue } from "firebase/database";
import PriceUpdateModal from "./PriceUpdateModal";

function LpgPrice() {
  
    const [oldPrice, setOldPrice] = useState("");
    const [newPrice, setNewPrice] = useState("");

    let Props = {
      oldPrice:{oldPrice}, 
      newPrice:{newPrice}
      }

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

  return (
    <>
    <div class="flex flex-col bg-yellow-500 rounded-lg p-4">
        <div>LPG Price in our Database : <div className="bg-green-300 text-red-900 font-bold">{oldPrice}</div></div>
        
        <div>Market LPG Price : <div className="bg-green-300 text-red-900 font-bold">{newPrice}</div></div>
        
        {/* <button className={btncls}>Update price</button>
        
        let Props = {
imageUrl:"/js.com",
imageText:""food""
}
<ImageText {...Props} />
  */}
        <div> <PriceUpdateModal {...Props}/> </div>
    </div>
    </>
  );
}

export default LpgPrice;