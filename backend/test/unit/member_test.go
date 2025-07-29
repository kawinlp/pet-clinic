package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBirthdayMember(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`วันเดือนปีเกิดต้องเป็นอดีตเท่านั้น`, func(t *testing.T) {

		var HumanGenderID uint = 1
		member := entity.Member{
			FristName:     "test",
			LastName:      "test",
			Phone:         "0900000000",
			Birthday:      time.Now(), //ผิดตรงนี้
			HumanGenderID: &HumanGenderID,
		}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("วันเดือนปีเกิดต้องเป็นอดีตเท่านั้น")) 
	})
}

func TestPhone(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`เบอร์โทรต้องขึ้นต้นด้วย 06 08 09`, func(t *testing.T) {

		var HumanGenderID uint = 1
		member := entity.Member{
			FristName:     "test",
			LastName:      "test",
			Phone:         "0144444444", //ผิดตรงนี้
			Birthday:      time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			HumanGenderID: &HumanGenderID,
		}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("เบอร์โทรต้องขึ้นต้นด้วย 06 08 09"))
	})

	t.Run(`รูปแบบเบอร์โทรไม่ถูกต้อง`, func(t *testing.T) {

		var HumanGenderID uint = 1
		member := entity.Member{
			FristName:     "test",
			LastName:      "test",
			Phone:         "098765432", //ผิดตรงนี้
			Birthday:      time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			HumanGenderID: &HumanGenderID,
		}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("รูปแบบเบอร์โทรไม่ถูกต้อง"))
	})

}


func TestNameMember(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`กรุณากรอกชื่อ`, func(t *testing.T) {

		var HumanGenderID uint = 1
		member := entity.Member{
			FristName:     "", //ผิดตรงนี้
			LastName:      "test",
			Phone:         "0999999999",
			Birthday:      time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			HumanGenderID: &HumanGenderID,
		}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))
	})

	// g := NewGomegaWithT(t)
	t.Run(`กรุณากรอกนามสกุล`, func(t *testing.T) {

		var HumanGenderID uint = 1
		member := entity.Member{
			FristName:     "test",
			LastName:      "", //ผิดตรงนี้
			Phone:         "0999999999",
			Birthday:      time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			HumanGenderID: &HumanGenderID,
		}

		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกนามสกุล"))
	})
}
