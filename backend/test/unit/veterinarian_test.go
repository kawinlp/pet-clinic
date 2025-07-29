package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Name is required`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "1234",
			Tel:           "0811234567",
			Salary:        20000,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Name is required"))
	})

}

func TestLicense(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`License is required`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "a",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "",
			Tel:           "0811234567",
			Salary:        100000,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("License is required"))
	})

}

func TestSalary(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Salary must be between 10000-999999`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "S",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "1234",
			Tel:           "0811234567",
			Salary:        100,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Salary must be between 10000-999999"))
	})

	t.Run(`Salary is required`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "S",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "1234",
			Tel:           "0811234567",
			Salary:        0,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Salary is required"))
	})

}

func TestTel(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Tel: 081123456 does not validate as matches(^0[689]\\d{8}$)`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "S",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "1234",
			Tel:           "081123456",
			Salary:        20000,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Tel: 081123456 does not validate as matches(^0[689]\\d{8}$)"))
	})

}

func TestPass(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Test is Pass With No Error`, func(t *testing.T) {
		veterinarian := entity.Veterinarian{
			Name:          "Warren buffet",
			Image:         "a",
			HumanGenderID: 1,
			Birthday:      time.Now(),
			License:       "1234",
			Tel:           "0811234567",
			Salary:        20000,
			Working_Start: time.Now(),
			ProfessionID:  1,
			SpecialtiesID: 1,
		}

		ok, err := govalidator.ValidateStruct(veterinarian)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
