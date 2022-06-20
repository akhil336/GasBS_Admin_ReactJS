import "../App.css";
import "../css style/table.css";
import { db } from "../firebase";
import { set, remove, update,ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

function UserOrders() {
   // const [user, setUser] = useState("");
    const [order, setOrders] = useState([]);
    
    const [isEdit, setIsEdit] = useState(false);
    const [tempOid, setTempOid] = useState("");
    const [status,setStatus]=useState("");

    useEffect(() => {
      onValue(ref(db,'/Orders'), (snapshot) => {
        setOrders([]);
        const data = snapshot.val();
const arrays=[];
for (let id in data) {
    arrays.push({ id, ...data[id] });
  }
  setOrders(arrays);

    //     if (data !== null) {
    //         console.log(data.key);
    //       Object.values(data).map((order) => {
    //         setOrders((oldArray) => [...oldArray, order]);
    //      });
    //    }

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
              <div >   <input className="inline-block text-sm px-4 py-2
              leading-none border rounded text-black border-black bg-gray-100 
               hover:text-gray-700 hover:bg-gray-200 mt-4 lg:mt-0" type="text" value={status} onChange={handleStatusChange} autofocus />
      
          <button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-black bg-green-700 
        hover:text-gray-100 hover:bg-green-900 mt-4 lg:mt-0" onClick={handleSubmitChange}>Submit Change</button>
          <button className="inline-block text-sm px-4 py-2
       leading-none border rounded text-white border-black bg-red-700 
        hover:text-gray-100 hover:bg-red-900 mt-4 lg:mt-0"
            onClick={() => {
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
                                <div class="font-semibold text-white text-center">UserID</div>
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

    <tr>
      <td class="p-2">
        <div class="font-medium text-gray-800">
        {order.amount}
        </div>
      </td>
      <td class="p-2">
        <div class="font-medium text-gray-800">
        {order.datetime}
        </div>
      </td>
      <td class="p-2">
<div class="font-medium text-gray-800">
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
        {order.uid}
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