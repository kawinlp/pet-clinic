import React,{ useState,useEffect} from "react";
import EditListModal from "../modal/EditListModal";
import { message,Modal } from "antd";
import { ListInterface,PayfinishInterface,UnitListInterface } from "../../interfaces/IList";
import { DeleteListByID} from "../../services/https/sellingproduct";

interface TableProductProps {
    lists: PayfinishInterface[];
    
      }   

const TableList: React.FC<TableProductProps> = ({lists}) => {
    
    const [modal, setModal] = useState(false);
    const toggleModal = (value:number|undefined ) => {
        setSetupList(value)
        setModal(!modal);
      };
    
    const [setupList,setSetupList] =useState<number>();
    const [deleteId, setDeleteId] = useState<Number>();
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();

    const showModal = (val: PayfinishInterface) => {
        setModalText(
          `คุณต้องการลบสินค้า "${val.List?.Product?.Name}" หรือไม่ ?`
        );
        setDeleteId(val.ListID);
        setOpen(true);
      };

      const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteListByID( deleteId);

        if (res) {

          setOpen(false);
          messageApi.open({
            type: "success",
            content: "ลบข้อมูลสำเร็จ",
            duration:5
          });
          setTimeout(() => {
            window.location.reload();
        }, 5000);
        } else {
            
          setOpen(false);
          messageApi.open({
            type: "error",
            content: "เกิดข้อผิดพลาด !",
            duration:5
          });
        }
        setConfirmLoading(false);
      };
    
      const handleCancel = () => {
        setOpen(false);
      };
    return(
        <>
            {contextHolder}
            <table className="w-full table-fixed  border-collapse min-w-max text-center ">
                <thead className="sticky top-0 text-sm bg-[#8ECDDD] text-white">
                    <tr className="border-b border-[#22668D]">
                        <th className="p-2">item</th>
                        <th className="w-14">Qyt</th>
                        <th className="w-14">Price</th>
                        <th className="w-14">Unit</th>
                        <th className="w-20"></th>
                    </tr>
                </thead>
                <tbody className="">
                    {lists.map((lists)=>{
                        const classes ="p-1 border-b  border-[#22668D]";
                        return(
                            <tr key={lists.ID} className="">
                                <td className={`${classes} text-left pl-4`}>{lists.List?.Product?.Name}</td> 
                                <td className={`${classes}`}>{lists.List?.Amount}</td>
                                <td className={`${classes}`}>{lists.List?.Totalprice?.toLocaleString()}.00</td>
                                <td className={`${classes}`}>{lists.List?.UnitList?.Name}</td>
                                <td className={`${classes}`}>
                                    <div className="flex justify-center gap-3">
                                    <button className="hover:text-[#F5AC29] text-[#22668D] rounded-full  inline-flex space-x-1 items-center"
                                        onClick={() => toggleModal(lists.List?.ID)}>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        </span>
                                    </button>
                                    <button className="hover:text-red-500 text-[#22668D] rounded-full inline-flex space-x-1 items-center"
                                    onClick={() => showModal(lists)}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        </span>
                                    </button></div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <EditListModal
                title={"แก้ไขสินค้า"}
                isopen={modal}
                onClose={() => setModal(false)}
                list={setupList}/>
            <Modal
                title="ลบข้อมูล"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    
                    <button className="transition-all border border-red-500 text-red-500 w-20 h-8 mx-5 rounded-md hover:shadow-md hover:shadow-pink-500/40 hover:bg-red-500 hover:text-white" onClick={handleCancel}>CANCLE</button>,
                    <button className="transition-all border border-[#F5AC29] text-[#F5AC29] w-14 h-8 rounded-md hover:shadow-md hover:bg-[#F5AC29] hover:shadow-[#FCD182] hover:text-white" key="submit" onClick={handleOk}>OK</button>

                    ]}
            >
                <p>{modalText}</p>
                
            </Modal>
        </>
    )
}
export default TableList;