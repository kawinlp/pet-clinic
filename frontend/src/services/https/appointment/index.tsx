import { AppointmentInterface } from "../../../interfaces/Iappointment";

const apiUrl = "https://api.torpetclinic.site";



// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem("token");

async function GetAppointment() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/AppointmentList`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetAppointmentById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetAppointmentFromID/${id}`, requestOptions)
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

async function CreateAppointment(data: AppointmentInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/appointment`, requestOptions)
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

async function DeleteAppointment(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };
  let res = await fetch(`${apiUrl}/DeleteAppointment/${id}`, requestOptions)
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

async function Getemplist() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/EmpList`, requestOptions)
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

async function UpdateAppointment(data: AppointmentInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/UpdateAppointment`, requestOptions)
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
  GetAppointment,
  CreateAppointment,
  DeleteAppointment,
  GetAppointmentById,
  Getemplist,
  UpdateAppointment,
};
