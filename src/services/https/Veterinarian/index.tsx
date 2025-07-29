import { VeterinarianInterface } from "../../../interfaces/IVeterinarian";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://www.torpetclinic.site";

const jwt = localStorage.getItem('token');

async function CreateVeterinarian(data: VeterinarianInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/CreateVeterinarian`, requestOptions)
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

async function GetVeterinarianList() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/GetVeterinarianList`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;

            }
        });
    return res;
}

async function GetProfessionList() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/GetProfessionList`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;

            }
        });
    return res;
}

async function GetSpecialtiesList() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/GetSpecialtiesList`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;

            }
        });
    return res;
}

async function GetVeterinarianFromID(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/GetVeterinarianFromID/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;

            }
        });
    return res;
}

async function DeleteVeterinarian(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
    let res = await fetch(`${apiUrl}/DeleteVeterinarian/${id}`, requestOptions)
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

async function UpdateVeterinarian(data: VeterinarianInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/UpdateVeterinarian`, requestOptions)
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
  

export {
    CreateVeterinarian,
    GetProfessionList,
    GetSpecialtiesList,
    GetVeterinarianList,
    GetVeterinarianFromID,
    DeleteVeterinarian,
    UpdateVeterinarian,
};