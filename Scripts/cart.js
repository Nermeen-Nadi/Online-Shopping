document.addEventListener('DOMContentLoaded', () => {
    // Display user name
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userName').textContent = user ? user.name : 'Guest';

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCart() {
        const cartContainer = document.getElementById('cartItems');
        const totalPriceElement = document.getElementById('totalPrice');
        cartContainer.innerHTML = ''; // Clear cart items

        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" />
                <div class="info">
                    <h3>${item.title}</h3>
                    <p style="color:#f57338;">$${item.price}</p>
                </div>
                <div class="controls">
                    <button style="padding: 0.3rem 0.8rem; font-size: 1rem; background-color: #f57338; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="font-size: 25px; padding: .3rem; text-align: center;">${item.quantity}</span>
                    <button style="padding: 0.3rem 0.8rem; font-size: 1rem; background-color: #f57338; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            `;

            // Calculate total price for this item
            totalPrice += item.price * item.quantity;
            cartContainer.appendChild(cartItem);
        });

        // Display total price
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    // Function to update quantity
    window.updateQuantity = function (productId, change) {
        const item = cart.find(product => product.id === productId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            // Remove item from cart if quantity is 0 or less
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-render the cart
        renderCart();
    };

    // Handle Buy Now button click
    document.getElementById('buyNow').addEventListener('click', () => {
        // Calculate total price before clearing cart
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        // Store total price in localStorage
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        // Clear the cart and save to localStorage
        localStorage.removeItem('cart');

        // Redirect to the "Order Shipped" page
        window.location.href = 'order-shipped.html';
    });

    // Render cart on page load
    renderCart();

    // Back to top functionality
    const backToTopBtn = document.getElementById("backToTopBtn");
    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener("click", function () {
        scrollToTop();
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});