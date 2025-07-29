import { VeterinarianInterface } from "./IVeterinarian"
import { PetInterface } from "./IPet"
import { MemberInterface } from "./IMember"
import { EmployeeInterface } from "./IEmployee";

export interface AppointmentInterface{
    ID?:  number;
    Appointment_in_date?: Date;
    Appointment_date?: Date;
    Status?: string;
    VeterinarianID?:number;
    EmployeeID?: number;
    PetID?: number;
    MemberID?: number;
    

    Veterinarian?: VeterinarianInterface;

    Pet?: PetInterface;

    Member?: MemberInterface;

    Employee?: EmployeeInterface;

}

