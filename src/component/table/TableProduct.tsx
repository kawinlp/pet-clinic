import React,{ useState,useEffect,useRef} from "react";
import { CreateList,GetUnits} from "../../services/https/sellingproduct";
import { ProductInterface} from "../../interfaces/IProduct";
import {Typography} from "@material-tailwind/react";
import ModalProduct from "../modal/ModalProduct";
import SelectUnit from "../select/SelectUnit";
import { ListInterface,UnitListInterface} from "../../interfaces/IList";
import { PlusIcon,MagnifyingGlassIcon,NoSymbolIcon} from "@heroicons/react/24/outline";
import { message,Empty } from "antd";
import moment from "moment";
import { EmployeeInterface } from "../../interfaces/IEmployee";
import { GetEmployeeById } from "../../services/https/login";


interface TableProductProps {
    products: ProductInterface[];
    length:Number;
      }   
const TABLE_HEAD =["รหัสสินค้า","ชื่อสินค้า","ประเภท","รายละเอียด","ราคา","",""];

const TableProduct: React.FC<TableProductProps> = ({ products,length}) => {
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      useEffect(() => {
        setList((prevList) => ({
          ...prevList,
          Date: new Date(getCurrentDate()),
        }));
      }, []);

    const [messageApi, contextHolder] = message.useMessage();
    const [list, setList] = useState({
        Amount:0,
        Totalprice:0.0,
        Date: new Date(getCurrentDate()),
        ProductID: 0,
        UnitListID:0,
    });

    const handleSelectUnit = (selectedUnit: number) => {
        const unitID = selectedUnit;
        console.log(unitID)
        if (!isNaN(unitID)) {
            setList({ ...list, UnitListID: unitID });
        }
    }

    const handleInput = (e: any) => {
        if(e.target.name === "Amount"){
            const amount = parseInt(e.target.value, 10);
            const totalPrice = amount * total;
            setList({ ...list, [e.target.name]: amount, Totalprice: totalPrice })
            }
        else{
            setList({ ...list, [e.target.name]: e.target.value });
        }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sentData(list);
    };

    const EmployeeID = localStorage.getItem('EmployeeID')
    const [employee,setEmployee] = useState<EmployeeInterface>()
    const getEmployee = async () => {
        let res = await GetEmployeeById(Number(EmployeeID));
        if(res) {setEmployee(res);}}

    useEffect(()=>{
        getEmployee();
          },[]);

    const sentData = async (values: ListInterface) => {
        values.Amount = list.Amount
        values.Totalprice=list.Totalprice
        values.Date=new Date(list.Date)
        values.ProductID=list.ProductID
        values.UnitListID=list.UnitListID
        values.EmployeeID = Number(EmployeeID)
        let res = await CreateList(values);
        
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "เพิ่มรายการสำเร็จ",
                duration:9
              });
            setTimeout(() => {
                window.location.reload();
            }, 9000);
        } else {
            if(res.message==="Unit is required"){
                messageApi.open({
                    type: "error",
                    content: "กรุณาใส่หน่วย",
                    duration:9
                });
            }
            else if(res.message==="Amount is required;TotalPrice is required"){
                messageApi.open({
                    type: "error",
                    content: "กรุณาใส่จำนวน",
                    duration:8
                });
            }
            else if(res.message ==="Unit is required;กรุณากรอกจำนวนเต็มบวก;ราคาควรเป็นจำนวนเต็มบวก" || res.message==="Amount is required;TotalPrice is required;Unit is required"){
                messageApi.open({
                    type: "error",
                    content: "กรุณาใส่ข้อมูลให้ถูกต้อง",
                    duration:8
                });
            }
            else{
                messageApi.open({
                    type: "error",
                    content: res.message,
                    duration:8
                });
        }
        }
    };

    
    //search
    const [query,setQuery] = useState("");
    const filteredProducts = products.filter((product) =>
    Object.values(product).some((Name) =>
      product.Name && product.Name.toLowerCase().includes(query.toLowerCase())
      || product.ProductType?.Name&& product.ProductType.Name.toLowerCase().includes(query.toLowerCase())
      || product.ID&&product.ID.toString().includes(query.toLowerCase())
    ) 
  );
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface|undefined>();
  const [total,setTotal] = useState<number>(0.0)
  
  const toggleModal = (product: ProductInterface) => {
    setSelectedProduct(product);
    setList({...list,ProductID: product.ID !== undefined ? product.ID : 0 });
    setTotal(product.Price||0);
    setModal(!modal);
  };

  const sizes = ['w-[11%]', 'w-[17%]', 'w-[12%]','w-[29%]','w-[13%]','w-[5%]'];
    return(
        <div className=" w-full relative " >
            {contextHolder}
            <table className="w-full table-fixed text-center" >
                <thead className="sticky top-0 bg-[#8ECDDD] z-50">
                    <tr className="text-white">
                        {TABLE_HEAD.map((head,index)=>(
                            <th key={index === TABLE_HEAD.length - 1 ? null : head} className={` p-4 ${sizes[index]} sticky`} data-priority="1">
                                <Typography placeholder={""}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    <tr className="bg-[#C6E3DC]">
                        <td colSpan={TABLE_HEAD.length} className="p-0 -mt-4 border-b border-[#22668D]">
                            <div className="w-96 flex justify-center m-1">
                                <div className="relative w-full">
                                    <input type="text" className="w-full text-sm backdrop-blur-sm  py-1 pl-10 pr-4 rounded-sm focus:outline-none border-2 border-gray-200 focus:border-[#22668D] transition-colors duration-300" 
                                        placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="text-[#22668D] w-5 h-5 text-gray-800 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>

                
                <tbody className="overflow-y-auto  w-full ">
                {filteredProducts.length ===0?(
                    <div className="flex justify-center top-72 items-center absolute w-[100%] h-[100%]">
                        <div className="w-40 "><Empty description={false}>can not find item</Empty></div>
                    </div>
                ):(
                    <>
                    {filteredProducts.map((products,index)=>{
                        const isLast = index === length;
                        const classes = isLast
                          ? "p-1"
                           : "p-1";//bg-[#FFFADD] border-b border-[#C6E3DC]
                        return(
                            
                            <tr key={products.ID} className=" border-b border-[#C6E3DC] hover:bg-[#C6E3DC] h-5 flex w-[909%] h-[5%] justify-center items-center">
                                <td className={`${classes} w-[11%]`}>
                                    <div className="text-center">
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold">
                                            {products.ID}
                                    </Typography>
                                    </div>
                                </td>
                                <td className={`${classes} w-[18%] text-left`}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {products.Name}
                                    </Typography>
                                </td>
                                <td className={`${classes} w-[13%] text-left`}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                     {products.ProductType?.Name}
                                        
                                    </Typography>
                                </td>
                                <td className={`${classes} w-[30%] text-left`}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {products.Comment}
                                    </Typography>
                                </td>
                                <td className={`${classes} w-[10%]`}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        
                                        {products.Price}.00
                                    </Typography>
                                </td>
                                <td className={`${classes} w-[5%]`}>
                                    <button className="p-1 bg-[#FFCC70] rounded-[5px] border border-black hover:bg-[#22668D] focus:bg-[#22668D]"
                                        onClick={() => toggleModal(products)}>
                                        <PlusIcon className="w-5 h-4 text-white"/>
                                    </button>
                                    
                                </td>
                                <td className={`${classes} w-[15%]`}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        เหลือ : {products.Amount}
                                    </Typography>
                                </td>
                            </tr>
                        )
                    })} </>
                    )}
                </tbody>
            </table>

            {(selectedProduct && selectedProduct.Comment !== "ห้ามขาย แพทย์ต้องเป็นคนสั่ง") ?(
        <ModalProduct title={"เพิ่มสินค้า"} isopen={modal} onClose={() => setModal(false)}>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2 px-5 ">
                    <div className="flex-1 flex-col space-y-4 divide-y-4 divide-[#22668D] overflow-auto pb-2">
                         <div className="space-y-3 text-md">  
                            <div className="flex justify-between text-[#22668D]" > 
                                <div className="w-20">
                                    <label className="">รหัสสินค้า : </label>
                                    <input readOnly value={selectedProduct.ID} className="text-center bg-white border border-[#22668D] sm:text-md rounded-lg  block w-full p-1 focus:outline-none"/> 
                                </div>
                                <div className="w-80">
                                    <p>ชื่อสินค้า : </p>
                                    <input readOnly value={selectedProduct.Name} className="bg-white sm:text-md rounded-lg  block w-full p-1 px-3 focus:outline-none border border-[#22668D]"/> 
                                </div>
                                <div className="w-20">
                                    <p>ราคา : </p>
                                    <input readOnly value={selectedProduct.Price?.toFixed(2)} className="bg-white sm:text-md text-center rounded-lg  block w-full p-1 px-3 focus:outline-none border border-[#22668D]"/> 
                                </div>
                            </div>
                            <div className="text-[#22668D] flex flex-col items-start">
                                <label >รายละเอียด : </label>
                                <textarea readOnly value={selectedProduct.Comment} className="bg-white border border-[#22668D] sm:text-md rounded-lg  block w-full p-1 px-3 resize-none min-h-16 focus:outline-none"/>
                            </div>
                            <div className="flex gap-4 justify-between text-[#22668D]">
                                 <div className="flex flex-col items-start"><label> หน่วย :</label>
                                <SelectUnit onSelectUnit={handleSelectUnit} />
                                </div>
                                <div className="flex flex-col items-start">
                                <label>จำนวน :</label>
                                <input  name="Amount" placeholder="input number" onChange={handleInput} 
                                    className="bg-white border border-[#22668D] text-black sm:text-md rounded-lg  block w-full p-1 px-3 focus:outline-none hover:border-[#FFCC70] focus:border-[#FFCC70] focus:shadow-sm focus:shadow-[#FFFADD]"/>
                            </div >
                                
                            </div>
                             
                            <div className=" flex justify-between text-center text-4xl px-2 text-[#22668D]"> 
                                <label>Total: </label>
                                <label> {list.Totalprice <= 0 || Number.isNaN(list.Totalprice)? '- ฿' : `${list.Totalprice.toLocaleString()}.00 ฿`}</label>
                            </div>
                        </div> 
                        
                        <div className="space-y-4 text-[#22668D]">
                            <div className="mt-5 flex justify-between h-8">
                                <input type="text" readOnly placeholder="Employee" value= {employee?.EmployeeID} className="bg-white focus:outline-none border w-64 px-3 rounded-lg border border-[#22668D]"></input>
                                <input type="date" name="Date" required
                                    onChange={handleInput} value={moment(list.Date).format('YYYY-MM-DD')}className=" bg-white focus:outline-none border w-40 rounded-lg text-black border px-3 border-[#22668D] hover:border-[#FFCC70] focus:border-[#FFCC70] focus:shadow-sm focus:shadow-[#FFFADD]"></input></div>
                            <div className="flex gap-20 justify-center text-2xl">
                                <button type="button" onClick={() => setModal(false)} data-ripple-light="true"
                                className="ml-5 flex-1 text-[#22668D] border border-[#22668D] bg-[#8ECDDD] hover:bg-[#FFCC70] rounded-lg hover:border-[#F5AC29]  hover:text-white"
                                data-ripple-dark="true">CANCLE</button>
                                <button type="submit" className="mr-5  flex-1 border h-14 border-[#22668D] bg-[#8ECDDD] text-[#22668D] hover:bg-[#FFCC70] rounded-lg hover:border-[#F5AC29]  hover:text-white">OK</button>
                            </div>
                            
                        </div>   
                    </div>
                </div>
            </form>
          
        </ModalProduct>
      ):<ModalProduct title={"เพิ่มสินค้า"} isopen={modal} onClose={() => setModal(false)}>
            <div className="flex justify-center  items-center h-60">
                <div className="w-46 ">
                    <Empty description={false} className="text-[#22668D]">
                        <div className="text-lg">
                            "{selectedProduct?.Name}"
                        </div>
                        <span>ไม่ได้รับอนุญาตให้ขาย</span></Empty>
                </div>
            </div>
        </ModalProduct>}
        </div>

        
    )
    

}
export default TableProduct
