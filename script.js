/*TODO:
- add words.txt and randomize
- win and lose state
- restart
- keyboard to button functionality
- wordle favicon
- change del to delete icon

*/

//keyboard letters
const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

const secretWords = ["HAPPY", "WORDS", "APPLE", "STAKE"];
const secretWord = "SOWER";

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

//create the keyboard in HTML with enter and delete
const createKeyboard = () => {
  const divKeyboardContainer = document.createElement("div");
  divKeyboardContainer.classList.add("keyboard-container");
  keyboard.forEach((row) => {
    const divRowContainer = document.createElement("div");
    divRowContainer.classList.add("keyboard-rows");
    row.forEach((key) => {
      const buttonKey = document.createElement("button");
      buttonKey.textContent = key;
      buttonKey.setAttribute("id", key);
      if (
        buttonKey.getAttribute("id") === "ENTER" ||
        buttonKey.getAttribute("id") === "DEL"
      ) {
        buttonKey.classList.add("special-keys");
      } else {
        buttonKey.classList.add("reg-keys");
      }
      buttonKey.addEventListener("click", handleClick);
      divRowContainer.append(buttonKey);
    });
    divKeyboardContainer.append(divRowContainer);
  });
  document.querySelector("main").append(divKeyboardContainer);
};

//handles css color changes when enter is applied
const handleEnter = () => {
  let letterArray = [];
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
  }
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
