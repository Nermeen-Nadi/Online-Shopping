let cart_counter = 0;

document.addEventListener("DOMContentLoaded", async () => {
  // Display user name
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("userName").textContent = user ? user.name : "no user";

  // Fetch categories and products from API
  const categories = await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .catch((err) => console.error("Error fetching categories:", err));

  // Generate category buttons
  const categoryButtons = document.getElementById("categoryButtons");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => loadProductsByCategory(category));
    button.classList.add("styled-category-button"); // Add custom style
    categoryButtons.appendChild(button);
  });

  // Load all products on click
  document.getElementById("allCategories").addEventListener("click", loadAllProducts);

  async function loadAllProducts() {
    const products = await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .catch((err) => console.error("Error fetching products:", err));
    displayProducts(products);
  }

  async function loadProductsByCategory(category) {
    const products = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    )
      .then((res) => res.json())
      .catch((err) => console.error("Error fetching products:", err));
    displayProducts(products);
  }

  function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ""; // Clear previous products
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="info">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <div class="buttons">
                <button onclick="viewProductDetails(${product.id})">View</button>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        </div>
      `;
      productsContainer.appendChild(productCard);
    });
  }

  window.viewProductDetails = function (productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "product-details.html";
  };

  window.addToCart = function (productId, title, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id: productId, title, price, image, quantity: 1 });
      cart_counter++; // Increment counter only for new products
      updateCartCounter();
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification(`${title} added to cart!`);
  };

  function updateCartCounter() {
    const cartCounterElement = document.getElementById("cartCounter");
    if (cartCounterElement) {
      cartCounterElement.textContent = cart_counter;
    }
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Initialize cart counter
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart_counter = cart.length; // Count unique products
  updateCartCounter();

  loadAllProducts();

  // Back to top functionality
  const backToTopBtn = document.getElementById("backToTopBtn");
  window.onscroll = () => {
    backToTopBtn.style.display =
      document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
        ? "block"
        : "none";
  };

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Slider Logic
  const images = [
    "Images/image1.jpg",
    "Images/image2.jpg",
    "Images/image3.jpg",
    "Images/image4.jpg",
    "Images/image6.jpg",
  ];

  let currentIndex = 0;
  const slider = document.querySelector(".slider");
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  slider.appendChild(dotsContainer);

  function showImage(index) {
    currentIndex = index;
    const newImage = document.createElement("div");
    newImage.className = "slider-image";
    newImage.style.backgroundImage = `url(${images[currentIndex]})`;

    slider.appendChild(newImage);

    setTimeout(() => {
      newImage.style.transition = "transform 1s ease-out";
      newImage.style.transform = "scale(1)";
    }, 50);

    const oldImage = slider.querySelector(".slider-image.active");
    if (oldImage) {
      oldImage.classList.remove("active");
      setTimeout(() => oldImage.remove(), 1000);
    }
    newImage.classList.add("active");
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  }

  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "slider-dot";
    dot.addEventListener("click", () => showImage(index));
    dotsContainer.appendChild(dot);
  });

  showImage(currentIndex);
});
