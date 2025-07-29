package unit

import (
	
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/G1J1/sut66/team04/entity"
)

func TestSpa(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Best case`, func(t *testing.T) {
		EmployeeID := uint(2)
		petID := uint(2)
		
		SpaTypeID := uint(2)
		user := entity.Spa{
			ServiceDay : time.Now(),
            Price : 50,
            Comment : "got" ,
      
	        PetID:      &petID,
			EmployeeID: &EmployeeID,
			
	        SpaTypeID: &SpaTypeID, 
		}
		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())		
	})

}

func TestSpainvalid(t *testing.T) {
	
	g := NewGomegaWithT(t)
	
	t.Run(`Price is required`, func(t *testing.T) {
		EmployeeID := uint(2)
		petID := uint(2)
		
		SpaTypeID := uint(2)
		user := entity.Spa{
			ServiceDay : time.Now()  ,
            Comment : "got" ,
    
			PetID:      &petID,
			EmployeeID: &EmployeeID,
			
	        SpaTypeID: &SpaTypeID, 
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price is required"))

		
	})

	t.Run(`Price is Positive`, func(t *testing.T) {
		EmployeeID := uint(2)
		petID := uint(2)

		SpaTypeID := uint(2)
		user := entity.Spa{
			ServiceDay : time.Now()  ,
            Price : -50,
			Comment : "got" ,

			PetID:      &petID,
			EmployeeID: &EmployeeID,

	        SpaTypeID: &SpaTypeID, 
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price must be at least 0"))		
	})

	t.Run(`Today's Date`, func(t *testing.T) {
		EmployeeID := uint(2)
		petID := uint(2)
	
		SpaTypeID := uint(2)
		user := entity.Spa{
			ServiceDay :  time.Now().AddDate(0, 0, -1),  
            Price : 50,
			Comment : "got" ,

			PetID:      &petID,
			EmployeeID: &EmployeeID,

	        SpaTypeID: &SpaTypeID, 
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ServiceDay must be in the current"))		
	})

	
}


