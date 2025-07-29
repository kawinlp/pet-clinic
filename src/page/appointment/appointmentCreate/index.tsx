import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import {
  CreateAppointment,
  Getemplist,
} from "../../../services/https/appointment";
import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";
import { GetVeterinarianList } from "../../../services/https/Veterinarian";
import { MemberInterface } from "../../../interfaces/IMember";
import { GetMembers } from "../../../services/https/memberRegister";
import { PetInterface } from "../../../interfaces/IPet";
import { GetPetByMember } from "../../../services/https/petRegister";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../../interfaces/IEmployee";
import Navbar from "../../../component/navbar/Navbar2";

const Index = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");

  const handleInput = async (e: any) => {
    const { name, value } = e.target;
    if (
      name === "EmployeeID" ||
      name === "VeterinarianID" ||
      name === "PetID"
    ) {
      setInput({ ...input, [name]: parseInt(value, 10) });
    } else if (name === "PetID" && value === "none") {
      setInput({ ...input, [name]: null });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(input);
    sentAppointmentData();
  };

  const [input, setInput] = useState({
    Appointment_in_date: new Date(),
    Appointment_date: new Date(),
    EmployeeID: 1,
    PetID: undefined, // เปลี่ยนเป็น undefined เพื่อให้เป็นค่าว่างเริ่มต้น
    VeterinarianID: 1,
    MemberID: 1,
  });

  const sentAppointmentData = async () => {
    const newValues = {
      EmployeeID: input.EmployeeID,
      PetID: input.PetID,
      VeterinarianID: input.VeterinarianID,
      MemberID: input.MemberID,
      Appointment_in_date: new Date(input.Appointment_in_date),
      Appointment_date: new Date(input.Appointment_date),
      Status: "จอง",
    };

    let res = await CreateAppointment(newValues);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
        duration: 20,
      });
      setTimeout(function () {
        navigate("/appointment ");
      }, 1000);
    } else {
      console.log("Form values:", newValues);
      messageApi.open({
        type: "error",
        content: res.message,
        duration: 20,
      });
    }
  };

  const [members, setMembers] = useState<MemberInterface[]>([]);
  const getMembers = async () => {
    let res = await GetMembers();
    if (res) {
      setMembers(res);
    }
  };

  const [pets, setPets] = useState<PetInterface[]>([]);
  const [, /*selectedMember*/ setSelectedMember] = useState<number | null>(
    null
  );
  const handleMemberChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: parseInt(value, 10) });
    const memberId = parseInt(value, 10);
    setSelectedMember(memberId);
    getPets(memberId);
  };

  const getPets = async (MemberID: number) => {
    let res = await GetPetByMember(MemberID);
    if (res) {
      setPets(res);
    }
  };

  const [ListVeterinarian, setVeterinarian] = useState<VeterinarianInterface[]>(
    []
  );
  const getVeterinarian = async () => {
    let res = await GetVeterinarianList();
    if (res) {
      setVeterinarian(res);
    }
  };

  const [employee, setEmployee] = useState<EmployeeInterface[]>([]); // Ensure this line is correctly defined in your component

  const getEmployee = async () => {
    let res = await Getemplist();
    if (res) {
      setEmployee(res);
    }
  };

  useEffect(() => {
    getMembers();
    getVeterinarian();
    // getPets();
    getEmployee();
  }, []);

  return (
    <>
      {contextHolder}
      <header>
        <Navbar />
      </header>
      <div className="flex w-full min-h-screen">
        {/* left */}
        <div className="w-2/5 bg-cyan-800 justify-center">
          <div className="justify-center items-center">
            <img src={logo} alt="Logo Pet Clinic" />
          </div>
        </div>

        {/* right */}
        <div className="w-3/5 bghite py-10">
          <div className="w-11/12 min-h-full mx-auto px-8 py-8 bg-white border-2 border-cyan-800 rounded-lg">
            <h2 className="text-3xl font-bold mb-1">ลงบันทึกการจองมารักษา</h2>
            <p className=" text-md mb-6">กรุณากรอกข้อมูลด้านล่าง</p>
            <form onSubmit={handleSubmit} className="flex flex-wrap ">
              <div className="bt-4 grid grid-cols-2 gap-5 w-full">
                <div className="">
                  <label className=" flex text-left justify-start text-ms font-normal text-cyan-800">
                    วันที่จอง
                  </label>
                  <input
                    type="date"
                    name="Appointment_in_date"
                    placeholder="กรุณาใส่วันที่รักษา"
                    className="w-full border text-sm border-cyan-800 px-3 py-2 "
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label className=" flex text-left justify-start text-ms font-normal text-cyan-800 ">
                    วันที่มารักษา
                  </label>
                  <input
                    type="date"
                    name="Appointment_date"
                    placeholder="กรุณาใส่วันที่รักษา"
                    className="w-full border text-sm border-cyan-800 px-3 py-2 "
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label className="flex text-left justify-start text-ms font-normal text-cyan-800">
                    ชื่อของผู้จอง
                  </label>
                  <select
                    name="MemberID"
                    className="w-full border text-sm text-black border-cyan-800 px-3 py-2"
                    required
                    onChange={handleMemberChange}
                  >
                    {members.map((item) => (
                      <option value={item.ID} key={item.ID}>
                        {item.FristName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex text-left justify-start text-ms font-normal text-cyan-800">
                    ชื่อของสัตว์เลี้ยง
                  </label>
                  <select
                    name="PetID"
                    className="w-full border text-sm text-black border-cyan-800 px-3 py-2"
                    required
                    onChange={handleInput}
                  >
                    <option value="">กรุณาเลือก</option>{" "}
                    {pets.map((item) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex text-left justify-start text-ms font-normal text-cyan-800">
                    สัตว์แพทย์ที่รักษา
                  </label>
                  <select
                    name="VeterinarianID"
                    className="w-full border text-sm text-black border-cyan-800 px-3 py-2"
                    required
                    onChange={handleInput}
                  >
                    <option value="">กรุณาเลือก</option>{" "}
                    {ListVeterinarian.map((item) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex text-left justify-start text-ms font-normal text-cyan-800">
                    พนักงานที่ลงบันทึก
                  </label>
                  <select
                    name="EmployeeID"
                    className="w-full border text-sm text-black border-cyan-800 px-3 py-2"
                    required
                    onChange={handleInput}
                  >
                    <option value="">กรุณาเลือก</option>{" "}
                    {employee.map((item) => (
                      <option value={item.ID} key={item.ID}>
                        {item.FirstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex w-full flex-wrap justify-center mt-10 gap-5">
                <button className="rounded-md border w-40 border-cyan-800 bg-white px-6 py-2 text-2xl font-bold text-cyan-800 shadow-md hover:border-cyan-600 hover:text-cyan-600 focus:ring-1 ">
                  <Link to="/appointment">ยกเลิก</Link>
                </button>
                <button
                  type="submit"
                  className="rounded-md w-50 border border-yellow-500 bg-yellow-500 px-6 py-2 text-2xl font-semibold text-white shadow-md 
                               hover:bg-yellow-400 hover:border hover:border-yellow-400 focus: focus:ring-1"
                >
                  ยืนยัน
                </button>
                {contextHolder}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
