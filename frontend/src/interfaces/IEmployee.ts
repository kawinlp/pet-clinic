export interface EmployeeInterface{
    ID?:    number;
	EmployeeID: string;
    FirstName?: string;
    LastName?: string;
	Telephone?: string;
	Password?:  string;
}
export interface LoginInterface {
    EmployeeID?: string;
    Password?: string;
}