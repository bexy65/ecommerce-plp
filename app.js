// import { fetchData } from './api';

let productGrid = document.getElementById('productGrid');
let navbarList = document.querySelector('.navbar-nav');
let category = document.querySelector('.category');
let categoryFilter = document.getElementById('categorySelect');
let priceRangeFilter = document.getElementById('priceRange');

//using fake data hence im allowing only 4 categories
const categoryLength = 2;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const categoriesFetch = fetchData('./data/categories.json');
const productsFetch = fetchData('./data/products.json');

categoriesFetch.then((categories) => {
  for (let i = 0; i < categoryLength; i++) {
    loadCategories(categories[i].name);
    loadCategoriesFilter(categories[i].name);
  }
});

productsFetch.then((products) => {
  console.log(products);
  for (let i = 0; i < products.length; i++) {
    if (products[i].category.id == 1) {
      loadProducts(
        products[i].title,
        products[i].price,
        products[i].image,
        products[i].description
      );
    }
  }
});

function fetchAllData(name) {
  productGrid.innerHTML = '';
  Promise.all([categoriesFetch, productsFetch]).then(
    ([categories, products]) => {
      for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i].name;
        if (categoryName === name) {
          const categoryProducts = products.filter(
            (product) => product.category.name === categoryName
          );

          for (let j = 0; j < categoryProducts.length; j++) {
            const product = categoryProducts[j];
            loadProducts(
              product.title,
              product.price,
              product.image,
              product.description
            );
          }
        }
      }
    }
  );
}

function filterByPrice() {
  const selectedCategory = categoryFilter.value;
  const selectedPrice = parseInt(priceRangeFilter.value);
  productGrid.innerHTML = '';
  Promise.all([categoriesFetch, productsFetch]).then(
    ([categories, products]) => {
      for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i].name;
        const categoryId = 1;

        if (selectedCategory === 'all') {
          const filteredProducts = products.filter((product) => {
            return (
              product.category.id === categoryId &&
              product.price <= selectedPrice
            );
          });

          for (let j = 0; j < filteredProducts.length; j++) {
            const product = filteredProducts[j];
            loadProducts(
              product.title,
              product.price,
              product.images,
              product.description
            );
          }
          break;
        }

        if (categoryName === selectedCategory) {
          const filteredProducts = products.filter((product) => {
            return (
              product.category.name === selectedCategory &&
              product.price <= selectedPrice
            );
          });

          for (let j = 0; j < filteredProducts.length; j++) {
            console.log('in for loop');
            const product = filteredProducts[j];
            loadProducts(
              product.title,
              product.price,
              product.image,
              product.description
            );
          }
        }
      }
    }
  );
}

function filterByPriceSlider() {
  const minValue = parseInt(priceRangeFilter.min);
  const maxValue = parseInt(priceRangeFilter.max);
  const value = parseInt(priceRangeFilter.value);
  const minPriceElement = document.getElementById('minPrice');
  const maxPriceElement = document.getElementById('maxPrice');
  minPriceElement.textContent = `$${value}`;
  maxPriceElement.textContent = `$${maxValue}`;
  filterByPrice();
}

function loadCategories(name) {
  navbarList.innerHTML += `
    <li class="nav-item">
      <button class="nav-link category" onclick="fetchAllData('${name}')">${name}</button>
    </li>
  `;
}

function loadCategoriesFilter(name) {
  categoryFilter.innerHTML += `
    <option value="${name}">${name}</option>
  `;
}

function loadProducts(title, price, image, desc) {
  productGrid.innerHTML += `
    <div class="col-12 col-md-6 col-lg-4 p-2 mb-3 product-grid">
      <div class="card h-100 d-flex flex-column">
          <img src="${image}" alt="Product image"  class="d-inline-block align-text-top">
          <div class="card-body p-2 m-0 fs-6 fs-md-5 fs-lg-4">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${desc}</p>
          </div>
          <p class="card-text ml-1 fs-4">$${price}</p>
          <div class="d-flex justify-content-end">
            <a href="#" class="btn btn-primary m-2">ADD</a>
          </div>
      </div>
    </div>
  `;
}

priceRangeFilter.addEventListener('input', filterByPriceSlider);
