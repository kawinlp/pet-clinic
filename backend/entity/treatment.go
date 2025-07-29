package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Treatment struct {
	gorm.Model
	Date           time.Time `valid:"required~Date is required, now~กรุณาใส่เวลาเป็นปัจจุบัน"`
	Detail         string    `valid:"required~Detail is required, length(1|250)~ตัวอักษรต้องน้อยกว่า 250 ตัว"`
	Recuperate     int       `valid:"required~Recuperate is required, range(1|5)~ระยะพักฟื้นต้องอยู่ระหว่าง 1-5"`
	Comment        string
	Treatmentprice int `valid:"required~Treatmentprice is required, range(1|50000)~ค่ารักษาต้องอยู่ระหว่าง 1-50000"`
	Totalprice     int

	Productused []Productused `gorm:"foreignkey:TreatmentID" valid:"-"`

	CaseTID *uint
	CaseT   CaseT `gorm:"references:id" valid:"-"`

	PetID *uint
	Pet   Pet `gorm:"references:id" valid:"-"`

	VeterinarianID *uint
	Veterinarian   Veterinarian `gorm:"references:id" valid:"-"`

	ProductID *uint
	Product   Product `gorm:"references:id" valid:"-"`

	Service []Service `gorm:"foreignkey:TreatmentID" valid:"-"`
}

type CaseT struct {
	gorm.Model
	ID   int
	Name string 
}

type Productused struct {
	ProductID *uint
	Product   Product `gorm:"references:id" valid:"-"`

	TreatmentID *uint
	Treatment   Treatment `gorm:"references:id" valid:"-"` 
}

func init() {
	govalidator.CustomTypeTagMap.Set("now", func(i interface{}, c interface{}) bool {
		return truncateToNow(i.(time.Time).Local()).Equal(truncateToNow(time.Now()))
	})
}

func truncateToNow(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}
