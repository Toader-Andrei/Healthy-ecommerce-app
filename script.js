import { products } from "./fruits-and-vegetables.js";

const dropDownList = document.querySelector(".dropdown-menu");
const addToCartButtons = document.querySelectorAll(".add-cart");
const productsDropDown = document.querySelector(".products-dd");
const totalCostElement = document.querySelector(".total-money");

const productFromStorage = JSON.parse(localStorage.getItem("products")) || [];
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

  // text goes away
  emptyCartContainer.remove();

  const productCard = event.target.parentElement.parentElement;
  const productDetails = productCard.querySelector(".product-details");
  const productImage = productCard
    .querySelector(".images-products")
    .getAttribute("src");
  const productCost = parseInt(
    productCard.querySelector(".item-cost").innerText
  );
  const productName = productCard.querySelector(".item-name").innerText;
  const productCategory = productCard.dataset.category;
  // total price
  totalCost = totalCost + productCost;
  totalCostElement.innerText = totalCost;

  //storage
  const wantedProduct = {
    name: productName,
    cost: productCost,
    image: productImage,
    quantity: 1,
    category: productCategory,
  };
  if (JSON.parse(localStorage.getItem("products"))) {
    const myArray = JSON.parse(localStorage.getItem("products"));
    myArray.push(wantedProduct);
    localStorage.setItem("products", JSON.stringify(myArray));
  } else {
    localStorage.setItem("products", JSON.stringify([wantedProduct]));
  }

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

  const imageProduct = document.createElement("img");
  imageProduct.setAttribute("src", productImage);
  imageProduct.classList.add("product-image");
  item.appendChild(imageProduct);

  const productContainer = document.createElement("div");
  const itemName = document.createElement("p");
  itemName.classList.add("fruit-name");
  itemName.innerText = productName;
  productContainer.appendChild(itemName);

  const itemPrice = document.createElement("p");
  itemPrice.classList.add("fruit-cost");
  itemPrice.innerText = "$" + productCost + ".00";
  productContainer.appendChild(itemPrice);
  item.appendChild(productContainer);

  const addedToCartButton = document.createElement("i");
  addedToCartButton.setAttribute(
    "class",
    "fa-solid fa-circle-check text-success ps-1 "
  );
  event.target.remove();
  productDetails.appendChild(addedToCartButton);

  const trashContainer = document.createElement("div");
  trashContainer.classList.add("ms-auto", "p-2");

  const iconTrashCan = document.createElement("i");
  iconTrashCan.classList.add("fa-solid", "fa-trash", "cursor-trash-can");
  trashContainer.appendChild(iconTrashCan);

  item.appendChild(trashContainer);

  if (!document.querySelector(".navigate-button")) {
    dropDownList.appendChild(navigateButtonContainer);
  }

  //remove product
  iconTrashCan.addEventListener("click", () => {
    totalCost = totalCost - productCost;
    totalCostElement.innerText = totalCost;

    item.remove();
    count--;
    counter.innerText = count;

    addedToCartButton.setAttribute(
      "class",
      "fa-solid fa-cart-plus cursor-pointer ps-1"
    );

    addedToCartButton.addEventListener("click", (event) => {
      onAddToCartClick(event);
    });

    const totalProductsFromDropDown = document.querySelectorAll(
      ".product-dropdown-item"
    );

    if (totalProductsFromDropDown.length === 0) {
      dropDownList.appendChild(emptyCartContainer);
      navigateButtonContainer.remove();
    }

    const storageProducts = JSON.parse(localStorage.getItem("products"));
    const productIndex = storageProducts.findIndex(
      (wantedproduct) => wantedproduct.name === productName
    );
    storageProducts.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(storageProducts));
  });
}

function createProducts() {
  products.forEach((product) => {
    createProductCard(product);
  });
}

function createProductCard(product) {
  const productsContainer = document.querySelector(".products-container");

  const productContainer = document.createElement("div");
  productContainer.classList.add(
    "product-card",
    "col-xxl-3",
    "col-md-6",
    "col-12",
    "mb-3"
  );
  productContainer.setAttribute("data-name", product.name);
  productContainer.setAttribute("data-category", product.category);

  const productImage = document.createElement("img");
  productImage.setAttribute("src", product.image);
  productImage.setAttribute("alt", product.name);
  productImage.classList.add("images-products");

  productContainer.appendChild(productImage);

  const productDetails = document.createElement("div");
  productDetails.classList.add("mt-4", "fs-5", "product-details");

  const productName = document.createElement("p");
  productName.classList.add("item-name");
  productName.innerText = product.name;

  productDetails.appendChild(productName);
  productContainer.appendChild(productDetails);

  const productValutePrice = document.createElement("b");
  productValutePrice.innerText = "$";

  const productPriceNumber = document.createElement("span");
  productPriceNumber.classList.add("fs-5", "item-cost");
  productPriceNumber.innerText = product.cost + ".00";

  const trashContainer = document.createElement("div");
  trashContainer.classList.add("ms-auto", "p-2");

  const addedToCartButton = document.createElement("i");
  addedToCartButton.setAttribute(
    "class",
    "fa-solid fa-cart-plus cursor-pointer add-cart ps-1"
  );

  productValutePrice.appendChild(productPriceNumber);
  productDetails.appendChild(productValutePrice);
  productDetails.appendChild(addedToCartButton);

  productsContainer.appendChild(productContainer);

  addedToCartButton.addEventListener("click", (event) => {
    onAddToCartClick(event);
  });
}

