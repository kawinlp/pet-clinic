import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from "./component/navbar/Navbar";
import CustomFooter from "./component/footer/CustomFooter";

import Spa from './page/spa/spa';
import DisplaySpa from './page/spa/displayspa';
import IdentifySpa from './page/spa/identify';

import Veterinarian from "./page/veterinarian";
import VeterinarianCreate from "./page/veterinarian/veterinarianCreate";
import VeterinarianDetails from "./page/veterinarian/veterinarianDetails";

import Deposit from "./page/deposit/deposit";
import DisplayDeposit from "./page/deposit/displaydeposit";
import IdentifyDeposit from "./page/deposit/identify";


import Payment from "./page/payment";
import PaymentReciept from "./page/payment/paymentReciept";
import PaymentRecieptInfo from "./page/payment/paymentReciept/paymentRecieptInfo";

import SellingProduct from "./page/sellingProduct";

import Treatment from "./page/treatment";


import Member from "./page/member";

import MemberCreate from "./page/member/memberCreate"

import MemberUpdate from "./page/member/editMember"

import PetService from "./page/petService";

import ListProduct from "./page/ListProduct";

import PetUpdate from "./page/pet/edit"

import Pet from './page/pet';

import PetById from './page/member/PetByMember';

import Reciept from './page/reciept';

import Login from './page/Login';


import RegisterEmployee from './page/Login/register';

import RecieptProduct from './page/reciept/RecieptProduct';

import RecieptProductByID from './page/reciept/RecieptByID';
import Appointment from "./page/appointment";

import AppointmentCreate from './page/appointment/appointmentCreate';

import AppointmentUpdate from './page/appointment/appointmentEdit';

import TreatmentUpdate from './page/treatment/treatmentEdit';

import TreatmentHis from './page/treatment/treatmentHistory';

import TreatmentLog from './page/treatment/treatmentByPet';
import FirstPage from './page/firstpage';

function App() {

  return (
    <Router>
      <div className="App"></div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/petservice" element={<PetService />} />
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/services" element={<PetService />} />
        <Route path="/infomation" element={<FirstPage />} />
        <Route path="/veterinarian" element={<Veterinarian />} />
        <Route path="/veterinarian/veterinarianCreate" element={<VeterinarianCreate />} />
        <Route path="/veterinarian/veterinarianDetails" element={<VeterinarianDetails />} />
        <Route path="/listProduct/sellingProduct/reciept" element={<Reciept/>}/>
        <Route path="/reciepts" element={<RecieptProduct/>}/>
        <Route path="/reciepts/:id" element={<RecieptProductByID/>}/>
        <Route path="/spa" element={<Spa />} />
        <Route path="/displayspa" element={<DisplaySpa />} />
        <Route path="/identifySpa" element={<IdentifySpa />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/displaydeposit" element={<DisplayDeposit />} />
        <Route path="/identifydeposit" element={<IdentifyDeposit />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/paymentReciept/" element={<PaymentReciept />} />
        <Route path="/payment/paymentReciept/paymentRecieptInfo" element={<PaymentRecieptInfo />} />
        <Route path="/listProduct/sellingProduct" element={<SellingProduct />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/pets" element={<Pet />} />
        <Route path="/petByMember/:id" element={<PetById />} />
        <Route path="/pet/edit/:id" element={<PetUpdate />} />
        <Route path="/members" element={<Member />} />
        <Route path="/member/memberCreate" element={<MemberCreate />} />
        <Route path="/member/edit/:id" element={<MemberUpdate />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/appointmentCreate" element={<AppointmentCreate />} />
        <Route path="/appointment/edit/:id" element={<AppointmentUpdate />} />
        <Route path="/treatment/edit/:id" element={<TreatmentUpdate/>} />
        <Route path="/treatment/history/" element={<TreatmentHis />} />
        <Route path="/treatmentByPet/:id" element={<TreatmentLog />} />
      </Routes>
      <br />
      
    </Router>


  );
}

export default App;
