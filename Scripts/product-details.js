document.addEventListener('DOMContentLoaded', async () => {
    // Display user name
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userName').textContent = user ? user.name : 'Guest';

    const selectedProductId = localStorage.getItem('selectedProductId');

    if (!selectedProductId) {
        // Redirect to home if no product is selected
        window.location.href = "home.html";
        return;
    }

    let product; 

    try {
        // Fetch product details from the API
        product = await fetch(`https://fakestoreapi.com/products/${selectedProductId}`)
            .then(res => res.json());

        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.title;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-category').textContent = `Category: ${product.category}`;
        document.getElementById('product-description').textContent = product.description;

    } catch (error) {
        console.error('Error fetching product details:', error);
        alert("Failed to load product details. Please try again later.");
        return;
    }

    // Add to Cart button
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === parseInt(selectedProductId));

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Back to Home button
    document.getElementById('back-to-home').addEventListener('click', () => {
        window.location.href = "home.html";
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTopBtn");
    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
