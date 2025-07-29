package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestServiceAllPositive(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`AllPositive`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 100,
			Received: 100,
			Change: 100,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

}

func TestServiceTotalPrice(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`TotalPrice is 0`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 0,
			Received: 100,
			Change: 100,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("TotalPrice is required"))
	})

	t.Run(`TotalPrice Negative`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: -10,
			Received: 100,
			Change: 100,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Received must be between 1-999999999"))
	})

	

}

func TestServiceReceived(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Received Negative`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 100,
			Received: -5,
			Change: 100,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Received must be between 1-999999999"))
	})

	t.Run(`Received = 0`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 100,
			Received: 0,
			Change: 100,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Received is required"))
	})

}

func TestServiceChange(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Change Negative`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 100,
			Received: 100,
			Change: -10,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Change must be between 0-999999999"))
	})

	t.Run(`Change = 0`, func(t *testing.T) {
		sr := entity.ServiceReciept{
			TotalPrice: 100,
			Received: 100,
			Change: 0,
			PurchasedDate: time.Now(),
			EmployeeID: 1,
		}

		ok, err := govalidator.ValidateStruct(sr)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}
