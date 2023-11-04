function hover() {

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

function leave() {
    if (!cliced) {
        var elementsWithClass = document.getElementsByClassName('cell');


            // Loop through the elements and do something with them
            for (var i = 0; i < elementsWithClass.length; i++) {
                elementsWithClass[i].style.opacity = '1';
                elementsWithClass[i].style.zindx = '3';
            }
    }
}

function selectElement(e) {

    clicked = true;

    var elementsWithClass = document.getElementsByClassName('wrapper');
    

    for (var i = 0; i < elementsWithClass.length; i++) {
        elementsWithClass[i].style.animation="element 0.7s ease-in-out forwards";
    }
}