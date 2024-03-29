import React,{useState} from "react";
import { update,ref, onValue } from "firebase/database";
import { db } from "../firebase";

function PriceUpdateModal({oldPrice,newPrice}) {

const failed="Failed to get market price";
var Price = newPrice.newPrice;

if(Price===failed ||Price.length===0)
    Price=oldPrice.oldPrice;

const [showModal, setShowModal] = useState(false);
const [tempPrice,setTempPrice] = useState("");

const handlePriceChange = (e) => {
    setTempPrice(e.target.value);
  };

  const handleSaveChange = () => {
    console.log(tempPrice);
    update(ref(db, '/LpgPrice'), {
        price:tempPrice
    });
    
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-green-500 text-white active:bg-green-900 font-bold uppercase text-sm p-3 mt-2 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() =>{setTempPrice(Price); setShowModal(true)}}>
        Update Price</button>
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
                    Update LPG Price
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input type="text" className="bg-green-100 p-2 border-2 border-green-600 rounded-md" value={tempPrice} onChange={handlePriceChange}></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent hover:bg-gray-300 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveChange}>
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
  );
}

export default PriceUpdateModal;