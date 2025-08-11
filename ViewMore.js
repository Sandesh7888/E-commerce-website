let products = JSON.parse(localStorage.getItem("products")) || [];
let productId = JSON.parse(localStorage.getItem("productId")) || null;

console.log(products);
console.log(productId);

let productDetails = document.querySelector(".productDetails");

if (productId && products) {
  let selectProduct = products.find((v) => v.id == productId);
  console.log(selectProduct);

  if (selectProduct) {
    productDetails.innerHTML = `
      <div class="card">
        <div class="card-inner">
          <div class="img-container">
            <img src="${selectProduct.thumbnail}" alt="${selectProduct.title}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${selectProduct.title}</h5><br>
            <p class="card-text"><b>Brand</b> : ${selectProduct.brand}</p>
            <p class="card-text"><b>Category</b> : ${selectProduct.category}</p>
            <p class="card-text">${selectProduct.description}</p><br>
            <p class="card-text"><b>Price</b> : <span>$${selectProduct.price}</span></p>
            <button id="btnA">Add to Cart</button>
            <button id="btnB">Back to Home</button>
          </div>
        </div>

        <div class="reviews">
          <h1>Customer Reviews</h1>
          <hr>
          ${selectProduct.reviews.map(review => `
            <div class="review">
              <p>Ratings: ${"❤️".repeat(review.rating)}${"🖤".repeat(5 - review.rating)}</p>
              <p>${review.comment}</p>
              <p>By <strong>${review.reviewerName}</strong> on <em>${new Date(review.date).toLocaleDateString()}</em></p>
              <hr>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.getElementById("btnA").addEventListener("click", () => {
      addToCart(selectProduct);
    });
    document.getElementById("btnB").addEventListener("click", () => {
      window.history.back();
    });
  } else {
    productDetails.innerHTML = "Product Not Found";
  }
} else {
  console.log("Product not found");
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");

}
document.getElementById("cartIcon").addEventListener("click", () => {
  window.location.href="/Cart.html";
});
