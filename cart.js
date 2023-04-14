const fruits = JSON.parse(localStorage.getItem("fruits"));

const subtotalPrice = document.querySelector(".subtotal-price");
let subtotal = 0;
subtotalPrice.innerText = subtotal;

const totalPrice = document.querySelector(".total-price");
totalPrice.innerText = subtotal;

let hasAppliedCoupon = false;

function calculatePrices() {
  const totalPriceElements = document.querySelectorAll(".fruit-total-price");

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
  fruits.forEach((fruit) => {
    subtotal = subtotal + fruit.cost * fruit.quantity;
    subtotalPrice.innerText = subtotal;
    totalPrice.innerText = subtotal;

    const productContainer = document.querySelector(".products-container");

    const product = document.createElement("div");
    product.classList.add("row", "product-item");

    const fruitImageContainer = document.createElement("div");
    fruitImageContainer.classList.add(
      "col-3",
      "col-sm-4",
      "col-md-5",
      "col-lg-6",
      "image-name-fruit",
      "mt-3",
      "d-flex",
      "flex-wrap"
    );

    const fruitImage = document.createElement("img");
    fruitImage.setAttribute("src", fruit.image);
    fruitImage.setAttribute("alt", fruit.name);
    fruitImage.classList.add("image-fruit");
    product.appendChild(fruitImage);

    const fruitParagraf = document.createElement("p");
    fruitParagraf.classList.add(
      "f20",
      "align-self-center",
      "ps-md-4",
      "product-name"
    );
    fruitParagraf.innerText = fruit.name;
    product.appendChild(fruitParagraf);

    fruitImageContainer.appendChild(fruitImage);

    const fruitPriceContainer = document.createElement("div");
    fruitPriceContainer.classList.add(
      "col-3",
      "col-sm-2",
      "col-md-2",
      "col-lg-1",
      "align-self-center",
      "text-center",
      "f20"
    );

    const fruitPrice = document.createElement("p");
    fruitPrice.classList.add("mb-0");
    fruitPrice.innerText = "$";
    const fruitPriceText = document.createElement("span");
    fruitPriceText.classList.add("fruit-price");
    fruitPriceText.innerText = fruit.cost;
    fruitPrice.appendChild(fruitPriceText);
    fruitPriceContainer.appendChild(fruitPrice);

    fruitImageContainer.appendChild(fruitParagraf);

    const fruitQuantity = document.createElement("div");
    fruitQuantity.classList.add(
      "col-3",
      "col-sm-3",
      "col-md-2",
      "col-lg-3",
      "d-flex",
      "justify-content-center",
      "quantity"
    );

    const fruitQuantityContainer = document.createElement("div");
    fruitQuantityContainer.classList.add("product-q");

    const fruitQuantityInput = document.createElement("input");
    fruitQuantityInput.classList.add("quantity-products");
    fruitQuantityInput.setAttribute("type", "number");
    fruitQuantityInput.setAttribute("value", fruit.quantity);
    fruitQuantityInput.setAttribute("class", "counter-input");
    fruitQuantityInput.setAttribute("min", "1");

    fruitQuantityContainer.appendChild(fruitQuantityInput);
    fruitQuantity.appendChild(fruitQuantityContainer);

    const fruitTotalCostContainer = document.createElement("div");
    fruitTotalCostContainer.classList.add(
      "col-2",
      "col-sm-2",
      "col-md-2",
      "col-lg-1",
      "align-self-center",
      "text-center",
      "f20"
    );

    const fruitTotalCostPriceText = document.createElement("p");
    fruitTotalCostPriceText.classList.add("mb-0");
    fruitTotalCostPriceText.innerText = "$";

    const fruitTotalCostPriceSpan = document.createElement("span");
    fruitTotalCostPriceSpan.classList.add("fruit-total-price");
    fruitTotalCostPriceSpan.innerText = fruit.cost * fruit.quantity;

    fruitQuantityInput.addEventListener("input", (event) => {
      fruitTotalCostPriceSpan.innerText =
        parseInt(event.target.value) * fruit.cost;

      calculatePrices();

      const storageFruits = JSON.parse(localStorage.getItem("fruits"));
      const fruitIndex = storageFruits.findIndex(
        (currentFruit) => fruit.name === currentFruit.name
      );
      storageFruits[fruitIndex].quantity = parseInt(event.target.value);
      localStorage.setItem("fruits", JSON.stringify(storageFruits));
    });

    fruitTotalCostPriceText.appendChild(fruitTotalCostPriceSpan);
    fruitTotalCostContainer.appendChild(fruitTotalCostPriceText);

    const fruitDeleteContainer = document.createElement("div");
    fruitDeleteContainer.classList.add(
      "col-1",
      "col-sm-1",
      "col-md-1",
      "col-lg-1",
      "text-center",
      "trash-btn"
    );

    const fruitDeleteIcon = document.createElement("i");
    fruitDeleteIcon.classList.add("fa-solid", "fa-trash-can");

    fruitDeleteContainer.appendChild(fruitDeleteIcon);

    product.appendChild(fruitImageContainer);
    product.appendChild(fruitPriceContainer);
    product.appendChild(fruitQuantity);
    product.appendChild(fruitTotalCostContainer);
    product.appendChild(fruitDeleteContainer);

    productContainer.appendChild(product);

    fruitDeleteIcon.addEventListener("click", () => {
      product.remove();
      calculatePrices();

      const storageFruits = JSON.parse(localStorage.getItem("fruits"));
      const fruitIndex = storageFruits.findIndex(
        (fruits) => fruits.name === fruitParagraf.innerText
      );

      storageFruits.splice(fruitIndex, 1);

      localStorage.setItem("fruits", JSON.stringify(storageFruits));
    });
  });
});

