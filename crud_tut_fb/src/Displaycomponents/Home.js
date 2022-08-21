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
    </div>
  <div className="">
    <LpgPrice />
  </div>
    </div>
    <div className="flex justify-center p-10">
<img className="" alt="Online Gas Booking System" src={require('../images/HomeGas.png')}/>
{/* Image from :  https://content.jdmagicbox.com/comp/tiruvallur/n2/9999pxx44.xx44.180630100847.b8n2/catalogue/the-vmc-gas-corporation-lpg-filling-plant-tiruvallur-lpg-gas-pipe-line-installation-services-mkddk5z5o8.jpg?clr= */}
</div>

    </>
  );
}

export default Home;
