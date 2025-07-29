package entity

import (
	// "github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type Member struct {
	gorm.Model
	FristName string    `valid:"required~กรุณากรอกชื่อ"`
	LastName  string    `valid:"required~กรุณากรอกนามสกุล"`
	Phone     string    `valid:"required~กรุณากรอกเบอร์โทร, stringlength(10|10)~รูปแบบเบอร์โทรไม่ถูกต้อง, matches(09|08|06)~เบอร์โทรต้องขึ้นต้นด้วย 06 08 09"`
	Birthday  time.Time `valid:"required~กรุณากรอกวันเกิด,past~วันเดือนปีเกิดต้องเป็นอดีตเท่านั้น"`

	Pet []Pet `gorm:"foreignkey:MemberID"`

	HumanGenderID *uint
	HumanGender   HumanGender `gorm:"references:id"`

	// Treatment []Treatment `gorm:"foreignkey:MemberID"`
	Service []Service `gorm:"foreignkey:MemberID"`
}


