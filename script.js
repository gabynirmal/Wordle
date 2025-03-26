/*TODO:
- add words.txt and randomize, and add retrictions to real words only
- win and lose state
- restart
- fix input line 91 blahhh

*/

//keyboard letters
const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

const secretWords = ["HAPPY", "WORDS", "APPLE", "STAKE"];
const secretWord = "TABLE";

//current row and column for inputting text
var currRow = 0;
var currCol = 0;

//create the grid in HTML where the letters are inputted
const createGrid = () => {
  const divGridContainer = document.createElement("div");
  divGridContainer.classList.add("grid-container");
  for (let i = 0; i < 6; i++) {
    const divRowContainer = document.createElement("div");
    divRowContainer.classList.add("grid-rows");
    for (let j = 0; j < 5; j++) {
      const spanItem = document.createElement("span");
      const id = i.toString() + j.toString();
      spanItem.setAttribute("id", id);
      spanItem.classList.add("grid-inputs");
      divRowContainer.append(spanItem);
    }
    divGridContainer.append(divRowContainer);
  }
  document.querySelector("main").append(divGridContainer);
};

//event listener for keyboard presses
const handleKeyPress = () => {
  document.addEventListener("keydown", (event) => {
    button = document.getElementById(event.key.toUpperCase());
    if (event.key === "Enter") {
      button = document.getElementById("ENTER");
    } else if (event.key === "Backspace") {
      button = document.getElementById("DEL");
    }
    button.click();
  });
};

//create the keyboard in HTML with enter and delete
const createKeyboard = () => {
  const divKeyboardContainer = document.createElement("div");
  divKeyboardContainer.classList.add("keyboard-container");
  keyboard.forEach((row) => {
    const divRowContainer = document.createElement("div");
    divRowContainer.classList.add("keyboard-rows");
    row.forEach((key) => {
      const buttonKey = document.createElement("button");
      if (key === "DEL") {
        buttonKey.textContent = "\u232B";
      } else {
        buttonKey.textContent = key;
      }
      buttonKey.setAttribute("id", key);
      if (key === "ENTER" || key === "DEL") {
        buttonKey.classList.add("special-keys");
      } else {
        buttonKey.classList.add("reg-keys");
      }
      buttonKey.addEventListener("click", handleClick);
      divRowContainer.append(buttonKey);
    });
    divKeyboardContainer.append(divRowContainer);
  });
  handleKeyPress();
  document.querySelector("main").append(divKeyboardContainer);
};

//handles lose state
const handleLoss = () => {
  if (currRow === 6 && currCol === 5 && !handleEnter()) {
    console.log("you lose");
  }
};

//handles win state

//handles css color changes when enter is applied
const handleEnter = () => {
  let letterArray = [];
  let amtCorrect = 0;
  let win;
  for (let i = 0; i < secretWord.length; i++) {
    letterArray.push(secretWord.charAt(i));
  }
  for (let i = 0; i < 5; i++) {
    const textId = currRow.toString() + i.toString();
    const gridInput = document.getElementById(textId);
    const button = document.getElementById(gridInput.textContent);

    //green: letter in correct spot
    if (letterArray[i] == gridInput.textContent) {
      gridInput.style.backgroundColor = "#618c55";
      gridInput.style.border = "2px, solid, #618c55";
      button.style.backgroundColor = "#618c55";
      amtCorrect++;

      //yellow: letter in word, but wrong spot
    } else if (letterArray.includes(gridInput.textContent)) {
      letterArray[i] = 0;
      gridInput.style.backgroundColor = "#b1a04c";
      gridInput.style.border = "2px, solid, #b1a04c";
      button.style.backgroundColor = "#b1a04c";

      //gray: letter not in word
    } else {
      gridInput.style.backgroundColor = "#3a3a3c";
      gridInput.style.border = "2px, solid, #3a3a3c";
      button.style.backgroundColor = "#3a3a3c";
    }
    if (amtCorrect === 5) {
      win = true;
    } else {
      win = false;
    }
  }
  return win;
};

//handles keyboard clicks
const handleClick = (event) => {
  const buttonId = event.currentTarget.getAttribute("id");
  let textId;
  let currSpanElement;

  switch (buttonId) {
    case "DEL":
      if (currCol != 0) {
        currCol--;
      }
      textId = currRow.toString() + currCol.toString();
      currSpanElement = document.getElementById(textId);
      currSpanElement.textContent = "";
      break;
    case "ENTER":
      if (currCol === 5) {
        handleEnter();
        handleLoss();
        currCol = 0;
        currRow++;
      }
      break;
    default:
      if (currCol < 5) {
        textId = currRow.toString() + currCol.toString();
        currSpanElement = document.getElementById(textId);
        if (currSpanElement.textContent === "") {
          currSpanElement.textContent = buttonId;
        }
      }

      if (currCol < 5) {
        currCol++;
      }
  }
};

createGrid();
createKeyboard();
