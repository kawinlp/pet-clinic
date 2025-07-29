package entity

import (
	// "time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	EmployeeID string `gorm:"uniqueIndex"`
	FirstName  string
	LastName   string
	Telephone string
	Password  string
	// Birthday  time.Time

	List []List `gorm:"foreignkey:EmployeeID"`
	Appointment []Appointment `gorm:"foreignkey:EmployeeID"`
	Reciept []Reciept `gorm:"foreignkey:EmployeeID"`
	ServiceReciept []ServiceReciept `gorm:"foreignkey:EmployeeID"`
	Veterinarian []Veterinarian `gorm:"foreignkey:EmployeeID"`

	
}



