
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemberInterface } from "../../interfaces/IMember";
import { PetInterface } from "../../interfaces/ISpa";
import { GetPets } from "../../services/https/petRegister";
import { GetMembers } from "../../services/https/memberRegister";
import { AppointmentInterface } from "../../interfaces/Iappointment";
import { GetAppointment } from "../../services/https/appointment";


import { TreatmentInterface } from "../../interfaces/ITreatment";
import {
  Table,
  Button,
  Col,
  Row,
  Divider,
  Modal,
  message,
  Pagination,
  Space,
  Image,
} from "antd";
import moment from "moment";
import {
  PlusOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Modals from "../treatment/treatmentCreate";
import Navbar from "../../component/navbar/Navbar2";

function Index() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [appoints, setAppoints] = useState<
    AppointmentInterface[] & MemberInterface[] & PetInterface[]
  >([]);
  const GetAppointments = async () => {
    let res = await GetAppointment();
    if (res) {
      setAppoints(res);
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
  const getPets = async () => {
    let res = await GetPets();
    if (res) {
      setPets(res);
    }
  };

  //search
  const [query, setQuery] = useState("");
  const filteredProducts = pets.filter((pet) =>
    Object.values(pet).some(
      (Name) => pet.Name && pet.Name.toLowerCase().includes(query.toLowerCase())
    )
  );
  //search

  useEffect(() => {
    GetAppointments();
    getMembers();
    getPets();
  }, []);

  const columns: ColumnsType<
    AppointmentInterface & MemberInterface & PetInterface & TreatmentInterface
  > = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      align: "center",
    },
    {
      title: "",
      dataIndex: "PetID",
      key: "petID",
      align: "center",
      render: (text, record) => {
        const pet = pets.find((m) => m.ID === record.PetID);
        return pet ? (
          <Image
            src={pet.Picture}
            alt="Pet Image"
            style={{ width: "80px", height: "80px", borderRadius: "25px" }}
          />
        ) : (
          "รูปถูกลบออก"
        );
      },
    },
    {
      title: "ชื่อสัตว์เลี้ยง",
      dataIndex: "PetID",
      key: "petID",
      align: "center",
      render: (text, record) => {
        const pet = pets.find((m) => m.ID === record.PetID);
        return pet ? pet.Name : "สัตว์เลี้ยงถูกลบออก";
      },
    },
    {
      title: "วันที่ต้องมารักษา",
      dataIndex: "Appointment_date",
      key: "appointment_date",
      align: "center",
      render: (text, record, index) => (
        <span>{moment(record.Appointment_date).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "บันทึกการรักษา",
      dataIndex: "Treatment",
      key: "treatment",
      align: "center",
      render: (text, record, index) => (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => showModal(Number(record.PetID))}
            shape="circle"
            icon={<PlusCircleOutlined />}
            size={"middle"}
            // danger
          />
        </div>
      ),
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/appointment/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"middle"}
            style={{ marginRight: "4px" }}
          />
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedPetID, setSelectedPetID] = useState<number>();

  const showModal = (petID: number) => {
    setSelectedPetID(petID);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      
 
      <Navbar />
      <div className="flex flex-wrap mx-3 mb-5">
        <div className="w-full max-w-full px-3 mx-auto bg-yellow-50">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            
            <div className="relative bg-blue-300 flex flex-col min-w-0 break-words bg-clip-border rounded-2xl bg-light/30 border border-solid border-[#22668D] ">
              {/* start card header */}
          
              <div className="px-5 flex justify-between items-stretch flex-wrap min-h-[70px] bg-transparent rounded-t-2xl ">
                <h1 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    ตารางการรักษา
                  </span>
                </h1>
                <div className="relative flex flex-wrap items-center my-2 gap-3">
                  <button
                    onClick={() => navigate(`/treatment/history/`)}
                    className="text-black rounded-md w-50 border border-[#FFCC70] bg-[#FFCC70] px-4 py-1
                     text-md hover:text-white shadow-md  hover:bg-[#22668D] hover:border hover:border-[#22668D] focus: focus:ring-1"
                  >
                    ประวัติการรักษาสัตว์
                  </button>
                </div>

              </div>
              {/* <!-- end card header --> */}
              <div className="w-full h-screen bg-white rounded-b-2xl justify-center items-center px-10 py-5">
                <div>
                  <Table
                    rowKey="ID"
                    columns={columns}
                    dataSource={appoints.filter(
                      (record) => record.Status !== "ยกเลิก"
                    )}
                    pagination={{ pageSize: 5 }}
                    
                  />
                </div>
                <Modal
                  footer={null}
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={800}
                >
                  <Modals petID={selectedPetID || 0} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
