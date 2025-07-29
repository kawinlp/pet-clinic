import './../payment.css';

import ServiceRecieptRow from "../../../component/row/ServiceRecieptRow";
import { getServiceRecieptList } from '../../../services/https/Payment';
import { ServiceRecieptInterface } from "../../../interfaces/IServiceReciept";
import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import Navbar from "../../../component/navbar/Navbar2";



function Index() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    
    const EmployeeID = localStorage.getItem('EmployeeID')

    const [ListServiceReciept, setServiceReciept] = useState<ServiceRecieptInterface[]>([]);

    const getAllServiceReciept = async () => {
        let res = await getServiceRecieptList();
        if (res) {
            setServiceReciept(res);
        }
    }


    const MapServiceReciept = ListServiceReciept.map((item) => {

        return (
            <ServiceRecieptRow
                ID={item.ID}
                TotalPrice={item.TotalPrice}
                Received={item.Received}
                Change={item.Change}
                PurchasedDate={item.PurchasedDate}
            />
        )
    })

    useEffect(() => {
        getAllServiceReciept();
    }, []);

    return (
        <>
        <Navbar />
            <div className="centralize">
                <div className="grid-container2-6-1Col">
                    <div className="grid-item-pagetitle">
                        <h3>ข้อมูลใบเสร็จ</h3>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <br />
            <div className="centralize">
                <div className="recieptTableContainer">
                    <div className="recieptTable">
                        <div className="recieptTableHeader">
                            <b className="labelT1">หมายเลขใบเสร็จ</b>
                            <b>จำนวนเงินที่ต้องชำระ</b>
                            <b>จำนวนเงินที่รับมา</b>
                            <b>จำนวนเงินทอน</b>
                            <b>วันที่ชำระเงิน</b>
                            <b className="labelT2">ดูใบเสร็จ</b>
                        </div>
                        <div className="recieptTableContent">
                            <div className="serviceRecieptRowContainer">
                                {MapServiceReciept}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export default Index;