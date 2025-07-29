import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Upload,
    message,
    Image,
} from 'antd';
import { PetGenderInterface, PetInterface, PetTypeInterface } from '../../../interfaces/IPet';
import { useNavigate, useParams } from 'react-router-dom';
import { GetGenders, GetPetById, GetPetTypes, UpdatePet } from '../../../services/https/petRegister';
// import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import Navbar from '../../../component/navbar/Navbar2';
const { Option } = Select;
// import { Modal, } from 'antd';
// import type { UploadFile, UploadProps } from 'antd';

interface PictureInterface {
    uid: string
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    percent: number
    originFileObj: OriginFileObj
    error: Error
    response: string
    status: string
    thumbUrl: string
}

export interface OriginFileObj {
    uid: string
}

export interface Error {
    status: number
    method: string
    url: string
}

const Index = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    // const EmployeeID = Cookies.get('EmployeeID');
    const EmployeeID = localStorage.getItem('EmployeeID');

    const [pet, setPet] = useState<PetInterface>();
    const { id } = useParams();

    const [images, setImage] = useState<string | undefined>();
    const getPetById = async () => {
        const res = await GetPetById(Number(id));
        console.log("res.Picture: ", res.Picture)

        if (res) {
            setPet(res);
            setImage(res.Picture);
            // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
            form.setFieldsValue({
                Name: res.Name,
                PetGenderID: res.PetGenderID,
                Weight: res.Weight,
                Birthday: moment(res.Birthday),
                PetTypeID: res.PetTypeID,
                Picture: [{
                    uid: '-1',
                    name: 'Picture',
                    status: 'done',
                    url: res.Picture,
                }],
                Allergic: res.Allergic,
                MemberID: res.MemberID
            });
        }
    };

    const [genders, setGenders] = useState<PetGenderInterface[]>([]);
    const getGender = async () => {
        let res = await GetGenders();
        console.log(res)
        if (res) {
            setGenders(res);
        }
    };

    // get pettype
    const [types, setTypes] = useState<PetTypeInterface[]>([]);
    const getType = async () => {
        let res = await GetPetTypes();
        console.log(res)
        if (res) {
            setTypes(res);
        }
    };

    const [profile, setProfile] = useState<PictureInterface | undefined>()
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        setProfile(e?.fileList[0])
        return e?.fileList;
    };


    useEffect(() => {
        getGender();
        getType();
        getPetById();
    }, []);

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: PetInterface) => {
        values.Picture = profile?.thumbUrl || images;
        values.Weight = Number(values.Weight);
        values.MemberID = pet?.MemberID;
        values.ID = pet?.ID;

        let res = await UpdatePet(values);
        console.log("data after: ", res);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "แก้ไขข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/pets");
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
                        <h1>แก้ไขข้อมูลสัตว์เลี้ยง</h1>
                    </div>
                    <Form
                        className="flex flex-wrap"
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                            <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Pet Gender" name="PetGenderID" rules={[{ required: true, message: 'Please select the pet gender!' }]}>
                                <Select>
                                    {genders.map((item) => (
                                        <Option value={item.ID} key={item.Name}>
                                            {item.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Weight" name="Weight" rules={[{ required: true, message: 'Please input the weight!' }]}>
                                <Input
                                    type="number"
                                />
                            </Form.Item>
                            <div >
                                <Form.Item label="Birthday" name="Birthday" rules={[{ required: true, message: 'Please select the birthday!' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                            <Form.Item label="Pet Type" name="PetTypeID" rules={[{ required: true, message: 'Please select the pet type!' }]}>
                                <Select>
                                    {types.map((item) => (
                                        <Option value={item.ID} key={item.Name}>
                                            {item.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="อาการแพ้" name="Allergic" >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="รูปภาพ"
                                name="Picture"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    maxCount={1}
                                    multiple={false}
                                    listType="picture-card"
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <div className='flex flex-row-reverse items-end col-span-2 '>
                                <Form.Item
                                >
                                    <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                        <Button
                                            onClick={() => navigate(`/pets`)}
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