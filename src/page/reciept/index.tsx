import React, { useState,useEffect } from "react";
import Logo from '../../assets/Logo1.png'
import { GetRecieptLatest } from "../../services/https/Reciept";
import { PayfinishInterface } from "../../interfaces/IList";
import { ArrowUturnLeftIcon,PrinterIcon ,ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import bg from '../../assets/dog.png'
import bg1 from '../../assets/bg-foot.png'
import bg2 from '../../assets/2709577_14710.jpg'
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import './reciept.css';
import { Modal } from 'antd';
function Reciept() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
        navigate('/');
        }
    }, [token, navigator]);
    const [reciept,setReciept] = useState<PayfinishInterface[]>([])
    const [info,setInfo] = useState<PayfinishInterface>()
    const getReciept = async() =>{
        let res = await GetRecieptLatest()
        if(res){
            setReciept(res);
            setInfo(res[0]);
        }
    }

    useEffect(()=>{
        getReciept();
    },[]);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
      };
    const handleCancel = () => {
        setOpen(false);
      };
      

    return(
        
        <div className="containerStyle flex justify-between items-center p-6">
            <div className=" w-28 h-28 rounded-full p-3 text-[#22668D] transform transition-transform hover:scale-110 hover:text-[#144F71]"><div className="rounded-full border-2  drop-shadow-md bg-white p-3"><Link to="/listProduct"><ArrowUturnLeftIcon/></Link></div></div>
            <div className="w-full  flex flex-col items-center justify-center p-14">
                <div className="relative top-11 z-40 w-96">
                    <img alt="" src={bg}/>
                </div>
                <div className="font-inter w-[50%] bg-white   drop-shadow-lg items-center justify-center p-5 text-lg " >
                    <div className="text-center flex-col flex justify-center ">
                        <div className="flex justify-center ">
                            <img className="bg-[#22668D] rounded-full w-20 h-20" alt="" src={Logo}/>
                        </div>
                        <span>Pet Clinic</span>
                        <div className=" font-inter  text-xs border-b border-dashed pb-2 border-black">
                            <a >123/4 หมู่ 5 ต. อ.ประโคนชัย จ.บุรีรัมย์ 31140</a><br/>
                            <a> โทร 0885576188</a><br/>
                            <a>เปิด 08.30-20.30 น.</a><br/>
                        </div>
                        <span  className=" pb-2 mt-1 font-semibold text-xl">ใบเสร็จรับเงิน</span>
                    </div>
                    <div className="font-inter border-b border-dashed border-black flex justify-between px-8 pb-2 mb-2">
                        <span>NO: {info?.Reciept?.ID}</span>  
                        <span>{moment(info?.Reciept?.Date).format('DD/MM/YYYY HH:mm')}</span>   
                        <span>ID: {info?.Reciept?.Employee?.EmployeeID}</span>         
                    </div>
                    
                        <div className="border-dashed border-b border-black flex flex-col pb-2 mb-2">
                            {reciept.map((reciept) => (
                                <div key={reciept?.ID}>
                                    {reciept?.List?.Product?.Name && (
                                        <div className="flex items-center ">
                                            <span className="flex-1 text-left ml-8 ">{reciept?.List?.Product?.Name}</span>
                                            <span className=" w-16">{`@x${reciept.List.Product.Price}`}</span>
                                            <span className="flex-1 text-right  "> {reciept.List.Amount}</span>
                                            <span className="flex-1 text-right mr-8 ">{reciept.List.Totalprice==undefined?"-":`${reciept.List.Totalprice.toLocaleString()}.00`}</span> <br/>
                                        </div>
                                    )}
                                </div>))}
                        </div>
                    <div></div>
                    <div className="font-inter border-dashed border-b border-black mb-2 pb-2">
                        <div className="flex px-8 justify-between border-dashed border-b border-black font-semibold pb-2 mb-2">
                            <span>Total :</span>
                            <span> {info?.Reciept?.Totalprice==undefined?"-":`${(info?.Reciept?.Totalprice).toLocaleString()}.00 `}</span>
                        </div>
                        <div className="flex justify-between px-8">
                            <span>Cash : </span>
                            <span>{info?.Reciept?.Moneyreceived==undefined?"-":`${info?.Reciept?.Moneyreceived.toLocaleString()}.00 `}</span>
                        </div>
                        <div className="flex justify-between px-8">
                            <span>Change : </span>
                            <span>{info?.Reciept?.Change==undefined?"-":`${info?.Reciept?.Change.toLocaleString()}.00 `}</span>
                        </div>
                    </div>
                    
                    <div className="text-center font-semibold text-xl">
                        THANK YOU
                    </div>
                </div>
            </div>
            <div className="w-28 h-28 rounded-full p-3 text-[#22668D] transform transition-transform hover:scale-110 hover:text-[#144F71]"><div className="rounded-full border-2  drop-shadow-md bg-white p-2"><PrinterIcon onClick={showModal}/></div></div>
            <Modal open={open} onCancel={handleCancel} footer={[]} >
                <div className="flex items-center justify-center gap-3">
                    <div className="w-16 h-16 text-[#FFCC70]"><ExclamationTriangleIcon/></div>
                    <p className="text-xl">ขออภัย! ขณะนี้ไม่สามารถใช้เครื่องปริ้นได้</p>
                </div>
            </Modal>
        </div>
        
    )}

export default Reciept;