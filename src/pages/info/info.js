function DisplayPost (e) {
    var inner = event.target.innerHTML;
    document.location.hash = inner;
    let string = inner.toLowerCase();

    var posts = document.getElementsByClassName("active");
    posts[0].classList.remove("active");
    e.classList.add("active");

    let path = string + ".txt";
    var filePath = 'posts/' + path;
    fetch(filePath)
    .then(response => response.text())
    .then(content => {
        document.getElementById('blogPanelR').innerHTML = content;
    })

    document.getElementById("blogPanelR").scrollIntoView({ behavior: "smooth", });

}