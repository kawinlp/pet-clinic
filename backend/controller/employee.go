package controller

import (
	"fmt"
	"net/http"

	"github.com/G1J1/sut66/team04/entity"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CreateEmployee(c *gin.Context){
	var employee entity.Employee
	var au entity.Employee
	password :=c.Param("password")

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("passord: ",employee.Password)
	err := entity.DB().Raw("SELECT * FROM employees WHERE id = 1").Find(&au).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}else{
		err := bcrypt.CompareHashAndPassword([] byte(au.Password), []byte(password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error" : "คุณไม่ได้รับอนุญาตให้เพิ่มได้"})
			return
		}
	}
	hasPassword,err := bcrypt.GenerateFromPassword([]byte(employee.Password),14)
	if err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"err":"error hash password"})
	}


	u:=entity.Employee{
		FirstName: employee.FirstName,
		LastName:  employee.LastName,
		Telephone: employee.Telephone,
		Password: string(hasPassword),
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

func GetEmployeeByID(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

func GetELogin(c *gin.Context){
	employee_id :=c.Param("employee_id") 
	password :=c.Param("password")
	var employee entity.Employee

	err := entity.DB().Raw("SELECT * FROM employees WHERE employee_id = ?",employee_id).Find(&employee).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}else{
		if employee_id != employee.EmployeeID{
			c.JSON(http.StatusBadRequest, gin.H{"error": "Employee ID Not found"})
			return
		}else{
			if err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(password)); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
				return}
				c.JSON(http.StatusOK, gin.H{"data": employee})
				fmt.Println("employee")
				return
			}
	}
}