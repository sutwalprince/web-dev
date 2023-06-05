let db;
let dbOpenRequest = indexedDB.open("Galary",1);

dbOpenRequest.onupgradeneeded = function(e){
    db = e.target.result;
    // console.log(db);
    db.createObjectStore("Media" ,{keyPath : "mid"});

};
dbOpenRequest.onsuccess = function(e){
    // console.log("on success");
    db = e.target.result;
    fetchMedia();

    // console.log(db);
}

dbOpenRequest.onerror = function(e){
    console.log("on error");
} 


function fetchMedia(){
    let txnObject = db.transaction("Media","readonly");
    let mediaTable = txnObject.objectStore("Media");   

    let cursorObject = mediaTable.openCursor();

    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let mediaObject = cursor.value;
            if(mediaObject.type == "photo"){
                appendPhoto(mediaObject);
            }
            else{
                appendVideo(mediaObject);
            }
            // console.log(cursor.value);
            cursor.continue();
        }
    }
};

function appendPhoto(mediaObject){

    let mediadiv = document.createElement("div");
    mediadiv.classList.add("media-div");
    mediadiv.innerHTML = `
        <img class = "media-img" src = ${mediaObject.url} alt = "photo">
        <div class = "media-buttons">
            <div class = "download-media">Download</div>
            <div class = "delete-media">Delete</div>
        </div>
    `;
    mediadiv.querySelector(".download-media").addEventListener("click",()=>{
        downloadMedia(mediaObject);
    });
    mediadiv.querySelector(".delete-media").addEventListener("click",()=>{
        deleteMedia(mediaObject,mediadiv);
    });

    document.querySelector(".galary").append(mediadiv);

}


function appendVideo(mediaObject){

    let mediadiv = document.createElement("div");
    mediadiv.classList.add("media-div");
    mediadiv.innerHTML = `
        <video class = "media-video" src = ${URL.createObjectURL(mediaObject.url)} controls autoplay loop ></video>
        <div class = "media-buttons">
            <div class = "download-media">Download</div>
            <div class = "delete-media">Delete</div>
        </div>
    `;
    
    mediadiv.querySelector(".download-media").addEventListener("click",()=>{
        downloadMedia(mediaObject);
    });
    mediadiv.querySelector(".delete-media").addEventListener("click",()=>{
        deleteMedia(mediaObject,mediadiv);
    });

    document.querySelector(".galary").append(mediadiv);

}


function downloadMedia(mediaObject){

    let aTag = document.createElement("a");
        

    console.log("ggr");
    if(mediaObject.type == "photo"){
        aTag.download = `image${Date.now()}.jpg`;
        aTag.href = mediaObject.url;
    }
    else{
        aTag.download = `Video${Date.now()}.mp4`;
        aTag.href = URL.createObjectURL(mediaObject.url);
    }
    aTag.click();
 }

 function deleteMedia(mediaObject,mediadiv){
    let mid = mediaObject.mid;
    let txnObject = db.transaction("Media","readwrite");
    let mediaTable = txnObject.objectStore("Media");  
    mediaTable.delete(mid);

    mediadiv.remove();

 }