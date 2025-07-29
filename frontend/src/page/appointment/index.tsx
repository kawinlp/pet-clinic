import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemberInterface } from "../../interfaces/IMember";
import { PetInterface } from "../../interfaces/ISpa";
import { GetPets } from "../../services/https/petRegister";
import { GetMembers } from "../../services/https/memberRegister";
import { AppointmentInterface } from "../../interfaces/Iappointment";
import { GetAppointment, DeleteAppointment } from "../../services/https/appointment";
import moment from "moment";
import { Table, Button, Col, Row, Divider, Modal, message, Pagination, Space, Image, } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Navbar from "../../component/navbar/Navbar2";
function Index() {
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

  useEffect(() => {
    GetAppointments();
    getMembers();
    getPets();
  }, []);

  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<Number>();
  const showModal = (val: AppointmentInterface) => {
    setModalText(`คุณต้องการลบข้อมูลนัดหมาย " ${val.ID} " หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteAppointment(deleteId);
    if (!res.status) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
        duration: 10,
      });
      getPets();
      setConfirmLoading(false);
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
        duration: 10,
        // content: res.message,
      });
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const columns: ColumnsType<AppointmentInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      align: "center",
    },
    {
      title: "ชื่อผู้จอง",
      dataIndex: "MemberID",
      key: "MemberID",
      align: "center",
      render: (text, record) => {
        const member = members.find((m) => m.ID === record.MemberID);
        return member ? member.FristName : "Unknown";
      },
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
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          "Unknown"
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
        return pet ? pet.Name : "Unknown";
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
      title: "สถานะ",
      dataIndex: "Status",
      key: "status",
      align: "center",
      render: (text, record) => (
        <div>
          <span
            style={{
              backgroundColor:
                record.Status === "การจอง"
                  ? "red"
                  : record.Status === "ยกเลิก"
                  ? "red"
                  : "green",
              color: "white",
              padding: "8px",
              borderRadius: "6px",
              display: "inline-block",
              height: "40px",
              width: "55px",
              alignItems: "center",
            }}
          >
            {text}
          </span>
        </div>
      ),
    },

    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      align: "center",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/appointment/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"middle"}
            style={{ marginRight: "4px" }}
          />
          <Button
            onClick={() => showModal(record)}
            shape="circle"
            icon={<DeleteOutlined />}
            size="middle"
            danger
          />
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <header>
        <Navbar />
      </header>
      <div className="flex flex-wrap mx-3 mb-5">
        <div className="w-full max-w-full px-3 mx-auto bg-yellow-50">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative bg-blue-300 flex flex-col min-w-0 break-words bg-clip-border rounded-2xl bg-light/30 border border-solid border-[#22668D] ">
              {/* start card header */}
              <div className="px-5 flex justify-between items-stretch flex-wrap min-h-[70px] bg-transparent rounded-t-2xl">
                <h1 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    ตารางนัดหมายทั้งหมด
                  </span>
                </h1>
                <div className="relative flex flex-wrap items-center my-2 gap-3">
                  <button
                    onClick={() => navigate(`/appointment/appointmentCreate`)}
                    className="text-black rounded-md w-50 border border-[#FFCC70] bg-[#FFCC70] px-4 py-1
                     text-md hover:text-white shadow-md  hover:bg-[#22668D] hover:border hover:border-[#22668D] focus: focus:ring-1"
                  >
                    ลงบันทึกการนัดหมาย
                  </button>
                </div>
              </div>
              {/* <!-- end card header --> */}
              <div className="w-full h-screen bg-white rounded-b-2xl justify-center items-center px-10 py-5">
                <div>
                  <Table
                    rowKey="ID"
                    columns={columns}
                    dataSource={appoints}
                    pagination={{ pageSize: 4 }}
                  />
                </div>
                <Modal
                  title="ลบข้อมูล ?"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="cancel" onClick={handleCancel}>
                      ยกเลิก
                    </Button>,
                    <Button
                      key="ok"
                      type="primary"
                      danger
                      loading={confirmLoading}
                      onClick={handleOk}
                    >
                      ตกลง
                    </Button>,
                  ]}
                >
                  <p>{modalText}</p>
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
