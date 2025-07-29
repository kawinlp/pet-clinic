import React, { useState,useRef, useEffect } from "react";

type propTypes = {
    title: string;
    isopen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalProduct: React.FC<propTypes> = ({ title, isopen, onClose, children }) => {
    
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const whiteBoxElement = document.querySelector(".bg-white");
        if (whiteBoxElement && whiteBoxElement.contains(e.target as Node)) {
            return;
        }
        onClose();
    };
    

    return(
        <div className={`fixed inset-0 z-50 ${isopen ? "visible" : "invisible"}`} onClick={handleBackgroundClick}>
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm">
            <div className={`fixed inset-0 flex items-center justify-center transition-all delay-200
                ${isopen?"scale-100 opacity-100":"scale-70 opacity-0"}`}>
                <div className="bg-white rounded-xl shadow-lg w-[600px]  z-10">
                    <div className="bg-[#22668D] rounded-t-xl text-white justify-center px-4 py-5 text-center shadow-sm">
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
            </div>
        </div>
)
};

export default ModalProduct;