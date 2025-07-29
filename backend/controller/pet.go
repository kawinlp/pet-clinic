package controller

import (
	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
	"net/http"
)

// Get Pets
func ListPets(c *gin.Context) {

	var pets []entity.Pet

	if err := entity.DB().Preload(clause.Associations).Find(&pets).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": pets})
}

// GET /pet/:id
func GetPet(c *gin.Context) {

	var pet entity.Pet
	id := c.Param("id")
	if err := entity.DB().Preload(clause.Associations).Raw("SELECT * FROM pets WHERE id = ?", id).Find(&pet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pet})
}

// GET /pet/:member_id
func GetPetByMember(c *gin.Context) {

	var pet []entity.Pet
	id := c.Param("id")
	if err := entity.DB().Preload(clause.Associations).Raw("SELECT * FROM pets WHERE member_id = ? AND deleted_at IS NULL", id).Find(&pet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pet})
}

// POST /pet
func CreatePet(c *gin.Context) {

	var pet entity.Pet
	var gender entity.PetGender
	var petTypes entity.PetType
	var member entity.Member

	

	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Search gender
	entity.DB().First(&gender, pet.PetGenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	// Search petType
	entity.DB().First(&petTypes, pet.PetTypeID)
	if petTypes.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "petType not found"})
		return
	}

	// Search member
	entity.DB().First(&member, pet.MemberID)
	if member.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "member not found"})
		return
	}

	_, err := govalidator.ValidateStruct(pet)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Pet
	u := entity.Pet{
		Name:     pet.Name,
		Picture:  pet.Picture,
		Weight:   pet.Weight,
		Birthday: pet.Birthday,
		Allergic: pet.Allergic,

		PetTypeID: pet.PetTypeID,
		PetType:   petTypes, // โยงความสัมพันธ์กับ Entity petType

		PetGenderID: pet.PetGenderID,
		PetGender:   gender, // โยงความสัมพันธ์กับ Entity Gender

		MemberID: pet.MemberID,
		Member:   member, // โยงความสัมพันธ์กับ Entity member
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// PATCH /pets
func UpdatePet(c *gin.Context) {
	var pet entity.Pet
	var result entity.Pet

	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา pet ด้วย id
	if tx := entity.DB().Where("id = ?", pet.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pet not found"})
		return
	}

	if err := entity.DB().Save(&pet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pet})
}

// GET /genders
func ListGenders(c *gin.Context) {
	var genders []entity.PetGender

	if err := entity.DB().Raw("SELECT * FROM pet_genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

func ListPetTypes(c *gin.Context) {
	var types []entity.PetType

	if err := entity.DB().Raw("SELECT * FROM pet_types").Scan(&types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}

// DELETE /pet/:id
func DeletePet(c *gin.Context) {

	id := c.Param("id")

	var pet entity.Pet
	if result := entity.DB().First(&pet, id); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pet not found"})
		return
	}
	
	// Soft delete the pet
	if result := entity.DB().Delete(&pet); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete pet"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}