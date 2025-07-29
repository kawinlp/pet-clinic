package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type PetType struct {
	gorm.Model
	Name string

	Pet []Pet `gorm:"foreignkey:PetTypeID"`
}

type PetGender struct {
	gorm.Model
	Name string
	Pet  []Pet `gorm:"foreignkey:PetGenderID"`
}

type Pet struct {
	gorm.Model
	Name     string    `valid:"required~กรุณากรอกชื่อสัตว์เลี้ยง"`
	Picture  string    `gorm:"type:longtext"`
	Weight   float32   `valid:"required~กรุณากรอกน้ำหนัก, range(0|40)~กรุณากรอกน้ำหนักมากกว่า 0"`
	Birthday time.Time `valid:"required~กรุณากรอกวันเกิดสัตว์เลี้ยง, past~วันเดือนปีเกิดต้องเป็นอดีต"`
	Allergic string    

	Appointment []Appointment `gorm:"foreignkey:PetID"`
	Treatment   []Treatment   `gorm:"foreignkey:PetID"`

	PetTypeID *uint 
	PetType   PetType `gorm:"references:id"`

	PetGenderID *uint 
	PetGender   PetGender `gorm:"references:id"`

	MemberID *uint 
	Member   Member `gorm:"foreignKey:MemberID" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).Before(today())
	})
}

func truncateToDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

func today() time.Time {
	return truncateToDay(time.Now())
}

