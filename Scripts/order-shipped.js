document.addEventListener('DOMContentLoaded', () => {
    // Display user name
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userName').textContent = user ? user.name : 'Guest';

    // Retrieve total price from localStorage
    const totalPrice = localStorage.getItem('totalPrice');

    // Display the total price on the page
    const productCard = document.querySelector('.product-card');
    if (totalPrice) {
        productCard.innerHTML = `
            <h3>Your Order has been Shipped!</h3>
            <p>Total Amount Paid: <strong style="color: #f57338;">$${totalPrice}</strong></p>
            <p>Thank you for shopping with us!</p>
        `;
    } else {
        productCard.innerHTML = `<p>No order details available.</p>`;
    }

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