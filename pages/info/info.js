function DisplayPost (e) {
    var inner = event.target.innerHTML;
    let string = inner.toLowerCase();

    let path = string + ".txt";
    var filePath = 'posts/' + path;
    fetch(filePath)
    .then(response => response.text())
    .then(content => {
        document.getElementById('blogPanelR').innerHTML = content;
    })

    document.getElementById("blogPanelR").scrollIntoView({ behavior: "smooth", });

}