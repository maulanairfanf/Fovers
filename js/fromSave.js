document.addEventListener("DOMContentLoaded", function () {

    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var idParam = urlParams.get("id");
    var btnBack = document.getElementById("back")
    var btnSave = document.getElementById("add");
    var btnDelete = document.getElementById("delete");
    var btnFavorite = document.getElementById("btnBackFavorite");

    if (isFromSaved) {
        btnBack.style.display = 'none';
        btnSave.style.display = 'none';
        getSavedCountryById();
    } else {
        var item = getLigaByName();
        btnFavorite.style.display = 'none';
        btnDelete.style.display = 'none';
    }

    btnSave.onclick = function () {
        item.then(function (country) {

            saveForLater(country)

        })
    }

    btnDelete.onclick = function () {
        Delete(parseInt(idParam));
    }



});