import { loadingEffect } from "../utils.js";
import { toastMessage } from "./dialog.js";
import { criaSignupCard } from "./signup.js";

export const white_side = document.getElementById("branco");
const login_ref = document.getElementById("login-ref");
export const loginCard = document.getElementById("login");

const email_login = document.getElementById("email_login");
const pass_login = document.getElementById("pass_login");

const checkRemember = document.getElementById("remember");

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
    white_side.appendChild(criaSignupCard());
});

///////////////////////////////////////////////////////////////////
// Login Check

const formLogin = document.getElementById('login');
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetch("./backend/login.php", {
        method: "POST",
        body: new FormData(formLogin)
    }).then(res => res.json());
    
    toastMessage(response.message, response.status)

    if(response.status == "success") {
        loadingEffect(e.target, () => {
            window.location.href = "./main.php";
        });
    }
});