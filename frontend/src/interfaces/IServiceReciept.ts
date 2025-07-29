import { EmployeeInterface } from "./IEmployee";

export interface ServiceRecieptInterface {
    ID?:            number;
    TotalPrice?:    number;
    Received?:      number;
    Change?:        number;
    PurchasedDate?: Date;
    EmployeeID?: 	number;
	Employee?: 	    EmployeeInterface; 
}