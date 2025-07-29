import { DepositsInterface } from "../../../interfaces/IDeposit";
const jwt = localStorage.getItem('token');
const apiUrl = "http://localhost:8080" ;
// const apiUrl = "https://api.torpetclinic.site";
async function CreateDeposit(data: DepositsInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`, },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/deposit`, requestOptions)
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

  
  

  async function GetDepositList() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    };
    let res = await fetch(`${apiUrl}/depositdisplay`, requestOptions)
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

async function UpdateDeposit(data: DepositsInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json","Authorization": `Bearer ${jwt}`,},
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/UpdateDeposit`, requestOptions)
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

async function DeleteDeposit(id: Number | undefined) {
  const requestOptions = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json","Authorization": `Bearer ${jwt}`,
      },
  };
  let res = await fetch(`${apiUrl}/deposit/${id}`, requestOptions)
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
  CreateDeposit,
  GetDepositList,
  UpdateDeposit,
  DeleteDeposit,
};