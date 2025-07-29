import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../component/navbar/Navbar2";
import './displayspa.css'
import Pets from '../../assets/pets.jpg'
import { SpaDisplayInterface, PetInterface, SpasInterfaceEdit } from "../../interfaces/ISpa";
import { GetSpaList, DeleteSpa, UpdateSpa, GetPetbyMemberID } from "../../services/https/Spa/spa";
import { Button, message } from "antd";
import Modal from "antd/es/modal/Modal";
import {  EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";




function Displayspa() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    
    const [SpaDisplayData, setSpaDisplayData] = useState<SpaDisplayInterface[]>([]);
    const [SpaUpdateData2, setSpaUpdateData2] = useState<SpaDisplayInterface>();
    const [pet, setPets] = useState<PetInterface[]>([]);

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();

    const [messageApi, contextHolder] = message.useMessage();
    //userSelect
    const [deleteSpaID, setDeleteSpaID] = useState<Number>();

    const handleCancelEdit = () => {
        setOpenModalEdit(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const showModal = (val: Number | undefined) => {
        setModalText(`คุณต้องการลบข้อมูลหรือไม่ ?`);
        setDeleteSpaID(val);
        // setDefaultinput();
        // console.log(deletePaymentID)
        setOpenModal(true);
    };

    const showModalEdit = async (val: SpaDisplayInterface) => {
        
        setSpaUpdateData2(val)
        setOpenModalEdit(true);
        input.ID = val.ID;
        input.Price = val.Price;
        input.Comment = val.Comment;
        input.Price = val.Price;   
        input.PetID = val.PetID;
        input.EmployeeID = val.EmployeeID;
        input.SpaTypeID = val.SpaTypeID;
        
        let res = await GetPetbyMemberID(val.Pet?.Member?.ID);
        if (res) {
            setPets(res);
        }
    }
    
    const [input, setInput] = useState({
        ID: SpaUpdateData2?.ID,
        ServiceDay: new Date(),
        Price: SpaUpdateData2?.Price,
        Comment: SpaUpdateData2?.Comment,
        MemberID: SpaUpdateData2?.MemberID,
        PetID: SpaUpdateData2?.PetID,
        EmployeeID: SpaUpdateData2?.EmployeeID,
        SpaTypeID: SpaUpdateData2?.SpaTypeID,
    });
    
    const serviceDatestr = new Date(input.ServiceDay.toString());

    const priceRef = useRef<HTMLInputElement>(null)


    let ServiceDayElement :  HTMLInputElement | null;
   


    const getElement = async () => {
        ServiceDayElement = document.getElementById("serviceDay") as HTMLInputElement | null;
    }
    
    
    const setDefualt = async () => {
        getElement();
        if (ServiceDayElement) {
            ServiceDayElement.value = serviceDatestr.toISOString().split('T')[0];
        }
        
       

    }

    const handleInput = async (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
        if (e.target.name === "ServiceDay" || e.target.name === "Comment") {
            setInput({ ...input, [e.target.name]: (e.target.value), });
        }
        else {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10), });
        }
    }
    
    
    const setDataSpa = async (values: SpasInterfaceEdit) => {
        values.ID = input.ID
        values.ServiceDay = new Date(input.ServiceDay);
        values.Price = input.Price
        values.Comment = input.Comment
        values.PetID = input.PetID
        values.EmployeeID = input.EmployeeID
        values.SpaTypeID = input.SpaTypeID

        let res = await UpdateSpa(values);
        console.log(res)
        console.log(values)
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
        let res = await DeleteSpa(deleteSpaID);
        console.log(res)
        if (res.status) {
            setOpenModal(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                window.location.reload();
            }, 500);
        } else {
            setOpenModal(false);
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาด !",
            });
        }
        setConfirmLoading(false);
    };

    const getSpas = async () => {
        let res = await GetSpaList();
        if (res) {
            setSpaDisplayData(res);
        }
    };

    useEffect(() => {
        getSpas();
    }, []);

    useEffect(() => {
        setDefualt();
    }, [input]);

    console.log(input.SpaTypeID)
    
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
                                    <span className="mr-3 font-semibold text-dark"> All Spa </span>
                                    <a className="DepositCreate" href="/identifyspa" > Spa </a>
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
                                                <th className="text-start px-5 py-2">น้อง</th>
                                                <th className="text-start px-5 py-2">เจ้าของ</th>
                                                <th className="text-start px-5 py-2">ประเภท</th>
                                                <th className="text-center px-5 py-2">Sevice Day</th>
                                                <th className="text-center px-5 py-2">ค่าบริการ</th>
                                                <th className="text-center px-5 py-2">หมายเหตุ</th>
                                                <th className="text-center px-5 py-2">จัดการ</th>
                                            </tr>
                                        </thead>
                                        {/* stop head table */}

                                        {/* start body table */}
                                        <tbody>
                                            {SpaDisplayData.map((Spa, index) => (
                                                <tr key={index} className="border-b border-[#22668D]">
                                                    <td className=" text-center break-all px-5 py-2">{Spa.ID}</td>
                                                    <td className=" text-start break-all py-2">
                                                        <img src={Spa.Pet?.Picture} className="w-[80px] h-[80px] rounded-[15px] align-middle object-cover" alt="petImage" />
                                                    </td>
                                                    <td className=" text-start break-all px-5 py-2">{Spa.Pet?.Name}</td>
                                                    <td className=" text-start break-all px-5 py-2">{Spa.Pet?.Member?.FristName}</td>
                                                    <td className=" text-start break-all px-5 py-2">{Spa.SpaType?.Type}</td>                    
                                                    <td className=" text-center break-all px-5 py-2">{Spa.ServiceDay?.toString().split('T')[0]}</td>
                                                    <td className=" text-center break-all px-5 py-2">{Spa.Price}</td>
                                                    <td className=" text-center break-all px-5 py-2">{Spa.Comment}</td>
                                                    <td className="text-center break-all px-5 py-2">
                                                        <Button
                                                            onClick={() => showModal(Spa.ID)}
                                                            shape="circle"
                                                            icon={<DeleteOutlined />}
                                                            size={"middle"}
                                                            danger
                                                        />
                                                        <Button
                                                            onClick={() => showModalEdit(Spa)}
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
                    <div className="LayoutEdit">
                        <form className="bodySpaREdit">
                            <div className="boxboxboxEdit">
                                <div className="contentspaEdit">
                                    <div className="infospaEdit">
                                        <span> <br />  </span>
                                        <p className="SpadisplaypetName">Pet Name</p>
                                        <select className="Spadisplaypetname" onChange={handleInput} name="PetID" value={input.PetID} required  >
                                            {pet.map((item) => (
                                                <option value={item.ID} key={item.Name} >{item.Name}</option>
                                            ))}
                                        </select>
                                        <p className="serviceDate"> Service Date</p>
                                        <input id="serviceDate" type="date" className="servicedate" name="ServiceDay"
                                           
                                            onChange={handleInput}></input >
                                        <p className="petWeight"> Weight </p>
                                        <div className="boxweight">
                                            <input className="petweight" name="Weight" placeholder="00.00"
                                                type="number" step="0.01" id="totalAmt" defaultValue={SpaUpdateData2?.Pet?.Weight}></input>
                                            <p className="kg"> kg. </p>
                                        </div>
                                        <p className="Price"> Price</p>
                                        <div className="boxprice">
                                            <input className="price" id="Price" type="number"
                                                name="Price"
                                                placeholder="0"
                                                defaultValue={SpaUpdateData2?.Price}
                                                onChange={handleInput}
                                                ref={priceRef}
                                                required></input>
                                            <p className="bath"> bath. </p>
                                        </div>

                                    </div>
                                    <div className="photopet">
                                        <img alt="" src={Pets} />
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="boxtextcomment">
                                        Comment
                                    </div>

                                    <textarea className="boxfieldcomment"
                                        id="Comment"
                                        defaultValue={SpaUpdateData2?.Comment}
                                        placeholder=""
                                        name="Comment"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="SelectSpatype"> {/*pattel*/}

                                    <input className="InputTypeSpa" type="radio"
                                        
                                        name="SpaTypeID"
                                        id="SpaTypeID"
                                        value={1}

                                        onChange={handleInput}
                                        ></input>
                                    <label> Cutting Fur  </label>
                                    <input className="InputTypeSpa" type="radio"
                                        name="SpaTypeID"
                                        id="SpaTypeID"
                                        value={2}

                                        onChange={handleInput}
                                        ></input>
                                    <label> Shower </label>
                                    <input className="InputTypeSpa" type="radio"
                                        name="SpaTypeID"
                                        id="SpaTypeID"
                                        value={3}
                                        onChange={handleInput}
                                        ></input>
                                    <label> Both </label>
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