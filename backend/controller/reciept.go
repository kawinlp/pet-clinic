package controller

import (
	"net/http"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

func CreateRecieptforproduct(c *gin.Context) {

	var reciept entity.Reciept
	var employee entity.Employee 
	
	if err := c.ShouldBindJSON(&reciept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if tx := entity.DB().Where("id = ?", reciept.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	_, err := govalidator.ValidateStruct(reciept)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var payfinished []entity.Payfinished
	subquery := entity.DB().Table("lists").Select("id").Where("employee_id = ?", reciept.EmployeeID)
	if tx := entity.DB().Where("reciept_id IS NULL AND list_id IN (?)",subquery).Preload("List").Find(&payfinished); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่มีรายการสินค้า"})
		return
	}

	var totalAmount float32
	var num int
	for _, item := range payfinished {
		totalAmount += float32(item.List.Totalprice)
		num +=1
	}
	if reciept.Totalprice != totalAmount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TotalPrice not match"})
		return
	}
	tx := entity.DB().Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		}
	}()
	u := entity.Reciept{
		Totalprice: reciept.Totalprice,
		Moneyreceived: reciept.Moneyreceived,
		Change: reciept.Change,
		Date: time.Now().Local(),
		AmountProduct:num,
		Employee: employee,
	}
	if err := tx.Create(&u).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
		}

	for _, pf := range payfinished {
		if err := tx.Model(&pf).Update("reciept_id", u.ID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update payfinished items"})
			return
		}}
	// if err := entity.DB().Model(&payfinished).Update("reciept_id", u.ID).Error; err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return}
	// if err := tx.Model(&payfinished).Update("reciept_id", u.ID).Error; err != nil {
	// 	tx.Rollback()
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update payfinished items"})
	// 	return
	// }
	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"data": u})
}
	

func Recieptsforproduct(c *gin.Context){
	var payfinished []entity.Payfinished
	
	subquery := entity.DB().Table("payfinisheds").Select("MAX(reciept_id)")
	if err := entity.DB().Where("reciept_id IN (?)", subquery).Preload("Reciept.Employee").Preload("List.Product").Preload(clause.Associations).Find(&payfinished).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payfinished})
}

func GetRecieptProduct(c *gin.Context){
	id := c.Param("id")
	var reciepts []entity.Reciept
    if err := entity.DB().Where("employee_id = ?", id).Order("id DESC").Preload("Employee").Find(&reciepts).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
   
	c.JSON(http.StatusOK, gin.H{"data": reciepts})
}

func GetAllRecieptProduct(c *gin.Context){
	var reciepts []entity.Reciept
    if err := entity.DB().Order("id DESC").Preload("Employee").Find(&reciepts).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	c.JSON(http.StatusOK, gin.H{"data": reciepts})
}

func GetProductReciepts(c *gin.Context){
	var payfinished []entity.Payfinished
	id := c.Param("id")
	if err := entity.DB().Where("reciept_id IN (?)", id).Preload("Reciept.Employee").Preload("List.Product").Preload(clause.Associations).Find(&payfinished).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payfinished})
}

