import { useEffect, useState } from "react";
import logo from "../../../assets/Logo.png"
import { SubAttributeInterface } from "../../../interfaces/ISubAttribute";
import { GetHumanGenderList } from "../../../services/https/HumanGender";
import { MemberInterface } from "../../../interfaces/IMember";
import { useNavigate } from "react-router-dom";
import { CreateMember } from "../../../services/https/memberRegister";
import { message } from "antd";
import Navbar from "../../../component/navbar/Navbar2";

const Index = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
        navigate('/login');
        }
    }, [token, navigator]);
    // const EmployeeID = Cookies.get('EmployeeID');
    const EmployeeID = localStorage.getItem('EmployeeID')

    const sentMemberData = async (values: MemberInterface) => {
        values.FristName = input.FristName
        values.LastName = input.LastName
        values.Phone = input.Phone
        values.Birthday = new Date(input.Birthday)
        values.HumanGenderID = input.HumanGenderID

        let res = await CreateMember(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "ลงทะเบียนสมาชิกสำเร็จ",
                duration:20
            });
            setTimeout(() => {
                navigate("/members")
            }, 10000);
        } else {
            if (res.message) {
                console.log(values)
                messageApi.open({
                    type: "error",
                    content: res.message,
                    duration:20
                });
            }
        };
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sentMemberData(input);
    };

    const [input, setInput] = useState({
        FristName: "",
        LastName: "",
        Phone: "",
        Birthday: new Date(),
        HumanGenderID: 1
    });

    const handleInput = async (e: any) => {

        if (e.target.name === "HumanGenderID" || e.target.name === "PetTypeID") {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value, 10) });
        }
        else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    }

    const [genders, setGenders] = useState<SubAttributeInterface[]>([]);
    const getGender = async () => {
        let res = await GetHumanGenderList();
        console.log(res)
        if (res) {
            setGenders(res);
        }
    };

    useEffect(() => {
        getGender();
    }, []);


    return (
        <>
        
            {contextHolder}
            
                <Navbar />
         
            <div className='flex w-full min-h-screen'>
                {/* left */}
                <div className='w-2/5 bg-[#22668D] justify-center'>
                    <div className="justify-center items-center">
                        <img src={logo} alt="Logo Pet Clinic" />
                    </div>
                </div>

                {/* right */}
                <div className='w-3/5 bg-white py-10'>
                    <div className='w-11/12 min-h-full mx-auto px-8 py-8 bg-white border-2 border-[#22668D] rounded-lg'>
                        <h2 className='text-3xl font-bold mb-1'>ลงทะเบียนสำหรับสมาชิก</h2>
                        <p className=' text-md mb-6'>กรุณากรอกข้อมูลด้านล่างเพื่อลงทะเบียน</p>
                        <form onSubmit={handleSubmit} className="flex flex-wrap">
                            <div className="bt-4 grid grid-cols-2 gap-5 w-full">
                                <div>
                                    <label className="text-ms font-normal text-[#22668D] flex justify-start text-left">ชื่อ</label>
                                    <input
                                        // required
                                        type="text"
                                        name="FristName"
                                        onChange={handleInput}
                                        placeholder="กรุณาระบุชื่อ"
                                        className="w-full border text-sm border-[#22668D] px-3 py-2" />
                                </div>
                                <div>
                                    <label className="text-ms font-normal text-[#22668D] flex justify-start text-left">นามสกุล</label>
                                    <input
                                        // required
                                        type="text"
                                        onChange={handleInput}
                                        name="LastName"
                                        placeholder="กรุณาระบุนามสกุล"
                                        className="w-full border text-sm border-[#22668D] px-3 py-2" />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-ms font-normal text-[#22668D] flex justify-start text-left">เบอร์โทร</label>
                                    <input
                                        // required
                                        type="text"
                                        name="Phone"
                                        onChange={handleInput}
                                        placeholder="กรุณาระบุเบอร์โทรศัพท์"
                                        className="w-full border text-sm border-[#22668D] px-3 py-2" />
                                </div>
                                <div>
                                    <label className="text-ms font-normal text-[#22668D] flex justify-start text-left">วันเกิด</label>
                                    <input
                                        // required
                                        type="date"
                                        name="Birthday"
                                        onChange={handleInput}
                                        placeholder="กรุณาระบุ วัน/เดือน/ปี เกิด"
                                        className="w-full border text-sm text-black border-[#22668D] px-3 py-2" />
                                </div>
                                <div>
                                    <label className="text-ms font-normal text-[#22668D] flex justify-start text-left">เพศ</label>
                                    <select
                                        name="HumanGenderID"
                                        onChange={handleInput}
                                        className="w-full border text-sm text-black border-[#22668D] px-3 py-2">
                                        {genders.map((item) => (
                                            <option value={item.ID} key={item.Name}>{item.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='flex w-full flex-wrap justify-center mt-10 gap-5'>
                                <button onClick={() => navigate(`/members`)} className="rounded-md border w-40 border-[#22668D] bg-white px-6 py-2 text-2xl font-bold text-[#22668D] shadow-md
                                hover:border-cyan-600 hover:text-cyan-600 focus:ring-1">
                                    ยกเลิก
                                </button>
                                <button type="submit" className="rounded-md w-50 border border-yellow-500 bg-yellow-500 px-6 py-2 text-2xl font-semibold text-white shadow-md 
                                hover:bg-yellow-400 hover:border hover:border-yellow-400 focus: focus:ring-1">
                                    ลงทะเบียน
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default Index