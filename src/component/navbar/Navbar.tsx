import React, { useState, useEffect } from "react";
import './Navbar.css'
import Logo from '../../assets/Logo1.png'
import Hicat from '../../assets/hicat.png'
import User from '../../assets/user1.jpg'
import { Link } from "react-router-dom";
import { List } from "antd";
import { LanguageIcon } from "@heroicons/react/24/outline";



const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('EmployeeID');
        localStorage.removeItem('token');

        window.location.href = "/";
    };

    const handleHome = () => {
        window.location.href = "/petservice";
    }
    return (
        <div className="layoutNav">
            <div className="boxNav1">
                <div className="BodynavCompo">
                    <div className="NavLogo">

                        <img alt="" src={Logo} />
                    </div>
                    <div className="hiCats">

                        <img alt="" src={Hicat} onClick={handleHome}/>

                    </div>
                    <div className="NavServiceSelect">
                        <div className="boxNavServiceSelect">
                            <a >⯆ </a>
                            <button className="dropbtn">Service</button>
                            <div className="NavServiceSelect-content">
                                <a href="/appointment">Appointment</a>
                                <a href="/payment"style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>PaymentSevice</a>
                                <a href="/treatment">Treatment</a>
                                <a href="/displayspa" style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>Spa</a>
                                <a href="/displaydeposit">Deposit</a>
                            </div>
                        </div>
                    </div>
                    <div className="NavServiceSelect">
                        <div className="boxNavServiceSelect">
                            <a >⯆ </a>
                            <button className="dropbtn">Registor</button>
                            <div className="NavServiceSelect-content">
                                <a href="/members">Member</a>
                                <a href="/pets" style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>Pet</a>
                                <a href="/veterinarian">Veterinarian</a>
                            </div>
                        </div>
                    </div>
                    <div className="NavServiceSelect">
                        <div className="boxNavServiceSelect">
                            <div className="boxNav2ServiceSelect">
                                <a >⯆ </a>
                                <button className="dropbtn2">Payment</button>
                                <div className="Nav2ServiceSelect-content">
                                <a href="/listProduct" style={{ fontSize: "25px",borderBottom: "2px solid rgb(255, 255, 255)" }}>Product</a>
                                <a href="/reciepts" style={{ fontSize: "25px" }}>Reciept</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="UserIcon">
                        <div className="boxUserIcon">
                            <img alt="" src={User} />

                            <div className="NavServiceSelectUserIcon-content">

                                <a href="/infomation">Infomation</a>
                                <div  style={{ borderTop: "2px solid rgb(255, 255, 255)" }} onClick={handleLogout}>Logout</div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Navbar;