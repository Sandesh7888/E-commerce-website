document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});
function displayCart() {
  let cartContent = document.getElementById("cartContent");
  let totalPrice = document.getElementById("totalPrice");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContent.innerHTML = "";
  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.innerHTML = "<h2>Total Price: Rs. 0</h2>";
  } else {
    let totalBill = 0;
    cart.forEach((product, i) => {
      totalBill += product.price * 80;
      let Elem = document.createElement("div");
      Elem.setAttribute("class", "product-info");
      Elem.innerHTML = `
                <main>
                    <div>
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div>
                        <h1>${product.title}</h1>
                        <p class="card-text"><b>Brand</b> : ${product.brand}</p>                        
                        <p class="card-text"><b>Warranty Information</b> : ${product.warrantyInformation}</p>                
                        <p class="card-text"><b>Return Policy</b> : ${product.returnPolicy}</p>
                        <p class="card-text"><b>Shipping Information</b> : ${product.shippingInformation}</p>
                        <p class="card-text"><b>Price</b> : Rs. ${Math.round(product.price * 80)}</p>
                    </div>
                    <div>
                        <button class="removeBtn" onclick="removeFromCart(${i})"   >Remove</button>
                    </div>
                </main>
            `;
      cartContent.appendChild(Elem);
    });
    if (cart.length > 0) {
      totalPrice.innerHTML = `<h2>Total Price: Rs. ${Math.round(totalBill)}</h2>`;
    }
  }
}
function removeFromCart(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1); //staring index ,how much element remove
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
