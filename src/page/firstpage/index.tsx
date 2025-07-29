import { EmployeeInterface } from "../../interfaces/IEmployee"
import React, { useState,useEffect } from "react";
import { Form,message,Spin,Alert, Modal } from "antd";
import { GetEmployeeById } from "../../services/https/login";
import Logo from '../../assets/Logo1.png'
import bg from '../../assets/cute-Photoroom.png-Photoroom.png'
import { Link, useNavigate } from "react-router-dom";

function FirstPage(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
      if (!token) {
          navigate('/');
      }
  }, [token, navigator]);
  const EmployeeID = localStorage.getItem('EmployeeID')
    const [employee,setEmployee] = useState<EmployeeInterface>()
    const getEmployee = async () => {
      let res = await GetEmployeeById(Number(EmployeeID));
      if (res) { setEmployee(res); }
  }
    const [open, setOpen] = useState(false);

    useEffect(() => {
      getEmployee()
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('token');

    window.location.href = "/";
};
    return(
      <>
        <div className=" flex justify-center items-center  bg-[#22668D] grid grid-cols-2 border" >
            
            <div className="flex items-center justify-center ">
                {/* <div className=" m-3 flex items-center justify-center ">
                   
                </div> */}
                <div className="">
                <Link to="/petservice"><img className="w-96 top-[-1%] left-40 absolute" alt="" src={Logo}/></Link>
                    <img alt="" src = {bg}/>
                </div>
            </div>
            <div className="bg-[#FFFADD] h-full w-full flex flex-col items-center justify-center rounded-l-3xl  drop-shadow-lg gap-5">
                <span className="text-5xl p-3 font-semibold text-[#22668D]"> ข้อมูลพนักงาน</span>
                <span className="h-10 text-3xl font-semibold text-[#22668D]" >{employee?.EmployeeID}</span>
                <div className="flex justify-center flex-col gap-5 p-10 rounded-3xl  border border-[#22668D] text-lg">
                    <div className="flex gap-12 ">
                        <div className="flex  gap-2 text-xl font-semibold">
                            <a>Firstname :</a>
                            <span className="h-10 " >{employee?.FirstName}</span>
                        </div>
                        <div className="flex  gap-2 text-xl font-semibold">
                            <a>Lastname :</a>
                            <span className="h-10 " >{employee?.LastName}</span>
                        </div>
                    </div>
                    <div className="flex  gap-2 text-xl font-semibold">
                        <a>Tel :</a>
                        <span className="h-10 " >{employee?.Telephone}</span>
                    </div>
                    
                </div>
                <div className="flex justify-between gap-12">
                        <Link to="/petservice"><button className="h-10 p-2  mt-2  rounded-md bg-[#22668D] text-white drop-shadow-none hover:bg-[#FFCC70]  transition-all delay-200"> ย้อนกลับ</button></Link>
                        <button onClick={handleLogout} className="h-10  p-2 mt-2  rounded-md bg-red-500 text-white drop-shadow-none hover:bg-[#FFCC70]  transition-all delay-200">ออกจากระบบ</button>
                    </div>
                </div>
                </div>
                </>)}
export default FirstPage