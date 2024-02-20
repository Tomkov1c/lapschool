function FocusTextArea() {
    document.getElementById("inputTextArea").focus();
}

function LoadSaveData() {
    if(localStorage.getItem("autoCopy") == "true") {        
        document.getElementById("AutoCopy").classList.add("toggleButtonToggled");

    }
    if(localStorage.getItem("autoConvert") == "true") {
        document.getElementById("AutoConvert").classList.add("toggleButtonToggled");
        document.getElementById("convertButton").style.opacity = 0.3;
        document.getElementById("convertButton").innerHTML = "AUTO CONVERT";

        document.getElementById("AutoConvert").dataset.on = "true";
        document.getElementById("convertButton").onclick = "FocusTextArea()";
        document.getElementById("convertButton").style.cursor = "default";


    }
}
function Convert(e) {
    var buttons = document.getElementsByClassName("toggleButton");
    var toConvert;
    for( i = 0; i < buttons.length; i++) {
        if(buttons[i].dataset.enabled == "true") {
            toConvert = buttons[i].dataset.case;
        }
    }

    if(toConvert == "Uppercase") {
        newString = document.getElementById("inputTextArea").value;
        document.getElementById("outputTextArea").value = newString.toUpperCase();
    }else if(toConvert == "Lowercase") {
        newString = document.getElementById("inputTextArea").value;
        document.getElementById("outputTextArea").value = newString.toLowerCase();
    }else if(toConvert == "Sentence") {
        newString = document.getElementById("inputTextArea").value;
        let words = newString.toLowerCase().split('. ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        document.getElementById("outputTextArea").value = words.join('. ');

    }else if(toConvert == "Capitalized") {
        newString = document.getElementById("inputTextArea").value;
        let words = newString.toLowerCase().split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        document.getElementById("outputTextArea").value = words.join(' ');
        
    }else {

    }

}
function CaseType(e) {
    var status = e.dataset.enabled;

    var buttons = document.getElementsByClassName("toggleButton");
    for( i = 0; i < buttons.length; i++) {
        if(buttons[i].dataset.enabled == "true" && status == "false") {
            buttons[i].dataset.enabled = "false";
        }
    }

    if(status == "true") {
        e.dataset.enabled = "false";
        
    }else if(status == "false") {
        e.dataset.enabled = "true";

    }else {

    }

}

if(true) {
    var intervalId = setInterval(function() {
        if(localStorage.getItem("autoConvert") == "true") {
            Convert()
        }
        if(localStorage.getItem("autoCopy") == "true") {
            navigator.clipboard.writeText(document.getElementById("outputTextArea").value);
        }
      }, 10);
}


function AutoConvert(e) {
    const attr = document.getElementById("AutoConvert");
    var status = attr.dataset.on;

    if(status == "false") {
        localStorage.setItem("autoConvert", "true");
        attr.dataset.on = "true";

        attr.classList.add("toggleButtonToggled");
        document.getElementById("convertButton").style.opacity = 0.3;
        document.getElementById("convertButton").innerHTML = "AUTO CONVERT";

        document.getElementById("convertButton").onclick = "FocusTextArea()";
        document.getElementById("convertButton").style.cursor = "default";


    }else if(status == "true") {
        localStorage.setItem("autoConvert", "false");
        attr.dataset.on = "false";


        attr.classList.remove("toggleButtonToggled");
        document.getElementById("convertButton").style.opacity = 1;
        document.getElementById("convertButton").innerHTML = "CONVERT";

        document.getElementById("outputTextArea").value = "";

        document.getElementById("convertButton").onclick = "Convert()";
        document.getElementById("convertButton").style.cursor = "pointer";

    }else {

    }
    FocusTextArea();

}
function AutoCopy(e) {
    const attr = document.getElementById("AutoCopy");
    var status = attr.dataset.on;

    if(status == "false") {
        localStorage.setItem("autoCopy", "true");
        attr.dataset.on = "true";

        attr.classList.add("toggleButtonToggled");

    }else if(status == "true") {
        localStorage.setItem("autoCopy", "false");
        attr.dataset.on = "false";


        attr.classList.remove("toggleButtonToggled");

    }else {

    }
    FocusTextArea();
}