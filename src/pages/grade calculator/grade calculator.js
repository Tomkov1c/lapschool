sessionStorage.setItem("firstRun", "false");
document.getElementById("DisplayGrade").style.transform = "scale(0)";
document.getElementById("inputsWrapper").style.transform = "translateY(-300px)";

function Calculate() {
    var MaxPoints = document.getElementById("inputMaxPoints").value;
    var Points = document.getElementById("inputPoints").value;
    var Percentage = document.getElementById("inputPercentage").value;

    if(MaxPoints != null || MaxPoints != "") {
        if(Points == null || Points == "") {
            result = Math.round((MaxPoints * Percentage) / 100); 
            document.getElementById("PointsDisplay").innerHTML = result;
            document.getElementById("PercentageDisplay").innerHTML = Percentage;
            getGrade(Percentage);
        }else if(Percentage == null || Percentage == "") {
            result = Math.round((100 * Points) / MaxPoints); 
            document.getElementById("PercentageDisplay").innerHTML = result;
            document.getElementById("PointsDisplay").innerHTML = Points;

            getGrade(result);
            
        }else {

        }
    }else {
        console.log("error");
    }


    // First Run
    if(sessionStorage.getItem("firstRun") == "false") {
        sessionStorage.setItem("firstRun", "true");

        document.getElementById("DisplayGrade").style.animation = "apearDisplay 0.5s forwards";
        document.getElementById("inputsWrapper").style.animation = "moveMenu 0.5s forwards";
    }
}
function EnterPress(e) {
    e.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        Calculate();
      }
    });
}
function getGrade(per) {
    const filePath = "grading systems/" + "slovenia-school" + ".json";
    const value = per;

    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            const grades = data.grades[0];
            let foundGrade = null;

            // Manually iterate through the grades object to find the matching grade
            for (const grade in grades) {
                const range = grades[grade][0];
                const minValue = parseInt(range.min);
                const maxValue = parseInt(range.max);

                if (value >= minValue && value <= maxValue) {
                    foundGrade = grade;
                    break; // exit the loop once a match is found
                }
            }

            if (foundGrade) {
                console.log("Found Grade:", foundGrade); // Log the found grade
                document.getElementById("GradeDisplay").innerHTML = foundGrade;
            } else {
                console.log("No Matching Grade Found"); // Log when no match is found
                // If no matching grade is found, update the HTML content to "--g"
                document.getElementById("GradeDisplay").innerHTML = "bruh";
            }
        })
        .catch(error => {
            // Log an error message if there's an issue fetching or parsing the JSON
            console.log('Error reading JSON file:', error);
            // Update the HTML content to "error" in case of an error
            document.getElementById("GradeDisplay").innerHTML = "error";
        });
}







