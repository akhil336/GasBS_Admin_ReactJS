import "../App.css";
import { db } from "../firebase";
import {  ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import UserOrders from "./UserOrders";
import Feedbacks from "./Feedbacks";
import { useNavigate } from "react-router-dom";
import Users from './Users';
import Gasbs from "./Gasbs";
import Home from "./Home";

var clsButton="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-900 hover:scale-110 hover:font-semibold hover:bg-white mt-4 lg:mt-0";

function Buttons() {
const [showHome,setShowHome]=useState(true);
const [showUser,setShowUser]=useState(false);
const [showOrders,setShowOrder]=useState(false);
const [showFeedbacks,setShowFeedbacks]=useState(false);
    return (
      <div className="App">
        <nav className="flex items-center justify-between flex-wrap bg-red-900 p-6">
        
        <Gasbs/>

        {showUser?<><button className={clsButton} onClick={()=>{setShowUser(false);setShowHome(true)}} >Home</button><br/></>:null}
        
        {showOrders?<><button className={clsButton} onClick={()=>{setShowOrder(false);setShowHome(true)}} >Home</button><br/></>:null}
      
        {showFeedbacks?<><button className={clsButton} onClick={()=>{setShowFeedbacks(false);setShowHome(true)}} >Home</button><br/></>:null}
     
          {!showUser?<><button className={clsButton} onClick={()=>{setShowUser(true);setShowFeedbacks(false);setShowOrder(false);setShowHome(false)}}>All Users</button><br/></>:null}

          {!showOrders?<><button className={clsButton} onClick={()=>{setShowOrder(true);setShowUser(false);setShowFeedbacks(false);setShowHome(false)}} >All Orders</button><br/></>:null}

          {!showFeedbacks?<><button className={clsButton} onClick={()=>{setShowFeedbacks(true);setShowOrder(false);setShowUser(false);setShowHome(false)}}>User Feedback</button><br/></>:null}
          
        
        </nav>
        <br/>
        {showHome?<><Home/></>:null}
        {showUser?<><br/><Users /></>:null}
        
        {showOrders?<><br/><UserOrders /></>:null}
      
      {showFeedbacks?<><br/><Feedbacks /></>:null}
      </div>
    );
  }
  
export default Buttons;