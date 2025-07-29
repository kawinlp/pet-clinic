package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/G1J1/sut66/team04/entity"
)

func CreateVeterinarian(c *gin.Context) {
	var employee entity.Employee
	var veterinarian entity.Veterinarian
	var gender entity.HumanGender
	var profession entity.Profession
	var specialties entity.Specialties

	//Bind เข้า JSON
	if err := c.ShouldBindJSON(&veterinarian); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//หา Entity gender
	if tx := entity.DB().Where("id = ?", veterinarian.HumanGenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	//หา Entity profession
	if tx := entity.DB().Where("id = ?", veterinarian.ProfessionID).First(&profession); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	//หา Entity specialties
	if tx := entity.DB().Where("id = ?", veterinarian.SpecialtiesID).First(&specialties); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	//หา Entity employee
	if tx := entity.DB().Where("id = ?", veterinarian.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(veterinarian); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง User
	d := entity.Veterinarian{
		Name:          veterinarian.Name,
		Image:         veterinarian.Image,
		Birthday:      veterinarian.Birthday,
		License:       veterinarian.License,
		Tel:           veterinarian.Tel,
		Salary:        veterinarian.Salary,
		Working_Start: veterinarian.Working_Start,
		Last_Modified: veterinarian.Last_Modified,
		HumanGender:   gender,
		Profession:    profession,
		Specialties:   specialties,
		Employee:      employee,
	}

	// บันทึก
	if err := entity.DB().Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": d})
}

// List All Veterinarian
func ListVeterinarian(c *gin.Context) {
	var veterinarian []entity.Veterinarian
	if err := entity.DB().Raw("SELECT * FROM veterinarians").Scan(&veterinarian).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": veterinarian})
}

// List All Gender
func ListHumanGender(c *gin.Context) {
	var gender []entity.HumanGender
	if err := entity.DB().Raw("SELECT * FROM human_genders").Scan(&gender).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": gender})
}

// List All Profession
func ListProfession(c *gin.Context) {
	var profession []entity.Profession
	if err := entity.DB().Raw("SELECT * FROM professions").Scan(&profession).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": profession})
}

// List All Specialties
func ListSpecialties(c *gin.Context) {
	var specialties []entity.Specialties
	if err := entity.DB().Raw("SELECT * FROM specialties").Scan(&specialties).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specialties})
}

// Get Veterinarian
func GetVeterinarianFromID(c *gin.Context) {
	id := c.Param("id")
	var veterinarian entity.Veterinarian
	if err := entity.DB().Raw("SELECT * FROM veterinarians WHERE id = ?", id).Scan(&veterinarian).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": veterinarian})
}

// Del Veterinarian
func DeleteVeterinarian(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM veterinarians WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "veterinarian not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update Veterinarian
func UpdateVeterinarian(c *gin.Context) {
	var veterinarian entity.Veterinarian
	var result entity.Veterinarian

	if err := c.ShouldBindJSON(&veterinarian); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา veterinarian ด้วย id
	if tx := entity.DB().Where("id = ?", veterinarian.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(veterinarian); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&veterinarian).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": veterinarian})

}
