package entity

import (
	"gorm.io/gorm"
	"time"
)

func SetupVeterinarian(database *gorm.DB) {

	//Humangender
	Male := HumanGender{Name: "Male"}
	database.Model(&HumanGender{}).Create(&Male)

	Female := HumanGender{Name: "Female"}
	database.Model(&HumanGender{}).Create(&Female)

	//Profession

	Surgeon := Profession{Name: "Surgeon"}
	database.Model(&Profession{}).Create(&Surgeon)

	Breeding := Profession{Name: "Breeding"}
	database.Model(&Profession{}).Create(&Breeding)

	//Specialties
	Anesthesiology := Specialties{Name: "Anesthesiology"}
	database.Model(&Specialties{}).Create(&Anesthesiology)

	Anatomic_pathology := Specialties{Name: "Anatomic pathology"}
	database.Model(&Specialties{}).Create(&Anatomic_pathology)

	//Veterinarian
	bangkok, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		panic(err)
	}
	dateToSet := time.Date(2000, time.January, 1, 0, 0, 0, 0, bangkok)
	HumanGenderID1 := uint(1)
	HumanGenderID2 := uint(2)
	ProfessionID1 := uint(1)
	ProfessionID2 := uint(2)
	SpecialtiesID1 := uint(1)
	SpecialtiesID2 := uint(2)
	EmployeeID1 := uint(1)
	EmployeeID2 := uint(2)

	V001 := Veterinarian{
		Name: "นสพ.สมชาย ยิ้มแย้ม",       
		Image: "https://www.prachachat.net/wp-content/uploads/2022/02/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A2%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B9%8C-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%83%E0%B8%88000-728x485.jpg",     
		Birthday: dateToSet,    
		License: "876543",     
		Tel: "0922974066",          
		Salary: 100000,    
		Working_Start: time.Now(),
		Last_Modified: time.Now(),
		HumanGenderID: HumanGenderID1,    
		ProfessionID: ProfessionID1,    
		SpecialtiesID: SpecialtiesID1,   
		EmployeeID: EmployeeID1, 
	}
	database.Model(&Veterinarian{}).Create(&V001)

	V002 := Veterinarian{
		Name: "นสพ.สมหญิง ยิ้มแย้ม",       
		Image:  "https://mpics.mgronline.com/pics/Images/565000008426001.JPEG",     
		Birthday: dateToSet,    
		License: "0123456",     
		Tel: "0987654321",          
		Salary:200000,    
		Working_Start: time.Now(),
		Last_Modified: time.Now(),
		HumanGenderID: HumanGenderID2,    
		ProfessionID: ProfessionID2,    
		SpecialtiesID: SpecialtiesID2,   
		EmployeeID: EmployeeID2, 
	}
	database.Model(&Veterinarian{}).Create(&V002)

}
