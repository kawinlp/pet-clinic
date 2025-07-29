import React, { useState, useEffect, } from "react";
import Navbar from "../../component/navbar/Navbar2";
import './deposit.css'
import Pets from '../../assets/backgroud3.jpg'
import { Link } from "react-router-dom";
import { PetInterface } from "../../interfaces/IPet";
import { DepositsInterface } from "../../interfaces/IDeposit";

import Pets2 from '../../assets/Hidog.jpg'
import { GetPetbyMemberID } from "../../services/https/Spa/spa";
import { CreateDeposit } from "../../services/https/Deposit/deposit";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Deposit = () => {
    
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    
    
    
    
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [Pet, setPets] = useState<PetInterface[]>([]);
    let memberData = JSON.parse(localStorage.getItem('Member') || "{}");
    
    const [PetPhoto, setPetPhoto] = useState(Pets2);

    const [input, setInput] = useState({
        Checkin: new Date(),
        Checkout: new Date(),
        Price: 0,
        Comment: "",
        MemberID: 1,
        PetID: Number(null),
        EmployeeID: 1,
    });

    const [photo, setPhoto] = useState({
        Picture: String,
    });

  


    const handleInput = async (e: any) => {
        if (e.target.name === "Checkin" || e.target.name === "Checkout" || e.target.name === "Comment") {
            setInput({ ...input, [e.target.name]: e.target.value, });
        }
        
        else {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10), });
        }

    }

    const setDataDeposit = async (values: DepositsInterface) => {
        values.Checkin = new Date(input.Checkin)
        values.Checkout = new Date(input.Checkout)
        values.Price = input.Price
        values.Comment = input.Comment
        values.MemberID = input.MemberID
        values.PetID = input.PetID
        values.EmployeeID = input.EmployeeID



        let res = await CreateDeposit(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/displaydeposit");
            }, 2000);

        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
        console.log(res)
        console.log(values)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setDataDeposit(input);

    };


    const getPets = async () => {
        let res = await GetPetbyMemberID(memberData);
        if (res) {
            setPets(res);
        }
    };

    useEffect(() => {
        getPets();
       
    }, []);






    console.log(input)












    return (
        <div className="layerDepodit">
            {contextHolder}
            <div className="bodyDeposit" >
                <Navbar />
                <div className="Back">
                    <a href="/identifydeposit" style={{ fontSize: "50px", position: "relative", left: "2%" }}> 🔙 </a>
                    <div className="boxdepositTodisplay">
                        <a href="/displaydeposit" className="depositTodisplay"> Display Deposit </a>
                    </div>
                </div>
                <form className="boxFrominputDeposit" onSubmit={handleSubmit}>
                    <div className="bodyInputLeft">
                        <div className="boxinputDeposit">
                            <label> Name</label>
                            <select className="PetnameSe" onClick={handleInput} name="PetID" value={input.PetID} required  >
                                {Pet.map((item) => (
                                    <option value={item.ID} key={item.Name}>{item.Name}</option>

                                ))}
                            </select>
                        </div>
                        <div className="boxinputDeposit">
                            <label> Check In</label>
                            <input type="date" name="Checkin" onChange={handleInput} />
                        </div>
                        <div className="boxinputDeposit">
                            <label> Check Out</label>
                            <input type="date" name="Checkout" onChange={handleInput} />
                        </div>
                        <div className="boxinputComment">
                            <label> Comment </label>

                            <textarea style={{ resize: "none" }} placeholder=""
                                name="Comment"
                                onChange={handleInput} />

                        </div>
                        <div className="boxinputDeposit">
                            <button className="buttonSummit" type='submit'>
                                Summit
                            </button>
                        </div>
                    </div>
                    <div className="bodyInputRight">
                        <div className="bodyInputRightimg">
                                <img alt="" src={Pets2} />
                        </div>
                        <div className="bodyInputRightText">
                            <div className="CountDate">

                                <label> Count</label>
                                <div className="boxcountDateAndPriceinput">
                                    <input className="countDateinput" ></input>
                                    <label> Day</label>
                                </div>
                            </div>
                            <div className="PriceDeposit">
                                <label> Price</label>
                                <div className="boxcountDateAndPriceinput">
                                    <input className="priceDateinput" type="number"
                                        name="Price"
                                        placeholder="0"
                                        onChange={handleInput}
                                        required></input>
                                    <label> Bath</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Deposit;