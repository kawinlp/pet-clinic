import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DeletePetByID, GetPetByMember } from "../../../services/https/petRegister";
import { PetInterface } from "../../../interfaces/IPet";
import ageCalculate from "../../../component/age_calculate"
import { message, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GetMemberById } from "../../../services/https/memberRegister";
import Navbar from "../../../component/navbar/Navbar2";

const Index = () => {
   let { id } = useParams();
   const navigate = useNavigate();

   const token = localStorage.getItem('token');
   useEffect(() => {
      if (!token) {
         navigate('/login');
      }
   }, [token, navigator]);
   // const EmployeeID = Cookies.get('EmployeeID');
   const EmployeeID = localStorage.getItem('EmployeeID');

   const [pets, setPets] = useState<PetInterface[]>([]);
   const [member, setMember] = useState("");

   const getPets = async () => {
      let res = await GetPetByMember(Number(id));
      let res2 = await GetMemberById(Number(id));
      console.log("pets", res);
      if (res) {
         setPets(res);
         setMember(res2.FristName);
      }
   };

   useEffect(() => {
      getPets();
   }, []);

   const [messageApi, contextHolder] = message.useMessage();

   const [open, setOpen] = useState(false);
   const [modalText, setModalText] = useState<String>();
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [deleteId, setDeleteId] = useState<Number>();


   const showModal = (val: PetInterface) => {
      setModalText(
         `คุณต้องการลบข้อมูลสัตว์เลี้ยง "${val.Name} " หรือไม่ ?`
      );
      setDeleteId(val.ID);
      setOpen(true);
   };

   const handleOk = async () => {
      setConfirmLoading(true);
      let res = await DeletePetByID(deleteId);
      if (!res.status) {
         setOpen(false);
         messageApi.open({
            type: "success",
            content: "ลบข้อมูลสำเร็จ",
         });
         getPets();
         // setTimeout(() => {
         //    getPets();
         //    setConfirmLoading(false);
         // }, 2000);
      } else {
         setOpen(false);
         messageApi.open({
            type: "error",
            content: "เกิดข้อผิดพลาด !",
         });
      }
      setConfirmLoading(false);
   };

   const handleCancel = () => {
      setOpen(false);
   };

   return (
      <>
         {contextHolder}
         <Navbar />
         <div className="flex flex-wrap mx-3 mb-5 ">
            <div className="w-full max-w-full px-3 mx-auto bg-yellow-50">
               <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                  <div className="relative bg-blue-300 flex flex-col min-w-0 break-words bg-clip-border rounded-2xl bg-light/30 border border-solid border-[#22668D] ">
                     {/* start card header */}
                   
                    <div className="px-5 flex justify-between items-stretch flex-wrap min-h-[70px] bg-transparent rounded-t-2xl">
                        <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                           {/* {pets.map((,Index,) => ( */}
                           <span className="mr-3 font-semibold text-dark">สัตว์เลี้ยงของ{member}</span>
                           {/* ))}  */}
                        </h3>
                     </div>
                     {/* <!-- end card header --> */}

                     {/* <!-- card body  --> */}
                     <div className="flex-auto block py-4 px-4 pt-4 pb-0 bg-yellow-50 rounded-b-2xl ">
                        {/* start table section */}
                        <div className="h-[720px] overflow-auto">
                           <table className="w-100% w-full min-w-[1000px] my-0 align-middle text-dark border-neutral-200">
                              {/* start head table */}
                              <thead>
                                 <tr className="bg-gray-200 text-md font-semibold">
                                    <th className="text-center px-5 py-2">ID</th>
                                    <th className="text-start px-5 py-2">รูปภาพ</th>
                                    <th className="text-start px-5 py-2">ชื่อ</th>
                                    {/* <th className="text-start px-5 py-2">เจ้าของ</th> */}
                                    <th className="text-center px-5 py-2">ประเภท</th>
                                    <th className="text-center px-5 py-2">อายุ</th>
                                    <th className="text-center px-5 py-2">น้ำหนัก</th>
                                    <th className="text-center px-5 py-2">เพศ</th>
                                    <th className="text-center px-5 py-2">จัดการ</th>
                                 </tr>
                              </thead>
                              {/* stop head table */}

                              {/* start body table */}
                              <tbody>
                                 {pets.map((pet, index) => (

                                    <tr key={index} className="border-b border-[#22668D]">
                                       <td className=" text-center break-all px-5 py-2">{pet.ID}</td>
                                       <td className=" text-start break-all py-2">
                                          <img src={pet.Picture} className="w-[80px] h-[80px] rounded-[15px] align-middle object-cover" alt="petImage" />
                                       </td>
                                       <td className=" text-start break-all px-5 py-2">{pet.Name}</td>
                                       <td className=" text-center break-all px-5 py-2">{pet.PetType?.Name}</td>
                                       <td className=" text-center break-all px-5 py-2">{ageCalculate(pet.Birthday)}</td>
                                       <td className=" text-center break-all px-5 py-2">{pet.Weight !== undefined ? pet.Weight.toFixed(1) : "N/A"} kg.</td>
                                       <td className=" text-center break-all px-5 py-2">{pet.PetGender?.Name}</td>
                                       <td className="text-center break-all px-5 py-2">
                                          <Button
                                             onClick={() => showModal(pet)}
                                             shape="circle"
                                             icon={<DeleteOutlined />}
                                             size={"middle"}
                                             danger
                                          />
                                          <Button
                                             onClick={() => navigate(`/pet/edit/${pet.ID}`)}
                                             style={{ marginLeft: 8 }}
                                             shape="circle" icon={<EditOutlined />}
                                             size={"middle"} />
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
                                 <Button
                                    key="cancel"
                                    // type="default"
                                    onClick={handleCancel}
                                 // style={{ backgroundColor: 'red', }}

                                 >
                                    ยกเลิก
                                 </Button>,
                                 <Button
                                    key="ok"
                                    type="primary"
                                    style={{ backgroundColor: 'red', }}
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
   )
}

export default Index