package entity

import (
	"time"

	"gorm.io/gorm"
)

type Service struct {
	gorm.Model

	MemberID *uint `valid:"-"`
	Member Member `gorm:"references:id"`
	
	TreatmentID *uint `valid:"-"`
	Treatment Treatment `gorm:"references:id"`

	DepositID *uint `valid:"-"`
	Deposit Deposit `gorm:"references:id"`

	SpaID *uint `valid:"-"`
	Spa Spa `gorm:"references:id"`

	ServiceRecieptID *uint 
	ServiceReciept ServiceReciept `gorm:"references:id"`
}

type ServiceReciept struct{
	gorm.Model
	TotalPrice int `valid:"required~TotalPrice is required, range(1|999999999)~Received must be between 1-999999999"`
	Received int `valid:"required~Received is required, range(1|999999999)~Received must be between 1-999999999"`
	Change int `valid:"range(0|999999999)~Change must be between 0-999999999"`
	PurchasedDate time.Time 

	EmployeeID uint
	Employee Employee `gorm:"references:id"` 

	Service []Service `gorm:"foreignkey:ServiceRecieptID"`	
}