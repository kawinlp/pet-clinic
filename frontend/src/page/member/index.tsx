import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemberInterface } from "../../interfaces/IMember";
import { DeleteMemberByID, GetMembers } from "../../services/https/memberRegister";
import ageCalculate from "../../component/age_calculate"
import { Table, Button, Col, Row, Divider, Modal, message, Pagination, Space } from "antd";
import { PlusOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Modals from "../pet/petCreate"
import Navbar from "../../component/navbar/Navbar2";

function Index() {

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

  const [members, setMembers] = useState<MemberInterface[]>([]);

  const getMembers = async () => {
    let res = await GetMembers();
    if (res) {
      setMembers(res);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const columns: ColumnsType<MemberInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      align: 'center',
    },
    {
      title: "ชื่อ",
      dataIndex: "FristName",
      key: "firstname"
    },
    {
      title: "นามสกุล",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "Phone",
      key: "phone"
    },
    {
      title: "อายุ",
      dataIndex: "Birthday",
      key: "birthday",
      render: (text, record) => ageCalculate(record.Birthday),

    },
    {
      title: "สัตว์เลี้ยง",
      dataIndex: "Pet",
      key: "pet",
      render: (text, record, index) => (
        <div className="flex items-center">
          <Button
            onClick={() => showModal(Number(record.ID))}
            shape="circle"
            icon={<PlusCircleOutlined />}
            size={"middle"}
          // danger
          />
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/petByMember/${record.ID}`)}
            shape="circle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }
            size={"middle"}
          />

        </div>
      )
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button onClick={() => navigate(`/member/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"middle"} />
        </>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [selectedMemberID, setSelectedMemberID] = useState<number>();

  const showModal = (memberID: number) => {
    setSelectedMemberID(memberID);
    setOpen(true);
  };
  // const [modalText, setModalText] = useState<String>();
  // const showModal1 = (memberID: number, firstname: string) => {
  //   setModalText(
  //     `คุณต้องการลบข้อมูลผู้ใช้ "${firstname}" หรือไม่ ?`
  //   );
  // };

  // const deleteMember = async (memberID: number) => {
  //   let res = await DeleteMemberByID(memberID);
  //   if (res.status) {
  //     messageApi.open({
  //       type: "success",
  //       content: "ลบข้อมูลสำเร็จ",
  //     });
  //     setTimeout(function () {
  //       navigate("/pets");
  //     }, 1000);
  //   } else {
  //     messageApi.open({
  //       type: "error",
  //       content: "ลบข้อมูลไม่สำเร็จ",
  //     });
  //   }
  // }

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
                  <span className="mr-3 font-semibold text-dark">สมาชิกทั้งหมด</span>
                </h1>
                <div className="relative flex flex-wrap items-center my-2 gap-3">
                  <button
                    onClick={() => navigate(`/pets`)}
                    className="text-black rounded-md w-50 border border-[#FFCC70] bg-[#FFCC70] px-4 py-1
                     text-md hover:text-white shadow-md  hover:bg-[#22668D] hover:border hover:border-[#22668D] focus: focus:ring-1"
                  >สัตว์เลี้ยงทั้งหมด
                  </button>
                  <button
                    onClick={() => navigate(`/member/memberCreate`)}
                    className="text-black rounded-md w-50 border border-[#FFCC70] bg-[#FFCC70] px-4 py-1
                     text-md hover:text-white shadow-md  hover:bg-[#22668D] hover:border hover:border-[#22668D] focus: focus:ring-1"
                  >เพิ่มสมาชิก
                  </button>

                </div>
              </div>
              {/* <!-- end card header --> */}
              <div className="w-full h-screen bg-white rounded-b-2xl justify-center items-center px-10 py-5">
                <div>
                  <Table rowKey="ID" columns={columns} dataSource={members} pagination={{ pageSize: 7 }} />
                </div>
                <Modal
                  footer={null}
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={800}
                >
                  <Modals memberID={selectedMemberID || 0} />
                </Modal>

                {/* <Modal
                  title="ลบข้อมูล!!!!"
                  open={open1}
                  footer={null}
                  onOk={handleOk1}
                  okButtonProps={{ style: { background: 'red', color: 'white' } }}  // ตรงนี้เปลี่ยนสีปุ่ม OK
                  onCancel={handleCancel1}
                >
                  <p>{modalText}</p>
                  <Space>
                    <Button
                      type="primary"
                      // onClick={DeleteMemberByID()}
                      size="middle"
                      className="bg-white border border-[#22668D] text-black hover:bg-[#22668D]"
                    >
                      ยืนยัน
                    </Button>
                  </Space>
                </Modal> */}
              </div >
            </div >
          </div >
        </div >
      </div >
    </>

  );
}

export default Index;