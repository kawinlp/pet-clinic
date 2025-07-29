import React, { useState, useEffect } from "react";
import { ListInterface} from "../../interfaces/IList";
import { UpdateList, GetListById } from "../../services/https/sellingproduct";
import { message,Form} from "antd";
import SelectUnit from "../select/SelectUnit";
import moment from 'moment';
type propTypes = {
    title: string;
    isopen: boolean;
    onClose: () => void;
    list: number | undefined; 
}

const EditListModal: React.FC<propTypes> = ({ title, isopen, onClose, list }) => {
    // const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        
    //     const whiteBoxElement = document.querySelector(".bg-white");
    //     if (whiteBoxElement && whiteBoxElement.contains(e.target as Node)){
    //         return;
    //     }
    //     onClose();
    // };


    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [setuplist,setSetupList] = useState<ListInterface>();
    const getListById = async () => {
        let res = await GetListById(list)
        console.log(res)
        if(res){
            setSetupList(res)
            form.setFieldsValue({ 
                Amount: res.Amount ,
                Totalprice : res.Totalprice ,
                Date: moment(res.Date).format("YYYY-MM-DD"),
                ProductID: res.ProductID,
                UnitListID: res.UnitListID,
                EmployeeID: res.EmployeeID,
             });
            setTotal(res.Totalprice)
        }
    }
     

    const handleSelectUnit = (selectedUnit: number) => {
        setUnit(selectedUnit)
    }

    const handleInput=(e: any) => {
        const inputvalue = parseInt(e.target.value)
        if (setuplist && setuplist.Product&& setuplist.Product.Price !== undefined) {
            const value = inputvalue * setuplist.Product.Price;
            setTotal(value)
            }
    }
    const [total,setTotal] =useState<number>()
    const [unit,setUnit] =useState<number | undefined>()
    const onFinish = async (values: ListInterface) => {
        values.ID = setuplist?.ID;
        values.Totalprice = total;
        values.UnitListID=unit
        values.Amount=Number(values.Amount)
        values.ProductID=Number(setuplist?.ProductID)
        values.Date=setuplist?.Date
        values.EmployeeID = Number(setuplist?.EmployeeID)
        
        let res = await UpdateList(values);
        if (res.status) {
          messageApi.open({
            type: "success",
            content: "แก้ไขข้อมูลสำเร็จ",
            duration:5
          });
          setTimeout(() => {
            window.location.reload();
        }, 5000);
        } else {
            if(res.message==="Amount is required;TotalPrice is required"){
                messageApi.open({
                    type: "error",
                    content: "กรุณาใส่จำนวน",
                    duration:5
                });
            }
            
          messageApi.open({
            type: "error",
            content: res.message,
            duration:5
          });
        }
      };
    
      useEffect(() => {
        if (isopen && list) {
          getListById();
        }
      }, [isopen, list]);

    
    return(
        <div className={`fixed inset-0 z-50 ${isopen ? "visible" : "invisible"}`} onClick={onClose}>
            {contextHolder}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm">
            <div className={`fixed inset-0 flex items-center justify-center transition-all delay-200
                ${isopen?"scale-100 opacity-100":"scale-70 opacity-0"}`} >
                <div className="bg-white rounded-xl shadow-lg w-[600px] z-10 " onClick={(e) => e.stopPropagation()}>
                    <div className="bg-[#22668D] rounded-t-xl text-white justify-center px-4 py-5 text-center shadow-sm">
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </div>
                    <div className="p-4" >
                    <Form form={form} onFinish={onFinish} autoComplete="off" >
                <div className="flex items-center justify-center p-2 px-5 text-[#22668D]">
                    <div className="flex-1 flex-col  divide-y-4 divide-[#22668D] overflow-auto pb-2">
                         <div className="">  
                            <div className="flex justify-between mb-3" > 
                                <div className="w-20">
                                    <label className="">รหัสสินค้า : </label>
                                    <input readOnly value={setuplist?.Product?.ID} className=" text-center bg-whitw border border-[#22668D] sm:text-md rounded-lg  block w-full p-1 focus:outline-none"/> 
                                </div>
                                <div className="w-80">
                                    <p>ชื่อสินค้า : </p>
                                    <input readOnly value={setuplist?.Product?.Name} className="bg-white sm:text-md rounded-lg  block w-full p-1 px-3 focus:outline-none border border-[#22668D]"/> 
                                </div>
                                <div className=" w-20">
                                    <p>ราคา : </p>
                                    <input readOnly value={setuplist?.Product?.Price?.toFixed(2)} className=" bg-white sm:text-md text-center rounded-lg  block w-full p-1 px-3 focus:outline-none border border-[#22668D]"/> 
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col items-start">
                                <label>รายละเอียด : </label>
                                <textarea readOnly value={setuplist?.Product?.Comment} className="bg-white border border-[#22668D] sm:text-md rounded-lg  block w-full p-1 px-3 resize-none min-h-16 focus:outline-none"/>
                            </div>
                            <div className="flex gap-4 justify-between" style={{ alignItems: 'center' }}>
                                 <div className="flex flex-col items-start">
                                    <label> หน่วย :</label>
                                    <Form.Item name={"UnitListID"} style={{ marginBottom: 0 }}>
                                    <SelectUnit onSelectUnit={handleSelectUnit} selectedValue={setuplist?.UnitListID}/>
                                    </Form.Item>
                                </div>

                                <div className="flex flex-col items-start">
                                <label>จำนวน :</label><Form.Item  name={"Amount"} style={{ marginBottom: 0 }}>
                                <input  onChange={handleInput} placeholder="input number"  className="bg-white border border-[#22668D] sm:text-md rounded-lg  block w-full p-1 px-3 focus:outline-none hover:border-[#FFCC70] focus:border-[#FFCC70] focus:shadow-sm focus:shadow-[#FFFADD]"/>
                                </Form.Item >
                                </div>
                            </div>
                            <div className="flex justify-between text-center px-2 w-full " > 
                                <label style={{ fontSize: "2.25rem"}}>Total: </label>
                                <label style={{ fontSize: "2.25rem" }}>{total !==undefined&& (total<=0 ||Number.isNaN(total))?'- ฿':`${total?.toLocaleString()}.00 ฿`}</label>
                            </div>
                        </div> 
                        <div className="space-y-4">
                            <div className="mt-5 flex justify-between h-8">
                                <input type="text" placeholder="Employee" value = {setuplist?.Employee?.EmployeeID} className="bg-white focus:outline-none border w-64 px-3 rounded-lg border border-[#22668D]"></input>
                                <Form.Item name={"Date"} style={{ marginBottom: 0 }}>
                                <input type="date" readOnly
                                    className=" bg-white focus:outline-none border w-40 h-8 rounded-lg border text-center px-3 border-[#22668D] text-[#22668D]"></input>
                                </Form.Item>    
                                </div>
                            <div className="flex gap-20 text-2xl">
                                <button type="button" onClick={onClose} data-ripple-light="true"
                                className="bg-[#8ECDDD] ml-5 flex-1 border border-[#22668D] rounded-lg h-14 text-[#22668D] hover:bg-[#FFCC70] hover:border-[#F5AC29] hover:text-white"
                                data-ripple-dark="true">CANCLE</button>
                                <button type="submit" className="bg-[#8ECDDD] mr-5 flex-1 border rounded-lg mr-5 flex-1 border h-14 border-[#22668D] text-[#22668D] hover:bg-[#FFCC70] rounded-lg hover:border-[#F5AC29]  hover:text-white ">OK</button>
                            </div>
                            
                        </div>   
                    </div>
                </div>
            </Form>
                    </div>
                </div>
            </div>
            </div>
        </div>
)

};

export default EditListModal;