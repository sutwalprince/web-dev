let db;
let dbOpenRequest = indexedDB.open("Galary",1);

dbOpenRequest.onupgradeneeded = function(e){
    db = e.target.result;
    console.log(db);
    db.createObjectStore("Media" ,{keyPath : "mid"});

};
dbOpenRequest.onsuccess = function(e){
    console.log("on success");
    db = e.target.result;
    console.log(db);
}

dbOpenRequest.onerror = function(e){
    console.log("on error");
}