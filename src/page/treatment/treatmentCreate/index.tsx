import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductInterface } from "../../../interfaces/IProduct";
import {
  TreatmentInterface,
  CaseTInterface,
} from "../../../interfaces/ITreatment";
import {
  CreateTreatment,
  GetCaseT,
  GetVaccines,
} from "../../../services/https/treatment";
import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";
import { GetVeterinarianList } from "../../../services/https/Veterinarian";
import { DeleteAppointment } from "../../../services/https/appointment";
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
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { PetInterface } from "../../../interfaces/ISpa";
import { GetPets, GetPetByMember } from "../../../services/https/petRegister";

interface ModalProps {
  petID: number;
}
const { Option } = Select;

const Index: React.FC<ModalProps> = ({ petID }) => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");
  console.log("Resive", petID);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteId, setDeleteId] = useState<number>();

  function getProductPriceById(productID: number) {
    // ค้นหา Product ที่มี ID ตรงกับ productID
    const product = vaccines.find((product) => product.ID === productID);
    // ถ้าพบ Product จะ return ราคาของ Product นั้น
    // ถ้าไม่พบ Product จะ return 0 หรือค่าเริ่มต้นที่คุณต้องการ
    return product?.Price || 0;
  }

  const onFinish = async (values: TreatmentInterface & PetInterface) => {
    values.PetID = petID;
    values.Recuperate = Number(values.Recuperate);
    values.Totalprice = Number(values.Totalprice);
    values.Treatmentprice = Number(values.Treatmentprice);
    if (values.Treatmentprice !== undefined && values.ProductID !== undefined) {
      // ทำการบวกกันเมื่อทั้งสองค่ามีค่าที่ถูกต้อง
      values.Totalprice =
        values.Treatmentprice + getProductPriceById(values.ProductID);
    } else {
      // กรณีมีค่า undefined ใน Treatmentprice หรือ ProductID
      console.error("Treatmentprice or ProductID is undefined"); // ทำอย่างอื่นตามที่คุณต้องการ
    }
    try {
      // ตรวจสอบค่า deleteId ก่อนที่จะลบ appointment
      if (typeof deleteId === "number") {
        let res2 = await DeleteAppointment(deleteId);
        console.log("Appointment deleted: ", res2);
      }

      let res = await CreateTreatment(values);
      console.log("data: ", res);
      if (res.status) {
        messageApi.warning({
          type: "success",
          content: "บันทึกข้อมูลการรักษาสำเร็จ",
        });
        setTimeout(function () {
          navigate("/treatment");
        }, 2000);
      } else {
        console.log("Form values:", values);
        messageApi.open({
          type: "error",
          content: res.message,
          duration: 10,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [vaccines, setGetVaccines] = useState<ProductInterface[]>([]);
  const Getvaccines = async () => {
    let res = await GetVaccines();
    if (res) {
      setGetVaccines(res);
    }
  };

  const [pets, setPets] = useState<PetInterface[]>([]);
  const Getpet = async () => {
    let res = await GetPets();
    if (res) {
      setPets(res);
    }
  };

  const [petI, setPetID] = useState<number | null>(null);

  const getPetById = (petID?: number): PetInterface | undefined => {
    return pets.find((pet) => pet.ID === petID);
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

  const [ListVeterinarian, setVeterinarian] = useState<VeterinarianInterface[]>(
    []
  );
  const getVeterinarian = async () => {
    let res = await GetVeterinarianList();
    if (res) {
      setVeterinarian(res);
    }
  };

  useEffect(() => {
    Getvaccines();
    getVeterinarian();
    getCaseTs();
    Getpet();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        {petID && (
          <h2 className="font-semibold text-2xl">
            {" "}
            เพิ่มข้อมูลการรักษาของ {getPetById(petID)?.Name || "Unknown"}
          </h2>
        )}
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
                label="วันที่รักษา"
                name="Date"
                rules={[{ required: true, message: "กรุณาใส่วันที่รักษา !" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="ProductID"
                label="ของที่ต้องใช้"
                rules={[
                  { required: true, message: "กรุณาเลือกของที่ต้องใช้ !" },
                ]}
              >
                <Select allowClear>
                  {vaccines.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="CaseTID"
                label="CaseTreatment"
                rules={[
                  { required: true, message: "กรุณาเลือกCasetreatment !" },
                ]}
              >
                <Select allowClear>
                  {CaseTs.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ฟื้นตัว"
                name="Recuperate"
                rules={[{ required: true, message: "กรุณาระบุการฟื้นตัว !" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="VeterinarianID"
                label="สัตว์แพทย์ที่รักษา"
                rules={[
                  { required: true, message: "กรุณาเลือกสัตว์แพทย์ที่รักษา !" },
                ]}
              >
                <Select allowClear>
                  {ListVeterinarian.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="หมายเหตุ(ถ้ามี)" name="Comment">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="Treatmentprice"
                label="ค่ารักษา"
                rules={[{ required: true, message: "กรุณาระบุค่ารักษา !" }]}
              >
                <Input />
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
                    className="bg-white border border-[#22668D] text-black hover:bg-[#22668D]"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Index;
