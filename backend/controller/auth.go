package controller

import (
	"net/http"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/G1J1/sut66/team04/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	EmployeeID    string `json: "employeeid"`
	Password string `json: "password"`
}

type LoginResponse struct {
	Token string `json: "token"`
	ID    uint   `json: "id"`
}

func Login(c *gin.Context){
	var payload LoginPayload
	var employee entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}
	if payload.EmployeeID =="" && payload.Password =="" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณากรอกให้ครบ"})
		return
	}
	
	if err := entity.DB().Raw("SELECT * FROM employees WHERE employee_id = ?",payload.EmployeeID).Scan(&employee).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}

	if employee.ID ==0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบพนักงานในระบบ"})
		return
	}
	

	err := bcrypt.CompareHashAndPassword([] byte(employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}

	jwtWrapper := service.JwtWrapper{
		SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer: "AuthService",
		ExpirationHours: 24,
	}
	
	signedToken, err := jwtWrapper.GenerateToken(employee.EmployeeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error" : "error gen token"})
		return
	}
	
	tokenResponse := LoginResponse {
		Token: signedToken,
		ID: employee.ID,
	}
	c.JSON(http.StatusOK, gin.H{"data" : tokenResponse})

}