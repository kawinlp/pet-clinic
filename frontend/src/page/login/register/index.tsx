import { EmployeeInterface } from "../../../interfaces/IEmployee"
import React, { useState,useEffect } from "react";
import { Form,message,Spin,Alert, Modal } from "antd";
import { CreateEmployee } from "../../../services/https/login";
import Logo from '../../../assets/Logo1.png'
import bg from '../../../assets/cute-Photoroom.png-Photoroom.png'
import { Link } from "react-router-dom";

function RegisterEmployee(){
    const [messageApi, contextHolder] = message.useMessage();//translate-y-14 -translate-x-2
    const [employee,setEmployee] = useState({
        ID:    0,
	EmployeeID: "",
        FirstName:"",
        LastName: "",
        Telephone: "",
        Password: "",
    })
    const [pass2,setPass2] = useState({pass2:""})
    const [pass,setPass] = useState({pass:""})
    const handle = (e: any) => {
        setPass({ ...pass, [e.target.name]: e.target.value });
}
    const handleInput = (e: any) => {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
    const sentData = async (values: EmployeeInterface,pass: string) => {
        values.FirstName = employee.FirstName
        values.LastName = employee.LastName
        values.Telephone = employee.Telephone
        values.Password = employee.Password
        let res = await CreateEmployee(values,pass);
        console.log(values)
        if (res.status) {
            console.log(res.message)
            messageApi.open({
                type: "success",
                content: "ลงทะเบียนสำเร็จ ได้รับ: "+ res.message.EmployeeID,
              });
              setTimeout(()=>{
                window.location.href="/";
            }, 3000);
        }
        else{
            messageApi.open({
                type: "error",
                content: res.message,
              });
        }
    }
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
        setOpen(false);
        }, 3000);
        sentData(employee,pass.pass)
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return(
        <div className=" flex justify-center items-center  bg-[#22668D] grid grid-cols-2 border" >
            {contextHolder}
            
            <div className="flex items-center justify-center ">
                {/* <div className=" m-3 flex items-center justify-center ">
                   
                </div> */}
                <div className="">
                <Link to="/"><img className="w-96 top-[-1%] left-40 absolute" alt="" src={Logo}/></Link>
                    <img alt="" src = {bg}/>
                </div>
            </div>
            <div className="bg-[#FFFADD] h-full w-full flex flex-col items-center justify-center rounded-l-3xl  drop-shadow-lg gap-5">
                <span className="text-5xl p-3 font-semibold text-[#22668D]"> SIGN UP</span>
                <div className="flex justify-center flex-col gap-5 p-10 rounded-3xl drop-shadow-lg border border-[#22668D] text-lg">
                    <div className="flex gap-12">
                        <div className="flex flex-col gap-2">
                            <a>Firstname :</a>
                            <input name="FirstName" placeholder="Fistname" className="h-10 rounded-md focus:outline-none  p-2" onChange={handleInput}></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a>Lastname :</a>
                            <input name="LastName"placeholder="Lastname" className="h-10 rounded-md focus:outline-none p-2" onChange={handleInput}></input>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a>Tel :</a>
                        <input name="Telephone" placeholder="Tel" className="h-10 rounded-md focus:outline-none p-2" onChange={handleInput}></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a>Password :</a>
                        <input className="h-10 rounded-md focus:outline-none p-2" placeholder="Password" type="password" name="Password" onChange={handleInput}></input>
                    </div> 
                    <button className="h-10 mt-2 font-semibold rounded-md bg-[#22668D] text-white drop-shadow-none hover:bg-[#FFCC70] hover:text-[#22668D] transition-all delay-200" onClick={showModal}>Create Account</button>
                    <div className=" text-right text-sm text-[#22668D] font-semibold">
                            <span>or </span>
                            <Link to="/"><span className="underline  hover:text-[#FFCC70]">LOG IN?</span></Link>
                        </div>
                    <Modal
                        open={open}
                        title="กรุณากรอกรหัสผ่านยืนยันตัวตน"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <button className="transition-all border border-red-500 text-red-500 w-20 h-8 mx-5 rounded-md hover:shadow-md hover:shadow-pink-500/40 hover:bg-red-500 hover:text-white" key="cancle" onClick={handleCancel}>CANCLE</button>,
                            <button className="transition-all border border-[#22668D] text-[#22668D] w-14 h-8 rounded-md hover:shadow-md hover:bg-[#22668D] hover:shadow-[#86AEC5] hover:text-white" key="submit" type="submit" onClick={handleOk}>OK</button>
                        
                        ]}
                    >   
                    
                        <input className="border border-[#22668D] w-full h-full  p-2 rounded-md focus:outline-none" onChange={handle} name= "pass" type="password" placeholder="password"></input>
                    
                    </Modal>

                </div>
            </div>   
        </div>
    )
}
export default RegisterEmployee