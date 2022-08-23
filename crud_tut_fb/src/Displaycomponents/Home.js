import "../App.css";
import LpgPrice from "./LpgPrice";

function Home() {
  
  return (
    <>
     <div className="flex justify-around">
      <div>
      </div>
      <div>
      </div>
     <div className="text-5xl">
       Welcome Admin!!
       <img className="" alt="Online Gas Booking System" src={require('../images/HomeGas.png')}/>
    </div>
  <div className="">
    <LpgPrice />
  </div>
    </div>

    </>
  );
}

export default Home;
