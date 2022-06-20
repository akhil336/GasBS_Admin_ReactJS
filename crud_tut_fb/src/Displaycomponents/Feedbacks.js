import "../App.css";
import { db } from "../firebase";
import {  ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

function Feedbacks() {
   // const [user, setUser] = useState("");
    const [feedback, setFeedback] = useState([]);
  
    useEffect(() => {
      onValue(ref(db,'/Feedbacks'), (snapshot) => {
        setFeedback([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((fb) => {
            setFeedback((oldArray) => [...oldArray, fb]);
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
                                <div class="font-semibold text-white text-center">Rating</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Date/Time</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">Feedback</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-white text-center">UserID</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
        
        {feedback.map((fb) => (
          // <tr>
          //   <td>{fb.Rating}</td>
          //   <td>{fb.datetime}</td>
          //   <td>{fb.feedback}</td>
          //   <td>{fb.uid}</td>
          // </tr>
          <tr>
<td class="p-2">
<div class="font-medium text-gray-800">
{fb.Rating}*
</div>
</td>

<td class="p-2">
<div class="font-medium text-gray-800">
{fb.datetime}
</div>
</td>


<td class="p-2">
<div class="font-medium text-left text-gray-800">
{fb.feedback}
</div>
</td>


<td class="p-2">
<div class="font-medium text-gray-800">
{fb.uid}
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
  
export default Feedbacks;