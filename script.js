const dropDownMenu = document.querySelector(".dropdown-menu");
const addToCartButtons = document.querySelectorAll(".add-cart");
const productsDropDown = document.querySelector(".products-dd");
const totalCostElement = document.querySelector(".total-money");

const fruitsFromStorage = JSON.parse(localStorage.getItem("fruits")) || [];

let count = 0;
let totalCost = 0;

totalCostElement.innerText = totalCost;

// empty cart message
const emptyCartContainer = document.createElement("div");
emptyCartContainer.classList.add("d-flex", "justify-content-center");
const emptyText = document.createElement("p");
emptyText.classList.add("mb-0");
emptyText.innerText = "Your cart is empty for a moment! :)";
emptyCartContainer.appendChild(emptyText);

// link to new page
const navigateButtonContainer = document.createElement("div");
navigateButtonContainer.classList.add("text-center", "navigate-button");
const navigateButton = document.createElement("a");
const navigateButtonText = document.createTextNode("here");
navigateButton.appendChild(navigateButtonText);
navigateButton.href = "shoping-cart.html";
navigateButton.innerText =
  "See " + navigateButton.innerText + " your full cart!";
navigateButtonContainer.appendChild(navigateButton);

function onAddToCartClick(event) {
  count++;
  const counter = document.querySelector(".counter");
  counter.innerText = count;

  emptyCartContainer.remove();

  const fruitCard = event.target.parentElement.parentElement;
  const fruitDetails = fruitCard.querySelector(".fruit-details");
  const fruitImage = fruitCard
    .querySelector(".images-products")
    .getAttribute("src");
  const fruitCost = parseInt(fruitCard.querySelector(".item-cost").innerText);
  const fruitName = fruitCard.querySelector(".item-name").innerText;

  // total price
  totalCost = totalCost + fruitCost;
  totalCostElement.innerText = totalCost;

  //storage
  const fruit = {
    name: fruitName,
    cost: fruitCost,
    image: fruitImage,
    quantity: 1,
  };

  if (JSON.parse(localStorage.getItem("fruits"))) {
    const myArray = JSON.parse(localStorage.getItem("fruits"));
    myArray.push(fruit);
    localStorage.setItem("fruits", JSON.stringify(myArray));
  } else {
    localStorage.setItem("fruits", JSON.stringify([fruit]));
  }

  //create product in dropdown
  const item = document.createElement("li");
  item.classList.add(
    "container",
    "d-flex",
    "py-0",
    "px-2",
    "align-items-center",
    "justify-content-around",
    "product-dropdown-item"
  );
  productsDropDown.appendChild(item);

  const imageFruit = document.createElement("img");
  imageFruit.setAttribute("src", fruitImage);
  imageFruit.classList.add("product-image");
  item.appendChild(imageFruit);

  const fruitContainer = document.createElement("div");
  const itemName = document.createElement("p");
  itemName.classList.add("fruit-name");
  itemName.innerText = fruitName;
  fruitContainer.appendChild(itemName);

  const itemPrice = document.createElement("p");
  itemPrice.classList.add("fruit-cost");
  itemPrice.innerText = "$" + fruitCost + ".00";
  fruitContainer.appendChild(itemPrice);
  item.appendChild(fruitContainer);

  const addedToCartButton = document.createElement("i");
  addedToCartButton.setAttribute(
    "class",
    "fa-solid fa-circle-check text-success"
  );
  event.target.remove();
  fruitDetails.appendChild(addedToCartButton);

  const trashContainer = document.createElement("div");
  trashContainer.classList.add("ms-auto", "p-2");

  const iconTrashCan = document.createElement("i");
  iconTrashCan.classList.add("fa-solid", "fa-trash", "cursor-trash-can");
  trashContainer.appendChild(iconTrashCan);

  item.appendChild(trashContainer);

  if (!document.querySelector(".navigate-button")) {
    dropDownMenu.appendChild(navigateButtonContainer);
  }

  // remove product
  iconTrashCan.addEventListener("click", () => {
    totalCost = totalCost - fruitCost;
    totalCostElement.innerText = totalCost;

    item.remove();
    count--;
    counter.innerText = count;

    addedToCartButton.setAttribute(
      "class",
      "fa-solid fa-cart-plus cursor-add-to-cart"
    );

    addedToCartButton.addEventListener("click", (event) => {
      onAddToCartClick(event);
    });

    const totalProductsFromDropDown = document.querySelectorAll(
      ".product-dropdown-item"
    );

    if (totalProductsFromDropDown.length === 0) {
      dropDownMenu.appendChild(emptyCartContainer);
      navigateButtonContainer.remove();
    }

    const storageFruits = JSON.parse(localStorage.getItem("fruits"));
    const fruitIndex = storageFruits.findIndex(
      (fruit) => fruit.name === fruitName
    );
    storageFruits.splice(fruitIndex, 1);
    localStorage.setItem("fruits", JSON.stringify(storageFruits));
  });
}

