import "./App.css";
import Feedbacks from "./Displaycomponents/Feedbacks";
import Todo from "./Displaycomponents/Todo";
import UserOrders from "./Displaycomponents/UserOrders";
import Users from './Displaycomponents/Users';

function App() {
  

  return (
    <div className="App">
      <Users />
      <UserOrders />
      <Feedbacks />
    </div>
  );
}

export default App;
