var elementShowcase = document.getElementById('elemntSidePanel');
var elementDetail = document.getElementById("aboutElementDetail");
var advancedSettings = document.getElementById("advancedSettings");
elementShowcase.style.opacity = '0';
elementShowcase.style.display = 'none';
advancedSettings.style.display = 'none';

// // Fetch all of the table (not needed anymore)
// var filePath = "periodic-table.txt";
// fetch(filePath)
// .then(response => response.text())
// .then(content => {
//     document.getElementById('section').innerHTML = content;
// })
// //



function DisplayInfo (symbol) {
    let string = symbol;

    let path = string + ".txt";
    var filePath = 'elements/' + path;
    fetch(filePath)
    .then(response => response.text())
    .then(content => {
        document.getElementById('aboutElementDetail').innerHTML = content;
    })

    document.getElementById("aboutElementDetail").scrollIntoView({ behavior: "smooth", });

    return 0
}






function OnLoad() {
    sessionStorage.setItem("sectionActive", "");
    sessionStorage.setItem("sectionBefore", "");
    var displayGroup = localStorage.getItem('groups');
    if (displayGroup == "display") {
        SettingsDisplayGroups()

        var element = document.getElementsByClassName("cell");
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = "Active_" + element[i].dataset.group;
        }
        
    }

    var displayRadioactive = localStorage.getItem('radioactive');
    if (displayRadioactive == "display") {
        SettingsDisplayRadioactive()
    }


    // if(document.location.hash == "") {

    // }else if (document.location.hash === "#")
    // {
    //     document.location.hash == "";
    // }else if (document.location.hash == "#LaAc") {
    //     LaAcShow();
    // }else {
    //     var elements = document.getElementsByClassName("elementSymbol");
    //     for(i = 0; i < elements.length; i++) {
    //         var childrenTemp = elements[i];
    //         var children = childrenTemp.innerHTML;

    //         if(("#" + children) == document.location.hash) {
    //              elements[i].click();
    //              break;
    //         }
                
    //     }
    // }

}














var clicked;







function hover(e) {

    if (!clicked) {
        var elementsWithClass = document.getElementsByClassName('cell');
            // Loop through the elements and do something with them
            for (var i = 0; i < elementsWithClass.length; i++) {
                if (!elementsWithClass[i].matches(":hover"))
                {
                    elementsWithClass[i].style.opacity = '0.3';
                    elementsWithClass[i].style.zindx = '7';
                }
            }
        var elementsWithClass = document.getElementsByClassName('cellLaAc');
            // Loop through the elements and do something with them
            for (var i = 0; i < elementsWithClass.length; i++) {
                if (!elementsWithClass[i].matches(":hover"))
                {
                    elementsWithClass[i].style.opacity = '0.3';
                    elementsWithClass[i].style.zindx = '7';
                }
            }
        }
}

