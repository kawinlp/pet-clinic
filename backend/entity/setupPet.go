package entity

import (
	"gorm.io/gorm"
	"time"
)

func setupPetGenders(database *gorm.DB) {
	g1 := PetGender{Name: "ผู้"}
	database.Model(&PetGender{}).Create(&g1)

	g2 := PetGender{Name: "เมีย"}
	database.Model(&PetGender{}).Create(&g2)
}

func setupPetTypes(database *gorm.DB) {
	t1 := PetType{Name: "หมา"}
	database.Model(&PetType{}).Create(&t1)

	t2 := PetType{Name: "แมว"}
	database.Model(&PetType{}).Create(&t2)

	t3 := PetType{Name: "กระต่าย"}
	database.Model(&PetType{}).Create(&t3)

	t4 := PetType{Name: "นก"}
	database.Model(&PetType{}).Create(&t4)

	t5 := PetType{Name: "เต่า"}
	database.Model(&PetType{}).Create(&t5)

	t6 := PetType{Name: "เม่น"}
	database.Model(&PetType{}).Create(&t6)

	t7 := PetType{Name: "งู"}
	database.Model(&PetType{}).Create(&t7)

	t8 := PetType{Name: "หมู"}
	database.Model(&PetType{}).Create(&t8)
}

func setupMembers(database *gorm.DB) {

	bangkok, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		panic(err)
	}
	dateToSet := time.Date(2000, time.January, 1, 0, 0, 0, 0, bangkok)
	HumanGenderID1 := uint(1)
	humanGenderID2 := uint(2)

	m1 := Member{
		FristName: "วิชัย",
		LastName: "ใจดี",
		Phone: "0987654321",
		Birthday: dateToSet,
		HumanGenderID: &HumanGenderID1,
	}
	database.Model(&Member{}).Create(&m1)

	m2 := Member{
		FristName: "ประภา",
		LastName: "สุขใจ",
		Phone: "0645213859",
		Birthday: dateToSet,
		HumanGenderID: &humanGenderID2,
	}
	database.Model(&Member{}).Create(&m2)

	m3 := Member{
		FristName: "ณัฐพล",
		LastName: "แสนสุข",
		Phone: "0826179463",
		Birthday: dateToSet,
		HumanGenderID: &HumanGenderID1,
	}
	database.Model(&Member{}).Create(&m3)
}

func setupPets(database *gorm.DB) {

	bangkok, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		panic(err)
	}

	dateToSet := time.Date(2022, time.January, 1, 0, 0, 0, 0, bangkok)
	PetGenderID1 := uint(1)
	PetGenderID2 := uint(2)
	
	PetTypeID1 := uint(1)
	PetTypeID2 := uint(2)
	PetTypeID3 := uint(3)

	MemberID1 := uint(1)
	MemberID2 := uint(2)
	MemberID3 := uint(3)
	p1 := Pet{
		Name: "จุ๊มเหม่ง",
		PetGenderID: &PetGenderID1,
		Weight: 4.9,
		Birthday: dateToSet,
		PetTypeID: &PetTypeID1,
		Allergic: "",
		MemberID: &MemberID3,
		Picture: "https://t4.ftcdn.net/jpg/01/99/00/79/360_F_199007925_NolyRdRrdYqUAGdVZV38P4WX8pYfBaRP.jpg",
	}
	database.Model(&Pet{}).Create(&p1)
	
	p2 := Pet{
		Name: "ป๊อปคอร์น",
		PetGenderID: &PetGenderID2,
		Weight: 2.8,
		Birthday: dateToSet,
		PetTypeID: &PetTypeID2,
		Allergic: "",
		MemberID: &MemberID1,
		Picture: "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*",
	}
	database.Model(&Pet{}).Create(&p2)
	
	p3 := Pet{
		Name: "เซเว่น",
		PetGenderID: &PetGenderID2,
		Weight: 1.6,
		Birthday: dateToSet,
		PetTypeID: &PetTypeID3,
		Allergic: "",
		MemberID: &MemberID2,
		Picture: "https://thumbs.dreamstime.com/b/white-rabbit-grass-1747425.jpg",
	}
	database.Model(&Pet{}).Create(&p3)
}