const white_side = document.getElementById("branco");
const login_ref = document.getElementById("login-ref");
const signup_ref = document.getElementById("signup-ref");
const loginCard = document.getElementById("login");
const signupCard = document.getElementById("signup");

const email_login = document.getElementById("email_login");
const pass_login = document.getElementById("pass_login");

const checkRemember = document.getElementById("remember");
signupCard.remove();

email_login.addEventListener("keydown", (e) => {
    if(e.code == "Enter") {
        e.preventDefault();
        pass_login.focus();
    }
});

pass_login.addEventListener("keydown", (e) => {
    if(e.code == "Enter") {
        e.preventDefault();
        checkRemember.focus();
    }
});

checkRemember.addEventListener("keydown", (e) => {
    if(e.code == "Enter") {
        e.preventDefault();
        checkRemember.checked = true;
        btn_acess.focus();
    }
})

login_ref.addEventListener('click', () => {
    loginCard.remove();
    white_side.appendChild(signupCard);
});

signup_ref.addEventListener('click', () => {
    signupCard.remove();
    white_side.appendChild(loginCard)
});

///////////////////////////////////////////////////////////////////
// Login Check

const loadingEffect = () => {
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
        window.location.href = "./view/main.html";
    }, 800);
}

const btn_acess = document.getElementById('btn_acess');

btn_acess.addEventListener('click', () => {
    // email_login
    // pass_login

    // checar...
    // senha tem q ter no minimo 5 caracteres q incluem no minimo: 1 letra, 1 numero
    loadingEffect();
});

