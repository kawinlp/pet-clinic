package entity

import(
	"gorm.io/gorm"
	"time"
)

type Product struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	Amount int
	Price float32
	Date time.Time
	Lotwhat time.Time
	Expire time.Time
	Comment string

	List []List `gorm:"foreignkey:ProductID"`

	ProductTypeID *uint
	ProductType ProductType `gorm:"references:id"`

}

type ProductType struct {
	gorm.Model
	Name string 

	Product []Product `gorm:"foreignkey:ProductTypeID"`
}