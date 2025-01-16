const products = JSON.parse(localStorage.getItem("products"));

const subtotalPrice = document.querySelector(".subtotal-price");
let subtotal = 0;
subtotalPrice.innerText = subtotal;

const totalPrice = document.querySelector(".total-price");
totalPrice.innerText = subtotal;

let hasAppliedCoupon = false;

function calculatePrices() {
  const totalPriceElements = document.querySelectorAll(".product-total-price");

  let updatetedSubtotal = 0;

  totalPriceElements.forEach((price) => {
    updatetedSubtotal = updatetedSubtotal + parseInt(price.innerText);
  });

  subtotal = updatetedSubtotal;
  subtotalPrice.innerText = subtotal;
  totalPrice.innerText = subtotal;

  if (hasAppliedCoupon) {
    const totalPriceWithDiscountElement = document.querySelector(
      ".total-price-with-discount"
    );
    totalPriceWithDiscountElement.innerText = subtotal - (20 / 100) * subtotal;
  }
}

function applyPriceDiscount() {
  const totalMoney = document.querySelector(".total-money");

  const newTotalPriceContainer = document.createElement("div");
  const newTotalPriceText = document.createElement("p");
  newTotalPriceText.innerText = "$";

  const newTotalPriceSpanText = document.createElement("span");
  newTotalPriceSpanText.classList.add("total-price-with-discount");
  newTotalPriceSpanText.innerText = subtotal - (20 / 100) * subtotal;

  newTotalPriceText.appendChild(newTotalPriceSpanText);
  newTotalPriceContainer.appendChild(newTotalPriceText);
  totalMoney.appendChild(newTotalPriceContainer);
}

function applyDiscountCode() {
  const subTotalContainer = document.querySelector(".subtotal");

  const couponReduceContainer = document.createElement("div");

  const totalCostText = document.createElement("b");
  totalCostText.innerText = "DISCOUNT 20%";
  totalCostText.classList.add("discount");

  applyPriceDiscount();

  couponReduceContainer.appendChild(totalCostText);
  subTotalContainer.appendChild(couponReduceContainer);
}

