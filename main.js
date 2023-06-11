const form = document.querySelector(".items-name-form");

const defaultBuyItems = [
  {
    itemName: "Помідори",
    amount: 10,
  },
  {
    itemName: "Печиво",
    amount: 20,
  },
  {
    itemName: "Сир",
    amount: 10,
  },
];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector(".items-name-input");
  const inputValue = input.value;

  //check if is not empty and item hasn't the same name
  if (
    inputValue.trim() != "" &&
    defaultBuyItems.every(
      (item) => item.itemName.toLowerCase() !== inputValue.toLowerCase()
    )
  ) {
    addToBuyList(inputValue, 1);
    input.value = "";
    input.focus();
  } else {
    alert(
      "Оберіть ім'я, що до цього не використовувалося та мало хоча б одну літеру!"
    );
  }
});

function addToBuyList(itemName, amount) {
  let leftItem = addProductToLeftItems(itemName, amount);
  let leftItemAmount = amount;
  let boughtItem;

  const buyList = document.querySelector(".buy-list");
  // Create the outermost div element with class "grid-items"
  const gridItemsDiv = document.createElement("div");
  gridItemsDiv.classList.add("grid-items");

  const newItemBuyList = {
    itemName,
    amount,
  };

  defaultBuyItems.push(newItemBuyList);

  // Create the h3 element with class "grid-items-title"
  const gridItemsTitle = document.createElement("h3");
  gridItemsTitle.classList.add("grid-items-title");
  gridItemsTitle.innerText = itemName;

  gridItemsTitle.addEventListener("click", () => {
    if (notBoughtTitle.innerText == "Не куплено") {
      const inputDiv = document.createElement("div");
      const input = document.createElement("input");
      input.classList.add("grid-items-input");
      inputDiv.appendChild(input);

      gridItemsTitle.replaceWith(inputDiv);

      input.focus();
      input.addEventListener("blur", () => {
        if (
          defaultBuyItems.every(
            (item) => item.itemName.toLowerCase() !== input.value.toLowerCase()
          )
        ) {
          gridItemsTitle.innerText = input.value;

          leftItem.childNodes[0].nodeValue = gridItemsTitle.innerText;
        } else {
          alert("Оберіть ім'я, що до цього не використовувалося!");
        }
        inputDiv.replaceWith(gridItemsTitle);
      });
    }
  });

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

  //Decrease amount of items until amount!=1
  decreaseButton.addEventListener("click", () => {
    if (parseInt(gridItemsAmountDiv.innerText) === 1)
      decreaseButton.setAttribute("disabled", true);
    else {
      gridItemsAmountDiv.innerText = parseInt(gridItemsAmountDiv.innerText) - 1;

      const leftItemAmountContainer = leftItem.querySelector(".amount");
      leftItemAmountContainer.innerText = gridItemsAmountDiv.innerText;
      leftItemAmount = gridItemsAmountDiv.innerText;
    }
  });

  // Create the second button element with class "button-change-number green" and data-tooltip attribute
  const increaseButton = document.createElement("button");
  increaseButton.classList.add("button-change-number", "green");
  increaseButton.setAttribute("data-tooltip", "Збільшити кількість товарів");
  increaseButton.setAttribute("type", "button");
  increaseButton.innerText = "+";

  increaseButton.addEventListener("click", () => {
    if (parseInt(gridItemsAmountDiv.innerText) === 1)
      decreaseButton.removeAttribute("disabled");
    gridItemsAmountDiv.innerText = parseInt(gridItemsAmountDiv.innerText) + 1;

    const leftItemAmountContainer = leftItem.querySelector(".amount");
    leftItemAmountContainer.innerText = gridItemsAmountDiv.innerText;
    leftItemAmount = gridItemsAmountDiv.innerText;
  });

  // Append the first button, grid-items-amount div, and second button to the space-between-buttons div
  spaceBetweenButtonsDiv.appendChild(decreaseButton);
  spaceBetweenButtonsDiv.appendChild(gridItemsAmountDiv);
  spaceBetweenButtonsDiv.appendChild(increaseButton);

  // Create the div element with no class, but containing an h3 element with class "grid-items-not-bought" and a button element with class "delete-item" and data-tooltip attribute
  const notBoughtDiv = document.createElement("div");
  const notBoughtTitle = document.createElement("h3");
  notBoughtTitle.classList.add("grid-items-not-bought");
  notBoughtTitle.innerText = "Не куплено";

  notBoughtTitle.addEventListener("click", () => {
    if (notBoughtTitle.innerText == "Не куплено") {
      notBoughtTitle.innerText = "Куплено";
      gridItemsTitle.classList.add("crossed");
      decreaseButton.remove();
      increaseButton.remove();
      deleteButton.remove();
      leftItem.remove();
      boughtItem = addProductToBoughtItems(itemName, leftItemAmount);
    } else {
      notBoughtTitle.innerText = "Не куплено";
      gridItemsTitle.classList.remove("crossed");
      gridItemsAmountDiv.remove();
      spaceBetweenButtonsDiv.appendChild(decreaseButton);
      spaceBetweenButtonsDiv.appendChild(gridItemsAmountDiv);
      spaceBetweenButtonsDiv.appendChild(increaseButton);
      notBoughtDiv.appendChild(deleteButton);
      boughtItem.remove();
      leftItem = addProductToLeftItems(itemName, leftItemAmount);
    }
  });

  const deleteButton = document.createElement("button");

  deleteButton.classList.add("delete-item");
  deleteButton.setAttribute("data-tooltip", "Видалити");
  deleteButton.innerText = "x";
  // deleting item
  deleteButton.addEventListener("click", function () {
    this.parentNode.parentNode.remove();
    leftItem.remove();
  });

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

function addProductToSecondBlock(containerId, productName, amount) {
  const container = document.getElementById(containerId);
  const productItem = document.createElement("span");
  productItem.classList.add("product-item");
  if (containerId === "bought-items") productItem.classList.add("crossed");
  productItem.innerHTML =
    productName +
    `<span class='amount ${containerId === "bought-items" ? "crossed" : ""}'>` +
    amount +
    "</span>";
  container.appendChild(productItem);

  return productItem;
}

function addProductToLeftItems(productName, amount) {
  return addProductToSecondBlock("left-items", productName, amount);
}
function addProductToBoughtItems(productName, amount) {
  return addProductToSecondBlock("bought-items", productName, amount);
}
