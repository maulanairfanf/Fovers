const dbPromised = idb.open("Football-Data", 1, function (upgradeDb) {
  const countryObjectStore = upgradeDb.createObjectStore("countrys");
  countryObjectStore.createIndex("liga", "liga", {
    unique: false
  });
});


function saveForLater(data) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("countrys", "readwrite");
      const store = tx.objectStore("countrys");
      console.log(data);
      store.put(data, data.competitions[0].area.id);
      return tx.complete;
    })
    .then(function () {
      M.toast({html: 'Berhasil Add to Favorite'})
      console.log("country berhasil di simpan.");
    });
}

function Delete(data) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("countrys", "readwrite");
      const store = tx.objectStore("countrys");
      console.log(data);
      store.delete(data);
      return tx.complete;
    })
    .then(function () {
      M.toast({html: 'Berhasil Delete'})
      console.log("country berhasil di hapus.");
    })
}