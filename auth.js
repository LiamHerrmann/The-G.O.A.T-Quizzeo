// auth.js

// Function to check if user is logged in
function isLoggedIn() {
    const userCookie = getCookie('utilisateur');
    return userCookie !== null;
}

// Function to log in user
function login(utilisateur, motdepasse) {
    // Normally, here you would validate the username and password
    // For this example, let's just set a cookie for the user
    setCookie('utilisateur', username, 30); // Cookie expires in 30 days
}

// Function to log out user
function logout() {
    eraseCookie('utilisateur');
}