function verifyShoppingCart() {
  const counter = document.querySelector(".counter");
  count = productFromStorage.length;
  counter.innerText = count;

  if (count === 0) {
    dropDownList.appendChild(emptyCartContainer);
  } else {
    emptyCartContainer.remove();
    dropDownList.appendChild(navigateButtonContainer);
  }

  productFromStorage.forEach((product) => {
    totalCost = totalCost + parseInt(product.cost);
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
    imageFruit.setAttribute("src", product.image);
    imageFruit.classList.add("product-image");
    item.appendChild(imageFruit);

    const fruitContainer = document.createElement("div");
    const itemName = document.createElement("p");
    itemName.classList.add("fruit-name");
    itemName.innerText = product.name;
    fruitContainer.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("fruit-cost");
    itemPrice.innerText = "$" + product.cost + ".00";
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
      const productCard = document.querySelector(
        '.product-card[data-name="' + product.name + '"]'
      );
      const addedToCartButton = productCard.querySelector("i.fa-circle-check");

      totalCost = totalCost - product.cost;
      totalCostElement.innerText = totalCost;

      item.remove();
      count--;
      counter.innerText = count;

      addedToCartButton.setAttribute(
        "class",
        "fa-solid fa-cart-plus cursor-pointer ps-1"
      );

      addedToCartButton.addEventListener("click", (event) => {
        onAddToCartClick(event);
      });

      const totalProductsFromDropDown = document.querySelectorAll(
        ".product-dropdown-item"
      );

      if (totalProductsFromDropDown.length === 0) {
        dropDownList.appendChild(emptyCartContainer);
        navigateButtonContainer.remove();
      }

      const storageProducts = JSON.parse(localStorage.getItem("products"));
      const productIndex = storageProducts.findIndex(
        (currentFruit) => currentFruit.name === product.name
      );
      storageProducts.splice(productIndex, 1);
      localStorage.setItem("fruits", JSON.stringify(storageProducts));
    });
  });
}

function verifyProductAddedToCartButton() {
  productFromStorage.forEach((product) => {
    const productCard = document.querySelector(
      '.product-card[data-name="' + product.name + '"]'
    );

    const addToCartButton = productCard.querySelector(".add-cart");
    const productDetails = productCard.querySelector(".product-details");

    addToCartButton.remove();

    const addedToCartButton = document.createElement("i");
    addedToCartButton.setAttribute(
      "class",
      "fa-solid fa-circle-check text-success ps-1"
    );
    productDetails.appendChild(addedToCartButton);
  });
}

const productsContainer = document.querySelector(".products-container");

const allProducts = document.querySelector(".all");
const fruitsCategory = document.querySelector(".fruits");
const vegetablesCategory = document.querySelector(".vegetables");

const categoriesList = document.querySelectorAll(".categories li");

categoriesList.forEach((category) => {
  category.addEventListener("click", (event) => {
    categoriesList.forEach((list) => list.classList.remove("active"));
    event.target.classList.add("active");
  });
});

allProducts.addEventListener("click", () => {
  productsContainer.innerHTML = "";
  const productsItems = products.filter(
    (product) =>
      product.category === "fruits" || product.category === "vegetables"
  );
  productsItems.forEach((product) => {
    createProductCard(product);
  });
});

fruitsCategory.addEventListener("click", () => {
  const fruits = products.filter((product) => product.category === "fruits");
  productsContainer.innerHTML = "";
  fruits.forEach((fruit) => {
    createProductCard(fruit);
  });
});

vegetablesCategory.addEventListener("click", () => {
  const vegetables = products.filter(
    (product) => product.category === "vegetables"
  );
  productsContainer.innerHTML = "";
  vegetables.forEach((vegetable) => {
    createProductCard(vegetable);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  dropDownList.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  createProducts();

  verifyProductAddedToCartButton();
  verifyShoppingCart();

  addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", (event) => {
      onAddToCartClick(event);
    });
  });
});

const editButton = document.querySelector(".edit-button");
editButton.addEventListener("click", (event) => {
  const nameInput = document.querySelector(".name-input");
  const nameUser = event.querySelector(".names");
  console.log(nameUser);
  nameInput.innerText = nameUser.value;
});
