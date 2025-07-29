package main

import (
	// "net/http"

	"github.com/G1J1/sut66/team04/controller"
	"github.com/G1J1/sut66/team04/entity"
	"github.com/G1J1/sut66/team04/middlewares"
	"github.com/gin-gonic/gin"
)
const PORT = "8080"

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/login",controller.Login)
	r.POST("/employees/:password",controller.CreateEmployee)
	router := r.Group("")
	{
		router.Use(middlewares.Authorizes())
		{
			router.GET("/employee/:id",controller.GetEmployeeByID)

			router.GET("/members", controller.ListMembers)  // ปาม: แสดงสมาชิก
			router.GET("/petMember/:id", controller.GetPetByMember) //ปาม: แสดง member: id member
			router.GET("/member/:id", controller.GetMember) //ปาม: แสดง member: id member
			router.PATCH("/member", controller.UpdateMember)     // ปาม:  update member
			router.DELETE("/member/:id", controller.DeleteMember) // ปาม: delete สมาชิก
			router.POST("/member", controller.CreateMember) // ปาม:  สร้างสมาชิก
			
			router.GET("/pets", controller.ListPets)        // ปาม: แสดงสัตว์เลี้ยง
			router.GET("/pet/:id", controller.GetPet)       // ปาม: แสดงสัตว์เลี้ยง: id member
			router.GET("/pgenders", controller.ListGenders) // ปาม: แสดง gender
			router.GET("/ptypes", controller.ListPetTypes)  // ปาม: แสดง pettype
			router.POST("/pet", controller.CreatePet)       // ปาม:  สร้างสัตว์เลี้ยง
			router.PATCH("/pets", controller.UpdatePet)     // ปาม:  update สัตว์เลี้ยง
			router.DELETE("/pet/:id", controller.DeletePet) // ปาม:  delete สัตว์เลี้ยง

			// Services Routes แมค
			router.POST("CreateServiceReciept/:id", controller.CreateServiceReciept)
			router.GET("/GetNonPurchaseServiceFromMemberID/:id", controller.GetNonPurchaseServiceFromMemberID)
			router.GET("/ListServiceReciept", controller.ListServiceReciept)
			router.GET("/ListServiceFromRecieptID/:id", controller.ListServiceFromRecieptID)
	
			// Treatment เต้
			router.POST("/CreateTreatment", controller.CreateTreatment)
			router.GET("/GetTreatmentList", controller.ListTreatment)
			router.GET("/GetCaseTList", controller.ListCaseT)
			router.GET("/GetProductusedList", controller.ListProductused)
			router.GET("/GetTreatmentFromID/:id", controller.GetTreatmentFromID)
			router.GET("/GetTreatmentFromPET/:id", controller.GetTreatmentFromIDpet)
			router.GET("/treatment/edit/:id", controller.GetTreatmentFromIDP)
			router.DELETE("/DeleteTreatment/:id", controller.DeleteTreatment)
			router.GET("/GetVaccine", controller.ListVaacine)
			router.PATCH("/UpdateTreatment", controller.UpdateTreatment)
			//got
			r.POST("/spas/:id", controller.CreateSpas)
			r.POST("/deposit", controller.CreateDeposit)
				
			r.GET("/identify/:phone", controller.GetMemberbyphone)
			r.GET("/spas/:MemberID", controller.GetPetbyMemberID)
			r.GET("/Spasdisplay", controller.GetAllSpa)
			r.GET("/depositdisplay", controller.GetAllDeposit)

			r.DELETE("/spa/:id",controller.DeleteSpa)
			r.DELETE("/deposit/:id",controller.DeleteDeposit)
				
			r.PATCH("/UpdateSpa", controller.UpdateSpa)
			r.PATCH("/UpdateDeposit", controller.UpdateDeposit)

			// Veterinarian Routes แมค
			router.POST("CreateVeterinarian", controller.CreateVeterinarian)
			router.GET("/GetVeterinarianList", controller.ListVeterinarian)
			router.GET("/GetHumanGenderList", controller.ListHumanGender)
			router.GET("/GetProfessionList", controller.ListProfession)
			router.GET("/GetSpecialtiesList", controller.ListSpecialties)
			router.GET("/GetVeterinarianFromID/:id", controller.GetVeterinarianFromID)
			router.DELETE("/DeleteVeterinarian/:id", controller.DeleteVeterinarian)
			router.PATCH("/UpdateVeterinarian", controller.UpdateVeterinarian)


			router.GET("/products", controller.ListProducts)          //พราว:แสดงสินค้า
			router.GET("/getlists/:id", controller.GetLists)              //พราว
			router.GET("/unitlists", controller.UnitLists)             //พราว
			router.POST("/lists", controller.CreateList)              //พราว

			router.POST("/reciept", controller.CreateRecieptforproduct)         //พราว
			router.GET("/reciepts", controller.Recieptsforproduct)          //พราว
			router.GET("/listleast/:id", controller.ListDESC)			//พราว

			router.PATCH("/list",controller.UpdateList) 					//พราว
			router.DELETE("/list/:id",controller.DeleteList)            //พราว
			router.GET("/list/:id",controller.GetListByID)	
			router.GET("/product/:id",controller.GetProductByID)	//พราว
			router.GET("/reciept/:id",controller.GetRecieptProduct)		//พราว
			router.GET("/recieptproduct/:id",controller.GetProductReciepts)		//พราว
			
			router.POST("/appointment", controller.CreateAppointment)  //เต้
			router.GET("/GetAppointmentFromID/:id", controller.GetAppointmentFromID)  //เต้
			router.DELETE("/DeleteAppointment/:id", controller.DeleteAppointment) //เต้
			router.GET("/AppointmentList", controller.ListAppointment) //เต้
			router.GET("/EmpList", controller.ListEmployee)//เต้
			router.PATCH("/UpdateAppointment", controller.UpdateAppointment)//เต้
			
			router.GET("/allreciepts",controller.GetAllRecieptProduct)

		}
	}
	// "localhost" + PORT

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
