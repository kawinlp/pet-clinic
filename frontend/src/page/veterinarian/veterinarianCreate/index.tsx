import './../veterinarian.css';
import { VeterinarianInterface } from '../../../interfaces/IVeterinarian';
import { SubAttributeInterface } from '../../../interfaces/ISubAttribute';

import {
  CreateVeterinarian,
  GetProfessionList,
  GetSpecialtiesList
} from "../../../services/https/Veterinarian";
import { GetHumanGenderList } from "../../../services/https/HumanGender";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { error } from 'console';
import { rejects } from 'assert';
import WTPM from "../../../assets/WTPM.jpg"
import Navbar from "../../../component/navbar/Navbar2";

export default function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem('EmployeeID') ?? '0'
  const Employee_ID = parseInt(EmployeeID)

  const [messageApi, contextHolder] = message.useMessage();

  const [input, setInput] = useState({
    Name: "",
    Image: WTPM,
    HumanGenderID: 1,
    Birthday: new Date(),
    License: "",
    Tel: "",
    Salary: 0,
    Working_Start: new Date(),
    ProfessionID: 1,
    SpecialtiesID: 1,

  });

  const handleInput = async (e: any) => {

    if (e.target.name === "HumanGenderID" ||
      e.target.name === "ProfessionID" ||
      e.target.name === "SpecialtiesID" ||
      e.target.name === "Salary") {
      setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10), });
    }
    else if (e.target.name === "Image") {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setInput({ ...input, Image: base64 });
    }

    else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sentVeterinarianData(input);
  };

  const sentVeterinarianData = async (values: VeterinarianInterface) => {
    values.Name = input.Name
    values.Image = input.Image
    values.Birthday = new Date(input.Birthday)
    values.License = input.License
    values.Tel = input.Tel
    values.Salary = input.Salary
    values.Working_Start = new Date(input.Working_Start)
    values.Last_Modified = new Date()
    values.HumanGenderID = input.HumanGenderID
    values.ProfessionID = input.ProfessionID
    values.SpecialtiesID = input.SpecialtiesID
    values.EmployeeID = Employee_ID

    let res = await CreateVeterinarian(values);
    console.log(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/veterinarian");
      }, 10000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const [pickHumanGender, setHumanGender] = useState<SubAttributeInterface[]>([]);
  const [pickProfession, setProfession] = useState<SubAttributeInterface[]>([]);
  const [pickSpecialties, setSpecialties] = useState<SubAttributeInterface[]>([]);
  const getHumanGender = async () => {
    let res = await GetHumanGenderList();
    if (res) {
      setHumanGender(res);
    }
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

  useEffect(() => {
    getHumanGender();
    getProfession();
    getSpecialties();
  }, []);

  return (
    <>

      <Navbar />
      {contextHolder}
      <div className="centralize">
        <div className="grid-container2-6-1Col">
          <div className="grid-item-pagetitle">
            <h3>สร้างข้อมูลสัตวแพทย์</h3>
          </div>
        </div>
      </div>
      <br />
      <div className="centralize">
        <form id="mainForm" className="createForm" onSubmit={handleSubmit}>
          <div className="createForm-container">
            <div className="grid-container1-1ACol">

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>ชื่อสัตวแพทย์ :</label>
                  </div>
                  <div className="formValue">
                    <input type="text" name="Name" placeholder="ชื่อสัตวแพทย์.." onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>เพศ :</label>
                  </div>
                  <div className="formValue">
                    <select title="Gender" name="HumanGenderID" onChange={handleInput}>
                      {pickHumanGender.map((item) => (
                        <option value={item.ID} key={item.Name}>{item.Name}</option>))
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">

                  <div className="formLabel">
                    <label>วันเกิด :</label>
                  </div>
                  <div className="formValue">
                    <input type="date" name="Birthday" onChange={handleInput} />

                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>หมายเลขใบอณุญาต :</label>
                  </div>
                  <div className="formValue">
                    <input type="text" name="License" placeholder="0123456789" onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>ความเชี่ยวชาญ :</label>
                  </div>
                  <div className="formValue">
                    <select title="Profession" name="ProfessionID" onChange={handleInput}>
                      {pickProfession.map((item) => (
                        <option value={item.ID} key={item.Name}>{item.Name}</option>))
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>ศาสตร์เฉพาะทาง :</label>
                  </div>
                  <div className="formValue">
                    <select title="Profession" name="SpecialtiesID" onChange={handleInput}>
                      {pickSpecialties.map((item) => (
                        <option value={item.ID} key={item.Name}>{item.Name}</option>))
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>เงินเดือน :</label>
                  </div>
                  <div className="formValue">
                    <input type="text" name="Salary" placeholder="5500" onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>เบอร์โทรศัพท์ :</label>
                  </div>
                  <div className="formValue">
                    <input type="text" name="Tel" placeholder="0891234567" onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>วันที่รับเข้ามาทำงาน :</label>
                  </div>
                  <div className="formValue">
                    <input type="date" name="Working_Start" onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6Col">
                  <div className="formLabel">
                    <label>รูปภาพ :</label>
                  </div>
                  <div className="formValue">
                    <input type="file" id="Image" name="Image" accept="image/png,image/jpeg" onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div>
              </div>

              <div className="centralize">
                <div className="grid-container5-6BCol">
                  <div className="formLabel">
                    <label>ตัวอย่างรูปภาพ :</label>
                  </div>
                  <div className="previewImage-container">
                    <div className="previewImage">
                      <img src={input.Image} />
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
              <Link to="/veterinarian">
                <button className="cancleButton">ยกเลิก</button>
              </Link>
              <button type="submit" className="confirmButton">ยืนยัน</button>
            </div>

          </div>
        </form >
      </div >

    </>

  );
}

