import React, { useState,useEffect } from "react";
import { Form,message,Spin,Alert } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Logo from '../../assets/Logo3.png'
import bg from '../../assets/cute-Photoroom.png-Photoroom.png'
import footpet from '../../assets/footedit.png'
import { Login } from "../../services/https/login";
import { EmployeeInterface,LoginInterface } from "../../interfaces/IEmployee";
import { Link, useNavigate  } from "react-router-dom";
function LoginEmployee() {
    
    const navigate = useNavigate();
    // const [login,setLogin] = useState<EmployeeInterface>()
    const [messageApi, contextHolder] = message.useMessage();
    const [loginStatus, setLoginStatus] = useState('');
     const onFinish = async(values : LoginInterface) => {
        let res = await Login(values)
        const authToken = res.message.Token
        if(authToken !== undefined){
            setLoginStatus('SUCCESSFUL!');
            setIsLoading(false);
            localStorage.setItem('token', authToken);
            localStorage.setItem('EmployeeID', res.message.ID);
            messageApi.open({
                type: "success",
                content: "เข้าสู่ระบบสำเร็จ",
            });
            setTimeout(()=>{
                // window.location.href="/listProduct";
                window.location.href="/petservice";
            }, 3000);
        } 
        else {
            setLoginStatus('FAIL!');
            setIsLoading(false);
            if(res.message ==="กรุณากรอกให้ครบ"){
                messageApi.open({
                    type: "error",
                    content: "กรุณากรอกให้ครบ",
                });
            }
            else if (values.Password === undefined ) {
                messageApi.open({
                    type: "error",
                    content: "กรุณากรอกให้ครบ",
                });
            }
            else if(res.message === "crypto/bcrypt: hashedPassword is not the hash of the given password"){
                messageApi.open({
                    type: "error",
                    content: "รหัสผ่านไม่ถูกต้อง",
                });
            }
            else {
                messageApi.open({
                    type: "error",
                    content: res.message,
                });
            }
            setLoginStatus('LOG IN');
        }
    }
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = () => {setIsLoading(true);}
 

    return(
        <div className=" flex justify-center items-center  bg-[#22668D] grid grid-cols-2">
            <img className="w-14 h-14 absolute left-[5%] top-[65%]  " alt="" src={footpet} style={{ transform: 'rotate(140deg)' }}/>
            <img className="w-14 h-14 absolute left-[8%] top-[80%]  " alt="" src={footpet} style={{ transform: 'rotate(120deg)' }}/>
            
            {contextHolder}
            <div className="bg-[#8ECDDD] w-full flex h-full  p-3 border-4 border-[#85BCDC]">
            <img className="w-64 top-[17%] left-80 absolute" alt="" src={Logo}/>
                <div className="flex flex-col justify-center items-center w-full h-full gap-5">
                    <span className="text-5xl text-[#22668D] m-2 font-semibold">LOG IN</span>
                    
                    <Form onFinish={onFinish} >
                        <div className=" flex flex-col justify-center items-center p-5 drop-shadow-lg">
                            <Form.Item name="EmployeeID" >
                                    <input placeholder="Employee ID" 
                                    className="rounded-md w-80 h-10 p-3 focus:border focus:outline-none text-lg focus:border-[#22668D] transition-colors duration-300"></input>
                            </Form.Item>
                            <Form.Item name ="Password">
                                    <input placeholder="Password" type="password" 
                                    className="rounded-md w-80 h-10 p-3 focus:outline-none text-lg focus:border focus:border-[#22668D] transition-colors duration-300"></input>
                            </Form.Item>
                        </div>
                        
                        <div className="flex w-full justify-center items-center">
                            <button type="submit" 
                            className={`w-[80%]  h-10 bg-[#FFCC70] rounded-xl z-40 text-lg text-[#22668D] font-semibold hover:bg-[#FFFADD] hover:text-[#F5AC29] drop-shadow-lg focus:bg-[#FFFADD] focus:text-[#F5AC29] transition-colors duration-300
                            ${loginStatus === 'SUCCESSFUL!' ? 'text-green-600 bg-[#FFFADD]' : loginStatus === 'FAIL!' ? 'text-red-600 bg-[#FFFADD]' : 'text-[#22668D]'}`}
                            onClick={handleLogin}> 
                                {isLoading ? (
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: '#22668D' }} spin />} />
                                    ) : (
                                        loginStatus === 'SUCCESSFUL!' ? 'SUCCESSFUL!' : loginStatus === 'FAIL!' ? 'FAIL!' : 'LOG IN'
                                    )}  </button>
                            {/* <div className="z-10 bg-[#28ACCD] rounded-xl w-[14%] h-10 absolute mt-4 ml-5"/> */}
                        </div>
                        <div className=" text-right pr-5 pt-5 text-[#22668D] font-semibold">
                            <span>or </span>
                            <Link to="/register"><span className="underline hover:text-[#FFCC70]">SIGN UP?</span></Link>
                        </div>
                    </Form>
                </div>
            </div>
            <div>
                <div className="text-[#FFFADD] items-center flex flex-col absolute w-[50%] top-5 text-4xl font-semibold">
                
                    <span className=" p-3 " style={{ letterSpacing: '0.2em'}}>WELCOME</span>
                    <span className=" p-3 " style={{ letterSpacing: '0.2em'}}>TO</span>
                    <span className=" p-3 " style={{ letterSpacing: '0.2em'}}>PET CLINIC</span>
                </div>
                
                <img src={bg} alt=""/>
            </div>
        </div>
    )
}

export default LoginEmployee;