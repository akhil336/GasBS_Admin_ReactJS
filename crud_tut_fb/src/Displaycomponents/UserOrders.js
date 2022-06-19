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
          
        <table><h4>Orders list</h4>
        <tr>{isEdit ? (
              <>   <input type="text" value={status} onChange={handleStatusChange} />
      
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setStatus("");
            }}
          >
            X
          </button>
        
          </>) : (<>
        
        </>)}
        </tr>
          <tr>
            <td>Amount</td>
            <td>Date/Time</td>
            <td>Status</td>
            <td>UserID</td>
          </tr>
        {order.map((order) => (
          <tr>
            <td>{order.amount}</td>
            <td>{order.datetime}</td>
            <td>
            {isEdit ? (
              <>   {order.status}
          </>) : (<>
        {order.status} <button onClick={() => handleUpdate(order)}>update</button>
        </>)}
             
        </td>
            
            <td>{order.uid}</td>
          </tr>
        ))}
        
        </table>
      </div>
    );
  }
  
export default UserOrders;