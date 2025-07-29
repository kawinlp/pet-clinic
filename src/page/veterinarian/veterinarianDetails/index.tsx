import './../veterinarian.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../../../component/navbar/Navbar2";
import { VeterinarianInterface } from '../../../interfaces/IVeterinarian';
import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    GetVeterinarianFromID,
    DeleteVeterinarian,
    UpdateVeterinarian,
    GetProfessionList,
    GetSpecialtiesList
} from "../../../services/https/Veterinarian";
import { SubAttributeInterface } from '../../../interfaces/ISubAttribute';
import { GetHumanGenderList } from "../../../services/https/HumanGender";
import { message } from "antd";


const Index = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
 
    const EmployeeID = localStorage.getItem('EmployeeID') ?? '0'
    const Employee_ID = parseInt(EmployeeID)

    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('param') ?? '0';
    const vet_id = parseInt(id, 10)
    const [isEditMode, setIsEditMode] = useState(false);
    const [Details, setDetails] = useState({
        Name: "",
        Image: "",
        HumanGenderID: 1,
        Birthday: new Date(),
        License: "",
        Tel: "",
        Salary: 0,
        Working_Start: new Date(),
        ProfessionID: 1,
        SpecialtiesID: 1,
    });

    const BirthdayString = new Date(Details.Birthday.toString())
    const WorkingDateString = new Date(Details.Working_Start.toString())

    const [pickHumanGender, setHumanGender] = useState<SubAttributeInterface[]>([]);
    const [pickProfession, setProfession] = useState<SubAttributeInterface[]>([]);
    const [pickSpecialties, setSpecialties] = useState<SubAttributeInterface[]>([]);
    const getHumanGender = async () => {
        let res = await GetHumanGenderList();
        if (res) {
            setHumanGender(res);
        }
    }

    const convertBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            if (file) {
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result as string)
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    }

    const getProfession = async () => {
        let res = await GetProfessionList();
        if (res) {
            setProfession(res);
        }
    }

    const getSpecialties = async () => {
        let res = await GetSpecialtiesList();
        if (res) {
            setSpecialties(res);
        }
    }

    const GetVeterinarianDetails = async (id: number) => {
        let res = await GetVeterinarianFromID(id);
        if (res) {
            setDetails(res);
        }
    }

    const handleInput = async (e: any) => {

        if (e.target.name === "HumanGenderID" ||
            e.target.name === "ProfessionID" ||
            e.target.name === "SpecialtiesID" ||
            e.target.name === "Salary") {
            setDetails({ ...Details, [e.target.name]: parseInt(e.target.value, 10), });
        }
        else if (e.target.name === "Image") {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            setDetails({ ...Details, Image: base64 });
        }

        else {
            setDetails({ ...Details, [e.target.name]: e.target.value });
        }
    }

    let nameElement: HTMLInputElement | null;
    let birthdayElement: HTMLInputElement | null;
    let licenseElement: HTMLInputElement | null;
    let salaryElement: HTMLInputElement | null;
    let telElement: HTMLInputElement | null;
    let workingStartElement: HTMLInputElement | null;
    let imageLoaderElement: HTMLInputElement | null;
    let genderSelectElement: HTMLInputElement | null;
    let professionSelectElement: HTMLInputElement | null;
    let specialtiesSelectElement: HTMLInputElement | null;
    let imageInputElement: HTMLInputElement | null;
    let cancleEditButtonElement: HTMLInputElement | null;
    let updateButtonElement: HTMLInputElement | null;

    const getElement = async () => {
        nameElement = document.getElementById("Name") as HTMLInputElement | null;
        birthdayElement = document.getElementById("Birthday") as HTMLInputElement | null;
        licenseElement = document.getElementById("License") as HTMLInputElement | null;
        salaryElement = document.getElementById("Salary") as HTMLInputElement | null;
        telElement = document.getElementById("Tel") as HTMLInputElement | null;
        workingStartElement = document.getElementById("Working_Start") as HTMLInputElement | null;
        imageLoaderElement = document.getElementById("ImageLoader") as HTMLInputElement | null;
        genderSelectElement = document.getElementById("GenderSelect") as HTMLInputElement | null;
        professionSelectElement = document.getElementById("ProfessionSelect") as HTMLInputElement | null;
        specialtiesSelectElement = document.getElementById("SpecialtiesSelect") as HTMLInputElement | null;
        imageInputElement = document.getElementById("image-Input") as HTMLInputElement | null;
        cancleEditButtonElement = document.getElementById("CancleEditButton") as HTMLInputElement | null;
        updateButtonElement = document.getElementById("UpdateButton") as HTMLInputElement | null;

    }

    const setDefualt = async () => {
        getElement();
        if (nameElement) {
            nameElement.value = Details.Name;
        }

        if (birthdayElement) {
            birthdayElement.value = BirthdayString.toISOString().split('T')[0];
        }

        if (licenseElement) {
            licenseElement.value = Details.License;
        }

        console.log(Details.Salary)
        if (salaryElement) {
            salaryElement.value = isNaN(Details.Salary) ? '' : Details.Salary.toString();
        }

        if (telElement) {
            telElement.value = Details.Tel;
        }

        if (workingStartElement) {
            workingStartElement.value = WorkingDateString.toISOString().split('T')[0];
        }
    }

    const hideEdit = async () => {

        getElement();
        const elementsToHide = [
            imageInputElement,
            cancleEditButtonElement,
            updateButtonElement,
        ];

        for (const element of elementsToHide) {
            if (element) {
                element.style.display = "none";
            }
        }

        const elementsToStyle = [
            nameElement,
            birthdayElement,
            licenseElement,
            salaryElement,
            telElement,
            workingStartElement,
            genderSelectElement,
            professionSelectElement,
            specialtiesSelectElement,
            imageLoaderElement,
        ];

        for (const element of elementsToStyle) {
            if (element) {
                element.style.borderStyle = "none";
                element.style.backgroundColor = "#FFE08A"
                element.style.borderRadius = "0";
            }
        }
    }

    const showEdit = async () => {
        getElement();
        const elementsToShow = [
            imageInputElement,
            cancleEditButtonElement,
            updateButtonElement,

        ];

        for (const element of elementsToShow) {
            if (element) {
                element.style.display = "flex";
            }
        }

        const elementsToStyle = [
            nameElement,
            birthdayElement,
            licenseElement,
            salaryElement,
            telElement,
            workingStartElement,
            genderSelectElement,
            professionSelectElement,
            specialtiesSelectElement,
            imageLoaderElement,
        ];

        for (const element of elementsToStyle) {
            if (element) {
                element.style.borderStyle = "ridge";
                element.style.backgroundColor = "#FFFFFF"
                element.style.borderRadius = "5px";
            }
        }
    }

    const handleEditClick = async () => {
        setIsEditMode(true);
        showEdit();
    }

    const handleCancleEditClick = async () => {
        setIsEditMode(false);
        GetVeterinarianDetails(vet_id);
        hideEdit();
    }

    const handleDelete = async () => {
        let res = await DeleteVeterinarian(vet_id);
        if (res.status) {
            setTimeout(function () {
                navigate("/veterinarian");
            }, 1000);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });

        } else {
            messageApi.open({
                type: "error",
                content: "ลบข้อมูลไม่สำเร็จ",
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        PatchVeterinarianData(Details);
    };

    const PatchVeterinarianData = async (values: VeterinarianInterface) => {
        values.Name = Details.Name
        values.Image = Details.Image
        values.Birthday = new Date(Details.Birthday)
        values.License = Details.License
        values.Tel = Details.Tel
        values.Salary = Details.Salary
        values.Working_Start = new Date(Details.Working_Start)
        values.Last_Modified = new Date()
        values.HumanGenderID = Details.HumanGenderID
        values.ProfessionID = Details.ProfessionID
        values.SpecialtiesID = Details.SpecialtiesID
        values.EmployeeID = Employee_ID

        let res = await UpdateVeterinarian(Details);
        console.log(Details)
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "อัปเดตข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                handleCancleEditClick();
            }, 1000);
        } else {
            messageApi.open({
                type: "error",
                content: "อัปเดตข้อมูลไม่สำเร็จ",
            });
        }
    };


    useEffect(() => {
        GetVeterinarianDetails(vet_id);
        getHumanGender();
        getProfession();
        getSpecialties();
        hideEdit();
    }, []);

    useEffect(() => {
        setDefualt();
    }, [Details]);

    return (
        <>
            <header>
                <Navbar />
            </header>
            {contextHolder}
            <div className="centralize">
                <div className="grid-container2-5-2Col">
                    <div className="grid-item-pagetitle">
                        <h3>ตรวจสอบ/แก้ไข ข้อมูลสัตวแพทย์</h3>
                    </div>
                    <div></div>
                    <div className="updateButtonBox">
                        <button onClick={() => handleEditClick()}>
                            แก้ไขข้อมูล <EditOutlined />
                        </button>

                        <button onClick={() => handleDelete()}>
                            ลบข้อมูล <DeleteOutlined />
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div className="centralize">
                <form className="updateForm" onSubmit={handleSubmit}>
                    <div className="grid-container1-4Col">
                        <div className="image-column">
                            <div className="centralize">
                                <div></div>
                            </div>
                            <div className="centralize">
                                <div className="image-column-form">
                                    <div className="previewImage-container">
                                        <div className="previewImage">
                                            <img src={Details.Image} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="image-Input" id="image-Input">
                                        <div className="image-Input-container">
                                            <div className="centralize">
                                                <label>รูปภาพ :</label>
                                            </div>
                                            <div className="centralize">
                                                <div className="formValue">
                                                    <input type="file" id="ImageLoader" name="Image" accept="image/png,image/jpeg" disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="updateForm-column">
                            <div className="centralize">
                                <div className="updateForm-column-form">
                                    <div className="grid-container1-1ACol">
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">ชื่อสัตวแพทย์ :</div>
                                                <div className="formValue">
                                                    <input type="text" id="Name" name="Name" placeholder="ชื่อสัตวแพทย์.." required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">เพศ :</div>
                                                <div className="formValue">
                                                    <select id="GenderSelect" title="Gender" name="HumanGenderID" required disabled={!isEditMode} onChange={handleInput}>
                                                        {pickHumanGender.map((item) => (
                                                            <option value={item.ID} key={item.Name} selected={item.ID === Details.HumanGenderID}>{item.Name}</option>))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">วันเกิด :</div>
                                                <div className="formValue">
                                                    <input type="date" id="Birthday" name="Birthday" required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">หมายเลขใบอณุญาต :</div>
                                                <div className="formValue">
                                                    <input type="text" id="License" name="License" placeholder="0123456789" required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">ความเชี่ยวชาญ :</div>
                                                <div className="formValue">
                                                    <select id="ProfessionSelect" title="Profession" name="ProfessionID" required disabled={!isEditMode} onChange={handleInput}>
                                                        {pickProfession.map((item) => (
                                                            <option value={item.ID} key={item.Name} selected={item.ID === Details.ProfessionID}>{item.Name}</option>))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">ศาสตร์เฉพาะทาง :</div>
                                                <div className="formValue">
                                                    <select id="SpecialtiesSelect" title="Specialties" name="SpecialtiesID" required disabled={!isEditMode} onChange={handleInput}>
                                                        {pickSpecialties.map((item) => (
                                                            <option value={item.ID} key={item.Name} selected={item.ID === Details.SpecialtiesID}>{item.Name}</option>))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">เงินเดือน :</div>
                                                <div className="formValue">
                                                    <input type="text" id="Salary" name="Salary" placeholder="5500" required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">
                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">เบอร์โทรศัพท์ :</div>
                                                <div className="formValue">
                                                    <input type="text" id="Tel" name="Tel" placeholder="0898765432" required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="centralize">


                                            <div className="grid-container5-6ACol">
                                                <div className="formLabel">วันที่รับเข้ามาทำงาน :</div>
                                                <div className="formValue">
                                                    <input type="date" id="Working_Start" name="Working_Start" required disabled={!isEditMode} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="buttonBar">
                                <div className="pairButton">

                                    <button id="CancleEditButton" type="reset" className="cancleButton" onClick={() => handleCancleEditClick()}>
                                        ยกเลิก
                                    </button>
                                    <div>
                                        <button id="UpdateButton" type="submit" className="confirmButton">
                                            อัปเดต
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <br />
                    <br />

                </form >
            </div >

        </>
    );
};

export default Index;