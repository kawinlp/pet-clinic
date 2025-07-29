import {  PetInterface  } from "../interfaces/IPet";
export interface DepositsInterface{
	Checkin?: Date
	Checkout?: Date
    Comment ?:string
	Price?: number
	MemberID?:number
	PetID?:number
	Pet?: PetInterface
	EmployeeID?:number
}
//Picture?: string; ต้องอยู่ใน pet อันนี้ใส่ใาtestเฉยๆ
export interface DepositsDisplayInterface{
    ID?: number
	Checkin?: Date
	Checkout?: Date
    Comment ?:string
	Price?: number
	EmployeeID?:number
	PetID?:number
	Pet?:PetInterface
}