function leave(e) {
    if (!clicked) {
        var elementsWithClass = document.getElementsByClassName('cell');

            // Loop through the elements and do something with them
            for (var i = 0; i < elementsWithClass.length; i++) {
                elementsWithClass[i].style.opacity = '1';
                elementsWithClass[i].style.zindx = '3';
            }
        var elementsWithClass = document.getElementsByClassName('cellLaAc');

            // Loop through the elements and do something with them
            for (var i = 0; i < elementsWithClass.length; i++) {
                elementsWithClass[i].style.opacity = '1';
                elementsWithClass[i].style.zindx = '3';
            }
    }
}
function disableHover () {
    var elementsWithClass = document.getElementsByClassName('cell');

        //IDK why but not all cells get the class without another loop
        for(var g = 0; g < (elementsWithClass.length + 10); g++) {
            for (var i = 0; i < elementsWithClass.length; i++) {
                elementsWithClass[i].classList.add("cellNoHover");
                elementsWithClass[i].classList.remove("cell");
            }
        }
}
function enableHover () {
    var elementsWithClass = document.getElementsByClassName('cellNoHover');
        
        //IDK why but not all cells get the class without another loop
        for(var g = 0; g < (elementsWithClass.length + 10); g++) {
            for (var i = 0; i < elementsWithClass.length; i++) {
                elementsWithClass[i].classList.add("cell");
                elementsWithClass[i].classList.remove("cellNoHover");
            }
        }
}
function selectElement(e) {

    if(!clicked)
    {
        disableHover();
        document.getElementById("otherButtons").style.animation="filterMove 0.7s ease-in-out forwards";


        clicked = true;
        elementShowcase.style.display = 'block';
        document.getElementById("aboutElement").style.display = "flex";


        var elementsWithClass = document.getElementById('all');
        
            elementsWithClass.style.animation="element 0.7s ease-in-out forwards";

        elementShowcase.style.animation="elementShowcase 0.7s ease-in-out forwards";


        DatomicNumber = getInnerHTMLByClassWithinElement("atomicNumber", e);
        document.getElementById("showcaseAtomicNumber").innerHTML = DatomicNumber;
        e.style.opacity = 0.4;

        DelementSymbol = getInnerHTMLByClassWithinElement("elementSymbol", e);
        document.getElementById("showcaseElementSymbol").innerHTML = DelementSymbol;
        DisplayInfo(DelementSymbol);
        sessionStorage.setItem("sectionBefore", sessionStorage.getItem("sectionActive"));
        sessionStorage.setItem("sectionActive", DelementSymbol);

        DelementName = getInnerHTMLByClassWithinElement("elementName", e);
        document.getElementById("showcaseElementName").innerHTML = DelementName;

        DatomicMass = getInnerHTMLByClassWithinElement("atomicMass", e);
        document.getElementById("showcaseAtomicMass").innerHTML = DatomicMass;

        setTimeout(function(){
            elementDetail.style.display = 'block';
        }, 500);
        
    }else {
        clicked = false
        selectElementReverse();
    }


}
function selectElementReverse(e) {

    enableHover();

    sessionStorage.setItem("sectionActive", sessionStorage.getItem("sectionBefore"));

    clicked = false;
    elementDetail.style.display = 'none';
    var elementsWithClass = document.getElementById('all');

        elementsWithClass.style.animation="elementReverse 0.7s ease-in-out forwards";

    elementShowcase.style.animation="elementShowcaseReverse 0.7s ease-in-out forwards";

    leave();
    setTimeout(function(){
        elementDetail.style.display = 'none';
    }, 200);
    setTimeout(function(){
        document.getElementById("otherButtons").style.animation="filterMoveReverse 0.3s ease-in-out forwards";
    }, 450);
    setTimeout(function(){
        document.getElementById("aboutElement").style.display = "none";
    }, 400);
}

function getInnerHTMLByClassWithinElement(className, parentElement) {
    const elements = parentElement.querySelectorAll(`.${className}`);
    const innerHTMLArray = [];
  
    for (let i = 0; i < elements.length; i++) {
      innerHTMLArray.push(elements[i].innerHTML);
    }
    return innerHTMLArray;
}

//
//
//  Lanthanides / Actinides Section
function LaAcShow(e) {
    e.style.opacity = 0.3;

    document.getElementById("section").style.animation="elementLaAcTable 0.7s ease-in-out forwards";
    document.getElementById("LaAcSection").style.animation="elementLaAc 0.7s ease-in-out forwards";

    var elements = document.getElementsByClassName("cell");
        for(i = 0; i < elements.length; i++) {
            elements[i].setAttribute('onclick','');
            elements[i].setAttribute('onmouseover','');
        }
    disableHover();
    sessionStorage.setItem("sectionActive", "LaAc");

}
function LaAcHide() {

    document.getElementById("section").style.animation="elementLaAcTableReverse 0.7s ease-in-out forwards";
    document.getElementById("LaAcSection").style.animation="elementLaAcReverse 0.7s ease-in-out forwards";

    enableHover();
    var elements = document.getElementsByClassName("cell");
        for(i = 0; i < elements.length; i++) {
            elements[i].setAttribute('onmouseover','hover(this)');
            if ((elements[i].dataset.group == "lanthanides" || elements[i].dataset.group == "actinides") || elements[i].dataset.group == "Active_lanthanides" || elements[i].dataset.group == "Active_actinides") {
                elements[i].setAttribute('onclick','LaAcShow(this)');
            }else {
                elements[i].setAttribute('onclick','selectElement(this)');
            }
        }
    sessionStorage.setItem("sectionActive", "");
}

