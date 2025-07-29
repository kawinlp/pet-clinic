package controller

import (
	"net/http"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

func CreateTreatment(c *gin.Context) {

	var treatment entity.Treatment
	var caseT entity.CaseT
	// var productused *entity.Productused
	var veterinarian entity.Veterinarian
	var product entity.Product
	var pet entity.Pet

	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Search CaseT
	entity.DB().First(&caseT, treatment.CaseTID)
	if caseT.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "caseT not found"})
		return
	}

	// Search veterinarian
	entity.DB().First(&veterinarian, treatment.VeterinarianID)
	if veterinarian.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "veterinarian not found"})
		return
	}

	// Search product
	entity.DB().First(&product, treatment.ProductID)
	if product.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	// Search product
	entity.DB().First(&pet, treatment.PetID)
	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "pet not found"})
		return
	}

	if (product.Amount - 1) < 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ลดจำนวนสินค้าไม่สำเร็จ"})
		return
	}

	if _, err := govalidator.ValidateStruct(treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Treatment
	u := entity.Treatment{
		Date:           treatment.Date,
		Detail:         treatment.Detail,
		Recuperate:     treatment.Recuperate,
		Comment:        treatment.Comment,
		Treatmentprice: treatment.Treatmentprice,
		CaseTID:        treatment.CaseTID,
		CaseT:          caseT, // โยงความสัมพันธ์กับ Entity caseT
		Totalprice:     treatment.Totalprice,

		VeterinarianID: treatment.VeterinarianID,
		Veterinarian:   veterinarian,

		ProductID: treatment.ProductID,
		Product:   product, // โยงความสัมพันธ์กับ Entity Product

		PetID: treatment.PetID,
		Pet:   pet,
	}

	if err := entity.DB().Model(&product).Update("amount", product.Amount-1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

	treat := entity.Productused{
		TreatmentID: &u.ID,
		ProductID:   treatment.ProductID,
	}

	if err := entity.DB().Create(&treat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	treatservice := entity.Service{
		TreatmentID: &u.ID,
		MemberID:    pet.MemberID,
	}

	if err := entity.DB().Create(&treatservice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// List All Treatment
func ListTreatment(c *gin.Context) {
	var treatment []entity.Treatment
	if err := entity.DB().Raw("SELECT * FROM treatments").Scan(&treatment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// List All CaseT
func ListCaseT(c *gin.Context) {
	var caseT []entity.CaseT
	if err := entity.DB().Raw("SELECT * FROM case_ts").Scan(&caseT).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": caseT})
}

// List All productuseds
func ListProductused(c *gin.Context) {
	var productused []entity.Productused
	if err := entity.DB().Raw("SELECT * FROM productuseds").Scan(&productused).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": productused})
}

// Get Treatment
func GetTreatmentFromID(c *gin.Context) {
	id := c.Param("id")
	var treatment []entity.Treatment
	if err := entity.DB().Raw("SELECT * FROM treatments WHERE pet_id = ? AND deleted_at IS NULL", id).Scan(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// Get TreatmentBypet
func GetTreatmentFromIDpet(c *gin.Context) {
	id := c.Param("id")
	var treatment []entity.Treatment
	if err := entity.DB().Raw("SELECT * FROM treatments WHERE id = ?", id).Scan(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(treatment) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลการรักษาที่ตรงกับ id ที่ระบุ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}
func GetTreatmentFromIDP(c *gin.Context) {
	id := c.Param("id")
	var treatment []entity.Treatment
	if err := entity.DB().Preload("Pet").Preload("Veterinarian").Preload("CaseT").Preload("Product").Raw("SELECT * FROM treatments WHERE id = ?", id).Find(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(treatment) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลการรักษาที่ตรงกับ id ที่ระบุ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// Del Treatment
func DeleteTreatment(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM treatments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func ListVaacine(c *gin.Context) {

	var product []entity.Product
	if err := entity.DB().Preload(clause.Associations).Raw("SELECT * FROM products WHERE product_type_id IN (?, ?)", 4, 2).Find(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": product})
}

func UpdateTreatment(c *gin.Context) {
	var treatment entity.Treatment
	var result entity.Treatment

	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา treatment ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่มีการรักษานี้"})
		return
	}

	// if tx := entity.DB().Where("id = ?", treatment.pet_id).First(&result); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่มีการรักษานี้"})
	// 	return
	// }

	// if _, err := govalidator.ValidateStruct(treatment); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Save(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatment})
}
