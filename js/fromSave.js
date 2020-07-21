document.addEventListener("DOMContentLoaded", function () {

    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var idParam = urlParams.get("id");
    var btnBack = document.getElementById("back")
    var btnSave = document.getElementById("add");
    var btnDelete = document.getElementById("delete");

    if (isFromSaved) {
        btnBack.style.display = 'none';
        btnSave.style.display = 'none';
        getSavedCountryById();
    } else {
        var item = getLigaByName();
        btnDelete.style.display = 'none';
    }

    btnSave.onclick = function () {
        console.log("Tombol add di klik.");
        item.then(function (country) {

            saveForLater(country)

        })
    }

    btnDelete.onclick = function () {

        console.log("Tombol delete d klik.");

        Delete(parseInt(idParam));
    }

});