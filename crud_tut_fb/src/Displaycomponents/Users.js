import "../App.css";
import { db } from "../firebase";
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
           
<section class="antialiased text-gray-600 px-4" x-data="app">
    <div class="flex flex-col justify-center h-full">
       
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-red-900">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">All Users</div>
            </header>

            <div class="">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-700 bg-red-700">
                        <tr>
                            
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">User Name</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Email</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Phone</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Address</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Password</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
                      
        {/* <table><h4>Users list </h4>
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
            <td>{user.address}</td>
            <td>{user.password}</td>
          </tr>
        ))}
        
        </table> */}
                  {users.map((user) => (
                      <tr key={user.email}>
                        <td class="p-2">
                        <div class="font-medium text-gray-800">
                        {user.name}
                        </div>
                        </td>

                        <td class="p-2">
                        <div class="font-medium text-gray-800">
                        {user.email}
                        </div>
                        </td>


                        <td class="p-2">
                        <div class="font-medium text-gray-800">
                        {user.phone}
                        </div>
                        </td>


                        <td class="p-2">
                        <div class="font-medium text-gray-800">
                        {user.address}
                        </div>
                        </td>


                        <td class="p-2">
                        <div class="font-medium text-gray-800">
                        {user.password}
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
export default Users;