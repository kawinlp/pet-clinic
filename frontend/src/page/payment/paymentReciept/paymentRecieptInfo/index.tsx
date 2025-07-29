import './../../payment.css';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../../../../component/navbar/Navbar";
import { ListServiceFromRecieptID } from "../../../../services/https/Payment";
import { ServiceInterface } from "../../../../interfaces/IService";
import logo from "../../../../assets/Logo.png";
function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigator]);

  
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('param') ?? '0';
  const SReciept_id = parseInt(id, 10)

  const [ListService, setService] = useState<ServiceInterface[]>([]);
  const [Bill, setBill] = useState({
    Totalprice: 0,
    Received: 0,
    Change: 0,
    PurchasedDate: "",
    Cashier: ""
  })

  const initialize = async () => {
    let res = await ListServiceFromRecieptID(SReciept_id);
    if (res) {
      const PurchasedDate = res[0].PurchasedDate ? new Date(res[0].PurchasedDate) : new Date();
      const PurchasedDateString = PurchasedDate.toISOString().split('T')[0];
      setService(res);
      setBill({
        ...Bill,
        Totalprice: res[0].ServiceReciept.TotalPrice,
        Received: res[0].ServiceReciept.Received,
        Change: res[0].ServiceReciept.Change,
        PurchasedDate: PurchasedDateString,
        Cashier: res[0].ServiceReciept.Employee.EmployeeID
      
      })
    }
  }

  const MapService = ListService.map((item) => {
    const DepositID = item.DepositID;
    const SpaID = item.SpaID;
    const TreatmentID = item.TreatmentID;
    let ServiceName = ""
    let ServicePrice = 0
    console.log(ListService)

    if (DepositID) {
      ServiceName = "Deposit";
      ServicePrice = (item.Deposit?.Price || 0)


    }

    else if (SpaID) {
      ServiceName = "Spa";
      ServicePrice = (item.Spa?.Price || 0);

    }

    else if (TreatmentID) {
      ServiceName = "Treatment";
      ServicePrice = (item.Treatment?.Totalprice || 0)

    }

    return (
      <>
        <div className="leftList">{ServiceName}</div>
        <div></div>
        <div className="rightList">{ServicePrice}</div>
      </>
    )
  })

  useEffect(() => {
    initialize();

  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="centralize">
        <div className="serviceReciept-Container">
          <div className="centralize">
            <div className="serviceReciept-logo-container">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <b>Pet Clinic</b>
          <label>123/4 หมู่ 5 ต. อ.ประโคนชัย จ.บุรีรัมย์ 31140</label>
          <label>โทร 0885576188</label>
          <label>เปิด 08.30-20.30 น.</label>
          <label>-------------------------------------------------------------------------</label>
          <b>ใบเสร็จค่าบริการ</b>
          <br />
          <div className="centralize">
            <div className="serviceTableList">
              <div className="leftList">NO: {SReciept_id}</div>
              <div className="midList">{Bill.PurchasedDate}</div>
              <div className="rightList">{Bill.Cashier}</div>
            </div>
          </div>
          <label>-------------------------------------------------------------------------</label>
          <div className="centralize">
            <div className="serviceTableList">
              {MapService}
            </div>
          </div>
          <label>-------------------------------------------------------------------------</label>
          <div className="centralize">
            <div className="serviceTableList">
              <div className="leftListB">Totalprice :</div>
              <div></div>
              <div className="rightListB">{Bill.Totalprice}</div>
            </div>
          </div>
          <label>-------------------------------------------------------------------------</label>
          <div className="centralize">
            <div className="serviceTableList">
              <div className="leftList">Received :</div>
              <div></div>
              <div className="rightList">{Bill.Received}</div>
            </div>
          </div>
          <div className="centralize">
            <div className="serviceTableList">
              <div className="leftList">Changed :</div>
              <div></div>
              <div className="rightList">{Bill.Change}</div>
            </div>
          </div>
          <label>-------------------------------------------------------------------------</label>
          <b>Thank You</b>
        </div>
      </div>
    </>

  );
}


export default Index;