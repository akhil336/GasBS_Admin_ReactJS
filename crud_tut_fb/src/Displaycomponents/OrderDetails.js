import "../App.css";
import "../css style/table.css";
import { db } from "../firebase";
import { set, remove, update,ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

function OrdersDetails(props) {
const userId=props.ordUid;
          
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    onValue(ref(db,'/Users'), (snapshot) => {
      setUsers([]);
      const data = snapshot.val();
      const arrays=[];
      for (let id in data) {
        if(id==userId)
        arrays.push({ id, ...data[id] });
      }
      setUsers(arrays);
    //   if (data !== null) {
    //     Object.values(data).map((user) => {
    //       setUsers((oldArray) => [...oldArray, user]);
    //     });
    //   }
    });
  }, []);
    
  return (
    <div className="App">
     {/* <h1>Hello {props.ordUid}</h1> */}
    <>
    


      <button
        className="nline-block text-sm px-4 py-2
        leading-none border rounded text-white border-black bg-blue-800 
         hover:text-gray-100 hover:bg-blue-600 mt-4 lg:mt-0"
        type="button"
        onClick={()=>setShowModal(true)}
      >View Details
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                 <h3 className="text-3xl font-semibold">
                    Order Details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <table>
                {users.map((user) => (
<>
  <tr class="border-b bg-gray-800 boder-gray-900">
              <td class="text-lg text-white font-medium px-6 py-4 whitespace-nowrap">
              Ordered by : 
              </td>
              <td class="text-lg text-white font-light px-6 py-4 whitespace-nowrap">
              {user.name}
              </td>
            </tr>
            <tr class="border-b bg-gray-800 boder-gray-900">
              <td class="text-lg text-white font-medium px-6 py-4 whitespace-nowrap">
              Phone no. : 
              </td>
              <td class="text-lg text-white font-light px-6 py-4 whitespace-nowrap">
              {user.phone}
              </td>
            </tr>
            <tr class="border-b bg-gray-800 boder-gray-900">
              <td class="text-lg text-white font-medium px-6 py-4 whitespace-nowrap">
                Email id :
              </td>
              <td class="text-lg text-white font-light px-6 py-4 whitespace-nowrap">
              {user.email}
              </td>
            </tr>
            <tr class="border-b bg-gray-800 boder-gray-900">
              <td class="text-lg text-white font-medium px-6 py-4 whitespace-nowrap">
              Address :
              </td>
              <td class="text-lg text-white font-light px-6 py-4 whitespace-nowrap">
              {user.address}
              </td>
            </tr>
            </>
                ))}
</table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{ setShowModal(false);}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
          </div>
        );
      }
      
export default OrdersDetails;