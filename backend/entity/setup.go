package entity

import (
	"fmt"
	"strconv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}


func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Team04.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Employee{},//
		&Member{},//
		&PetType{},//
		&PetGender{},//
		&Pet{},//
		&HumanGender{},//
		&Profession{},//
		&Specialties{},//
		&Veterinarian{},//
		&Appointment{},//
		&ProductType{},//
		&Product{},//
		&CaseT{},//
		&Treatment{},//
		&Productused{},//
		&UnitList{},//
		&List{},//
		&Reciept{},//
		&Payfinished{},//
		&Deposit{},//
		&SpaType{},//
		&Spa{},//
		&Service{},//
		&ServiceReciept{},//
		
	)

	db = database

	SetupProductData(db)
	setupPetTypes(db)
	setupPetGenders(db)
	setupMembers(db)
	setupPets(db)
	SetupVeterinarian(db)

	u1 := UnitList{Name: "ชิ้น",}
	database.Model(&UnitList{}).Create(&u1)
	u2 := UnitList{Name: "ถุง",}
	database.Model(&UnitList{}).Create(&u2)
	u3 := UnitList{Name: "ขวด",}
	database.Model(&UnitList{}).Create(&u3)
	u4 := UnitList{Name: "โดส",}
	database.Model(&UnitList{}).Create(&u4)
	u5:= UnitList{Name: "กระป๋อง",}
	database.Model(&UnitList{}).Create(&u5)
	u6:= UnitList{Name: "ซอง",}
	database.Model(&UnitList{}).Create(&u6)
	u7:= UnitList{Name: "ไม้",}
	database.Model(&UnitList{}).Create(&u7)

	//CaseT
	Normal := CaseT{Name: "ปกติ",}
	database.Model(&CaseT{}).Create(&Normal)
	
	Emergency := CaseT{Name: "รุนแรง",}
	database.Model(&CaseT{}).Create(&Emergency)

	SetupVeterinarian(db)

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14);
	passwordau, err := bcrypt.GenerateFromPassword([]byte("admin000"), 14);
	e0:= Employee{
		EmployeeID: "E000",
		FirstName: "Admin",
		LastName: "Sorm",
		Telephone: "0888888888",
		Password: string(passwordau),
	}
	database.Model(&Employee{}).Create(&e0)
	e:= Employee{
		EmployeeID: "E001",
		FirstName: "Kanyawat",
		LastName: "Sorm",
		Telephone: "0888888888",
		Password: string(password),
	}
	database.Model(&Employee{}).Create(&e)
	e1:= Employee{
		EmployeeID: "E002",
		FirstName: "Saran",
		LastName: "Tha",
		Telephone: "0222222222",
		Password: string(password),
	}
	database.Model(&Employee{}).Create(&e1)
	e2:= Employee{
		EmployeeID: "E003",
		FirstName: "Pattamaporn",
		LastName: "Kong",
		Telephone: "0333333333",
		Password: string(password),
	}
	database.Model(&Employee{}).Create(&e2)

	e3:= Employee{
		EmployeeID: "E004",
		FirstName: "Thanasit",
		LastName: "Sa",
		Telephone: "0222222222",
		Password: string(password),
	}
	database.Model(&Employee{}).Create(&e3)
	e4:= Employee{
		EmployeeID: "E005",
		FirstName: "Piyawat",
		LastName: "Chan",
		Telephone: "0222222222",
		Password: string(password),
	}
	database.Model(&Employee{}).Create(&e4)

	SpaType1 := SpaType{
		Type: "Cutting fur",
	}
	db.Model(&SpaType{}).Create(&SpaType1)
	
	SpaType2 := SpaType{
		Type: "Shower",
	}
	db.Model(&SpaType{}).Create(&SpaType2)

	SpaType3 := SpaType{
		Type: "both",
	}
	db.Model(&SpaType{}).Create(&SpaType3)
}

func (e *Employee) BeforeCreate(tx *gorm.DB) (err error) {
	if e.EmployeeID == "" {
		var latestEmployee Employee
		tx.Last(&latestEmployee)
		numericPart := latestEmployee.EmployeeID[1:]
		numeric, err := strconv.Atoi(numericPart)
		if err != nil {
			panic("Failed to convert numeric part to integer")
		}
		numeric++
		e.EmployeeID = fmt.Sprintf("E%03d", numeric)
	}
	return nil
}