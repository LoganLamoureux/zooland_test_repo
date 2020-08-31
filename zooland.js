/*
* Loads a JSON file and returns a DOM document node.
*/   

// Modified by Logan Lamoureux

/*
 * Main function to load the page contents based on the data in the loaded JSON file
 */
function createZooland(zoolandData) {
    let odd = true;
    let animalsList = document.getElementsByTagName("li");

    for (let i = 0; i < zoolandData.length; i++) 
    {
        let keys = Object.keys(zoolandData[i]);
        let values = Object.values(zoolandData[i]);

        let ul = document.getElementById("animals");
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        let h4 = document.createElement("h4");
        let blockquote = document.createElement("blockquote");
        let img = document.createElement("img");

        ul.appendChild(li);

        h3.innerHTML = `${zoolandData[i].common_name}`;
        li.appendChild(h3);

        h4.innerHTML = `${zoolandData[i].scientific_name}`;
        li.appendChild(h4);

        blockquote.innerHTML = `${zoolandData[i].description}`;
        li.appendChild(blockquote);
        
        for (let j = 0; j < zoolandData[i].images.image.length; j++)
        {
            let img = document.createElement("img");
            img.src = "images/" + `${zoolandData[i].images.image[j]}`;
            li.appendChild(img);
        }

        // Zebra stripe the every second List item
        if (odd)
        {
            animalsList[i].classList.add("zebra_background");
            odd = false;
        }
        else
        {
            animalsList[i].classList.remove("zebra_background");
            odd = true;
        }
    }
}

/*
 * Takes the user input in the search text box and compares it against the animals in the xml file.
 * If the animal is found (case-insensitive) the list of animals is filtered to only show that animal.
 * If the animal is not found then an error message displays showing the user entered search item was not found
 */
function search() {

    let searchResult = document.getElementById("searchbox").value;

    //  Use the HTML DOM to search through the h3s and h4s for matches
    let commonName = document.getElementsByTagName("h3");
    let scientificName = document.getElementsByTagName("h4");
    let animalsList = document.getElementsByTagName("li");
    let matchFound = false;

     for (let i = 0; i < commonName.length; i++) 
     {
        if (commonName[i].innerText.toUpperCase() == searchResult.toUpperCase() || scientificName[i].innerText.toUpperCase() == searchResult.toUpperCase())
        {
            matchFound = true;
            // Clear all list items
            for (var j = 0; j < commonName.length + 1; j++)
            {
                animalsList[j].style.display = "none";
            }

            // Set searched animal to block
            for (var x = 0; x < commonName.length; x++) 
            {
                if (commonName[x].innerText.toUpperCase() == searchResult.toUpperCase() || scientificName[x].innerText.toUpperCase() == searchResult.toUpperCase())
                {
                    animalsList[x + 1].style.display = "block";
                }
            }
        }

        // If there is no match display no matches found message
        if (commonName[i].innerText.toUpperCase() != searchResult.toUpperCase() && scientificName[i].innerText.toUpperCase() != searchResult.toUpperCase() && !matchFound)
        {
            for (var j = 0; j < commonName.length + 1; j++) 
            {
                animalsList[j].style.display = "none";
            }

            animalsList[0].style.display = "block";
        }
     }
}

/*
 * Turns on the display of all animals and turns off the display of the no matches error message
 */
function showAll() {
    let commonName = document.getElementsByTagName("h3");
    let animalsList = document.getElementsByTagName("li");

    for (var x = 0; x < commonName.length; x++) 
    {
        animalsList[x + 1].style.display = "block";
    }

    animalsList[0].style.display = "none";
}

/*
 * Turns off the display of the no matches error message and resets the
 * search field to blank
 */
function resetValues() {
    document.getElementById("nomatches").style.display = "none";
    document.getElementById("searchbox").value = "";
}

/*
 * Initial setup and adding of event listeners to the buttons and loading the page
 * dynamically from the xml file - run when the page loads
 */
function load() {

    resetValues();

    fetch('zooland.json')
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            createZooland(data);
        });

    document.getElementById("searchbutton").addEventListener("click",search);
    document.getElementById("showallbutton").addEventListener("click",showAll);

    
}

//adds an event listener to execute onLoad method when page finished loading
document.addEventListener("DOMContentLoaded", load);