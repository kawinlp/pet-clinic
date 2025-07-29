package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
	"github.com/G1J1/sut66/team04/entity"
	// "gorm.io/gorm/clause"
)

func CreateAppointment(c *gin.Context) {

	var appointment entity.Appointment
	var veterinarian entity.Veterinarian
	var member entity.Member
	var employee entity.Employee
	var pet entity.Pet

	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Search veterinarian
	entity.DB().First(&veterinarian, appointment.VeterinarianID)
	if veterinarian.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "veterinarian not found"})
		return
	}

	// Search member
	entity.DB().First(&member, appointment.MemberID)
	if member.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "member not found"})
		return
	}

	// Search pet
	entity.DB().First(&pet, appointment.PetID)
	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pet not found"})
		return
	}

	// Search Employee
	entity.DB().First(&employee, appointment.EmployeeID)
	if employee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Appointment
	u := entity.Appointment{
		Appointment_in_date: appointment.Appointment_in_date,
		Appointment_date:    appointment.Appointment_date,
		Status:              appointment.Status,

		MemberID: appointment.MemberID,
		Member:   member,

		VeterinarianID: appointment.VeterinarianID,
		Veterinarian:   veterinarian,

		EmployeeID: appointment.EmployeeID,
		Employee:   employee,

		PetID: appointment.PetID,
		Pet:   pet,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})
}

// List All Appointment
func ListAppointment(c *gin.Context) {
    var appointment []entity.Appointment
    if err := entity.DB().Raw("SELECT * FROM appointments").Scan(&appointment).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// Get Appointment by ID
func GetAppointmentFromID(c *gin.Context) {
	id := c.Param("id")
	var appointment entity.Appointment
	if err := entity.DB().Raw("SELECT * FROM appointments WHERE id = ?", id).Scan(&appointment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appointment})
}

// Del Appointment
func DeleteAppointment(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM appointments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "appointment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// List All Employee
func ListEmployee(c *gin.Context) {
    var employee []entity.Employee
    if err := entity.DB().Raw("SELECT * FROM employees").Scan(&employee).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": employee})
}

// PATCH /appointment
func UpdateAppointment(c *gin.Context) {
	var appointment entity.Appointment
	var result entity.Appointment

	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา appointment ด้วย id
	if tx := entity.DB().Where("id = ?", appointment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "appointment not found"})
		return
	}

	if err := entity.DB().Save(&appointment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appointment})
}