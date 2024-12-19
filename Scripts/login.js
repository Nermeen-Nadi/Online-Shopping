document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!nameRegex.test(name)) {
        alert('Name should be 2-30 characters long and contain only letters and spaces.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include at least one letter and one number.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const userData = { name, email };
    localStorage.setItem('user', JSON.stringify(userData));
    
    window.location.href = 'home.html';
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
});
