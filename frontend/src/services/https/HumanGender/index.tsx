const apiUrl = "https://api.torpetclinic.site";
// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem('token');

async function GetHumanGenderList() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`, },
    };

    let res = await fetch(`${apiUrl}/GetHumanGenderList`, requestOptions)
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
    GetHumanGenderList
};