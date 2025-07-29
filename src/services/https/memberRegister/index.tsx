import { MemberInterface } from "../../../interfaces/IMember";

const apiUrl = "https://api.torpetclinic.site";
// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem('token');

async function CreateMember(data: MemberInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/member`, requestOptions)
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

async function GetMembers() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/members`, requestOptions)
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

async function GetMemberById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/member/${id}`, requestOptions)
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

async function DeleteMemberByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };

    let res = await fetch(`${apiUrl}/member/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.message) {
                return res.message;
            } else {
                return false;
            }
        });

    return res;
}

async function UpdateMember(data: MemberInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/member`, requestOptions)
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
    CreateMember,
    GetMembers,
    DeleteMemberByID,
    GetMemberById,
    UpdateMember,
}