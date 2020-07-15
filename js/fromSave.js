// document.addEventListener("DOMContentLoaded", function () {
//     var urlParams = new URLSearchParams(window.location.search);
//     var isFromSaved = urlParams.get("saved");

//     var btnSave = document.getElementById("add");

//     if (isFromSaved){
//           btnSave.style.display = 'none';
//           getSavedCountryById();
//     }
//     else{
//           var item = getLigaByName();
//     }

  
//     btnSave.onclick = function () {
//           console.log("Tombol FAB di klik.");
//           item.then(function (country) {
                
//                 saveForLater(country)
               
//           })
//     }
// });