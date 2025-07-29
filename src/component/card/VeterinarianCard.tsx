import React from "react";
import { VeterinarianInterface } from "../../interfaces/IVeterinarian";
import './card.css'
import { Link } from "react-router-dom";

const VeterinarianCard = (props: VeterinarianInterface) => {

    return (
        <>
            <div className="CardContainer">
                <div className="ImgContainer">
                    <img src={props.Image}/>
                </div>
                <b className="NameContainer">
                    {props.Name}
                </b>
                <button className="ControlContainer">
                    <Link to={`./veterinarianDetails?param=${props.ID}`}>ดูข้อมูลสัตวแพทย์</Link> 
                </button>
            </div>
        </>
    )
}

export default VeterinarianCard