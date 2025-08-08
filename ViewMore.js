let products = JSON.parse(localStorage.getItem("products")) || [];
let productId = JSON.parse(localStorage.getItem("productId")) || null;

console.log(products);
console.log(productId);

let productDetails = document.querySelector(".productDetails");

if (productId && products) {
  let selectProduct = products.find((v) => {
    return v.id == productId;
  });
  console.log(selectProduct);
  if (selectProduct) {
    productDetails.innerHTML = `<div class="card">
        <div class="card-inner">
          <div class="img-container">
            <img src="${selectProduct.thumbnail}" alt="${selectProduct.title}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${selectProduct.title}</h5><br>
            <p class="card-text"><b>Brand</b> : ${selectProduct.brand}</p><br>
            <p class="card-text"><b>Bategory</b> : ${
              selectProduct.category
            }</p><br>
            <p class="card-text">${selectProduct.description}</p><br>
            <p class="card-text"><b>Price</b> : <span >$${
              selectProduct.price
            }</span> </p>
            
            <button id="btnA"  >Add to Cart</button> <button id="btnB">Back to Home</button>
          </div>
        </div>
        <div class="reviews">
           <h1>Customer reviews</h1><hr>
           ${selectProduct.reviews.map(
             (review) => `ratings :${"❤️".repeat(review.rating)}
           ${"🖤".repeat(5 - review.rating)}</div>
           
           <p>${review.comment}</p>
           <p id="name>By <strong>${review.reviewerName} on $${new Date(
               review.date
             )}</strong></p> <hr>
           
           `
           )}




        </div>
      </div>`;
  } else {
    productDetails.innerHTML = "Product Not Found";
  }
} else {
  console.log("Product not found");
}
