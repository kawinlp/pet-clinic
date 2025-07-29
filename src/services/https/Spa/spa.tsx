import { floated } from "@material-tailwind/react/types/components/card";
import { SpasInterface } from "../../../interfaces/ISpa";

const jwt = localStorage.getItem('token');
const apiUrl = "http://localhost:8080" ;
// const apiUrl = "https://api.torpetclinic.site";
async function CreateSpas(data: SpasInterface,id: number | undefined) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`, },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/spas/${id}`, requestOptions)
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
  

  async function GetMemberbyphone(phone: string | undefined ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    };
  
    let res = await fetch(`${apiUrl}/identify/${phone}`, requestOptions)
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

  async function GetPetbyMemberID(MemberID: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    };
  
    let res = await fetch(`${apiUrl}/spas/${MemberID}`, requestOptions)
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

  async function GetSpaList() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };
    let res = await fetch(`${apiUrl}/Spasdisplay`, requestOptions)
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

async function UpdateSpa(data: SpasInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${jwt}`, },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/UpdateSpa`, requestOptions)
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

async function DeleteSpa(id: Number | undefined) {
  const requestOptions = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`,
      },
  };
  let res = await fetch(`${apiUrl}/spa/${id}`, requestOptions)
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
    CreateSpas,
    GetMemberbyphone,
    GetPetbyMemberID,
    GetSpaList,
    UpdateSpa,
    DeleteSpa,
  };