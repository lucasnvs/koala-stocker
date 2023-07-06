const white_side = document.getElementById("branco");
const login_ref = document.getElementById("login-ref");
const loginCard = document.getElementById("login");

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
    // let users = localStorage.get("users");
    // users.forEach(user => {
    //     console.log(user);
    //     if(user.email == email_login.value) {
    //         console.log(user.email + " confere!");
    //         if(user.pass == pass_login.value) {
    //             console.log(user.pass + " confere!");
    //             setLogged(user)
    //             loadingEffect(e.target, () => {
    //                 window.location.href = "view/main.html";
    //             });
    //         }
    //     }
    // });

    /// test
    let logged = {id: 1,         name: "Matheus",
    undername: "Lima",
    email: "matheus@email.com",
    pass: "pastel2020"}
    setLogged(logged)

    loadingEffect(e.target, () => {
        window.location.href = "view/main.html";
    });
});

localStorage.clear();