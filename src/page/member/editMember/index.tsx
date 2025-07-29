import { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { MemberInterface } from '../../../interfaces/IMember';
import { GetMemberById, UpdateMember } from '../../../services/https/memberRegister';
import { GetHumanGenderList } from '../../../services/https/HumanGender';
import { SubAttributeInterface } from '../../../interfaces/ISubAttribute';
import Navbar from '../../../component/navbar/Navbar';
const { Option } = Select;
// import { Modal, } from 'antd';
// import type { UploadFile, UploadProps } from 'antd';


const Index = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    // const EmployeeID = Cookies.get('EmployeeID');
    const EmployeeID = localStorage.getItem('EmployeeID');

    const [form] = Form.useForm();

    const [member, setMember] = useState<MemberInterface>();
    const { id } = useParams();

    const getMemberByID = async () => {
        let res = await GetMemberById(Number(id));
        console.log("setdate: ", res)

        if (res) {
            setMember(res);
            // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
            form.setFieldsValue({
                FristName: res.FristName,
                LastName: res.LastName,
                Phone: res.Phone,
                Birthday: moment(res.Birthday),
                HumanGenderID: res.HumanGenderID
            });
        }
    };

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
        getMemberByID();
    }, []);

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: MemberInterface) => {
        values.ID = member?.ID;

        let res = await UpdateMember(values);
        console.log("data after: ", res);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "แก้ไขข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/members");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
    };

    return (
        <>
            {contextHolder}
            <header>
                <Navbar />
            </header>
            <div className=' justify-center flex'>
                <div className='w-[600px] mx-auto px-8 py-8 bg-white border rounded-xl shadow-xl mt-6'>
                    <div className='flex text-2xl font-semibold w-full justify-center items-center'>
                        <h1>แก้ไขข้อมูลสมาชิก</h1>
                    </div>
                    <Form
                        className="flex flex-wrap"
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                            <Form.Item label="ชื่อ" name="FristName" rules={[{ required: true, message: 'Please input the firstname!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="นามสกุล" name="LastName" rules={[{ required: true, message: 'Please input the lastname!' }]}>
                                <Input />
                            </Form.Item>
                            <div className="col-span-2">
                                <Form.Item label="เบอร์โทร" name="Phone" rules={[{ required: true, message: 'Please input the phone!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <Form.Item label="วันเกิด" name="Birthday" rules={[{ required: true, message: 'Please select the birthday!' }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="เพศ" name="HumanGenderID" rules={[{ required: true, message: 'Please select the gender!' }]}>
                                <Select>
                                    {genders.map((item) => (
                                        <Option value={item.ID} key={item.Name}>
                                            {item.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div className="col-span-2 flex flex-row-reverse">
                                <Form.Item
                                >
                                    <div style={{ display: 'flex', justifyContent: "space-evenly", marginTop: '8px' }}>
                                        <Button
                                            onClick={() => navigate(`/members`)}
                                            type="default"
                                            size='large'
                                            danger
                                            style={{ background: 'white', width: '100px', textAlign: 'center' }}
                                        >
                                            ย้อนกลับ
                                        </Button>
                                        <Button
                                            type="primary"
                                            size='large'
                                            danger
                                            style={{ background: 'green', marginLeft: '8px' }}
                                            htmlType="submit">
                                            บันทึกข้อมูล
                                        </Button>
                                    </div>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Index