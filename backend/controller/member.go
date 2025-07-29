package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/G1J1/sut66/team04/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

// POST /member
func CreateMember(c *gin.Context) {

	var member entity.Member
	var gender entity.HumanGender

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Search gender
	entity.DB().First(&gender, member.HumanGenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}
	_, err := govalidator.ValidateStruct(member)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง member
	u := entity.Member{
		FristName: member.FristName,
		LastName:  member.LastName,
		Phone:     member.Phone,
		Birthday:  member.Birthday,

		HumanGenderID: member.HumanGenderID,
		HumanGender:   gender, // โยงความสัมพันธ์กับ Entity Gender โยงความสัมพันธ์กับ Entity member
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// Get Member
func ListMembers(c *gin.Context) {

	var members []entity.Member

	if err := entity.DB().Preload(clause.Associations).Find(&members).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}

// Get member/:id
func GetMember(c *gin.Context) {

	var member entity.Member
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// DELETE /member/:id
func DeleteMember(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}


// PATCH /pets
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var result entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", member.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}