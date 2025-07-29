package controller


import (
	"net/http"
	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"	
	"gorm.io/gorm/clause"
)

func CreateDeposit (c *gin.Context){
	var deposit entity.Deposit
	var pet entity.Pet 
	var member entity.Member
	var employee entity.Employee
	

	
	if err := c.ShouldBindJSON(&deposit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err := govalidator.ValidateStruct(deposit)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", deposit.PetID).First(&pet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Pet not found"})
		return
	}


	if tx := entity.DB().Where("id = ?", pet.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", deposit.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	u := entity.Deposit{
		Price: deposit.Price,
		Comment: deposit.Comment,	
		Checkin: deposit.Checkin,
		Checkout: deposit.Checkout,
		Pet: pet,	
		Employee: employee,
		
	}


	{
	if err := entity.DB().Create(&u).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": deposit})
	}	



	sr := entity.Service{
		Member: member,
		DepositID: &u.ID,
		
	}

	// บันทึก
	if err := entity.DB().Create(&sr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	

	
}


func GetAllDeposit(c *gin.Context) {
	// create variable for store data as type of User array
	var deposit []entity.Deposit

	// get data form database and check error
	if err := entity.DB().Preload("Pet.Member").Find(&deposit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": deposit})
}

	//"/UpdateSpa"
func UpdateDeposit(c *gin.Context) {
	var deposit entity.Deposit
	var result entity.Deposit

	if err := c.ShouldBindJSON(&deposit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา deposit ด้วย id
	if tx := entity.DB().Where("id = ?", deposit.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Deposit not found"})
		return
	}

	if err := entity.DB().Model(&result).Select("Checkin","Checkout","Comment","Price","PetID").Updates(entity.Deposit{Checkin:deposit.Checkin,Checkout:deposit.Checkout,Comment:deposit.Comment,Price:deposit.Price,PetID:deposit.PetID,}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": deposit})
}



func DeleteDeposit(c *gin.Context) {
	
	var deposit entity.Deposit
	var service entity.Service

	// get id from url
	id := c.Param("id")

	if tx := entity.DB().Where("deposit_id = ?", deposit.ID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Deposit not found"})
		return
	}
	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&deposit, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&service, service.ID).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your Deposit registration successfully"})
}
