import React, { useState, useEffect } from "react";
import './Navbar2.css'
import Logo from '../../assets/Logo1.png'
import Cat1 from '../../assets/Avatar_17.png'
import Cat2 from '../../assets/Avatar_18.png'
import Cat3 from '../../assets/Avatar_19.png'
import User from '../../assets/user1.jpg'
import { Link } from "react-router-dom";

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
        <div className="layoutNav2">
            <div className="BodyNav2">
                <div className="Nav2Logo">
                    <img src={Logo} onClick={handleHome} />
                </div>
                <div className="BodyNavPast2">
                    <div className="Catintunnel">
                        <img src={Cat1} />
                    </div>
                    <div className="Catintunnel">
                        <img src={Cat2} />
                    </div>
                    <div className="Catintunnel">
                        <img src={Cat3} />
                    </div>
                    <div className="Nav2ServiceSelect">
                        <div className="boxNav2ServiceSelect">
                            <a >⯆ </a>
                            <button className="dropbtn2">Service</button>
                            <div className="Nav2ServiceSelect-content">
                                <a href="/appointment">Appointment</a>
                                <a href="/payment" style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>PaymentSevice</a>
                                <a href="/treatment">Treatment</a>
                                <a href="/displayspa" style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>Spa</a>
                                <a href="/displaydeposit">Deposit</a>
                            </div>
                        </div>
                    </div>
                    <div className="Nav2ServiceSelect">
                        <div className="boxNav2ServiceSelect">
                            <a >⯆ </a>
                            <button className="dropbtn2">Registor</button>
                            <div className="Nav2ServiceSelect-content">
                                <a href="/members">Member</a>
                                <a href="/pets" style={{ borderBottom: "2px solid rgb(255, 255, 255)", borderTop: "2px solid rgb(255, 255, 255)" }}>Pet</a>
                                <a href="/veterinarian">Veterinarian</a>
                            </div>
                        </div>
                    </div>
                    <div className="Nav2ServiceSelect">
                        <div className="boxNav2ServiceSelect">
                            <a >⯆ </a>
                            <button className="dropbtn2">Payment</button>
                            <div className="Nav2ServiceSelect-content">
                                <a href="/listProduct" style={{ fontSize: "25px", borderBottom: "2px solid rgb(255, 255, 255)" }}>Product</a>
                                <a href="/reciepts" style={{ fontSize: "25px" }}>Reciept</a>
                            </div>
                        </div>
                    </div>
                    <div className="UserIcon2">
                        <div className="boxUserIcon2">
                            <img alt="" src={User} />

                            <div className="Nav2ServiceSelectUserIcon-content">

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