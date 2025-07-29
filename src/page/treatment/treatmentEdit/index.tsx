import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import {
  TreatmentInterface,
  CaseTInterface,
} from "../../../interfaces/ITreatment";
import {
  GetCaseT,
  GetVaccines,
  UpdateTreatment,
  GetTreatmentById,
  GetTreatmentByPet,
  GetTreatmentEdit,
} from "../../../services/https/treatment";
import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";
import { GetVeterinarianList } from "../../../services/https/Veterinarian";
import {
  Input,
  message,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Card,
  Select,
  DatePicker,
  Space,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PetInterface } from "../../../interfaces/ISpa";
import { GetPets, GetPetByMember } from "../../../services/https/petRegister";
import Navbar from "../../../component/navbar/Navbar";
import moment from "moment";

const Index = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { Option } = Select;
  const [treatment, setTreatment] = useState<TreatmentInterface>();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");

  const getTreatmentByID = async () => {
    let res = await GetTreatmentEdit(Number(id));

    console.log("setdate: ", res);

    if (res) {
      setTreatment(res);
      console.log("data: ", res);
      console.log("param: ", id);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Date: moment(res.Date),
        Detail: res.Detail,
        Recuperate: res.Recuperate,
        CaseTID: res.CaseTID,
        ProductID: res.ProductID,
        VeterinarianID: res.VeterinarianID,
        Comment: res.Comment,
        Treatmentprice: res.Treatmentprice,
      });
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

  const [vaccines, setGetVaccines] = useState<ProductInterface[]>([]);
  const Getvaccines = async () => {
    let res = await GetVaccines();
    if (res) {
      setGetVaccines(res);
    }
  };

  const [CaseTs, setCaseTs] = useState<CaseTInterface[]>([]);
  const getCaseTs = async () => {
    let res = await GetCaseT();

    if (res) {
      console.log(res);
      setCaseTs(res);
      console.log(CaseTs);
    }
  };

  const [pets, setPets] = useState<PetInterface[]>([]);
  const Getpet = async () => {
    let res = await GetPets();
    if (res) {
      setPets(res);
    }
  };

  const getPetById = (petID?: number): PetInterface | undefined => {
    return pets.find((pet) => pet.ID === petID);
  };

  useEffect(() => {
    getVeterinarian();
    Getpet();
    getTreatmentByID();
    getCaseTs();
    getPetById();
    Getvaccines();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: TreatmentInterface) => {
    values.ID = treatment?.ID;
    // values.Recuperate = Number(treatment?.Recuperate);
    // values.Treatmentprice = Number(treatment?.Treatmentprice);

    let res = await UpdateTreatment(values);
    console.log("data after: ", res);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/treatment");
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
      <div className=" justify-center flex">
        <div className="w-[600px] mx-auto px-8 py-8 bg-white border rounded-xl shadow-xl mt-6">
          <div className="flex text-2xl font-semibold w-full justify-center items-center">
            <h1 className="font-semibold text-2xl">แก้ไขข้อมูลการรักษา</h1>
          </div>
          <Form
            className="flex flex-wrap"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 w-full">
              <Form.Item
                label="วันที่ลงรักษา"
                name="Date"
                rules={[
                  { required: true, message: "กรูณาเลือกวันที่ลงบันทึก !" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="รายละเอียดการรักษา"
                name="Detail"
                rules={[
                  {
                    required: true,
                    message: "กรุณารายละเอียดการรักษา !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="ProductID"
                label="เลือกของที่ต้องใช้"
                rules={[
                  { required: true, message: "กรุณาเลือกของที่ต้องใช้ !" },
                ]}
              >
                <Select>
                  {vaccines.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="CaseTID"
                label="CaseTreatment"
                rules={[
                  { required: true, message: "กรุณาเลือกCaseTreatment !" },
                ]}
              >
                <Select>
                  {CaseTs.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="ฟื้นตัว"
                name="Recuperate"
                rules={[{ required: true, message: "กรุณาระบุการฟื้นตัว !" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="สัตว์แพทย์ที่รักษา"
                name="VeterinarianID"
                rules={[
                  {
                    required: true,
                    message: "Please select the Veterinarian!",
                  },
                ]}
              >
                <Select>
                  {ListVeterinarian.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="หมายเหตุ(ถ้ามี)" name="Comment">
                <Input />
              </Form.Item>
              <Form.Item
                name="Treatmentprice"
                label="ค่ารักษา"
                rules={[{ required: true, message: "กรุณาระบุค่ารักษา !" }]}
              >
                <Input />
              </Form.Item>
              <div className="col-span-2 flex flex-row-reverse">
                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "8px",
                    }}
                  >
                    <Button
                      onClick={() => navigate(`/treatment/history`)}
                      type="default"
                      size="large"
                      danger
                      style={{
                        background: "white",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      ย้อนกลับ
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      danger
                      style={{ background: "green", marginLeft: "8px" }}
                      htmlType="submit"
                    >
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
  );
};

export default Index;
