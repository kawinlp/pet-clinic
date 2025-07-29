import { EmployeeInterface } from "./IEmployee";
import { SubAttributeInterface } from "./ISubAttribute";

export interface VeterinarianInterface {
	ID?:              number;
    Name?:            string;
	Image?:           string;
	Birthday?:        Date;
	License?:         string;
	Tel?:             String;
	Salary?:          number;
	Working_Start?:   Date;
	Last_Modified?:   Date;
    HumanGenderID?:   number;
	HumanGender?: 	  SubAttributeInterface;
	ProfessionID?:    number;
	Profession?:      SubAttributeInterface;
	SpecialtiesID?:   number;
	Specialties?:     SubAttributeInterface;
	EmployeeID?: 	  number;
	Employee?: 	      EmployeeInterface; 
}
