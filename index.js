// initializing main components
const enterbtn = document.getElementById("enterbtn");
const ultag = document.getElementById("ul");
const inputbox = enterbtn.previousElementSibling;
const initial = document.getElementById("initial");

// func for updating local storage
function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(storedItems));
}

// func to add new items to list
function addListItem(text) {
  let newlist = document.createElement("li");
  newlist.className = "list";
  newlist.innerHTML = `
    ${text}
    <button class="removebtn" onclick="removeList(this)"> ✔</button>
  `;
  ultag.appendChild(newlist);
}

// func to enter a new list item to ui and local storage
function enterfunc(e) {
  const inputValue = inputbox.value.trim();
  if (inputValue !== "") {
    storedItems.push(inputValue);
    updateLocalStorage();
    addListItem(inputValue);
    inputbox.value = "";
  }
  try {
    ultag.removeChild(initial);
  } catch (error) {
    console.log("Could not find the initial element");
  }
}

// Func to remove a list item from ui and local storage
function removeList(button) {
  const listItem = button.parentElement;
  const text = listItem.textContent.trim();
  const index = storedItems.indexOf(text);
  if (index !== 0) {
    storedItems.splice(index, 1);
    console.log("removed from local storage");
    updateLocalStorage();
  }
  listItem.remove();
}

// initalizing stored items 
let storedItems = JSON.parse(localStorage.getItem("items")) || [];
if (storedItems.length > 0) {
  try {
    ultag.removeChild(initial);
  } catch (error) {
    console.log("Could not find the initial element");
  }
}
storedItems.forEach(addListItem);
