package unit

import (

	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDepossit(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Best case`, func(t *testing.T) {
		EmployeeID := uint(2)
		petID := uint(2)
	
		user := entity.Deposit{
			Checkin:    time.Now(),
			Checkout:   time.Now().AddDate(0, 0, 1),
			Price:      50,
			Comment:    "got",
			PetID:      &petID,
			EmployeeID: &EmployeeID,
		
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestDepossitFail(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Price is required`, func(t *testing.T) {
		var EmployeeID uint = 1
		var petID uint = 1


		user := entity.Deposit{
			Checkin:  time.Now(),
			Checkout: time.Now().AddDate(0, 0, 1),

			PetID:      &petID,
			EmployeeID: &EmployeeID,
		
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price is required"))

	})

	t.Run(`Price is Positive `, func(t *testing.T) {
		var EmployeeID uint = 1
		var petID uint = 1

		user := entity.Deposit{
			Checkin:  time.Now(),
			Checkout: time.Now().AddDate(0, 0, 1),
			Price:    -50,
			Comment:  "got",

			PetID:      &petID,
			EmployeeID: &EmployeeID,
	
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price must be at least 0"))

	})

	t.Run(`Today's Date`, func(t *testing.T) {
		var EmployeeID uint = 1
		var petID uint = 1

		user := entity.Deposit{
			Checkin:  time.Now().AddDate(0, 0, 1),
			Checkout: time.Now().AddDate(0, 0, 1),
			Price:    100,
			Comment:  "got",

			PetID:      &petID,
			EmployeeID: &EmployeeID,
	
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Checkin must be in the current"))

	})

	t.Run(`Check out date`, func(t *testing.T) {
		var EmployeeID uint = 1
		var petID uint = 1
		user := entity.Deposit{
			Checkin:  time.Now().AddDate(0, 0, 0),
			Checkout: time.Now().AddDate(0, 0, 0),
			Price:    100,
			Comment:  "got",

			PetID:      &petID,
			EmployeeID: &EmployeeID,
	
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Checkout must be in the future"))

	})
}