function verifyProductAddedToCartButton() {
  fruitsFromStorage.forEach((fruit) => {
    const fruitCard = document.querySelector(
      '.fruit-card[data-fruit="' + fruit.name + '"]'
    );

    const addToCartButton = fruitCard.querySelector(".add-cart");
    const fruitDetails = fruitCard.querySelector(".fruit-details");

    addToCartButton.remove();

    const addedToCartButton = document.createElement("i");
    addedToCartButton.setAttribute(
      "class",
      "fa-solid fa-circle-check text-success"
    );

    fruitDetails.appendChild(addedToCartButton);
  });
}

function verifyShoppingCart() {
  const counter = document.querySelector(".counter");
  count = fruitsFromStorage.length;
  counter.innerText = count;

  if (count === 0) {
    dropDownMenu.appendChild(emptyCartContainer);
  } else {
    emptyCartContainer.remove();
    dropDownMenu.appendChild(navigateButtonContainer);
  }

  fruitsFromStorage.forEach((fruit) => {
    totalCost = totalCost + parseInt(fruit.cost);
    totalCostElement.innerText = totalCost;

    //create product in dropdown
    const item = document.createElement("li");
    item.classList.add(
      "container",
      "d-flex",
      "py-0",
      "px-2",
      "align-items-center",
      "justify-content-around",
      "product-dropdown-item"
    );
    productsDropDown.appendChild(item);

    const imageFruit = document.createElement("img");
    imageFruit.setAttribute("src", fruit.image);
    imageFruit.classList.add("product-image");
    item.appendChild(imageFruit);

    const fruitContainer = document.createElement("div");
    const itemName = document.createElement("p");
    itemName.classList.add("fruit-name");
    itemName.innerText = fruit.name;
    fruitContainer.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("fruit-cost");
    itemPrice.innerText = "$" + fruit.cost + ".00";
    fruitContainer.appendChild(itemPrice);
    item.appendChild(fruitContainer);

    const trashContainer = document.createElement("div");
    trashContainer.classList.add("ms-auto", "p-2");

    const iconTrashCan = document.createElement("i");
    iconTrashCan.classList.add("fa-solid", "fa-trash", "cursor-trash-can");
    trashContainer.appendChild(iconTrashCan);

    item.appendChild(trashContainer);

    // remove product
    iconTrashCan.addEventListener("click", () => {
      const fruitCard = document.querySelector(
        '.fruit-card[data-fruit="' + fruit.name + '"]'
      );
      const addedToCartButton = fruitCard.querySelector("i.fa-circle-check");

      totalCost = totalCost - fruit.cost;
      totalCostElement.innerText = totalCost;

      item.remove();
      count--;
      counter.innerText = count;

      addedToCartButton.setAttribute(
        "class",
        "fa-solid fa-cart-plus cursor-add-to-cart"
      );

      addedToCartButton.addEventListener("click", (event) => {
        onAddToCartClick(event);
      });

      const totalProductsFromDropDown = document.querySelectorAll(
        ".product-dropdown-item"
      );

      if (totalProductsFromDropDown.length === 0) {
        dropDownMenu.appendChild(emptyCartContainer);
        navigateButtonContainer.remove();
      }

      const storageFruits = JSON.parse(localStorage.getItem("fruits"));
      const fruitIndex = storageFruits.findIndex(
        (currentFruit) => currentFruit.name === fruit.name
      );
      storageFruits.splice(fruitIndex, 1);
      localStorage.setItem("fruits", JSON.stringify(storageFruits));
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  dropDownMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  verifyProductAddedToCartButton();
  verifyShoppingCart();

  addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      onAddToCartClick(event);
    });
  });
});
