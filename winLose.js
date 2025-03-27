const playAgain = () => {
  const button = document.createElement("button");
  button.setAttribute("class", "play-again");
  button.innerText = "Play Again!";
  button.addEventListener("click", () => {
    window.location.replace("index.html");
  });
  document.querySelector(".win-lose-containers").append(button);
};

playAgain();