//
//
//  Advanced Settings Section
function advancedClick(e) {

    var status = e.dataset.status;

    if(status === "toOpen") {
        e.dataset.status = "toClose";

        if (sessionStorage.getItem("sectionActive") == "LaAc") {
            document.getElementById("all").style.animation="filterMenu-LaAc 0.7s ease-in-out forwards";

            console.log(sessionStorage.getItem("sectionActive"))
        }else {
            document.getElementById("all").style.animation="filterMenu 0.7s ease-in-out forwards";
        }
        document.getElementById("advancedSettings").style.animation="menuFilterMenu 0.7s ease-in-out forwards";
        //document.getElementById("otherButtons").style.animation="filterMove 0.7s ease-in-out forwards";

        disableHover();
        advancedSettings.style.display = 'block';

        document.getElementById("otherButtonsButton").innerHTML = "<i class=\"fa-solid fa-square-xmark\"></i><p>Close</p>";

        var elements = document.getElementsByClassName("cellNoHover");
        for(i = 0; i < elements.length; i++) {
            elements[i].setAttribute('onclick','');
        }

    }else {
        e.dataset.status = "toOpen";

        if (sessionStorage.getItem("sectionActive") == "LaAc") {
            document.getElementById("all").style.animation="filterMenuReverse-LaAc 0.7s ease-in-out forwards";
            sessionStorage.setItem("sectionActive", "LaAc");
        }else {
            document.getElementById("all").style.animation="filterMenuReverse 0.7s ease-in-out forwards";
            enableHover();
        }
        document.getElementById("advancedSettings").style.animation="menuFilterMenuReverse 0.7s ease-in-out forwards";
        //document.getElementById("otherButtons").style.animation="filterMove 0.7s ease-in-out forwards";

        setTimeout(function(){
            advancedSettings.style.display = 'none';
        }, 700);

        document.getElementById("otherButtonsButton").innerHTML = "<i class=\"fa-solid fa-circle-plus\"></i><p>Advanced</p>";

        var elements = document.getElementsByClassName("cell");
        for(i = 0; i < elements.length; i++) {
            if ((elements[i].dataset.group == "lanthanides" || elements[i].dataset.group == "actinides") || elements[i].dataset.group == "Active_lanthanides" || elements[i].dataset.group == "Active_actinides") {
                elements[i].setAttribute('onclick','LaAcShow(this)');
            }else {
                elements[i].setAttribute('onclick','selectElement(this)');
            }
        }
    }

}


//
// Advanced Settings Buttons
function SettingsDisplayGroups(onload) {
    var e = document.getElementById("displayGroups");
    var status = e.dataset.active;

    if(status === "false" || onload === "hide") {
        e.dataset.active = "true";
        localStorage.setItem('groups', 'display');
        saveLocalStorage = localStorage.getItem('groups');

        var element = document.getElementsByClassName("cellNoHover");
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = "Active_" + element[i].dataset.group;
        }
        var element = document.getElementsByClassName("cellLaAc");
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = "Active_" + element[i].dataset.group;
        }

    }else if (status === "true" || onload === "display"){
        e.dataset.active = "false";
        localStorage.setItem('groups', 'hide');
        saveLocalStorage = localStorage.getItem('groups');

        var element = document.getElementsByClassName("cellNoHover")
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = element[i].dataset.group.replace('Active_','');
        }
        var element = document.getElementsByClassName("cellLaAc")
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = element[i].dataset.group.replace('Active_','');
        }

    }else {

    }
}

function SettingsDisplayRadioactive(onload) {
    var e = document.getElementById("displayRadioactive");
    var status = e.dataset.active;

    if(status === "true" || onload === "display") {
        e.dataset.active = "false";
        localStorage.setItem('radioactive', 'hide');
        saveLocalStorage = localStorage.getItem('radioactive');

        var elements = document.getElementsByClassName("fa-radiation");
        for(i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }


    }else if (status === "false" || onload === "hide"){
        e.dataset.active = "true";
        localStorage.setItem('radioactive', 'display');
        saveLocalStorage = localStorage.getItem('radioactive');

        var elements = document.getElementsByClassName("fa-radiation");
        for(i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }

    }else {
        
    }
}