let storedBuyItems = JSON.parse(localStorage.getItem("defaultBuyItems"));
let defaultBuyItems = [];

if (!storedBuyItems) {
  defaultBuyItems = [
    {
      itemName: "Помідори",
      amount: 1,
      bought: false,
    },
    {
      itemName: "Печиво",
      amount: 1,
      bought: false,
    },
    {
      itemName: "Сир",
      amount: 1,
      bought: false,
    },
  ];

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("defaultBuyItems", JSON.stringify(defaultBuyItems));
}

form.addEventListener("submit", function (e) {
  const form = document.querySelector(".items-name-form");

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
    addToBuyList(inputValue, 1, false);
    input.value = "";
    input.focus();
  } else {
    alert(
      "Оберіть ім'я, що до цього не використовувалося та мало хоча б одну літеру!"
    );
  }
});

function addToBuyList(itemName, amount, itemBought) {
  let leftItem = addProductToLeftItems(itemName, amount);
  let leftItemAmount = amount;
  let boughtItem;

  const buyList = document.querySelector(".buy-list");
  // Create the outermost div element with class "grid-items"
  const gridItemsDiv = document.createElement("div");
  gridItemsDiv.classList.add("grid-items");

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
          defaultBuyItems.forEach((item) => {
            if (item.itemName === gridItemsTitle.innerText) {
              item.itemName = input.value;
            }
          });
          saveToLocalStorage();

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
      defaultBuyItems.forEach((item) => {
        if (item.itemName === gridItemsTitle.innerText) {
          item.amount = parseInt(gridItemsAmountDiv.innerText) - 1;
        }
      });
      gridItemsAmountDiv.innerText = parseInt(gridItemsAmountDiv.innerText) - 1;

      const leftItemAmountContainer = leftItem.querySelector(".amount");
      leftItemAmountContainer.innerText = gridItemsAmountDiv.innerText;
      leftItemAmount = gridItemsAmountDiv.innerText;

      saveToLocalStorage();
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
    defaultBuyItems.forEach((item) => {
      if (item.itemName === gridItemsTitle.innerText) {
        item.amount = parseInt(gridItemsAmountDiv.innerText) + 1;
      }
    });
    gridItemsAmountDiv.innerText = parseInt(gridItemsAmountDiv.innerText) + 1;

    const leftItemAmountContainer = leftItem.querySelector(".amount");
    leftItemAmountContainer.innerText = gridItemsAmountDiv.innerText;
    leftItemAmount = gridItemsAmountDiv.innerText;

    saveToLocalStorage();
  });

  // Append the first button, grid-items-amount div, and second button to the space-between-buttons div
  spaceBetweenButtonsDiv.appendChild(decreaseButton);
  spaceBetweenButtonsDiv.appendChild(gridItemsAmountDiv);
  spaceBetweenButtonsDiv.appendChild(increaseButton);

  // Create the div element with no class, but containing an h3 element with class "grid-items-not-bought" and a button element with class "delete-item" and data-tooltip attribute
  const notBoughtDiv = document.createElement("div");
  const notBoughtTitle = document.createElement("button");
  notBoughtTitle.setAttribute("data-tooltip", "Купити");
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
      notBoughtTitle.setAttribute("data-tooltip", "Відмінити покупку");

      boughtItem = addProductToBoughtItems(itemName, leftItemAmount);

      defaultBuyItems.forEach((item) => {
        if (item.itemName === gridItemsTitle.innerText) {
          item.bought = true;
          itemBought = true;
        }
      });
    } else {
      notBoughtTitle.innerText = "Не куплено";
      gridItemsTitle.classList.remove("crossed");
      gridItemsAmountDiv.remove();
      spaceBetweenButtonsDiv.appendChild(decreaseButton);
      spaceBetweenButtonsDiv.appendChild(gridItemsAmountDiv);
      spaceBetweenButtonsDiv.appendChild(increaseButton);
      notBoughtDiv.appendChild(deleteButton);
      notBoughtTitle.setAttribute("data-tooltip", "Купити");

      boughtItem.remove();
      leftItem = addProductToLeftItems(itemName, leftItemAmount);

      defaultBuyItems.forEach((item) => {
        if (item.itemName === gridItemsTitle.innerText) {
          item.bought = false;
          itemBought = false;
        }
      });
    }

    saveToLocalStorage();
  });

  const deleteButton = document.createElement("button");

  deleteButton.classList.add("delete-item");
  deleteButton.setAttribute("data-tooltip", "Видалити");
  deleteButton.innerText = "x";
  // deleting item
  deleteButton.addEventListener("click", function () {
    this.parentNode.parentNode.remove();
    leftItem.remove();

    defaultBuyItems = defaultBuyItems.filter(
      (item) => item.itemName !== leftItem.childNodes[0].nodeValue
    );

    saveToLocalStorage();
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

  const newItemBuyList = {
    itemName,
    amount,
    bought: itemBought,
  };

  defaultBuyItems.push(newItemBuyList);
  saveToLocalStorage();

  defaultBuyItems.forEach((item) => {
    if (itemBought === true && item.itemName === gridItemsTitle.innerText) {
      notBoughtTitle.innerText = "Куплено";
      gridItemsTitle.classList.add("crossed");
      decreaseButton.remove();
      increaseButton.remove();
      deleteButton.remove();
      leftItem.remove();
      boughtItem = addProductToBoughtItems(itemName, leftItemAmount);
    }
  });
}

//task2. Settings
storedBuyItems.forEach((buyItem) => {
  if (buyItem.itemName !== "")
    addToBuyList(buyItem.itemName, buyItem.amount, buyItem.bought);
});

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
