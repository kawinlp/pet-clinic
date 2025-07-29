import React, { useEffect, useState } from "react";
import { ServiceRecieptInterface } from "../../interfaces/IServiceReciept";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import './row.css'

const ServiceRecieptRow = (props: ServiceRecieptInterface) => {

    let PurchasedDateString = "";
    if (props.PurchasedDate) {
        const PurchasedDate = new Date(props.PurchasedDate.toString());
        PurchasedDateString = PurchasedDate.toISOString().split('T')[0];
    }


    return (
        <>
            <div className="rowContainer-6col">
                <div className="type1Col">
                    <label>{props.ID}</label>
                </div>
                <div className="type2Col">
                    <label>{props.TotalPrice}</label>
                </div>
                <div className="type2Col">
                    <label>{props.Received}</label>
                </div>
                <div className="type2Col">
                    <label>{props.Change}</label>
                </div>
                <div className="type2Col">
                    <label>{PurchasedDateString}</label>
                </div>
                <div className="type3Col">
                    <Link to={`./paymentRecieptInfo?param=${props.ID}`}>
                        <button> แสดงใบเสร็จ <EyeOutlined /></button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ServiceRecieptRow