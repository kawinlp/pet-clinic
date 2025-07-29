import React, { useState,useEffect } from "react";
import Logo from '../../assets/Logo1.png'
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { GetRecieptByEmployeeId,GetRecieptAll } from "../../../services/https/Reciept";
import { PayfinishInterface, RecieptInterface} from "../../../interfaces/IList";
import Navbar from "../../../component/navbar/Navbar2";
import { message,Empty,Card} from "antd";
import bg from '../../../assets/dog.png'
import bg1 from '../../../assets/bg-foot.png'
import bg2 from '../../../assets/2709577_14710.jpg'
import './reciept.css';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
function RecieptProduct() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
        navigate('/');
        }
    }, [token, navigator]);
    const { Meta } = Card;
    const [reciept,setReciept] = useState<RecieptInterface[]>([])
    const [employee,setEmployee] = useState("")
    const EmployeeID = localStorage.getItem('EmployeeID')
    const getRecieptById = async () => {
        // let res = await GetRecieptByEmployeeId(Number(EmployeeID))
        // if(res){
        //     setReciept(res)
        //     setEmployee(res[0].Employee.EmployeeID)
        // }
        let res = await GetRecieptAll()
        if(res){
            setReciept(res)
            setEmployee(res[0].Employee.EmployeeID)
        }
    }
    useEffect(() => {
        getRecieptById()
      }, []);
    
      const handleScrollLeft = () => {
        const element = document.querySelector('.reciept-box1');
        if (element) {
          element.scrollLeft -= 220; 
        }
      };
      const handleScrollRight = () => {
        const element = document.querySelector('.reciept-box1');
        if (element) {
          element.scrollLeft += 220;
        }
      };
      const [query,setQuery] = useState("");
    const filterReciept = reciept.filter((reciept) =>
    Object.values(reciept).some((Name) =>
      reciept.Employee?.EmployeeID.toLowerCase().includes(query.toLowerCase())
      || reciept.Date.toLowerCase().includes(query.toLowerCase())
    ) 
  );

    return(
        <>
            <header><Navbar/></header>
            <section className="flex flex-col justify-center items-center">
                <div className="w-96 flex justify-center m-1 relative top-9 z-40">
                    <div className="relative w-full">
                        <input type="text" className="w-full text-sm backdrop-blur-sm  py-1 pl-10 pr-4 rounded-sm focus:outline-none border-2 border-gray-200 focus:border-[#22668D] transition-colors duration-300" 
                                placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="text-[#22668D] w-5 h-5 text-gray-800 dark:text-white" />
                            </div>
                    </div>
                </div>
                <div className="relative top-11 z-40 w-96">
                    <img alt="" src={bg}/>
                </div>
                    <div className="h-80 w-full bg-[#8ECDDD] flex flex-col justify-center items-center z-0 " >
                        <div className="flex flex-col h-36  items-center ">
                            <span className="text-5xl text-white font-semibold mb-2 " style={{ letterSpacing: '0.3em'}}>RECIEPT</span>
                        </div>
                        
                    </div>
                {reciept.length ===0?(
                        <div className="flex justify-center items-center absolute w-[100%] h-[100%] top-[25%]">
                            <div className="w-40 "><Empty /></div>
                        </div>
                    ):(
                        filterReciept.length < 4?(
                            <div className={`reciept-box2 flex-shrink-0 z-40 absolute top-60 `}>
                                {filterReciept.map((r)=>(
                                    
                                    <Card key={r.ID} className="transform hover:scale-110  transition-all duration-300 ease-in-out border hover:border-[#22668D] border-[#22668D] shadow-xl relative flex-shrink-0 p-3 m-3 bottom-10 z-40">
                                        <Meta title={`No.${r.ID}`} />
                                        <span>{r.Employee?.EmployeeID}</span><br/>
                                        <span>{moment(r.Date).format('DD/MM/YYYY HH:mm')}</span><br />
                                        <span>{r.Totalprice == undefined ? "-" : `เงินรวม: ${r.Totalprice.toLocaleString()}.00 ฿`}</span><br />
                                        <span>{`จำนวนสินค้า: ${r.AmountProduct}`}</span>
                                        
                                        <button className="border border-[#22668D] relative w-20 h-10 flex justify-center left-3 items-center top-5  text-[#22668D]  rounded-md transition-all duration-400 ease-in-out transform opacity-100 hover:bg-[#FFCC70] hover:text-white hover:border-[#F5AC29] "
                                        onClick={() => navigate(`/reciepts/${r.ID}`)}
                                        >
                                            More info
                                        </button>
                                    </Card>
                                    )
                                )}
                            </div>
                        ):(
                        <>
                            <div className="text-5xl text-black flex flex-row justify-between left-0 p-5 absolute top-[45%] w-full font-semibold">
                                <button className="bg-white text-[#22668D] shadow-md rounded-full w-16 h-16 flex justify-center p-1 relative z-2 cursor-pointer" onClick={handleScrollLeft}>{'<'}</button>
                                <button className="bg-white text-[#22668D] shadow-md rounded-full w-16 h-16  flex justify-center p-1 relative z-2 cursor-pointer" onClick={handleScrollRight}>{'>'}</button>
                            </div> 
                            <div className={`reciept-box1 flex-shrink-0 z-40 absolute`}>
                                {filterReciept.map((r)=>( 
                                    <Card key={r.ID} className="transform hover:scale-110  transition-all duration-300 ease-in-out border hover:border-[#22668D] border-[#22668D] shadow-xl relative flex-shrink-0 p-3 m-3 bottom-10 z-40">
                                        <Meta title={`No.${r.ID}`} />
                                        <span>{r.Employee?.EmployeeID}</span><br/>
                                        <span>{moment(r.Date).format('DD/MM/YYYY HH:mm')}</span><br />
                                        <span>{r.Totalprice == undefined ? "-" : `เงินรวม: ${r.Totalprice.toLocaleString()}.00 ฿`}</span><br />
                                        <span>{`จำนวนสินค้า: ${r.AmountProduct}`}</span>
                                        
                                        <button className="border border-[#22668D] relative w-20 h-10 flex justify-center left-3 items-center top-5  text-[#22668D]  rounded-md transition-all duration-400 ease-in-out transform opacity-100 hover:bg-[#FFCC70] hover:text-white hover:border-[#F5AC29] "
                                        onClick={() => navigate(`/reciepts/${r.ID}`)}
                                        >
                                            More info
                                        </button>
                                    </Card>
                                    )
                                )}
                            </div>
                            </>)
                    )}
            </section>
        </>
    )
}
export default RecieptProduct