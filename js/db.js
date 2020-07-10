var dbPromised = idb.open("countrys", 1, function (upgradeDb) {
  var countryObjectStore = upgradeDb.createObjectStore("countrys", {
    keyPath: "ID"
  });
  countryObjectStore.createIndex("liga", "country", {
    unique: false
  });
});


function saveForLater(country) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("countrys", "readwrite");
      var store = tx.objectStore("countrys");
      console.log(competitions.country);
      store.add(country.competitions);
      return tx.complete;
    })
    .then(function () {
      console.log("country berhasil di simpan.");
    });
}


// var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
//   var articlesObjectStore = upgradeDb.createObjectStore("articles", {
//     keyPath: "ID"
//   });
//   articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
// });

// function saveForLater(article) {
//   dbPromised
//     .then(function(db) {
//       var tx = db.transaction("articles", "readwrite");
//       var store = tx.objectStore("articles");
//       console.log(article);
//       store.add();
//       return tx.complete;
//     })
//     .then(function() {
//       console.log("Artikel berhasil di simpan.");
//     });
// }

