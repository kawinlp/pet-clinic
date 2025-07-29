package controller

import (
	"net/http"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

func ListProducts(c *gin.Context) { 

	var products []entity.Product

	if err := entity.DB().Preload(clause.Associations).Find(&products).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": products})

}


func GetProductByID(c *gin.Context) {
	var producut entity.Product
	id := c.Param("id")
	if err := entity.DB().Preload("ProductType").Raw("SELECT * FROM products WHERE id = ?", id).Find(&producut).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": producut})
}