window.addEventListener("DOMContentLoaded", () => {
  products.forEach((product) => {
    subtotal = subtotal + product.cost * product.quantity;
    subtotalPrice.innerText = subtotal;
    totalPrice.innerText = subtotal;

    const productContainer = document.querySelector(".products-container");

    const productRow = document.createElement("div");
    productRow.classList.add("row", "product-item");

    const productImageContainer = document.createElement("div");
    productImageContainer.classList.add(
      "col-3",
      "col-sm-4",
      "col-md-5",
      "col-lg-6",
      "image-name-product",
      "mt-3",
      "d-flex",
      "flex-wrap"
    );

    const productImage = document.createElement("img");
    productImage.setAttribute("src", product.image);
    productImage.setAttribute("alt", product.name);
    productImage.classList.add("image-product");
    productRow.appendChild(productImage);

    const productParagraf = document.createElement("p");
    productParagraf.classList.add(
      "f20",
      "align-self-center",
      "ps-md-4",
      "product-name"
    );
    productParagraf.innerText = product.name;
    productRow.appendChild(productParagraf);

    productImageContainer.appendChild(productImage);

    const productPriceContainer = document.createElement("div");
    productPriceContainer.classList.add(
      "col-3",
      "col-sm-2",
      "col-md-2",
      "col-lg-1",
      "align-self-center",
      "text-center",
      "f20"
    );

    const productPrice = document.createElement("p");
    productPrice.classList.add("mb-0");
    productPrice.innerText = "$";
    const productPriceText = document.createElement("span");
    productPriceText.classList.add("product-price");
    productPriceText.innerText = product.cost;
    productPrice.appendChild(productPriceText);
    productPriceContainer.appendChild(productPrice);

    productImageContainer.appendChild(productParagraf);

    const productQuantity = document.createElement("div");
    productQuantity.classList.add(
      "col-3",
      "col-sm-3",
      "col-md-2",
      "col-lg-3",
      "d-flex",
      "justify-content-center",
      "quantity"
    );

    const productQuantityContainer = document.createElement("div");
    productQuantityContainer.classList.add("product-q");

    const productQuantityInput = document.createElement("input");
    productQuantityInput.classList.add("quantity-products");
    productQuantityInput.setAttribute("type", "number");
    productQuantityInput.setAttribute("value", product.quantity);
    productQuantityInput.setAttribute("class", "counter-input");
    productQuantityInput.setAttribute("min", "1");

    productQuantityContainer.appendChild(productQuantityInput);
    productQuantity.appendChild(productQuantityContainer);

    const productTotalCostContainer = document.createElement("div");
    productTotalCostContainer.classList.add(
      "col-2",
      "col-sm-2",
      "col-md-2",
      "col-lg-1",
      "align-self-center",
      "text-center",
      "f20"
    );

    const productTotalCostPriceText = document.createElement("p");
    productTotalCostPriceText.classList.add("mb-0");
    productTotalCostPriceText.innerText = "$";

    const productTotalCostPriceSpan = document.createElement("span");
    productTotalCostPriceSpan.classList.add("product-total-price");
    productTotalCostPriceSpan.innerText = product.cost * product.quantity;

    productQuantityInput.addEventListener("input", (event) => {
      productTotalCostPriceSpan.innerText =
        parseInt(event.target.value) * product.cost;

      calculatePrices();

      const storageFruits = JSON.parse(localStorage.getItem("products"));
      const productIndex = storageFruits.findIndex(
        (currentFruit) => product.name === currentFruit.name
      );
      storageFruits[productIndex].quantity = parseInt(event.target.value);
      localStorage.setItem("products", JSON.stringify(storageFruits));
    });

    productTotalCostPriceText.appendChild(productTotalCostPriceSpan);
    productTotalCostContainer.appendChild(productTotalCostPriceText);

    const productDeleteContainer = document.createElement("div");
    productDeleteContainer.classList.add(
      "col-1",
      "col-sm-1",
      "col-md-1",
      "col-lg-1",
      "text-center",
      "trash-btn"
    );

    const productDeleteIcon = document.createElement("i");
    productDeleteIcon.classList.add("fa-solid", "fa-trash-can");

    productDeleteContainer.appendChild(productDeleteIcon);

    productRow.appendChild(productImageContainer);
    productRow.appendChild(productPriceContainer);
    productRow.appendChild(productQuantity);
    productRow.appendChild(productTotalCostContainer);
    productRow.appendChild(productDeleteContainer);

    productContainer.appendChild(productRow);

    productDeleteIcon.addEventListener("click", () => {
      productRow.remove();
      calculatePrices();

      const storageFruits = JSON.parse(localStorage.getItem("products"));
      const productIndex = storageFruits.findIndex(
        (products) => products.name === productParagraf.innerText
      );

      storageFruits.splice(productIndex, 1);

      localStorage.setItem("products", JSON.stringify(storageFruits));
    });
  });
});

const discountCodes = ["EASTER20", "PROMO20", "SALE20"];

const couponCodesButton = document.querySelector(".form-btn");
couponCodesButton.addEventListener("click", () => {
  const couponValue = document.querySelector(".form-code").value.trim();
  const couponInput = document.querySelector(".form-code");

  const couponErrorContainer = document.querySelector(
    ".coupon-error-container"
  );
  if (couponErrorContainer) {
    couponErrorContainer.remove();
    couponInput.classList.remove("border-danger");
  }

  if (couponValue === "") {
    const couponDiscountTitle = document.querySelector(".discount-title");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("coupon-error-container");
    const errorText = document.createElement("p");
    errorText.classList.add("text-danger", "p-1", "m-0");
    errorText.innerText =
      "Câmpul este gol. Vă rugăm să introduceți un cod valid!";
    errorContainer.appendChild(errorText);
    couponDiscountTitle.appendChild(errorContainer);
    couponInput.classList.add("border-danger");
    return;
  }

  if (!discountCodes.includes(couponValue)) {
    const couponDiscountTitle = document.querySelector(".discount-title");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("coupon-error-container");
    const errorText = document.createElement("p");
    errorText.classList.add("text-danger", "p-1", "m-0");
    errorText.innerText =
      "Codul introdus este greșit. Vă rugăm să folosiți unul din cele afișate mai jos!";
    errorContainer.appendChild(errorText);
    couponDiscountTitle.appendChild(errorContainer);
    couponInput.classList.add("border-danger");
    return;
  }

  hasAppliedCoupon = true;
  applyDiscountCode();
  couponInput.classList.remove("border-danger");
  couponInput.classList.add("border-success");
  document.querySelector(".form-code").value = "";
  couponInput.setAttribute("placeholder", "Cod aplicat cu succes!");

  const priceWithoutDiscount = document.querySelector(".total-price-paragraf");
  priceWithoutDiscount.classList.add("text-decoration-line-through", "pe-2");
});
