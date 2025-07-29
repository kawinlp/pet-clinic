package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAppointmentInDate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`กรุณาใส่เวลาเป็นปัจจุบัน`, func(t *testing.T) {

		EmployeeID := uint(2)
		VeterinarianID := uint(2)
		MemberID := uint(2)
		PetID := uint(2)

		appointment := entity.Appointment{
			Appointment_in_date: 	time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			Appointment_date:		time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC),
			Status:	"จอง",
			MemberID: &MemberID,
			VeterinarianID: &VeterinarianID,
			EmployeeID: &EmployeeID,
			PetID: &PetID,
		}

		ok, err := govalidator.ValidateStruct(appointment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("กรุณาใส่เวลาเป็นปัจจุบัน"))
	})
}

func TestAppointmentDate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`กรุณาใส่วันที่เป็นวันข้างหน้า`, func(t *testing.T) {

		EmployeeID := uint(2)
		VeterinarianID := uint(2)
		MemberID := uint(2)
		PetID := uint(2)

		appointment := entity.Appointment{
			Appointment_in_date: 	time.Now(),
			Appointment_date:		time.Date(2000, 1, 27, 0, 0, 0, 0, time.UTC),
			Status:	"จอง",
			MemberID: &MemberID,
			VeterinarianID: &VeterinarianID,
			EmployeeID: &EmployeeID,
			PetID: &PetID,
		}

		ok, err := govalidator.ValidateStruct(appointment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("กรุณาใส่วันที่เป็นวันข้างหน้า"))
	})
}

func TestPassApp(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Best Case`, func(t *testing.T) {

		EmployeeID := uint(2)
		VeterinarianID := uint(2)
		MemberID := uint(2)
		PetID := uint(2)

		appointment := entity.Appointment{
			Appointment_in_date: 	time.Now(),
			Appointment_date:		time.Date(2024, 2, 27, 0, 0, 0, 0, time.UTC),
			Status:	"จอง",
			MemberID: &MemberID,
			VeterinarianID: &VeterinarianID,
			EmployeeID: &EmployeeID,
			PetID: &PetID,
		}

		ok, err := govalidator.ValidateStruct(appointment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})
}
