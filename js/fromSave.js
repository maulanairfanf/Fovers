// document.addEventListener("DOMContentLoaded", function () {
//     var urlParams = new URLSearchParams(window.location.search);
//     var isFromSaved = urlParams.get("saved");
//     var btnBack = document.getElementById("back")
//     var btnSave = document.getElementById("add");
//     var btnDelete = document.getElementById("delete");

//     if (isFromSaved) {
//         btnBack.style.display = 'none';
//         btnSave.style.display = 'none';
//         getSavedCountryById();
//     } else {
//         var item = getLigaByName();
//         btnDelete.style.display = 'none';
//     }


//     btnSave.onclick = function () {
//         console.log(item);
//         console.log("Tombol add di klik.");
//         item.then(function (country) {

//             saveForLater(country)

//         })
//     }

//     btnDelete.onclick = function () {
//         console.log(item);
//         console.log("Tombol delete di klik.");
//         item.then(function (country) {

//                 Delete(country)

//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }
// });