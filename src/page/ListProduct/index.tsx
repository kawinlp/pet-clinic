import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar/Navbar2";
import TableProduct from "../../component/table/TableProduct";
import { ProductInterface, } from "../../interfaces/IProduct";
import { PayfinishInterface } from "../../interfaces/IList";
import { GetProducts, GetLists, GetListsLatest } from "../../services/https/sellingproduct";
import TableList from "../../component/table/TableList";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { EmployeeInterface } from "../../interfaces/IEmployee";
import { GetEmployeeById } from "../../services/https/login";
function ListProduct() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigator]);
    // const EmployeeID = Cookies.get('EmployeeID');
    const EmployeeID = localStorage.getItem('EmployeeID')
    const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());
    const [List, setList] = useState<PayfinishInterface[]>([]);

    const [Products, setProducts] = useState<ProductInterface[]>([]);
    const [Total, setTotal] = useState<number>(0);
    const length = Products.length - 1;
    const getProducts = async () => {
        let res = await GetProducts();
        if (res) { setProducts(res); }
    }
    //employee    
    const [employee, setEmployee] = useState<EmployeeInterface>()
    const getEmployee = async () => {
        let res = await GetEmployeeById(Number(EmployeeID));
        if (res) { setEmployee(res); }
    }
    const getList = async() => {
        let res = await GetLists(Number(EmployeeID));
        if(res){
            console.log(res)
            setList(res);
            const totalSum = res.reduce((accumulator: number, currentItem: { List: { Totalprice?: number } }) => {
                const itemTotalprice = currentItem.List?.Totalprice || 0;
                return accumulator + itemTotalprice;
            }, 0);

            setTotal(totalSum);
        }
    }

    const [latest, setLatest] = useState<PayfinishInterface>()
    const getLatest = async() => {
        let res = await GetListsLatest(Number(EmployeeID));
        if(res) { console.log(res);setLatest(res);}
    }//Totalprice

    useEffect(() => {
        getProducts();
        getList();
        getLatest();
        getEmployee()
    }, []);
//  <div style={{zIndex:"100px",position:"relative",minHeight:"150px",top:"30px"}}>
    return (
        <>
        <header className="pb-2">
            <Navbar/>
         </header>

        <div className="bg-[#FFFADD] ">
            <section className=" m-2 mt-5 p-2 border border-black rounded-md h-screen ">
                <div className="mt-[-22px] ml-6 bg-[#FFFADD] w-[130px] text-center">
                <span className="text-md font-semibold">เพิ่มรายการสินค้า</span>
                </div>
                <div className="flex flex-row p-3 gap-5 h-full pb-4">
                    
                    <div className=" w-2/3 flex grid grid-cols-1 grid-rows-1 h-full">
                        <div className="flex-1 h-full overflow-y-auto border border-[#22668D] ">
                            <TableProduct products={Products} length={length} />
                        </div>
                        <div className=" bg-[#8ECDDD] w-full h-full border-b border-x border-[#22668D] flex  p-[6px] justify-between ">
                            <div className="flex gap-1 pl-20">
                                <span>รหัสพนักงาน :</span>
                                <input readOnly value={employee?.EmployeeID}  className="pl-3 w-60 border border-[#22668D] bg-[#FFFADD] focus:outline-none"/></div>
                            <div className="flex justify center gap-1 pr-20">
                                <span>วันที่ :</span>
                                <input type="date" className=" px-3 border border-[#22668D] bg-[#FFFADD] w-40 focus:outline-none" readOnly
                                    value={currentDate}
                                    onChange={handleDateChange}/>
                            </div>
                            
                        </div>
                     </div>{/*grid-cols-1 grid-rows-1 */}
                    <div className="w-1/3 mb-5 flex flex-col gap-2 justify-between h-full grid-cols-1 grid-rows-1 grid">
                        <div className="bg-[#22668D] rounded-md flex flex-col justify-center h-full w-full p-2 px-5  text-white ">
                            <div className="flex justify-between w-full h-36 ">
                                <span className="text-4xl">Total :</span>
                                <h5 className="text-4xl font-semibold">{Total === 0 ? '-' : `${Total.toLocaleString()}.00 ฿`}</h5>
                            </div>
                            <div className="w-full h-20">latest : {latest?.List?.Product?.Name === undefined? '-':`${latest?.List?.Product?.Name}`}</div>
                            <div className="w-full h-20">amount : {latest?.List?.Amount === undefined?'-':`${latest.List?.Amount}`} {latest?.List?.UnitList?.Name}</div>
                            <div className="w-full h-20">price  : {latest?.List?.Totalprice === undefined?'-':`${latest.List?.Totalprice.toLocaleString()}.00`} ฿</div>
                        </div>

                        <div className="bg-[#8ECDDD] p-2 w-full flex flex-col rounded-md ">
                            <span className="text-md relative">รายการสินค้า</span>
                            <div className="bg-[#FFFADD] text-sm w-full h-96 relative mb-1 overflow-y-auto border border-[#22668D] shadow-md shadow-[#448DB7]">
                                <TableList lists={List}></TableList>
                            </div>
                    </div>
                        <div className="relative m-0 w-full h-full">
                            <Link to="./SellingProduct"><button className="transition-all border text-2xl text-[#22668D] border-[#22668D] 
                                 rounded-md hover:shadow-md hover:bg-[#FFCC70] hover:shadow-black-500 
                                 hover:text-white hover:border-[#F5AC29] w-full h-12">PAYMENT</button></Link>
                        </div>
                            
                            {/* <div className="bg-[#8ECDDD] p-2 mb-1 top-[46%] flex rounded-md absolute h-[68%] w-[31.5%]">
                                <span className="text-md  absolute">รายการสินค้า</span>
                                <div className="bg-[#FFFADD] w-full h-[94%] overflow-y-auto relative top-6 mt-1 border border-[#22668D] shadow-md shadow-[#448DB7]">
                                    <TableList lists={List} ></TableList>
                                </div>
                            </div> */}
                            
                            {/* <div className="bg-[#8ECDDD] flex p-2 rounded-md w-full  relative">
                                <span className="text-md relative top-0 left-0 mt-1 ml-2">รายการสินค้า</span>
                                <div className="bg-[#FFFADD] w-full h-96 overflow-y-auto border border-[#22668D] shadow-md shadow-[#448DB7]">
                                    <TableList lists={List}></TableList>
                                </div>
                            </div> */}
                            
                            
                    </div>
                    
                </div>
            </section>
        </div>

        </>
    )

    function getCurrentDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงใน input
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCurrentDate(e.target.value);
    }
}
export default ListProduct

