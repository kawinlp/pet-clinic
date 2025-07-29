import { RecieptInterface } from "../../../interfaces/IList";
// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.torpetclinic.site";
const jwt = localStorage.getItem('token');
async function CreateReciept(data: RecieptInterface) {
    const requestOptions = {
      method: "POST",
  
      headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
  
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/reciept`, requestOptions)
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

  async function GetRecieptLatest() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
  
    let res = await fetch(`${apiUrl}/reciepts`, requestOptions)
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

  async function GetRecieptAll() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
  
    let res = await fetch(`${apiUrl}/allreciepts`, requestOptions)
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

  // /reciept/:id
  async function GetRecieptByEmployeeId(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json",
                  "Authorization": `Bearer ${jwt}`, },
    };
  
    let res = await fetch(`${apiUrl}/reciept/${id}`, requestOptions)
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

  async function GetRecieptById(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json",
                  "Authorization": `Bearer ${jwt}`, },
    };
  
    let res = await fetch(`${apiUrl}/recieptproduct/${id}`, requestOptions)
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

  export {CreateReciept,GetRecieptLatest, GetRecieptByEmployeeId,GetRecieptById,GetRecieptAll}