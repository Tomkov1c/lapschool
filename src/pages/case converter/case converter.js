function FocusTextArea() {
    document.getElementById("inputTextArea").focus();
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

        for(i = 0; i < newString.length; i++) {
            if(newString[i] == "." && newString[i+1] == " ") {
                newString[i+2] == newString[i+2].toUpperCase();
            }else {
                newString[i] = newString[i];
            }
        }

        document.getElementById("outputTextArea").value = newString.toLowerCase();
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

if(document.hasFocus()) {
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


    }else if(status == "true") {
        localStorage.setItem("autoConvert", "false");
        attr.dataset.on = "false";


        attr.classList.remove("toggleButtonToggled");
        document.getElementById("convertButton").style.opacity = 1;
        document.getElementById("convertButton").innerHTML = "CONVERT";

        document.getElementById("outputTextArea").value = "";

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