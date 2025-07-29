import { useEffect, useState } from "react";
import { AppointmentInterface } from "../../../interfaces/Iappointment";
import {
  UpdateAppointment,
  Getemplist,
  GetAppointmentById,
} from "../../../services/https/appointment";
import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";
import { GetVeterinarianList } from "../../../services/https/Veterinarian";
import { MemberInterface } from "../../../interfaces/IMember";
import { GetMembers } from "../../../services/https/memberRegister";
import { PetInterface } from "../../../interfaces/IPet";
import { GetPetByMember } from "../../../services/https/petRegister";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeInterface } from "../../../interfaces/IEmployee";
import Navbar from "../../../component/navbar/Navbar2";
import moment from "moment";

const Index = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");

  const [form] = Form.useForm();
  const { Option } = Select;
  const [appointment, setAppointment] = useState<AppointmentInterface>();
  const { id } = useParams();

  const getAppointmentByID = async () => {
    let res = await GetAppointmentById(Number(id));
    console.log("setdate: ", res);

    if (res) {
      setAppointment(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Appointment_in_date: moment(res.Appointment_in_date),
        Appointment_date: moment(res.Appointment_date),
        VeterinarianID: res.VeterinarianID,
        EmployeeID: res.EmployeeID,
        MemberID: res.MemberID,
        PetID: res.PetID,
        Status: String("จอง"),
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

  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  const getEmployee = async () => {
    let res = await Getemplist();
    if (res) {
      setEmployee(res);
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
    const memberId = parseInt(e.target.value, 10);
    setSelectedMember(memberId);
    getPets(memberId);
  };

  const getPets = async (MemberID: number) => {
    let res = await GetPetByMember(MemberID);
    if (res) {
      setPets(res);
    }
  };

  useEffect(() => {
    getVeterinarian();
    getEmployee();
    getAppointmentByID();
    getMembers();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: AppointmentInterface) => {
    values.ID = appointment?.ID;

    let res = await UpdateAppointment(values);
    console.log("data after: ", res);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/appointment");
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
            <h1>แก้ไขข้อมูลการนัดหมาย</h1>
          </div>
          <Form
            className="flex flex-wrap"
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 w-full">
              <Form.Item
                label="วันที่จอง"
                name="Appointment_in_date"
                rules={[
                  { required: true, message: "Please select the in_date!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="วันที่มารักษา"
                name="Appointment_date"
                rules={[{ required: true, message: "Please select the date!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="เจ้าของสัตว์เลี้ยง"
                name="MemberID"
                rules={[
                  { required: true, message: "Please select the Member!" },
                ]}
              >
                <Select onChange={handleMemberChange} disabled={true}>
                  {members.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.FristName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="สัตว์เลี้ยง"
                name="PetID"
                
              >
                <Select disabled={true}>
                  {pets.map((item) => (
                    <Option value={item.Name} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="สัตว์แพทย์ที่รักษา"
                name="VeterinarianID"
                rules={[{required: true,message: "Please select the Veterinarian!", },]} >
                <Select>
                  {ListVeterinarian.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="พนักงานที่ลงบันทึก"
                name="EmployeeID"
                rules={[
                  { required: true, message: "Please select the Employee!" },
                ]}
              >
                <Select>
                  {employee.map((item) => (
                    <Option value={item.ID} key={item.FirstName}>
                      {item.FirstName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="สถานะ" name="status" rules={[{ required: true, message: 'Please select the status!' }]} >
                <Select>
                    <Option value="จอง">จอง</Option>
                    <Option value="ยกเลิก">ยกเลิก</Option>
                </Select>
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
                      onClick={() => navigate(`/appointment`)}
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
