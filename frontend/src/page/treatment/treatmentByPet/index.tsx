import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetInterface } from "../../../interfaces/IPet";
import { GetPetById } from "../../../services/https/petRegister";
import {
  DeleteTreatmentByID,
  GetTreatmentById,
  GetCaseT,
  GetVaccines,
} from "../../../services/https/treatment";
import { ProductInterface } from "../../../interfaces/IProduct";
import {
  TreatmentInterface,
  CaseTInterface,
} from "../../../interfaces/ITreatment";
import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";
import { GetVeterinarianList } from "../../../services/https/Veterinarian";
import { message, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import Navbar from "../../../component/navbar/Navbar2";
import moment from "moment";

const Index = () => {
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([]);
  const [pet, setPet] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigator]);
  // const EmployeeID = Cookies.get('EmployeeID');
  const EmployeeID = localStorage.getItem("EmployeeID");

  const getPets = async () => {
    let res = await GetTreatmentById(Number(id));
    let res2 = await GetPetById(Number(id));
    if (res) {
      setTreatments(res);
      setPet(res2.Name);
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

  useEffect(() => {
    getPets();
    getVeterinarian();
    Getvaccines();
    getCaseTs();
  }, []);

  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<Number>();

  const showModal = (val: PetInterface) => {
    setModalText(`คุณต้องการลบข้อมูลการรักษาที่ ${val.ID} หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteTreatmentByID(deleteId);
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
                    ตารางการรักษาของ {pet}
                  </span>
                </h1>
              </div>
              {/* <!-- end card header --> */}

              {/* <!-- card body  --> */}
              <div className="flex-auto block py-4 px-4 pt-4 pb-0 bg-yellow-50 rounded-b-2xl ">
                {/* start table section */}
                <div className="h-[720px] overflow-auto">
                  <table className="w-100% w-full min-w-[1000px] my-0 align-middle text-dark border-neutral-200">
                    {/* start head table */}
                    <thead>
                      <tr className="bg-gray-200 text-md font-semibold text-center">
                        <th className="text-center px-5 py-2">ID</th>
                        <th className="text-center px-5 py-2">วันที่รักษา</th>
                        <th className="text-center px-5 py-2">
                          รายละเอียดการรักษา
                        </th>
                        <th className="text-center px-5 py-2">ระยะพักฟื้น</th>
                        <th className="text-center px-5 py-2">เคสการรักษา</th>
                        <th className="text-center px-5 py-2">วัคซีนที่ใช้</th>
                        <th className="text-center px-5 py-2">
                          สัตว์แพทย์ที่รักษา
                        </th>
                        <th className="text-center px-5 py-2">หมายเหตุ</th>
                        <th className="text-center px-5 py-2">จัดการ</th>
                      </tr>
                    </thead>
                    {/* stop head table */}

                    {/* start body table */}
                    <tbody>
                      {treatments.map((treatment, index) => (
                        <tr key={index} className="border-b border-[#22668D]">
                          <td className=" text-center break-all px-5 py-2">
                            {treatment.ID}
                          </td>
                          <td className="text-center break-all px-5 py-2">
                            {moment(treatment.Date).format("YYYY-MM-DD")}{" "}
                            {/* นี่คือรูปแบบที่แสดงวันที่ในรูป YYYY-MM-DD */}
                          </td>
                          <td className=" text-center break-all px-5 py-2">
                            {treatment.Detail}
                          </td>
                          <td className=" text-center break-all px-5 py-2">
                            {treatment.Recuperate}
                          </td>
                          <td className="text-center break-all px-5 py-2">
                            {
                              CaseTs.find(
                                (caseT) => caseT.ID === treatment.CaseTID
                              )?.Name
                            }
                          </td>
                          <td className=" text-center break-all px-5 py-2">
                            {
                              vaccines.find(
                                (caseT) => caseT.ID === treatment.ProductID
                              )?.Name
                            }
                          </td>
                          <td className=" text-center break-all px-5 py-2">
                            {
                              ListVeterinarian.find(
                                (caseT) => caseT.ID === treatment.VeterinarianID
                              )?.Name
                            }
                          </td>
                          <td className=" text-center break-all px-5 py-2">
                            {treatment.Comment ? treatment.Comment : "-"}
                          </td>
                          <td className="text-center break-all px-5 py-2">
                            <Button
                              onClick={() =>navigate(`/treatment/edit/${treatment.ID}`)}
                              style={{ marginLeft: 8 }}
                              shape="circle"
                              icon={<EditOutlined />}
                              size={"middle"}
                            />
                            <Button
                              onClick={() => showModal(treatment)}
                              shape="circle"
                              icon={<DeleteOutlined />}
                              size={"middle"}
                              danger
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
      </div>
    </>
  );
};

export default Index;
