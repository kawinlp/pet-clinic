import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar/Navbar2";
import './displaydeposit.css'
import Pets2 from '../../assets/Hidog.jpg'

import { PetInterface } from "../../interfaces/ISpa";
import { DepositsDisplayInterface } from "../../interfaces/IDeposit";
import { GetPetbyMemberID } from "../../services/https/Spa/spa";
import { GetDepositList, DeleteDeposit, UpdateDeposit } from "../../services/https/Deposit/deposit";
import { message, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



function Displayspa() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    
    
    const [DepositDisplayData, setDepositDisplayData] = useState<DepositsDisplayInterface[]>([]);

    const [DepositUpdateData, setDepositUpdateData] = useState<DepositsDisplayInterface>();
    const [pet, setPets] = useState<PetInterface[]>([]);

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();

    const [messageApi, contextHolder] = message.useMessage();
    //userSelect
    const [deleteDepositID, setdeleteDepositID] = useState<Number>();




    const handleCancelEdit = () => {
        setOpenModalEdit(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const showModal = (val: Number | undefined) => {
        setModalText(`คุณต้องการลบข้อมูลหรือไม่ ?`);
        setdeleteDepositID(val);
        // setDefaultinput();
        // console.log(deletePaymentID)
        setOpenModal(true);
    };

    const showModalEdit = async (val: DepositsDisplayInterface) => {

        setDepositUpdateData(val)
        setOpenModalEdit(true);
        input.ID = val.ID;
        input.Comment = val.Comment;
        input.Price = val.Price;
        input.MemberID = val.Pet?.Member?.ID;
        input.Pet = val.Pet;
        input.EmployeeID = val.EmployeeID;

        let res = await GetPetbyMemberID(val.Pet?.MemberID);
        if (res) {
            setPets(res);
        }
    }
    const [input, setInput] = useState({
        ID: DepositUpdateData?.ID,
        Checkin: new Date(),
        Checkout: new Date(),
        Price: DepositUpdateData?.Price,
        Comment: DepositUpdateData?.Comment,
        MemberID: DepositUpdateData?.Pet?.Member?.ID,
        Pet: DepositUpdateData?.Pet,
        EmployeeID: DepositUpdateData?.EmployeeID,
    });


    const CheckinDatestr = new Date(input.Checkin.toString());
    const CheckoutDatestr = new Date(input.Checkout.toString());
    let CheckinElement: HTMLInputElement | null;
    let CheckoutElement: HTMLInputElement | null;

    const getElement = async () => {
        CheckinElement = document.getElementById("Checkin") as HTMLInputElement | null;
        CheckoutElement = document.getElementById("Checkout") as HTMLInputElement | null;
    }

    const setDefualt = async () => {
        getElement();
        if (CheckinElement) {
            CheckinElement.value = CheckinDatestr.toISOString().split('T')[0];
        }
        if (CheckoutElement) {
            CheckoutElement.value = CheckoutDatestr.toISOString().split('T')[0];
        }
    }




    const handleInput = async (e: any) => {
        if (e.target.name === "Checkin" || e.target.name === "Checkout" || e.target.name === "Comment") {
            setInput({ ...input, [e.target.name]: e.target.value, });
        }

        else {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10), });
        }
    }

    const setDataSpa = async (values: DepositsDisplayInterface) => {
        values.ID = input.ID
        values.Checkin = new Date()
        values.Checkout = new Date(input.Checkout)
        values.Price = input.Price
        values.Comment = input.Comment
        values.Pet = input.Pet
        values.EmployeeID = input.EmployeeID

        let res = await UpdateDeposit(values);
        console.log(res)
        if (res.status) {
            setOpenModalEdit(false);
            messageApi.open({
                type: "success",
                content: "แก้ข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            setOpenModal(false);
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาด !",
            });
        }
        setConfirmLoading(false);
    }


    //handle

    const handleEdit = async () => {
        setDataSpa(input)
        setConfirmLoadingEdit(false);
    };







    const handleDelete = async () => {
        let res = await DeleteDeposit(deleteDepositID);
        console.log(res)
        if (res.status) {
            setOpenModal(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            setOpenModal(false);
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาด !",
            });
        }
        setConfirmLoading(false);
    };

    const getDeposits = async () => {
        let res = await GetDepositList();
        if (res) {
            setDepositDisplayData(res);
        }
        console.log(res)
    };

    useEffect(() => {
        getDeposits();
    }, []);
    useEffect(() => {
        setDefualt();
    }, [input]);


    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap mx-3 mb-5 ">
                <div className="w-full max-w-full px-3 mx-auto bg-yellow-50">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative bg-blue-300 flex flex-col min-w-0 break-words bg-clip-border rounded-2xl bg-light/30 border border-solid border-[#22668D] ">
                            {/* start card header */}
                            <Navbar />
                            <div className="px-5 flex justify-between items-stretch flex-wrap min-h-[70px] bg-transparent rounded-t-2xl">
                                <h3 className="flex flex-row items-start justify-center m-0 ml-0 font-medium text-xl/tight text-dark ">
                                    <span className="mr-3 font-semibold text-dark"> All Deposit </span>
                                    <a className="DepositCreate" href="/identifydeposit" > Deposit </a>
                                </h3>
                            </div>
                            {/* <!-- end card header --> */}

                            {/* <!-- card body  --> */}
                            <div className="flex-auto block py-4 px-4 pt-4 pb-0 bg-yellow-50 rounded-b-2xl ">
                                {/* start table section */}
                                <div className="h-[720px] overflow-auto">
                                    <table className="w-100% w-full min-w-[1000px] my-0 align-middle text-dark border-neutral-200">
                                        {/* start head table */}
                                        <thead>
                                            <tr className="bg-gray-200 text-md font-semibold">
                                                <th className="text-center px-5 py-2">ID</th>
                                                <th className="text-start px-5 py-2">รูปภาพ</th>
                                                <th className="text-start px-5 py-2">ชื่อ</th>
                                                <th className="text-start px-5 py-2">เจ้าของ</th>
                                                <th className="text-center px-5 py-2">Check In</th>
                                                <th className="text-center px-5 py-2">Check Out</th>
                                                <th className="text-center px-5 py-2">ค่าบริการ</th>
                                                <th className="text-center px-5 py-2">หมายเหตุ</th>
                                                <th className="text-center px-5 py-2">จัดการ</th>
                                            </tr>
                                        </thead>
                                        {/* stop head table */}

                                        {/* start body table */}
                                        <tbody>
                                            {DepositDisplayData.map((Deposit, index) => (
                                                <tr key={index} className="border-b border-[#22668D]">
                                                    <td className=" text-center break-all px-5 py-2">{Deposit.ID}</td>
                                                    <td className=" text-start break-all py-2">
                                                        <img src={Deposit.Pet?.Picture} className="w-[80px] h-[80px] rounded-[15px] align-middle object-cover" alt="petImage" />
                                                    </td>
                                                    <td className=" text-start break-all px-5 py-2">{Deposit.Pet?.Name}</td>
                                                    <td className=" text-start break-all px-5 py-2">{Deposit.Pet?.Member?.FristName}</td>                   
                                                    <td className=" text-center break-all px-5 py-2">{Deposit.Checkin?.toString().split('T')[0]}</td>
                                                    <td className=" text-center break-all px-5 py-2">{Deposit.Checkout?.toString().split('T')[0]}</td>
                                                    <td className=" text-center break-all px-5 py-2">{Deposit.Price}</td>
                                                    <td className=" text-center break-all px-5 py-2">{Deposit.Comment}</td>
                                                    <td className="text-center break-all px-5 py-2">
                                                        <Button
                                                            onClick={() => showModal(Deposit.ID)}
                                                            shape="circle"
                                                            icon={<DeleteOutlined />}
                                                            size={"middle"}
                                                            danger
                                                        />
                                                        <Button
                                                            onClick={() => showModalEdit(Deposit)}
                                                            style={{ marginLeft: 8 }}
                                                            shape="circle" icon={<EditOutlined />}
                                                            size={"middle"} />

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Modal
                                        title="ลบข้อมูล ?"
                                        centered
                                        open={openModal}
                                        onOk={handleDelete}
                                        onCancel={handleCancel}
                                        confirmLoading={confirmLoading}
                                        footer={(_, { OkBtn, CancelBtn }) =>
                                            <>
                                                <CancelBtn />
                                                <OkBtn />
                                            </>}
                                    >
                                        {modalText}
                                    </Modal>

                                    <Modal
                                        title="แก้ใขข้อมูล ?"
                                        centered
                                        width={"50%"}

                                        open={openModalEdit}
                                        onOk={handleEdit}
                                        onCancel={handleCancelEdit}
                                        confirmLoading={confirmLoadingEdit}
                                        footer={(_, { OkBtn, CancelBtn }) =>
                                            <>
                                                <CancelBtn />
                                                <OkBtn />
                                            </>}
                                    >
                                        <div className="bodyDepositDisplay" >
                                            <div className="Back">

                                            </div>
                                            <form className="boxFrominputDepositDisplay" >
                                                <div className="bodyInputLeft">
                                                    <div className="boxinputDeposit">
                                                        <label> Name</label>
                                                        <select className="PetnameSe" onClick={handleInput} name="PetID" value={input.Pet?.ID} required  >
                                                            {pet.map((item) => (
                                                                <option value={item.ID} key={item.Name} >{item.Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="boxinputDeposit">
                                                        <label> Check In</label>
                                                        <input id="Checkin" type="date" name="Checkin" onChange={handleInput} />
                                                    </div>
                                                    <div className="boxinputDeposit">
                                                        <label> Check Out</label>
                                                        <input id="Checkout" type="date" name="Checkout" onChange={handleInput} />
                                                    </div>
                                                    <div className="boxinputComment">
                                                        <label> Comment </label>

                                                        <textarea style={{ resize: "none" }} placeholder=""
                                                            name="Comment"
                                                            defaultValue={DepositUpdateData?.Comment}
                                                            onChange={handleInput} />

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
                                                                    defaultValue={DepositUpdateData?.Price}
                                                                    onChange={handleInput}
                                                                    required></input>
                                                                <label> Bath</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Displayspa;