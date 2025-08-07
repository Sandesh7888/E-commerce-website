let product = [];

function fetchdata() {
    fetch(`https://dummyjson.com/products`)
        .then((res) => res.json())
        .then((val) => {
            product = val.products;
            console.log(product);

            // Store in localStorage
            localStorage.setItem("products", JSON.stringify(product));

            // Display products
            fetchProduct(product);
        })
        .catch(err => console.error("Error fetching products:", err));
}
fetchdata();

let container = document.querySelector("#container");

function fetchProduct(product) {
    let output = "";

    product.forEach((v) => {
        output += `
        <div class="card">
            <img src="${v.images[0]}" alt="${v.title}">
            <h2>${v.title}</h2> 
            <p><b>category:</b> ${v.category}</p>
            <p><b>rating:</b> ${"⭐".repeat(Math.round(v.rating) )}</p>
            <p><b>price:</b> Rs. ${Math.round(v.price*80)}</p>
            
          
            
            <button id="view" onclick="viewMore(${v.id})" >view more</button>
            
        </div>
        `;
    });

    container.innerHTML = output;
}


document.getElementById("searchProduct").addEventListener('input', function searchterm(event){
    let searchTerm=event.target.value.toLowerCase()

    let fiteredProduct=product.filter((val)=>{
        return(
            val.title.toLowerCase().includes(searchTerm) || val.category.toLowerCase().includes(searchTerm)
        )
    })
    fetchProduct(fiteredProduct);

})

function viewMore(productId){
    console.log(productId);
    localStorage.setItem("productId",productId)
    window.location.href="/ViewMore.html"
    DisplayCard();
    

}
    