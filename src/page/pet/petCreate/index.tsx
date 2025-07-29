import { useState, useEffect } from "react";
import {
    Button,
    Col,
    Row,
    Divider,
    Form,
    Input,
    Card,
    message,
    Upload,
    Select,
    DatePicker,
    Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { PetGenderInterface, PetInterface, PetTypeInterface } from "../../../interfaces/IPet";
import { CreatePet, GetGenders, GetPetTypes } from "../../../services/https/petRegister";

const { Option } = Select;

interface ImageUpload {
    uid: string
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    percent: number
    // originFileObj: OriginFileObj
    error: Error
    response: string
    status: string
    thumbUrl: string
}

interface ModalProps {
    memberID: number
}

const Index: React.FC<ModalProps> = ({ memberID }) => {
    // console.log("Resive", memberID)
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigator]);
    // const EmployeeID = Cookies.get('EmployeeID');
    const EmployeeID = localStorage.getItem('EmployeeID');

    const onFinish = async (values: PetInterface) => {
        values.Picture = profile?.thumbUrl;
        values.MemberID = memberID;
        values.Weight = Number(values.Weight);

        let res = await CreatePet(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "เพิ่มข้อมูลสัตว์เลี้ยงสำเร็จ",
                duration: 20,
            });
            setTimeout(function () {
                navigate("/pets");
            }, 20000);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
                duration: 20,
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

    const [profile, setProfile] = useState<ImageUpload>();
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        setProfile(e?.fileList[0])
        return e?.fileList;
    };

    const [types, setTypes] = useState<PetTypeInterface[]>([]);
    const getType = async () => {
        let res = await GetPetTypes();
        console.log(res)
        if (res) {
            setTypes(res);
        }
    };

    useEffect(() => {
        getGender();
        getType();
    }, []);

    return (
        <div>
            {contextHolder}
           
            <Card >
                <h2 className=" font-semibold text-2xl">เพิ่มข้อมูลสัตว์เลี้ยง</h2>
                <Divider />
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[8, 8]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชื่อ"
                                name="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อ !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item name="PetGenderID" label="เพศ" rules={[{ required: true, message: "กรุณาระบุเพศ !", }]}>
                                <Select allowClear>
                                    {genders.map((item) => (
                                        <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="น้ำหนัก"
                                name="Weight"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาระบุน้ำหนัก !",
                                    },
                                ]}
                            >
                                <Input
                                    // type="number"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="วันเกิด"
                                name="Birthday"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาระบุวันเกิด !",
                                    },
                                ]}

                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item name="PetTypeID" label="ประเภท" rules={[{ required: true, message: "กรุณาเลือกประเภทสัตว์เลี้ยง !", }]}>
                                <Select allowClear>
                                    {types.map((item) => (
                                        <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="อาการแพ้(ถ้ามี)"
                                name="Allergic"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="รูปประจำตัว"
                                name="Profile"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}

                            >
                                <Upload maxCount={1} multiple={false} listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col style={{ marginTop: "20px" }}>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        danger
                                        style={{ backgroundColor: 'green', marginLeft: '8px' }}
                                        icon={<PlusOutlined />}
                                    >
                                        เพิ่มข้อมูล
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default Index