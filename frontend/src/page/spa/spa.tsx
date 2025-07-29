import React, { useState, useEffect } from "react";

import Navbar from "../../component/navbar/Navbar2";
import './spa.css'
import { SpasInterface, PetInterface } from "../../interfaces/ISpa";
import { CreateSpas, GetPetbyMemberID } from "../../services/https/Spa/spa";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


const Spa = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    
    
    
    let memberData = JSON.parse(localStorage.getItem('Member') || "");
   
    const [pet, setPets] = useState<PetInterface[]>([]);

    const [SpaType, setSpaType] = useState({
        SpaType: "🐶🐱🐹🐰🦆🐦",
    });
    const [messageApi, contextHolder] = message.useMessage();



    const getPets = async () => {
        let res = await GetPetbyMemberID(memberData);
        if (res) {
            setPets(res);
        }
    };

    useEffect(() => {
        getPets();
    }, []);

    const now = new Date();




    const [input, setInput] = useState({
        ServiceDay: now,
        Price: 0,
        Comment: "",
        PetID: Number(null),
        EmployeeID: 1,
        SpaTypeID: Number(null),
        Weight: (parseFloat("")),




    });

    const handleInput = async (e: any) => {
        if (e.target.name === "ServiceDay" || e.target.name === "Comment") {
            setInput({ ...input, [e.target.name]: e.target.value, });
        }

        else if (e.target.name === "SpaTypeID") {

            if (e.target.value === "1") {
                setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
                setSpaType({ ...SpaType, SpaType: "Cutting fur" })
            }
            else if (e.target.value === "2") {
                setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
                setSpaType({ ...SpaType, SpaType: "Shower" })
            }
            else {
                setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
                setSpaType({ ...SpaType, SpaType: "Both" })

            }

        }
        else if (e.target.name === "Weight") {
            setInput({ ...input, [e.target.name]: parseFloat(e.target.value), });
        }
        else {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10), });
        }


    }



    const setDataSpa = async (values: SpasInterface) => {
        values.ServiceDay = new Date(input.ServiceDay)
        values.Price = input.Price
        values.Comment = input.Comment
        values.PetID = input.PetID
        values.EmployeeID = input.EmployeeID
        values.SpaTypeID = input.SpaTypeID

       
        let res = await CreateSpas(values,input.Weight);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/displayspa");
            }, 5000);

        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
        console.log(res)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setDataSpa(input);

    };




    console.log(input.Weight)

    return (


        <div className="layerSpa">
            {contextHolder}

            <div className="Spabodylayer2">
                <Navbar />
                <form className="Spabody" onSubmit={handleSubmit}>
                    <div className="SpabodyLeft">
                        <div className="SpabodyLeftTop">
                            <div className="SpabodyLeftTopLeft">
                                <button className="SpaboxCutting" onClick={handleInput} name="SpaTypeID" value={1} type="button">

                                    <button onClick={handleInput} name="SpaTypeID" value={1} type="button">Cutting fur</button>
                                </button>
                            </div>
                            <div className="SpabodyLeftTopRight">
                                <button className="SpaboxShower" onClick={handleInput} name="SpaTypeID" value={2} type="button" >

                                    <button onClick={handleInput} name="SpaTypeID" value={2} type="button">Showering</button>
                                </button>
                            </div>
                        </div>
                        <div className="SpabodyLeftBottom">
                            <div className="SpabodyLeftBottomLeft">
                                <div className="SpaTapShowState">
                                    {SpaType.SpaType}
                                </div>
                            </div>
                            <div className="SpabodyLeftBottomRight">
                                <button className="SpaboxBoth" onClick={handleInput} name="SpaTypeID" value={3} type="button" >

                                    <button onClick={handleInput} name="SpaTypeID" value={3} type="button" >Both</button>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="SpabodyRight">
                        <div className="SpabodyRightBox">
                            <div className="SpabodyRightBoxHead">
                                <div className="SpabodyRightBoxHeadTitle">
                                    PET SPA
                                </div>
                                <div className="SpatoDisplaySpa">
                                    <a href="/displayspa">Display Spa</a>

                                </div>
                            </div>
                            <div className="SpabodyRightTop">
                                <div className="SpabodyRightTopLeft">
                                    <div className="SpabodyRightTopLeftBox">
                                        <p> Pet Name</p>
                                        <select className="SpaSelectpetname" onClick={handleInput} name="PetID" value={input.PetID} required  >
                                            {pet.map((item,index) => (
                                                <option value={item.ID} key={item.Name} >{item.Name}</option>
                                            ))}
                                        </select>
                                        <p> Service Date </p>
                                        <input className="SpaServiceDate" type="date" name="ServiceDay" onChange={handleInput}></input>
                                        <p > Weight </p>
                                        <div className="Spaboxweight">
                                            <input name="Weight" placeholder="00.00"
                                                type="number" step="0.01" id="totalAmt" onChange={handleInput}></input>
                                            <p style={{ marginLeft: "25px" }}>kg.</p>
                                        </div>
                                        <p > Price </p>
                                        <div className="Spaboxprice">
                                            <input type="number" 
                                                name="Price"
                                                id="Price"
                                                placeholder="0" onChange={handleInput} ></input>
                                            <p style={{ marginLeft: "25px" }}>Bath.</p>
                                        </div>
                                        <p> Comment</p>
                                        <textarea className="Spaboxfieldcomment"

                                            placeholder=""
                                            name="Comment"
                                            onChange={handleInput} />
                                    </div>
                                </div>
                                <div className="SpabodyRightTopRigth">
                                    <div className="SpaboxPhotoPets"></div>
                                    <div className="SpaButtonSummit">
                                        <button type='submit'> Summit</button>
                                    </div>
                                </div>
                            </div>
                            <a href="/identifySpa" style={{marginLeft:"20px"}}>◀BACK</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Spa;


