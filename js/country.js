var base_url = "http://api.football-data.org/v2/areas";

function status(response) {
    if (response.status !== 200) {
        console.log("error : " + response.status)
        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("error :  " + error)
}

fetch(base_url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "X-Auth-Token": "75ef90f669f94902b8d8408d3cd4289c"
        }
    })
    .then(status)
    .then(json)
    .then(function (data) {
        var countryHTML = "";
        data.areas.forEach(function (country) {
            countryHTML += `
            <div class="country-name">${country.name}<i class="material-icons right">details</i></div>
        `
        })
        document.getElementById("country").innerHTML = countryHTML;
    }).catch(error);