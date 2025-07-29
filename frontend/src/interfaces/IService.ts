import { MemberInterface } from "./IMember";
import { TreatmentInterface } from "./ITreatment";
import { SpasInterface } from "./ISpa";
import { DepositsInterface } from "./IDeposit";
import { ServiceRecieptInterface } from "./IServiceReciept";


export interface ServiceInterface {
    ID?: number;
    MemberID?: number;
    Member?: MemberInterface;
    TreatmentID?: number | null;
    Treatment?: TreatmentInterface;
    DepositID?: number | null;
    Deposit?: DepositsInterface;
    SpaID?: number | null;
    Spa?: SpasInterface;
    ServiceRecieptID?: number | null;
    ServiceReciept?: ServiceRecieptInterface;
}