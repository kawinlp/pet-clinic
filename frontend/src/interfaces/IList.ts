import { EmployeeInterface } from "./IEmployee"
import { ProductInterface } from "./IProduct"

export interface ListInterface{
    ID?:number
    Amount?:number
	Totalprice?:number
	Date?:Date
	ProductID?:number
	Product?:ProductInterface
	UnitListID?:number
	UnitList?:UnitListInterface
	EmployeeID ?: number
	Employee?: EmployeeInterface
}

export interface UnitListInterface {
	ID?: number,
	Name?:string,
}

 export interface RecieptInterface {
	ID?: number,
 	Totalprice?: number
 	Moneyreceived ?: number
 	Change?: number
	Date?: any
	AmountProduct?:number
	EmployeeID ?: number
	Employee?: EmployeeInterface
 }

export interface PayfinishInterface {
	ID? : number,
	ListID? : number,
	List?: ListInterface,
	RecieptID?: number,
	Reciept? : RecieptInterface
}