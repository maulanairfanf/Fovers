var dbPromised = idb.open("country", 1, function (upgradeDb) {
  var countryObjectStore = upgradeDb.createObjectStore("country", {
    keyPath: "ID"
  });
  countryObjectStore.createIndex("post_title", "post_title", {
    unique: false
  });
});

function saveForLater(country) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("country", "readwrite");
      var store = tx.objectStore("country");
      console.log(country);
      store.add(country.competitions);
      return tx.complete;
    })
    .then(function () {
      console.log("Artikel berhasil di simpan.");
    });
}