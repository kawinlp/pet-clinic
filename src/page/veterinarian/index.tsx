import './veterinarian.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import VeterCard from "../../component/card/VeterinarianCard";
import { VeterinarianInterface } from '../../interfaces/IVeterinarian';
import { GetVeterinarianList } from "../../services/https/Veterinarian";
import { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import Navbar from "../../component/navbar/Navbar2";


function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigator]);
  
  const EmployeeID = localStorage.getItem('EmployeeID')
  const [ListVeterinarian, setVeterinarian] = useState<VeterinarianInterface[]>([]);

  const getVeterinarian = async () => {
    let res = await GetVeterinarianList();
    if (res) {
      setVeterinarian(res);
    }
  }

  const MapVeterinarian = ListVeterinarian.map((item) => {
    return (
      <VeterCard
        Name={item.Name}
        Image={item.Image}
        ID={item.ID}
      />
    )
  })

  useEffect(() => {
    getVeterinarian();
  }, []);

  return (
    <>
      <Navbar />
      <div className="centralize">
        <div className="grid-container2-6-1Col">
          <div className="grid-item-pagetitle">
            <h3>ข้อมูลสัตวแพทย์</h3>
          </div>
          <div></div>
          <div className="createButtonBox">
            <Link to="./veterinarianCreate">
              <button><PlusCircleOutlined />  เพิ่มสัตวแพทย์ </button>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <div className="centralize">
        <div className="vetCard-container">
          <div className="centralize">
            <div className="vetCardTitle-container">
              <div className="vetCardTitle">
                <div className="vetCardSubTitle">
                  <b>รายชื่อสัตวแพทย์</b>
                </div>
              </div>
            </div>

          </div>

          <div className="centralize">
            <div className="vetCardList-container">
              <div className="grid-container1-1-1-1Col">
                {MapVeterinarian}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;