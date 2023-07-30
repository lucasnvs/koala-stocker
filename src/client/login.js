import { addDefaultItems, db, setMethodsDB } from "../database/db.js";
import { loadingEffect, setLogged } from "../utils.js";
import { sucessMSG } from "./dialog.js";
import { criaSignupCard } from "./signup.js";

setMethodsDB()
addDefaultItems();

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

const btn_acess = document.getElementById('btn_acess');
btn_acess.addEventListener('click', (e) => {
    let users = db.get("users");
    users.forEach(user => {
        if(user.email == email_login.value) {
            if(user.pass == pass_login.value) {
                setLogged(user);
                sucessMSG("Logado com sucesso!");
                loadingEffect(e.target, () => {
                    window.location.href = "view/main.html";
                });
            }
        }
    });
});

// dev

// setLogged(db.get("users")[0])
// loadingEffect(btn_acess, () => {
//     window.location.href = "view/main.html";
// });