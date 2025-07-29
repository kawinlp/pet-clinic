import { EmployeeInterface, LoginInterface } from "../../../interfaces/IEmployee";
// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.torpetclinic.site"; 
const jwt = localStorage.getItem('token');

async function Login(data: LoginInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/login`, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if(res.data) {
      console.log(res.status)
      return { status: true, message: res.data };
    }else {
      return { status: false, message: res.error };
    }
  });
  return res;
}


// async function EmployeeToLogin(data: LoginInterface) {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
        
//       },
//     };
//     let res = await fetch(
//       `${apiUrl}/login/${data.EmployeeID}/${data.Password}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return { status: true, message: res.data };
//         } else {
//           return { status: false, message: res.error };
//         }
//       })
//     return res;
// }

async function CreateEmployee(data: EmployeeInterface , password:string) {
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/employees/${password}`, requestOptions)
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

//แสดงพนักงารคนที่loginอยู่
async function GetEmployeeById(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    };
    let res = await fetch(`${apiUrl}/employee/${id}`, requestOptions)
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
export{GetEmployeeById,Login,CreateEmployee}