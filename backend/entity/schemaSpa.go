package entity

import(
	
	"gorm.io/gorm"
	"time"
	"github.com/asaskevich/govalidator"
)

type Spa struct{
	gorm.Model
	ServiceDay time.Time `valid:"required~ServiceDay is required , today~ServiceDay must be in the current"`
	Comment string
	Price int `valid:"required~Price is required,PositiveInt~Price must be at least 0"`

	PetID *uint `valid:"required~PetID is required"`
	Pet Pet `gorm:"references:id" valid:"-"`
	
	EmployeeID *uint 
	Employee Employee `gorm:"references:id" valid:"-"`

	SpaTypeID *uint 
	SpaType SpaType `gorm:"references:id" valid:"-"`

}

type SpaType struct{
	gorm.Model
	Type string

	Spa []Spa `gorm:"foreignkey:SpaTypeID"` 
}

func init() {
	govalidator.CustomTypeTagMap.Set("PositiveInt", func(i interface{}, context interface{}) bool {
		return i.(int) > 0
	})
}

func init() {
	govalidator.CustomTypeTagMap.Set("today", func(i interface{}, context interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).Equal(today())
	})
}


