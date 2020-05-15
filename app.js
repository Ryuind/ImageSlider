let picArray = [];

let submitButton = document.querySelector("[data-submit-button]");
let originScreen = document.querySelector("#myImg").src;

submitButton.addEventListener("click", notifyUser);

function notifyUser() {
  let originInput = document.querySelector("[data-user-input]").value;
  if (originInput === "") {
    alert("Please choose a picture!");
  } else {
    let notifyText = document.querySelector("[data-submit-text]");
    notifyText.innerHTML = "Picture Submitted!";
    setTimeout(() => {
      notifyText.innerHTML = "";
    }, 2000);
  }
}

submitButton.addEventListener("click", addUserInputToPicArray);
function addUserInputToPicArray() {
  let originInput = document.querySelector("[data-user-input]").value;
  if (originInput === "") {
    alert("Please choose a picture!");
  } else if (picArray.length === 46) {
    alert("Too many pictures!");
  } else {
    let getUserInput = document.querySelector("[data-user-input]");
    let urlSource = URL.createObjectURL(getUserInput.files[0]);
    picArray.push(urlSource);
  }
}

submitButton.addEventListener("click", createNewCircle);
function createNewCircle() {
  let originInput = document.querySelector("[data-user-input]").value;
  if (originInput === "") {
    console.log("Please choose a picture!");
  } else if (picArray.length === 46) {
    console.log(picArray);
  } else {
    let div = document.createElement("div");
    div.classList.add("dot");
    divParent = document.querySelector("[data-dot-container]");
    div.addEventListener("click", showOnScreen);
    div.addEventListener("click", fillInTheHole);
    divParent.appendChild(div);

    divParent.childNodes.item(0).style.backgroundColor = "white";
    let screen = document.querySelector("#myImg");
    screen.src = picArray[0];
    function fillInTheHole() {
      let dots = document.querySelector("[data-dot-container]");
      for (i = 0; i < dots.childNodes.length; i++) {
        dots.childNodes.item(i).style.backgroundColor = "transparent";
      }
      event.target.style.backgroundColor = "white";
    }
    function showOnScreen(event) {
      let dots = document.querySelector("[data-dot-container]");
      for (i = 0; i < dots.childNodes.length; i++) {
        if (event.target === dots.childNodes.item(i)) {
          screen.src = picArray[i];
        }
      }
    }
  }
}

let forwardButton = document.querySelector("[data-forward-button]");

forwardButton.addEventListener("click", nextPicture);
forwardButton.addEventListener("click", checkIfEmpty);

function nextPicture() {
  let screen = document.querySelector("#myImg");
  let dots = document.querySelector("[data-dot-container]");
  let lastImage = picArray.length - 1;
  if (screen.src === picArray[lastImage]) {
    for (j = 0; j < dots.childNodes.length; j++) {
      dots.childNodes.item(j).style.backgroundColor = "transparent";
    }
    dots.childNodes.item(0).style.backgroundColor = "white";
    screen.src = picArray[0];
  } else {
    for (i = 0; i < dots.childNodes.length; i++) {
      if (dots.childNodes.item(i).style.backgroundColor === "white") {
        for (j = 0; j < dots.childNodes.length; j++) {
          dots.childNodes.item(j).style.backgroundColor = "transparent";
        }
        screen.src = picArray[(i += 1)];
        dots.childNodes.item(i).style.backgroundColor = "white";
      }
    }
  }
}

let previousButton = document.querySelector("[data-previous-button]");
previousButton.addEventListener("click", lastPicture);
previousButton.addEventListener("click", checkIfEmpty);

function lastPicture() {
  console.log("last");
  let screen = document.querySelector("#myImg");
  let dots = document.querySelector("[data-dot-container]");
  if (screen.src === picArray[0]) {
    for (j = 0; j < dots.childNodes.length; j++) {
      dots.childNodes.item(j).style.backgroundColor = "transparent";
    }
    dots.childNodes.item(0).style.backgroundColor = "white";
    screen.src = picArray[0];
  } else {
    for (i = 0; i < dots.childNodes.length; i++) {
      if (dots.childNodes.item(i).style.backgroundColor === "white") {
        for (j = 0; j < dots.childNodes.length; j++) {
          dots.childNodes.item(j).style.backgroundColor = "transparent";
        }
        screen.src = picArray[(i -= 1)];
        dots.childNodes.item(i).style.backgroundColor = "white";
      }
    }
  }
}

function checkIfEmpty() {
  let screen = document.querySelector("#myImg");
  let dots = document.querySelector("[data-dot-container]");
  if (originScreen === screen.src) {
    for (j = 0; j < dots.childNodes.length; j++) {
      dots.childNodes.item(j).style.backgroundColor = "transparent";
    }
    dots.childNodes.item(0).style.backgroundColor = "white";
    screen.src = picArray[0];
  }
}

let deleteButton = document.querySelector("[data-delete-button]");
deleteButton.addEventListener("click", removePicFromArray);

function removePicFromArray() {
  let screen = document.querySelector("#myImg");
  let dots = document.querySelector("[data-dot-container]");
  for (i = 0; i < picArray.length; i++) {
    if (screen.src === picArray[i]) {
      picArray.splice(i, 1);

      dots.removeChild(dots.childNodes.item(i));
      screen.src = picArray[0];
      console.log(dots.childNodes.length);
      if (dots.childNodes.length === 0) {
        console.log(screen.src);
        screen.src = originScreen;
      } else {
        dots.childNodes.item(0).style.backgroundColor = "white";
      }
    }
  }
}