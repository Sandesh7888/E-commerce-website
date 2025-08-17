let product = [];
let currentPage = 1;
const productsPerPage = 10;

// Fetch products
function fetchdata() {
  fetch(`https://dummyjson.com/products?limit=100`)
    .then((res) => res.json())
    .then((val) => {
      product = val.products;
      console.log(product);

      // Store in localStorage
      localStorage.setItem("products", JSON.stringify(product));

      // Initial display
      renderPage();
    })
    .catch((err) => console.error("Error fetching products:", err));
}
fetchdata();

let container = document.querySelector("#container");

// Render products for current page
function renderPage() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = product.slice(start, end);

  fetchProduct(pageProducts);
  updateUI();
}

// Display product cards
function fetchProduct(productList) {
  let output = "";

  productList.forEach((v) => {
    output += `
      <div class="card">
        <img src="${v.images[0]}" alt="${v.title}">
        <h2>${v.title}</h2> 
        <p><b>Category:</b> ${v.category}</p>
        <p><b>Rating:</b> ${"⭐".repeat(Math.round(v.rating))}</p>
        <p><b>Price:</b> Rs. ${Math.round(v.price * 80)}</p>
        <button onclick="viewMore(${v.id})">View more</button>
      </div>
    `;
  });

  container.innerHTML = output;
}

// Search functionality
document.getElementById("searchProduct").addEventListener("input", function (event) {
  let searchTerm = event.target.value.toLowerCase();

  let filteredProduct = product.filter((val) => {
    return (
      val.title.toLowerCase().includes(searchTerm) ||
      val.category.toLowerCase().includes(searchTerm)
    );
  });

  currentPage = 1; // reset to page 1
  fetchProduct(filteredProduct.slice(0, productsPerPage));
  updateUI(filteredProduct.length);
});

// View more
function viewMore(productId) {
  console.log(productId);
  localStorage.setItem("productId", productId);
  window.location.href = "./ViewMore.html";
}

// Cart
document.getElementById("cartIcon").addEventListener("click", () => {
  window.location.href = "./Cart.html";
});


// Pagination & Sorting
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pageInfo = document.querySelector(".page-info span");
const filterInfo = document.querySelector(".filter-info span");
const sortSelect = document.getElementById("sort");

// Update pagination UI
function updateUI(total = product.length) {
  const totalPages = Math.ceil(total / productsPerPage);

  // Page info
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  // Filter info
  let start = (currentPage - 1) * productsPerPage + 1;
  let end = Math.min(currentPage * productsPerPage, total);
  filterInfo.textContent = `Showing ${start}-${end} of ${total} products`;

  // Enable/Disable buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Pagination events
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(product.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

// Sorting logic
sortSelect.addEventListener("change", () => {
  const selected = sortSelect.value;

  if (selected === "price_low_high") {
    product.sort((a, b) => a.price - b.price);
  } else if (selected === "price_high_low") {
    product.sort((a, b) => b.price - a.price);
  } else {
    // default popularity = sort by rating
    product.sort((a, b) => b.rating - a.rating);
  }

  currentPage = 1;
  renderPage();
});







  // Show/Hide button on scroll
  window.addEventListener("scroll", function () {
    const backToTop = document.querySelector(".back-to-top");
    if (window.scrollY > 200) { 
      backToTop.style.display = "block"; 
    } else {
      backToTop.style.display = "none"; 
    }
  });

  // Scroll to top when clicked
  document.querySelector(".back-to-top a").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
