package entity

import(
	"gorm.io/gorm"
	"time"
	"github.com/asaskevich/govalidator"
)

type Reciept struct {
	gorm.Model
	Totalprice float32
	Moneyreceived float32 `valid:"required~Recieved is required ,PositiveFloat~กรุณากรอกจำนวนเต็มบวก"`
	Change float32 
	Date time.Time
	AmountProduct int

	Payfinished []Payfinished `gorm:"foreignkey:RecieptID"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id"`


}

func init() {
	govalidator.CustomTypeTagMap.Set("PositiveFloat", func(i interface{}, context interface{}) bool {
		return i.(float32) > 0
	})
}