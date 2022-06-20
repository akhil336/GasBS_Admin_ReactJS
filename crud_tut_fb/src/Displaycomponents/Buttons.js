import "../App.css";
import { db } from "../firebase";
import {  ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import UserOrders from "./UserOrders";
import Feedbacks from "./Feedbacks";
import { useNavigate } from "react-router-dom";
import Users from './Users';
import Gasbs from "./Gasbs";



function Buttons() {
   
const [showUser,setShowUser]=useState(false);
const [showOrders,setShowOrder]=useState(false);
const [showFeedbacks,setShowFeedbacks]=useState(false);
    return (
      <div className="App">
        <nav class="flex items-center justify-between flex-wrap bg-red-900 p-6">
        
        <Gasbs/>
        {/* {showUser?<><button onClick={()=>setShowUser(false)} >Hide</button><br/><Users /></>:null} */}
        {!showUser?<><button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-white 
       hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0" onClick={()=>{setShowUser(true);setShowFeedbacks(false);setShowOrder(false)}}>All Users</button><br/></>:null}

        {/* {showOrders?<><button onClick={()=>setShowOrder(false)} >Hide</button><br/><UserOrders /></>:null} */}
        {!showOrders?<><button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-white 
       hover:border-transparent hover:text-red-900  hover:bg-white mt-4 lg:mt-0" onClick={()=>{setShowOrder(true);setShowUser(false);setShowFeedbacks(false)}} >All Orders</button><br/></>:null}

        {/* {showFeedbacks?<><button onClick={()=>setShowFeedbacks(false)} >Hide</button><br/><Feedbacks /></>:null} */}
        {!showFeedbacks?<><button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-white 
       hover:border-transparent hover:text-red-900  hover:bg-white mt-4 lg:mt-0" onClick={()=>{setShowFeedbacks(true);setShowOrder(false);setShowOrder(false)}}>User Feedback</button><br/></>:null}
        
        
        </nav>
        <br/>
        {showUser?<><button className="inline-block text-md
       leading-none border rounded text-white border-black bg-black
       hover:border-black hover:text-black hover:bg-white mt-4 lg:mt-0 float-left ml-96" onClick={()=>setShowUser(false)} >Back</button><br/><Users /></>:null}
        
        {showOrders?<><button className="inline-block text-md
       leading-none border rounded text-white border-black bg-black
       hover:border-black hover:text-black hover:bg-white mt-4 lg:mt-0 float-left ml-96" onClick={()=>setShowOrder(false)} >Back</button><br/><UserOrders /></>:null}
      
      {showFeedbacks?<><button className="inline-block text-md
       leading-none border rounded text-white border-black bg-black
       hover:border-black hover:text-black hover:bg-white mt-4 lg:mt-0 float-left ml-96" onClick={()=>setShowFeedbacks(false)} >Back</button><br/><Feedbacks /></>:null}
      </div>
    );
  }
  
export default Buttons;