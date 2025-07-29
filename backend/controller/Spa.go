package controller

import (
	"net/http"
	"strconv"
	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)


func CreateSpas(c *gin.Context) {
	var spa entity.Spa 
	var pet entity.Pet 
	var employee entity.Employee
	var member entity.Member
	var spaT entity.SpaType
	var result entity.Pet

	Pet_weight, errr := strconv.ParseFloat(c.Param("id"), 64)
	
	if errr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": errr.Error()})
		return
	 }
	

	
	if err := c.ShouldBindJSON(&spa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	_, err := govalidator.ValidateStruct(spa)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", spa.PetID).First(&pet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Pet not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", pet.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", spa.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", spa.SpaTypeID).First(&spaT); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Spatype not found"})
		return
	}

	u := entity.Spa{
		Price: spa.Price,
		Comment: spa.Comment,	
		ServiceDay: spa.ServiceDay,
		Pet: pet,	
		Employee: employee,
		SpaType: spaT,
	}

	{
	if err := entity.DB().Create(&u).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": "Save failed "})
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": spa})
	}


	sr := entity.Service{
		Member: member,
		SpaID: &u.ID,
	}
	

	// บันทึก
	if err := entity.DB().Create(&sr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", spa.PetID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Spa not found"})
		return
	}



	//update weight pet
	if err := entity.DB().Model(&result).Select("Weight").Updates(entity.Pet{Weight:float32(Pet_weight)}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	
}

func GetMemberbyphone(c *gin.Context) {
	var member entity.Member
	phone := c.Param("phone")
	
	
	
	if err := entity.DB().Where("phone = ? ", phone).First(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Phone not found"})
		return
	}

	
	c.JSON(http.StatusOK, gin.H{"data": member})
}




func GetPetbyMemberID(c *gin.Context) {
	var pet []entity.Pet
	id := c.Param("MemberID")
	
	
	
	if err := entity.DB().Raw("SELECT * FROM pets WHERE member_id = ?", id).Scan(&pet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Pet not found"})
		return
	}

	
	c.JSON(http.StatusOK, gin.H{"data": pet})
}

func GetAllSpa(c *gin.Context) {
	// create variable for store data as type of User array
	var spa []entity.Spa


	// get data form database and check error
	if err := entity.DB().Preload("Pet.Member").Preload("SpaType").Find(&spa).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": spa})
}

	//"/UpdateSpa"
func UpdateSpa(c *gin.Context) {
	var spa entity.Spa
	var result entity.Spa

	if err := c.ShouldBindJSON(&spa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา Spa ด้วย id
	if tx := entity.DB().Where("id = ?", spa.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Spa not found"})
		return
	}

	if err := entity.DB().Model(&result).Select("ServiceDay","Comment","Price","PetID","SpaTypeID").Updates(entity.Spa{ServiceDay:spa.ServiceDay,Comment:spa.Comment,Price:spa.Price,PetID:spa.PetID,SpaTypeID: spa.SpaTypeID}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": spa})
}


// DELETE /spa/:id
func DeleteSpa(c *gin.Context) {
	
	var spa entity.Spa
	var service entity.Service

	// get id from url
	id := c.Param("id")
	
	if tx := entity.DB().Where("spa_id = ?", spa.ID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Deposit not found"})
		return
	}
	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&spa, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&service, service.ID).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your Spa registration successfully"})
}
