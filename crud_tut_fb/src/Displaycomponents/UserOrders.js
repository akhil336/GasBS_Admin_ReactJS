import "../App.css";
import "../css style/table.css";
import { db } from "../firebase";
import { set, remove, update,ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import OrdersDetails from "./OrderDetails";

var clsGreen="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-black bg-green-700 hover:text-gray-100 hover:bg-green-900 mt-4 lg:mt-0";
var clsRed="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-black bg-red-700 hover:text-gray-100 hover:bg-red-900 mt-4 lg:mt-0";

function checkBookStat(bookStat)
{
 if(bookStat=="Pending")return "bg-red-400 text-black";
 else return "bg-green-300 text-gray-800";
}

function UserOrders() {
   // const [user, setUser] = useState("");
    const [order, setOrders] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempOid, setTempOid] = useState("");
    const [status,setStatus]=useState("");
  //  const [ordDetails,setOrdDetails]=useState(true);

    useEffect(() => {
      onValue(ref(db,'/Orders'), (snapshot) => {
        setOrders([]);
        const data = snapshot.val();
const arrays=[];
for (let id in data) {
    arrays.push({ id, ...data[id] });
  }
  arrays.reverse();
  setOrders(arrays);
     });
    }, []);
  


  //update

  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = (order) => {
    setIsEdit(true);
    setTempOid(order.id);
    setStatus(order.status);
  };

  const handleSubmitChange = () => {
    update(ref(db, `Orders/${tempOid}`), {
        status:status
    });
    
    setStatus("");
    setIsEdit(false);
  };


    return (
      <div className="App">
             
<section class="antialiased text-gray-600 px-4" x-data="app">
    <div class="flex flex-col justify-center h-full">
       
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-red-900">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Orders List</div>

                {isEdit ? (
              <div >  
                 <select className="inline-block text-sm px-4 py-2
              leading-none border rounded text-black border-black bg-gray-100 
               hover:text-gray-700 hover:bg-gray-200 mt-4 lg:mt-0" onChange={handleStatusChange} >
                {(() => {
        if (status=="Pending") {
          return (
            <> <option value="Pending" selected>Pending</option>
            <option value="Delivered">Delivered</option></> 
          )
        } else {
          return (
            <> <option value="Pending" >Pending</option>
            <option value="Delivered" selected>Delivered</option></> 
          )
        }
      })()}
      </select>
      
          <button className={clsGreen} onClick={handleSubmitChange}>Submit Change</button>
          <button className={clsRed}   onClick={() => {
              setIsEdit(false);
              setStatus("");
            }}
          >
            X
          </button>
        
          </div>) : (<>
        
        </>)}
        
            </header>

            <div class="">
                <table class="table-auto w-full">
                  
                    <thead class="text-xs font-semibold uppercase text-gray-700 bg-red-700">
                        <tr>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Amount</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Date/Time</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Status</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Order Details</div>
                            </th>
                        </tr>

                       
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
        
        {order.map((order) => (
        //   <tr>
        //     <td>{order.amount}</td>
        //     <td>{order.datetime}</td>
        //     <td>
        //     {isEdit ? (
        //       <>   {order.status}
        //   </>) : (<>
        // {order.status} <button onClick={() => handleUpdate(order)}>update</button>
        // </>)}
             
        // </td>
            
        //     <td>{order.uid}</td>
        //   </tr>

    <tr className={checkBookStat(order.status)}>
      <td class="p-2">
        <div class="font-medium ">
        {order.amount}
        </div>
      </td>
      <td class="p-2">
        <div class="font-medium ">
        {order.datetime}
        </div>
      </td>
      <td class="p-2">
<div class="font-medium ">
{isEdit ? (
              <>   {order.status}
          </>) : (<>
        {order.status} <button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-black bg-green-700 
        hover:text-gray-100 hover:bg-green-900 mt-4 lg:mt-0" onClick={() => handleUpdate(order)}>update</button>
        </>)}
</div>
</td>
     <td class="p-2">
        <div class="font-medium text-gray-800">
        <OrdersDetails ordUid={order.uid} ordText="Order" ordBy="Ordered"/>
        </div>
    </td>
      </tr>

        ))}
        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        
        
      </div>
    );
  }
  
export default UserOrders;