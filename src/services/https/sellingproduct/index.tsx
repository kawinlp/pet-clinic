import { ListInterface } from "../../../interfaces/IList";

const apiUrl = "https://api.torpetclinic.site";
// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem('token');
async function CreateList(data: ListInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/lists`, requestOptions)
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



async function GetListById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
  };

  let res = await fetch(`${apiUrl}/list/${id}`, requestOptions)
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

async function GetProductById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
  };

  let res = await fetch(`${apiUrl}/product/${id}`, requestOptions)
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

async function GetUnits() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/unitlists`, requestOptions)
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

async function GetLists(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/getlists/${id}`, requestOptions)
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

async function GetListsLatest(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  let res = await fetch(`${apiUrl}/listleast/${id}`, requestOptions)
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

async function GetProducts() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    };
  
    let res = await fetch(`${apiUrl}/products`, requestOptions)
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

  
  async function DeleteListByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };
  
    let res = await fetch(`${apiUrl}/list/${id}`, requestOptions)
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

  async function UpdateList(data: ListInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
                 "Authorization": `Bearer ${jwt}`, },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/list`, requestOptions)
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


export {CreateList,GetProducts,GetProductById,
        GetLists,GetUnits,GetListsLatest,DeleteListByID,UpdateList,GetListById};