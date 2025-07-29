import { ProductInterface } from "./IProduct"
import { VeterinarianInterface } from "./IVeterinarian"
import { PetInterface } from "./IPet"

export interface TreatmentInterface{
    ID?:  number;
    Date?: Date;
    Detail?: string;
    Recuperate?: number;
    Comment?: string;
    VeterinarianID?:number;
    CaseTID?: number;
    PetID?: number;
    MemberID?: number;
    ProductID?: number;
    Treatmentprice?: number; //treatment costs
    Totalprice?: number;
    

    Veterinarian?: VeterinarianInterface;
    CaseT?: CaseTInterface;  
    Pet?: PetInterface;
    Product?: ProductInterface
}

export interface ProductusedInterface{
    ProductID?: ProductInterface;

}

export interface CaseTInterface{
    ID?: number;
    Name?: string;
}

