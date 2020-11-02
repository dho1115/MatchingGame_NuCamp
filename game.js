let numberOfFaces = 5;
let levelNumber = 1;
let lastGuessString = "";

let level = document.getElementById("level");
let lastGuess = document.getElementById("lastGuess");

const theLeftSide = document.getElementById("leftSide");
const theRightSide = document.getElementById("rightSide");
const reset = document.getElementById("reset");
const gameOverDiv = document.querySelector("div.gameOver");

function generateFaces () {

    level.textContent = levelNumber;
    lastGuess.textContent = lastGuessString;

    gameOverDiv.style.display = "none";
    
    const images = [...theLeftSide.childNodes, ...theRightSide.childNodes];
    images.forEach(img => img.remove());

    //Generates the approprate number of faces (starts with 5). 

    for (let index = 0; index < numberOfFaces; index++) {
        let face = document.createElement("img");
        face.src="images/yellowRibbon.jpg";
        face.style.height = "15%";
        face.style.width = "15%";
        var randomTop = Math.floor(Math.random()*400) + 1;
        var randomLeft = Math.floor(Math.random()*400) + 1;

        face.style.top = randomTop + "px";
        face.style.left = randomLeft + "px";

        theLeftSide.append(face);
    }

    const leftSideImages = theLeftSide.cloneNode(true); 
    leftSideImages.removeChild(leftSideImages.lastChild); //Note: We are removing the (last) child from the CLONE only, not the original (which was appended to the left side), so the left side will STILL show the 5 images and the right will show 4 b/c it is the CLONE we are attaching to the right side. 
    theRightSide.append(leftSideImages); //Append the (cloned) leftSideImages (which has 1 less face) to the <div /> on the right side (theRightSide).

    theLeftSide.lastChild.addEventListener("click", nextLevel); //This is the evenListener for the CORRECT guess. 

    //document.body.addEventListener("click", gameOver);

    theLeftSide.childNodes.forEach(function (val) {
        if (val != theLeftSide.lastChild) {
            val.addEventListener("click", gameOver); //These are eventListeners for the WRONG guesses.
        }
    });
}

//This method adds an event listener to the "reset" to reset the game back to the default values.

reset.addEventListener("click", function () {
    numberOfFaces = 5;
    levelNumber = 1;
    lastGuessString = "";
    generateFaces();
});

//This function executes IF the guess is correct. 
function nextLevel (e) {
    e.stopPropagation();
    lastGuessString = "CORRECT!";
    lastGuess.textContent = lastGuessString;
    levelNumber += 1;
    level.textContent = levelNumber;

    const images = [...theLeftSide.childNodes, ...theRightSide.childNodes];
    images.forEach(img => img.remove()); //This removes all the images if the guess is correct (so the game can start over and new images can be placed using generateFaces())
    numberOfFaces += 1;
    generateFaces();
}

//This function executes IF the guess is incorrect. 
function gameOver () {
    lastGuessString = "WRONG!";
    lastGuess.textContent = lastGuessString;
    gameOverDiv.style.display = "block";

    this.removeEventListener("click", gameOver);
    theLeftSide.lastChild.removeEventListener("click", nextLevel);
}