let productGrid = document.getElementById('productGrid');

function loadProducts() {
  productGrid.innerHTML = `
    <div class="card">
        <img src="images/4.svg" alt="" width="50" height="50" class="d-inline-block align-text-top">
        <h5 class="card-title"></h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  `;
}

loadProducts();

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();
