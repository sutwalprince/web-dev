var messages = {
    start: {
        msg: "Click on the microphone icon and begin speaking.",
        class: "alert-success",
    },
    speak_now: {
        msg: "Speak now.",
        class: "alert-success",
    },
    no_speech: {
        msg: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a>.',
        class: "alert-danger",
    },
    no_microphone: {
        msg: 'No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a> are configured correctly.',
        class: "alert-danger",
    },
    allow: {
        msg: 'Click the "Allow" button above to enable your microphone.',
        class: "alert-warning",
    },
    denied: {
        msg: "Permission to use microphone was denied.",
        class: "alert-danger",
    },
    blocked: {
        msg: "Permission to use microphone is blocked. To change, go to chrome://settings/content/microphone",
        class: "alert-danger",
    },
    upgrade: {
        msg: 'Web Speech API is not supported by this browser. It is only supported by <a href="//www.google.com/chrome">Chrome</a> version 25 or later on desktop and Android mobile.',
        class: "alert-danger",
    },
    stop: {
        msg: "Stop listening, click on the microphone icon to restart",
        class: "alert-success",
    },
    copy: {
        msg: "Content copy to clipboard successfully.",
        class: "alert-success",
    },
    problem: {
        msg: "There is some problem with your microphone",
        class: "alert-danger",
    },
};

let finalTranscript = "";
let recognising = false;
let onend_error;
let start_timestamp;
let recognisition;

let final_span = document.getElementById("final_span");
let interim_span = document.getElementById("interim_span");

let select_language = document.querySelector("#select_language");
let select_dialect = document.querySelector("#select_dialect");
let image_button = document.getElementById("image_button");

document.addEventListener("DOMContentLoaded", function () {

    for (let i = 0; i < langs.length; i++) {
        select_language.options[i] = new Option(langs[i][0], i);
    }
    select_language.selectedIndex = 10;
    updateCountry();
    select_dialect.selectedIndex = 2;

    // webkitSpeechRecognition

    if (!("webkitSpeechRecognition" in window)) {
        showInfo("upgrade");
        return;
    }
    else {
        showInfo("start");
        recognisition = new webkitSpeechRecognition();
        recognisition.continuous = true;
        recognisition.interimResults = true;
        recognisition.onstart = function () {
            recognising = true;
            showInfo("speak_now");
            image_button.src = `images/micon.gif`
        }

        recognisition.onerror = function (e) {
            if (e.error == "not-allowed") {
                showInfo("blocked");
            }else{
                showInfo("problem");
            }
            onend_error = true;
        }

        recognisition.onend = function () {
            recognising = false;
            if (onend_error) {
                onend_error = false;
                return;
            }
            image_button.src = `images/micoff.jpeg`
            if(!finalTranscript){
                showInfo("start");
            }
            showInfo("stop");
        }
        recognisition.onresult = function (event) {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
                else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            interim_span.innerText = interimTranscript;
            final_span.innerText = finalTranscript;
        }
    }
});

document.getElementById("select_language").addEventListener("change", updateCountry);

document.querySelector(".start_button").addEventListener("click", function (e) {
    if (recognising) {
        recognisition.stop();
        return;
    }
    finalTranscript = "";
    final_span.innerHTML = "";
    interim_span.innerHTML = "";
    interimTranscript = "";
    recognisition.lang = select_dialect.value;
    recognisition.start();
})


function updateCountry() {
    for (let i = select_dialect.options.length - 1; i >= 0; i--) {
        select_dialect.remove(i);
    }
    let list = langs[select_language.selectedIndex];
    for (let i = 1; i < list.length; i++) {
        select_dialect.options.add(new Option(list[i][1], list[i][0]));
    }

    select_dialect.style.visibility = list[1].length == 1 ? "hidden" : "visible";

}



function showInfo(s) {
    let info = document.getElementById("info");
    if (s) {
        let message = messages[s];
        info.innerHTML = message.msg;
        info.className = "alert " + message.class;
    }
    else {
        info.className = "d-none";
    }

}

function copyToClipboard(txt) {

    let dummy = document.createElement("textarea");
    dummy.value = txt;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showInfo("copy");

}

document.querySelector("#text-copy").addEventListener("click",function(){
    if(recognising){
        recognising = false;
        recognisition.stop();
    }
    copyToClipboard(finalTranscript);
})


