const base_url_areas = "http://api.football-data.org/v2/areas/";
const base_url_liga = "https://api.football-data.org/v2/competitions?areas="
const base_url_team = "https://api.football-data.org/v2/competitions/"

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
    return new Promise(function (resolve, reject) {



        if ('caches' in window) {
            caches.match(base_url_areas).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        var countryHTML = "";
                        data.areas.forEach(function (country) {
                            countryHTML += `
                            <div class="col s12 m6 l4">
                        <a href="./liga.html?id=${country.id}">
                        <div class="country-name black-text">${country.name}<i class="material-icons right">details</i></div>
                        </a>
                        </div>
                        `
                        })
                        document.getElementById("country").innerHTML = countryHTML;
                        resolve(data)
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
                var countryHTML = "";
                data.areas.forEach(function (country) {
                    countryHTML += `
                    <div class="col s12 m6 l4">
                    <a href="./liga.html?id=${country.id}">
                    <div class="country-name black-text">${country.name}<i class="material-icons right">details</i></div>
                    </a>
                    </div>
            `
                })
                document.getElementById("country").innerHTML = countryHTML;
                resolve(data)
                remove();
            }).catch(error);
    })
}


function getLigaByName() {
    return new Promise(function (resolve, reject) {


        var urlParamsLiga = new URLSearchParams(window.location.search);
        var ParentAreaIdParam = urlParamsLiga.get("id");

        if ('caches' in window) {
            caches.match(base_url_liga + ParentAreaIdParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        var countryHTML = ""
                        data.competitions.forEach(function (liga) {
                            countryHTML += `
                            <div class="col s12 m6 l4">
                            <a href="./team.html?id=${liga.id}">
                            <div class="country-name black-text">${liga.name}<i class="material-icons right">details</i></div>
                            </a>
                            </div>
                            `
                        })
                        document.getElementById("body-render-liga").innerHTML = countryHTML;
                        resolve(data)
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
                var countryHTML = ""
                data.competitions.forEach(function (liga) {
                    countryHTML += `
                    <div class="col s12 m6 l4">
                    <a href="./team.html?id=${liga.id}">
                    <div class="country-name black-text">${liga.name}<i class="material-icons right">details</i></div>
                    </a>
                    </div>
                    `
                })
                document.getElementById("body-render-liga").innerHTML = countryHTML;
                resolve(data)
                remove();
            }).catch(function (error) {
                console.log(error);
            });
    })
}


function getTeams() {
    return new Promise(function (resolve, reject) {


        var urlParamsLiga = new URLSearchParams(window.location.search);
        var ParentLigaIdParam = urlParamsLiga.get("id");

        if ('caches' in window) {
            caches.match(base_url_team + ParentLigaIdParam + "/standings").then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        var teamHTML = ""
                        data.standings[0].table.forEach(function (team) {
                            teamHTML += `
                      <tr>
                        <td>${team.position}</td>
                        <td class="valign-wrapper center-align">
                        
                            <img alt="${team.team.name}" src="${team.team.crestUrl}" class="responsive-img">
                            <span>${team.team.name}</span>
                        </td>
                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                      </tr>
                    `
                        })
                        document.getElementById("body-render-team").innerHTML = teamHTML;
                        resolve(data)

                    })
                }
            })
        }

        fetch(base_url_team + ParentLigaIdParam + "/standings", {
                method: "GET",
                withCredentials: true,

                headers: {
                    "X-Auth-Token": "75ef90f669f94902b8d8408d3cd4289c"
                }
            })
            .then(status)
            .then(json)
            .then(function (data) {
                var teamHTML = ""
                data.standings[0].table.forEach(function (team) {
                    teamHTML += `
                      <tr>
                        <td>${team.position}</td>
                        <td class="valign-wrapper center-align">
                        
                            <img alt="${team.team.name}" src="${team.team.crestUrl}" class="responsive-img">
                            <span>${team.team.name}</span>
                        </td>
                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                      </tr>
                    `
                })
                document.getElementById("body-render-team").innerHTML = teamHTML;
                resolve(data);
                remove();
            }).catch(function (error) {
                console.log(error);
            });
        var buttonHTML = `
            <a class="waves-effect waves-light btn" id="button-team" onclick="window.history.back()">
                <i class="material-icons left">arrow_back</i>Back
            </a>
            `
        document.getElementById("body-render-button").innerHTML = buttonHTML;

    })

}



function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("countrys", "readonly");
                var store = tx.objectStore("countrys");
                return store.getAll();
            })
            .then(function (countrys) {
                resolve(countrys);
            })
    })
}

function getSavedCountrys() {
    getAll().then(function (countrys) {
        var countryHTML = "";
        countrys.forEach(function (country) {
            countryHTML += `
            <div class="col s12 m6 l4">
                <a href="./liga.html?id=${country.competitions[0].area.id}&saved=true">
                <div class="country-name black-text">${country.competitions[0].area.name}<i class="material-icons right">details</i></div>
                </a>
                </div>
                
                `
        });

        document.getElementById("country-saved").innerHTML = countryHTML;
        remove();

    })
}

function getSavedCountryById() {
    var urlParamsLiga = new URLSearchParams(window.location.search);
    var idParam = urlParamsLiga.get("id");

    getById(parseInt(idParam)).then(function (country) {
        var countryHTML = ""
        country.competitions.forEach(function (liga) {
            countryHTML +=
                `
                <div class="col s12 m6 l4">
                    <a href="./team.html?id=${liga.id}">
                        <div class="country-name black-text">${liga.name}<i class="material-icons right">details</i></div>
                    </a>
                </div>
            `
        })
        document.getElementById("body-render-liga").innerHTML = countryHTML;

    })
    remove();
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("countrys", "readonly");
                var store = tx.objectStore("countrys");
                return store.get(id);
            })
            .then(function (country) {
                resolve(country);
            })
            .catch(function (error) {
                console.log(error);
            })
    });
}

function remove() {
    const loader = document.getElementById("loader");
    loader.remove();
}