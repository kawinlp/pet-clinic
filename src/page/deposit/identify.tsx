import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar/Navbar";
import './identify.css'
import Logo from '../../assets/Logo3.png'
import { MemberInterface } from "../../interfaces/ISpa";
import { GetMemberbyphone } from "../../services/https/Spa/spa";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


// Identify ต้องเปลี่ยนไปใช้ cookie เก็บค่า memberID

const Identify = () => {


    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);


    const [messageApi, contextHolder] = message.useMessage();

    const [Member, setMember] = useState<MemberInterface>({})

    const [Phone, setPhone] = useState({
        Phone: "",

    });



    const handleInput = async (e: any) => {
        if (e.target.name === "Phone") {
            setPhone({ ...Phone, [e.target.name]: (e.target.value), });

        }


    }

    const setDataSpa = async (values: MemberInterface) => {

        let res = await GetMemberbyphone(Phone.Phone);
        if (res) {
            localStorage.setItem('Member', JSON.stringify(res.ID));
            messageApi.open({
                type: "success",
                content: "เข้าสู่ระบบสำเร็จ",
            });
            setTimeout(() => {
                window.location.href = "/deposit";
            }, 3000);
        }
        else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setDataSpa(Phone);
        e.preventDefault();

    };

    return (

        <div className="layerdepositIdentify">
            {contextHolder}
            <form className="boxdepositidentify" onSubmit={handleSubmit}>
                <div className="backbuttondepositidentify">
                    <a className="backbuttondepositidentify" href="/displaydeposit">
                        ◀ back
                    </a>
                </div>
                <div className="logodepositidentify">
                    <img alt="" src={Logo} />
                </div>
                <div className="textdepositidentify">
                    <pre>Identification  Number</pre>
                </div>
                <div className="filedinputdepositidentify" >
                    <input placeholder={"ID:"} name="Phone" onChange={handleInput} required >

                    </input>
                </div>
                <div className="boxsummitdepositidentify">
                    <button type='submit' > Summit </button>
                </div>
            </form >
        </div>

    )

}
export default Identify;