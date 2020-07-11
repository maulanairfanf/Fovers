var dbPromised = idb.open("Football-Data", 1, function (upgradeDb) {
  var countryObjectStore = upgradeDb.createObjectStore("countrys", {
    keyPath: "id"
  });
  countryObjectStore.createIndex("liga", "liga", {
    unique: false
  });
});


function saveForLater(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("countrys", "readwrite");
      var store = tx.objectStore("countrys");
      console.log(data.competitions);
      store.add(data.competitions);
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

