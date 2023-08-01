let productGrid = document.getElementById('productGrid');
let navbarList = document.querySelector('.navbar-nav');

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const categoriesFetch = fetchData('https://api.escuelajs.co/api/v1/categories');
const productsFetch = fetchData('https://api.escuelajs.co/api/v1/products');

categoriesFetch.then((categories) => {
  for (let i = 0; i < categories.length; i++) {
    loadCategories();
  }
});

productsFetch.then((products) => {
  for (let i = 0; i < products.length; i++) {
    loadProducts(products[i].title, products[i].price, products[i].image);
  }
});

function loadCategories() {
  navbarList.innerHTML += `
    <li class="nav-item">
      <a class="nav-link" href="/${categories[i].name}">${categories[i].name}</a>
    </li>
  `;
}

function loadProducts(title, price, image) {
  productGrid.innerHTML += `
    <div class="card">
        <img src="${image}" alt="" width="50" height="50" class="d-inline-block align-text-top">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${price}</p>
        <a href="#" class="btn btn-primary">ADD</a>
    </div>
  `;
}
