package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUnitList(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Unit not found`, func(t *testing.T) {
		ProductID:= uint(2)
		NULL:= uint(0)
		list := entity.List{
			Amount: 2,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &NULL,
			EmployeeID: &ProductID,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Unit is required"))
	})

}

func TestAmount(t *testing.T) {
	g := NewGomegaWithT(t)
		
	t.Run(`Amount is required`, func(t *testing.T) {
		ProductID:= uint(2)
		list := entity.List{
			Amount: 0,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &ProductID,
			EmployeeID: &ProductID,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Amount is required"))
	})

	t.Run(`กรุณากรอกจำนวนเต็มบวก`, func(t *testing.T) {
		ProductID:= uint(2)
		list := entity.List{
			Amount: -2,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &ProductID,
			EmployeeID: &ProductID,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกจำนวนเต็มบวก"))
	})
}


func TestTotalprice(t *testing.T) {
	g := NewGomegaWithT(t)
	ProductID:= uint(2)
	t.Run(`TotalPrice is required`, func(t *testing.T) {
		
		list := entity.List{
			Amount: 2,
			Totalprice: 0.0,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &ProductID,
			EmployeeID: &ProductID,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("TotalPrice is required"))
	})

	t.Run(`ราคาควรเป็นจำนวนเต็มบวก`, func(t *testing.T) {
		list := entity.List{
			Amount: 2,
			Totalprice: -2.1,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &ProductID,
			EmployeeID: &ProductID,
		}
		ok, err := govalidator.ValidateStruct(list)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ราคาควรเป็นจำนวนเต็มบวก"))
	})
	
}



func TestList(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Data correct`, func(t *testing.T) {
		ProductID:= uint(2)
		list := entity.List{
			Amount: 2,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &ProductID,
			UnitListID: &ProductID,
			EmployeeID: &ProductID,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).To(BeTrue())

		g.Expect(err).To(BeNil())
	
	})

}

func TestDateTime (t *testing.T) {
	i := uint(1)
	g := NewGomegaWithT(t)
	t.Run(`Date can't be past`,func(t *testing.T){
	list := entity.List{
		Amount: 2,
		Totalprice: 30.0,
		Date: time.Date(2023, 1, 1, 12, 00, 00, 00, time.UTC),
		ProductID: &i,
		UnitListID: &i,
		EmployeeID: &i,
	}
	ok, err :=govalidator.ValidateStruct(list)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("วันที่ไม่ถูกต้อง"))
})
}

func TestEmployee (t *testing.T) {
	i:= uint(1)
	n:= uint(0)
	g := NewGomegaWithT(t)
	t.Run(`Employee not found`,func(t *testing.T){
		list := entity.List{
			Amount: 2,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &i,
			UnitListID: &i,
			EmployeeID: &n,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Employee is required"))
	})
}

func TestProduct (t *testing.T) {
	i:= uint(1)
	n:= uint(0)
	g := NewGomegaWithT(t)
	t.Run(`Product not found`,func(t *testing.T){
		list := entity.List{
			Amount: 2,
			Totalprice: 30.0,
			Date: time.Now().Local(),
			ProductID: &n,
			UnitListID: &i,
			EmployeeID: &i,
		}

		ok, err := govalidator.ValidateStruct(list)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Product is required"))
	})
}