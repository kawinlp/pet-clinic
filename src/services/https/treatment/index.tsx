import { TreatmentInterface } from "../../../interfaces/ITreatment";

// const apiUrl = "http://localhost:8080";

const apiUrl = "https://api.torpetclinic.site";

const jwt = localStorage.getItem("token");


async function GetTreatments() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/ListTreatment`, requestOptions)
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

async function GetVaccines() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetVaccine`, requestOptions)
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

async function GetCaseT() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetCaseTList`, requestOptions)
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

async function GetProductused() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetProductused`, requestOptions)
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

async function CreateTreatment(data: TreatmentInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/CreateTreatment`, requestOptions)
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

async function DeleteTreatmentByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  let res = await fetch(`${apiUrl}/DeleteTreatment/${id}`, requestOptions)
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

async function UpdateTreatment(data: TreatmentInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/UpdateTreatment`, requestOptions)
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

async function GetTreatmentById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetTreatmentFromID/${id}`, requestOptions)
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

async function GetTreatmentByPet(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/GetTreatmentFromPET/${id}`, requestOptions) //อันนี้ๆ
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
async function GetTreatmentEdit(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/treatment/edit/${id}`, requestOptions) //อันนี้ๆ
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

export {
  GetTreatments,
  GetCaseT,
  GetProductused,
  CreateTreatment,
  DeleteTreatmentByID,
  GetVaccines,
  UpdateTreatment,
  GetTreatmentById,
  GetTreatmentByPet,
  GetTreatmentEdit,
};
