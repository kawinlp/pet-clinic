import { MemberInterface } from "./IMember"


export interface PetTypeInterface {
  ID?: number
  Name?: string
}

export interface PetGenderInterface {
  ID?: number
  Name?: string
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
  MemberID?: number
  // FristName?: Member.FristName
  
  Member?: MemberInterface
  PetType?: PetTypeInterface
  PetGender?: PetGenderInterface
}
