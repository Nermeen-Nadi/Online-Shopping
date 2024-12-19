document.addEventListener('DOMContentLoaded', async () => {
    // Display user name
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userName').textContent = user ? user.name : 'Guest';
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