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

const btn_acess = document.getElementById('btn_acess');

btn_acess.addEventListener('click', () => {
    let loader = document.createElement('div');
    loader.style.border = "5px solid #F3F3F3";
    loader.style.borderTop = "5px solid #104a1f";
    loader.style.borderRadius = "50%";
    loader.style.width = "30px";
    loader.style.height = "30px";
    loader.style.animation = "spin 400ms linear infinite";

    btn_acess.textContent = "";
    btn_acess.append(loader);
    setTimeout(() => {
        window.location.href = "./templates/main.html";
    }, 800)
});