package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPetName(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`กรุณากรอกชื่อสัตว์เลี้ยง`, func(t *testing.T) {

		var petGenderID uint = 1
		var petTypeID uint = 1
		var memberID uint = 1

		pet := entity.Pet{
			Name:        "", //ผิดตรงนี้
			Picture:     "",
			Weight:      35.7,
			Birthday:    time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			Allergic:    "ปัญหาบ่มีบ่มีปัญห๊าหยังเลย",
			PetGenderID: &petGenderID,
			PetTypeID:   &petTypeID,
			MemberID:    &memberID,
		}

		ok, err := govalidator.ValidateStruct(pet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อสัตว์เลี้ยง"))
	})
}

func TestBirthday(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`วันเดือนปีเกิดต้องเป็นอดีต`, func(t *testing.T) {

		var petGenderID uint = 1
		var petTypeID uint = 1
		var memberID uint = 1
		pet := entity.Pet{
			Name:        "plaphao",
			Picture:     "abcdefghijklmnopqrstuvwxyz",
			Weight:      0.1,
			Birthday:    time.Now(), //ผิดตรงนี้
			Allergic:    "ปัญหาบ่มีบ่มีปัญห๊าหยังเลย", 
			PetGenderID: &petGenderID,
			PetTypeID:   &petTypeID,
			MemberID:    &memberID,
		}

		ok, err := govalidator.ValidateStruct(pet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("วันเดือนปีเกิดต้องเป็นอดีต"))
	})
}

func TestWeight(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`กรุณากรอกน้ำหนักมากกว่า 0`, func(t *testing.T) {

		var petGenderID uint = 1
		var petTypeID uint = 1
		var memberID uint = 1
		pet := entity.Pet{
			Name:        "plaphao",
			Picture:     "abcdefghijklmnopqrstuvwxyz",
			Weight:      -1,	//ผิดตรงนี้ 
			Birthday:    time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			Allergic:    "ปัญหาบ่มีบ่มีปัญห๊าหยังเลย",
			PetGenderID: &petGenderID,
			PetTypeID:   &petTypeID,
			MemberID:    &memberID,
		}

		ok, err := govalidator.ValidateStruct(pet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกน้ำหนักมากกว่า 0"))
	
	})
}