var base_url_areas = "http://api.football-data.org/v2/areas/";
var base_url_liga = "https://api.football-data.org/v2/competitions?areas="
// var base_url_team = "https://api.football-data.org/v2/competitions/"

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
    console.log("error :  " + error);
}


function getCountrys() {

    if ('caches' in window) {
        caches.match(base_url_areas).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var countryHTML = "";
                    data.areas.forEach(function (country) {
                        countryHTML += `
                        <a href="./liga.html?id=${country.id}">
                        <div class="country-name black-text">${country.name}<i class="material-icons right">details</i></div>
                        </a>
                        `
                    })
                    document.getElementById("country").innerHTML = countryHTML;
                })
            }
        })
    }

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

            console.log(data);
            var countryHTML = "";
            data.areas.forEach(function (country) {
                countryHTML += `
            <a href="./liga.html?id=${country.id}">
            <div class="country-name black-text">${country.name}<i class="material-icons right">details</i></div>
            </a>
            `
            })
            document.getElementById("country").innerHTML = countryHTML;
            remove();
        }).catch(error);
}

function remove() {
    var loader = document.getElementById("loader");
    loader.remove();
}

function getLigaByName() {
    var urlParamsLiga = new URLSearchParams(window.location.search);
    var ParentAreaIdParam = urlParamsLiga.get("id");

    if ('caches' in window) {
        caches.match(base_url_areas).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var country = `
                    <div class="center" id="negara"> ${data.competitions[0].area.name}</div>
                    <img class="responsive-img" id="bendera" alt="Flag"
                    src="${data.competitions[0].area.ensignUrl}">
                    `;
                    var countryHTML = ""
                    data.competitions.forEach(function (liga) {
                        countryHTML += `
                            <div class="card">
                                <div class="country-name black-text card-title">${liga.name}</div>
                                <div class="card-content">
                                <p class="">Start Season : ${liga.currentSeason.startDate}</p>
                                <p>End Season : ${liga.currentSeason.endDate}</p>
                                </div>
                            </div>
                            `
                    })
                    M.toast({
                        html: 'Succes To Fetch Data'
                    })
                    document.getElementById("body-render-liga").innerHTML = countryHTML;
                    document.getElementById("body-render-country-liga").innerHTML = country;
                })
            }
        })
    }

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
            var country = `
            <div class="center" id="negara"> ${data.competitions[0].area.name}</div>
            <img class="responsive-img" id="bendera" alt="Flag"
            src="${data.competitions[0].area.ensignUrl}">
            `;
            var countryHTML = ""
            data.competitions.forEach(function (liga) {
                countryHTML += `
                    <div class="card">
                        <div class="country-name black-text card-title">${liga.name}</div>
                        <div class="card-content">
                        <p class="">Start Season : ${liga.currentSeason.startDate}</p>
                        <p>End Season : ${liga.currentSeason.endDate}</p>
                        </div>
                    </div>
                    `
            })
            M.toast({
                html: 'Succes To Fetch Data'
            })
            document.getElementById("body-render-liga").innerHTML = countryHTML;
            document.getElementById("body-render-country-liga").innerHTML = country;
            remove();
        }).catch(function (error) {
            M.toast({
                html: 'Failed To Fetch Data'
            })
        });
}




// function getLigaByName() {
//     var urlParamsTeams = new URLSearchParams(window.location.search);
//     var ParentLigaIdParam = urlParamsTeams.get("id");

//     fetch(base_url_team + ParentLigaIdParam + "/standings", {
//             method: "GET",
//             withCredentials: true,
//             headers: {
//                 "X-Auth-Token": "75ef90f669f94902b8d8408d3cd4289c"
//             }
//         })
//         .then(status)
//         .then(json)
//         .then(function (data) {
//             console.log(data);
//             var LigaHTML = ""
//             data.standings.table.forEach(function (team) {
//                 LigaHTML += `
//             <div class="country-name black-text">${team.team.name}<i class="material-icons right">details</i></div>
//             `
//             })
//             document.getElementById("body-render-team").innerHTML = LigaHTML;
//         }).catch(error);
// }