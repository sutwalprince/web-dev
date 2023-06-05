let playPausebtn = document.querySelector(".play");
let cancel = document.querySelector(".cancel");
let voicebutton = document.querySelector("#change_voices");
let generate_voices = document.querySelector(".generate_voices");
let textzone = document.querySelector(".text-area");
let playPauseDiv = document.querySelector(".playPauseDiv")

let pitchBar = document.getElementById("pitchBar")
let rateBar = document.getElementById("rateBar")
let volumeBar = document.getElementById("volumeBar")


var pitchValue = 7;
var rateValue = 7;
var volumeValue = 10;
let isPaused = false;
let started = false;
let cancelled = true;



let select_voices = "";


const synth = window.speechSynthesis;


pitchBar.addEventListener("change", function () {
  pitchValue = pitchBar.value;
});
rateBar.addEventListener("change", function () {
  rateValue = rateBar.value;
});
volumeBar.addEventListener("change", function () {
  volumeValue = volumeBar.value;
});






document.addEventListener("DOMContentLoaded", function () {
  synth.cancel();

  pitchBar.value = 7;
  rateBar.value = 7;
  volumeBar.value = 10;
  voicebutton.addEventListener("click", function () {
    voices = synth.getVoices();
    generate_voices.innerHTML = `<select  id="select_voices"></select></div>`;
    for (let i = 0; i < voices.length; i++) {
      select_voices = document.querySelector("#select_voices");

      select_voices.options.add(new Option(voices[i].name, i));
      select_voices.selectedIndex = 6;

    }
  });

  playPausebtn.addEventListener("click", function () {
    let txt = textzone.innerText;
    if(txt =="") return;
    if (!synth.speaking) {
      playPausebtn.className = "fa-solid fa-circle-pause play float-end";
    }
    
    if (!isPaused && started && synth.speaking) {

      pausing();
      return;
    }
    
    if (isPaused ) {
      synth.resume();
      isPaused = false;
      playPausebtn.className = "fa-solid fa-circle-pause play float-end";
      if(!cancelled) return;
      cancelled = false;
    }
    
    
    
    playPausebtn.className = "fa-solid fa-circle-pause play float-end";
    
    var utterThis = new SpeechSynthesisUtterance(txt);
    console.log(select_voices);
    if (select_voices != "") {
      utterThis.voice = voices[select_voices.selectedIndex];
    }
    utterThis.pitch = (pitchValue / 10);
    utterThis.rate = (rateValue / 10);
    utterThis.volume = (volumeValue / 10);

    
    synth.speak(utterThis);
    started = true;
    
    // console.log(synth);
  });

});

function pausing(){
  
      
    console.log("paused");
    isPaused  = true;
    playPausebtn.className = "fa-solid fa-circle-play play float-end";
    cancelled =false;
    synth.pause();
    return;
  
}




cancel.addEventListener("click", function () {
  // console.log("nano")
  // synth.pause();
  // isPaused = true;
  // if (synth.speaking || synth.pending || synth.paused) {
    console.log("sjjs");
    started = false;
    cancelled = true;
    isPaused  = true;
    playPausebtn.className = "fa-solid fa-circle-play play float-end";
    synth.cancel();
  // }
});
















