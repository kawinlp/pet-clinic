package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/G1J1/sut66/team04/entity"
)

func CreateServiceReciept(c *gin.Context) {
	var employee entity.Employee
	var serviceReciept entity.ServiceReciept
	var services []entity.Service
	Mem_id := c.Param("id")

	//Bind เข้า JSON
	if err := c.ShouldBindJSON(&serviceReciept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//หา Entity employee
	if tx := entity.DB().Where("id = ?", serviceReciept.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(serviceReciept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("member_id = ? AND service_reciept_id IS NULL", Mem_id).Find(&services); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No Payfinish with empty RecieptID found"})
		return
	}

	// สร้าง User
	sr := entity.ServiceReciept{
		TotalPrice:    serviceReciept.TotalPrice,
		Received:      serviceReciept.Received,
		Change:        serviceReciept.Change,
		PurchasedDate: serviceReciept.PurchasedDate,
		Employee:      employee,
	}

	// บันทึก
	if err := entity.DB().Create(&sr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Model(&services).Update("service_reciept_id", sr.ID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Error updating services", "details": err.Error()})
        return
    }

	c.JSON(http.StatusOK, gin.H{"data": sr})
}

func GetNonPurchaseServiceFromMemberID(c *gin.Context) {
	var service []entity.Service
	Mem_id := c.Param("id")
	if err := entity.DB().Preload("Spa.Pet").Preload("Deposit.Pet").Preload("Treatment.Pet").Raw("SELECT * FROM services WHERE member_id = ? AND service_reciept_id IS NULL", Mem_id).Find(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}

func ListServiceReciept(c *gin.Context) {
	var serviceReciept []entity.ServiceReciept
	if err := entity.DB().Raw("SELECT * FROM service_reciepts").Find(&serviceReciept).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": serviceReciept})
} 

func ListServiceFromRecieptID(c *gin.Context) {
	var service []entity.Service
	Service_Reciept_ID := c.Param("id")
	if err := entity.DB().Preload("ServiceReciept.Employee").Preload("Spa.Pet").Preload("Deposit.Pet").Preload("Treatment.Pet").Raw("SELECT * FROM services WHERE service_reciept_id = ?", Service_Reciept_ID).Find(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": service})
}
