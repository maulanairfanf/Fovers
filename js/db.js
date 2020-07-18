var dbPromised = idb.open("Football-Data", 1, function (upgradeDb) {
  var countryObjectStore = upgradeDb.createObjectStore("countrys");
  countryObjectStore.createIndex("liga", "liga", {
    unique: false
  });
});


function saveForLater(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("countrys", "readwrite");
      var store = tx.objectStore("countrys");
      console.log(data);
      store.put(data, data.competitions[0].area.id);
      return tx.complete;
    })
    .then(function () {
      console.log("country berhasil di simpan.");
    });
}

function Delete(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("countrys", "readwrite");
      var store = tx.objectStore("countrys");
      console.log(data);
      store.delete(data);
      return tx.complete;
    })
    .then(function () {
      console.log("country berhasil di hapus.");
    })
}