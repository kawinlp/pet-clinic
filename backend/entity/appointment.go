package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Appointment struct {
	gorm.Model
	Appointment_in_date time.Time `valid:"required~Appointment_in_date is required, now~กรุณาใส่เวลาเป็นปัจจุบัน"`
	Appointment_date    time.Time `valid:"required~Appointment_date is required, futureDay~กรุณาใส่วันที่เป็นวันข้างหน้า"`
	Status              string

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	PetID *uint
	Pet   Pet `gorm:"references:id" valid:"-"`

	VeterinarianID *uint
	Veterinarian   Veterinarian `gorm:"references:id" valid:"-"`

	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("futureDay", func(i interface{}, c interface{}) bool {
		return truncateToFutureDay(i.(time.Time).Local(), 1).After(time.Now().Local())
	})
}

func truncateToFutureDay(t time.Time, daysToAdd int) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day()+daysToAdd, 0, 0, 0, 0, t.Location())
}
