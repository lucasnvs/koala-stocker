const white_side = document.getElementById("branco");
const login_ref = document.getElementById("login-ref");
const signup_ref = document.getElementById("signup-ref");
const loginCard = document.getElementById("login");
const signupCard = document.getElementById("signup");

signupCard.remove();

login_ref.addEventListener('click', () => {
    loginCard.remove();
    white_side.appendChild(signupCard);
});

signup_ref.addEventListener('click', () => {
    signupCard.remove();
    white_side.appendChild(loginCard)
});

