// Dummy Products
const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2500 }
];

// Load Products on index.html
const productContainer = document.getElementById("product-list");
if (productContainer) {
  products.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">₹${p.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>`;
    productContainer.appendChild(col);
  });
}

// Cart Functions
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

const cartItemsContainer = document.getElementById("cart-items");
if (cartItemsContainer) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItemsContainer.appendChild(li);
  });
}
// Lambda + API Gateway se data fetch karna
fetch("https://6j2cyl9vm7.execute-api.eu-north-1.amazonaws.com/dev/products")
  .then(response => response.json())
  .then(data => {
    console.log("Products:", data);

    // Example: HTML me show karna
    let container = document.getElementById("product-list");
    data.forEach(item => {
      let div = document.createElement("div");
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>Price: ${item.price}</p>
        <img src="${item.img}" width="120">
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error("Error:", error));

