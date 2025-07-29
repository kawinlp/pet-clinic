import { ServiceRecieptInterface } from "../../../interfaces/IServiceReciept";

const apiUrl = "https://www.torpetclinic.site";
// const apiUrl = "http://localhost:8080"

const jwt = localStorage.getItem('token');

async function CreateServiceReciept(data: ServiceRecieptInterface,id: Number | undefined) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/CreateServiceReciept/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return { status: true, message: res.data };
            } else {
                return { status: false, message: res.error };
            }
        });
    return res;
}


async function GetNonPurchaseServiceFromMemberID(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/GetNonPurchaseServiceFromMemberID/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return (res.data);
            } else {
                return false;
            }
        });
    return res;
}

async function getServiceRecieptList() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/ListServiceReciept`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return (res.data);
            } else {
                return false;
            }
        });
    return res;
}

async function ListServiceFromRecieptID(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/ListServiceFromRecieptID/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return (res.data);
            } else {
                return false;
            }
        });
    return res;
}


export {
    GetNonPurchaseServiceFromMemberID,
    CreateServiceReciept,
    getServiceRecieptList,
    ListServiceFromRecieptID,
    
};