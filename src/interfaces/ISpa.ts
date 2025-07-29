import { EmployeeInterface } from "./IEmployee";
export interface SpasInterface{
	ServiceDay?: Date;
	Picture?: string;
	Comment ?:string;
	Price?: number;
	PetID?:number;
	Pet?:PetInterface;
	EmployeeID?:number;
	Employee?:EmployeeInterface;
	SpaTypeID?:number;
	SpaType?:SpaTypeInterface;
	
}

export interface SpasInterfaceEdit{
    ID?: number;
	ServiceDay?: Date;
	Picture?: string;
	Comment ?:string;
	Price?: number;
	PetID?:number;
	Pet?:PetInterface;
	EmployeeID?:number;
	Employee?:EmployeeInterface;
	SpaTypeID?:number;
	SpaType?:SpaTypeInterface;
}

export interface MemberInterface {
    ID?: number
    FristName?: string
    LastName?: string
    Phone?: string
    Birthday?: Date
    HumanGenderID?: number
}

export interface PetInterface {
	ID?: number
	Name?: string
	PetGenderID?: number
	Weight?: number
	Birthday?: Date
	Allergic?: string
	Picture?: string
	PetTypeID?: number
	
	// FristName?: Member.FristName
	
	Member?: MemberInterface
	PetType?: PetTypeInterface
	PetGender?: PetGenderInterface
  }

export interface SpaDisplayInterface{
	ID?: number;
	ServiceDay?: Date;
	Picture?: string;
	Comment ?:string;
	Price?: number;
	MemberID?:number;
	PetID?:number;
	Pet?:PetInterface;
	EmployeeID?:number;
	Employee?:EmployeeInterface;
	SpaTypeID?:number;
	SpaType?:SpaTypeInterface;
	
}

export interface SpaTypeInterface{
	ID?: number;
	Type?: string;
	
}

export interface PetTypeInterface {
  ID?: number
  Name?: string
}

export interface PetGenderInterface {
  ID?: number
  Name?: string
}