package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type List struct {
	gorm.Model
	Amount int `valid:"required~Amount is required,range(0|1000000)~กรุณากรอกจำนวนเต็มบวก"`
	Totalprice float32 `valid:"required~TotalPrice is required ,PositiveFloat~ราคาควรเป็นจำนวนเต็มบวก"`

	Date time.Time  `valid:"CheckDateTime~วันที่ไม่ถูกต้อง"`

	ProductID *uint `valid:"required~Product is required"`
	Product Product `gorm:"references:id" valid:"-"`

	EmployeeID *uint  `valid:"required~Employee is required"`
	Employee Employee `gorm:"references:id"` 

	UnitListID *uint `valid:"required~Unit is required"`
	UnitList UnitList `gorm:"references:id"`

	Payfinished []Payfinished `gorm:"foreignkey:ListID"`
}

type UnitList struct{
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	
	List []List `gorm:"foreignkey:UnitListID"`
}

type Payfinished struct {
	gorm.Model

	ListID *uint `gorm:"uniqueIndex" `
	List List `gorm:"references:id" valid:"-"`

	RecieptID *uint `valid:"-"`
	Reciept Reciept `gorm:"references:id" `
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		currentTime := time.Now()
    		t = t.Truncate(24 * time.Hour)
    	currentTime = currentTime.Truncate(24 * time.Hour)
		if t.Equal(currentTime) {
			return true
		} else {
			return false
		}
		})

	govalidator.CustomTypeTagMap.Set("PositiveFloat", func(i interface{}, context interface{}) bool {
		return i.(float32) > 0
	})
}