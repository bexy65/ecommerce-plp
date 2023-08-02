let productGrid = document.getElementById('productGrid');
let navbarList = document.querySelector('.navbar-nav');
let category = document.querySelector('.category');

const categoryLength = 4;

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
  for (let i = 0; i < categoryLength; i++) {
    loadCategories(categories[i].name);
  }
});

productsFetch.then((products) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].category.id == 1) {
      loadProducts(
        products[i].title,
        products[i].price,
        products[i].images[0],
        products[i].description
      );
    }
  }
  console.log(products);
});

function fetchAllData(name) {
  productGrid.innerHTML = '';
  Promise.all([categoriesFetch, productsFetch]).then(
    ([categories, products]) => {
      console.log('clicked');

      for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i].name;
        if (categoryName === name) {
          console.log('in if lock of promise all');
          const categoryProducts = products.filter(
            (product) => product.category.name === categoryName
          );

          console.log(categoryProducts.length);

          for (let j = 0; j < categoryProducts.length; j++) {
            const product = categoryProducts[j];
            loadProducts(
              product.title,
              product.price,
              product.category.image,
              product.description
            );
          }
        }
      }
    }
  );
}

function loadCategories(name) {
  navbarList.innerHTML += `
    <li class="nav-item">
      <button class="nav-link category" onclick="fetchAllData('${name}')">${name}</button>
    </li>
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
