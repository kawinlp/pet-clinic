package entity

import (
	"gorm.io/gorm"
	"time"
)

type Veterinarian struct {
	gorm.Model
	Name          string    `gorm:"uniqueIndex" valid:"required~Name is required"`
	Image         string    `valid:"required~Image is required"`
	Birthday      time.Time `valid:"required~Birthday is required"`
	License       string    `gorm:"uniqueIndex" valid:"required~License is required"`
	Tel           string    `gorm:"uniqueIndex" valid:"required~Tel is required, matches(^0[689]\\d{8}$)"`
	Salary        int       `valid:"required~Salary is required, range(10000|999999)~Salary must be between 10000-999999"`
	Working_Start time.Time `valid:"required~Working_Start is required"`
	Last_Modified time.Time

	HumanGenderID uint        `valid:"required~HumanGender is required"`
	HumanGender   HumanGender `gorm:"foreignkey:HumanGenderID"`

	ProfessionID uint       `valid:"required~Profession is required"`
	Profession   Profession `gorm:"foreignkey:ProfessionID"`

	SpecialtiesID uint        `valid:"required~Specialties is required"`
	Specialties   Specialties `gorm:"foreignkey:SpecialtiesID"`

	EmployeeID uint
	Employee Employee  `gorm:"references:id"` 

	Appointment []Appointment `gorm:"foreignkey:VeterinarianID"`
	Treatment 	[]Treatment `gorm:"foreignkey:VeterinarianID"`
}

type HumanGender struct {
	gorm.Model
	Name         string         `gorm:"uniqueIndex"`
	Veterinarian []Veterinarian `gorm:"foreignkey:HumanGenderID"`

	Member []Member `gorm:"foreignkey:HumanGenderID"`
}

type Profession struct {
	gorm.Model
	Name         string         `gorm:"uniqueIndex"`
	Veterinarian []Veterinarian `gorm:"foreignkey:ProfessionID"`
}

type Specialties struct {
	gorm.Model
	Name         string         `gorm:"uniqueIndex"`
	Veterinarian []Veterinarian `gorm:"foreignkey:SpecialtiesID"`
}
