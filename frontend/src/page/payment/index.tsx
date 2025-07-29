import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ServiceInterface } from "../../interfaces/IService";
import { ServiceRecieptInterface } from "../../interfaces/IServiceReciept";
import { useState, useEffect } from "react";
import ServiceRow from "../../component/row/ServiceRow";
import './payment.css';
import logo from "../../assets/Logo.png";
import { CreateServiceReciept, GetNonPurchaseServiceFromMemberID } from "../../services/https/Payment";
import Navbar from "../../component/navbar/Navbar2";

function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigator]);

  const EmployeeID = localStorage.getItem('EmployeeID') ?? '0'
  const Employee_ID = parseInt(EmployeeID)

  const [messageApi, contextHolder] = message.useMessage();
  const [ListService, setService] = useState<ServiceInterface[]>([]);
  const [MemberID, setMemberID] = useState(0)
  const [Money, setMoney] = useState({
    Received: 0,
    Change: 0
  })

  let TotalPrice = 0

  const handleReceivedInput = (e: any) => {
    const newReceived = parseFloat(e.target.value);
    setMoney((prevMoney) => {
      const newChange = newReceived - TotalPrice;
      return { ...prevMoney, Received: newReceived, Change: newChange };
    });
  };

  const handleMemberSearch = async (e: any) => {
    const inputValue = e.target.value;
    const value = parseInt(inputValue || 0);
    setMemberID(value);
  };

  const MapServices = ListService.map((item) => {
    const DepositID = item.DepositID;
    const SpaID = item.SpaID;
    const TreatmentID = item.TreatmentID;

    let ServiceName = "";
    let ServiceDate = new Date();
    let ServicePrice = 0;
    let PetName = "";

    if (DepositID) {
      ServiceName = "Deposit"
      TotalPrice = TotalPrice + (item.Deposit?.Price || 0);
      ServicePrice = (item.Deposit?.Price || 0)
      ServiceDate = item.Deposit?.Checkin ? new Date(item.Deposit?.Checkin) : new Date();
      PetName = item.Deposit?.Pet?.Name || "";
    }

    else if (SpaID) {
      ServiceName = "Spa"
      TotalPrice = TotalPrice + (item.Spa?.Price || 0);
      ServicePrice = (item.Spa?.Price || 0);
      ServiceDate = item.Spa?.ServiceDay ? new Date(item.Spa?.ServiceDay) : new Date();
      PetName = item.Spa?.Pet?.Name || "";
    }

    else if (TreatmentID) {
      ServiceName = "Treatment";
      TotalPrice = TotalPrice + (item.Treatment?.Totalprice || 0);
      ServicePrice = (item.Treatment?.Totalprice || 0)
      ServiceDate = item.Treatment?.Totalprice ? new Date(item.Treatment?.Totalprice) : new Date();
      PetName = item.Treatment?.Pet?.Name || "";
    }

    return (
      <ServiceRow
        ServiceName={ServiceName}
        ServiceDate={ServiceDate}
        ServicePrice={ServicePrice}
        PetName={PetName}
      />
    )
  })

  const searchMemberServices = async () => {
    TotalPrice = 0;
    let res = await GetNonPurchaseServiceFromMemberID(MemberID);
    const notFoundElement = document.getElementById("notFound") as HTMLInputElement | null;
    if (res) {
      if(res.length === 0){
        if (notFoundElement) {
          notFoundElement.style.display = "flex";
        }
      }
      else{
        if (notFoundElement) {
          notFoundElement.style.display = "none";
        }
      }
      setService(res);
      
    }
    setMoney({ ...Money, Received: 0 });
    
  }

  const handleCancelClick = () => {
    window.location.reload();
  };

  const handleConfirmPay = () => {
    sentServiceRecieptData(Money);
  };

  const sentServiceRecieptData = async (values: ServiceRecieptInterface) => {
    values.TotalPrice = TotalPrice;
    values.Received = Money.Received;
    values.Change = Money.Change;
    values.PurchasedDate = new Date();
    values.EmployeeID = Employee_ID;
    console.log(values);
    let res = await CreateServiceReciept(values, MemberID);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "ชำระค่าบริการสำเร็จ",
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);

    } else {
      messageApi.open({
        type: "error",
        content: "ชำระค่าบริการไม่สำเร็จ",
      });
    }
  };

  useEffect(() => {
    setMoney({ ...Money, Change: Money.Received - TotalPrice });
    const ReceivedElement = document.getElementById("ReceivedInput") as HTMLInputElement | null;
    if (ReceivedElement) {
      ReceivedElement.value = "0";
    }
  }, [ListService]);

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="centralize">
        <div className="grid-container2-4-1-3Col">
          <div className="grid-item-pagetitle">
            <h3>ชำระค่าบริการ</h3>
          </div>
          <div></div>
          <div className="recieptCheckButton">
            <Link to="/payment/paymentReciept">
              <button>ตรวจสอบใบเสร็จ</button>
            </Link>
          </div>
          <div className="searchMemberTab">
            <div className="grid-container3-5-2Col">
              <div className="searchMemberLabel">
                <h3>ค้นหาสมาชิก</h3>
              </div>
              <div className="searchMemberElement">
                <input type="text" name="MemberID" placeholder="  พิมพ์หมายเลขสมาชิก ..." onChange={handleMemberSearch} />
              </div>
              <div className="searchMemberElement">
                <button onClick={() => searchMemberServices()}>ค้นหา</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="centralize">
        <div className="grid-container4-1Col">
          <div className="serviceTableContainer">
            <div className="serviceTable">
              <div className="serviceTableHeader">
                <b className="labelT1">ประเภทของบริการ</b>
                <b>สัตว์เลี้ยงที่เข้ารับบริการ</b>
                <b>วันที่เข้ารับบริการ</b>
                <b className="labelT2">ค่าบริการ (บาท)</b>
              </div>
              <div className="serviceTableContent">
                <div className="serviceRowContainer">
                  <div className="notFound" id="notFound">
                      <div className="notFoundMessage">
                        <label>ไม่พบบริการที่ค้างชำระ</label>
                      </div>
                  </div>
                  {MapServices}
                </div>
              </div>
            </div>
          </div>

          <div className="paymentContainer">
            <div className="centralize">
              <div className="logoContainer">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div className="priceLabel">
              <div className="grid-container2-2-1Col">
                <label>TotalPrice: </label>
                <label>{TotalPrice}</label>
                <label>Baht</label>
              </div>
            </div>

            <div className="priceLabel">
              <div className="grid-container2-2-1Col">
                <label>Received: </label>
                <input type="text" id="ReceivedInput" name="Received" placeholder=" 99.99" required onChange={handleReceivedInput} />
                <label>Baht</label>
              </div>
            </div>

            <div className="priceLabel">
              <div className="grid-container2-2-1Col">
                <label>Change: </label>
                {isNaN(Money.Change) ? (
                  <label>-</label>
                ) : (
                  <>
                    {Money.Change < 0 ? (
                      <label>-</label>
                    ) : (
                      <label>{Money.Change}</label>
                    )}
                    <label>Baht</label>
                  </>
                )}
              </div>
            </div>
            <br />
            <div className="buttonBar">
              <div className="payButtonContainer">
                <button className="payCancleButton" onClick={handleCancelClick}>ยกเลิก</button>
                <button className="payConfirmButton" onClick={handleConfirmPay}>ยืนยัน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;