import "./App.css";
import { db } from "./firebase";
import {  ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

function Users() {
   // const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      onValue(ref(db,'/Users'), (snapshot) => {
        setUsers([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((user) => {
            setUsers((oldArray) => [...oldArray, user]);
          });
        }
      });
    }, []);
  
    return (
      <div className="App">
          
        <table><h4>Users list</h4>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Password</td>
          </tr>
        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.password}</td>
            <td>{user.address}</td>
          </tr>
        ))}
        
        </table>
      </div>
    );
  }
  
export default Users;