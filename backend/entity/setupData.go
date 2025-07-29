package entity

import (
	"gorm.io/gorm"
	"time"
)

func SetupProductData(database *gorm.DB) {
	bangkok, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		panic(err)
	}
	dateToSet := time.Date(2000, time.January, 1, 0, 0, 0, 0, bangkok)

	t1 := ProductType{Name: "ของใช้ทั่วไป",}
	database.Model(&ProductType{}).Create(&t1)

	t2 := ProductType{Name: "ยาใช้ทาน",}
	database.Model(&ProductType{}).Create(&t2)

	t3 := ProductType{Name: "ยาใช้ภายนอก",}
	database.Model(&ProductType{}).Create(&t3)

	t4 := ProductType{Name: "วัคซีน",}
	database.Model(&ProductType{}).Create(&t4)

	t5 := ProductType{Name: "อาหาร",}
	database.Model(&ProductType{}).Create(&t5)

	t6 := ProductType{Name: "ขนมทานเล่น",}
	database.Model(&ProductType{}).Create(&t6)

	t7 := ProductType{Name: "ของเล่น",}
	database.Model(&ProductType{}).Create(&t7)

	item1 := Product{
		Name:    "ขนมแมวเลีย",
		Amount:  100,
		Price:   15,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		Expire: time.Now(),
		Comment: "อาหารเปียกสำหรับแมว",
		ProductTypeID: &t6.ID,
	}
	database.Model(&Product{}).Create(&item1)

	item2 := Product{
		Name:    "อาหารเม็ดแมว",
		Amount:  100,
		Price:   55,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t5.ID,
	}
	database.Model(&Product{}).Create(&item2)

	item3 := Product{
		Name:    "อาหารเม็ดสุนัข",
		Amount:  100,
		Price:   175,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t5.ID,
	}
	database.Model(&Product{}).Create(&item3)

	item4 := Product{
		Name:    "แชมพูอาบน้ำสุนัข",
		Amount:  100,
		Price:   70,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item4)

	item5 := Product{
		Name:    "แชมพูอาบน้ำแมว",
		Amount:  100,
		Price:   70,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item5)

	item6 := Product{
		Name:    "ทรายแมว",
		Amount:  100,
		Price:   200,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item6)

	item7 := Product{
		Name:    "กะบะทราย",
		Amount:  100,
		Price:   300,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item7)

	item8 := Product{
		Name:    "ลูกบอล",
		Amount:  100,
		Price:   30,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t7.ID,
	}
	database.Model(&Product{}).Create(&item8)

	item9 := Product{
		Name:    "ปลอกคอสุนัข",
		Amount:  100,
		Price:   125,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item9)

	item10 := Product{
		Name:    "ปลอกคอแมว",
		Amount:  100,
		Price:   110,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t1.ID,
	}
	database.Model(&Product{}).Create(&item10)

	item11 := Product{
		Name:    "ไม้ตกแมว ขนาดเล็ก",
		Amount:  100,
		Price:   50,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t7.ID,
	}
	database.Model(&Product{}).Create(&item11)

	item12 := Product{
		Name:    "ไม้ตกแมว ขนาดกลาง",
		Amount:  100,
		Price:   50,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t7.ID,
	}
	database.Model(&Product{}).Create(&item12)

	m1 := Product{
		Name:    "ยาแก้ปวด",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&m1)

	m2 := Product{
		Name:    "ยาลดไข้",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&m2)

	m3 := Product{
		Name:    "วิตามิน",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
	}
	database.Model(&Product{}).Create(&m3)

	m4 := Product{
		Name:    "ยาแก้คัน",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&m4)

	m5 := Product{
		Name:    "ยาแก้แพ้",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&m5)

	m6 := Product{
		Name:    "ยาฆ่าเชื้อ",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t2.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&m6)

	m7 := Product{
		Name:    "สเปรย์นาโน",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t3.ID,
		Comment: "พ่นบริเวณรอบๆแผล",
	}
	database.Model(&Product{}).Create(&m7)

	m8 := Product{
		Name:    "ยาทาแก้คัน",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t3.ID,
	}
	database.Model(&Product{}).Create(&m8)

	v1 := Product{
		Name:    "วัคซีนคุมกำเนิด",
		Amount:  100,
		Price:   25,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t4.ID,
	}
	database.Model(&Product{}).Create(&v1)

	v2 := Product{
		Name:    "วัคซีนไข้หัด",
		Amount:  100,
		Price:   64,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t4.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&v2)

	v3 := Product{
		Name:    "วัคซีนพิษสุนัขบ้า",
		Amount:  100,
		Price:   63,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t4.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&v3)
	 
	v4 := Product{
		Name:    "วัคซีนป้องกันเห็บ หมัด",
		Amount:  100,
		Price:   56,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t4.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&v4)

	v5 := Product{
		Name:    "วัตซีนพยาธิหนอนหัวใจ",
		Amount:  100,
		Price:   50,
		Date:    time.Now(),
		Lotwhat: dateToSet,
		ProductTypeID: &t4.ID,
		Comment: "ห้ามขาย แพทย์ต้องเป็นคนสั่ง",
	}
	database.Model(&Product{}).Create(&v5)
}