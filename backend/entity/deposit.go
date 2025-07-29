package entity 

import (
	"gorm.io/gorm"
	"time"
	"github.com/asaskevich/govalidator"
)

type Deposit struct {
	gorm.Model
	Checkin time.Time `valid:"required~Checkin is required , today~Checkin must be in the current"`
	Checkout time.Time  `valid:"required~Checkin is required , future~Checkout must be in the future"`
	Comment string
	Price int `valid:"required~Price is required,PositiveInt~Price must be at least 0"`
	
	Service []Service `gorm:"foreignkey:DepositID"`

	
	PetID *uint 
	Pet Pet `gorm:"references:id" valid:"-"`

	EmployeeID *uint `valid:"-"`
	Employee Employee `gorm:"references:id" valid:"-"`

	


}

func init() {
	govalidator.CustomTypeTagMap.Set("PositiveInt", func(i interface{}, context interface{}) bool {
		return i.(int) > 0
	})
}

func init() {
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).After(today())
	})
}


