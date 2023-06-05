let videoElement = document.querySelector("video");
let recordButton = document.querySelector(".inner-record");
let capturePhoto = document.querySelector(".inner-capture");

let filters = document.querySelectorAll(".filter");
let filterselected = "none";

let zoomin = document.querySelector(".zoomin");
let zoomout = document.querySelector(".zoomout");
let minzoom = 1;
let maxzoom = 3;
let currzoom = 1;


let galarybtn = document.querySelector(".galary-btn");

let recordingStatus = false;
let mediaRecorder;

(async function () {
    let constraint = { video: true };
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);

    mediaRecorder = new MediaRecorder(mediaStream);
    videoElement.srcObject = mediaStream;
    mediaRecorder.onstart = function () {
        console.log("Recording started");
    }
    mediaRecorder.ondataavailable = function (e) {
        console.log("Recording data available");
        console.log(e.data);

        let videoObject = new Blob([e.data],{type : "video/mp4"});
        console.log(videoObject);

        // let videoUrl = URL.createObjectURL(videoObject);
        // console.log(videoUrl);

        // let aTag = document.createElement("a");
        // aTag.download = `Video${Date.now()}.mp4`;
        // aTag.href = videoUrl;
        // aTag.click();

        addMedia(videoObject,"video");

    }
    mediaRecorder.onstop = function () {
        console.log("Recording stopped");
    }

    recordButton.addEventListener("click", function () {
        if (recordingStatus) {
            mediaRecorder.stop();
            recordingStatus = false;
            recordButton.classList.remove("animate-record");
        }
        else {
            mediaRecorder.start();
            recordingStatus = true;
            recordButton.classList.add("animate-record");
        }
    });

    capturePhoto.addEventListener("click" ,function(){
        capturePhoto.classList.add("animate-capture");
        setTimeout(()=>{
            capturePhoto.classList.remove("animate-capture");
        },1000);

        let canvas = document.createElement("canvas");
        canvas.height = 480;
        canvas.width = 640;
        const ctx = canvas.getContext("2d");
        
        if(currzoom != 1){
            ctx.translate(canvas.width/2 , canvas.height/2);
            ctx.scale(currzoom ,currzoom );  
            ctx.translate(-canvas.width/2 , -canvas.height/2);
        }
        ctx.drawImage(videoElement,0,0);

        if(filterselected != "none"){
            ctx.fillStyle = filterselected;
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }


        // let aTag = document.createElement("a");
        // aTag.download = `image${Date.now()}.jpg`;
        // aTag.href = canvas.toDataURL("image/jpg");
        // aTag.click(); 

        let canvasUrl = canvas.toDataURL("image/jpg");
        addMedia(canvasUrl,"photo");

    })

})();


for(let i = 0;i<filters.length;i++){
    filters[i].addEventListener("click",function(e){
        console.log(e.target);
        let  currentFilterSelected = e.target.style.backgroundColor;
        console.log(currentFilterSelected);

        if(currentFilterSelected == ""){
            if(document.querySelector(".filterdiv")){
                document.querySelector(".filterdiv").remove();
                filterselected = "none";
                return;
            }
        }

        let filterdiv = document.createElement("div");
        filterdiv.classList.add("filterdiv");
        filterdiv.style.backgroundColor = currentFilterSelected;
        if(filterselected == "none"){
            // document.querySelector(".filterdiv").remove();
            document.body.append(filterdiv);
        }
        else{
            document.querySelector(".filterdiv").remove();
            document.body.append(filterdiv);
        }
        filterselected = currentFilterSelected;
    })
}

galarybtn.addEventListener("click" ,(e)=>{
    window.location.assign("galary.html");
})




zoomin.addEventListener("click",()=>{
    if(currzoom +0.1 > maxzoom ){
        return;
    }
    currzoom += 0.1;
    videoElement.style.transform = `scale(${currzoom})`;
});

zoomout.addEventListener("click",()=>{
    if(currzoom - 0.1 < minzoom ){
        return;
    }
    currzoom -= 0.1;
    videoElement.style.transform = `scale(${currzoom})`;
});

 
function addMedia(mediaUrl ,mediaType){
    let txnObject = db.transaction("Media", "readwrite");
    let mediaTable = txnObject.objectStore("Media");

    mediaTable.add({mid : Date.now() , type : mediaType ,url : mediaUrl});

    txnObject.onerror = function(e){
        console.log(e);
        console.log("transaction failed");
    }

}