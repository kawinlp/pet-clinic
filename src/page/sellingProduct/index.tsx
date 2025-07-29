import React, { useState,useEffect } from "react";
import {PencilSquareIcon,CreditCardIcon,ClipboardDocumentListIcon} from '@heroicons/react/24/solid'
import Logo from '../../assets/Logo1.png'
import { PayfinishInterface,RecieptInterface} from "../../interfaces/IList";
import { GetLists } from "../../services/https/sellingproduct";
import { CreateReciept } from "../../services/https/Reciept";
import TableList from "../../component/table/TableList";
import { Link, useNavigate, } from "react-router-dom";
import { message } from "antd";
import { EmployeeInterface } from "../../interfaces/IEmployee";
import { GetEmployeeById } from "../../services/https/login";
import Navbar from "../../component/navbar/Navbar2";

function Sellingproduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/');}
    }, [token, navigator]);
  const EmployeeID = localStorage.getItem('EmployeeID')
  const [employee,setEmployee] = useState<EmployeeInterface>()
  const getEmployee = async () => {
    let res = await GetEmployeeById(Number(EmployeeID));
    if(res) {setEmployee(res);}}

  const [messageApi, contextHolder] = message.useMessage();
  const commonButtonClass = "bg-[#FFCC70] border border-2 border-black flex items-center justify-center drop-shadow-md rounded-lg h-[100%] p-2"
  const commonInput ="h-20 w-52  text-center text-4xl bg-[#FFFADD]  focus:outline-none"
  const bath ="h-20 w-20 rounded-r-lg flex  items-center ml-[-6%] text-center text-4xl bg-[#FFFADD] focus:outline-none"
  const [List,setList] = useState<PayfinishInterface[]>([]);
  // const [isMessageShown, setIsMessageShown] = useState(false);
  const getList = async() => {
    let res = await GetLists(Number(EmployeeID));
    if (Array.isArray(res) && res.length > 0) {
      setList(res);
  
      const totalSum = res.reduce((accumulator: number, currentItem: { List: { Totalprice?: number } }) => {
        const itemTotalprice = currentItem.List?.Totalprice || 0;
        return accumulator + itemTotalprice;
      }, 0);
      
      setReciept({...reciept, Totalprice: totalSum !== undefined ? totalSum : 0 });  
     } else { 
      messageApi.warning({
        content: "ไม่พบรายการสินค้า",
        duration: 1, 
        onClose: () => navigate("/listProduct"),
      });
    }
      }
  useEffect(()=>{
          getList();
          getEmployee();
        },[]);

  const [reciept,setReciept] = useState({
    Totalprice:0 ,
    Moneyreceived:0,
    Change: 0
  })
  const handleInput = (e: any) => {
    if(e.target.name === "Moneyreceived"){
        const cash = parseInt(e.target.value);
        const sub = cash - reciept.Totalprice ;
        setReciept({ ...reciept, [e.target.name]: cash, Change: sub })
        }
    else{
        setReciept({ ...reciept, [e.target.name]: e.target.value });
    }
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  sentData(reciept);
};
const sentData = async (values: RecieptInterface) => {
  
  values.Totalprice = Number(reciept.Totalprice)
  values.Change=Number(reciept.Change)
  values.Moneyreceived=Number(reciept.Moneyreceived)
  values.EmployeeID = Number(employee?.ID)
  if(values.Moneyreceived < values.Totalprice){
    messageApi.open({
      type: "error",
      content: "จำนวนเงินไม่ถูกต้อง",
      duration:5
    });

  }
  else {
  let res = await CreateReciept(values);

  if (res.status) {
      messageApi.open({
          type: "success",
          content: "สร้างใบเสร็จสำเร็จ",
          duration:5
        });
      setTimeout(() => {
        navigate("./reciept")
      }, 5000);
  } else {
          messageApi.open({
          type: "error",
          content: res.message,
          duration:5
        });
  }}
};

    return (
      <div>
        <header>
          <Navbar/>
        </header>
        {contextHolder}
      
      <div className=" flex flex-col grid md:grid-cols-2 gap-3 mt-2 grid-cols-1">
        <div className=" mt-3 md:ml-3 rounded-l-xl shadow-lg p-6 bg-[#22668D]">
          <div className="h-full rounded-xl shadow-lg p-3 bg-[#FFFADD]">
            <span className="">รายการสินค้า</span>
            <div className="border border-[#22668D] h-[96%] shadow-md shadow-[#448DB7] mb-2">
              <TableList lists={List}></TableList>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="flex justify-center item-center bg-[#22668D] mt-3 md:mr-3 rounded-r-xl drop-shadow-lg">
          <div className="text-center mt-1 h-full min-w-max">
            <div className="w-[150px] rounded-full translate-x-[160px]">
              <img className="scale-125 translate-y-4 " alt="" src={Logo}/>
            </div><div className=" border-t-4 border-white w-[300px] mt-[-3px] mb-2 translate-x-[90px]"/>
            <span className="text-white text-3xl font-semibold ">PAYMENT</span> 
            <div className="mt-3 m-2 w-full text-center text-3xl w-[550px] p-2 rounded-lg drop-shadow-lg grid grid-cols-1"> 
              <div className="flex p-3">
                <span className="w-36 rounded-l-lg p-4 bg-[#FFCC70] flex justify-center items-center">Total: </span>
                <input className={`${commonInput}`}
                  readOnly name="Totalprice" value={`${reciept.Totalprice === 0|| Number.isNaN(reciept.Totalprice)?"-":reciept.Totalprice.toLocaleString()}.00`}></input>
                <span className={`${bath}`}>฿</span>
              </div>
              <div className="flex p-3">
                <span className="bg-[#FFCC70] w-36 rounded-l-lg p-4 flex justify-center items-center">Cash: </span>
                <input className={`${commonInput}`}  name="Moneyreceived" onChange={handleInput}></input>
                <span className={`${bath}`}>฿</span>
              </div>
              <div className="flex p-3 ">
                <span className="bg-[#FFCC70] w-36 rounded-l-lg p-4 flex justify-center items-center">Change: </span>
                <input className={`${commonInput}`} readOnly name="Change" value={`${reciept.Change < 0||  Number.isNaN(reciept.Change)?"0":reciept.Change.toLocaleString()}.00 `} onChange={handleInput}></input>
                <span className={`${bath}`}>฿</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#22668D] flex items-center justify-center shadow-lg gap-2 grid grid-cols-3 row-cols-8 mt-3 mr-3 p-3 rounded-r-xl text-center text-3xl">
          <button className={`${commonButtonClass} group relative`} type="submit">
            <CreditCardIcon className="w-[90px]"/>
            <span 
              className="opacity-0 group-hover:opacity-100 absolute text-[#8ECDDD] inset-0 flex items-center justify-center transition-all ease-in-out duration-500 top-[-25%] left-[-15%] w-24 h-12 text-sm hover:shadow-lg rounded-lg bg-black">
                PAYMENT </span>
          </button>
          <Link to="/listProduct">
            <button className={`${commonButtonClass} w-full group relative`}>
              <PencilSquareIcon className="w-[90px] "/>
              <span 
              className="opacity-0 group-hover:opacity-100 absolute text-[#8ECDDD] inset-0 flex items-center justify-center transition-all ease-in-out duration-500 top-[-25%] left-[-15%] w-24 h-12 text-sm hover:shadow-lg rounded-lg bg-black"
              >ADD</span>
            </button>
          </Link>
          {/* <button className={`${commonButtonClass}`}><ClipboardDocumentListIcon className="w-[90px]"/></button> */}
          <input className={`${commonButtonClass} text-center h-[100%] bg-[#FFFADD] focus:outline-none border-[#FFCC70] text-5xl  font-medium`} readOnly placeholder="Employee" value={employee?.EmployeeID}></input>
      </div>
        
        </form>
        
      </div> 
      
      
  </div>  );
    
  }
  
  export default Sellingproduct;
  //opacity-0 group-hover:opacity-100 