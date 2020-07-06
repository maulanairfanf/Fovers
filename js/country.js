var base_url_areas = "http://api.football-data.org/v2/areas/";
var base_url_liga = "https://api.football-data.org/v2/competitions?areas="

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


function getCountrys() {
    fetch(base_url_areas, {
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
            <a href="./country.html?id=${country.id}">
            <div class="country-name black-text">${country.name}<i class="material-icons right">details</i></div>
            </a>
            `
            })
            document.getElementById("country").innerHTML = countryHTML;
        }).catch(error);
}

function getCountrysByName() {
    var urlParams = new URLSearchParams(window.location.search);
    var ParentAreaIdParam = urlParams.get("id");

    fetch(base_url_liga + ParentAreaIdParam, {
            method: "GET",
            withCredentials: true,
            headers: {
                "X-Auth-Token": "75ef90f669f94902b8d8408d3cd4289c"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log(data);
            var countryHTML = ""
            data.competitions.forEach(function (liga) {
                countryHTML += `
            <div class="country-name black-text">${liga.name}<i class="material-icons right">details</i></div>
        `
            })
            document.getElementById("body-render").innerHTML = countryHTML;
        })
}