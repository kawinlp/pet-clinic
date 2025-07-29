import { EmployeeInterface } from "./IEmployee";
export interface ProductInterface {
    ID?:    number;
	Name?:  string;
	Amount?: number;
	Price?: number;
	Date?: any;
	Lotwhat?: any;
	Expire?: any;
	Comment?: string;
	ProductTypeID?: number;
	ProductType?: ProductTypeInterface;
	EmployeeID?: number;
	Employee?: EmployeeInterface;
}

export interface ProductTypeInterface{
    ID?:    number;
    Name?:  string;
}

