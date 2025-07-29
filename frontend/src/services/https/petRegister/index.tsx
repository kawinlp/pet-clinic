import { PetInterface } from "../../../interfaces/IPet";

const apiUrl = "https://api.torpetclinic.site";
// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem('token');

async function GetPets() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/pets`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetPetById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/pet/${id}`, requestOptions)
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

async function GetPetByMember(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/petMember/${id}`, requestOptions)
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

async function GetGenders() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/pgenders`, requestOptions)
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

async function GetPetTypes() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/ptypes`, requestOptions)
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

async function CreatePet(data: PetInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/pet`, requestOptions)
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

async function UpdatePet(data: PetInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/pets`, requestOptions)
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

async function DeletePetByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/pet/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.message) {
                return res.message;
            } else {
                return { status: false, message: res.error };
            }
        });

    return res;
}

export {
    GetPets,
    GetPetById,
    GetGenders,
    GetPetTypes,
    CreatePet,
    UpdatePet,
    DeletePetByID,
    GetPetByMember
}