package controller

import (
	"net/http"
	"time"
	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	// "gorm.io/gorm/clause"
)

func CreateList(c *gin.Context) {

	var list entity.List
	var employee entity.Employee 
	var unit entity.UnitList
	var product entity.Product
	var exitpay entity.Payfinished
	
	if err := c.ShouldBindJSON(&list); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	// if tx := entity.DB().Where("id = ?", list.EmployeeID).First(&employee); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
	// 	return
	// }
	
	// if tx := entity.DB().Where("id = ?", list.UnitListID).First(&unit); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Unit not found"})
	// 	return
	// }
	
	// if tx := entity.DB().Where("id = ?", list.ProductID).First(&product); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Product not found"})
	// 	return
	// }
//this is validate
	_, err := govalidator.ValidateStruct(list)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	entity.DB().First(&employee, list.EmployeeID)
	if employee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
		return
	}

	entity.DB().First(&product, list.ProductID)
	if product.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	entity.DB().First(&unit, list.UnitListID)
	if unit.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Unit not found"})
		return
	}

	if((product.Amount-list.Amount)<0){
		c.JSON(http.StatusBadRequest, gin.H{"error": "จำนวนที่กรอกมากกว่าจำนวนสินค้าที่มีอยู่"})
		return
	}
	if(list.Totalprice != (float32(list.Amount)*product.Price)){
		c.JSON(http.StatusBadRequest, gin.H{"error": "ราคาไม่ถูกต้อง"})
		return
	}

	subquery := entity.DB().Table("lists").Select("id").Where("product_id = ? AND employee_id = ?", product.ID,list.EmployeeID)
	if err := entity.DB().Where("reciept_id IS NULL AND list_id IN (?)",subquery).First(&exitpay).Error;err == nil{
	c.JSON(http.StatusBadRequest, gin.H{"error":"สินค้านี้มีอยู่ในรายการสินค้าแล้ว"})
	return}
	
	u := entity.List{
		Amount: list.Amount,
		Totalprice: list.Totalprice,
		Date: list.Date.Local().Add(time.Now().Sub(list.Date)),
		Product: product,
		Employee: employee,
		UnitList: unit,
	}

	if err := entity.DB().Model(&product).Update("amount",product.Amount - u.Amount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&u).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

	pay := entity.Payfinished{
		ListID: &u.ID,
	}
	if err := entity.DB().Create(&pay).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}
}
//get by id
func GetListByID(c *gin.Context) {
	var list entity.List
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Product").Preload("UnitList").Raw("SELECT * FROM lists WHERE id = ?", id).Find(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

func GetLists(c *gin.Context){
	var payfinished []entity.Payfinished
	id := c.Param("id")
	var listIDs []int
    if err := entity.DB().Model(&entity.List{}).Where("employee_id = ?", id).Pluck("id", &listIDs).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if len(listIDs) > 0 {
        if err := entity.DB().Where("reciept_id IS NULL AND list_id IN (?)", listIDs).
            Preload("List.Product").
            Preload("List.UnitList").
            Find(&payfinished).Error; err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
    }
	c.JSON(http.StatusOK, gin.H{"data": payfinished})
}

func ListDESC(c *gin.Context){
	id := c.Param("id")
	var list entity.Payfinished
	var listIDs []int
    if err := entity.DB().Model(&entity.List{}).Where("employee_id = ?", id).Pluck("id", &listIDs).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	if err := entity.DB().Where("reciept_id IS NULL AND list_id IN (?)", listIDs).Order("list_id DESC").
	Preload("List.Product").Preload("List.UnitList").First(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	
	c.JSON(http.StatusOK, gin.H{"data": list})
}

func UnitLists(c *gin.Context) { 

	var unitlists []entity.UnitList

	if err := entity.DB().Raw("SELECT * FROM unit_lists").Scan(&unitlists).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	c.JSON(http.StatusOK, gin.H{"data": unitlists})
}

func DeleteList(c *gin.Context) {
	id := c.Param("id")

	var listAmount int
	entity.DB().Raw("SELECT amount FROM lists WHERE id = ?", id).Scan(&listAmount)

	var productID int
	entity.DB().Raw("SELECT product_id FROM lists WHERE id = ?", id).Scan(&productID)

	var productAmount int
	entity.DB().Raw("SELECT amount FROM products WHERE id = ?", productID).Scan(&productAmount)


	newProductAmount := productAmount + listAmount
	if tx := entity.DB().Exec("UPDATE products SET amount = ? WHERE id = ?", newProductAmount, productID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cant't update amount in product"})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM payfinisheds WHERE list_id = ?",id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list in pay not found"})
	}
	
	if tx := entity.DB().Exec("DELETE FROM lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateList(c *gin.Context) {
	var list entity.List
	var result entity.List
	var product entity.Product
	var employee entity.Employee

	if err := c.ShouldBindJSON(&list); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", list.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}
	if tx := entity.DB().Where("id = ?",list.ProductID).First(&product); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found product"})
	}

	if tx := entity.DB().Where("id = ?",list.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
	}

	_, err := govalidator.ValidateStruct(list)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if (result.Amount != list.Amount){
		if(result.Totalprice != (float32(result.Amount) * product.Price)){
			c.JSON(http.StatusBadRequest, gin.H{"error": "ราคาไม่ถูกต้อง"})
		return
		}

		if (list.Amount>product.Amount) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "จำนวนที่กรอกมากกว่าจำนวนสินค้าที่มีอยู่"})
		return
		}else{
			sub:= result.Amount - list.Amount;
			if tx := entity.DB().Exec("UPDATE products SET amount = amount + ? WHERE id = ?", sub, list.ProductID); tx.RowsAffected == 0 {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Cant't update amount in product"})
				return
			}
	}
	}
	
	list.Date = time.Now().Local()
	if err := entity.DB().Save(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}