const discountCodes = ["EASTER20", "PROMO20", "SALE20"];

const couponCodesButton = document.querySelector(".form-btn");
couponCodesButton.addEventListener("click", () => {
  const couponValue = document.querySelector(".form-code").value;
  const couponInput = document.querySelector(".form-code");

  if (hasAppliedCoupon) {
    const couponDiscountTitle = document.querySelector(".discount-title");
    const couponError = document.querySelector(".coupon-error-container");

    if (couponError) {
      return;
    }

    const hasAppliedCouponAlertContainer = document.createElement("div");
    hasAppliedCouponAlertContainer.classList.add("coupon-error-container");
    const hasAppliedCouponAlert = document.createElement("p");
    hasAppliedCouponAlert.classList.add("text-danger", "p-1", "m-0");
    hasAppliedCouponAlert.innerText = "Your discount has already been applied!";
    hasAppliedCouponAlertContainer.appendChild(hasAppliedCouponAlert);
    couponDiscountTitle.appendChild(hasAppliedCouponAlertContainer);
    couponInput.classList.add("border-danger");
    return;
  }

  if (discountCodes.includes(couponValue)) {
    hasAppliedCoupon = true;
    applyDiscountCode();
    couponInput.classList.remove("border-danger");
    couponInput.classList.add("border-success");
    document.querySelector(".form-code").value = "";
    couponInput.setAttribute("placeholder", "You're welcome!");
    const priceWithoutDiscount = document.querySelector(
      ".total-price-paragraf"
    );
    priceWithoutDiscount.classList.add("text-decoration-line-through", "pe-2");

    const couponError = document.querySelector(".coupon-error-container");
    if (couponError) {
      couponError.remove();
    }
  } else {
    const couponError = document.querySelector(".coupon-error-container");
    if (couponError) {
      return;
    }
    const couponDiscountTitle = document.querySelector(".discount-title");
    const couponErrorContainer = document.createElement("div");
    couponErrorContainer.classList.add("coupon-error-container");
    const couponErrorText = document.createElement("p");
    couponErrorText.classList.add("text-danger", "p-1", "m-0");
    couponErrorText.innerText = "Please use one of the codes from below!";
    couponErrorContainer.appendChild(couponErrorText);
    couponDiscountTitle.appendChild(couponErrorContainer);
    couponInput.classList.add("border-danger");
    couponInput.classList.remove("border-success");
    document.querySelector(".form-code").value = "";
    couponInput.setAttribute("placeholder", "Please use one of the codes");
  }
});
