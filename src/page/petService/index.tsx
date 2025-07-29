import CardComponent from '../../component/card/cardHomePage';
import image from '../../assets/pet-covid.jpg'
import Navbar from '../../component/navbar/Navbar';
import { Card, Flex, Space, Statistic } from 'antd';
import { DollarCircleOutlined, StockOutlined } from '@ant-design/icons';
function Index() {
  return (
    <>
 
      <div className="flex min-h-screen items-center justify-center bg-cover bg-center flex-col"

        style={{
          backgroundImage: `url(${image})`,
        }}
      >

        <div style={{ position: "relative", bottom: "110px", display: "flex", width: "100%" }}>
          <Navbar />
        </div>

        <div className='bg-cover bg-center backdrop-blur-[1px] py-[10px] px-[180px]'>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <CardComponent
              title="Spa"
              imageSrc="https://dogsbestlife.com/wp-content/uploads/2022/04/spa-day-scaled.jpeg"
              description="บริการสปาสำหรับสัตว์ของเรา: ความผ่อนคลายและดูแลที่พิถีพิถันสำหรับเพื่อนที่รักของคุณ"
              linkTo='/displayspa'

            />
            <CardComponent
              title="Deposit"
              imageSrc="https://www.usnews.com/dims4/USNEWS/5129d0e/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fac%2F32%2Fc86e7a81446faacde23e4d401260%2Fgettyimages-1440370053.jpg"
              description="บริการรับฝากสัตว์เลี้ยงดูแลอย่างใส่ใจ ปลอดภัย และเต็มไปด้วยความรัก"
              linkTo='/displaydeposit'
            />
            <CardComponent
              title="Treatment"
              imageSrc="https://images.ctfassets.net/440y9b545yd9/1JgReOJIqdqgglyC9C84jI/9b81ef85461a669463a606315e5078be/treatment-options-for-pet-cancer.jpg"
              description="บริการรักษาสัตว์เลี้ยงด้วยความห่วงใย ความใส่ใจพิเศษ และความเอาใจใส่ทุกรายละเอียด"
              linkTo='/treatment'
            />
          </div>
        </div>
      </div>
    </>
  );
}

function DashboadCard({ title, value, icon }: any) {
  return (
    <Card
      style={{
        backgroundColor: 'white',
        border: 'gray',
        boxShadow: '0 10px 8px 0 rgba(0, 0, 0, 0.2)',
        paddingLeft: '20px',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <Space direction='horizontal' >
        <Statistic title={title} value={value + " THB"} style={{ marginRight: '170px' }} />
        {icon}
      </Space>
    </Card>

  );
}

export default Index;