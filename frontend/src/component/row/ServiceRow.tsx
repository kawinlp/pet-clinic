import React, { useState } from "react";
import { ServiceRowInterface } from "../../interfaces/IRow";
import { Link } from "react-router-dom";
import './row.css'

const ServiceRow = (props: ServiceRowInterface) => {
    let ServiceDateString = "";
    if(props.ServiceDate){
      const ServiceDate = new Date(props.ServiceDate.toString());
      ServiceDateString = ServiceDate.toISOString().split('T')[0];
    }

    return (
        <>
            <div className="rowContainer-4col">
                <div className="type1Col">
                    <label>{props.ServiceName}</label>
                </div>
                <div className="type2Col">
                    <label>{props.PetName}</label>
                </div>
                <div className="type2Col">
                    <label>{ServiceDateString}</label>
                </div>
                <div className="type3Col">
                    <label>{props.ServicePrice}</label>
                </div>
            </div>

        </>
    )
}

export default ServiceRow