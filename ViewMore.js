let products = JSON.parse(localStorage.getItem("products")) || [];
let productId = JSON.parse(localStorage.getItem("productId")) || null;

console.log(products);
console.log(productId);

// Correctly filter the product by ID
let productData = products.filter((v) => v.id == productId);
console.log(productData);

// Select container
let productDetails = document.querySelector(".productDetails");

// Display card
function DisplayCard() {
  let output = "";

  productData.forEach((product) => {
    output += `
      <div class="card">
        <div class="card-inner">
          <div class="img-container">
            <img src="${product.thumbnail}" alt="${product.title}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><b>Price</b> : $${product.price}</p>
            <p class="card-text"><b>Brand</b> : ${product.brand}</p>
            <p class="card-text"><b>rating</b> : ${product.rating}</p>
            <p class="card-text"><b>discount Percentage</b> : ${product.discountPercentage}%</p>
            <p class="card-text"><b>warranty </b> : ${product.warrantyInformation}</p>
            <p class="card-text"><b>return Policy</b> : ${product.returnPolicy}</p>
            <button >Add Card</button>
          </div>
        </div>
      </div>`;
  });

  productDetails.innerHTML = output;
}


DisplayCard();
