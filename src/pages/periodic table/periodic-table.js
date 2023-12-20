var elementShowcase = document.getElementById('elemntSidePanel');
var elementDetail = document.getElementById("aboutElementDetail");
var advancedSettings = document.getElementById("advancedSettings");
elementShowcase.style.opacity = '0';
elementShowcase.style.display = 'none';
advancedSettings.style.display = 'none';

// Fetch all of the table
var filePath = "periodic-table.txt";
fetch(filePath)
.then(response => response.text())
.then(content => {
    document.getElementById('section').innerHTML = content;
})




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
    if(document.location.hash == "") {

    }else if (document.location.hash === "#")
    {
        document.location.hash == "";
    }else {
        var elements = document.getElementsByClassName("elementSymbol");
        for(i = 0; i < elements.length; i++) {
            var childrenTemp = elements[i];
            var children = childrenTemp.innerHTML;

            if(("#" + children) == document.location.hash) {
                 elements[i].click();
                 break;
            }
                
        }
    }

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
    document.location.hash = "";
        
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


        var elementsWithClass = document.getElementsByClassName('wrapper');
        

        for (var i = 0; i < elementsWithClass.length; i++) {
            elementsWithClass[i].style.animation="element 0.7s ease-in-out forwards";
        }

        elementShowcase.style.animation="elementShowcase 0.7s ease-in-out forwards";


        DatomicNumber = getInnerHTMLByClassWithinElement("atomicNumber", e);
        document.getElementById("showcaseAtomicNumber").innerHTML = DatomicNumber;
        e.style.opacity = 0.4;

        DelementSymbol = getInnerHTMLByClassWithinElement("elementSymbol", e);
        document.getElementById("showcaseElementSymbol").innerHTML = DelementSymbol;
        DisplayInfo(DelementSymbol);
        document.location.hash = DelementSymbol;

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

    clicked = false;
    elementDetail.style.display = 'none';
    var elementsWithClass = document.getElementsByClassName('wrapper');
    

    for (var i = 0; i < elementsWithClass.length; i++) {
        elementsWithClass[i].style.animation="elementReverse 0.7s ease-in-out forwards";
    }

    elementShowcase.style.animation="elementShowcaseReverse 0.7s ease-in-out forwards";

    leave();
    setTimeout(function(){
        elementDetail.style.display = 'none';
    }, 200);
    setTimeout(function(){
        document.getElementById("otherButtons").style.animation="filterMoveReverse 0.7s ease-in-out forwards";
    }, 100);
}

function getInnerHTMLByClassWithinElement(className, parentElement) {
    const elements = parentElement.querySelectorAll(`.${className}`);
    const innerHTMLArray = [];
  
    for (let i = 0; i < elements.length; i++) {
      innerHTMLArray.push(elements[i].innerHTML);
    }
    return innerHTMLArray;
}

function advancedClick(e) {

    var status = e.dataset.status;

    if(status === "toOpen") {
        e.dataset.status = "toClose";

        document.getElementById("section").style.animation="filterMenu 0.7s ease-in-out forwards";
        //document.getElementById("otherButtons").style.animation="filterMove 0.7s ease-in-out forwards";

        disableHover();
        advancedSettings.style.display = 'block';

        document.getElementById("otherButtonsButton").innerHTML = "<i class=\"fa-solid fa-square-xmark\"></i><p>Close</p>"

    }else {
        e.dataset.status = "toOpen";

        document.getElementById("section").style.animation="filterMenuReverse 0.7s ease-in-out forwards";
        //document.getElementById("otherButtons").style.animation="filterMove 0.7s ease-in-out forwards";

        enableHover();
        advancedSettings.style.display = 'none';

        document.getElementById("otherButtonsButton").innerHTML = "<i class=\"fa-solid fa-circle-plus\"></i><p>Advanced</p>"

    }

}



// Advanced Settings Buttons
function SettingsDisplayGroups(e) {
    var status = e.dataset.active;

    if(status === "false") {
        e.dataset.active = "true";

        var element = document.getElementsByClassName("cellNoHover");

        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = "Active_" + element[i].dataset.group;
        }

    }else {
        e.dataset.active = "false";

        var element = document.getElementsByClassName("cellNoHover")
        for(i = 0; i < element.length; i++) {
            element[i].dataset.group = element[i].dataset.group.replace('Active_','');
        }

    }
}