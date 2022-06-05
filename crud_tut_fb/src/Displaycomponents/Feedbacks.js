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
          
        <table><h4>Feedback list</h4>
          <tr>
            <td>Rating</td>
            <td>Date/Time</td>
            <td>Feedback</td>
            <td>UserID</td>
          </tr>
        {feedback.map((fb) => (
          <tr>
            <td>{fb.Rating}</td>
            <td>{fb.datetime}</td>
            <td>{fb.feedback}</td>
            <td>{fb.uid}</td>
          </tr>
        ))}
        
        </table>
      </div>
    );
  }
  
export default Feedbacks;