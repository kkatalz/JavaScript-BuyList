const form = document.querySelector(".items-name-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector(".items-name-input");
  const inputValue = input.value;

  //check if is not empty
  if (inputValue.trim() != "") {
    addToBuyList(inputValue, 1);
    input.value = "";
  }
});

const defaultBuyItems = [
  {
    itemName: "Помідори",
    amount: 1,
  },
  {
    itemName: "Печиво",
    amount: 2,
  },
  {
    itemName: "Сир",
    amount: 1,
  },
];

function addToBuyList(itemName, amount) {
  const buyList = document.querySelector(".buy-list");
  // Create the outermost div element with class "grid-items"
  const gridItemsDiv = document.createElement("div");
  gridItemsDiv.classList.add("grid-items");

  // Create the h3 element with class "grid-items-title"
  const gridItemsTitle = document.createElement("h3");
  gridItemsTitle.classList.add("grid-items-title");
  gridItemsTitle.innerText = itemName;

  // Create the div element with class "space-between-buttons"
  const spaceBetweenButtonsDiv = document.createElement("div");
  spaceBetweenButtonsDiv.classList.add("space-between-buttons");

  // Create the first button element with class "button-change-number red" and data-tooltip attribute
  const decreaseButton = document.createElement("button");
  decreaseButton.classList.add("button-change-number", "red");
  decreaseButton.setAttribute("data-tooltip", "Зменшити кількість товарів");
  decreaseButton.setAttribute("type", "button");
  decreaseButton.innerText = "-";

  // Create the div element with class "grid-items-amount" and innerText "2"
  const gridItemsAmountDiv = document.createElement("div");
  gridItemsAmountDiv.classList.add("grid-items-amount");
  gridItemsAmountDiv.innerText = amount;

  // Create the second button element with class "button-change-number green" and data-tooltip attribute
  const increaseButton = document.createElement("button");
  increaseButton.classList.add("button-change-number", "green");
  increaseButton.setAttribute("data-tooltip", "Збільшити кількість товарів");
  increaseButton.setAttribute("type", "button");
  increaseButton.innerText = "+";

  // Append the first button, grid-items-amount div, and second button to the space-between-buttons div
  spaceBetweenButtonsDiv.appendChild(decreaseButton);
  spaceBetweenButtonsDiv.appendChild(gridItemsAmountDiv);
  spaceBetweenButtonsDiv.appendChild(increaseButton);

  // Create the div element with no class, but containing an h3 element with class "grid-items-not-bought" and a button element with class "delete-item" and data-tooltip attribute
  const notBoughtDiv = document.createElement("div");
  const notBoughtTitle = document.createElement("h3");
  notBoughtTitle.classList.add("grid-items-not-bought");
  notBoughtTitle.innerText = "Не куплено";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-item");
  deleteButton.setAttribute("data-tooltip", "Видалити");
  deleteButton.innerText = "x";
  notBoughtDiv.appendChild(notBoughtTitle);
  notBoughtDiv.appendChild(deleteButton);

  // Append the child elements to their respective parent elements
  gridItemsDiv.appendChild(gridItemsTitle);
  gridItemsDiv.appendChild(spaceBetweenButtonsDiv);
  gridItemsDiv.appendChild(notBoughtDiv);

  // Add the necessary attributes and innerText to the elements as described in the HTML markup
  // none needed in this case

  // Add the grid-items div to the parent element in the HTML document
  buyList.appendChild(gridItemsDiv);
}

//task2. Settings
defaultBuyItems.forEach((buyItem) =>
  addToBuyList(buyItem.itemName, buyItem.amount)
);
